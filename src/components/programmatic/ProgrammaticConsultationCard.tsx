import React, { useState } from 'react';
import {
  CheckCircle2,
  ShieldCheck,
  Award,
  Clock,
  Laptop,
  Smartphone,
  Layers,
  Sparkles,
  BarChart3,
  Target,
  PiggyBank,
  TrendingUp,
  Eye,
  Sliders,
  ChevronRight,
} from 'lucide-react';

const PERFORMANCE_SEGMENTS = [
  { id: 'app_ecosystem', label: 'App Eco-System (Installs & Events)' },
  { id: 'conversion_leads', label: 'Conversion Leads (B2B & High-Intent)' },
  { id: 'ecommerce_conversions', label: 'Ecommerce Conversions (ROAS & Sales)' },
] as const;

const BUDGET_OPTIONS = [
  'Under 1 Lakh',
  'Under 5 Lakh',
  'Under 50 Lakh',
  '₹50 Lakh - ₹1 CR+',
] as const;

interface FormatTab {
  id: string;
  label: string;
  headline: string;
  description: string;
  devices: { name: string; icon: 'desktop' | 'mobile' | 'app' }[];
  tag: string;
  specs: string;
  cpmRate: string;
}

const AD_FORMAT_TABS: FormatTab[] = [
  {
    id: 'banner',
    label: 'Banner',
    headline: 'High-Impact Display & Standard IAB Banners',
    description:
      'Provides programmatic access to premium display inventory across 100,000+ publishers. Serves banner ads in industry-standard IAB sizes including Leaderboard (728×90), Medium Rectangle (300×250), Half Page Skyscraper (300×600), and Billboard (970×250).',
    devices: [
      { name: 'Desktop Web', icon: 'desktop' },
      { name: 'Mobile Web', icon: 'mobile' },
      { name: 'In-App Display', icon: 'app' },
    ],
    tag: 'IAB Standard & Sticky Banners',
    specs: 'HTML5, JPG, PNG • Max file weight 150KB • 100% Viewable (MRC Standard)',
    cpmRate: 'From ₹35 CPM',
  },
  {
    id: 'video',
    label: 'Video',
    headline: 'Programmatic Online Video (OLV) & In-Stream Video',
    description:
      'Wrap your brand narrative in immersive pre-roll, mid-roll, post-roll, and rewarded video ads with verified >90% Video Completion Rate (VCR). Programmatically bid across YouTube, OTT platforms, news networks, and premium gaming apps.',
    devices: [
      { name: 'Desktop Web', icon: 'desktop' },
      { name: 'Mobile Web', icon: 'mobile' },
      { name: 'In-App Video', icon: 'app' },
    ],
    tag: 'Pre-Roll, Mid-Roll & Rewarded',
    specs: 'VAST 4.2 / VPAID compliant • 1080p Full HD • 15s to 30s non-skippable',
    cpmRate: 'From ₹110 CPM',
  },
  {
    id: 'native',
    label: 'Native',
    headline: 'In-Feed Native Ads & Recommendation Widgets',
    description:
      'Utilize DSP seats for native advertising that blends seamlessly into the editorial feed of top publishers like Taboola, Outbrain, MSN, and Times Internet. Delivers 3X higher engagement and lower bounce rates compared to standard display.',
    devices: [
      { name: 'Desktop Web', icon: 'desktop' },
      { name: 'Mobile Web', icon: 'mobile' },
      { name: 'In-App Feeds', icon: 'app' },
    ],
    tag: 'In-Feed & Discovery Widgets',
    specs: 'Dynamic 1200×628 headline + body text + logo • Contextual match',
    cpmRate: 'From ₹45 CPM',
  },
  {
    id: 'rich_media',
    label: 'Rich Media',
    headline: 'Interactive 3D Parallax, Sliders & Expandables',
    description:
      'Includes expansive rich media formats with interactive elements designed to float, expand, and react to touch or cursor hover. Choose from scratch cards, 3D product rotators, expandable pushdowns, and interactive gamified canvases.',
    devices: [
      { name: 'Desktop Web', icon: 'desktop' },
      { name: 'Mobile Web', icon: 'mobile' },
      { name: 'In-App Canvas', icon: 'app' },
    ],
    tag: 'Interactive Canvas & Expandable',
    specs: 'Custom JS tags, MRAID 3.0 • Dynamic Creative Optimization (DCO)',
    cpmRate: 'From ₹75 CPM',
  },
  {
    id: 'push_audio',
    label: 'Push & Audio',
    headline: 'Programmatic Audio Streaming & Direct Push Ads',
    description:
      'Target engaged listeners with companion display banners on Spotify, JioSaavn, and Wynk Music, paired with real-time web & mobile push notifications reaching opted-in subscribers with high click-through rates (CTR > 4.5%).',
    devices: [
      { name: 'Desktop Web', icon: 'desktop' },
      { name: 'Mobile Web', icon: 'mobile' },
      { name: 'Audio Streaming Apps', icon: 'app' },
    ],
    tag: 'Spotify & Push Notifications',
    specs: '15s/30s Audio (MP3/WAV) + 300×300 Companion Banner + Instant Web Push',
    cpmRate: 'From ₹60 CPM',
  },
  {
    id: 'dooh',
    label: 'Popup & DOOH',
    headline: 'Digital Out-Of-Home & High-Impact Interstitials',
    description:
      'Broadcast programmatic ads onto connected digital screens in high-footfall public venues: premium corporate tech parks, luxury malls, metro hubs, and private airports. Powered by real-time footfall triggers and weather/traffic APIs.',
    devices: [
      { name: 'Smart Digital Screens', icon: 'desktop' },
      { name: 'Transit Screens', icon: 'mobile' },
      { name: 'Mall Video Walls', icon: 'app' },
    ],
    tag: 'Programmatic DOOH & Full Screen',
    specs: 'High-res LED & LCD displays • 1080×1920 vertical & 1920×1080 horizontal',
    cpmRate: 'From ₹95 CPM',
  },
];

const TARGETING_DIMENSIONS = [
  { label: 'Geolocation', desc: 'Precise 500m GPS polygon & city clusters' },
  { label: 'Browser Type', desc: 'Chrome, Safari, Edge, Firefox cohorts' },
  { label: 'Device Brand', desc: 'Apple, Samsung, OnePlus & device price tier' },
  { label: 'Language', desc: 'English, Hindi, Tamil, Telugu, Bengali' },
  { label: 'IAB Categories', desc: 'Tier-1 and Tier-2 contextual taxonomy' },
  { label: 'Operating System', desc: 'iOS (SKAN), Android, macOS, Windows' },
  { label: 'Connection Type', desc: '5G, 4G LTE, High-Speed Wi-Fi' },
];

const AUDIENCE_AFFINITY_SEGMENTS = [
  'Animal Lovers',
  'Arts & Entertainment',
  'Technophiles',
  'Fashionistas',
  'School & Education',
  'Fitness Enthusiasts',
  'Travel Buffs',
  'Sports Fans',
  'Food & Beverage (FnB)',
  'Shopaholics',
  'Mobile & PC Gamers',
  'Movie & OTT Lovers',
];

const WHY_PROGRAMMATIC_PILLARS = [
  {
    title: 'Transparency & Real Time Bidding',
    desc: 'Automated second-by-second auctioning with complete bidstream logs, direct SSP pipes, and transparent floor rates.',
    icon: TrendingUp,
  },
  {
    title: 'Advanced Targeting',
    desc: 'Target by GPS polygon coordinates, device price bands, intent cohorts, and custom lookalike audience models.',
    icon: Target,
  },
  {
    title: 'Saved Advertising Budgets',
    desc: 'Machine-learning bid shading and unified cross-exchange frequency capping prevent ad fatigue and wasted ad spend.',
    icon: PiggyBank,
  },
  {
    title: 'More Impressions, Lower CPM',
    desc: 'Certified partner seats on Google DV360 and The Trade Desk unlock lower take-rates and wholesale publisher rates.',
    icon: Eye,
  },
  {
    title: 'Maximize Return On Ad Spend',
    desc: 'Closed-loop multi-touch attribution, conversion postbacks, and algorithmic budget shifting towards top converting domains.',
    icon: BarChart3,
  },
];

export const ProgrammaticConsultationCard: React.FC = () => {
  // Form State matching the BookMyAd reference structure
  const [formData, setFormData] = useState({
    requirePerformance: 'App Eco-System',
    budget: 'Under 5 Lakh',
    name: '',
    email: '',
    phone: '',
    company: '',
    website: '',
  });

  const [activeTab, setActiveTab] = useState<string>('banner');
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !formData.name.trim() ||
      !formData.email.trim() ||
      !formData.phone.trim() ||
      !formData.company.trim() ||
      !formData.website.trim() ||
      !formData.requirePerformance ||
      !formData.budget
    ) {
      alert('Please fill out all mandatory fields before submitting.');
      return;
    }
    setSubmitted(true);
  };

  const currentTab = AD_FORMAT_TABS.find((t) => t.id === activeTab) || AD_FORMAT_TABS[0];

  return (
    <div id="programmatic-consult-planner" className="space-y-12">
      {/* 1. MAIN CONSULTATION FORM: Matching BookMyAd Reference Form */}
      <div
        className="bg-white border border-paper-line shadow-press transition-all relative max-w-4xl mx-auto"
        style={{
          borderRadius: '56px 14px 56px 14px',
          padding: '40px 36px',
        }}
      >
        <div className="text-center mb-7">
          <h2 className="font-news-serif text-2xl sm:text-3xl font-bold text-ink tracking-tight mb-1.5">
            Confused about programmatic ADS?
          </h2>
          <p className="text-sm sm:text-base text-ink-muted font-sans mb-1">
            Talk to our performance marketing expert now!
          </p>
          <div className="text-red-600 font-head font-bold text-xs uppercase tracking-wider">
            Please fill out this form
          </div>
        </div>

        {submitted ? (
          <div className="text-center py-10 px-4 bg-emerald-50 rounded-3xl border border-emerald-200">
            <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto mb-3" />
            <h3 className="font-news-serif text-xl sm:text-2xl font-bold text-emerald-900 mb-2">
              Performance Marketing Brief Received!
            </h3>
            <p className="text-xs sm:text-sm text-emerald-800 max-w-lg mx-auto mb-5 leading-relaxed">
              Thank you, <strong>{formData.name}</strong>. Our certified Programmatic Trading Desk has received your campaign inquiry for <strong>{formData.company}</strong> targeting <strong>{formData.requirePerformance}</strong> with a budget of <strong>{formData.budget}</strong>. A programmatic strategist will contact <strong>{formData.phone}</strong> shortly.
            </p>
            <button
              type="button"
              onClick={() => {
                setSubmitted(false);
              }}
              className="px-6 py-2.5 rounded-md bg-ink text-white font-head font-bold text-xs uppercase tracking-wider hover:bg-black transition-colors shadow-sm cursor-pointer"
            >
              Submit Another Inquiry
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Row 1: Radio Groups (Segment & Budget) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-paper-tint/60 rounded-2xl p-5 border border-paper-line">
              {/* Column 1: Performance Segment */}
              <div>
                <p className="text-xs font-head font-bold uppercase tracking-wider text-ink mb-3">
                  In Which Segment Do You Require Performance *
                </p>
                <div className="space-y-2.5">
                  {PERFORMANCE_SEGMENTS.map((seg) => (
                    <label
                      key={seg.id}
                      className={`flex items-center gap-3 p-2.5 rounded-xl border transition-all cursor-pointer select-none ${
                        formData.requirePerformance === seg.label
                          ? 'bg-white border-ink shadow-sm'
                          : 'bg-white/60 border-paper-line hover:border-ink-muted'
                      }`}
                    >
                      <input
                        type="radio"
                        name="requirePerformance"
                        value={seg.label}
                        checked={formData.requirePerformance === seg.label}
                        onChange={handleInputChange}
                        className="w-4 h-4 text-red-600 border-paper-line focus:ring-red-500 cursor-pointer accent-red-600"
                      />
                      <span className="text-xs sm:text-sm font-sans font-medium text-ink">
                        {seg.label}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Column 2: Tentative Budget */}
              <div>
                <p className="text-xs font-head font-bold uppercase tracking-wider text-ink mb-3">
                  Tentative Budget *
                </p>
                <div className="space-y-2.5">
                  {BUDGET_OPTIONS.map((opt) => (
                    <label
                      key={opt}
                      className={`flex items-center gap-3 p-2.5 rounded-xl border transition-all cursor-pointer select-none ${
                        formData.budget === opt
                          ? 'bg-white border-ink shadow-sm'
                          : 'bg-white/60 border-paper-line hover:border-ink-muted'
                      }`}
                    >
                      <input
                        type="radio"
                        name="budget"
                        value={opt}
                        checked={formData.budget === opt}
                        onChange={handleInputChange}
                        className="w-4 h-4 text-red-600 border-paper-line focus:ring-red-500 cursor-pointer accent-red-600"
                      />
                      <span className="text-xs sm:text-sm font-sans font-medium text-ink">
                        {opt}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Row 2: 4 Inputs (Name, Email, Phone, Company) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Your Name *"
                  className="w-full px-4 py-3 rounded-md border border-paper-line bg-white text-ink text-sm font-sans focus:outline-none focus:ring-2 focus:ring-ink focus:border-ink transition-all placeholder:text-ink-muted/60"
                />
              </div>
              <div>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Email Address *"
                  className="w-full px-4 py-3 rounded-md border border-paper-line bg-white text-ink text-sm font-sans focus:outline-none focus:ring-2 focus:ring-ink focus:border-ink transition-all placeholder:text-ink-muted/60"
                />
              </div>
              <div>
                <input
                  type="tel"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="Phone Number *"
                  className="w-full px-4 py-3 rounded-md border border-paper-line bg-white text-ink text-sm font-sans focus:outline-none focus:ring-2 focus:ring-ink focus:border-ink transition-all placeholder:text-ink-muted/60"
                />
              </div>
              <div>
                <input
                  type="text"
                  name="company"
                  required
                  value={formData.company}
                  onChange={handleInputChange}
                  placeholder="Company Name *"
                  className="w-full px-4 py-3 rounded-md border border-paper-line bg-white text-ink text-sm font-sans focus:outline-none focus:ring-2 focus:ring-ink focus:border-ink transition-all placeholder:text-ink-muted/60"
                />
              </div>
            </div>

            {/* Row 3: App / Website Link & Submit Button */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
              <div>
                <input
                  type="text"
                  name="website"
                  required
                  value={formData.website}
                  onChange={handleInputChange}
                  placeholder="( App, Website Link ) *"
                  className="w-full px-4 py-3 rounded-md border border-paper-line bg-white text-ink text-sm font-sans focus:outline-none focus:ring-2 focus:ring-ink focus:border-ink transition-all placeholder:text-ink-muted/60"
                />
              </div>
              <div className="flex justify-start md:justify-end">
                <button
                  type="submit"
                  className="w-full md:w-auto px-10 py-3 rounded-md bg-black hover:bg-neutral-800 active:bg-neutral-900 text-white font-head font-bold text-xs uppercase tracking-wider shadow-md hover:shadow-lg transition-all cursor-pointer"
                >
                  Submit
                </button>
              </div>
            </div>
          </form>
        )}
      </div>

      {/* 2. WHY PROGRAMMATIC MEDIA: 5 Pillars (from Reference) */}
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-8">
          <h3 className="font-news-serif text-2xl sm:text-3xl font-bold text-ink tracking-tight mb-2">
            Why Programmatic Media
          </h3>
          <p className="text-xs sm:text-sm text-ink-muted max-w-xl mx-auto">
            Harness automated machine-learning bid strategies, omnichannel reach, and real-time data to maximize your return on ad spend.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {WHY_PROGRAMMATIC_PILLARS.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-paper-line p-5 shadow-press hover:-translate-y-1 hover:shadow-lg transition-all duration-200 flex flex-col items-center text-center group"
              >
                <div className="w-12 h-12 rounded-2xl bg-paper-tint group-hover:bg-red-50 text-ink group-hover:text-red-600 flex items-center justify-center mb-3 transition-colors">
                  <Icon className="w-6 h-6" />
                </div>
                <h4 className="font-news-serif text-sm font-bold text-ink mb-1.5 leading-snug">
                  {pillar.title}
                </h4>
                <p className="text-[11.5px] text-ink-muted leading-relaxed">
                  {pillar.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. PROGRAMMATIC ADVERTISING PLATFORMS AND AD FORMAT TYPES (Tabs matching BookMyAd) */}
      <div className="max-w-5xl mx-auto bg-white border border-paper-line rounded-3xl p-6 sm:p-8 shadow-press">
        <div className="text-center mb-6">
          <h3 className="font-news-serif text-2xl sm:text-3xl font-bold text-ink tracking-tight mb-2">
            Programmatic Advertising Platforms &amp; Ad Format Types
          </h3>
          <p className="text-xs sm:text-sm text-ink-muted max-w-2xl mx-auto">
            Programmatic is much more than just display banners. Deliver your advertising message across every consumer digital touchpoint.
          </p>
        </div>

        {/* Tab Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8 border-b border-paper-line pb-4">
          {AD_FORMAT_TABS.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`px-5 py-2.5 rounded-full text-xs font-head font-bold uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-ink text-white shadow-md'
                  : 'bg-paper-tint text-ink-muted hover:text-ink hover:bg-paper-line'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content Display */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center bg-paper-tint/40 rounded-2xl p-6 border border-paper-line">
          {/* Left Visual Card */}
          <div className="md:col-span-5 bg-white rounded-2xl p-6 border border-paper-line shadow-press text-center flex flex-col items-center justify-center">
            <span className="px-3 py-1 rounded-full bg-red-100 text-red-700 font-head font-bold text-[10px] uppercase tracking-wider mb-4">
              {currentTab.tag}
            </span>
            <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-neutral-900 to-neutral-700 text-white flex items-center justify-center mb-4 shadow-md">
              <Layers className="w-10 h-10 text-amber-400" />
            </div>
            <h4 className="font-news-serif text-lg font-bold text-ink mb-1">
              {currentTab.label} Ad Format
            </h4>
            <div className="font-head text-base font-extrabold text-red-600 mb-2">
              {currentTab.cpmRate}
            </div>
            <p className="text-[11px] text-ink-muted font-sans max-w-xs">
              {currentTab.specs}
            </p>
          </div>

          {/* Right Details & Multi-Device Deployment */}
          <div className="md:col-span-7 space-y-5">
            <div>
              <h4 className="font-news-serif text-xl font-bold text-ink mb-2">
                {currentTab.headline}
              </h4>
              <p className="text-xs sm:text-sm text-ink-muted leading-relaxed">
                {currentTab.description}
              </p>
            </div>

            {/* Device Delivery Badges (Desktop, Mobile Web, In-App) */}
            <div>
              <div className="text-[11px] font-head font-bold uppercase tracking-wider text-ink mb-2.5">
                Channel Delivery Devices
              </div>
              <div className="grid grid-cols-3 gap-3">
                {currentTab.devices.map((dev, idx) => (
                  <div
                    key={idx}
                    className="bg-white rounded-xl border border-paper-line p-3 flex flex-col items-center justify-center text-center shadow-sm"
                  >
                    {dev.icon === 'desktop' ? (
                      <Laptop className="w-5 h-5 text-ink mb-1" />
                    ) : (
                      <Smartphone className="w-5 h-5 text-ink mb-1" />
                    )}
                    <span className="text-[11px] font-head font-bold text-ink">
                      {dev.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 4. TARGETING OPTIONS IN PROGRAMMATIC ADVERTISING (from Reference) */}
      <div className="max-w-5xl mx-auto bg-white border border-paper-line rounded-3xl p-6 sm:p-8 shadow-press">
        <div className="text-center mb-7">
          <h3 className="font-news-serif text-2xl sm:text-3xl font-bold text-ink tracking-tight mb-2">
            Targeting Options In Programmatic Advertising
          </h3>
          <p className="text-xs sm:text-sm text-ink-muted max-w-2xl mx-auto">
            When it comes to purchasing ad space, precision audience data ensures zero budget waste. Combine real-time technical parameters with rich consumer affinity cohorts.
          </p>
        </div>

        {/* Technical Targeting Parameters Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3 mb-8">
          {TARGETING_DIMENSIONS.map((dim, idx) => (
            <div
              key={idx}
              className="bg-paper-tint rounded-xl border border-paper-line p-3 text-center flex flex-col justify-center shadow-sm"
            >
              <div className="font-head text-[11.5px] font-bold text-ink uppercase tracking-wider mb-1">
                {dim.label}
              </div>
              <div className="text-[10px] text-ink-muted leading-tight">
                {dim.desc}
              </div>
            </div>
          ))}
        </div>

        {/* 12 Affinity Segments Grid */}
        <div className="pt-2">
          <div className="text-center font-head text-xs font-bold uppercase tracking-wider text-ink-muted mb-4">
            Audience Affinity &amp; Demographic Segments
          </div>
          <div className="flex flex-wrap items-center justify-center gap-2.5">
            {AUDIENCE_AFFINITY_SEGMENTS.map((seg, idx) => (
              <span
                key={idx}
                className="px-4 py-2 rounded-full bg-paper-tint border border-paper-line text-xs font-sans font-semibold text-ink hover:border-ink hover:bg-white transition-all cursor-default shadow-sm"
              >
                ✦ {seg}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* 5. TRUST, FRAUD PROTECTION & GUARANTEES */}
      <div className="max-w-5xl mx-auto bg-neutral-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-start gap-3.5">
            <ShieldCheck className="w-6 h-6 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <h5 className="font-head text-sm font-bold text-white mb-1">
                Trustworthy SSPs Only
              </h5>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Direct ads.txt verified publisher integrations through Magnite, PubMatic, OpenX, and Google Ad Manager.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3.5">
            <Award className="w-6 h-6 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <h5 className="font-head text-sm font-bold text-white mb-1">
                IAS &amp; DoubleVerify Verified
              </h5>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Zero non-human invalid bot traffic (IVT &lt; 0.5%) and 100% brand safety guaranteed across all domains.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3.5">
            <Clock className="w-6 h-6 text-sky-400 shrink-0 mt-0.5" />
            <div>
              <h5 className="font-head text-sm font-bold text-white mb-1">
                Fast 2-Hour Trading Desk Setup
              </h5>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Campaign setup, custom audience pixel implementation, and algorithmic real-time optimization.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
