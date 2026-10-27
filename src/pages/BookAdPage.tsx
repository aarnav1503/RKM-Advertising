import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { useBooking } from '../context/BookingContext';
import { PageHeader } from '../components/layout/PageHeader';
import { LiveBroadsheetSimulator } from '../components/booking/LiveBroadsheetSimulator';
import { TariffBreakdownCard } from '../components/booking/TariffBreakdownCard';
import { CutoffCountdownBadge } from '../components/booking/CutoffCountdownBadge';
import { PUBLICATIONS_DATA, CATEGORY_TEMPLATES } from '../data/publicationsData';
import { NewspaperLogo } from '../components/common/NewspaperCard';
import {
  UploadCloud,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  ArrowLeft,
  Newspaper,
  Calendar,
  FileText,
  ShieldCheck,
} from 'lucide-react';

export const BookAdPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { booking, updateBooking, setCategoryTemplate } = useBooking();

  const stepParam = parseInt(searchParams.get('step') || '1', 10);
  const [currentStep, setCurrentStep] = useState<number>(stepParam >= 1 && stepParam <= 3 ? stepParam : 1);
  const [uploadedFile, setUploadedFile] = useState<string | null>(null);

  // Sync query parameters if present
  useEffect(() => {
    const pubParam = searchParams.get('pub');
    const catParam = searchParams.get('cat');
    const edParam = searchParams.get('edition');
    const formatParam = searchParams.get('format');

    const updates: Partial<typeof booking> = {};
    if (pubParam && PUBLICATIONS_DATA[pubParam]) {
      updates.publicationId = pubParam;
    }
    if (edParam) {
      updates.edition = edParam;
    }
    if (formatParam === 'text' || formatParam === 'cd' || formatParam === 'display') {
      updates.adFormat = formatParam;
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
          {/* Step 1 */}
          <button
            type="button"
            onClick={() => setCurrentStep(1)}
            className={`flex items-center gap-2 transition-colors cursor-pointer ${
              currentStep === 1
                ? 'text-brand font-bold'
                : currentStep > 1
                ? 'text-emerald-800 font-semibold hover:text-brand'
                : 'text-ink-muted hover:text-ink'
            }`}
          >
            <span
              className={`w-5 h-5 rounded-full flex items-center justify-center font-bold text-[10px] ${
                currentStep === 1
                  ? 'bg-brand text-white shadow-sm'
                  : currentStep > 1
                  ? 'bg-emerald-100 text-emerald-800'
                  : 'bg-paper-soft text-ink-muted'
              }`}
            >
              {currentStep > 1 ? '✓' : '1'}
            </span>
            <span className="hidden sm:inline">Edition &amp; Coverage</span>
          </button>
          <div className="h-0.5 w-8 bg-paper-line hidden sm:block" />

          {/* Step 2 */}
          <button
            type="button"
            onClick={() => setCurrentStep(2)}
            className={`flex items-center gap-2 transition-colors cursor-pointer ${
              currentStep === 2
                ? 'text-brand font-bold'
                : currentStep > 2
                ? 'text-emerald-800 font-semibold hover:text-brand'
                : 'text-ink-muted hover:text-ink'
            }`}
          >
            <span
              className={`w-5 h-5 rounded-full flex items-center justify-center font-bold text-[10px] ${
                currentStep === 2
                  ? 'bg-brand text-white shadow-sm'
                  : currentStep > 2
                  ? 'bg-emerald-100 text-emerald-800'
                  : 'bg-paper-soft text-ink-muted'
              }`}
            >
              {currentStep > 2 ? '✓' : '2'}
            </span>
            <span className="hidden sm:inline">Category &amp; Date</span>
          </button>
          <div className="h-0.5 w-8 bg-paper-line hidden sm:block" />

          {/* Step 3 */}
          <button
            type="button"
            onClick={() => setCurrentStep(3)}
            className={`flex items-center gap-2 transition-colors cursor-pointer ${
              currentStep === 3
                ? 'text-brand font-bold'
                : 'text-ink-muted hover:text-ink'
            }`}
          >
            <span
              className={`w-5 h-5 rounded-full flex items-center justify-center font-bold text-[10px] ${
                currentStep === 3
                  ? 'bg-brand text-white shadow-sm'
                  : 'bg-paper-soft text-ink-muted'
              }`}
            >
              3
            </span>
            <span>Compose &amp; Preview</span>
          </button>
          <div className="h-0.5 w-8 bg-paper-line hidden sm:block" />

          {/* Step 4 */}
          <button
            type="button"
            onClick={handleProceed}
            className="flex items-center gap-2 text-ink-muted hover:text-brand transition-colors cursor-pointer"
          >
            <span className="w-5 h-5 rounded-full bg-paper-soft text-ink-muted flex items-center justify-center font-bold text-[10px]">
              4
            </span>
            <span className="hidden sm:inline">Checkout</span>
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT: Composer Controls & Configuration */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-paper-line shadow-press space-y-6">
              
              {/* STEP 1: EDITION & COVERAGE (NEWSPAPER LOCKED & CONFIRMED) */}
              {currentStep === 1 && (
                <div className="space-y-6">
                  <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-paper-line">
                    <div>
                      <div className="text-[11px] font-head font-bold uppercase tracking-wider text-brand mb-1 flex items-center gap-1.5">
                        <Newspaper className="w-3.5 h-3.5" /> Step 1 of 4: Publication &amp; Edition Coverage
                      </div>
                      <h2 className="font-news-serif text-2xl font-bold text-ink">
                        Target City Edition &amp; Print Coverage
                      </h2>
                      <p className="text-xs text-ink-muted font-sans mt-0.5">
                        Your selected newspaper is confirmed below. Choose your target regional edition or multi-city combo package.
                      </p>
                    </div>
                    <CutoffCountdownBadge cutoffHour={pub.cutoffHour} />
                  </div>

                  {/* Confirmed Selected Publication Banner */}
                  <div className="bg-gradient-to-r from-paper-tint to-white border border-paper-line rounded-2xl p-4 sm:p-5 shadow-sm">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <div className="h-14 px-3.5 rounded-2xl bg-white border border-paper-line flex items-center justify-center shadow-sm shrink-0 min-w-[105px] overflow-hidden">
                          <NewspaperLogo id={pub.id} className="h-7 sm:h-8 w-auto max-w-[110px] object-contain" />
                        </div>
                        <div>
                          <div className="flex flex-wrap items-center gap-2">
                            <h3 className="font-news-serif text-xl font-bold text-ink">{pub.name}</h3>
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-head font-bold uppercase tracking-wider bg-emerald-50 text-emerald-800 border border-emerald-200">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
                              Selected Publication
                            </span>
                          </div>
                          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-ink-muted mt-1 font-sans">
                            <span>Language: <strong className="text-ink font-semibold">{pub.language}</strong></span>
                            <span>•</span>
                            <span>Circulation: <strong className="text-ink font-semibold">{pub.circulation}</strong></span>
                            <span>•</span>
                            <span>Format: <strong className="text-brand font-semibold">{booking.adFormat === 'cd' ? 'Classified Display (CD)' : booking.adFormat === 'display' ? 'Commercial Display' : 'Classified Text (ROD)'}</strong></span>
                          </div>
                        </div>
                      </div>

                      <div className="flex sm:flex-col items-center sm:items-end justify-between border-t sm:border-t-0 pt-3 sm:pt-0 border-paper-line">
                        <div className="text-left sm:text-right">
                          <div className="text-[10px] font-head uppercase tracking-wider text-ink-muted">Base Tariff</div>
                          <div className="text-sm font-bold text-ink">₹ {pub.baseRate} <span className="text-[11px] font-normal text-ink-muted">/ {pub.unit}</span></div>
                        </div>
                        <Link
                          to="/newspaper-ads"
                          className="mt-1 text-xs font-head font-bold text-brand hover:underline inline-flex items-center gap-1"
                        >
                          Change Newspaper ➔
                        </Link>
                      </div>
                    </div>
                  </div>

                  {/* Edition / Multi-City Combo Selection */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <label className="block text-xs font-head font-bold uppercase tracking-wider text-ink">
                        Target Edition / Multi-City Combo
                      </label>
                      <span className="text-[11px] font-semibold text-brand">
                        {Object.keys(pub.editions).length} Available Editions
                      </span>
                    </div>

                    {/* Quick Edition Cards Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {Object.keys(pub.editions).map((ed) => {
                        const multiplier = pub.editions[ed];
                        const isSelected = booking.edition === ed;
                        return (
                          <button
                            key={ed}
                            type="button"
                            onClick={() => updateBooking({ edition: ed })}
                            className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer flex items-center justify-between gap-3 ${
                              isSelected
                                ? 'bg-white border-brand shadow-sm ring-1 ring-brand'
                                : 'bg-paper-tint border-paper-line hover:border-brand/40 hover:bg-white'
                            }`}
                          >
                            <div className="space-y-0.5">
                              <div className="text-xs font-head font-bold text-ink flex items-center gap-1.5">
                                <span className={`w-2 h-2 rounded-full ${isSelected ? 'bg-brand' : 'bg-paper-line'}`} />
                                {ed}
                              </div>
                              <div className="text-[10.5px] text-ink-muted">
                                {multiplier === 1 ? 'Primary City Edition' : multiplier > 1.3 ? 'Multi-State Combo Package' : 'Regional Edition'}
                              </div>
                            </div>
                            <span
                              className={`text-[11px] font-head font-bold px-2 py-0.5 rounded-full ${
                                isSelected
                                  ? 'bg-brand/10 text-brand'
                                  : 'bg-paper-soft text-ink-muted'
                              }`}
                            >
                              {multiplier}x Rate
                            </span>
                          </button>
                        );
                      })}
                    </div>

                    {/* Fallback Select dropdown for comprehensive list */}
                    <div className="pt-1">
                      <select
                        value={booking.edition}
                        onChange={(e) => updateBooking({ edition: e.target.value })}
                        className="w-full bg-paper-tint border border-paper-line rounded-xl px-3.5 py-2.5 text-xs font-sans text-ink focus:outline-none focus:border-brand font-medium cursor-pointer"
                      >
                        {Object.keys(pub.editions).map((ed) => (
                          <option key={ed} value={ed}>
                            {ed} ({pub.editions[ed]}x rate multiplier)
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Publication Specs & Details Badge */}
                  <div className="bg-paper-tint border border-paper-line rounded-2xl p-4 space-y-2">
                    <div className="flex items-center justify-between text-xs font-sans">
                      <span className="font-head font-bold uppercase tracking-wider text-ink flex items-center gap-1.5">
                        <ShieldCheck className="w-4 h-4 text-emerald-700" />
                        {pub.name} Verified Coverage
                      </span>
                      <span className="text-emerald-700 font-semibold">{pub.circulation}</span>
                    </div>
                    <p className="text-xs text-ink-muted leading-relaxed">
                      Language: <strong>{pub.language}</strong> • Tariff Rule: <strong>Billed by {pub.unit}</strong> (Includes {pub.baseUnits} base {pub.unit}s). Extra {pub.unit}s charged incrementally. Certified digital e-tearsheet delivered upon release.
                    </p>
                  </div>

                  {/* Step 1 Navigation Button */}
                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={() => setCurrentStep(2)}
                      className="btn accent w-full py-4 text-xs font-head uppercase tracking-wider font-bold flex items-center justify-center gap-2 shadow-sm cursor-pointer"
                    >
                      <span>Continue to Step 2: Category &amp; Date</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 2: CATEGORY & DATE */}
              {currentStep === 2 && (
                <div className="space-y-6">
                  <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-paper-line">
                    <div>
                      <div className="text-[11px] font-head font-bold uppercase tracking-wider text-brand mb-1 flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5" /> Step 2 of 4: Category &amp; Date
                      </div>
                      <h2 className="font-news-serif text-2xl font-bold text-ink">
                        Select Notice Category &amp; Publish Date
                      </h2>
                      <p className="text-xs text-ink-muted font-sans mt-0.5">
                        Choose the classification for your advertisement and pick the scheduled print insertion date.
                      </p>
                    </div>
                    <CutoffCountdownBadge cutoffHour={pub.cutoffHour} />
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
                        className="w-full bg-paper-tint border border-paper-line rounded-xl px-3.5 py-3 text-xs font-sans text-ink focus:outline-none focus:border-brand font-medium cursor-pointer"
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
                      <input
                        type="date"
                        min={getMinDate()}
                        value={booking.publishDate}
                        onChange={(e) => updateBooking({ publishDate: e.target.value })}
                        className="w-full bg-paper-tint border border-paper-line rounded-xl px-3.5 py-2.5 text-xs font-sans text-ink focus:outline-none focus:border-brand font-medium cursor-pointer"
                      />
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
                          className={`px-3 py-1.5 rounded-full text-[11px] font-head font-semibold tracking-wide border transition-all cursor-pointer ${
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

                  {/* Step 2 Navigation Buttons */}
                  <div className="pt-2 flex gap-3">
                    <button
                      type="button"
                      onClick={() => setCurrentStep(1)}
                      className="btn outline py-3.5 px-6 text-xs font-head uppercase tracking-wider font-bold flex items-center gap-2 cursor-pointer"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      <span>Back to Step 1</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setCurrentStep(3)}
                      className="btn accent flex-1 py-3.5 text-xs font-head uppercase tracking-wider font-bold flex items-center justify-center gap-2 shadow-sm cursor-pointer"
                    >
                      <span>Continue to Step 3: Compose Text</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 3: COMPOSE & PREVIEW */}
              {currentStep === 3 && (
                <div className="space-y-6">
                  <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-paper-line">
                    <div>
                      <div className="text-[11px] font-head font-bold uppercase tracking-wider text-brand mb-1 flex items-center gap-1.5">
                        <FileText className="w-3.5 h-3.5" /> Step 3 of 4: Compose &amp; Preview
                      </div>
                      <h2 className="font-news-serif text-2xl font-bold text-ink">
                        Compose Advertisement Text
                      </h2>
                      <p className="text-xs text-ink-muted font-sans mt-0.5">
                        Draft your text, apply styling enhancements, and attach necessary legal verification documents.
                      </p>
                    </div>
                    <CutoffCountdownBadge cutoffHour={pub.cutoffHour} />
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

                  {/* Step 3 Navigation Buttons */}
                  <div className="pt-2 flex gap-3">
                    <button
                      type="button"
                      onClick={() => setCurrentStep(2)}
                      className="btn outline py-3.5 px-6 text-xs font-head uppercase tracking-wider font-bold flex items-center gap-2 cursor-pointer"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      <span>Back to Step 2</span>
                    </button>
                    <button
                      type="button"
                      onClick={handleProceed}
                      className="btn accent flex-1 py-3.5 text-xs font-head uppercase tracking-wider font-bold flex items-center justify-center gap-2 shadow-sm cursor-pointer"
                    >
                      <span>Proceed to Checkout (Step 4)</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
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
