import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Search } from 'lucide-react';
import { useBooking } from '../../context/BookingContext';
import { PUBLICATIONS_DATA, CATEGORY_TEMPLATES } from '../../data/publicationsData';

export const HeroSection: React.FC = () => {
  const navigate = useNavigate();
  const { booking, updateBooking, setCategoryTemplate } = useBooking();
  const [selectedPub, setSelectedPub] = useState(booking.publicationId || 'toi');
  const [selectedCat, setSelectedCat] = useState(booking.category || 'Matrimonial');
  const [selectedCity, setSelectedCity] = useState(booking.edition || 'Delhi NCR');

  const pub = PUBLICATIONS_DATA[selectedPub] || PUBLICATIONS_DATA.toi;

  const handleQuickBook = (e: React.FormEvent) => {
    e.preventDefault();
    updateBooking({
      publicationId: selectedPub,
      edition: selectedCity,
      category: selectedCat,
    });
    navigate('/book-ad');
  };

  return (
    <section className="relative overflow-hidden bg-paper border-b border-paper-line py-12 lg:py-20">
      {/* Background Subtle Watermark */}
      <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-[0.02] pointer-events-none select-none font-news-serif font-black text-[240px] leading-none text-ink overflow-hidden flex items-center justify-end">
        RKM
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Editorial Pitch & Omni-Search */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-paper-tint border border-paper-line shadow-sm text-xs font-head font-bold uppercase tracking-wider text-ink">
              <span className="w-2 h-2 rounded-full bg-brand animate-ping" />
              <span>Direct INS Accredited Agency • 2026 Tariff Engine</span>
            </div>

            <h1 className="font-news-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-ink tracking-tight leading-[1.08]">
              Book Newspaper, Radio, Cinema &amp; Outdoor Ads{' '}
              <span className="italic font-normal text-brand underline decoration-brand/30 decoration-4">
                Instantly.
              </span>
            </h1>

            <p className="text-base sm:text-lg text-ink-muted leading-relaxed font-sans max-w-2xl">
              Digitizing India’s multi-channel media buying. Compose in our tactile <strong>Broadsheet Column Simulator</strong>, calculate dual word/line tariffs in real time, and download certified <strong>e-Tearsheet page proofs</strong> with official GST invoices.
            </p>

            {/* Omni-Search Box */}
            <form
              onSubmit={handleQuickBook}
              className="bg-white p-3 sm:p-4 rounded-3xl border border-paper-line shadow-press max-w-2xl space-y-3"
            >
              <div className="text-[11px] font-head font-bold uppercase tracking-wider text-ink-muted px-2 flex items-center gap-1.5">
                <Search className="w-3.5 h-3.5 text-brand" />
                <span>Instant Ad Builder &amp; Rate Finder</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                <div>
                  <label className="block text-[11px] font-head font-semibold uppercase text-ink-muted mb-1 px-1">
                    Publication
                  </label>
                  <select
                    value={selectedPub}
                    onChange={(e) => {
                      setSelectedPub(e.target.value);
                      const availableEds = Object.keys(PUBLICATIONS_DATA[e.target.value]?.editions || {});
                      if (availableEds.length > 0) setSelectedCity(availableEds[0]);
                    }}
                    className="w-full bg-paper-tint border border-paper-line rounded-xl px-3 py-2.5 text-xs font-sans text-ink focus:outline-none focus:border-brand font-medium"
                  >
                    {Object.values(PUBLICATIONS_DATA).map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-head font-semibold uppercase text-ink-muted mb-1 px-1">
                    Edition / City
                  </label>
                  <select
                    value={selectedCity}
                    onChange={(e) => setSelectedCity(e.target.value)}
                    className="w-full bg-paper-tint border border-paper-line rounded-xl px-3 py-2.5 text-xs font-sans text-ink focus:outline-none focus:border-brand font-medium"
                  >
                    {Object.keys(pub.editions).map((ed) => (
                      <option key={ed} value={ed}>
                        {ed}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-head font-semibold uppercase text-ink-muted mb-1 px-1">
                    Category
                  </label>
                  <select
                    value={selectedCat}
                    onChange={(e) => setSelectedCat(e.target.value)}
                    className="w-full bg-paper-tint border border-paper-line rounded-xl px-3 py-2.5 text-xs font-sans text-ink focus:outline-none focus:border-brand font-medium"
                  >
                    {CATEGORY_TEMPLATES.map((c) => (
                      <option key={c.name} value={c.name}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="pt-1 flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="text-[11.5px] text-ink-muted font-sans px-1">
                  Starting at <strong className="text-ink">₹ {pub.baseRate.toLocaleString('en-IN')}</strong> for {pub.baseUnits} {pub.unit}s
                </div>
                <button
                  type="submit"
                  className="w-full sm:w-auto px-6 py-3 rounded-full bg-brand hover:bg-brand-hover text-white text-xs font-head font-bold uppercase tracking-wider shadow-accent hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 group"
                >
                  <span>Compose in Live Simulator</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </form>

            {/* Credibility Stats */}
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-paper-line max-w-xl">
              <div>
                <div className="font-news-serif text-2xl sm:text-3xl font-bold text-ink">150+</div>
                <div className="text-xs text-ink-muted font-sans">National &amp; Vernacular Dailies</div>
              </div>
              <div>
                <div className="font-news-serif text-2xl sm:text-3xl font-bold text-ink">50K+</div>
                <div className="text-xs text-ink-muted font-sans">Verified Ads Published</div>
              </div>
              <div>
                <div className="font-news-serif text-2xl sm:text-3xl font-bold text-ink">100%</div>
                <div className="text-xs text-ink-muted font-sans">Certified e-Tearsheet Proof</div>
              </div>
            </div>
          </div>

          {/* Right Column: Tactile Newspaper Broadsheet Preview Mockup */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Decorative paper stack angle effect */}
              <div className="absolute inset-0 bg-[#E0D9C8] rounded-3xl transform rotate-2 translate-y-3 -z-10 shadow-md" />
              <div className="absolute inset-0 bg-[#E8E2D3] rounded-3xl transform -rotate-1 translate-y-1.5 -z-10 shadow-sm" />

              <div className="bg-[#FAF7EE] border border-ink/20 rounded-3xl p-6 sm:p-7 shadow-newsprint text-ink font-serif relative">
                {/* Vintage Newspaper Masthead */}
                <div className="text-center pb-3 border-b-2 border-ink">
                  <div className="text-[10px] font-head uppercase tracking-widest text-ink-muted font-bold">
                    THE VERIFIED CLASSIFIEDS JOURNAL • ESTD 2012
                  </div>
                  <div className="font-news-serif font-black text-2xl sm:text-3xl tracking-tight text-ink mt-0.5">
                    {pub.name.toUpperCase()}
                  </div>
                  <div className="flex items-center justify-between text-[9.5px] font-head uppercase tracking-wider text-ink/70 pt-1.5 border-t border-ink/20 mt-1.5">
                    <span>{selectedCity.toUpperCase()} EDITION</span>
                    <span>3:00 PM DAILY CUT-OFF</span>
                    <span>PAGE 14</span>
                  </div>
                </div>

                {/* Banner Strip */}
                <div className="bg-ink text-paper-soft text-center py-1 font-head text-[10px] font-bold tracking-widest uppercase my-3 rounded-sm">
                  ★ FEATURED ADVERTISEMENT PREVIEW ★
                </div>

                {/* Newspaper Content Simulation */}
                <div className="space-y-3 text-xs leading-relaxed">
                  <div className="p-3 rounded bg-highlight-bg border border-amber-300 font-sans shadow-sm">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[10px] font-head font-bold uppercase tracking-wider px-1.5 py-0.5 bg-brand text-white rounded">
                        {selectedCat.toUpperCase()}
                      </span>
                      <span className="text-[10px] font-mono text-emerald-700 font-bold">
                        VERIFIED BY INS
                      </span>
                    </div>
                    <p className="font-serif text-[13px] leading-snug text-ink-deep font-semibold">
                      Wanted suitable match for Punjabi Khatri girl, 28, MBA, 5′6″, working in Gurugram MNC as Product Manager. Well-settled status family. Early marriage. Write to: marriage.delhi26@gmail.com.
                    </p>
                  </div>

                  {/* Neighboring simulated ads */}
                  <div className="grid grid-cols-2 gap-2 text-[10.5px] text-ink-muted border-t border-ink/15 pt-2.5">
                    <div className="border-r border-paper-line pr-2 text-justify">
                      <strong className="text-ink font-sans">CHANGE OF NAME:</strong> Anita Verma has changed name to Anita Sharma for all future purposes. Notarised.
                    </div>
                    <div className="pl-1 text-justify">
                      <strong className="text-ink font-sans">FOR SALE:</strong> 3 BHK Luxury flat, Sector 62 Noida. Ready to move. 1650 sq ft. Call 98XXXXXX10.
                    </div>
                  </div>
                </div>

                {/* Bottom Callout in Broadsheet */}
                <div className="mt-4 pt-3 border-t-2 border-ink flex items-center justify-between">
                  <div className="text-[10.5px] font-head font-bold uppercase tracking-wider text-ink-muted">
                    Dual Billing: {pub.name} charges per {pub.unit}
                  </div>
                  <button
                    onClick={handleQuickBook}
                    className="text-xs font-head font-bold text-brand hover:underline flex items-center gap-1 uppercase tracking-wider"
                  >
                    <span>Test Composer</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
