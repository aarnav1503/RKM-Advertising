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
  Sparkles,
  Clock,
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
        updates.category = match.name;
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

  const goToStep = (step: number) => {
    setCurrentStep(step);
    // Smoothly scroll to the very top so the user always sees the step header, stepper, and form inputs
    window.scrollTo({ top: 0, behavior: 'smooth' });
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

  const getTomorrowDate = () => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString().slice(0, 10);
  };

  const getUpcomingSundayDate = () => {
    const d = new Date();
    const day = d.getDay();
    const diff = (7 - day) % 7 || 7;
    d.setDate(d.getDate() + diff);
    return d.toISOString().slice(0, 10);
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
      <div className="bg-white border-b border-paper-line py-3 px-3.5 sticky top-[48px] sm:top-16 z-30 shadow-xs">
        <div className="max-w-5xl mx-auto flex items-center justify-between text-xs font-head uppercase tracking-wider">
          {/* Step 1 */}
          <button
            type="button"
            onClick={() => goToStep(1)}
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
            onClick={() => goToStep(2)}
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
            onClick={() => goToStep(3)}
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
            <span className="hidden sm:inline">Compose &amp; Preview</span>
          </button>
          <div className="h-0.5 w-8 bg-paper-line hidden sm:block" />

          {/* Step 4 */}
          <button
            type="button"
            onClick={currentStep === 3 ? handleProceed : undefined}
            disabled={currentStep < 3}
            title={currentStep < 3 ? 'Complete steps 1, 2, and 3 first' : 'Proceed to Checkout'}
            className={`flex items-center gap-2 transition-colors ${
              currentStep === 3
                ? 'text-ink-muted hover:text-brand cursor-pointer'
                : 'text-ink-muted/40 cursor-not-allowed'
            }`}
          >
            <span className={`w-5 h-5 rounded-full flex items-center justify-center font-bold text-[10px] ${
              currentStep === 3 ? 'bg-paper-soft text-ink-muted' : 'bg-paper-soft/60 text-ink-muted/50'
            }`}>
              4
            </span>
            <span className="hidden sm:inline">Checkout</span>
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 pt-4 sm:pt-8 pb-20 sm:pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
          {/* LEFT: Composer Controls & Configuration */}
          <div className="lg:col-span-7 space-y-5 sm:space-y-6">
            <div id="composer-card" className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-8 border border-paper-line shadow-press space-y-5 sm:space-y-6">
              
              {/* STEP 1: EDITION & COVERAGE (NEWSPAPER LOCKED & CONFIRMED) */}
              {currentStep === 1 && (
                <div key="step-1" className="space-y-6 step-transition">
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
                      onClick={() => goToStep(2)}
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
                <div key="step-2" className="space-y-6 step-transition">
                  {/* Step 2 Header */}
                  <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-paper-line">
                    <div>
                      <div className="text-[11px] font-head font-bold uppercase tracking-wider text-brand mb-1 flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5" /> Step 2 of 4: Category &amp; Date
                      </div>
                      <h2 className="font-news-serif text-2xl font-bold text-ink">
                        Select Notice Classification &amp; Scheduled Print Date
                      </h2>
                      <p className="text-xs text-ink-muted font-sans mt-0.5">
                        Choose the official classified category under which your notice will be indexed, and specify your preferred print publication schedule.
                      </p>
                    </div>
                    <CutoffCountdownBadge cutoffHour={pub.cutoffHour} />
                  </div>

                  {/* Section 1: Choose Notice Category (Visual Grid) */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-head font-bold uppercase tracking-wider text-ink flex items-center gap-2">
                        <span>1. Choose Notice Classification</span>
                        <span className="text-[10px] text-brand font-semibold font-sans bg-brand-light/50 px-2 py-0.5 rounded-full">
                          {CATEGORY_TEMPLATES.length} Formats Available
                        </span>
                      </label>
                      <span className="text-[11px] text-ink-muted hidden sm:inline">
                        Click any card to select &amp; load legal template
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {CATEGORY_TEMPLATES.map((tmpl) => {
                        const isSelected = booking.category.toLowerCase() === tmpl.name.toLowerCase();
                        return (
                          <button
                            key={tmpl.name}
                            type="button"
                            onClick={() => setCategoryTemplate(tmpl.name)}
                            className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between gap-2.5 relative ${
                              isSelected
                                ? 'bg-white border-brand shadow-sm ring-1 ring-brand'
                                : 'bg-paper-tint border-paper-line hover:border-brand/40 hover:bg-white'
                            }`}
                          >
                            <div>
                              <div className="flex items-center justify-between gap-2">
                                <span className="font-head text-xs sm:text-[13px] font-bold text-ink flex items-center gap-2">
                                  <span className={`w-2.5 h-2.5 rounded-full ${isSelected ? 'bg-brand' : 'bg-paper-line'}`} />
                                  {tmpl.name}
                                </span>
                                <span className={`text-[10px] font-head font-bold uppercase tracking-wider px-2 py-0.5 rounded-full shrink-0 ${
                                  isSelected ? 'bg-brand/10 text-brand' : 'bg-paper-soft text-ink-muted'
                                }`}>
                                  From ₹{tmpl.baseMinRate}
                                </span>
                              </div>
                              <p className="text-[11px] text-ink-muted font-sans mt-1 line-clamp-2 leading-relaxed">
                                {tmpl.description}
                              </p>
                            </div>

                            {tmpl.requiredDoc ? (
                              <div className="text-[10px] font-head font-medium text-amber-800 bg-amber-50 border border-amber-200/70 px-2 py-1 rounded-lg flex items-center gap-1.5 truncate">
                                <AlertCircle className="w-3 h-3 text-amber-600 shrink-0" />
                                <span className="truncate">Affidavit / Authority Document Required</span>
                              </div>
                            ) : (
                              <div className="text-[10px] font-head font-medium text-emerald-800 bg-emerald-50/70 border border-emerald-200/50 px-2 py-1 rounded-lg flex items-center gap-1.5">
                                <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0" />
                                <span>Direct Editorial Insertion (No Doc Needed)</span>
                              </div>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Section 2: Publishing Date & Schedule */}
                  <div className="space-y-3 pt-2">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-head font-bold uppercase tracking-wider text-ink flex items-center gap-2">
                        <span>2. Scheduled Print Insertion Date</span>
                        <span className="text-brand text-xs">*</span>
                      </label>
                      <span className="text-[11px] text-brand font-head font-semibold flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" /> Next Day Morning Press
                      </span>
                    </div>

                    {/* Quick Date Chips & Date Input */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                      <button
                        type="button"
                        onClick={() => updateBooking({ publishDate: getTomorrowDate() })}
                        className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                          booking.publishDate === getTomorrowDate()
                            ? 'border-brand bg-brand-light/30 ring-1 ring-brand font-medium'
                            : 'border-paper-line bg-paper-tint hover:bg-white'
                        }`}
                      >
                        <div className="text-[10px] font-head uppercase tracking-wider text-brand font-bold">Fastest Insertion</div>
                        <div className="text-xs font-head font-bold text-ink mt-0.5">Tomorrow Morning</div>
                        <div className="text-[10.5px] text-ink-muted font-mono mt-0.5">{getTomorrowDate()}</div>
                      </button>

                      <button
                        type="button"
                        onClick={() => updateBooking({ publishDate: getUpcomingSundayDate() })}
                        className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                          booking.publishDate === getUpcomingSundayDate()
                            ? 'border-brand bg-brand-light/30 ring-1 ring-brand font-medium'
                            : 'border-paper-line bg-paper-tint hover:bg-white'
                        }`}
                      >
                        <div className="text-[10px] font-head uppercase tracking-wider text-amber-800 font-bold">Peak Readership</div>
                        <div className="text-xs font-head font-bold text-ink mt-0.5">Sunday Special Issue</div>
                        <div className="text-[10.5px] text-ink-muted font-mono mt-0.5">{getUpcomingSundayDate()}</div>
                      </button>

                      <div className="p-2.5 rounded-xl border border-paper-line bg-paper-tint flex flex-col justify-between">
                        <div className="text-[10px] font-head uppercase tracking-wider text-ink-muted font-bold mb-1">Pick Exact Date</div>
                        <input
                          type="date"
                          min={getMinDate()}
                          value={booking.publishDate}
                          onChange={(e) => updateBooking({ publishDate: e.target.value })}
                          className="w-full bg-white border border-paper-line rounded-lg px-2.5 py-1.5 text-xs font-sans text-ink focus:outline-none focus:border-brand font-medium cursor-pointer"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Section 3: Selected Category Advisory & Guidelines Box */}
                  {currentCategoryObj && (
                    <div className="p-4 rounded-2xl bg-paper-tint border border-paper-line space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-head font-bold uppercase tracking-wider text-ink flex items-center gap-1.5">
                          <ShieldCheck className="w-4 h-4 text-emerald-700" />
                          {currentCategoryObj.name} • Official Editorial Guidelines
                        </span>
                        <span className="text-[10px] text-ink-muted font-head uppercase">Pre-Loaded in Step 3</span>
                      </div>
                      <p className="text-xs text-ink-muted leading-relaxed font-sans">
                        Your ad will appear in the dedicated <strong>{currentCategoryObj.name}</strong> column of {pub.name} ({booking.edition} Edition).
                        {currentCategoryObj.requiredDoc ? (
                          <span className="text-amber-900 block mt-1 font-medium">
                            Notice: Please have your {currentCategoryObj.requiredDoc.toLowerCase()} ready to attach in Step 3.
                          </span>
                        ) : (
                          <span className="text-emerald-800 block mt-1 font-medium">
                            Standard commercial classified ad. No notary affidavit required for publishing.
                          </span>
                        )}
                      </p>
                    </div>
                  )}

                  {/* Step 2 Navigation Buttons */}
                  <div className="pt-3 border-t border-paper-line flex flex-col sm:flex-row gap-2.5 sm:gap-3 items-stretch sm:items-center">
                    <button
                      type="button"
                      onClick={() => goToStep(1)}
                      className="btn outline py-3.5 px-5 text-xs font-head uppercase tracking-wider font-bold shrink-0 flex items-center justify-center gap-2 cursor-pointer order-2 sm:order-1"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      <span>Back to Step 1</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => goToStep(3)}
                      className="btn accent flex-1 min-w-0 py-3.5 px-5 text-xs font-head uppercase tracking-wider font-bold flex items-center justify-center gap-2 shadow-accent hover:-translate-y-0.5 transition-all cursor-pointer order-1 sm:order-2"
                    >
                      <span>Continue to Step 3: Compose Text</span>
                      <ArrowRight className="w-4 h-4 shrink-0" />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 3: COMPOSE & PREVIEW */}
              {currentStep === 3 && (
                <div key="step-3" className="space-y-6 step-transition">
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

                  {/* Advertisement Copy Textarea with Formatting Bar */}
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-head font-bold uppercase tracking-wider text-ink flex items-center gap-1.5">
                        <span>Advertisement Notice Content</span>
                        <span className="text-brand">*</span>
                      </label>
                      <span className="text-[11.5px] font-head font-semibold text-brand bg-brand-light/40 px-2.5 py-0.5 rounded-full">
                        {pub.name} bills by {pub.unit} ({pub.baseUnits} base {pub.unit}s included)
                      </span>
                    </div>

                    {/* Unified Cohesive Editor Container */}
                    <div className="border border-paper-line rounded-2xl bg-paper-tint/40 focus-within:bg-white focus-within:border-brand focus-within:ring-2 focus-within:ring-brand/10 transition-all overflow-hidden shadow-xs">
                      {/* Editor Top Toolbar */}
                      <div className="flex flex-wrap items-center justify-between gap-2 bg-paper-soft/90 px-3.5 py-2 border-b border-paper-line text-xs">
                        <div className="flex items-center gap-1.5">
                          <span className="text-[10px] font-head font-bold uppercase tracking-wider text-ink-muted">Quick Case:</span>
                          <button
                            type="button"
                            onClick={() => updateBooking({ adText: booking.adText.toUpperCase() })}
                            className="px-2.5 py-1 rounded-md bg-white border border-paper-line text-[10.5px] font-head font-semibold text-ink hover:border-brand hover:text-brand shadow-2xs transition-colors cursor-pointer"
                          >
                            ALL CAPS
                          </button>
                          <button
                            type="button"
                            onClick={() =>
                              updateBooking({
                                adText: booking.adText.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()),
                              })
                            }
                            className="px-2.5 py-1 rounded-md bg-white border border-paper-line text-[10.5px] font-head font-semibold text-ink hover:border-brand hover:text-brand shadow-2xs transition-colors cursor-pointer"
                          >
                            Title Case
                          </button>
                        </div>

                        <div className="flex items-center gap-2">
                          {currentCategoryObj?.sampleText && (
                            <button
                              type="button"
                              onClick={() => updateBooking({ adText: currentCategoryObj.sampleText })}
                              className="text-[11px] font-head font-bold text-brand hover:underline cursor-pointer flex items-center gap-1"
                            >
                              <Sparkles className="w-3.5 h-3.5" />
                              <span>Fill Sample Notice</span>
                            </button>
                          )}
                          {booking.adText && (
                            <button
                              type="button"
                              onClick={() => updateBooking({ adText: '' })}
                              className="text-[10.5px] font-head font-semibold text-ink-muted hover:text-red-600 cursor-pointer ml-1"
                            >
                              Clear
                            </button>
                          )}
                        </div>
                      </div>

                      {/* Textarea Input */}
                      <textarea
                        rows={6}
                        value={booking.adText}
                        onChange={(e) => updateBooking({ adText: e.target.value })}
                        placeholder="Type or paste your advertisement notice text here..."
                        className="w-full p-4 text-xs sm:text-[13.5px] font-sans text-ink bg-transparent focus:outline-none leading-relaxed resize-y min-h-[140px]"
                      />

                      {/* Editor Bottom Meter Bar */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 px-3.5 py-2.5 bg-paper-soft/50 border-t border-paper-line text-xs font-sans">
                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-full bg-brand" />
                            <span>
                              Words: <strong className="text-ink font-mono font-bold">{booking.calculatedPrice.words}</strong>
                            </span>
                          </div>
                          <span className="text-paper-line">•</span>
                          <div className="flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-full bg-emerald-600" />
                            <span>
                              Lines: <strong className="text-ink font-mono font-bold">{booking.calculatedPrice.lines}</strong>
                              <span className="text-[11px] text-ink-muted ml-1">(~35 chars/line)</span>
                            </span>
                          </div>
                        </div>

                        <div className="text-right">
                          <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10.5px] font-head font-bold uppercase tracking-wider ${
                            booking.calculatedPrice.extraUnits > 0
                              ? 'bg-amber-100 text-amber-900 border border-amber-200'
                              : 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                          }`}>
                            {booking.calculatedPrice.extraUnits > 0
                              ? `+${booking.calculatedPrice.extraUnits} Extra ${pub.unit}s Billed`
                              : `Within Base ${pub.baseUnits} ${pub.unit}s Limit`}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Visual Enhancements Toggles */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="block text-xs font-head font-bold uppercase tracking-wider text-ink">
                        Visual Enhancements (Boost Visibility)
                      </label>
                      <span className="text-[11px] text-ink-muted font-sans">Optional broadsheet styling</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {/* Bold First Line */}
                      <label className={`flex items-start gap-3 p-3.5 rounded-2xl border transition-all cursor-pointer select-none ${
                        booking.enhancements.bold
                          ? 'border-brand bg-brand-light/30 ring-1 ring-brand shadow-xs'
                          : 'border-paper-line bg-paper-tint hover:bg-white hover:border-ink-muted/30'
                      }`}>
                        <input
                          type="checkbox"
                          checked={booking.enhancements.bold}
                          onChange={(e) =>
                            updateBooking({
                              enhancements: { ...booking.enhancements, bold: e.target.checked },
                            })
                          }
                          className="mt-0.5 rounded text-brand focus:ring-brand accent-brand w-4 h-4 shrink-0 cursor-pointer"
                        />
                        <div className="min-w-0">
                          <div className="text-xs font-head font-bold text-ink">Bold First Line</div>
                          <div className="text-[11px] text-ink-muted mt-0.5">Headline emphasis</div>
                          <div className="text-[11px] font-mono font-bold text-brand mt-1.5">+₹50 flat</div>
                        </div>
                      </label>

                      {/* Color Highlight */}
                      <label className={`flex items-start gap-3 p-3.5 rounded-2xl border transition-all cursor-pointer select-none ${
                        booking.enhancements.colorBg
                          ? 'border-brand bg-brand-light/30 ring-1 ring-brand shadow-xs'
                          : 'border-paper-line bg-paper-tint hover:bg-white hover:border-ink-muted/30'
                      }`}>
                        <input
                          type="checkbox"
                          checked={booking.enhancements.colorBg}
                          onChange={(e) =>
                            updateBooking({
                              enhancements: { ...booking.enhancements, colorBg: e.target.checked },
                            })
                          }
                          className="mt-0.5 rounded text-brand focus:ring-brand accent-brand w-4 h-4 shrink-0 cursor-pointer"
                        />
                        <div className="min-w-0">
                          <div className="text-xs font-head font-bold text-ink">Color Highlight</div>
                          <div className="text-[11px] text-ink-muted mt-0.5">Yellow broadsheet tint</div>
                          <div className="text-[11px] font-mono font-bold text-brand mt-1.5">+₹150 flat</div>
                        </div>
                      </label>

                      {/* Border & Tick */}
                      <label className={`flex items-start gap-3 p-3.5 rounded-2xl border transition-all cursor-pointer select-none ${
                        booking.enhancements.borderTick
                          ? 'border-brand bg-brand-light/30 ring-1 ring-brand shadow-xs'
                          : 'border-paper-line bg-paper-tint hover:bg-white hover:border-ink-muted/30'
                      }`}>
                        <input
                          type="checkbox"
                          checked={booking.enhancements.borderTick}
                          onChange={(e) =>
                            updateBooking({
                              enhancements: { ...booking.enhancements, borderTick: e.target.checked },
                            })
                          }
                          className="mt-0.5 rounded text-brand focus:ring-brand accent-brand w-4 h-4 shrink-0 cursor-pointer"
                        />
                        <div className="min-w-0">
                          <div className="text-xs font-head font-bold text-ink">Border &amp; Tick</div>
                          <div className="text-[11px] text-ink-muted mt-0.5">Surrounding box border</div>
                          <div className="text-[11px] font-mono font-bold text-brand mt-1.5">+₹30 flat</div>
                        </div>
                      </label>
                    </div>
                  </div>

                  {/* Legal Document Upload if Required */}
                  {currentCategoryObj?.requiredDoc && (
                    <div className="p-4 sm:p-5 rounded-2xl bg-amber-50/60 border border-amber-200/80 space-y-3">
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-xl bg-amber-200/80 text-amber-900 flex items-center justify-center shrink-0 mt-0.5">
                          <AlertCircle className="w-4 h-4 text-brand" />
                        </div>
                        <div>
                          <div className="text-xs font-head font-bold uppercase tracking-wider text-amber-950 flex items-center gap-2">
                            <span>Mandatory Statutory Document</span>
                            <span className="text-[9.5px] px-2 py-0.5 bg-amber-200 text-amber-900 rounded-full font-bold uppercase tracking-wider">INS Requirement</span>
                          </div>
                          <p className="text-xs text-amber-900/90 font-sans mt-1 leading-relaxed">
                            {currentCategoryObj.requiredDoc}
                          </p>
                        </div>
                      </div>

                      <div className="pt-2 border-t border-amber-200/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <label className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-amber-300 text-xs font-head font-bold uppercase tracking-wider text-amber-900 hover:bg-amber-100/60 cursor-pointer shadow-xs transition-all hover:border-amber-400">
                          <UploadCloud className="w-4 h-4 text-brand" />
                          <span>{uploadedFile ? 'Change Attached Document' : 'Upload Affidavit / Supporting PDF'}</span>
                          <input
                            type="file"
                            accept=".pdf,.jpg,.jpeg,.png"
                            onChange={handleFileUpload}
                            className="hidden"
                          />
                        </label>
                        {uploadedFile ? (
                          <div className="text-xs text-emerald-800 font-medium inline-flex items-center gap-1.5 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-xl truncate max-w-full shadow-2xs">
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                            <span className="truncate">{uploadedFile}</span>
                            <span className="text-[10px] text-emerald-600 shrink-0 font-bold ml-1">• Ready</span>
                          </div>
                        ) : (
                          <span className="text-[11px] text-amber-800/80 font-sans">
                            Accepted: PDF, JPG, PNG (Max 10MB)
                          </span>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Step 3 Navigation Buttons */}
                  <div className="pt-4 border-t border-paper-line flex flex-col sm:flex-row gap-2.5 sm:gap-3 items-stretch sm:items-center">
                    <button
                      type="button"
                      onClick={() => goToStep(2)}
                      className="btn outline py-3.5 px-5 text-xs font-head uppercase tracking-wider font-bold shrink-0 flex items-center justify-center gap-2 cursor-pointer order-2 sm:order-1"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      <span>Back to Step 2</span>
                    </button>
                    <button
                      type="button"
                      onClick={handleProceed}
                      className="btn accent flex-1 min-w-0 py-3.5 px-5 text-xs font-head uppercase tracking-wider font-bold flex items-center justify-center gap-2 shadow-accent hover:-translate-y-0.5 transition-all cursor-pointer order-1 sm:order-2"
                    >
                      <span>Proceed to Checkout (Step 4)</span>
                      <ArrowRight className="w-4 h-4 shrink-0" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* RIGHT: Live Broadsheet Simulator & Real-Time Bill */}
          <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-24">
            <LiveBroadsheetSimulator booking={booking} />
            <TariffBreakdownCard
              booking={booking}
              onProceed={handleProceed}
              showProceedButton={currentStep === 3}
              currentStep={currentStep}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
