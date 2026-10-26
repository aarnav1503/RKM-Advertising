import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useBooking } from '../context/BookingContext';
import { PageHeader } from '../components/layout/PageHeader';
import { LiveBroadsheetSimulator } from '../components/booking/LiveBroadsheetSimulator';
import { TariffBreakdownCard } from '../components/booking/TariffBreakdownCard';
import { CutoffCountdownBadge } from '../components/booking/CutoffCountdownBadge';
import { PUBLICATIONS_DATA, CATEGORY_TEMPLATES } from '../data/publicationsData';
import {
  UploadCloud,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';

export const BookAdPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { booking, updateBooking, setCategoryTemplate } = useBooking();

  const [uploadedFile, setUploadedFile] = useState<string | null>(null);

  // Sync query parameters if present
  useEffect(() => {
    const pubParam = searchParams.get('pub');
    const catParam = searchParams.get('cat');
    const edParam = searchParams.get('edition');

    const updates: Partial<typeof booking> = {};
    if (pubParam && PUBLICATIONS_DATA[pubParam]) {
      updates.publicationId = pubParam;
    }
    if (edParam) {
      updates.edition = edParam;
    }
    if (catParam) {
      const match = CATEGORY_TEMPLATES.find(
        (c) => c.name.toLowerCase() === catParam.toLowerCase()
      );
      if (match) {
        setCategoryTemplate(match.name);
      } else {
        updates.category = catParam;
      }
    }
    if (Object.keys(updates).length > 0) {
      updateBooking(updates);
    }
  }, [searchParams]);

  const pub = PUBLICATIONS_DATA[booking.publicationId] || PUBLICATIONS_DATA.toi;
  const currentCategoryObj = CATEGORY_TEMPLATES.find(
    (c) => c.name.toLowerCase() === booking.category.toLowerCase()
  );

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setUploadedFile(file.name);
      updateBooking({ supportingDocName: file.name });
    }
  };

  const handleProceed = () => {
    navigate('/checkout');
  };

  // Earliest allowable date calculation
  const getMinDate = () => {
    const now = new Date();
    if (now.getHours() >= pub.cutoffHour) {
      now.setDate(now.getDate() + 2);
    } else {
      now.setDate(now.getDate() + 1);
    }
    return now.toISOString().slice(0, 10);
  };

  return (
    <div className="bg-paper min-h-screen pb-20">
      <PageHeader
        title="4-Step Live Print Booking Wizard"
        subtitle="Configure your advertisement, preview in the real-time newsprint broadsheet column, and receive instant tariff breakdown."
        badge="Self-Service Ad Composer"
        breadcrumbs={[{ label: 'Book Ad' }]}
      />

      {/* 4-Step Visual Progress Stepper */}
      <div className="bg-white border-b border-paper-line py-3.5 px-4 sticky top-16 z-30 shadow-sm">
        <div className="max-w-5xl mx-auto flex items-center justify-between text-xs font-head uppercase tracking-wider">
          <div className="flex items-center gap-2 text-ink-muted">
            <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-[10px]">
              1
            </span>
            <span className="hidden sm:inline">Newspaper &amp; Edition</span>
          </div>
          <div className="h-0.5 w-8 bg-paper-line hidden sm:block" />

          <div className="flex items-center gap-2 text-ink-muted">
            <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-[10px]">
              2
            </span>
            <span className="hidden sm:inline">Category &amp; Date</span>
          </div>
          <div className="h-0.5 w-8 bg-paper-line hidden sm:block" />

          <div className="flex items-center gap-2 text-brand font-bold">
            <span className="w-5 h-5 rounded-full bg-brand text-white flex items-center justify-center font-bold text-[10px]">
              3
            </span>
            <span>Compose &amp; Preview</span>
          </div>
          <div className="h-0.5 w-8 bg-paper-line hidden sm:block" />

          <div className="flex items-center gap-2 text-ink-muted">
            <span className="w-5 h-5 rounded-full bg-paper-soft text-ink-muted flex items-center justify-center font-bold text-[10px]">
              4
            </span>
            <span className="hidden sm:inline">Checkout</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT: Composer Controls & Configuration */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-paper-line shadow-press space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-paper-line">
                <div>
                  <h2 className="font-news-serif text-2xl font-bold text-ink">
                    Configure Your Advertisement
                  </h2>
                  <p className="text-xs text-ink-muted font-sans mt-0.5">
                    Choose publication, type your text, and customize visual styling.
                  </p>
                </div>
                <CutoffCountdownBadge cutoffHour={pub.cutoffHour} />
              </div>

              {/* Publication & Edition Selector */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-head font-bold uppercase tracking-wider text-ink mb-1.5">
                    Select Newspaper
                  </label>
                  <select
                    value={booking.publicationId}
                    onChange={(e) => updateBooking({ publicationId: e.target.value })}
                    className="w-full bg-paper-tint border border-paper-line rounded-xl px-3.5 py-3 text-xs font-sans text-ink focus:outline-none focus:border-brand font-medium"
                  >
                    {Object.values(PUBLICATIONS_DATA).map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.name} ({p.unit === 'line' ? 'Per-Line' : 'Per-Word'})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-head font-bold uppercase tracking-wider text-ink mb-1.5">
                    Edition / Multi-City Combo
                  </label>
                  <select
                    value={booking.edition}
                    onChange={(e) => updateBooking({ edition: e.target.value })}
                    className="w-full bg-paper-tint border border-paper-line rounded-xl px-3.5 py-3 text-xs font-sans text-ink focus:outline-none focus:border-brand font-medium"
                  >
                    {Object.keys(pub.editions).map((ed) => (
                      <option key={ed} value={ed}>
                        {ed} ({pub.editions[ed]}x rate)
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Category & Date Selector */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-head font-bold uppercase tracking-wider text-ink mb-1.5">
                    Ad Category
                  </label>
                  <select
                    value={booking.category}
                    onChange={(e) => setCategoryTemplate(e.target.value)}
                    className="w-full bg-paper-tint border border-paper-line rounded-xl px-3.5 py-3 text-xs font-sans text-ink focus:outline-none focus:border-brand font-medium"
                  >
                    {CATEGORY_TEMPLATES.map((c) => (
                      <option key={c.name} value={c.name}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-head font-bold uppercase tracking-wider text-ink mb-1.5 flex items-center justify-between">
                    <span>Publish Release Date</span>
                    <span className="text-[10px] text-brand font-normal">Next Day Press</span>
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      min={getMinDate()}
                      value={booking.publishDate}
                      onChange={(e) => updateBooking({ publishDate: e.target.value })}
                      className="w-full bg-paper-tint border border-paper-line rounded-xl px-3.5 py-2.5 text-xs font-sans text-ink focus:outline-none focus:border-brand font-medium"
                    />
                  </div>
                </div>
              </div>

              {/* Quick Template Fill Buttons */}
              <div>
                <label className="block text-[11px] font-head font-bold uppercase tracking-wider text-ink-muted mb-2">
                  Sample Legal &amp; Classified Formats (Click to Fill)
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {CATEGORY_TEMPLATES.map((tmpl) => (
                    <button
                      key={tmpl.name}
                      type="button"
                      onClick={() => setCategoryTemplate(tmpl.name)}
                      className={`px-3 py-1.5 rounded-full text-[11px] font-head font-semibold tracking-wide border transition-all ${
                        booking.category.toLowerCase() === tmpl.name.toLowerCase()
                          ? 'bg-ink text-paper-soft border-ink shadow-sm'
                          : 'bg-paper-tint text-ink border-paper-line hover:border-brand/40'
                      }`}
                    >
                      {tmpl.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Advertisement Copy Textarea */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-head font-bold uppercase tracking-wider text-ink">
                    Advertisement Content (Text)
                  </label>
                  <span className="text-[11.5px] font-head font-semibold text-brand">
                    {pub.name} bills by {pub.unit} ({pub.baseUnits} {pub.unit}s included)
                  </span>
                </div>

                <textarea
                  rows={5}
                  value={booking.adText}
                  onChange={(e) => updateBooking({ adText: e.target.value })}
                  placeholder="Type your advertisement text here..."
                  className="w-full bg-paper-tint border border-paper-line rounded-2xl p-4 text-xs font-sans text-ink focus:outline-none focus:border-brand leading-relaxed resize-y"
                />

                <div className="bg-paper-tint border border-paper-line rounded-xl px-4 py-2.5 flex items-center justify-between text-xs font-sans text-ink-muted">
                  <span>
                    Count: <strong className="text-ink">{booking.calculatedPrice.words} words</strong>,{' '}
                    <strong className="text-ink">{booking.calculatedPrice.lines} lines</strong> (~35 chars/line)
                  </span>
                  <span className="text-emerald-700 font-head font-bold text-[11px] uppercase tracking-wider">
                    {booking.calculatedPrice.extraUnits > 0
                      ? `${booking.calculatedPrice.extraUnits} extra ${pub.unit}s added`
                      : 'Within base units limit'}
                  </span>
                </div>
              </div>

              {/* Visual Enhancements Toggles */}
              <div>
                <label className="block text-xs font-head font-bold uppercase tracking-wider text-ink mb-2">
                  Visual Enhancements (Boost Visibility)
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <label className="flex items-center gap-2.5 p-3 rounded-2xl border border-paper-line bg-paper-tint hover:bg-white cursor-pointer transition-colors">
                    <input
                      type="checkbox"
                      checked={booking.enhancements.bold}
                      onChange={(e) =>
                        updateBooking({
                          enhancements: { ...booking.enhancements, bold: e.target.checked },
                        })
                      }
                      className="rounded text-brand focus:ring-brand accent-brand w-4 h-4 cursor-pointer"
                    />
                    <div>
                      <div className="text-xs font-head font-bold text-ink">Bold First Line</div>
                      <div className="text-[10.5px] text-ink-muted">+₹ 50 flat</div>
                    </div>
                  </label>

                  <label className="flex items-center gap-2.5 p-3 rounded-2xl border border-paper-line bg-paper-tint hover:bg-white cursor-pointer transition-colors">
                    <input
                      type="checkbox"
                      checked={booking.enhancements.colorBg}
                      onChange={(e) =>
                        updateBooking({
                          enhancements: { ...booking.enhancements, colorBg: e.target.checked },
                        })
                      }
                      className="rounded text-brand focus:ring-brand accent-brand w-4 h-4 cursor-pointer"
                    />
                    <div>
                      <div className="text-xs font-head font-bold text-ink">Color Highlight</div>
                      <div className="text-[10.5px] text-ink-muted">+₹ 150 flat</div>
                    </div>
                  </label>

                  <label className="flex items-center gap-2.5 p-3 rounded-2xl border border-paper-line bg-paper-tint hover:bg-white cursor-pointer transition-colors">
                    <input
                      type="checkbox"
                      checked={booking.enhancements.borderTick}
                      onChange={(e) =>
                        updateBooking({
                          enhancements: { ...booking.enhancements, borderTick: e.target.checked },
                        })
                      }
                      className="rounded text-brand focus:ring-brand accent-brand w-4 h-4 cursor-pointer"
                    />
                    <div>
                      <div className="text-xs font-head font-bold text-ink">Border &amp; Tick</div>
                      <div className="text-[10.5px] text-ink-muted">+₹ 30 flat</div>
                    </div>
                  </label>
                </div>
              </div>

              {/* Legal Document Upload if Required */}
              {currentCategoryObj?.requiredDoc && (
                <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 space-y-2">
                  <div className="flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                    <div>
                      <div className="text-xs font-head font-bold uppercase tracking-wider text-amber-900">
                        Mandatory Legal Requirement
                      </div>
                      <p className="text-[11.5px] text-amber-800 font-sans mt-0.5">
                        {currentCategoryObj.requiredDoc}
                      </p>
                    </div>
                  </div>

                  <div className="pt-2">
                    <label className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-amber-300 text-xs font-head font-semibold text-amber-900 hover:bg-amber-100/50 cursor-pointer shadow-sm transition-colors">
                      <UploadCloud className="w-4 h-4 text-brand" />
                      <span>{uploadedFile ? `Attached: ${uploadedFile}` : 'Upload Affidavit / Supporting PDF'}</span>
                      <input
                        type="file"
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={handleFileUpload}
                        className="hidden"
                      />
                    </label>
                    {uploadedFile && (
                      <span className="ml-2 text-[11px] text-emerald-700 font-semibold inline-flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Ready for Editorial Check
                      </span>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* RIGHT: Live Broadsheet Simulator & Real-Time Bill */}
          <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-24">
            <LiveBroadsheetSimulator booking={booking} />
            <TariffBreakdownCard booking={booking} onProceed={handleProceed} />
          </div>
        </div>
      </div>
    </div>
  );
};
