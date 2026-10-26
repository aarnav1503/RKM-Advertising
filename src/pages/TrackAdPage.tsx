import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useBooking } from '../context/BookingContext';
import { PageHeader } from '../components/layout/PageHeader';
import {
  Search,
  CheckCircle2,
  Download,
  FileText,
  ShieldCheck,
  Newspaper,
  Check,
} from 'lucide-react';

export const TrackAdPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { getOrder } = useBooking();

  const initialOrderId = searchParams.get('order') || '';
  const [inputOrderId, setInputOrderId] = useState(initialOrderId);
  const [currentOrder, setCurrentOrder] = useState(() => (initialOrderId ? getOrder(initialOrderId) : null));
  const [downloadNotice, setDownloadNotice] = useState<string | null>(null);

  useEffect(() => {
    const orderParam = searchParams.get('order');
    if (orderParam) {
      setInputOrderId(orderParam);
      setCurrentOrder(getOrder(orderParam));
    }
  }, [searchParams]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputOrderId.trim()) {
      setSearchParams({ order: inputOrderId.trim() });
      setCurrentOrder(getOrder(inputOrderId.trim()));
    }
  };

  const handleDownload = (type: 'tearsheet' | 'invoice') => {
    const msg =
      type === 'tearsheet'
        ? `Generating Certified High-Resolution e-Tearsheet PDF for Order #${currentOrder?.orderId}... Download ready!`
        : `Generating Authorized B2B GST Tax Invoice for Order #${currentOrder?.orderId}... Download ready!`;
    setDownloadNotice(msg);
    setTimeout(() => setDownloadNotice(null), 4000);
  };

  return (
    <div className="bg-paper min-h-screen pb-20">
      <PageHeader
        title="Live Order Tracker &amp; Digital e-Tearsheet"
        subtitle="Monitor your advertisement from editorial desk verification to the morning press run. View and download certified scanned page proofs."
        badge="Proofing &amp; Delivery System"
        breadcrumbs={[{ label: 'Track Ad' }]}
      />

      {/* Floating Download Toast */}
      {downloadNotice && (
        <div className="fixed bottom-6 right-6 z-50 bg-ink text-paper-soft px-5 py-3.5 rounded-2xl shadow-2xl border border-white/20 flex items-center gap-3 text-xs font-head font-semibold animate-in slide-in-from-bottom-5">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{downloadNotice}</span>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* Search Order Bar */}
        <form
          onSubmit={handleSearch}
          className="max-w-2xl mx-auto bg-white p-3 rounded-2xl border border-paper-line shadow-press flex items-center gap-3 mb-10"
        >
          <div className="pl-2">
            <Search className="w-5 h-5 text-ink-muted" />
          </div>
          <input
            type="text"
            value={inputOrderId}
            onChange={(e) => setInputOrderId(e.target.value)}
            placeholder="Enter Order ID (e.g. RKM-2026-9812)"
            className="flex-1 bg-transparent border-0 text-sm font-head font-bold uppercase tracking-wider text-ink focus:outline-none placeholder:font-normal placeholder:normal-case placeholder:text-ink-muted"
          />
          <button
            type="submit"
            className="px-6 py-2.5 rounded-xl bg-brand text-white font-head font-bold text-xs uppercase tracking-wider shadow-sm hover:bg-brand-hover transition-colors"
          >
            Track Milestone
          </button>
        </form>

        {currentOrder ? (
          <div className="space-y-10">
            {/* 4-Milestone Interactive Timeline */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-paper-line shadow-press">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-6 border-b border-paper-line mb-8">
                <div>
                  <span className="text-[11px] font-head font-bold uppercase tracking-wider text-ink-muted">
                    Order Tracking Dashboard
                  </span>
                  <h2 className="font-news-serif text-2xl font-bold text-ink">
                    Order #{currentOrder.orderId}
                  </h2>
                </div>
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-head font-bold uppercase tracking-wider">
                    <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
                    Published &amp; Proof Available
                  </span>
                </div>
              </div>

              {/* Steps timeline grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
                {currentOrder.milestones.map((m, idx) => (
                  <div key={idx} className="relative flex flex-col justify-between space-y-3">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-9 h-9 rounded-full flex items-center justify-center font-head font-bold text-xs shrink-0 ${
                          m.completed
                            ? 'bg-ink text-white'
                            : 'bg-paper-soft text-ink-muted border border-paper-line'
                        }`}
                      >
                        {m.completed ? <Check className="w-4 h-4" /> : idx + 1}
                      </div>
                      <div className="h-0.5 flex-1 bg-paper-line hidden lg:block" />
                    </div>

                    <div>
                      <h4 className="font-head font-bold text-xs uppercase tracking-wider text-ink">
                        {m.title}
                      </h4>
                      <p className="text-xs text-ink-muted font-sans mt-0.5 leading-snug">
                        {m.description}
                      </p>
                    </div>

                    <div className="text-[10.5px] font-mono text-ink-muted pt-2 border-t border-paper-line-light">
                      {m.time}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Certified Digital e-Tearsheet Proof Section */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-paper-line shadow-press space-y-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-paper-line">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-paper-tint text-brand text-[11px] font-head font-bold uppercase tracking-wider border border-paper-line mb-2">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    Official Legal Evidence Scan
                  </div>
                  <h3 className="font-news-serif text-2xl font-bold text-ink">
                    Certified Morning Newspaper e-Tearsheet Proof
                  </h3>
                  <p className="text-xs text-ink-muted font-sans mt-0.5">
                    Order #{currentOrder.orderId} • {currentOrder.tearsheet.publication} • {currentOrder.tearsheet.page}
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <button
                    onClick={() => handleDownload('tearsheet')}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full border border-paper-line hover:border-ink bg-paper-tint text-ink text-xs font-head font-bold uppercase tracking-wider hover:bg-white transition-all shadow-sm"
                  >
                    <Download className="w-4 h-4 text-brand" />
                    <span>Download Tearsheet PDF</span>
                  </button>

                  <button
                    onClick={() => handleDownload('invoice')}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-brand text-white text-xs font-head font-bold uppercase tracking-wider shadow-accent hover:bg-brand-hover transition-all"
                  >
                    <FileText className="w-4 h-4" />
                    <span>Download GST Invoice</span>
                  </button>
                </div>
              </div>

              {/* High-Resolution Scanned Broadsheet Page Proof Simulation */}
              <div className="bg-[#FAF7EE] border-2 border-ink/20 rounded-2xl p-6 sm:p-8 font-serif text-ink shadow-newsprint paper-pattern">
                {/* Vintage Newspaper Page Top Running Header */}
                <div className="border-t-2 border-b-2 border-ink py-2 flex flex-wrap items-center justify-between text-xs font-bold uppercase tracking-wider mb-4 gap-2">
                  <span className="font-news-serif text-base sm:text-lg font-black">
                    {currentOrder.tearsheet.publication}
                  </span>
                  <span className="font-head text-[11px] text-ink-muted">
                    {currentOrder.tearsheet.page}
                  </span>
                  <span className="font-head text-[11px]">
                    {currentOrder.tearsheet.date}
                  </span>
                </div>

                {/* Simulated Classified Columns Grid */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 text-xs leading-relaxed">
                  {/* Surrounding Column 1 */}
                  <div className="md:col-span-3 text-[11px] text-ink-muted text-justify border-r border-paper-line pr-3 space-y-3">
                    <div>
                      <strong className="text-ink font-sans">MATRIMONIAL:</strong> Alliance invited for well-settled Punjabi Khatri boy, 30, VP in Investment Bank, Mumbai. Early marriage. Contact: kapoor.family@gmail.com.
                    </div>
                    <div>
                      <strong className="text-ink font-sans">ASTROLOGY:</strong> World-renowned palmist and Vedic numerologist. Solves business, career, marriage blockages. Call Pandit Sharma.
                    </div>
                  </div>

                  {/* Main Column with Verified Highlight */}
                  <div className="md:col-span-6 space-y-4">
                    <div className="bg-highlight-bg border-2 border-ink p-4 rounded-md shadow-md relative">
                      <div className="flex items-center justify-between pb-2 mb-2 border-b border-ink/20">
                        <span className="bg-brand text-white text-[9.5px] font-head font-bold uppercase tracking-wider px-2 py-0.5 rounded">
                          ★ VERIFIED PUBLISHED AD ★
                        </span>
                        <span className="font-mono text-[10px] text-ink-muted">
                          LOCATOR: COL-3 • ROW-12
                        </span>
                      </div>

                      <div className="font-news-serif font-black text-sm uppercase text-ink mb-1">
                        {currentOrder.tearsheet.headline}
                      </div>

                      <p className="font-serif text-[13px] leading-relaxed text-ink-deep font-semibold">
                        {currentOrder.tearsheet.adText}
                      </p>

                      <div className="mt-3 pt-2 border-t border-dashed border-ink/20 text-[10px] font-head uppercase tracking-wider text-ink-muted flex items-center justify-between">
                        <span>INS ACCREDITATION STAMP VERIFIED</span>
                        <span>OFFICIAL RECORD COPY</span>
                      </div>
                    </div>

                    <div className="text-[11px] text-ink-muted border-t border-paper-line-dark/15 pt-2">
                      <strong className="text-ink font-sans">PROPERTY FOR SALE:</strong> 3 BHK Luxury flat in Sector 62 Noida. Ready to move. 1650 sq ft. Contact 98XXXXXX10.
                    </div>
                  </div>

                  {/* Surrounding Column 3 */}
                  <div className="md:col-span-3 text-[11px] text-ink-muted text-justify border-l border-paper-line pl-3 space-y-3">
                    <div>
                      <strong className="text-ink font-sans">PUBLIC NOTICE:</strong> Notice is hereby given that Sh. Rajesh Gupta has applied for duplicate share certificates. Objections within 15 days.
                    </div>
                    <div>
                      <strong className="text-ink font-sans">LOST &amp; FOUND:</strong> Original RC and Driving License lost in Connaught Place metro station. Finder please call 9811XXXXXX.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : !inputOrderId ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-paper-line max-w-lg mx-auto space-y-4">
            <Search className="w-12 h-12 text-brand mx-auto opacity-70" />
            <h3 className="font-news-serif text-2xl font-bold text-ink">
              Track Your Notice Status
            </h3>
            <p className="text-sm text-ink-muted font-sans">
              Enter your booking reference ID above (e.g. <strong className="text-ink">RKM-2026-9812</strong>) to follow your advertisement to the printing press.
            </p>
            <button
              onClick={() => {
                setInputOrderId('RKM-2026-9812');
                setCurrentOrder(getOrder('RKM-2026-9812'));
              }}
              className="px-6 py-2.5 rounded-full bg-paper border border-paper-line text-ink hover:text-brand text-xs font-head font-bold uppercase tracking-wider transition-colors"
            >
              Try Sample Booking #RKM-2026-9812
            </button>
          </div>
        ) : (
          <div className="bg-white rounded-3xl p-12 text-center border border-paper-line max-w-lg mx-auto space-y-4">
            <Newspaper className="w-12 h-12 text-brand mx-auto" />
            <h3 className="font-news-serif text-2xl font-bold text-ink">
              Order Not Found
            </h3>
            <p className="text-xs text-ink-muted font-sans">
              Could not find active record for Order #{inputOrderId}. Check your Order ID or test with default ID: <strong className="text-ink">RKM-2026-9812</strong>.
            </p>
            <button
              onClick={() => {
                setInputOrderId('RKM-2026-9812');
                setCurrentOrder(getOrder('RKM-2026-9812'));
              }}
              className="px-6 py-2.5 rounded-full bg-ink text-white text-xs font-head font-bold uppercase tracking-wider"
            >
              Load Sample Notice Proof
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
