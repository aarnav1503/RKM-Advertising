import React, { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { PageHeader } from '../components/layout/PageHeader';
import { NewspaperCard } from '../components/common/NewspaperCard';
import { FaqAccordion } from '../components/home/FaqAccordion';
import { PUBLICATIONS_DATA } from '../data/publicationsData';
import { MEDIA_VERTICALS } from '../data/mediaData';
import {
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
  Clock,
  FileCheck,
  Sparkles,
  Layers,
  Newspaper,
  Layout,
  Maximize2,
  FileText,
  PhoneCall,
  MessageCircle,
} from 'lucide-react';

type AdFormatKey = 'text' | 'cd' | 'display';

interface FormatSpec {
  id: AdFormatKey;
  title: string;
  subtitle: string;
  description: string;
  specs: string;
  tariffRate: string;
  popular?: boolean;
}

const FORMAT_SPECS: FormatSpec[] = [
  {
    id: 'text',
    title: 'Classified Text (ROD)',
    subtitle: 'Run-on-line textual notices charged per word or 5 lines.',
    description:
      'Run-on-line textual notices charged per word or 5 lines. Standard for matrimonials, change of name, and lost & found.',
    specs: 'Text with optional Bold, Highlight Background & Border',
    tariffRate: 'From ₹ 450',
    popular: true,
  },
  {
    id: 'cd',
    title: 'Classified Display (CD)',
    subtitle: 'Custom boxed ads with borders, logos, and custom typography.',
    description:
      'Custom boxed ads with border, logos, and custom typography placed in dedicated classified broadsheet columns.',
    specs: 'Single column (3.8 cm) or double column (7.8 cm), Color / B&W',
    tariffRate: 'From ₹ 1,200',
    popular: false,
  },
  {
    id: 'display',
    title: 'Commercial Display',
    subtitle: 'Large impact page spreads on Page 1, Page 3, and full jackets.',
    description:
      'Large impact page spreads on Page 1, Page 3, Front-page jackets, half and full broadsheet pages for maximum brand reach.',
    specs: 'Quarter page (16x25 cm), Half page (33x25 cm), Full page (33x52 cm)',
    tariffRate: 'From ₹ 12,000',
    popular: false,
  },
];

export const NewspaperAdsPage: React.FC = () => {
  const navigate = useNavigate();
  const vertical = MEDIA_VERTICALS.find((v) => v.id === 'newspaper') || MEDIA_VERTICALS[0];
  const stepsSectionRef = useRef<HTMLDivElement>(null);

  // Flow State
  const [selectedFormat, setSelectedFormat] = useState<AdFormatKey>('text');
  const [selectedPubId, setSelectedPubId] = useState<string>('toi');
  const [filterLang, setFilterLang] = useState<'all' | 'English' | 'Hindi'>('all');

  // Format Specific Customizer States
  // 1. Text ROD States
  const [noticeType, setNoticeType] = useState('Change of Name');
  const [sampleNoticeText, setSampleNoticeText] = useState(
    'I have changed my name from RAHUL KUMAR to RAHUL SHARMA vide Affidavit dated 24/10/2026 sworn before Notary Public New Delhi.'
  );
  const [isBold, setIsBold] = useState(true);
  const [isBorder, setIsBorder] = useState(false);

  // 2. CD States
  const [cdColumn, setCdColumn] = useState<'single' | 'double'>('single');
  const [cdColor, setCdColor] = useState<'bw' | 'color'>('bw');
  const [cdHeightCm, setCdHeightCm] = useState(5);

  // 3. Commercial Display States
  const [displayPosition, setDisplayPosition] = useState<
    'front-jacket' | 'page-3' | 'half-page' | 'full-page'
  >('page-3');

  const filteredPubs = Object.values(PUBLICATIONS_DATA).filter((p) => {
    if (filterLang === 'all') return true;
    return p.language === filterLang;
  });

  const selectedPub = PUBLICATIONS_DATA[selectedPubId] || PUBLICATIONS_DATA.toi;
  const activeFormatObj = FORMAT_SPECS.find((f) => f.id === selectedFormat) || FORMAT_SPECS[0];

  const handleSelectFormat = (formatId: AdFormatKey) => {
    setSelectedFormat(formatId);
    setTimeout(() => {
      stepsSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 120);
  };

  const handleProceedBooking = () => {
    navigate(`/book-ad?media=newspaper&format=${selectedFormat}&pub=${selectedPubId}`);
  };

  return (
    <div className="bg-[#FAF7F2] min-h-screen pb-24">
      <PageHeader
        title="Newspaper Advertising & Classifieds"
        subtitle="Direct INS authorized tariff rates for classified text, display ads, and legal notices across 150+ leading Indian dailies."
        badge="Print Media Partner"
        breadcrumbs={[{ label: 'Media Channels' }, { label: 'Newspaper Ads' }]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 space-y-20">
        {/* ========================================================= */}
        {/* SECTION 1: PRINT AD FORMATS & SPECIFICATIONS (REFERENCE) */}
        {/* ========================================================= */}
        <section id="ad-formats-section" className="pt-2">
          {/* Reference Heading & Subheading */}
          <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
            <h2 className="font-news-serif text-3xl sm:text-4xl lg:text-[40px] font-bold text-slate-900 tracking-tight leading-snug">
              Print Ad Formats &amp; Specifications
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 font-sans mt-2.5 leading-relaxed">
              Choose the format tailored for statutory legal compliance, matrimonial announcements,
              or commercial sales.
            </p>
          </div>

          {/* Reference 3 Format Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-7 items-stretch">
            {FORMAT_SPECS.map((fmt) => {
              const isSelected = selectedFormat === fmt.id;
              const isRod = fmt.id === 'text';

              return (
                <div
                  key={fmt.id}
                  onClick={() => handleSelectFormat(fmt.id)}
                  className={`bg-white rounded-[28px] p-7 sm:p-8 transition-all duration-300 flex flex-col justify-between relative cursor-pointer group ${
                    isSelected
                      ? 'border-2 border-[#EA580C] shadow-xl ring-4 ring-[#EA580C]/10 -translate-y-1'
                      : isRod
                      ? 'border-2 border-[#EA580C] shadow-md hover:shadow-lg'
                      : 'border border-slate-200/90 shadow-sm hover:shadow-md hover:border-slate-300'
                  }`}
                >
                  {/* "MOST POPULAR CHOICE" Docked Pill Badge on Top Border */}
                  {fmt.popular && (
                    <div className="absolute -top-3.5 right-8 z-10">
                      <span className="px-3.5 py-1 rounded-full bg-[#EA580C] text-white text-[10px] sm:text-[11px] font-sans font-bold uppercase tracking-wider shadow-sm flex items-center gap-1">
                        MOST POPULAR CHOICE
                      </span>
                    </div>
                  )}

                  {/* Top Details */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="font-news-serif text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                        {fmt.title}
                      </h3>
                      {isSelected && (
                        <span className="flex items-center gap-1 text-[11px] font-bold text-[#EA580C] bg-orange-50 px-2 py-0.5 rounded-full border border-orange-200">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#EA580C]" />
                          Active
                        </span>
                      )}
                    </div>

                    <p className="text-xs sm:text-[13px] text-slate-600 leading-relaxed min-h-[48px]">
                      {fmt.description}
                    </p>

                    {/* Technical Specs Box matching reference */}
                    <div className="pt-2">
                      <span className="text-[10px] sm:text-[11px] font-sans font-bold uppercase tracking-wider text-[#EA580C] block mb-1.5">
                        TECHNICAL SPECS
                      </span>
                      <div className="bg-[#EFE8DD] text-slate-800 text-xs sm:text-[12.5px] font-mono px-3.5 py-2.5 rounded-xl leading-relaxed border border-stone-200/70">
                        {fmt.specs}
                      </div>
                    </div>
                  </div>

                  {/* Bottom Divider & Tariff Bar matching reference */}
                  <div className="pt-5 mt-6 border-t border-slate-100 flex items-end justify-between">
                    <div>
                      <span className="text-[10px] font-sans font-bold text-slate-400 block uppercase tracking-wider">
                        TARIFF RATE
                      </span>
                      <span className="font-news-serif text-xl sm:text-2xl font-bold text-[#EA580C]">
                        {fmt.tariffRate}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSelectFormat(fmt.id);
                      }}
                      className={`px-6 py-2.5 rounded-full text-xs font-sans font-bold uppercase tracking-wider transition-all duration-200 ${
                        isSelected
                          ? 'bg-[#EA580C] text-white shadow-md'
                          : 'bg-[#18181B] text-white hover:bg-[#EA580C]'
                      }`}
                    >
                      {isSelected ? 'SELECTED' : 'SELECT'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ========================================================= */}
        {/* SECTION 2: DYNAMIC GUIDED STEPS FLOW FOR CHOSEN FORMAT   */}
        {/* ========================================================= */}
        <section
          ref={stepsSectionRef}
          className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-md space-y-10"
        >
          {/* Progress / Service Selection Stepper Header */}
          <div className="border-b border-slate-100 pb-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <span className="text-xs font-sans font-bold uppercase tracking-wider text-[#EA580C] flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  Service Step-by-Step Configuration
                </span>
                <h3 className="font-news-serif text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
                  Configure Your {activeFormatObj.title}
                </h3>
              </div>

              {/* Format Switcher Pills */}
              <div className="flex items-center gap-1.5 bg-slate-100 p-1.5 rounded-2xl">
                {FORMAT_SPECS.map((fmt) => (
                  <button
                    key={fmt.id}
                    onClick={() => setSelectedFormat(fmt.id)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-sans font-bold transition-all ${
                      selectedFormat === fmt.id
                        ? 'bg-white text-slate-900 shadow-sm'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {fmt.id === 'text'
                      ? 'Text (ROD)'
                      : fmt.id === 'cd'
                      ? 'Classified Display'
                      : 'Commercial Display'}
                  </button>
                ))}
              </div>
            </div>

            {/* Stepper Indicator */}
            <div className="grid grid-cols-3 gap-2 mt-6 pt-2">
              <div className="border-t-2 border-[#EA580C] pt-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#EA580C]">
                  Step 1 • Format Selected
                </span>
                <p className="text-xs font-semibold text-slate-900 truncate">
                  {activeFormatObj.title}
                </p>
              </div>
              <div className="border-t-2 border-[#EA580C] pt-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#EA580C]">
                  Step 2 • Publication
                </span>
                <p className="text-xs font-semibold text-slate-900 truncate">
                  {selectedPub.name}
                </p>
              </div>
              <div className="border-t-2 border-slate-300 pt-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Step 3 • Live Preview &amp; Booking
                </span>
                <p className="text-xs font-semibold text-slate-500">INS Clearance</p>
              </div>
            </div>
          </div>

          {/* STEP 2: CHOOSE PUBLICATION */}
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h4 className="font-news-serif text-xl sm:text-2xl font-bold text-slate-900">
                  Select Publication for {activeFormatObj.title}
                </h4>
                <p className="text-xs text-slate-500 mt-1">
                  Choose the authorized Indian daily to broadcast your notice. Rates dynamically
                  recalculate for {activeFormatObj.title}.
                </p>
              </div>

              {/* Language filter */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setFilterLang('all')}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-sans font-bold uppercase tracking-wider transition-all ${
                    filterLang === 'all'
                      ? 'bg-slate-900 text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  All Dailies
                </button>
                <button
                  type="button"
                  onClick={() => setFilterLang('English')}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-sans font-bold uppercase tracking-wider transition-all ${
                    filterLang === 'English'
                      ? 'bg-slate-900 text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  English
                </button>
                <button
                  type="button"
                  onClick={() => setFilterLang('Hindi')}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-sans font-bold uppercase tracking-wider transition-all ${
                    filterLang === 'Hindi'
                      ? 'bg-slate-900 text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  Hindi
                </button>
              </div>
            </div>

            {/* Publication Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredPubs.map((p) => {
                const isPubSelected = selectedPubId === p.id;
                // Calculate display rate based on selected format
                let calculatedRate = `₹${p.baseRate} / 5 lines`;
                if (selectedFormat === 'cd') {
                  calculatedRate = `₹${(p.baseRate * 2.8).toFixed(0)} / sq.cm`;
                } else if (selectedFormat === 'display') {
                  calculatedRate = `₹${(p.baseRate * 25).toLocaleString()} / Quarter Page`;
                }

                return (
                  <div
                    key={p.id}
                    onClick={() => setSelectedPubId(p.id)}
                    className={`relative cursor-pointer transition-all rounded-2xl ${
                      isPubSelected
                        ? 'ring-2 ring-[#EA580C] shadow-md'
                        : 'opacity-90 hover:opacity-100'
                    }`}
                  >
                    <NewspaperCard
                      id={p.id}
                      name={p.name}
                      shortTitle={p.shortTitle}
                      language={p.language}
                      reach={p.reach}
                      copies={p.copies}
                      unit={p.unit}
                      baseRate={p.baseRate}
                      to={`#`}
                    />
                    <div className="px-4 pb-3 pt-1 flex items-center justify-between text-[11px] bg-slate-50 border-t border-slate-100 rounded-b-2xl">
                      <span className="text-slate-500 font-sans">
                        {selectedFormat === 'text'
                          ? 'Classified Text Rate:'
                          : selectedFormat === 'cd'
                          ? 'Box Display Rate:'
                          : 'Commercial Page Rate:'}
                      </span>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-[#EA580C]">{calculatedRate}</span>
                        {isPubSelected && (
                          <span className="inline-flex items-center gap-0.5 text-[10px] font-bold text-white bg-[#EA580C] px-2 py-0.5 rounded-full shadow-sm">
                            <CheckCircle2 className="w-3 h-3" />
                            Selected
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* STEP 3: LIVE FORMAT SIMULATOR & COMPOSER ACCORDING TO FORMAT */}
          <div className="pt-4 border-t border-slate-100">
            <h4 className="font-news-serif text-xl sm:text-2xl font-bold text-slate-900 mb-1">
              Live {activeFormatObj.title} Simulation &amp; Preview
            </h4>
            <p className="text-xs text-slate-500 mb-6">
              Preview real-time newsprint typesetting and styling before proceeding to final
              submission.
            </p>

            {/* FORMAT 1: CLASSIFIED TEXT (ROD) SIMULATOR */}
            {selectedFormat === 'text' && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 bg-slate-50 p-6 sm:p-8 rounded-3xl border border-slate-200/80">
                {/* Notice text composer */}
                <div className="lg:col-span-7 space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="text-xs font-sans font-bold text-slate-700">
                      Notice Category
                    </span>
                    <div className="flex items-center gap-1.5">
                      {['Change of Name', 'Lost & Found', 'Property Sale', 'Matrimonial'].map(
                        (cat) => (
                          <button
                            key={cat}
                            type="button"
                            onClick={() => {
                              setNoticeType(cat);
                              if (cat === 'Lost & Found') {
                                setSampleNoticeText(
                                  'LOST & FOUND: Original Property Title Deed No. 49102 registered at Sub-Registrar Hauz Khas lost between AIIMS and South Ex on 22/10/2026. Finder please contact 9878339302.'
                                );
                              } else if (cat === 'Change of Name') {
                                setSampleNoticeText(
                                  'I have changed my name from RAHUL KUMAR to RAHUL SHARMA vide Affidavit dated 24/10/2026 sworn before Notary Public New Delhi.'
                                );
                              } else if (cat === 'Property Sale') {
                                setSampleNoticeText(
                                  'FOR SALE: Prime 3 BHK Luxury Apartment, 1850 Sq.Ft, South City-1 Gurgaon, Corner Facing, 100% Power Backup, Immediate Possession. Genuine buyers call 9878339302.'
                                );
                              } else {
                                setSampleNoticeText(
                                  'ALLIANCE INVITED for Punjabi Khatri Girl, 28/5\'5", MBA Marketing working in MNC Gurgaon, packages 22 LPA. Looking for well-educated professional boy.'
                                );
                              }
                            }}
                            className={`px-2.5 py-1 rounded-lg text-[11px] font-sans font-medium transition-colors ${
                              noticeType === cat
                                ? 'bg-slate-900 text-white'
                                : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
                            }`}
                          >
                            {cat}
                          </button>
                        )
                      )}
                    </div>
                  </div>

                  <textarea
                    rows={4}
                    value={sampleNoticeText}
                    onChange={(e) => setSampleNoticeText(e.target.value)}
                    className="w-full bg-white border border-slate-300 rounded-2xl p-4 text-xs sm:text-sm font-sans text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#EA580C] focus:border-[#EA580C]"
                    placeholder="Enter notice text..."
                  />

                  {/* Formatting Toggles */}
                  <div className="flex flex-wrap items-center gap-4 text-xs text-slate-700">
                    <label className="flex items-center gap-2 cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={isBold}
                        onChange={(e) => setIsBold(e.target.checked)}
                        className="rounded border-slate-300 text-[#EA580C] focus:ring-[#EA580C]"
                      />
                      <span className="font-semibold">Bold First Line (+15%)</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={isBorder}
                        onChange={(e) => setIsBorder(e.target.checked)}
                        className="rounded border-slate-300 text-[#EA580C] focus:ring-[#EA580C]"
                      />
                      <span className="font-semibold">Framed Border (+20%)</span>
                    </label>
                  </div>
                </div>

                {/* Live Newspaper Simulation Box */}
                <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
                  <div className="bg-[#FAF7F0] p-5 rounded-2xl border border-stone-300 shadow-inner">
                    <div className="text-[10px] font-mono uppercase text-stone-500 border-b border-stone-200 pb-1 mb-3 flex items-center justify-between">
                      <span>{selectedPub.name} • CLASSIFIEDS</span>
                      <span>PAGE 14</span>
                    </div>

                    <div
                      className={`p-3 bg-[#FCFBF7] ${
                        isBorder ? 'border-2 border-stone-800' : 'border-b border-stone-300'
                      }`}
                    >
                      <p
                        className={`text-xs text-stone-900 leading-tight font-serif ${
                          isBold ? 'font-bold' : ''
                        }`}
                      >
                        {sampleNoticeText}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-stone-200 flex items-center justify-between text-xs">
                      <span className="text-stone-600 font-sans">Estimated Word Count:</span>
                      <span className="font-mono font-bold text-stone-900">
                        {sampleNoticeText.trim().split(/\s+/).length} Words (approx 4 lines)
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between bg-white p-4 rounded-2xl border border-slate-200">
                    <div>
                      <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">
                        Estimated Tariff
                      </span>
                      <span className="font-news-serif text-xl font-bold text-[#EA580C]">
                        ₹{selectedPub.baseRate + (isBold ? 70 : 0) + (isBorder ? 90 : 0)} + GST
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={handleProceedBooking}
                      className="px-5 py-2.5 rounded-full bg-[#EA580C] text-white font-sans font-bold text-xs uppercase tracking-wider shadow-md hover:bg-orange-700 transition-all flex items-center gap-1.5"
                    >
                      <span>Proceed to Book</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* FORMAT 2: CLASSIFIED DISPLAY (CD) SIMULATOR */}
            {selectedFormat === 'cd' && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 bg-slate-50 p-6 sm:p-8 rounded-3xl border border-slate-200/80">
                <div className="lg:col-span-7 space-y-5">
                  <div className="space-y-2">
                    <label className="text-xs font-sans font-bold text-slate-700 block">
                      Column Width Configuration
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => setCdColumn('single')}
                        className={`p-3.5 rounded-2xl border text-left transition-all ${
                          cdColumn === 'single'
                            ? 'border-[#EA580C] bg-orange-50/50 ring-2 ring-[#EA580C]/20'
                            : 'border-slate-200 bg-white hover:border-slate-300'
                        }`}
                      >
                        <span className="text-xs font-bold text-slate-900 block">Single Column</span>
                        <span className="text-[11px] text-slate-500">
                          3.8 cm standard classified broadsheet width
                        </span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setCdColumn('double')}
                        className={`p-3.5 rounded-2xl border text-left transition-all ${
                          cdColumn === 'double'
                            ? 'border-[#EA580C] bg-orange-50/50 ring-2 ring-[#EA580C]/20'
                            : 'border-slate-200 bg-white hover:border-slate-300'
                        }`}
                      >
                        <span className="text-xs font-bold text-slate-900 block">Double Column</span>
                        <span className="text-[11px] text-slate-500">
                          7.8 cm high-visibility double width
                        </span>
                      </button>
                    </div>
                  </div>

                  {/* Height Slider */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs font-bold text-slate-700">
                      <span>Ad Height in Centimeters:</span>
                      <span className="text-[#EA580C] font-mono text-sm">{cdHeightCm} cm</span>
                    </div>
                    <input
                      type="range"
                      min={3}
                      max={15}
                      value={cdHeightCm}
                      onChange={(e) => setCdHeightCm(parseInt(e.target.value, 10))}
                      className="w-full accent-[#EA580C]"
                    />
                    <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                      <span>Min 3 cm</span>
                      <span>Max 15 cm</span>
                    </div>
                  </div>

                  {/* Color Option */}
                  <div className="flex items-center gap-4 text-xs">
                    <span className="font-bold text-slate-700">Print Color:</span>
                    <label className="flex items-center gap-1.5 cursor-pointer">
                      <input
                        type="radio"
                        name="cdColor"
                        checked={cdColor === 'bw'}
                        onChange={() => setCdColor('bw')}
                        className="text-[#EA580C] focus:ring-[#EA580C]"
                      />
                      <span>Black &amp; White</span>
                    </label>
                    <label className="flex items-center gap-1.5 cursor-pointer">
                      <input
                        type="radio"
                        name="cdColor"
                        checked={cdColor === 'color'}
                        onChange={() => setCdColor('color')}
                        className="text-[#EA580C] focus:ring-[#EA580C]"
                      />
                      <span>Full Multi-Color (+25%)</span>
                    </label>
                  </div>
                </div>

                {/* Boxed Ad Preview */}
                <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
                  <div className="bg-[#FAF7F0] p-5 rounded-2xl border border-stone-300 shadow-inner flex flex-col items-center">
                    <div className="w-full text-[10px] font-mono uppercase text-stone-500 border-b border-stone-200 pb-1 mb-4 flex items-center justify-between">
                      <span>{selectedPub.name} • DISPLAY BOX</span>
                      <span>
                        {cdColumn === 'single' ? '3.8 cm' : '7.8 cm'} × {cdHeightCm} cm
                      </span>
                    </div>

                    {/* Simulated Boxed Ad */}
                    <div
                      className={`border-2 border-stone-900 p-4 bg-white text-center shadow-sm ${
                        cdColumn === 'single' ? 'w-48' : 'w-72'
                      } ${cdColor === 'color' ? 'border-red-600' : ''}`}
                    >
                      <div className="w-8 h-8 mx-auto bg-stone-100 rounded-lg border border-dashed border-stone-400 flex items-center justify-center text-[9px] text-stone-500 mb-2">
                        LOGO
                      </div>
                      <h5
                        className={`text-xs font-bold leading-tight font-serif mb-1 ${
                          cdColor === 'color' ? 'text-red-700' : 'text-stone-900'
                        }`}
                      >
                        LEGAL ADMISSION NOTICE
                      </h5>
                      <p className="text-[10px] text-stone-600 leading-snug font-sans">
                        Admissions Open for Session 2026-27. Government recognized degree programs
                        with top institutional placements.
                      </p>
                      <div className="mt-2 text-[9px] font-mono font-bold text-stone-800 bg-stone-100 py-0.5 rounded">
                        Ph: +91 9878339302
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between bg-white p-4 rounded-2xl border border-slate-200">
                    <div>
                      <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">
                        Estimated Tariff
                      </span>
                      <span className="font-news-serif text-xl font-bold text-[#EA580C]">
                        ₹
                        {(
                          (cdColumn === 'single' ? 3.8 : 7.8) *
                          cdHeightCm *
                          120 *
                          (cdColor === 'color' ? 1.25 : 1)
                        ).toFixed(0)}{' '}
                        + GST
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={handleProceedBooking}
                      className="px-5 py-2.5 rounded-full bg-[#EA580C] text-white font-sans font-bold text-xs uppercase tracking-wider shadow-md hover:bg-orange-700 transition-all flex items-center gap-1.5"
                    >
                      <span>Proceed to Book</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* FORMAT 3: COMMERCIAL DISPLAY SIMULATOR */}
            {selectedFormat === 'display' && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 bg-slate-50 p-6 sm:p-8 rounded-3xl border border-slate-200/80">
                <div className="lg:col-span-7 space-y-4">
                  <span className="text-xs font-sans font-bold text-slate-700 block">
                    Select Commercial Broadsheet Position
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {[
                      {
                        id: 'front-jacket',
                        title: 'Page 1 Front Super Jacket',
                        dim: 'Full Broadsheet Front Wrap',
                        reach: '100% Guaranteed First Impression',
                      },
                      {
                        id: 'page-3',
                        title: 'Page 3 Premium Display',
                        dim: '33 cm × 25 cm (Half Page)',
                        reach: 'Highest Editorial Retention',
                      },
                      {
                        id: 'half-page',
                        title: 'Half Page Spread',
                        dim: '33 cm × 25 cm (Horizontal/Vertical)',
                        reach: 'Mass Brand Impact',
                      },
                      {
                        id: 'full-page',
                        title: 'Full Page Back / Inside',
                        dim: '33 cm × 52 cm Full Spread',
                        reach: 'Maximum Dominance & Recall',
                      },
                    ].map((pos) => (
                      <button
                        key={pos.id}
                        type="button"
                        onClick={() => setDisplayPosition(pos.id as any)}
                        className={`p-4 rounded-2xl border text-left transition-all ${
                          displayPosition === pos.id
                            ? 'border-[#EA580C] bg-orange-50/50 ring-2 ring-[#EA580C]/20'
                            : 'border-slate-200 bg-white hover:border-slate-300'
                        }`}
                      >
                        <span className="text-xs font-bold text-slate-900 block">{pos.title}</span>
                        <span className="text-[11px] font-mono text-[#EA580C] block mt-0.5">
                          {pos.dim}
                        </span>
                        <span className="text-[10px] text-slate-500 block mt-1">{pos.reach}</span>
                      </button>
                    ))}
                  </div>

                  <div className="p-4 bg-amber-50/60 rounded-2xl border border-amber-200/80 text-xs text-amber-900 flex items-start gap-2.5">
                    <ShieldCheck className="w-4 h-4 text-amber-700 mt-0.5 flex-shrink-0" />
                    <span>
                      Commercial Display bookings require advance material submission (PDF/X-1a)
                      by 4:00 PM prior to print date. RKM Ads provides automated preflight check and
                      official INS receipt.
                    </span>
                  </div>
                </div>

                <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
                  {/* Visual Broadsheet Layout Simulation */}
                  <div className="bg-[#FAF7F0] p-5 rounded-2xl border border-stone-300 shadow-inner flex flex-col items-center">
                    <div className="w-full text-[10px] font-mono uppercase text-stone-500 border-b border-stone-200 pb-1 mb-3 flex items-center justify-between">
                      <span>{selectedPub.name} • BROADSHEET LAYOUT</span>
                      <span>PAGE SPREAD</span>
                    </div>

                    {/* Broadsheet Page Outline */}
                    <div className="w-56 h-72 bg-white border border-stone-300 rounded shadow p-2 flex flex-col justify-between relative overflow-hidden">
                      <div className="border-b border-stone-200 pb-1 mb-1 flex items-center justify-between text-[7px] text-stone-400 font-mono">
                        <span>{selectedPub.shortTitle || 'DAILY'}</span>
                        <span>DATE: 28 OCT 2026</span>
                      </div>

                      {/* Mock Text columns */}
                      <div className="grid grid-cols-3 gap-1 opacity-25">
                        <div className="space-y-1">
                          <div className="h-1 bg-stone-400 rounded"></div>
                          <div className="h-1 bg-stone-300 rounded"></div>
                          <div className="h-1 bg-stone-400 rounded"></div>
                        </div>
                        <div className="space-y-1">
                          <div className="h-1 bg-stone-400 rounded"></div>
                          <div className="h-1 bg-stone-300 rounded"></div>
                          <div className="h-1 bg-stone-400 rounded"></div>
                        </div>
                        <div className="space-y-1">
                          <div className="h-1 bg-stone-400 rounded"></div>
                          <div className="h-1 bg-stone-300 rounded"></div>
                          <div className="h-1 bg-stone-400 rounded"></div>
                        </div>
                      </div>

                      {/* Active Ad Placement */}
                      <div className="bg-[#EA580C]/15 border-2 border-[#EA580C] rounded p-2 text-center flex flex-col items-center justify-center my-auto">
                        <span className="text-[10px] font-bold text-[#EA580C] uppercase tracking-wider block">
                          YOUR DISPLAY AD
                        </span>
                        <span className="text-[8px] text-slate-700 font-mono block">
                          {displayPosition === 'front-jacket'
                            ? 'Page 1 Front Super-Jacket'
                            : displayPosition === 'page-3'
                            ? 'Page 3 Half Page'
                            : displayPosition === 'half-page'
                            ? 'Half Page 33x25 cm'
                            : 'Full Page 33x52 cm'}
                        </span>
                      </div>

                      <div className="text-[7px] text-stone-400 font-mono text-center">
                        Verified 60.2L Daily Circulation
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between bg-white p-4 rounded-2xl border border-slate-200">
                    <div>
                      <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">
                        Estimated Tariff
                      </span>
                      <span className="font-news-serif text-xl font-bold text-[#EA580C]">
                        {displayPosition === 'front-jacket'
                          ? 'From ₹48,000'
                          : displayPosition === 'page-3'
                          ? 'From ₹24,000'
                          : displayPosition === 'half-page'
                          ? 'From ₹18,500'
                          : 'From ₹36,000'}{' '}
                        + GST
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={handleProceedBooking}
                      className="px-5 py-2.5 rounded-full bg-[#EA580C] text-white font-sans font-bold text-xs uppercase tracking-wider shadow-md hover:bg-orange-700 transition-all flex items-center gap-1.5"
                    >
                      <span>Proceed to Book</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* STEP 4: PROCEED ACTION CALLOUT */}
          <div className="p-6 sm:p-7 rounded-2xl bg-slate-900 text-white flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">
            <div className="space-y-1">
              <span className="text-[11px] font-sans font-bold uppercase tracking-wider text-orange-400">
                Ready to release your notice?
              </span>
              <h5 className="font-news-serif text-xl sm:text-2xl font-bold">
                Book {activeFormatObj.title} in {selectedPub.name}
              </h5>
              <p className="text-xs text-slate-300">
                Direct INS authorized rates, zero agency markup, guaranteed release date proof.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={handleProceedBooking}
                className="px-6 py-3 rounded-full bg-[#EA580C] hover:bg-orange-600 text-white font-sans font-bold text-xs uppercase tracking-wider shadow-lg transition-all flex items-center gap-2"
              >
                <span>Continue Booking Ad</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <a
                href="https://wa.me/919878339302?text=Hello%20RKM%20Ads,%20I%20want%20to%20book%20a%20newspaper%20advertisement."
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3 rounded-full border border-slate-700 hover:border-slate-500 text-slate-200 hover:text-white font-sans font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400" />
                <span>WhatsApp Media Desk</span>
              </a>
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* SECTION 3: HERO SHOWCASE & VERIFIED CREDENTIALS           */}
        {/* ========================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6 space-y-5">
            <span className="text-xs font-sans font-bold uppercase tracking-wider text-[#EA580C]">
              India's Largest Print Ad Network
            </span>
            <h2 className="font-news-serif text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
              Book Classified &amp; Display Notices with Live Broadsheet Simulation
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Skip traditional agency hassles and physical counter visits. Compose your notice online,
              preview real-time print formatting, calculate line/word tariffs transparently, and
              receive verified digital e-Tearsheets on release day.
            </p>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-800">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>INS Accredited Rates</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-800">
                <Clock className="w-4 h-4 text-emerald-600" />
                <span>Guaranteed Cut-Off Deadlines</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-800">
                <FileCheck className="w-4 h-4 text-emerald-600" />
                <span>Legal Affidavit Assistance</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-800">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Digital e-Tearsheet Proof</span>
              </div>
            </div>

            <div className="pt-4 flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={handleProceedBooking}
                className="px-6 py-3 rounded-full bg-[#EA580C] text-white font-sans font-bold text-xs uppercase tracking-wider shadow-md hover:bg-orange-700 transition-all flex items-center gap-2"
              >
                <span>Book Classified Ad Now</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <Link
                to="/rate-cards"
                className="px-6 py-3 rounded-full border border-slate-300 bg-white text-slate-800 hover:bg-slate-50 font-sans font-bold text-xs uppercase tracking-wider transition-all"
              >
                Compare 2026 Rate Cards
              </Link>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="relative rounded-3xl overflow-hidden border border-slate-200 shadow-md h-80 sm:h-96">
              <img
                src={vertical.heroImage}
                alt={vertical.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-transparent to-transparent flex items-end p-6">
                <div className="text-white space-y-1">
                  <span className="text-xs font-sans uppercase tracking-wider text-amber-400 font-semibold block">
                    Starting From ₹450 / 5 Lines
                  </span>
                  <div className="font-news-serif text-xl sm:text-2xl font-bold">
                    150+ Dailies • 60M+ Daily Combined Circulation
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* SECTION 4: FAQS                                           */}
        {/* ========================================================= */}
        <FaqAccordion
          items={vertical.faqs}
          title="Newspaper Ad Booking FAQs"
          subtitle="Answers to common queries about publication lead times, affidavit verification, and tear-sheet access."
        />
      </div>
    </div>
  );
};
