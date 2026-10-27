import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';
import {
  STARTER_PUBLICATIONS,
  STANDARD_PUBLICATIONS,
  ADVANCED_PUBLICATIONS,
  PR_DISTRIBUTION_PACKAGES,
  PR_FEATURED_LOGOS,
  PrPublicationOption,
  PrDistributionPackage,
} from '../data/digitalPrData';

export const DigitalPrPage: React.FC = () => {
  // Active Tab: 'coverage' (Guaranteed Media Coverage) or 'distribution' (Press Release Distribution Packages)
  const [activeTab, setActiveTab] = useState<'coverage' | 'distribution'>('coverage');

  // Selected Sites in Tab 1
  const [selectedStarterSite, setSelectedStarterSite] = useState<PrPublicationOption | null>(null);
  const [selectedStandardSite, setSelectedStandardSite] = useState<PrPublicationOption | null>(
    STANDARD_PUBLICATIONS[0] // Defaults to "All - ABP English with Disclaimer (16800 INR)" as in reference image!
  );
  const [selectedAdvancedSite, setSelectedAdvancedSite] = useState<PrPublicationOption | null>(null);

  // Distribution Modal State (Reference Image 3)
  const [isDistributionModalOpen, setIsDistributionModalOpen] = useState(false);
  const [selectedPackageForModal, setSelectedPackageForModal] = useState<PrDistributionPackage | null>(null);
  const [distributionForm, setDistributionForm] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    emailAddress: '',
  });
  const [distributionSubmitted, setDistributionSubmitted] = useState(false);

  // Proposal / Booking Modal State for Tab 1
  const [proposalModalData, setProposalModalData] = useState<{
    tier: string;
    siteName: string;
    price: number;
    actionType: 'proposal' | 'book';
  } | null>(null);
  const [proposalForm, setProposalForm] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
  });
  const [proposalSubmitted, setProposalSubmitted] = useState(false);

  // Sample Report Preview Modal State
  const [sampleReportOpen, setSampleReportOpen] = useState<string | null>(null);

  // Active logo carousel index
  const [activeLogoIndex, setActiveLogoIndex] = useState(0);

  const handleDistributionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!distributionForm.firstName || !distributionForm.phoneNumber) {
      alert('Please fill in your name and phone number.');
      return;
    }
    setDistributionSubmitted(true);
    setTimeout(() => {
      setDistributionSubmitted(false);
      setIsDistributionModalOpen(false);
      setDistributionForm({ firstName: '', lastName: '', phoneNumber: '', emailAddress: '' });
    }, 3000);
  };

  const handleProposalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!proposalForm.name || !proposalForm.phone) {
      alert('Please fill in your contact information.');
      return;
    }
    setProposalSubmitted(true);
    setTimeout(() => {
      setProposalSubmitted(false);
      setProposalModalData(null);
      setProposalForm({ name: '', email: '', phone: '', company: '' });
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-slate-800 font-sans pb-24">
      {/* ====================================================================
          TOP HERO / BANNER (Reference Image 1 Header)
          ==================================================================== */}
      <div className="border-b border-slate-200/80 bg-white py-8 sm:py-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-2">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-news-serif font-bold text-slate-900 tracking-tight leading-snug">
            Top PR Agency In India - #1 PR Company In India
          </h1>
          <p className="text-xs sm:text-sm md:text-base text-slate-600 max-w-4xl mx-auto leading-relaxed">
            We are India&apos;s top PR firm with the best online PR solutions. Providing High-Quality Professional PR Services for Over a Decade. Get an instant press release for major news sites at the lowest cost.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8">
        {/* ====================================================================
            TAB SWITCHER (Reference Image 1 & 2)
            ==================================================================== */}
        <div className="flex justify-center">
          <div className="inline-flex rounded-md shadow-sm border border-slate-200 overflow-hidden bg-white max-w-2xl w-full">
            <button
              type="button"
              onClick={() => setActiveTab('coverage')}
              className={`flex-1 py-3 px-4 text-xs sm:text-sm font-bold transition-all text-center select-none ${
                activeTab === 'coverage'
                  ? 'bg-[#E11D48] text-white shadow-inner'
                  : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              Guaranteed Media Coverage Publication Options
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('distribution')}
              className={`flex-1 py-3 px-4 text-xs sm:text-sm font-bold transition-all text-center select-none border-l border-slate-200 ${
                activeTab === 'distribution'
                  ? 'bg-[#E11D48] text-white shadow-inner'
                  : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              Press Release Distribution Packages
            </button>
          </div>
        </div>

        {/* ====================================================================
            TAB 1: GUARANTEED MEDIA COVERAGE (Reference Image 1)
            ==================================================================== */}
        {activeTab === 'coverage' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
            {/* 1. STARTER Card */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 flex flex-col justify-between space-y-5 hover:shadow-md transition-shadow">
              <div className="space-y-4">
                <h3 className="text-center text-xl font-black tracking-wide text-[#E11D48] uppercase">
                  STARTER
                </h3>

                <ul className="text-xs text-slate-700 space-y-2.5 divide-y divide-slate-100">
                  <li className="pt-1 flex items-start gap-2">
                    <span className="text-[#E11D48] font-bold">•</span>
                    <span>Appropriate for personal brand promotion</span>
                  </li>
                  <li className="pt-2 flex items-start gap-2">
                    <span className="text-[#E11D48] font-bold">•</span>
                    <span>Great value of money</span>
                  </li>
                  <li className="pt-2 flex items-start gap-2">
                    <span className="text-[#E11D48] font-bold">•</span>
                    <span>Grade for building digital visibility at lower budget</span>
                  </li>
                  <li className="pt-2 flex items-start gap-2">
                    <span className="text-[#E11D48] font-bold">•</span>
                    <span>Perfect for starting digital promotion</span>
                  </li>
                  <li className="pt-2 flex items-start gap-2">
                    <span className="text-[#E11D48] font-bold">•</span>
                    <span>Niche specific publishing options available</span>
                  </li>
                </ul>

                {/* Available Site Selection */}
                <div className="pt-2 space-y-1.5">
                  <label className="block text-[11px] font-bold text-slate-700">Available Site</label>
                  <select
                    value={selectedStarterSite?.id || ''}
                    onChange={(e) => {
                      const found = STARTER_PUBLICATIONS.find((p) => p.id === e.target.value) || null;
                      setSelectedStarterSite(found);
                    }}
                    className="w-full text-xs border border-slate-300 rounded px-2.5 py-2 bg-white text-slate-800 focus:outline-none focus:ring-1 focus:ring-[#E11D48]"
                  >
                    <option value="">- Select -</option>
                    {STARTER_PUBLICATIONS.map((pub) => (
                      <option key={pub.id} value={pub.id}>
                        {pub.name} (₹{pub.price.toLocaleString('en-IN')})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Tentative cost (INR) */}
                <div className="space-y-1">
                  <label className="block text-[11px] font-bold text-slate-700">Tentative cost (INR)</label>
                  <div className="bg-[#EEF2F6] border border-slate-300/80 rounded px-3 py-2 text-right font-mono font-bold text-sm text-slate-800">
                    {selectedStarterSite ? selectedStarterSite.price.toLocaleString('en-IN') : '0'}
                  </div>
                </div>

                {/* Reference Links */}
                <div className="text-[11px] text-slate-600 space-y-1 pt-1">
                  <p>
                    Click{' '}
                    <button
                      type="button"
                      onClick={() => setSampleReportOpen('STARTER Media Specimen')}
                      className="text-red-600 font-bold hover:underline cursor-pointer"
                    >
                      here
                    </button>{' '}
                    For Reference
                  </p>
                  <p>
                    Click{' '}
                    <button
                      type="button"
                      onClick={() => setSampleReportOpen('STARTER Sample PR Report')}
                      className="text-red-600 font-bold hover:underline cursor-pointer"
                    >
                      here
                    </button>{' '}
                    For Sample Report
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 pt-3">
                <button
                  type="button"
                  onClick={() =>
                    setProposalModalData({
                      tier: 'STARTER',
                      siteName: selectedStarterSite?.name || 'Starter Tier Media Options',
                      price: selectedStarterSite?.price || 14500,
                      actionType: 'proposal',
                    })
                  }
                  className="flex-1 bg-black hover:bg-slate-800 text-white font-bold py-2 px-2 rounded text-xs transition-colors shadow-sm text-center"
                >
                  Email Proposal
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setProposalModalData({
                      tier: 'STARTER',
                      siteName: selectedStarterSite?.name || 'Starter Tier Media Options',
                      price: selectedStarterSite?.price || 14500,
                      actionType: 'book',
                    })
                  }
                  className="flex-1 bg-black hover:bg-slate-800 text-white font-bold py-2 px-2 rounded text-xs transition-colors shadow-sm text-center"
                >
                  Book Now
                </button>
              </div>
            </div>

            {/* 2. STANDARD Card */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 flex flex-col justify-between space-y-5 hover:shadow-md transition-shadow">
              <div className="space-y-4">
                <h3 className="text-center text-xl font-black tracking-wide text-[#E11D48] uppercase">
                  STANDARD
                </h3>

                <ul className="text-xs text-slate-700 space-y-2.5 divide-y divide-slate-100">
                  <li className="pt-1 flex items-start gap-2">
                    <span className="text-[#E11D48] font-bold">•</span>
                    <span>Suitable for company press release or communication</span>
                  </li>
                  <li className="pt-2 flex items-start gap-2">
                    <span className="text-[#E11D48] font-bold">•</span>
                    <span>Prime choice for major national media</span>
                  </li>
                  <li className="pt-2 flex items-start gap-2">
                    <span className="text-[#E11D48] font-bold">•</span>
                    <span>Excellent for Influencing brand reception across pan India</span>
                  </li>
                  <li className="pt-2 flex items-start gap-2">
                    <span className="text-[#E11D48] font-bold">•</span>
                    <span>Perfect for business of all sizes</span>
                  </li>
                  <li className="pt-2 flex items-start gap-2">
                    <span className="text-[#E11D48] font-bold">•</span>
                    <span>Industry targeting available</span>
                  </li>
                </ul>

                {/* Available Site Selection */}
                <div className="pt-2 space-y-1.5">
                  <label className="block text-[11px] font-bold text-slate-700">Available Site</label>
                  <select
                    value={selectedStandardSite?.id || ''}
                    onChange={(e) => {
                      const found = STANDARD_PUBLICATIONS.find((p) => p.id === e.target.value) || null;
                      setSelectedStandardSite(found);
                    }}
                    className="w-full text-xs border border-slate-300 rounded px-2.5 py-2 bg-white text-slate-800 focus:outline-none focus:ring-1 focus:ring-[#E11D48]"
                  >
                    <option value="">- Select -</option>
                    {STANDARD_PUBLICATIONS.map((pub) => (
                      <option key={pub.id} value={pub.id}>
                        {pub.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Tentative cost (INR) */}
                <div className="space-y-1">
                  <label className="block text-[11px] font-bold text-slate-700">Tentative cost (INR)</label>
                  <div className="bg-[#EEF2F6] border border-slate-300/80 rounded px-3 py-2 text-right font-mono font-bold text-sm text-slate-800">
                    {selectedStandardSite ? selectedStandardSite.price.toLocaleString('en-IN') : '0'}
                  </div>
                </div>

                {/* Reference Links */}
                <div className="text-[11px] text-slate-600 space-y-1 pt-1">
                  <p>
                    Click{' '}
                    <button
                      type="button"
                      onClick={() => setSampleReportOpen('STANDARD Media Specimen')}
                      className="text-red-600 font-bold hover:underline cursor-pointer"
                    >
                      here
                    </button>{' '}
                    For Reference
                  </p>
                  <p>
                    Click{' '}
                    <button
                      type="button"
                      onClick={() => setSampleReportOpen('STANDARD Sample PR Report')}
                      className="text-red-600 font-bold hover:underline cursor-pointer"
                    >
                      here
                    </button>{' '}
                    For Sample Report
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 pt-3">
                <button
                  type="button"
                  onClick={() =>
                    setProposalModalData({
                      tier: 'STANDARD',
                      siteName: selectedStandardSite?.name || 'Standard National Media',
                      price: selectedStandardSite?.price || 32200,
                      actionType: 'proposal',
                    })
                  }
                  className="flex-1 bg-black hover:bg-slate-800 text-white font-bold py-2 px-2 rounded text-xs transition-colors shadow-sm text-center"
                >
                  Email Proposal
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setProposalModalData({
                      tier: 'STANDARD',
                      siteName: selectedStandardSite?.name || 'Standard National Media',
                      price: selectedStandardSite?.price || 32200,
                      actionType: 'book',
                    })
                  }
                  className="flex-1 bg-black hover:bg-slate-800 text-white font-bold py-2 px-2 rounded text-xs transition-colors shadow-sm text-center"
                >
                  Book Now
                </button>
              </div>
            </div>

            {/* 3. ADVANCED Card */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 flex flex-col justify-between space-y-5 hover:shadow-md transition-shadow">
              <div className="space-y-4">
                <h3 className="text-center text-xl font-black tracking-wide text-[#E11D48] uppercase">
                  ADVANCED
                </h3>

                <ul className="text-xs text-slate-700 space-y-2.5 divide-y divide-slate-100">
                  <li className="pt-1 flex items-start gap-2">
                    <span className="text-[#E11D48] font-bold">•</span>
                    <span>Best to reach highly relevant audience</span>
                  </li>
                  <li className="pt-2 flex items-start gap-2">
                    <span className="text-[#E11D48] font-bold">•</span>
                    <span>Tier 1 and tier 2 media availability</span>
                  </li>
                  <li className="pt-2 flex items-start gap-2">
                    <span className="text-[#E11D48] font-bold">•</span>
                    <span>Excellent for Authority and Credibility</span>
                  </li>
                  <li className="pt-2 flex items-start gap-2">
                    <span className="text-[#E11D48] font-bold">•</span>
                    <span>Perfect for Sustainable Global Digital Footprint</span>
                  </li>
                  <li className="pt-2 flex items-start gap-2">
                    <span className="text-[#E11D48] font-bold">•</span>
                    <span>Premium Publication Available Like Entrepreneur.com, Forbes India, The Week Magazine etc.</span>
                  </li>
                </ul>

                {/* Available Site Selection */}
                <div className="pt-2 space-y-1.5">
                  <label className="block text-[11px] font-bold text-slate-700">Available Site</label>
                  <select
                    value={selectedAdvancedSite?.id || ''}
                    onChange={(e) => {
                      const found = ADVANCED_PUBLICATIONS.find((p) => p.id === e.target.value) || null;
                      setSelectedAdvancedSite(found);
                    }}
                    className="w-full text-xs border border-slate-300 rounded px-2.5 py-2 bg-white text-slate-800 focus:outline-none focus:ring-1 focus:ring-[#E11D48]"
                  >
                    <option value="">- Select -</option>
                    {ADVANCED_PUBLICATIONS.map((pub) => (
                      <option key={pub.id} value={pub.id}>
                        {pub.name} (₹{pub.price.toLocaleString('en-IN')})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Tentative cost (INR) */}
                <div className="space-y-1">
                  <label className="block text-[11px] font-bold text-slate-700">Tentative cost (INR)</label>
                  <div className="bg-[#EEF2F6] border border-slate-300/80 rounded px-3 py-2 text-right font-mono font-bold text-sm text-slate-800">
                    {selectedAdvancedSite ? selectedAdvancedSite.price.toLocaleString('en-IN') : '0'}
                  </div>
                </div>

                {/* Reference Links */}
                <div className="text-[11px] text-slate-600 space-y-1 pt-1">
                  <p>
                    Click{' '}
                    <button
                      type="button"
                      onClick={() => setSampleReportOpen('ADVANCED Media Specimen')}
                      className="text-red-600 font-bold hover:underline cursor-pointer"
                    >
                      here
                    </button>{' '}
                    For Reference
                  </p>
                  <p>
                    Click{' '}
                    <button
                      type="button"
                      onClick={() => setSampleReportOpen('ADVANCED Sample PR Report')}
                      className="text-red-600 font-bold hover:underline cursor-pointer"
                    >
                      here
                    </button>{' '}
                    For Sample Report
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 pt-3">
                <button
                  type="button"
                  onClick={() =>
                    setProposalModalData({
                      tier: 'ADVANCED',
                      siteName: selectedAdvancedSite?.name || 'Advanced Tier 1 Media',
                      price: selectedAdvancedSite?.price || 68000,
                      actionType: 'proposal',
                    })
                  }
                  className="flex-1 bg-black hover:bg-slate-800 text-white font-bold py-2 px-2 rounded text-xs transition-colors shadow-sm text-center"
                >
                  Email Proposal
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setProposalModalData({
                      tier: 'ADVANCED',
                      siteName: selectedAdvancedSite?.name || 'Advanced Tier 1 Media',
                      price: selectedAdvancedSite?.price || 68000,
                      actionType: 'book',
                    })
                  }
                  className="flex-1 bg-black hover:bg-slate-800 text-white font-bold py-2 px-2 rounded text-xs transition-colors shadow-sm text-center"
                >
                  Book Now
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ====================================================================
            TAB 2: PRESS RELEASE DISTRIBUTION PACKAGES (Reference Image 2)
            ==================================================================== */}
        {activeTab === 'distribution' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2 items-stretch">
            {PR_DISTRIBUTION_PACKAGES.map((pkg) => (
              <div
                key={pkg.id}
                className={`bg-white rounded-xl shadow-sm p-6 flex flex-col justify-between space-y-5 hover:shadow-md transition-all ${
                  pkg.isPopular
                    ? 'border-2 border-[#E11D48] relative'
                    : 'border border-slate-200'
                }`}
              >
                <div className="space-y-3">
                  <div className="text-center">
                    <h3 className="text-xl font-black tracking-wide text-[#E11D48] uppercase">
                      {pkg.name}
                    </h3>
                    <p className="text-xs font-bold text-slate-800 mt-1">{pkg.subtitle}</p>
                  </div>

                  <ul className="text-xs text-slate-700 space-y-2.5 divide-y divide-slate-100 pt-2">
                    {pkg.features.map((feat, idx) => (
                      <li key={idx} className="pt-2 first:pt-0 flex items-start gap-2">
                        <span className="text-[#E11D48] font-bold">•</span>
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4">
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedPackageForModal(pkg);
                      setIsDistributionModalOpen(true);
                    }}
                    className="w-full bg-black hover:bg-slate-800 text-white font-bold py-2.5 px-4 rounded-lg text-xs transition-colors shadow-sm uppercase tracking-wider"
                  >
                    Get Pricing
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ====================================================================
            KEY POINTS (Reference Image 1)
            ==================================================================== */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm space-y-3">
          <h2 className="text-lg font-bold text-slate-900 tracking-tight">Key Points:</h2>
          <ul className="text-xs sm:text-sm text-slate-700 space-y-2">
            <li className="flex items-start gap-2">
              <span className="text-[#E11D48] font-bold">•</span>
              <span>Content creation is not part of these offer packages.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#E11D48] font-bold">•</span>
              <span>The content will contain 600–700 words only.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#E11D48] font-bold">•</span>
              <span>1–2 images are allowed with the content.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#E11D48] font-bold">•</span>
              <span>1–2 hyperlinks are allowed. Embedded links are not allowed.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#E11D48] font-bold">•</span>
              <span>The links and images are only carried by the publisher as per the policies.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#E11D48] font-bold">•</span>
              <span>Payment Terms: Advance and 18% GST apply.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#E11D48] font-bold">•</span>
              <span>Turnaround time is 48 to 72 hrs after content approval.</span>
            </li>
          </ul>
        </div>

        {/* ====================================================================
            FEATURED LOGOS CAROUSEL / GRID (Reference Image 1)
            ==================================================================== */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm text-center space-y-6">
          <h2 className="text-xs sm:text-sm font-bold uppercase tracking-widest text-slate-700">
            WE GET CLIENTS FEATURED IN INDIA&apos;S TOP NEWS / MEDIA SITES
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 items-center">
            {PR_FEATURED_LOGOS.slice(0, 6).map((logo, idx) => (
              <div
                key={idx}
                className="h-16 rounded-lg border border-slate-100 bg-slate-50/70 p-3 flex items-center justify-center font-bold text-xs sm:text-sm text-slate-800 shadow-2xs hover:bg-white hover:shadow-sm transition-all"
              >
                <span style={{ color: logo.color }}>{logo.label}</span>
              </div>
            ))}
          </div>

          {/* Dot indicator matching Reference Image 1 */}
          <div className="flex items-center justify-center gap-2 pt-2">
            <button
              onClick={() => setActiveLogoIndex(0)}
              className={`w-2.5 h-2.5 rounded-full transition-all ${
                activeLogoIndex === 0 ? 'bg-black w-3 h-3' : 'bg-slate-300'
              }`}
            />
            <button
              onClick={() => setActiveLogoIndex(1)}
              className={`w-2.5 h-2.5 rounded-full transition-all ${
                activeLogoIndex === 1
                  ? 'border-2 border-red-500 bg-white w-3 h-3'
                  : 'border border-red-400 bg-transparent'
              }`}
            />
            <button
              onClick={() => setActiveLogoIndex(2)}
              className={`w-2.5 h-2.5 rounded-full transition-all ${
                activeLogoIndex === 2 ? 'bg-black w-3 h-3' : 'bg-slate-300'
              }`}
            />
          </div>
        </div>

        {/* ====================================================================
            EDUCATIONAL & AGENCY CONTENT (Reference Image 1)
            ==================================================================== */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6 text-slate-700 leading-relaxed text-xs sm:text-sm">
          {/* Article 1 */}
          <article className="space-y-2">
            <h2 className="text-lg sm:text-xl font-news-serif font-bold text-slate-900">
              What is PR (Public Relations)?
            </h2>
            <p>
              Public Relations (PR) is strategic communication that builds positive relationships with audiences. It manages reputation, engages media, strengthens brands, handles crises, and influences public opinion. PR is essential for credibility, visibility, and long-term success. Public relations (PR) involves managing how information about a person or company is shared with the public, including the media. Its main purposes are to share important news or events related to a company, maintain a good reputation.
            </p>
          </article>

          {/* Article 2 */}
          <article className="space-y-2">
            <h2 className="text-lg sm:text-xl font-news-serif font-bold text-slate-900">
              Why is PR Important?
            </h2>
            <p>
              Public relations (PR) is more effective in helping a business grow compared to other marketing activities. PR is important because it helps manage reputation, increase awareness, enhance visibility, attract customers, build strong brands, handle crises effectively, engage stakeholders, and influence public opinion.
            </p>
          </article>

          {/* Article 3 */}
          <article className="space-y-2">
            <h2 className="text-lg sm:text-xl font-news-serif font-bold text-slate-900">
              Why PR services with RKM Advertising?
            </h2>
            <p>
              Empower your <strong>BRAND STORY</strong> to spread across India with <strong>RKM Advertising</strong>. We are bringing brand growth to you at the <strong>LOWEST EVER PRICES</strong> on our PR services. Our professional PR and India&apos;s No 1 Newspaper and media booking services can make all the difference.
            </p>
            <p className="font-medium text-slate-800 pt-1">
              For more details: like price, quotation &amp; costing, visit us at{' '}
              <Link to="/contact" className="text-blue-600 hover:underline">
                www.rkmads.com
              </Link>{' '}
              or call us at{' '}
              <a href="tel:+919878339302" className="text-[#E11D48] font-bold hover:underline">
                +91 9878339302
              </a>
            </p>
          </article>
        </div>
      </div>

      {/* ====================================================================
          PRESS RELEASE DISTRIBUTION PACKAGES MODAL (Reference Image 3)
          ==================================================================== */}
      {isDistributionModalOpen &&
        createPortal(
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in">
            <div className="bg-white rounded-lg max-w-xl w-full shadow-2xl border border-slate-200 overflow-hidden relative text-slate-800">
              {/* Red Circular Close Button (Reference Image 3) */}
              <button
                type="button"
                onClick={() => setIsDistributionModalOpen(false)}
                className="absolute -top-3 -right-3 z-10 w-8 h-8 rounded-full bg-[#E11D48] hover:bg-[#BE123C] text-white flex items-center justify-center font-bold text-sm shadow-md transition-all"
              >
                ✕
              </button>

              {/* Modal Header */}
              <div className="px-6 pt-6 pb-4 border-b border-slate-200">
                <h3 className="font-black text-sm sm:text-base tracking-wide text-slate-900 uppercase">
                  PRESS RELEASE DISTRIBUTION PACKAGES
                </h3>
                {selectedPackageForModal && (
                  <p className="text-xs text-red-600 font-bold mt-0.5">
                    Selected Package: {selectedPackageForModal.name} ({selectedPackageForModal.subtitle})
                  </p>
                )}
              </div>

              {/* Modal Form */}
              <div className="p-6">
                {distributionSubmitted ? (
                  <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 text-center text-emerald-800 space-y-1">
                    <p className="font-bold text-sm">Thank You!</p>
                    <p className="text-xs">
                      Our PR Wire Specialist will email the complete distribution rate sheet within 15 minutes.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleDistributionSubmit} className="space-y-4 text-xs">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-slate-700 font-medium mb-1">First Name</label>
                        <input
                          type="text"
                          required
                          placeholder="Name"
                          value={distributionForm.firstName}
                          onChange={(e) =>
                            setDistributionForm({ ...distributionForm, firstName: e.target.value })
                          }
                          className="w-full border border-slate-300 rounded px-3 py-2 text-xs focus:outline-none focus:border-[#E11D48]"
                        />
                      </div>
                      <div>
                        <label className="block text-slate-700 font-medium mb-1">Last Name</label>
                        <input
                          type="text"
                          placeholder="Last Name"
                          value={distributionForm.lastName}
                          onChange={(e) =>
                            setDistributionForm({ ...distributionForm, lastName: e.target.value })
                          }
                          className="w-full border border-slate-300 rounded px-3 py-2 text-xs focus:outline-none focus:border-[#E11D48]"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-slate-700 font-medium mb-1">Phone Number</label>
                        <input
                          type="tel"
                          required
                          placeholder="Phone Number"
                          value={distributionForm.phoneNumber}
                          onChange={(e) =>
                            setDistributionForm({ ...distributionForm, phoneNumber: e.target.value })
                          }
                          className="w-full border border-slate-300 rounded px-3 py-2 text-xs focus:outline-none focus:border-[#E11D48]"
                        />
                      </div>
                      <div>
                        <label className="block text-slate-700 font-medium mb-1">Email Address</label>
                        <input
                          type="email"
                          required
                          placeholder="Email Address"
                          value={distributionForm.emailAddress}
                          onChange={(e) =>
                            setDistributionForm({ ...distributionForm, emailAddress: e.target.value })
                          }
                          className="w-full border border-slate-300 rounded px-3 py-2 text-xs focus:outline-none focus:border-[#E11D48]"
                        />
                      </div>
                    </div>

                    <div className="pt-2 text-center">
                      <button
                        type="submit"
                        className="bg-black hover:bg-slate-800 text-white font-bold px-8 py-2 rounded text-xs transition-colors shadow"
                      >
                        Submit
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>,
          document.body
        )}

      {/* ====================================================================
          EMAIL PROPOSAL / BOOK NOW MODAL FOR TAB 1
          ==================================================================== */}
      {proposalModalData &&
        createPortal(
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in">
            <div className="bg-white rounded-xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 text-slate-800 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                <div>
                  <h3 className="font-bold text-base text-slate-900">
                    {proposalModalData.actionType === 'proposal'
                      ? 'Request Media Coverage Proposal'
                      : 'Book Media Coverage Package'}
                  </h3>
                  <p className="text-xs text-red-600 font-medium">
                    {proposalModalData.tier} Tier • {proposalModalData.siteName}
                  </p>
                </div>
                <button
                  onClick={() => setProposalModalData(null)}
                  className="text-slate-400 hover:text-slate-600 font-bold"
                >
                  ✕
                </button>
              </div>

              <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 text-xs flex justify-between items-center">
                <span className="text-slate-600">Tentative Media Tariff:</span>
                <span className="font-mono font-bold text-sm text-[#E11D48]">
                  ₹{proposalModalData.price.toLocaleString('en-IN')} + 18% GST
                </span>
              </div>

              {proposalSubmitted ? (
                <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 text-center text-emerald-800 text-xs">
                  <p className="font-bold">Thank You!</p>
                  <p>Our PR strategist will send the editorial schedule and payment link to your email.</p>
                </div>
              ) : (
                <form onSubmit={handleProposalSubmit} className="space-y-3 text-xs">
                  <div>
                    <label className="block text-slate-700 font-medium mb-1">Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="Your full name"
                      value={proposalForm.name}
                      onChange={(e) => setProposalForm({ ...proposalForm, name: e.target.value })}
                      className="w-full border border-slate-300 rounded px-3 py-2 text-xs focus:outline-none focus:border-[#E11D48]"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-slate-700 font-medium mb-1">Email Address *</label>
                      <input
                        type="email"
                        required
                        placeholder="name@company.com"
                        value={proposalForm.email}
                        onChange={(e) => setProposalForm({ ...proposalForm, email: e.target.value })}
                        className="w-full border border-slate-300 rounded px-3 py-2 text-xs focus:outline-none focus:border-[#E11D48]"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-700 font-medium mb-1">Phone Number *</label>
                      <input
                        type="tel"
                        required
                        placeholder="+91 Mobile number"
                        value={proposalForm.phone}
                        onChange={(e) => setProposalForm({ ...proposalForm, phone: e.target.value })}
                        className="w-full border border-slate-300 rounded px-3 py-2 text-xs focus:outline-none focus:border-[#E11D48]"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-slate-700 font-medium mb-1">Company / Brand Name</label>
                    <input
                      type="text"
                      placeholder="e.g. Acme Corp"
                      value={proposalForm.company}
                      onChange={(e) => setProposalForm({ ...proposalForm, company: e.target.value })}
                      className="w-full border border-slate-300 rounded px-3 py-2 text-xs focus:outline-none focus:border-[#E11D48]"
                    />
                  </div>

                  <div className="pt-2 flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setProposalModalData(null)}
                      className="px-4 py-2 border border-slate-300 rounded text-slate-700 hover:bg-slate-50 text-xs font-semibold"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2 bg-[#E11D48] hover:bg-[#BE123C] text-white rounded text-xs font-bold transition-colors shadow"
                    >
                      {proposalModalData.actionType === 'proposal' ? 'Send Proposal' : 'Confirm Booking'}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>,
          document.body
        )}

      {/* ====================================================================
          SAMPLE REPORT / REFERENCE PREVIEW MODAL
          ==================================================================== */}
      {sampleReportOpen &&
        createPortal(
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm animate-in fade-in">
            <div className="bg-white rounded-xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 text-slate-800 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                <div className="flex items-center gap-2">
                  <span className="text-xl">📰</span>
                  <h3 className="font-bold text-sm sm:text-base text-slate-900">{sampleReportOpen}</h3>
                </div>
                <button
                  onClick={() => setSampleReportOpen(null)}
                  className="text-slate-400 hover:text-slate-600 font-bold"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-3 text-xs text-slate-600">
                <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 space-y-1">
                  <div className="flex justify-between font-bold text-slate-900">
                    <span>Sample Live Article URL:</span>
                    <span className="text-emerald-700 font-mono">Indexed on Google News</span>
                  </div>
                  <p className="text-blue-600 underline font-mono text-[11px] truncate">
                    https://news.publisher.com/business/brand-spotlight-innovations-2026
                  </p>
                </div>

                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="bg-slate-50 p-2 rounded border border-slate-100">
                    <span className="block text-[10px] text-slate-400">Word Count</span>
                    <span className="font-bold text-slate-800">650 Words</span>
                  </div>
                  <div className="bg-slate-50 p-2 rounded border border-slate-100">
                    <span className="block text-[10px] text-slate-400">Do-Follow Links</span>
                    <span className="font-bold text-slate-800">1 Hyperlink</span>
                  </div>
                  <div className="bg-slate-50 p-2 rounded border border-slate-100">
                    <span className="block text-[10px] text-slate-400">Turnaround</span>
                    <span className="font-bold text-slate-800">48 Hours</span>
                  </div>
                </div>

                <p className="text-[11px] text-slate-500 italic">
                  * Each article is published directly on the verified publisher domain with permanent archiving and search engine indexing.
                </p>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  type="button"
                  onClick={() => setSampleReportOpen(null)}
                  className="px-5 py-2 bg-black hover:bg-slate-800 text-white rounded text-xs font-bold"
                >
                  Close Specimen
                </button>
              </div>
            </div>
          </div>,
          document.body
        )}
    </div>
  );
};
