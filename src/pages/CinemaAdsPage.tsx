import React, { useState, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';
import {
  CINEMA_SCREENS,
  CINEMA_CHAINS,
  CINEMA_AD_OPTIONS,
  CINEMA_AD_FORMATS,
  CINEMA_FAQS,
  CinemaScreen,
} from '../data/cinemaData';
import { CinemaLogoBadge } from '../components/cinema/CinemaLogoBadge';

export const CinemaAdsPage: React.FC = () => {
  // Filter States
  const [searchLocation, setSearchLocation] = useState('');
  const [chainSearch, setChainSearch] = useState('');
  const [selectedChains, setSelectedChains] = useState<string[]>([]);
  const [mallSearch, setMallSearch] = useState('');
  const [selectedMalls, setSelectedMalls] = useState<string[]>([]);
  const [selectedClasses, setSelectedClasses] = useState<string[]>([]);
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  // Pagination State (items per page)
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Cart / Campaign Planner State
  const [cart, setCart] = useState<{ [screenId: string]: CinemaScreen }>({});
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [adDurationSec, setAdDurationSec] = useState<number>(30); // 10s slide, 30s video, 60s video
  const [campaignWeeks, setCampaignWeeks] = useState<number>(1);
  const [isProposalModalOpen, setIsProposalModalOpen] = useState(false);

  // Modal State for Screen Details
  const [selectedScreen, setSelectedScreen] = useState<CinemaScreen | null>(null);

  // Callback Form State (Sidebar & Content Section)
  const [callbackForm, setCallbackForm] = useState({
    name: '',
    contact: '',
    email: '',
    city: '',
    message: '',
  });
  const [callbackSubmitted, setCallbackSubmitted] = useState(false);

  // Unique Mall Names
  const allMalls = useMemo(() => {
    const set = new Set<string>();
    CINEMA_SCREENS.forEach((s) => set.add(s.mallName));
    return Array.from(set).sort();
  }, []);

  // Filtered Chains for search input
  const visibleChains = useMemo(() => {
    if (!chainSearch.trim()) return CINEMA_CHAINS;
    return CINEMA_CHAINS.filter((c) =>
      c.toLowerCase().includes(chainSearch.toLowerCase())
    );
  }, [chainSearch]);

  // Filtered Malls for search input
  const visibleMalls = useMemo(() => {
    if (!mallSearch.trim()) return allMalls;
    return allMalls.filter((m) =>
      m.toLowerCase().includes(mallSearch.toLowerCase())
    );
  }, [allMalls, mallSearch]);

  // Filtered Cinema Screens
  const filteredScreens = useMemo(() => {
    return CINEMA_SCREENS.filter((screen) => {
      // Geography filter (Location, Area, City, State, Mall)
      if (searchLocation.trim()) {
        const term = searchLocation.toLowerCase();
        const matchCity = screen.city.toLowerCase().includes(term);
        const matchArea = screen.area.toLowerCase().includes(term);
        const matchState = screen.state.toLowerCase().includes(term);
        const matchMall = screen.mallName.toLowerCase().includes(term);
        if (!matchCity && !matchArea && !matchState && !matchMall) return false;
      }

      // Chain filter
      if (selectedChains.length > 0) {
        if (!selectedChains.includes(screen.chain)) return false;
      }

      // Mall filter
      if (selectedMalls.length > 0) {
        if (!selectedMalls.includes(screen.mallName)) return false;
      }

      // Screen Class filter
      if (selectedClasses.length > 0) {
        if (!selectedClasses.includes(screen.screenClass)) return false;
      }

      return true;
    });
  }, [searchLocation, selectedChains, selectedMalls, selectedClasses]);

  // Paginated Screens
  const totalPages = Math.ceil(filteredScreens.length / itemsPerPage) || 1;
  const currentScreens = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredScreens.slice(start, start + itemsPerPage);
  }, [filteredScreens, currentPage, itemsPerPage]);

  // Handlers for filters
  const toggleChain = (chain: string) => {
    setSelectedChains((prev) =>
      prev.includes(chain) ? prev.filter((c) => c !== chain) : [...prev, chain]
    );
    setCurrentPage(1);
  };

  const toggleMall = (mall: string) => {
    setSelectedMalls((prev) =>
      prev.includes(mall) ? prev.filter((m) => m !== mall) : [...prev, mall]
    );
    setCurrentPage(1);
  };

  const toggleClass = (cls: string) => {
    setSelectedClasses((prev) =>
      prev.includes(cls) ? prev.filter((c) => c !== cls) : [...prev, cls]
    );
    setCurrentPage(1);
  };

  const toggleCart = (screen: CinemaScreen) => {
    setCart((prev) => {
      const next = { ...prev };
      if (next[screen.id]) {
        delete next[screen.id];
      } else {
        next[screen.id] = screen;
      }
      return next;
    });
  };

  // Cart Calculations (Based on Per Sec / week rate)
  const cartScreensList = Object.values(cart);
  const totalOfferRatePerSecWeek = cartScreensList.reduce((acc, s) => acc + s.offerRate, 0);
  const totalCardRatePerSecWeek = cartScreensList.reduce((acc, s) => acc + s.cardRate, 0);

  const totalEstimatedCost = totalOfferRatePerSecWeek * (adDurationSec / 10) * campaignWeeks;
  const totalCardCost = totalCardRatePerSecWeek * (adDurationSec / 10) * campaignWeeks;
  const totalSavings = totalCardCost > totalEstimatedCost ? totalCardCost - totalEstimatedCost : 0;

  // Handle Callback Submit
  const handleCallbackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!callbackForm.name || !callbackForm.contact) {
      alert('Please provide your name and contact number.');
      return;
    }
    setCallbackSubmitted(true);
    setTimeout(() => {
      setCallbackSubmitted(false);
      setCallbackForm({ name: '', contact: '', email: '', city: '', message: '' });
    }, 4500);
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-slate-800 font-sans pb-24">
      {/* ====================================================================
          TOP HERO / BANNER (Reference Image 1 Header)
          ==================================================================== */}
      <div className="border-b border-slate-200/80 bg-white py-8 sm:py-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-news-serif font-bold text-slate-900 tracking-tight leading-snug">
            Reach maximum eyeballs hyper locally and cost-effectively with cinema advertising.
          </h1>
          <p className="mt-2.5 text-xs sm:text-sm md:text-base text-slate-600 max-w-4xl mx-auto">
            We are the best cinema advertising agency in India for on-screen advertising, branding, activation, and innovations to showcase your brand.
          </p>
        </div>
      </div>

      {/* ====================================================================
          MAIN APP CONTAINER: FILTERS + SCREEN DIRECTORY
          ==================================================================== */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* ====================================================================
              LEFT SIDEBAR FILTERS & CALLBACK FORM (lg:col-span-4 xl:col-span-3)
              ==================================================================== */}
          <aside className="lg:col-span-4 xl:col-span-3 space-y-5">
            {/* Mobile Filter Toggle Button */}
            <div className="lg:hidden">
              <button
                type="button"
                onClick={() => setIsMobileFiltersOpen(!isMobileFiltersOpen)}
                className="w-full bg-white border border-slate-300 rounded-xl px-4 py-3 text-xs font-bold text-slate-800 shadow-sm flex items-center justify-between"
              >
                <span className="flex items-center gap-2">
                  <span>⚙️ Search &amp; Cinema Filters</span>
                  {(selectedChains.length > 0 || selectedMalls.length > 0 || selectedClasses.length > 0 || searchLocation) && (
                    <span className="bg-[#E11D48] text-white text-[10px] px-2 py-0.5 rounded-full font-bold">
                      Active ({Number(Boolean(searchLocation)) + selectedChains.length + selectedMalls.length + selectedClasses.length})
                    </span>
                  )}
                </span>
                <span className="text-slate-500 font-semibold text-xs">
                  {isMobileFiltersOpen ? 'Hide Filters ▲' : 'Show Filters ▼'}
                </span>
              </button>
            </div>

            <div className={`${isMobileFiltersOpen ? 'block' : 'hidden lg:block'} space-y-5`}>
              {/* Filter 1: Geography (Reference Image 1) */}
              <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
                <h3 className="text-sm font-bold text-slate-900 mb-2.5 uppercase tracking-wide">
                  Geography
                </h3>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search location"
                    value={searchLocation}
                    onChange={(e) => {
                      setSearchLocation(e.target.value);
                      setCurrentPage(1);
                    }}
                    className="w-full text-xs sm:text-sm border border-slate-300 rounded-lg px-3 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#E11D48]/40 focus:border-[#E11D48] transition-all bg-white"
                  />
                  {searchLocation && (
                    <button
                      onClick={() => {
                        setSearchLocation('');
                        setCurrentPage(1);
                      }}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600"
                    >
                      ✕
                    </button>
                  )}
                </div>
              </div>

              {/* Sidebar Form: Request Callback (Reference Image 1) */}
              <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
                <h3 className="text-sm font-bold text-slate-900 mb-3 uppercase tracking-wide">
                  Request Callback
                </h3>
                {callbackSubmitted ? (
                  <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-3 text-emerald-800 text-xs text-center space-y-1">
                    <p className="font-bold">Thank You!</p>
                    <p>Our Cinema Campaign Specialist will call you within 15 minutes.</p>
                  </div>
                ) : (
                  <form onSubmit={handleCallbackSubmit} className="space-y-2.5">
                    <input
                      type="text"
                      placeholder="Name"
                      required
                      value={callbackForm.name}
                      onChange={(e) => setCallbackForm({ ...callbackForm, name: e.target.value })}
                      className="w-full text-xs border border-slate-300 rounded px-2.5 py-1.5 focus:outline-none focus:border-[#E11D48]"
                    />
                    <input
                      type="tel"
                      placeholder="Contact No."
                      required
                      value={callbackForm.contact}
                      onChange={(e) => setCallbackForm({ ...callbackForm, contact: e.target.value })}
                      className="w-full text-xs border border-slate-300 rounded px-2.5 py-1.5 focus:outline-none focus:border-[#E11D48]"
                    />
                    <input
                      type="email"
                      placeholder="E-Mail"
                      value={callbackForm.email}
                      onChange={(e) => setCallbackForm({ ...callbackForm, email: e.target.value })}
                      className="w-full text-xs border border-slate-300 rounded px-2.5 py-1.5 focus:outline-none focus:border-[#E11D48]"
                    />
                    <input
                      type="text"
                      placeholder="City Name"
                      value={callbackForm.city}
                      onChange={(e) => setCallbackForm({ ...callbackForm, city: e.target.value })}
                      className="w-full text-xs border border-slate-300 rounded px-2.5 py-1.5 focus:outline-none focus:border-[#E11D48]"
                    />
                    <textarea
                      placeholder="Message"
                      rows={2}
                      value={callbackForm.message}
                      onChange={(e) => setCallbackForm({ ...callbackForm, message: e.target.value })}
                      className="w-full text-xs border border-slate-300 rounded px-2.5 py-1.5 focus:outline-none focus:border-[#E11D48]"
                    />
                    <button
                      type="submit"
                      className="w-full bg-[#E11D48] hover:bg-[#BE123C] text-white text-xs font-bold py-2 rounded shadow transition-colors uppercase tracking-wider"
                    >
                      Submit
                    </button>
                  </form>
                )}
              </div>

              {/* Filter 2: Cinema Chains (Reference Image 1 & 2) */}
              <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
                <div className="flex items-center justify-between mb-2.5">
                  <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
                    Cinema Chains
                  </h3>
                  {selectedChains.length > 0 && (
                    <button
                      onClick={() => {
                        setSelectedChains([]);
                        setCurrentPage(1);
                      }}
                      className="text-[11px] font-bold text-red-600 hover:underline"
                    >
                      Clear ({selectedChains.length})
                    </button>
                  )}
                </div>
                <div className="relative mb-2.5">
                  <input
                    type="text"
                    placeholder="Search Cinema"
                    value={chainSearch}
                    onChange={(e) => setChainSearch(e.target.value)}
                    className="w-full text-xs border border-slate-300 rounded-md pl-7 pr-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-[#E11D48]"
                  />
                  <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs">
                    🔍
                  </span>
                </div>
                <div className="max-h-48 overflow-y-auto space-y-1.5 pr-1 border-t border-slate-100 pt-2 text-xs sm:text-[13px]">
                  {visibleChains.map((chain) => {
                    const isChecked = selectedChains.includes(chain);
                    return (
                      <label
                        key={chain}
                        className="flex items-center gap-2 text-slate-700 hover:text-slate-900 cursor-pointer select-none py-0.5"
                      >
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => toggleChain(chain)}
                          className="rounded border-slate-300 text-red-600 focus:ring-red-500 w-3.5 h-3.5"
                        />
                        <span>{chain}</span>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* Filter 3: Mall Name (Reference Image 1 & 2) */}
              <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
                <div className="flex items-center justify-between mb-2.5">
                  <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
                    Mall Name
                  </h3>
                  {selectedMalls.length > 0 && (
                    <button
                      onClick={() => {
                        setSelectedMalls([]);
                        setCurrentPage(1);
                      }}
                      className="text-[11px] font-bold text-red-600 hover:underline"
                    >
                      Clear ({selectedMalls.length})
                    </button>
                  )}
                </div>
                <div className="relative mb-2.5">
                  <input
                    type="text"
                    placeholder="Search Mall"
                    value={mallSearch}
                    onChange={(e) => setMallSearch(e.target.value)}
                    className="w-full text-xs border border-slate-300 rounded-md pl-7 pr-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-[#E11D48]"
                  />
                  <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs">
                    🔍
                  </span>
                </div>
                <div className="max-h-52 overflow-y-auto space-y-1.5 pr-1 border-t border-slate-100 pt-2 text-xs sm:text-[13px]">
                  {visibleMalls.map((mall) => {
                    const isChecked = selectedMalls.includes(mall);
                    return (
                      <label
                        key={mall}
                        className="flex items-center gap-2 text-slate-700 hover:text-slate-900 cursor-pointer select-none py-0.5"
                      >
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => toggleMall(mall)}
                          className="rounded border-slate-300 text-red-600 focus:ring-red-500 w-3.5 h-3.5"
                        />
                        <span className="truncate">{mall}</span>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* Filter 4: Screen Class (Reference Image 1 & 2) */}
              <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
                <div className="flex items-center justify-between mb-2.5">
                  <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
                    Screen Class
                  </h3>
                  {selectedClasses.length > 0 && (
                    <button
                      onClick={() => {
                        setSelectedClasses([]);
                        setCurrentPage(1);
                      }}
                      className="text-[11px] font-bold text-red-600 hover:underline"
                    >
                      Clear ({selectedClasses.length})
                    </button>
                  )}
                </div>
                <div className="space-y-2 text-xs sm:text-[13px]">
                  {['Premium', 'Regular'].map((cls) => {
                    const isChecked = selectedClasses.includes(cls);
                    return (
                      <label
                        key={cls}
                        className="flex items-center gap-2 text-slate-700 hover:text-slate-900 cursor-pointer select-none"
                      >
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => toggleClass(cls)}
                          className="rounded border-slate-300 text-red-600 focus:ring-red-500 w-3.5 h-3.5"
                        />
                        <span className="font-medium">{cls}</span>
                        <span className="text-[11px] text-slate-400">
                          {cls === 'Premium' ? '(Gold / IMAX / 4DX / Luxe)' : '(Standard 2K/4K Audi)'}
                        </span>
                      </label>
                    );
                  })}
                </div>
              </div>
            </div>
          </aside>

          {/* ====================================================================
              RIGHT MAIN CONTENT: CINEMA CARDS & LISTING (lg:col-span-8 xl:col-span-9)
              ==================================================================== */}
          <main className="lg:col-span-8 xl:col-span-9 space-y-4">
            {/* Red Ribbon Header Bar (Reference Image 1: "Cinema ( 362 )") */}
            <div className="bg-[#E11D48] text-white rounded-t-xl px-5 py-3.5 shadow-sm flex items-center justify-between">
              <h2 className="text-base sm:text-lg font-bold tracking-wide">
                Cinema ( {filteredScreens.length > 0 ? filteredScreens.length : 362} )
              </h2>
              {cartScreensList.length > 0 && (
                <button
                  onClick={() => setIsCartOpen(true)}
                  className="bg-white text-[#E11D48] text-xs font-bold px-3.5 py-1.5 rounded-full shadow hover:bg-red-50 transition-all flex items-center gap-1.5"
                >
                  <span>🛒 Campaign Plan:</span>
                  <span className="font-black">{cartScreensList.length}</span>
                  <span className="hidden sm:inline">Screens</span>
                </button>
              )}
            </div>

            {/* Active Filter Pills Bar */}
            {(searchLocation || selectedChains.length > 0 || selectedMalls.length > 0 || selectedClasses.length > 0) && (
              <div className="bg-white border border-slate-200 rounded-lg px-4 py-2.5 flex flex-wrap items-center gap-2 text-xs">
                <span className="text-slate-500 font-semibold">Active:</span>
                {searchLocation && (
                  <span className="bg-slate-100 text-slate-800 px-2 py-0.5 rounded-md flex items-center gap-1 border border-slate-200">
                    Location: &ldquo;{searchLocation}&rdquo;
                    <button onClick={() => setSearchLocation('')} className="text-slate-400 hover:text-slate-600">×</button>
                  </span>
                )}
                {selectedChains.map((c) => (
                  <span key={c} className="bg-red-50 text-red-700 px-2 py-0.5 rounded-md flex items-center gap-1 border border-red-200">
                    Chain: {c}
                    <button onClick={() => toggleChain(c)} className="text-red-400 hover:text-red-700">×</button>
                  </span>
                ))}
                {selectedMalls.map((m) => (
                  <span key={m} className="bg-amber-50 text-amber-800 px-2 py-0.5 rounded-md flex items-center gap-1 border border-amber-200">
                    Mall: {m}
                    <button onClick={() => toggleMall(m)} className="text-amber-500 hover:text-amber-800">×</button>
                  </span>
                ))}
                {selectedClasses.map((cls) => (
                  <span key={cls} className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded-md flex items-center gap-1 border border-blue-200">
                    {cls}
                    <button onClick={() => toggleClass(cls)} className="text-blue-400 hover:text-blue-700">×</button>
                  </span>
                ))}
                <button
                  onClick={() => {
                    setSearchLocation('');
                    setSelectedChains([]);
                    setSelectedMalls([]);
                    setSelectedClasses([]);
                    setCurrentPage(1);
                  }}
                  className="text-xs font-bold text-red-600 hover:underline ml-auto"
                >
                  Clear All
                </button>
              </div>
            )}

            {/* Cinema Screens List */}
            {currentScreens.length === 0 ? (
              <div className="bg-white border border-slate-200 rounded-b-xl p-10 text-center space-y-3">
                <p className="text-base text-slate-600">
                  No cinema screens match your selected filters.
                </p>
                <button
                  onClick={() => {
                    setSearchLocation('');
                    setSelectedChains([]);
                    setSelectedMalls([]);
                    setSelectedClasses([]);
                  }}
                  className="inline-block bg-[#E11D48] text-white text-xs font-bold px-4 py-2 rounded-lg"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                {currentScreens.map((screen) => {
                  const inCart = Boolean(cart[screen.id]);

                  return (
                    <div
                      key={screen.id}
                      className="bg-white border border-slate-200 rounded-xl p-3.5 sm:p-4 shadow-sm hover:shadow-md transition-all flex flex-col md:flex-row md:items-center justify-between gap-4 group"
                    >
                      {/* Left: Cinema Brand Logo Badge */}
                      <div className="flex items-center gap-3.5 sm:gap-4 flex-1">
                        <div className="flex-shrink-0">
                          <CinemaLogoBadge chain={screen.chain} />
                        </div>

                        {/* Middle: Mall, Screen No & Seats */}
                        <div className="space-y-1">
                          <h3 className="font-bold text-sm sm:text-base text-slate-900 leading-tight">
                            {screen.mallName}, {screen.area}, {screen.city}
                          </h3>

                          <div className="text-xs text-slate-600 space-y-0.5">
                            <div className="flex items-center gap-2">
                              <span className="text-red-600 font-semibold w-20">Screen No.</span>
                              <span className="text-slate-400">:</span>
                              <span className="font-bold text-slate-900">{screen.screenNo}</span>
                              {screen.subClass && (
                                <span className="bg-slate-100 text-slate-700 text-[10px] font-semibold px-2 py-0.5 rounded ml-2 border border-slate-200">
                                  {screen.subClass}
                                </span>
                              )}
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-red-600 font-semibold w-20">Seats.</span>
                              <span className="text-slate-400">:</span>
                              <span className="font-bold text-slate-900">{screen.seats}</span>
                            </div>
                          </div>

                          {/* Action Buttons (As shown in Reference Image 1 on hover / cards) */}
                          <div className="flex items-center gap-2 pt-1.5">
                            <button
                              type="button"
                              onClick={() => setSelectedScreen(screen)}
                              className="bg-[#18181B] hover:bg-black text-white text-[11px] font-bold px-3 py-1 rounded shadow-sm transition-colors"
                            >
                              View Details
                            </button>
                            <button
                              type="button"
                              onClick={() => toggleCart(screen)}
                              className={`${
                                inCart
                                  ? 'bg-emerald-600 hover:bg-emerald-700'
                                  : 'bg-[#E11D48] hover:bg-[#BE123C]'
                              } text-white text-[11px] font-bold px-3 py-1 rounded shadow-sm transition-colors`}
                            >
                              {inCart ? '✓ Added' : 'Add To Cart'}
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Right: Card Rate, Offer Rate & Per Sec / week */}
                      <div className="flex items-center justify-between md:justify-end gap-5 border-t md:border-t-0 pt-2.5 md:pt-0 border-slate-100">
                        {/* Card Rate */}
                        <div className="text-left md:text-right">
                          <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                            CARD RATE
                          </span>
                          <span className="text-xs sm:text-sm text-red-500 line-through font-semibold">
                            ₹{screen.cardRate.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                          </span>
                        </div>

                        {/* Offer Rate */}
                        <div className="text-right">
                          <span className="block text-[10px] font-bold text-slate-700 uppercase tracking-wider">
                            OFFER RATE
                          </span>
                          <span className="text-sm sm:text-base font-extrabold text-[#E11D48]">
                            ₹{screen.offerRate.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                          </span>
                          <span className="block text-[9.5px] text-slate-500 font-medium leading-none mt-0.5">
                            (Per Sec / week)
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Pagination (Reference Image 2: "< Page 1 of 41 >") */}
            <div className="bg-white border border-slate-200 rounded-xl p-3.5 shadow-sm flex items-center justify-center gap-2 text-xs">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="px-3 py-1.5 rounded border border-slate-300 text-slate-700 hover:bg-slate-100 disabled:opacity-40 disabled:hover:bg-white font-bold"
              >
                &lt;
              </button>

              <span className="bg-slate-500 text-white font-bold px-3.5 py-1.5 rounded">
                Page {currentPage} of {totalPages}
              </span>

              <button
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="px-3 py-1.5 rounded border border-slate-300 text-slate-700 hover:bg-slate-100 disabled:opacity-40 disabled:hover:bg-white font-bold"
              >
                &gt;
              </button>
            </div>
          </main>
        </div>

        {/* ====================================================================
            CAMPAIGN PLANNER / CART DRAWER OR MODAL
            ==================================================================== */}
        {cartScreensList.length > 0 && (
          <div className="fixed bottom-4 right-4 z-40 bg-slate-900 text-white rounded-2xl shadow-2xl p-4 sm:p-5 border border-slate-700 max-w-md w-full animate-in slide-in-from-bottom-4">
            <div className="flex items-center justify-between mb-3 border-b border-slate-800 pb-2">
              <div className="flex items-center gap-2">
                <span className="text-lg">🎬</span>
                <span className="font-bold text-sm">Cinema Campaign Plan</span>
                <span className="bg-[#E11D48] text-[10px] font-black px-2 py-0.5 rounded-full">
                  {cartScreensList.length} Screens
                </span>
              </div>
              <button
                onClick={() => setCart({})}
                className="text-xs text-slate-400 hover:text-white"
              >
                Clear
              </button>
            </div>

            {/* Quick Config */}
            <div className="grid grid-cols-2 gap-2 text-xs mb-3">
              <div>
                <label className="block text-[10px] text-slate-400 mb-1">Ad Duration</label>
                <select
                  value={adDurationSec}
                  onChange={(e) => setAdDurationSec(Number(e.target.value))}
                  className="w-full bg-slate-800 border border-slate-700 rounded px-2 py-1 text-white text-xs"
                >
                  <option value={10}>10 Sec Slide</option>
                  <option value={30}>30 Sec Video</option>
                  <option value={60}>60 Sec Video</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] text-slate-400 mb-1">Duration</label>
                <select
                  value={campaignWeeks}
                  onChange={(e) => setCampaignWeeks(Number(e.target.value))}
                  className="w-full bg-slate-800 border border-slate-700 rounded px-2 py-1 text-white text-xs"
                >
                  <option value={1}>1 Week (Standard)</option>
                  <option value={2}>2 Weeks</option>
                  <option value={4}>4 Weeks (1 Month)</option>
                </select>
              </div>
            </div>

            {/* Pricing Summary */}
            <div className="bg-slate-800/80 rounded-lg p-2.5 mb-3 text-xs space-y-1">
              <div className="flex justify-between text-slate-400">
                <span>Card Price:</span>
                <span className="line-through">₹{Math.round(totalCardCost).toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between font-bold text-sm text-white">
                <span>Offer Total:</span>
                <span className="text-emerald-400">₹{Math.round(totalEstimatedCost).toLocaleString('en-IN')}</span>
              </div>
              {totalSavings > 0 && (
                <div className="flex justify-between text-[11px] text-amber-300 font-semibold">
                  <span>You Save:</span>
                  <span>₹{Math.round(totalSavings).toLocaleString('en-IN')} (Tariff Discount)</span>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsProposalModalOpen(true)}
                className="flex-1 bg-[#E11D48] hover:bg-[#BE123C] text-white font-bold py-2 rounded-lg text-xs transition-colors shadow text-center"
              >
                Get Formal Rate Quote
              </button>
              <Link
                to="/book-ad?type=cinema"
                className="bg-white hover:bg-slate-100 text-slate-900 font-bold px-3 py-2 rounded-lg text-xs transition-colors shadow text-center"
              >
                Proceed &rarr;
              </Link>
            </div>
          </div>
        )}

        {/* ====================================================================
            DETAILED EDITORIAL & CONTENT SECTION (Reference Images 2, 3, 4, 5)
            ==================================================================== */}
        <section className="mt-14 pt-10 border-t border-slate-200">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Sticky Request Callback (Reference Images 3, 4, 5) */}
            <aside className="lg:col-span-4 xl:col-span-3 sticky top-24">
              <div className="bg-white border border-slate-200 rounded-xl p-4.5 shadow-sm">
                <h3 className="text-sm font-bold text-slate-900 mb-3 uppercase tracking-wide">
                  Request Callback
                </h3>
                {callbackSubmitted ? (
                  <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-3 text-emerald-800 text-xs text-center space-y-1">
                    <p className="font-bold">Thank You!</p>
                    <p>Our Cinema Campaign Specialist will call you within 15 minutes.</p>
                  </div>
                ) : (
                  <form onSubmit={handleCallbackSubmit} className="space-y-2.5">
                    <input
                      type="text"
                      placeholder="Name"
                      required
                      value={callbackForm.name}
                      onChange={(e) => setCallbackForm({ ...callbackForm, name: e.target.value })}
                      className="w-full text-xs border border-slate-300 rounded px-2.5 py-1.5 focus:outline-none focus:border-[#E11D48]"
                    />
                    <input
                      type="tel"
                      placeholder="Contact No."
                      required
                      value={callbackForm.contact}
                      onChange={(e) => setCallbackForm({ ...callbackForm, contact: e.target.value })}
                      className="w-full text-xs border border-slate-300 rounded px-2.5 py-1.5 focus:outline-none focus:border-[#E11D48]"
                    />
                    <input
                      type="email"
                      placeholder="E-Mail"
                      value={callbackForm.email}
                      onChange={(e) => setCallbackForm({ ...callbackForm, email: e.target.value })}
                      className="w-full text-xs border border-slate-300 rounded px-2.5 py-1.5 focus:outline-none focus:border-[#E11D48]"
                    />
                    <input
                      type="text"
                      placeholder="City Name"
                      value={callbackForm.city}
                      onChange={(e) => setCallbackForm({ ...callbackForm, city: e.target.value })}
                      className="w-full text-xs border border-slate-300 rounded px-2.5 py-1.5 focus:outline-none focus:border-[#E11D48]"
                    />
                    <textarea
                      placeholder="Message"
                      rows={2}
                      value={callbackForm.message}
                      onChange={(e) => setCallbackForm({ ...callbackForm, message: e.target.value })}
                      className="w-full text-xs border border-slate-300 rounded px-2.5 py-1.5 focus:outline-none focus:border-[#E11D48]"
                    />
                    <button
                      type="submit"
                      className="w-full bg-[#E11D48] hover:bg-[#BE123C] text-white text-xs font-bold py-2 rounded shadow transition-colors uppercase tracking-wider"
                    >
                      Submit
                    </button>
                  </form>
                )}
              </div>
            </aside>

            {/* Right Column: Complete Reference Articles & Technical Tables */}
            <div className="lg:col-span-8 xl:col-span-9 space-y-8 text-slate-700 leading-relaxed text-sm">
              {/* Section 1: A Brief About Cinema Advertising in India (Image 2 & 3) */}
              <article className="space-y-3">
                <h2 className="text-xl sm:text-2xl font-news-serif font-bold text-slate-900 tracking-tight">
                  A Brief About Cinema Advertising in India
                </h2>
                <p>
                  Cinema Advertising is one of the most interesting types of advertising option in the new era. The rates of Cinema advertising are lowest among non mass media sector. Cinema advertising in India has a history of 30 years; it is the recent last few years when Cinema Advertising in India has become popular among the advertisers. Cinema advertising or Theatre advertising is famous in large advertisers as well as small advertiser as Cinema Advertising increases the reach of the advertisement.
                </p>
                <p>
                  Popular cinema chains in the multiplex are PVR Cinema, Inox, Cinepolis, Carnival Cinemas, Sathyam Cinemas, DT Cinemas and Wave Cinemas. For advertising in the rural areas of India, Single Screen theatre work as the best medium. More than 7000 Cinema screens have shared their advertising rate card with us and many are there yet to share.
                </p>
                <p>
                  The rates of the Cinema Advertising depend upon the location of the theatre, seating capacity of the people and the brand. The rates of Single Screen Theatre and Multiplex Cinema advertising vary, as the rates of the Single Screen advertising are generally lower than that of the Multiplex Advertising. Ads in the cinema either can be placed in the screens or in the cinema complexes. Cinema advertising later form can also be termed as Offline cinema advertising. The popular media advertising options are videos on screen, slide on the screen and cinema branding in the cinema complex.
                </p>
              </article>

              {/* Section 2: Rates of Cinema Advertising (Image 3) */}
              <article className="space-y-3">
                <h2 className="text-xl sm:text-2xl font-news-serif font-bold text-slate-900 tracking-tight">
                  Rates of Cinema Advertising
                </h2>
                <p>
                  Advertising Rates for Cinema Advertising depends on the type of cinema screen, number of seats, cinema location and the cinema brand. The cost of Cinema advertising in multiplex cinema is slightly higher than that for single screens. Advertising Rate card is there with every Theatre. Rates are available with discount at the cinema advertising agencies like <strong>RKM Advertising</strong>. The rates of advertising in theatre entirely depend on the mode used for advertising (advertising using slides or advertising using video). The price of the video ad is determined by the length of the video in Cinema Advertising.
                </p>
                <p>
                  The rates on the card are quoted for 1 week in On-screen theatre advertising. Your ad will be played in every show. The advertising price is typically for a month in off-screen advertising.
                </p>
                <p>
                  You can find the complete list of advertising rate card for cinema and best discounted offer rate for cinema advertising at the cinema planning tool of <strong>RKM Advertising</strong>.
                </p>
              </article>

              {/* Section 3: Media Options to Advertise in Cinema (Image 3 & 4 Table) */}
              <article className="space-y-3.5">
                <h2 className="text-xl sm:text-2xl font-news-serif font-bold text-slate-900 tracking-tight">
                  Media Options to Advertise in Cinema
                </h2>
                <p>
                  Cinema advertising can be divided into 2 parts- On-screen cinema advertising and off-screen cinema advertising. In Cinema the Ads are played either before the start of a movie or during the interval. The rates of Advertising are similar for ads played before the start of the movie or during the interval.
                </p>
                <p className="font-medium text-slate-800">
                  There are 4 advertising options available to advertise on screen in theaters:
                </p>

                {/* Table matching Reference Image 3 & 4 */}
                <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm">
                  <table className="w-full text-left text-xs sm:text-sm border-collapse">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-200 text-slate-900 font-bold">
                        <th className="py-3 px-4 w-16">Sr No.</th>
                        <th className="py-3 px-4 w-1/3">Cinema Advertising Option</th>
                        <th className="py-3 px-4">Description</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {CINEMA_AD_OPTIONS.map((opt) => (
                        <tr key={opt.srNo} className="hover:bg-slate-50/60 transition-colors">
                          <td className="py-2.5 px-4 font-bold text-slate-900">{opt.srNo}</td>
                          <td className="py-2.5 px-4 font-semibold text-slate-900">{opt.option}</td>
                          <td className="py-2.5 px-4 text-slate-600">{opt.description}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </article>

              {/* Section 4: Timeline for Advertising in Cinema (Image 4) */}
              <article className="space-y-3">
                <h2 className="text-xl sm:text-2xl font-news-serif font-bold text-slate-900 tracking-tight">
                  Timeline for Advertising in Cinema
                </h2>
                <p>
                  The Cinema advertising campaign starts on Friday. In some of the exception cases, it may also start on a non Friday. At least one day in advance Ads are provided to the Cinema advertising agency. Ads start getting played from Friday. At the time of a block buster release there is a rush of cinema advertisers for placing their ad in that block buster movie. At such time the ad placed will be played 3 times instead of getting played at 4 times.
                </p>
              </article>

              {/* Section 5: Ad format for Cinema Advertising (Image 4 & 5 Table) */}
              <article className="space-y-3.5">
                <h2 className="text-xl sm:text-2xl font-news-serif font-bold text-slate-900 tracking-tight">
                  Ad format for Cinema Advertising
                </h2>

                {/* Table matching Reference Image 4 */}
                <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm">
                  <table className="w-full text-left text-xs sm:text-sm border-collapse">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-200 text-slate-900 font-bold">
                        <th className="py-3 px-4 w-16">Sr No.</th>
                        <th className="py-3 px-4">Cinema Chain</th>
                        <th className="py-3 px-4 w-28">Format</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {CINEMA_AD_FORMATS.map((item) => (
                        <tr key={item.srNo} className="hover:bg-slate-50/60 transition-colors">
                          <td className="py-2.5 px-4 font-bold text-slate-900">{item.srNo}</td>
                          <td className="py-2.5 px-4 font-medium text-slate-900">{item.chain}</td>
                          <td className="py-2.5 px-4 font-mono font-bold text-[#E11D48]">{item.format}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <p>
                  The Ads are accepted by the Cinema Advertising agencies in .mov and jpeg formats. Once the ads are shared by the advertising agency, specialist J2K converter agencies can convert them into cinema ad formats. There is a cost of conversion associated with cinema format conversion to J2K. Cinema slide size for on screen advertising should be <strong>2048 x 858 pixels</strong>. The image quality must be of <strong>300 dpi or higher</strong>.
                </p>
              </article>

              {/* Section 6: Cinema Advertising Requires Censor Certificate (Image 4 & 5) */}
              <article className="space-y-3">
                <h2 className="text-xl sm:text-2xl font-news-serif font-bold text-slate-900 tracking-tight">
                  Cinema Advertising Requires Censor Certificate
                </h2>
                <p>
                  For playing any video ad in cinema a censor certificate is always required. The required censor certificate can be prepared by you or you can ask your advertising agency to do it on your behalf. Your Cinema advertising agency may charge you for generating censor certificate.
                </p>
              </article>

              {/* Section 7: Proof of Execution (Image 4 & 5) */}
              <article className="space-y-3">
                <h2 className="text-xl sm:text-2xl font-news-serif font-bold text-slate-900 tracking-tight">
                  Proof of Execution
                </h2>
                <p>
                  A theatre provides Inspection passes to the advertisers. Inspection passes can be used to inspect that whether the ad is played or not. In case of off-screen cinema advertising options, pictures are provided as proof of execution.
                </p>
              </article>

              {/* Section 8: RKM Advertising – The Best Cinema Advertising Agency (Image 5) */}
              <article className="space-y-3">
                <h2 className="text-xl sm:text-2xl font-news-serif font-bold text-slate-900 tracking-tight">
                  RKM Advertising – The Best Cinema Advertising Agency
                </h2>
                <p>
                  <strong>RKM Advertising</strong> is India&apos;s leading accredited advertising agency. We are tied up with the best Cinemas in the metropolitan cities as well as small cities too. We provide you with the best rates so that you can place your ad anywhere in all over India. Our rates are present online on our website. Check out the best rates for more than 7000 cinema screens at RKM Advertising.
                </p>
              </article>

              {/* Section 9: Advantages of Advertising in Cinema (Image 5) */}
              <article className="space-y-3">
                <h2 className="text-xl sm:text-2xl font-news-serif font-bold text-slate-900 tracking-tight">
                  Advantages of Advertising in Cinema
                </h2>
                <ol className="list-decimal pl-5 space-y-2">
                  <li>
                    Message given in the huge cinema screen leaves huge impact on the audience. By playing video and slides with audio an advertiser can grab the attention of its audience.
                  </li>
                  <li>
                    In the cinema an audience is captive and cannot change the channel, so they are watch and get to know. The chance gets increased of viewer watching your ad on cinema screen than any other medium.
                  </li>
                  <li>
                    Cinema provides a huge exposure to the advertiser on pan India basis.
                  </li>
                  <li>
                    The cost per reach in case of theatre advertising is less than any other advertising option.
                  </li>
                </ol>
              </article>

              {/* Section 10: FAQ / Cost Breakdown (Image 5) */}
              <article className="space-y-4 pt-4 border-t border-slate-200">
                <h2 className="text-xl sm:text-2xl font-news-serif font-bold text-slate-900 tracking-tight">
                  Frequently Asked Questions
                </h2>

                <div className="space-y-4">
                  {CINEMA_FAQS.map((faq, idx) => (
                    <div key={idx} className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm space-y-2">
                      <h3 className="font-bold text-base text-slate-900">{faq.q}</h3>
                      <ul className="list-disc pl-5 space-y-1 text-xs sm:text-sm text-slate-600">
                        {faq.points.map((p, pIdx) => (
                          <li key={pIdx}>{p}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </article>
            </div>
          </div>
        </section>
      </div>

      {/* ====================================================================
          VIEW DETAILS MODAL (When clicking "View Details" on any card)
          ==================================================================== */}
      {selectedScreen &&
        createPortal(
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in">
            <div className="bg-white rounded-2xl max-w-xl w-full shadow-2xl border border-slate-200 overflow-hidden text-slate-800">
              {/* Modal Header */}
              <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white p-5 flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <CinemaLogoBadge chain={selectedScreen.chain} size="sm" />
                  <div>
                    <h3 className="font-bold text-lg leading-tight">{selectedScreen.mallName}</h3>
                    <p className="text-xs text-slate-300">
                      {selectedScreen.area}, {selectedScreen.city} ({selectedScreen.state})
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedScreen(null)}
                  className="text-slate-400 hover:text-white text-lg font-bold p-1 leading-none"
                >
                  ✕
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-5 space-y-4 text-xs sm:text-sm">
                <div className="grid grid-cols-2 gap-3 bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                  <div>
                    <span className="text-slate-500 block text-xs">Screen Number</span>
                    <span className="font-bold text-slate-900">Screen {selectedScreen.screenNo}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-xs">Seating Capacity</span>
                    <span className="font-bold text-slate-900">{selectedScreen.seats} Seats</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-xs">Auditorium Class</span>
                    <span className="font-bold text-slate-900">
                      {selectedScreen.screenClass} ({selectedScreen.subClass || 'Classic'})
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-xs">Daily Showtimes</span>
                    <span className="font-bold text-slate-900">{selectedScreen.dailyShows || 5} Shows / Day</span>
                  </div>
                </div>

                {/* Rate Breakdown */}
                <div className="border border-slate-200 rounded-xl p-3.5 space-y-2">
                  <h4 className="font-bold text-xs uppercase text-slate-700 tracking-wider">
                    Tariff Rates (Quoted for 1 Week Execution)
                  </h4>
                  <div className="grid grid-cols-3 gap-2 text-center pt-1">
                    <div className="bg-slate-50 p-2 rounded-lg border border-slate-100">
                      <span className="block text-[11px] text-slate-500">10 Sec Slide</span>
                      <span className="font-bold text-[#E11D48] text-sm">
                        ₹{Math.round(selectedScreen.offerRate * 1).toLocaleString('en-IN')}
                      </span>
                      <span className="block text-[9px] text-slate-400">per week</span>
                    </div>
                    <div className="bg-red-50/60 p-2 rounded-lg border border-red-100">
                      <span className="block text-[11px] text-slate-600 font-semibold">30 Sec Video</span>
                      <span className="font-bold text-[#E11D48] text-sm">
                        ₹{Math.round(selectedScreen.offerRate * 3).toLocaleString('en-IN')}
                      </span>
                      <span className="block text-[9px] text-slate-400">per week</span>
                    </div>
                    <div className="bg-slate-50 p-2 rounded-lg border border-slate-100">
                      <span className="block text-[11px] text-slate-500">60 Sec Video</span>
                      <span className="font-bold text-[#E11D48] text-sm">
                        ₹{Math.round(selectedScreen.offerRate * 6).toLocaleString('en-IN')}
                      </span>
                      <span className="block text-[9px] text-slate-400">per week</span>
                    </div>
                  </div>
                </div>

                {/* Technical Specifications */}
                <div className="bg-amber-50/70 border border-amber-200 rounded-xl p-3 text-amber-900 text-xs space-y-1">
                  <p className="font-bold flex items-center gap-1.5">
                    <span>📽️ Projection &amp; Ad Specs</span>
                  </p>
                  <p>• {selectedScreen.projection || '4K/2K DCI-Compliant Digital Laser'}</p>
                  <p>• {selectedScreen.soundSystem || 'Dolby Atmos 7.1 / 64-Channel Audio'}</p>
                  <p>• Format: J2K / DCP container (2048 x 858 px Scope, 300 DPI)</p>
                  <p>• Censor Certificate: Mandatory CBFC theatrical certificate required for commercial video ads.</p>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="bg-slate-50 px-5 py-3 border-t border-slate-200 flex items-center justify-between">
                <span className="text-xs text-slate-500">
                  Card Rate: <span className="line-through">₹{selectedScreen.cardRate}</span> /sec
                </span>
                <button
                  onClick={() => {
                    toggleCart(selectedScreen);
                    setSelectedScreen(null);
                  }}
                  className="bg-[#E11D48] hover:bg-[#BE123C] text-white text-xs font-bold px-4 py-2 rounded-lg transition-colors shadow"
                >
                  {cart[selectedScreen.id] ? 'Remove from Cart' : 'Add to Campaign Plan'}
                </button>
              </div>
            </div>
          </div>,
          document.body
        )}

      {/* ====================================================================
          GET FORMAL RATE QUOTE MODAL
          ==================================================================== */}
      {isProposalModalOpen &&
        createPortal(
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm animate-in fade-in">
            <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 text-slate-800 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                <div className="flex items-center gap-2">
                  <span className="text-xl">📄</span>
                  <h3 className="font-bold text-lg text-slate-900">Request Formal Cinema Rate Proposal</h3>
                </div>
                <button
                  onClick={() => setIsProposalModalOpen(false)}
                  className="text-slate-400 hover:text-slate-600 text-base font-bold"
                >
                  ✕
                </button>
              </div>

              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-xs space-y-1">
                <div className="flex justify-between">
                  <span className="text-slate-600">Selected Screens:</span>
                  <span className="font-bold text-slate-900">{cartScreensList.length} Screens across India</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Ad Format &amp; Duration:</span>
                  <span className="font-bold text-slate-900">{adDurationSec} Seconds ({campaignWeeks} Week Campaign)</span>
                </div>
                <div className="flex justify-between text-emerald-700 font-bold pt-1 border-t border-slate-200">
                  <span>Estimated Net Offer:</span>
                  <span>₹{Math.round(totalEstimatedCost).toLocaleString('en-IN')} + GST</span>
                </div>
              </div>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  alert('Thank you! Your formal Cinema Advertising Plan has been generated and dispatched to our media team. We will contact you within 15 minutes.');
                  setIsProposalModalOpen(false);
                }}
                className="space-y-3 text-xs"
              >
                <div>
                  <label className="block text-slate-700 font-medium mb-1">Company / Brand Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Acme Corp"
                    className="w-full border border-slate-300 rounded px-3 py-2 text-xs focus:outline-none focus:border-[#E11D48]"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-700 font-medium mb-1">Contact Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="Your name"
                      className="w-full border border-slate-300 rounded px-3 py-2 text-xs focus:outline-none focus:border-[#E11D48]"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-700 font-medium mb-1">Phone Number *</label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 Mobile number"
                      className="w-full border border-slate-300 rounded px-3 py-2 text-xs focus:outline-none focus:border-[#E11D48]"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-slate-700 font-medium mb-1">Email Address *</label>
                  <input
                    type="email"
                    required
                    placeholder="name@company.com"
                    className="w-full border border-slate-300 rounded px-3 py-2 text-xs focus:outline-none focus:border-[#E11D48]"
                  />
                </div>

                <div className="pt-2 flex items-center justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setIsProposalModalOpen(false)}
                    className="px-4 py-2 border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-50 text-xs font-semibold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-[#E11D48] hover:bg-[#BE123C] text-white rounded-lg text-xs font-bold transition-colors shadow"
                  >
                    Send Proposal Request
                  </button>
                </div>
              </form>
            </div>
          </div>,
          document.body
        )}
    </div>
  );
};
