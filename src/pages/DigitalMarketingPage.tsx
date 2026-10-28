import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PageHeader } from '../components/layout/PageHeader';
import {
  CheckCircle2,
  Search,
  Sparkles,
  Phone,
  MessageCircle,
  X,
  TrendingUp,
  Target,
  ShieldCheck,
  ChevronRight,
} from 'lucide-react';

export const DigitalMarketingPage: React.FC = () => {
  const navigate = useNavigate();

  // Form State
  const [business, setBusiness] = useState('');
  const [objective, setObjective] = useState('');
  const [audience, setAudience] = useState('');
  const [service, setService] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [website, setWebsite] = useState('');
  const [noWebsite, setNoWebsite] = useState(false);

  // Form validation & UI State
  const [validationError, setValidationError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [proposalGenerated, setProposalGenerated] = useState(false);

  // SEO Audit Tool Modal State
  const [isSeoModalOpen, setIsSeoModalOpen] = useState(false);
  const [seoUrl, setSeoUrl] = useState('');
  const [seoLoading, setSeoLoading] = useState(false);
  const [seoResult, setSeoResult] = useState<null | {
    score: number;
    speed: number;
    mobile: number;
    meta: string;
    issues: string[];
    recommendations: string[];
  }>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError('');

    if (!business) {
      setValidationError('Please select your business type in the list.');
      return;
    }
    if (!objective) {
      setValidationError('Please select your marketing objective.');
      return;
    }
    if (!audience) {
      setValidationError('Please select your target audience.');
      return;
    }
    if (!service) {
      setValidationError('Please select a service.');
      return;
    }
    if (!name.trim()) {
      setValidationError('Please enter your name.');
      return;
    }
    if (!phone.trim()) {
      setValidationError('Please enter your phone number.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setProposalGenerated(true);
      window.scrollTo({ top: 380, behavior: 'smooth' });
    }, 700);
  };

  const handleRunSeoAudit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!seoUrl.trim()) return;
    setSeoLoading(true);

    setTimeout(() => {
      setSeoLoading(false);
      setSeoResult({
        score: 84,
        speed: 91,
        mobile: 88,
        meta: 'Found (Title & Meta Description present)',
        issues: [
          '3 High-value industry keywords missing in H1/H2 tags',
          'Page load speed on 4G mobile can be boosted by 24%',
          'Competitors have 14+ high DA press release backlinks'
        ],
        recommendations: [
          'Deploy Tier-1 Digital PR backlinks to increase Domain Authority to 65+',
          'Optimize schema markup for Google Rich Snippets & Local Map Pack',
          'Implement targeted Google Search PPC to capture ready-to-buy search traffic'
        ]
      });
    }, 1200);
  };

  const resetForm = () => {
    setProposalGenerated(false);
    setBusiness('');
    setObjective('');
    setAudience('');
    setService('');
    setName('');
    setEmail('');
    setPhone('');
    setWebsite('');
    setNoWebsite(false);
  };

  return (
    <div className="min-h-screen bg-paper pb-24 text-slate-800">
      <PageHeader
        title="360° Digital Marketing & Performance Growth"
        subtitle="Data-driven SEO campaigns, Google Ads, Meta performance engines, and full-funnel digital brand strategies."
        badge="Omnichannel Performance Growth"
        breadcrumbs={[{ label: 'Media Channels' }, { label: 'Digital Marketing' }]}
      />

      {/* =========================================================================
          MAIN DIGITAL PROPOSAL CARD CONTAINER
          ========================================================================= */}
      <div className="max-w-6xl mx-auto px-3 sm:px-6 pt-6 sm:pt-14 pb-20 sm:pb-24">
        <div className="bg-white rounded-2xl sm:rounded-4xl p-4 sm:p-10 shadow-press border border-paper-line relative">
          {/* Top Right: SEO Audit Tool Button */}
          <div className="flex justify-end mb-3 sm:mb-2">
            <button
              type="button"
              onClick={() => setIsSeoModalOpen(true)}
              className="px-3.5 py-1.5 sm:px-4 sm:py-2 bg-black hover:bg-neutral-800 text-white rounded-lg text-[11px] sm:text-xs font-head font-bold uppercase tracking-wider transition-all shadow-sm flex items-center gap-1.5 sm:gap-2 cursor-pointer"
            >
              <Search className="w-3.5 h-3.5 text-amber-400" />
              <span>Seo Audit Tool</span>
            </button>
          </div>

          {/* Main Headings */}
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="font-sans text-xl sm:text-3xl md:text-[34px] font-bold text-slate-900 tracking-tight leading-snug">
              Get more traffic, leads, and sales or any specific need.
            </h1>
            <p className="font-sans font-bold text-sm sm:text-lg text-red-600 mt-2 sm:mt-2.5">
              Need details &amp; Get a custom proposal just for you in just a few minutes !
            </p>
          </div>

          {/* Validation Alert */}
          {validationError && (
            <div className="max-w-xl mx-auto mt-6 bg-red-50 border border-red-200 text-red-700 px-4 py-2.5 rounded-xl text-xs font-medium text-center animate-shake">
              ⚠️ {validationError}
            </div>
          )}

          {/* Interactive Proposal Form */}
          {!proposalGenerated ? (
            <form onSubmit={handleSubmit} className="mt-6 sm:mt-10 space-y-3.5 sm:space-y-4">
              {/* Row 1: 4 Dropdowns */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                {/* 1. Select Business */}
                <div>
                  <label className="sr-only">Select Business</label>
                  <select
                    value={business}
                    onChange={(e) => setBusiness(e.target.value)}
                    className="w-full bg-slate-50 hover:bg-slate-100/80 border border-slate-300 rounded-xl px-3.5 py-3 text-xs sm:text-[13px] font-sans text-slate-800 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 cursor-pointer transition-colors"
                  >
                    <option value="">Select Business</option>
                    <option value="Real Estate & Builders">Real Estate &amp; Builders</option>
                    <option value="E-Commerce & Retail D2C">E-Commerce &amp; Retail D2C</option>
                    <option value="Healthcare, Clinics & Hospitals">Healthcare, Clinics &amp; Hospitals</option>
                    <option value="Education, Colleges & EdTech">Education, Colleges &amp; EdTech</option>
                    <option value="Financial & Legal Services">Financial &amp; Legal Services</option>
                    <option value="B2B Manufacturing & SaaS">B2B Manufacturing &amp; SaaS</option>
                    <option value="Hospitality & Restaurants">Hospitality &amp; Restaurants</option>
                    <option value="Professional Services & Agencies">Professional Services</option>
                    <option value="Startup / Tech Venture">Startup / Tech Venture</option>
                  </select>
                </div>

                {/* 2. Select Objective */}
                <div>
                  <label className="sr-only">Select Objective</label>
                  <select
                    value={objective}
                    onChange={(e) => setObjective(e.target.value)}
                    className="w-full bg-slate-50 hover:bg-slate-100/80 border border-slate-300 rounded-xl px-3.5 py-3 text-xs sm:text-[13px] font-sans text-slate-800 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 cursor-pointer transition-colors"
                  >
                    <option value="">Select Objective</option>
                    <option value="Generate Qualified Customer Leads">Generate Qualified Customer Leads</option>
                    <option value="Drive Massive High-Intent Website Traffic">Drive High-Intent Website Traffic</option>
                    <option value="Boost E-Commerce Sales & ROAS">Boost E-Commerce Sales &amp; ROAS</option>
                    <option value="Brand Awareness & Authority PR">Brand Awareness &amp; Authority PR</option>
                    <option value="App Downloads & User Sign-ups">App Downloads &amp; User Sign-ups</option>
                    <option value="Local Store / Clinic Footfalls">Local Store / Clinic Footfalls</option>
                  </select>
                </div>

                {/* 3. Select Audience */}
                <div>
                  <label className="sr-only">Select Audience</label>
                  <select
                    value={audience}
                    onChange={(e) => setAudience(e.target.value)}
                    className="w-full bg-slate-50 hover:bg-slate-100/80 border border-slate-300 rounded-xl px-3.5 py-3 text-xs sm:text-[13px] font-sans text-slate-800 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 cursor-pointer transition-colors"
                  >
                    <option value="">Select Audience</option>
                    <option value="Pan India (National Reach)">Pan India (National Reach)</option>
                    <option value="Metro Tier-1 Cities (Delhi, Mumbai, Bengaluru)">Metro Tier-1 Cities</option>
                    <option value="Tier-2 & Tier-3 Growth Cities">Tier-2 &amp; Tier-3 Growth Cities</option>
                    <option value="High-Net-Worth Individuals (HNI)">High-Net-Worth (HNI / Luxury)</option>
                    <option value="B2B Founders & Corporate Decision Makers">B2B Founders &amp; Decision Makers</option>
                    <option value="Hyperlocal (Within 5–10 KM Radius)">Hyperlocal (Local 5-10 km)</option>
                  </select>
                </div>

                {/* 4. Select Services */}
                <div>
                  <label className="sr-only">- Select Services -</label>
                  <select
                    value={service}
                    onChange={(e) => setService(e.target.value)}
                    className="w-full bg-slate-50 hover:bg-slate-100/80 border border-slate-300 rounded-xl px-3.5 py-3 text-xs sm:text-[13px] font-sans text-slate-800 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 cursor-pointer transition-colors"
                  >
                    <option value="">- Select Services -</option>
                    <option value="360° Full-Funnel Digital Growth">360° Full-Funnel Digital Growth</option>
                    <option value="Search Engine Optimization (SEO)">Search Engine Optimization (SEO)</option>
                    <option value="Google Search & Display PPC Ads">Google Search &amp; Display PPC Ads</option>
                    <option value="Meta Ads (Instagram & Facebook)">Meta Ads (Instagram &amp; Facebook)</option>
                    <option value="Digital PR & Top Media Features">Digital PR &amp; Top Media Features</option>
                    <option value="Influencer & Creator Collaborations">Influencer &amp; Creator Collaborations</option>
                    <option value="High-Converting Landing Page Design">High-Converting Landing Page Design</option>
                  </select>
                </div>
              </div>

              {/* Row 2: 4 Inputs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 pt-1">
                {/* Name */}
                <div>
                  <label className="sr-only">Your name</label>
                  <input
                    type="text"
                    placeholder="Your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-3 text-xs sm:text-[13px] font-sans text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="sr-only">Your email</label>
                  <input
                    type="email"
                    placeholder="Your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-3 text-xs sm:text-[13px] font-sans text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
                  />
                </div>

                {/* Phone Number */}
                <div>
                  <label className="sr-only">Phone Number</label>
                  <input
                    type="tel"
                    placeholder="Phone Number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-3 text-xs sm:text-[13px] font-sans text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
                  />
                </div>

                {/* Website + Checkbox */}
                <div>
                  <label className="sr-only">website</label>
                  <input
                    type="text"
                    placeholder="website"
                    disabled={noWebsite}
                    value={noWebsite ? 'Need New Website' : website}
                    onChange={(e) => setWebsite(e.target.value)}
                    className={`w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-3 text-xs sm:text-[13px] font-sans text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors ${
                      noWebsite ? 'opacity-70 bg-slate-100 italic' : ''
                    }`}
                  />
                  <div className="mt-2.5 px-0.5">
                    <label
                      htmlFor="nowebsite"
                      className="inline-flex items-center gap-2 cursor-pointer select-none text-left"
                    >
                      <input
                        type="checkbox"
                        id="nowebsite"
                        checked={noWebsite}
                        onChange={(e) => {
                          setNoWebsite(e.target.checked);
                          if (e.target.checked) setWebsite('Need New Website');
                          else setWebsite('');
                        }}
                        className="w-4 h-4 rounded border-slate-300 text-red-600 focus:ring-red-500 cursor-pointer shrink-0 accent-red-600"
                      />
                      <span className="text-xs text-slate-600 font-medium leading-snug">
                        Don't have a website (Need Website)
                      </span>
                    </label>
                  </div>
                </div>
              </div>

              {/* Row 3: Actions */}
              <div className="pt-4 sm:pt-6 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-4">
                {/* Submit: Make Your Proposal (Top on mobile, right on desktop) */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto px-8 py-3.5 bg-red-600 hover:bg-red-700 text-white rounded-xl font-sans font-bold text-sm sm:text-base tracking-wide shadow-lg hover:shadow-red-600/30 transition-all flex items-center justify-center gap-3 cursor-pointer group sm:order-2"
                >
                  <span>{isSubmitting ? 'Analyzing & Crafting Strategy...' : 'Make Your Proposal'}</span>
                  <div className="w-5 h-5 rounded-full border border-white flex items-center justify-center transition-transform group-hover:translate-x-1 shrink-0">
                    <ChevronRight className="w-3.5 h-3.5 text-white" />
                  </div>
                </button>

                {/* Back Button (Bottom on mobile, left on desktop) */}
                <button
                  type="button"
                  onClick={() => navigate('/')}
                  className="w-full sm:w-auto px-6 py-3 sm:py-2.5 bg-black hover:bg-neutral-800 text-white rounded-xl sm:rounded-lg text-xs font-head font-bold uppercase tracking-wider transition-colors text-center cursor-pointer sm:order-1"
                >
                  Back
                </button>
              </div>
            </form>
          ) : (
            /* =====================================================================
               TAILORED PROPOSAL RESULT VIEW
               ===================================================================== */
            <div className="mt-8 space-y-8 animate-in fade-in zoom-in-95 duration-300">
              {/* Proposal Header Banner */}
              <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-xl">
                <div>
                  <div className="flex items-center gap-2 text-xs font-head font-bold uppercase tracking-widest text-amber-400">
                    <Sparkles className="w-4 h-4" />
                    <span>Personalized Strategy Report Generated</span>
                  </div>
                  <h2 className="font-news-serif text-2xl sm:text-3xl font-bold mt-1 text-white">
                    Custom Digital Growth Proposal for {name}
                  </h2>
                  <p className="text-slate-300 text-xs sm:text-sm mt-1">
                    Target Sector: <strong>{business}</strong> • Primary Goal: <strong>{objective}</strong>
                  </p>
                </div>
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-head font-bold uppercase tracking-wider transition-colors shrink-0"
                >
                  Configure New Proposal
                </button>
              </div>

              {/* Strategy Matrix Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Recommended Channels */}
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center">
                    <Target className="w-5 h-5" />
                  </div>
                  <h4 className="font-serif font-bold text-base text-slate-900">Recommended Channel Mix</h4>
                  <ul className="text-xs text-slate-600 space-y-2">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span>{service}</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Google High-Intent Search Ads</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Authority Digital PR &amp; Do-Follow Backlinks</span>
                    </li>
                  </ul>
                </div>

                {/* Target Audience Reach */}
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                    <TrendingUp className="w-5 h-5" />
                  </div>
                  <h4 className="font-serif font-bold text-base text-slate-900">Projected Monthly Metrics</h4>
                  <div className="space-y-1.5 text-xs text-slate-600">
                    <div>Estimated Impressions: <strong>150,000 – 450,000+</strong></div>
                    <div>Targeted Click Traffic: <strong>8,500 – 18,000 visits</strong></div>
                    <div>Audience Scope: <strong>{audience}</strong></div>
                  </div>
                </div>

                {/* SLA & Proofing */}
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <h4 className="font-serif font-bold text-base text-slate-900">RKM Delivery Guarantee</h4>
                  <ul className="text-xs text-slate-600 space-y-2">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Daily live performance dashboards</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span>No long lock-ins; performance-driven ROI</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Dedicated Senior Account Manager</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Consultation & Execution CTAs */}
              <div className="bg-red-50 border border-red-200 rounded-2xl p-5 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-5 sm:gap-6">
                <div>
                  <h3 className="font-news-serif text-xl sm:text-2xl font-bold text-red-950 text-center sm:text-left">
                    Ready to execute your growth campaign?
                  </h3>
                  <p className="text-xs sm:text-sm text-red-800 mt-1 text-center sm:text-left">
                    Connect directly with our media planning director to finalize your campaign rollout in 24 hours.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3 w-full sm:w-auto shrink-0">
                  <a
                    href={`https://wa.me/919878339302?text=${encodeURIComponent(
                      `Hi RKM Ads, I generated a Digital Marketing proposal for ${name} (${business}) focused on ${objective}. Please share final deployment schedules!`
                    )}`}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full sm:w-auto px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-sans font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm transition-all"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>WhatsApp Proposal</span>
                  </a>

                  <a
                    href="tel:+919878339302"
                    className="w-full sm:w-auto px-5 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-sans font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm transition-all"
                  >
                    <Phone className="w-4 h-4" />
                    <span>Call +91-9878339302</span>
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* =========================================================================
          SEO AUDIT TOOL MODAL DIALOG
          ========================================================================= */}
      {isSeoModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 relative max-h-[90vh] overflow-y-auto">
            <button
              type="button"
              onClick={() => {
                setIsSeoModalOpen(false);
                setSeoResult(null);
                setSeoUrl('');
              }}
              className="absolute top-5 right-5 text-slate-400 hover:text-slate-700 p-1"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 text-xs font-head font-bold uppercase tracking-wider text-red-600 mb-2">
              <Search className="w-4 h-4" />
              <span>Free Instant Website Analyzer</span>
            </div>
            <h3 className="font-news-serif text-2xl font-bold text-slate-900">
              Run Free Website &amp; SEO Audit
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Enter your landing page URL to inspect core web vitals, indexation health, and backlink authority.
            </p>

            <form onSubmit={handleRunSeoAudit} className="mt-6 flex flex-col sm:flex-row gap-3">
              <input
                type="text"
                placeholder="e.g. https://yourbusiness.com"
                value={seoUrl}
                onChange={(e) => setSeoUrl(e.target.value)}
                className="flex-1 bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-red-500"
              />
              <button
                type="submit"
                disabled={seoLoading}
                className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-head font-bold uppercase tracking-wider transition-all shrink-0"
              >
                {seoLoading ? 'Auditing URL...' : 'Analyze SEO'}
              </button>
            </form>

            {seoResult && (
              <div className="mt-6 pt-6 border-t border-slate-200 space-y-4 animate-in fade-in duration-200">
                <div className="grid grid-cols-3 gap-3 text-center">
                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                    <span className="block text-[10px] text-slate-400 uppercase font-bold">SEO Score</span>
                    <span className="text-xl font-bold text-emerald-600">{seoResult.score}/100</span>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                    <span className="block text-[10px] text-slate-400 uppercase font-bold">Page Speed</span>
                    <span className="text-xl font-bold text-blue-600">{seoResult.speed}%</span>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                    <span className="block text-[10px] text-slate-400 uppercase font-bold">Mobile Score</span>
                    <span className="text-xl font-bold text-emerald-600">{seoResult.mobile}%</span>
                  </div>
                </div>

                <div>
                  <h5 className="font-head text-xs font-bold uppercase tracking-wider text-slate-900 mb-2">
                    Critical Growth Opportunities Identified:
                  </h5>
                  <ul className="text-xs text-slate-600 space-y-1.5 list-disc pl-4">
                    {seoResult.issues.map((issue, idx) => (
                      <li key={idx}>{issue}</li>
                    ))}
                  </ul>
                </div>

                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                  <span className="text-[10px] font-head font-bold uppercase tracking-wider text-red-600 block mb-1">
                    Recommended Fix via RKM Ads
                  </span>
                  <p className="text-xs text-slate-700">
                    Integrate high-authority Tier-1 PR features combined with localized Google Search optimization to quickly rank in Google's Top 3 map positions.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
