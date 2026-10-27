import React, { useState, useMemo, useRef } from 'react';
import { PageHeader } from '../components/layout/PageHeader';
import { FaqAccordion } from '../components/home/FaqAccordion';
import {
  MapPin,
  CheckCircle2,
  ShieldCheck,
  Building2,
  Search,
  X,
  Clock,
  Award,
  ArrowRight,
  TrendingUp,
  FileCheck,
  Sparkles,
} from 'lucide-react';
import {
  OUTDOOR_FORMATS,
  OUTDOOR_SITES,
  OUTDOOR_FAQS,
  OUTDOOR_MEDIA_TYPES,
  ILLUMINATION_OPTIONS,
  BUDGET_OPTIONS,
  OutdoorSite,
} from '../data/outdoorData';

export const OutdoorAdsPage: React.FC = () => {
  const formRef = useRef<HTMLDivElement>(null);

  // Form State (Exact match to reference image)
  const [plannerForm, setPlannerForm] = useState({
    name: '',
    phone: '',
    email: '',
    city: '',
    mediaType: '',
    numberOfSites: '',
    illumination: '',
    budget: '',
  });
  const [plannerSubmitted, setPlannerSubmitted] = useState(false);

  // Site inventory filtering
  const [cityFilter, setCityFilter] = useState('All');
  const [illuminationFilter, setIlluminationFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Selected site for modal detail view
  const [selectedSite, setSelectedSite] = useState<OutdoorSite | null>(null);

  // Quick reservation modal
  const [reserveSite, setReserveSite] = useState<OutdoorSite | null>(null);
  const [reserveDuration, setReserveDuration] = useState('1 Month');
  const [reserveSubmitted, setReserveSubmitted] = useState(false);

  const cities = useMemo(() => {
    const list = Array.from(new Set(OUTDOOR_SITES.map((s) => s.city)));
    return ['All', ...list];
  }, []);

  const filteredSites = useMemo(() => {
    return OUTDOOR_SITES.filter((s) => {
      if (cityFilter !== 'All' && s.city !== cityFilter) return false;
      if (illuminationFilter !== 'All' && s.illumination !== illuminationFilter) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchTitle = s.title.toLowerCase().includes(q);
        const matchArea = s.area.toLowerCase().includes(q);
        const matchCity = s.city.toLowerCase().includes(q);
        if (!matchTitle && !matchArea && !matchCity) return false;
      }
      return true;
    });
  }, [cityFilter, illuminationFilter, searchQuery]);

  const handlePlannerChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setPlannerForm((prev) => ({ ...prev, [name]: value }));
  };

  const handlePlannerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !plannerForm.name.trim() ||
      !plannerForm.phone.trim() ||
      !plannerForm.email.trim() ||
      !plannerForm.city.trim() ||
      !plannerForm.mediaType.trim() ||
      !plannerForm.numberOfSites.trim() ||
      !plannerForm.illumination.trim() ||
      !plannerForm.budget.trim()
    ) {
      alert('Please fill out all mandatory fields before consulting.');
      return;
    }
    setPlannerSubmitted(true);
  };

  const scrollToFormWithFormat = (formatTitle: string) => {
    setPlannerForm((prev) => ({ ...prev, mediaType: formatTitle }));
    if (formRef.current) {
      formRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const faqItems = OUTDOOR_FAQS.map((f) => ({
    question: f.q,
    answer: f.a,
  }));

  // SVG arrow data URI for dropdown styling
  const selectArrow = `url("data:image/svg+xml;utf8,<svg fill='none' height='24' stroke='%235A514A' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' viewBox='0 0 24 24' width='24' xmlns='http://www.w3.org/2000/svg'><polyline points='6 9 12 15 18 9'></polyline></svg>")`;

  return (
    <div className="bg-paper min-h-screen pb-20 text-ink">
      {/* 1. RKM Unified Page Header */}
      <PageHeader
        title="Outdoor (OOH) & Digital Out-of-Home (DOOH) Media"
        subtitle="High-impact traditional highway unipoles, metro train wraps, bus queue shelters, and high-brightness digital LED display screens across India."
        badge="100% MCD, BMC & Municipal Cleared"
        breadcrumbs={[{ label: 'Media Channels' }, { label: 'Outdoor & DOOH' }]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-16">
        {/* Hero Action Banner Above Format Section */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 p-6 sm:p-8 bg-white rounded-3xl border border-paper-line shadow-press">
          <div className="space-y-1">
            <span className="text-xs font-head font-bold uppercase tracking-wider text-brand block">
              Audience Reach &amp; Guaranteed Inventory
            </span>
            <h2 className="font-news-serif text-2xl sm:text-3xl font-bold text-ink">
              High-impact highway unipoles, illuminated hoardings &amp; digital LED totems.
            </h2>
            <p className="text-xs sm:text-sm text-ink-muted max-w-2xl leading-relaxed">
              Explore available formats below, or speak directly with our Senior Outdoor Media Planner to curate your site plan.
            </p>
          </div>
          <div className="shrink-0">
            <button
              type="button"
              onClick={() => {
                if (formRef.current) formRef.current.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-6 py-3 rounded-full bg-red-600 hover:bg-red-700 text-white font-head font-bold text-xs uppercase tracking-wider shadow-md hover:shadow-lg transition-all flex items-center gap-2"
            >
              <span>Consult Media Planner</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* 2. Available Formats & Inventory Packages (Above Consult Section as requested) */}
        <div>
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-head font-bold uppercase tracking-wider text-brand block mb-1">
              High-Impact Inventory
            </span>
            <h3 className="font-news-serif text-3xl font-bold text-ink tracking-tight mb-2">
              Available Formats &amp; Inventory Packages
            </h3>
            <p className="text-xs sm:text-sm text-ink-muted font-sans">
              Choose the right specification for your brand's reach, demographic, and geographical footprint.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {OUTDOOR_FORMATS.map((fmt) => (
              <div
                key={fmt.id}
                className={`bg-white rounded-3xl p-6 sm:p-7 border transition-all flex flex-col justify-between shadow-press relative ${
                  fmt.popular ? 'border-brand ring-2 ring-brand/10' : 'border-paper-line'
                }`}
              >
                {fmt.popular && (
                  <span className="absolute -top-3 right-6 px-3 py-0.5 rounded-full bg-brand text-white text-[10px] font-head font-bold uppercase tracking-wider shadow-sm">
                    Most Popular Choice
                  </span>
                )}

                <div>
                  <div className="h-44 -mx-6 -mt-6 sm:-mx-7 sm:-mt-7 mb-5 overflow-hidden rounded-t-3xl relative">
                    <img
                      src={fmt.image}
                      alt={fmt.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-4">
                      <span className="text-white text-xs font-head font-semibold tracking-wider">
                        {fmt.reach}
                      </span>
                    </div>
                  </div>

                  <span className="text-[10.5px] font-head font-bold uppercase tracking-wider text-brand block mb-1">
                    Outdoor Media
                  </span>
                  <h4 className="font-news-serif text-xl font-bold text-ink mb-2">
                    {fmt.title}
                  </h4>
                  <p className="text-xs text-ink-muted leading-relaxed font-sans mb-4">
                    {fmt.description}
                  </p>
                  <div className="p-3 rounded-2xl bg-paper-tint border border-paper-line text-xs font-sans text-ink space-y-1 mb-6">
                    <div className="text-[10px] font-head font-bold uppercase tracking-wider text-ink-muted">
                      Technical Specifications:
                    </div>
                    <div className="font-mono text-[11px] text-ink">{fmt.specs}</div>
                  </div>
                </div>

                <div className="pt-4 border-t border-paper-line flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-head font-semibold text-ink-muted block uppercase">
                      Est. Tariff
                    </span>
                    <span className="font-news-serif text-base sm:text-lg font-bold text-brand">
                      {fmt.avgCost}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => scrollToFormWithFormat(fmt.title)}
                    className="px-4 py-2 rounded-full bg-ink text-paper-soft hover:bg-brand hover:text-white text-xs font-head font-bold uppercase tracking-wider transition-colors"
                  >
                    Inquire
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 3. THE SIGNATURE MEDIA PLANNER FORM (Exact match to reference image, below formats section) */}
        <section
          ref={formRef}
          id="planner-form"
          className="relative bg-white border border-paper-line shadow-press transition-all"
          style={{
            borderRadius: '56px 14px 56px 14px',
            padding: '40px 32px',
          }}
        >
          <div className="text-center mb-7">
            <h2 className="font-news-serif text-2xl sm:text-3xl font-bold text-ink tracking-tight mb-1.5">
              Start Your Outdoor / DOOH Advertising With us
            </h2>
            <div className="text-red-600 font-head font-bold text-sm tracking-wide">
              Please fill out this form
            </div>
          </div>

          {plannerSubmitted ? (
            <div className="text-center py-10 px-4 bg-emerald-50 rounded-3xl border border-emerald-200">
              <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto mb-3" />
              <h3 className="font-news-serif text-xl font-bold text-emerald-900 mb-2">
                Consultation Request Received!
              </h3>
              <p className="text-sm text-emerald-800 max-w-lg mx-auto mb-5 leading-relaxed">
                Thank you, <strong>{plannerForm.name}</strong>. Our senior Outdoor Media Planner will prepare an official campaign proposal with GPS coordinates and high-res site photos, and contact you at <strong>{plannerForm.phone}</strong>.
              </p>
              <button
                type="button"
                onClick={() => setPlannerSubmitted(false)}
                className="px-6 py-2.5 rounded-md bg-red-600 text-white font-head font-bold text-xs uppercase tracking-wider hover:bg-red-700 transition-colors shadow-sm"
              >
                Submit Another Request
              </button>
            </div>
          ) : (
            <form onSubmit={handlePlannerSubmit} className="space-y-4">
              {/* Row 1: Name, Phone, Email */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <input
                    type="text"
                    name="name"
                    value={plannerForm.name}
                    onChange={handlePlannerChange}
                    placeholder="Your Name *"
                    required
                    className="w-full px-4 py-3 rounded-md border border-paper-line bg-white text-ink text-sm font-sans focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-red-600 transition-all placeholder:text-ink-muted/60"
                  />
                </div>
                <div>
                  <input
                    type="tel"
                    name="phone"
                    value={plannerForm.phone}
                    onChange={handlePlannerChange}
                    placeholder="Phone Number *"
                    required
                    className="w-full px-4 py-3 rounded-md border border-paper-line bg-white text-ink text-sm font-sans focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-red-600 transition-all placeholder:text-ink-muted/60"
                  />
                </div>
                <div>
                  <input
                    type="email"
                    name="email"
                    value={plannerForm.email}
                    onChange={handlePlannerChange}
                    placeholder="Email Address *"
                    required
                    className="w-full px-4 py-3 rounded-md border border-paper-line bg-white text-ink text-sm font-sans focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-red-600 transition-all placeholder:text-ink-muted/60"
                  />
                </div>
              </div>

              {/* Row 2: City, Select Media Type, Number of Sites */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <input
                    type="text"
                    name="city"
                    value={plannerForm.city}
                    onChange={handlePlannerChange}
                    placeholder="City (e.g. Solan, Delhi NCR) *"
                    required
                    className="w-full px-4 py-3 rounded-md border border-paper-line bg-white text-ink text-sm font-sans focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-red-600 transition-all placeholder:text-ink-muted/60"
                  />
                </div>
                <div className="relative">
                  <select
                    name="mediaType"
                    value={plannerForm.mediaType}
                    onChange={handlePlannerChange}
                    required
                    className="w-full px-4 py-3 pr-10 rounded-md border border-paper-line bg-white text-ink text-sm font-sans focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-red-600 transition-all appearance-none cursor-pointer"
                    style={{
                      backgroundImage: selectArrow,
                      backgroundRepeat: 'no-repeat',
                      backgroundPosition: 'right 12px center',
                      backgroundSize: '16px',
                    }}
                  >
                    <option value="">Select Media Type *</option>
                    {OUTDOOR_MEDIA_TYPES.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <input
                    type="text"
                    name="numberOfSites"
                    value={plannerForm.numberOfSites}
                    onChange={handlePlannerChange}
                    placeholder="Number of Sites *"
                    required
                    className="w-full px-4 py-3 rounded-md border border-paper-line bg-white text-ink text-sm font-sans focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-red-600 transition-all placeholder:text-ink-muted/60"
                  />
                </div>
              </div>

              {/* Row 3: Select Illumination, Select Campaign Budget, Consult Media Planner button */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                <div className="relative">
                  <select
                    name="illumination"
                    value={plannerForm.illumination}
                    onChange={handlePlannerChange}
                    required
                    className="w-full px-4 py-3 pr-10 rounded-md border border-paper-line bg-white text-ink text-sm font-sans focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-red-600 transition-all appearance-none cursor-pointer"
                    style={{
                      backgroundImage: selectArrow,
                      backgroundRepeat: 'no-repeat',
                      backgroundPosition: 'right 12px center',
                      backgroundSize: '16px',
                    }}
                  >
                    <option value="">Select Illumination *</option>
                    {ILLUMINATION_OPTIONS.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="relative">
                  <select
                    name="budget"
                    value={plannerForm.budget}
                    onChange={handlePlannerChange}
                    required
                    className="w-full px-4 py-3 pr-10 rounded-md border border-paper-line bg-white text-ink text-sm font-sans focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-red-600 transition-all appearance-none cursor-pointer"
                    style={{
                      backgroundImage: selectArrow,
                      backgroundRepeat: 'no-repeat',
                      backgroundPosition: 'right 12px center',
                      backgroundSize: '16px',
                    }}
                  >
                    <option value="">Select Campaign Budget *</option>
                    {BUDGET_OPTIONS.map((b) => (
                      <option key={b} value={b}>
                        {b}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <button
                    type="submit"
                    className="w-full py-3.5 px-6 rounded-md bg-red-600 hover:bg-red-700 text-white font-head font-bold text-sm uppercase tracking-wider transition-all shadow-md hover:shadow-lg active:scale-[0.99] flex items-center justify-center gap-2"
                  >
                    <span>Consult Media Planner</span>
                  </button>
                </div>
              </div>
            </form>
          )}

          {/* Trust Guarantees Strip */}
          <div className="mt-8 pt-6 border-t border-paper-line grid grid-cols-1 sm:grid-cols-3 gap-4 text-center sm:text-left text-xs font-sans text-ink-muted">
            <div className="flex items-center gap-2 justify-center sm:justify-start">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span><strong>100% Licensed:</strong> MCD, BMC &amp; State Authorities</span>
            </div>
            <div className="flex items-center gap-2 justify-center sm:justify-start">
              <Award className="w-4 h-4 text-blue-600 shrink-0" />
              <span><strong>Heavy Vinyl:</strong> 380-420 GSM UV-Treated Flex</span>
            </div>
            <div className="flex items-center gap-2 justify-center sm:justify-start">
              <Clock className="w-4 h-4 text-brand shrink-0" />
              <span><strong>Night Illumination:</strong> Astronomical timer guaranteed</span>
            </div>
          </div>
        </section>

        {/* 4. Live Verified Prime Sites Directory */}
        <div>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <span className="text-xs font-head font-bold uppercase tracking-wider text-brand block mb-1">
                Verified Locations
              </span>
              <h3 className="font-news-serif text-2xl sm:text-3xl font-bold text-ink tracking-tight">
                Prime Billboard &amp; DOOH Site Directory
              </h3>
              <p className="text-xs sm:text-sm text-ink-muted font-sans mt-1">
                Direct municipal authority-cleared billboard installations with daily traffic metrics.
              </p>
            </div>
          </div>

          {/* Filter Bar */}
          <div className="bg-white rounded-2xl p-4 sm:p-5 border border-paper-line shadow-press mb-8 grid grid-cols-1 sm:grid-cols-3 gap-4 items-center">
            <div className="relative">
              <Search className="w-4 h-4 text-ink-muted absolute left-3.5 top-3.5" />
              <input
                type="text"
                placeholder="Search area, landmark, city..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 rounded-lg border border-paper-line bg-paper-tint text-ink text-xs font-sans focus:outline-none focus:ring-2 focus:ring-brand focus:bg-white"
              />
            </div>
            <div className="relative">
              <select
                value={cityFilter}
                onChange={(e) => setCityFilter(e.target.value)}
                className="w-full px-3.5 py-2.5 pr-8 rounded-lg border border-paper-line bg-paper-tint text-ink text-xs font-sans focus:outline-none focus:ring-2 focus:ring-brand appearance-none"
                style={{
                  backgroundImage: selectArrow,
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'right 10px center',
                  backgroundSize: '14px',
                }}
              >
                {cities.map((c) => (
                  <option key={c} value={c}>
                    City: {c}
                  </option>
                ))}
              </select>
            </div>
            <div className="relative">
              <select
                value={illuminationFilter}
                onChange={(e) => setIlluminationFilter(e.target.value)}
                className="w-full px-3.5 py-2.5 pr-8 rounded-lg border border-paper-line bg-paper-tint text-ink text-xs font-sans focus:outline-none focus:ring-2 focus:ring-brand appearance-none"
                style={{
                  backgroundImage: selectArrow,
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'right 10px center',
                  backgroundSize: '14px',
                }}
              >
                <option value="All">All Illuminations</option>
                <option value="Front Lit">Front Lit</option>
                <option value="Back Lit">Back Lit</option>
                <option value="Digital LED">Digital LED</option>
              </select>
            </div>
          </div>

          {/* Sites Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSites.map((site) => (
              <div
                key={site.id}
                className="bg-white rounded-3xl overflow-hidden border border-paper-line shadow-press flex flex-col justify-between"
              >
                <div>
                  <div className="h-48 relative overflow-hidden">
                    <img
                      src={site.image}
                      alt={site.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-ink/80 text-white text-[10px] font-head font-bold uppercase tracking-wider backdrop-blur-sm">
                      {site.illumination}
                    </div>
                    <div
                      className={`absolute top-3 right-3 px-2.5 py-1 rounded-full text-white text-[10px] font-head font-bold uppercase tracking-wider ${
                        site.status === 'Available' ? 'bg-emerald-600' : 'bg-amber-600'
                      }`}
                    >
                      {site.status}
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center gap-1.5 text-xs text-brand font-head font-semibold uppercase tracking-wider mb-1.5">
                      <MapPin className="w-3.5 h-3.5 shrink-0" />
                      <span>{site.city} • {site.area}</span>
                    </div>

                    <h4 className="font-news-serif text-lg font-bold text-ink mb-3 line-clamp-2">
                      {site.title}
                    </h4>

                    <div className="grid grid-cols-2 gap-2 p-3 rounded-2xl bg-paper-tint border border-paper-line text-xs font-sans mb-4">
                      <div>
                        <span className="text-[10px] font-head font-semibold text-ink-muted uppercase block">Dimensions</span>
                        <strong className="text-ink">{site.dimensions}</strong>
                      </div>
                      <div>
                        <span className="text-[10px] font-head font-semibold text-ink-muted uppercase block">Daily Traffic</span>
                        <strong className="text-ink">{site.dailyFootfall}</strong>
                      </div>
                    </div>

                    <div className="text-[11px] text-emerald-700 font-sans flex items-center gap-1.5 mb-2">
                      <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                      <span>{site.authorityClearance}</span>
                    </div>
                  </div>
                </div>

                <div className="p-6 pt-0 border-t border-paper-line mt-auto flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-head uppercase text-ink-muted block font-semibold">Monthly Tariff</span>
                    <span className="font-news-serif text-lg font-bold text-brand">{site.ratePerMonth}</span>
                  </div>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setSelectedSite(site)}
                      className="px-3.5 py-1.5 rounded-full border border-paper-line text-xs font-head font-bold uppercase tracking-wider text-ink hover:bg-paper-tint transition-colors"
                    >
                      Inspect
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setReserveSite(site);
                        setReserveSubmitted(false);
                      }}
                      className="px-4 py-1.5 rounded-full bg-red-600 hover:bg-red-700 text-white text-xs font-head font-bold uppercase tracking-wider transition-colors shadow-sm"
                    >
                      Reserve
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 5. Authorized Partner Networks & Municipal Clearance Authorities */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-paper-line shadow-press">
          <h4 className="font-head text-xs font-bold uppercase tracking-wider text-ink-muted mb-4 text-center">
            Authorized Concessionaires &amp; Municipal Clearance Authorities
          </h4>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {[
              'Municipal Corporation of Delhi (MCD)',
              'Brihanmumbai Municipal Corporation (BMC)',
              'Bruhat Bengaluru Mahanagara Palike (BBMP)',
              'Greater Hyderabad Municipal Corporation (GHMC)',
              'Delhi Metro Rail Corporation (DMRC)',
              'Mumbai Metropolitan Region (MMRDA)',
              'NOIDA Authority',
              'Municipal Corporation Solan (MC Solan)',
              'Chandigarh Administration',
            ].map((authority, idx) => (
              <span
                key={idx}
                className="px-4 py-2 rounded-xl bg-paper-tint border border-paper-line text-xs font-serif font-bold text-ink shadow-sm"
              >
                {authority}
              </span>
            ))}
          </div>
        </div>

        {/* 6. Frequently Asked Questions */}
        <FaqAccordion
          items={faqItems}
          title="Outdoor &amp; DOOH Booking FAQs"
          subtitle="Specific questions regarding billboard municipal clearances, night lighting guarantees, weekly audit proofs, and flex printing specifications."
        />
      </div>

      {/* Modal: Site Detail Inspector */}
      {selectedSite && (
        <div
          className="fixed inset-0 bg-ink/70 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedSite(null)}
        >
          <div
            className="bg-white rounded-3xl max-w-lg w-full overflow-hidden border border-paper-line shadow-2xl animate-fade-in"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative h-60">
              <img
                src={selectedSite.image}
                alt={selectedSite.title}
                className="w-full h-full object-cover"
              />
              <button
                type="button"
                onClick={() => setSelectedSite(null)}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="p-6">
              <div className="text-xs font-head font-bold uppercase tracking-wider text-brand mb-1">
                {selectedSite.city} • {selectedSite.area}
              </div>
              <h3 className="font-news-serif text-2xl font-bold text-ink mb-4">
                {selectedSite.title}
              </h3>
              <div className="grid grid-cols-2 gap-3 p-4 rounded-2xl bg-paper-tint border border-paper-line text-xs font-sans mb-5">
                <div><strong>Media Type:</strong> {selectedSite.mediaType}</div>
                <div><strong>Illumination:</strong> {selectedSite.illumination}</div>
                <div><strong>Dimensions:</strong> {selectedSite.dimensions}</div>
                <div><strong>Daily Traffic:</strong> {selectedSite.dailyFootfall}</div>
                <div><strong>Clearance:</strong> {selectedSite.authorityClearance}</div>
                <div><strong>Tariff:</strong> <span className="text-red-600 font-bold">{selectedSite.ratePerMonth}/mo</span></div>
              </div>
              <button
                type="button"
                onClick={() => {
                  setReserveSite(selectedSite);
                  setSelectedSite(null);
                }}
                className="w-full py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-head font-bold text-xs uppercase tracking-wider transition-colors shadow-md"
              >
                Request Quotation &amp; Coordinates for this Site
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Site Reservation */}
      {reserveSite && (
        <div
          className="fixed inset-0 bg-ink/70 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={() => setReserveSite(null)}
        >
          <div
            className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-7 border border-paper-line shadow-2xl animate-fade-in"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-news-serif text-xl font-bold text-ink">
                Reserve Outdoor Location
              </h3>
              <button
                type="button"
                onClick={() => setReserveSite(null)}
                className="text-ink-muted hover:text-ink transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {reserveSubmitted ? (
              <div className="text-center py-6">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto mb-3" />
                <h4 className="font-news-serif text-lg font-bold text-emerald-900 mb-1">
                  Site Reservation Logged!
                </h4>
                <p className="text-xs text-ink-muted leading-relaxed mb-4">
                  Our regional operations manager will reach out with contract paperwork, angle proofs, and structural stability certificates.
                </p>
                <button
                  type="button"
                  onClick={() => setReserveSite(null)}
                  className="px-5 py-2 rounded-full bg-ink text-paper-soft text-xs font-head font-bold uppercase tracking-wider"
                >
                  Close
                </button>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setReserveSubmitted(true);
                }}
                className="space-y-3.5"
              >
                <div className="p-3.5 rounded-2xl bg-paper-tint border border-paper-line text-xs">
                  <strong className="text-ink block">{reserveSite.title}</strong>
                  <span className="text-ink-muted">{reserveSite.city} • {reserveSite.dimensions}</span>
                  <div className="text-brand font-bold mt-1">{reserveSite.ratePerMonth} / month</div>
                </div>

                <div>
                  <label className="block text-[11px] font-head font-semibold uppercase tracking-wider text-ink-muted mb-1">
                    Campaign Duration
                  </label>
                  <select
                    value={reserveDuration}
                    onChange={(e) => setReserveDuration(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-lg border border-paper-line bg-white text-xs text-ink font-sans focus:outline-none focus:ring-2 focus:ring-brand"
                  >
                    <option value="1 Month">1 Month (Standard)</option>
                    <option value="3 Months">3 Months (Quarterly - 10% Discount)</option>
                    <option value="6 Months">6 Months (Half-Yearly - 15% Discount)</option>
                    <option value="12 Months">12 Months (Annual Takeover - 20% Discount)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-head font-semibold uppercase tracking-wider text-ink-muted mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    defaultValue={plannerForm.name}
                    className="w-full px-3.5 py-2 rounded-lg border border-paper-line bg-white text-xs text-ink font-sans focus:outline-none focus:ring-2 focus:ring-brand"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-head font-semibold uppercase tracking-wider text-ink-muted mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    required
                    defaultValue={plannerForm.phone}
                    className="w-full px-3.5 py-2 rounded-lg border border-paper-line bg-white text-xs text-ink font-sans focus:outline-none focus:ring-2 focus:ring-brand"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-head font-bold text-xs uppercase tracking-wider transition-colors shadow-md mt-2"
                >
                  Confirm Reservation Inquiry
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
