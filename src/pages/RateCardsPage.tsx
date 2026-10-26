import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBooking } from '../context/BookingContext';
import { PageHeader } from '../components/layout/PageHeader';
import { RATE_CARDS_DATA, RateCardEntry } from '../data/rateCardsData';
import { formatINR } from '../data/publicationsData';
import { Search, ArrowRight, Clock } from 'lucide-react';

export const RateCardsPage: React.FC = () => {
  const navigate = useNavigate();
  const { updateBooking, setCategoryTemplate } = useBooking();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMedia, setSelectedMedia] = useState('All');

  const mediaTypes = ['All', 'Newspaper', 'Radio FM', 'Cinema', 'Television', 'Outdoor', 'Digital PR', 'OTT & CTV'];

  const filteredRates = RATE_CARDS_DATA.filter((item) => {
    const matchesMedia = selectedMedia === 'All' || item.media === selectedMedia;
    const matchesSearch =
      item.publisher.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.edition.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesMedia && matchesSearch;
  });

  const handleBookRate = (entry: RateCardEntry) => {
    if (entry.media === 'Newspaper') {
      let pubId = 'toi';
      if (entry.publisher.toLowerCase().includes('hindustan')) pubId = 'ht';
      if (entry.publisher.toLowerCase().includes('jagran')) pubId = 'dj';
      if (entry.publisher.toLowerCase().includes('amar')) pubId = 'au';
      if (entry.publisher.toLowerCase().includes('hindu')) pubId = 'hindu';
      if (entry.publisher.toLowerCase().includes('economic')) pubId = 'et';

      updateBooking({
        publicationId: pubId,
        category: entry.category,
      });
      setCategoryTemplate(entry.category);
      navigate('/book-ad');
    } else {
      navigate('/contact?interest=' + encodeURIComponent(`${entry.media} - ${entry.publisher}`));
    }
  };

  return (
    <div className="bg-paper min-h-screen pb-20">
      <PageHeader
        title="2026 Tariff Explorer &amp; Rate Cards Directory"
        subtitle="Search and compare verified rates across 150+ newspapers, radio stations, cinema halls, and digital PR publications."
        badge="Official INS Tariff Directory"
        breadcrumbs={[{ label: 'Rate Cards' }]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* Search & Media Filters */}
        <div className="bg-white rounded-3xl p-6 border border-paper-line shadow-press mb-8 space-y-4">
          <div className="flex flex-col md:flex-row items-center gap-4">
            <div className="relative flex-1 w-full">
              <Search className="w-4 h-4 text-ink-muted absolute left-4 top-3.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by publication (e.g. Times of India, Dainik Jagran), edition, or category..."
                className="w-full bg-paper-tint border border-paper-line rounded-full pl-11 pr-4 py-3 text-xs font-sans text-ink focus:outline-none focus:border-brand font-medium placeholder:text-ink-muted"
              />
            </div>
          </div>

          {/* Media Category Pill Tabs */}
          <div className="flex flex-wrap gap-2 pt-2 border-t border-paper-line-light">
            {mediaTypes.map((m) => (
              <button
                key={m}
                onClick={() => setSelectedMedia(m)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-head font-bold uppercase tracking-wider transition-all ${
                  selectedMedia === m
                    ? 'bg-brand text-white shadow-sm'
                    : 'bg-paper-tint text-ink hover:bg-paper-soft border border-paper-line'
                }`}
              >
                {m}
              </button>
            ))}
          </div>
        </div>

        {/* Rate Cards Table */}
        <div className="bg-white rounded-3xl border border-paper-line shadow-press overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-sans">
              <thead className="bg-paper-soft border-b border-paper-line font-head text-[11px] font-bold uppercase tracking-wider text-ink-muted">
                <tr>
                  <th className="py-4 px-6">Publisher &amp; Media</th>
                  <th className="py-4 px-6">Edition / Territory</th>
                  <th className="py-4 px-6">Category / Format</th>
                  <th className="py-4 px-6">Billing Structure</th>
                  <th className="py-4 px-6">Base Rate (2026)</th>
                  <th className="py-4 px-6">Cut-Off Deadline</th>
                  <th className="py-4 px-6 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-paper-line-light">
                {filteredRates.length > 0 ? (
                  filteredRates.map((entry) => (
                    <tr key={entry.id} className="hover:bg-paper-tint/60 transition-colors">
                      <td className="py-4 px-6">
                        <div className="font-head font-bold text-sm text-ink flex items-center gap-1.5">
                          <span>{entry.publisher}</span>
                          {entry.popular && (
                            <span className="px-1.5 py-0.5 rounded bg-brand-light text-brand text-[9.5px] font-bold">
                              POPULAR
                            </span>
                          )}
                        </div>
                        <span className="text-[10.5px] text-ink-muted font-head uppercase tracking-wider">
                          {entry.media}
                        </span>
                      </td>

                      <td className="py-4 px-6 font-medium text-ink">
                        {entry.edition}
                      </td>

                      <td className="py-4 px-6">
                        <span className="px-2.5 py-1 rounded-full bg-paper-soft text-ink font-head font-semibold text-[11px]">
                          {entry.category}
                        </span>
                      </td>

                      <td className="py-4 px-6 text-ink-muted">
                        <div>{entry.billingType}</div>
                        {entry.extraUnitPrice > 0 && (
                          <div className="text-[10px] text-brand">
                            +₹{entry.extraUnitPrice}/unit extra
                          </div>
                        )}
                      </td>

                      <td className="py-4 px-6">
                        <div className="font-news-serif text-base font-bold text-ink">
                          {formatINR(entry.basePrice)}
                        </div>
                        <div className="text-[10px] text-ink-muted font-sans">+ 5% GST</div>
                      </td>

                      <td className="py-4 px-6 text-ink-muted flex items-center gap-1 mt-4">
                        <Clock className="w-3.5 h-3.5 text-brand shrink-0" />
                        <span className="line-clamp-1">{entry.cutOff}</span>
                      </td>

                      <td className="py-4 px-6 text-right">
                        <button
                          onClick={() => handleBookRate(entry)}
                          className="inline-flex items-center gap-1 px-4 py-2 rounded-full bg-brand text-white text-[11px] font-head font-bold uppercase tracking-wider shadow-sm hover:bg-brand-hover hover:-translate-y-0.5 transition-all"
                        >
                          <span>Book Rate</span>
                          <ArrowRight className="w-3 h-3" />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className="py-12 text-center text-ink-muted">
                      No rates found matching "{searchQuery}". Try selecting another media category or clearing your query.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
