import React, { useState, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';
import {
  RADIO_STATIONS,
  TIME_BANDS,
  RADIO_AD_OPTIONS,
  POPULAR_RJS,
  RADIO_FAQS,
  RadioStation,
} from '../data/radioData';
import { StationLogoBadge } from '../components/radio/StationLogoBadge';

export const RadioAdsPage: React.FC = () => {
  // Filter States
  const [searchLocation, setSearchLocation] = useState('');
  const [langSearch, setLangSearch] = useState('');
  const [selectedLangs, setSelectedLangs] = useState<string[]>([]);
  const [stationSearch, setStationSearch] = useState('');
  const [selectedNetworks, setSelectedNetworks] = useState<string[]>([]);
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Cart / Campaign Planner State
  const [cart, setCart] = useState<{ [stationId: string]: RadioStation }>({});
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [adDurationSec, setAdDurationSec] = useState<number>(20);
  const [spotsPerDay, setSpotsPerDay] = useState<number>(6);
  const [campaignDays, setCampaignDays] = useState<number>(7);

  // Modal State for Station Details
  const [selectedStation, setSelectedStation] = useState<RadioStation | null>(null);

  // Callback Form State
  const [callbackForm, setCallbackForm] = useState({
    name: '',
    contact: '',
    email: '',
    city: '',
    message: '',
  });
  const [callbackSubmitted, setCallbackSubmitted] = useState(false);

  // Unique Languages and Networks
  const allLanguages = useMemo(() => {
    const set = new Set<string>();
    RADIO_STATIONS.forEach((s) => set.add(s.language));
    return Array.from(set).sort();
  }, []);

  const allNetworks = useMemo(() => {
    const set = new Set<string>();
    RADIO_STATIONS.forEach((s) => set.add(s.network));
    return Array.from(set).sort();
  }, []);

  // Filtered Languages for search input
  const visibleLanguages = useMemo(() => {
    if (!langSearch.trim()) return allLanguages;
    return allLanguages.filter((l) =>
      l.toLowerCase().includes(langSearch.toLowerCase())
    );
  }, [allLanguages, langSearch]);

  // Filtered Networks for search input
  const visibleNetworks = useMemo(() => {
    if (!stationSearch.trim()) return allNetworks;
    return allNetworks.filter((n) =>
      n.toLowerCase().includes(stationSearch.toLowerCase())
    );
  }, [allNetworks, stationSearch]);

  // Filtered Radio Stations
  const filteredStations = useMemo(() => {
    return RADIO_STATIONS.filter((station) => {
      // Geography filter
      if (searchLocation.trim()) {
        const term = searchLocation.toLowerCase();
        const matchCity = station.city.toLowerCase().includes(term);
        const matchState = station.state.toLowerCase().includes(term);
        const matchName = station.name.toLowerCase().includes(term);
        if (!matchCity && !matchState && !matchName) return false;
      }

      // Language filter
      if (selectedLangs.length > 0) {
        if (!selectedLangs.includes(station.language)) return false;
      }

      // Station network filter
      if (selectedNetworks.length > 0) {
        if (!selectedNetworks.includes(station.network)) return false;
      }

      return true;
    });
  }, [searchLocation, selectedLangs, selectedNetworks]);

  // Paginated Stations
  const totalPages = Math.ceil(filteredStations.length / itemsPerPage) || 1;
  const currentStations = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredStations.slice(start, start + itemsPerPage);
  }, [filteredStations, currentPage, itemsPerPage]);

  // Recommended Stations (First 4 marked or default)
  const recommendedStations = useMemo(() => {
    return RADIO_STATIONS.filter((s) => s.isRecommended).slice(0, 4);
  }, []);

  // Handlers for filters
  const toggleLanguage = (lang: string) => {
    setSelectedLangs((prev) =>
      prev.includes(lang) ? prev.filter((l) => l !== lang) : [...prev, lang]
    );
    setCurrentPage(1);
  };

  const toggleNetwork = (network: string) => {
    setSelectedNetworks((prev) =>
      prev.includes(network) ? prev.filter((n) => n !== network) : [...prev, network]
    );
    setCurrentPage(1);
  };

  const toggleCart = (station: RadioStation) => {
    setCart((prev) => {
      const next = { ...prev };
      if (next[station.id]) {
        delete next[station.id];
      } else {
        next[station.id] = station;
      }
      return next;
    });
  };

  // Cart Calculations
  const cartStationsList = Object.values(cart);
  const totalOfferRatePerSec = cartStationsList.reduce((acc, s) => acc + s.offerRate, 0);
  const totalEstimatedCost = totalOfferRatePerSec * adDurationSec * spotsPerDay * campaignDays;
  const totalCardCost = cartStationsList.reduce((acc, s) => acc + s.cardRate, 0) * adDurationSec * spotsPerDay * campaignDays;
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
      {/* Top Banner / Hero */}
      <div className="border-b border-slate-200/80 bg-white py-8 sm:py-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-news-serif font-bold text-slate-900 tracking-tight leading-snug">
            Reach your audience anywhere with your radio advertising partner.
          </h1>
          <p className="mt-2.5 text-xs sm:text-sm md:text-base text-slate-600 max-w-3xl mx-auto">
            <strong className="text-slate-800">RKM Advertising</strong> is one of the top radio advertising agencies in India and offers the best FM advertising (radio ad) services.
          </p>
        </div>
      </div>

      {/* Main App Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* ====================================================================
              LEFT SIDEBAR FILTERS & CALLBACK FORM (lg:col-span-4 or 3)
              ==================================================================== */}
          <aside className="lg:col-span-4 xl:col-span-3 space-y-6">
            {/* Mobile Filter Toggle Button */}
            <div className="lg:hidden">
              <button
                type="button"
                onClick={() => setIsMobileFiltersOpen(!isMobileFiltersOpen)}
                className="w-full bg-white border border-slate-300 rounded-xl px-4 py-3 text-xs font-bold text-slate-800 shadow-sm flex items-center justify-between"
              >
                <span className="flex items-center gap-2">
                  <span>⚙️ Search &amp; Filters</span>
                  {(selectedLangs.length > 0 || selectedNetworks.length > 0 || searchLocation) && (
                    <span className="bg-[#E11D48] text-white text-[10px] px-2 py-0.5 rounded-full font-bold">
                      Active ({Number(Boolean(searchLocation)) + selectedLangs.length + selectedNetworks.length})
                    </span>
                  )}
                </span>
                <span className="text-slate-500 font-semibold text-xs">
                  {isMobileFiltersOpen ? 'Hide Filters ▲' : 'Show Filters ▼'}
                </span>
              </button>
            </div>

            <div className={`${isMobileFiltersOpen ? 'block' : 'hidden lg:block'} space-y-6`}>
              {/* Filter 1: Geography */}
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
                    className="w-full text-xs sm:text-sm border border-slate-300 rounded-lg px-3 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#EA580C]/40 focus:border-[#EA580C] transition-all bg-white"
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

            {/* Filter 2: Languages */}
            <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
              <div className="flex items-center justify-between mb-2.5">
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
                  Languages
                </h3>
                {selectedLangs.length > 0 && (
                  <button
                    onClick={() => {
                      setSelectedLangs([]);
                      setCurrentPage(1);
                    }}
                    className="text-[11px] font-bold text-red-600 hover:underline"
                  >
                    Clear ({selectedLangs.length})
                  </button>
                )}
              </div>
              <div className="relative mb-2.5">
                <input
                  type="text"
                  placeholder="Search Languages"
                  value={langSearch}
                  onChange={(e) => setLangSearch(e.target.value)}
                  className="w-full text-xs border border-slate-300 rounded-md pl-7 pr-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-[#EA580C]"
                />
                <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs">
                  🔍
                </span>
              </div>
              <div className="max-h-48 overflow-y-auto space-y-1.5 pr-1 border-t border-slate-100 pt-2 text-xs sm:text-[13px]">
                {visibleLanguages.map((lang) => {
                  const isChecked = selectedLangs.includes(lang);
                  return (
                    <label
                      key={lang}
                      className="flex items-center gap-2 text-slate-700 hover:text-slate-900 cursor-pointer select-none py-0.5"
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => toggleLanguage(lang)}
                        className="rounded border-slate-300 text-red-600 focus:ring-red-500 w-3.5 h-3.5"
                      />
                      <span>{lang}</span>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Filter 3: Station Networks */}
            <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
              <div className="flex items-center justify-between mb-2.5">
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
                  Station
                </h3>
                {selectedNetworks.length > 0 && (
                  <button
                    onClick={() => {
                      setSelectedNetworks([]);
                      setCurrentPage(1);
                    }}
                    className="text-[11px] font-bold text-red-600 hover:underline"
                  >
                    Clear ({selectedNetworks.length})
                  </button>
                )}
              </div>
              <div className="relative mb-2.5">
                <input
                  type="text"
                  placeholder="Search Station"
                  value={stationSearch}
                  onChange={(e) => setStationSearch(e.target.value)}
                  className="w-full text-xs border border-slate-300 rounded-md pl-7 pr-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-[#EA580C]"
                />
                <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs">
                  🔍
                </span>
              </div>
              <div className="max-h-48 overflow-y-auto space-y-1.5 pr-1 border-t border-slate-100 pt-2 text-xs sm:text-[13px]">
                {visibleNetworks.map((net) => {
                  const isChecked = selectedNetworks.includes(net);
                  return (
                    <label
                      key={net}
                      className="flex items-center gap-2 text-slate-700 hover:text-slate-900 cursor-pointer select-none py-0.5"
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => toggleNetwork(net)}
                        className="rounded border-slate-300 text-red-600 focus:ring-red-500 w-3.5 h-3.5"
                      />
                      <span>{net}</span>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Request Callback Form */}
            <div className="bg-white border border-slate-200 rounded-xl p-4.5 shadow-sm sticky top-24">
              <h3 className="text-sm font-bold text-slate-900 mb-3 uppercase tracking-wide">
                Request Callback
              </h3>
              {callbackSubmitted ? (
                <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-3 text-emerald-800 text-xs text-center space-y-1">
                  <p className="font-bold">Thank You!</p>
                  <p>Our Radio Planning Director will call you back within 15 minutes.</p>
                </div>
              ) : (
                <form onSubmit={handleCallbackSubmit} className="space-y-2.5">
                  <input
                    type="text"
                    placeholder="Name"
                    required
                    value={callbackForm.name}
                    onChange={(e) => setCallbackForm({ ...callbackForm, name: e.target.value })}
                    className="w-full text-xs border border-slate-300 rounded px-2.5 py-1.5 focus:outline-none focus:border-red-500"
                  />
                  <input
                    type="tel"
                    placeholder="Contact No."
                    required
                    value={callbackForm.contact}
                    onChange={(e) => setCallbackForm({ ...callbackForm, contact: e.target.value })}
                    className="w-full text-xs border border-slate-300 rounded px-2.5 py-1.5 focus:outline-none focus:border-red-500"
                  />
                  <input
                    type="email"
                    placeholder="E-Mail"
                    value={callbackForm.email}
                    onChange={(e) => setCallbackForm({ ...callbackForm, email: e.target.value })}
                    className="w-full text-xs border border-slate-300 rounded px-2.5 py-1.5 focus:outline-none focus:border-red-500"
                  />
                  <input
                    type="text"
                    placeholder="City Name"
                    value={callbackForm.city}
                    onChange={(e) => setCallbackForm({ ...callbackForm, city: e.target.value })}
                    className="w-full text-xs border border-slate-300 rounded px-2.5 py-1.5 focus:outline-none focus:border-red-500"
                  />
                  <textarea
                    placeholder="Message"
                    rows={2}
                    value={callbackForm.message}
                    onChange={(e) => setCallbackForm({ ...callbackForm, message: e.target.value })}
                    className="w-full text-xs border border-slate-300 rounded px-2.5 py-1.5 focus:outline-none focus:border-red-500"
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
            </div>
          </aside>

          {/* ====================================================================
              RIGHT MAIN CONTENT: STATION LIST & RECOMMENDED
              ==================================================================== */}
          <main className="lg:col-span-8 xl:col-span-9 space-y-6">
            {/* Red Bar Header */}
            <div className="bg-[#E11D48] text-white rounded-t-xl px-5 py-3 shadow-sm flex items-center justify-between">
              <h2 className="text-base sm:text-lg font-bold tracking-wide">
                Radio Stations ( {filteredStations.length} )
              </h2>
              {cartStationsList.length > 0 && (
                <button
                  onClick={() => setIsCartOpen(true)}
                  className="bg-white text-red-600 text-xs font-bold px-3 py-1.5 rounded-full shadow hover:bg-red-50 transition-all flex items-center gap-1.5"
                >
                  <span>🛒 Cart:</span>
                  <span className="font-extrabold">{cartStationsList.length}</span>
                  <span className="hidden sm:inline">Stations</span>
                </button>
              )}
            </div>

            {/* Radio Stations List */}
            {currentStations.length === 0 ? (
              <div className="bg-white border border-slate-200 rounded-b-xl p-10 text-center space-y-3">
                <p className="text-base text-slate-500">
                  No radio stations match your selected filters.
                </p>
                <button
                  onClick={() => {
                    setSearchLocation('');
                    setSelectedLangs([]);
                    setSelectedNetworks([]);
                  }}
                  className="inline-block bg-[#E11D48] text-white text-xs font-bold px-4 py-2 rounded-lg"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                {currentStations.map((station) => {
                  const inCart = Boolean(cart[station.id]);

                  return (
                    <div
                      key={station.id}
                      className="bg-white border border-slate-200 rounded-xl p-3.5 sm:p-4 shadow-sm hover:shadow-md transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
                    >
                      {/* Left: Station Logo + Basic Info */}
                      <div className="flex items-center gap-3.5 sm:gap-4 flex-1">
                        <div className="flex-shrink-0">
                          <StationLogoBadge
                            network={station.network}
                            frequency={station.frequency}
                          />
                        </div>

                        <div className="space-y-1">
                          <h3 className="font-bold text-sm sm:text-base text-slate-900 leading-tight">
                            {station.name}
                          </h3>
                          <div className="text-xs text-slate-600 space-y-0.5">
                            <div className="flex items-center gap-2">
                              <span className="text-slate-400 w-16">Language</span>
                              <span className="text-slate-400">:</span>
                              <span className="font-medium text-slate-800">{station.language}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-slate-400 w-16">Frequency</span>
                              <span className="text-slate-400">:</span>
                              <span className="font-medium text-slate-800">{station.frequency} FM</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Right: Card Rate, Offer Rate & Actions */}
                      <div className="flex flex-wrap sm:flex-nowrap items-center justify-between md:justify-end gap-3 sm:gap-5 border-t md:border-t-0 pt-2.5 md:pt-0 border-slate-100">
                        {/* Pricing */}
                        <div className="flex items-center gap-4 text-left md:text-right">
                          <div>
                            <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                              CARD RATE
                            </span>
                            <span className="text-xs sm:text-sm text-red-500 line-through font-semibold">
                              ₹{station.cardRate.toFixed(2)}
                            </span>
                          </div>

                          <div>
                            <span className="block text-[10px] font-bold text-red-600 uppercase tracking-wider">
                              OFFER RATE <span className="text-[9px] font-normal text-slate-400">(Per Sec)</span>
                            </span>
                            <span className="text-sm sm:text-base font-extrabold text-[#E11D48]">
                              ₹{station.offerRate.toFixed(2)}
                            </span>
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => setSelectedStation(station)}
                            className="bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold px-3 py-1.5 sm:px-3.5 sm:py-2 rounded shadow-sm transition-colors whitespace-nowrap"
                          >
                            View Details
                          </button>
                          <button
                            type="button"
                            onClick={() => toggleCart(station)}
                            className={`${
                              inCart
                                ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                                : 'bg-[#E11D48] hover:bg-[#BE123C] text-white'
                            } text-xs font-semibold px-3 py-1.5 sm:px-3.5 sm:py-2 rounded shadow-sm transition-colors whitespace-nowrap`}
                          >
                            {inCart ? '✓ Added' : 'Add To Cart'}
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex items-center justify-end gap-2 pt-2">
                <span className="bg-slate-600 text-white text-xs px-3 py-1.5 rounded">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  disabled={currentPage <= 1}
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  className="bg-slate-400 hover:bg-slate-500 disabled:opacity-40 text-white text-xs font-bold px-2.5 py-1.5 rounded"
                >
                  &lt;
                </button>
                <button
                  disabled={currentPage >= totalPages}
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  className="bg-slate-400 hover:bg-slate-500 disabled:opacity-40 text-white text-xs font-bold px-2.5 py-1.5 rounded"
                >
                  &gt;
                </button>
              </div>
            )}

            {/* Recommended Stations Section */}
            <div className="pt-6">
              <div className="bg-[#E11D48] text-white rounded-t-xl px-5 py-2.5 shadow-sm">
                <h3 className="text-sm sm:text-base font-bold tracking-wide">
                  Recommended Stations
                </h3>
              </div>

              <div className="bg-white border border-slate-200 rounded-b-xl p-4 shadow-sm">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {recommendedStations.map((station) => (
                    <div
                      key={station.id}
                      onClick={() => setSelectedStation(station)}
                      className="cursor-pointer group flex flex-col items-center text-center p-2 rounded-lg hover:bg-slate-50 transition-colors"
                    >
                      <StationLogoBadge
                        network={station.network}
                        frequency={station.frequency}
                        className="group-hover:scale-105 transition-transform duration-300"
                      />
                      <span className="mt-2 text-xs font-semibold text-blue-600 group-hover:underline">
                        {station.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </main>
        </div>

        {/* ======================================================================
            SEO ARTICLES, SPECIFICATIONS & DETAILS SECTION (Images 2, 3, 4)
            ====================================================================== */}
        <section className="mt-16 pt-12 border-t border-slate-200">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Col (Desktop Sticky form / Info Card) */}
            <aside className="lg:col-span-4 xl:col-span-3 hidden lg:block space-y-6">
              <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm sticky top-6">
                <h3 className="text-sm font-bold text-slate-900 mb-2 uppercase tracking-wide">
                  Request Callback
                </h3>
                <p className="text-xs text-slate-500 mb-3">
                  Get a free media plan and custom discount matrix for top FM stations.
                </p>
                <form onSubmit={handleCallbackSubmit} className="space-y-2.5">
                  <input
                    type="text"
                    placeholder="Name"
                    required
                    value={callbackForm.name}
                    onChange={(e) => setCallbackForm({ ...callbackForm, name: e.target.value })}
                    className="w-full text-xs border border-slate-300 rounded px-2.5 py-1.5"
                  />
                  <input
                    type="tel"
                    placeholder="Contact No."
                    required
                    value={callbackForm.contact}
                    onChange={(e) => setCallbackForm({ ...callbackForm, contact: e.target.value })}
                    className="w-full text-xs border border-slate-300 rounded px-2.5 py-1.5"
                  />
                  <input
                    type="email"
                    placeholder="E-Mail"
                    value={callbackForm.email}
                    onChange={(e) => setCallbackForm({ ...callbackForm, email: e.target.value })}
                    className="w-full text-xs border border-slate-300 rounded px-2.5 py-1.5"
                  />
                  <input
                    type="text"
                    placeholder="City Name"
                    value={callbackForm.city}
                    onChange={(e) => setCallbackForm({ ...callbackForm, city: e.target.value })}
                    className="w-full text-xs border border-slate-300 rounded px-2.5 py-1.5"
                  />
                  <textarea
                    placeholder="Message"
                    rows={2}
                    value={callbackForm.message}
                    onChange={(e) => setCallbackForm({ ...callbackForm, message: e.target.value })}
                    className="w-full text-xs border border-slate-300 rounded px-2.5 py-1.5"
                  />
                  <button
                    type="submit"
                    className="w-full bg-[#E11D48] hover:bg-[#BE123C] text-white text-xs font-bold py-2 rounded shadow transition-colors uppercase tracking-wider"
                  >
                    Submit
                  </button>
                </form>
              </div>
            </aside>

            {/* Right Articles & Tables */}
            <div className="lg:col-span-8 xl:col-span-9 space-y-10 text-slate-700 text-sm leading-relaxed">
              {/* Article 1: FM Radio Advertising Agency in India */}
              <article className="space-y-3">
                <h2 className="text-xl sm:text-2xl font-news-serif font-bold text-slate-900 tracking-tight">
                  FM Radio Advertising Agency in India
                </h2>
                <p>
                  With the launch of Radio City Bangalore as India’s first private FM radio station, FM Radio Advertising in India started on July 3, 2001. All India Radio popularly known as AIR was the government Radio agency that used to broadcast Radio content and Radio ads in India. All over the world FM Radio advertising present almost 10% of the total marketing spends but in India Radio Advertising this account is less than 5% of the total marketing spend. Popular FM stations in India are Radio Mirchi, Radio One, Red FM, Radio Fever, Hello FM, Big FM, Radio City, Radio Mango, Surya FM, Rangila FM, Radio Nasha, AIR FM Gold, Vividh Bharti, AIR FM Rainbow, Magic FM, Best FM, Sarthak FM, and Magic 106.4 FM. There are approximately more than 80 FM stations across cities in India. Large FM Radio markets are Bangalore, Delhi, Chennai, Kolkata, and Mumbai.
                </p>
              </article>

              {/* Article 2: FM Radio Advertising Cost & Table */}
              <article className="space-y-4">
                <h2 className="text-xl sm:text-2xl font-news-serif font-bold text-slate-900 tracking-tight">
                  FM Radio Advertising Cost
                </h2>
                <p>
                  The Cost on the FM Radio is quoted by its rate in terms of how many times a 20 sec ad is played and how much it will cost on that particular radio station. Radio Advertising cost varies from Rs 100 per 20 sec to as high as Rs 2,700 per 20 sec. The resulting cost of the FM advertising generally depends on two factors. Firstly the number of the listeners. Secondly the time band at which the ads are played. FM stations in Metro like Radio Mirchi Delhi, Red FM Mumbai, Radio Fever Mumbai, Radio Indigo Bangalore, Radio City Hyderabad, Radio One Pune, Radio Suryan FM Chennai are few of the most popular FM stations in India both for advertisers and the listeners.
                </p>
                <p>
                  Radio advertising rate cards are shared by the FM Radio stations. The discounted FM Radio advertising rates depends upon the volume of the advertising rates and then the rates are shared. By working with your radio advertising agency help will be provided for getting better discounted rate for FM advertising. RKM Advertising provides Best FM Radio advertising rate on the website as it is the best radio advertising agency. Kindly select the city and station of your choice to see the FM Radio Advertising Card Rate or Radio Advertisement Price and also FM Radio Advertising best discounted rate.
                </p>

                {/* Table: Time Bands */}
                <div className="overflow-x-auto border border-slate-200 rounded-lg shadow-sm">
                  <table className="w-full text-left text-xs sm:text-sm">
                    <thead className="bg-slate-100/90 text-slate-900 font-bold border-b border-slate-200">
                      <tr>
                        <th className="p-3 w-16">Sr No</th>
                        <th className="p-3 w-48">Band Name</th>
                        <th className="p-3">Explanation</th>
                        <th className="p-3 w-48">Advertising Cost</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {TIME_BANDS.map((tb) => (
                        <tr key={tb.srNo} className="hover:bg-slate-50 transition-colors">
                          <td className="p-3 font-semibold text-slate-500">{tb.srNo}</td>
                          <td className="p-3 font-bold text-slate-900">{tb.bandName}</td>
                          <td className="p-3 text-slate-600">{tb.explanation}</td>
                          <td className="p-3 font-semibold text-red-600">{tb.advertisingCost}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </article>

              {/* Article 3: RKM Advertising & Advantages */}
              <article className="space-y-4">
                <h2 className="text-xl sm:text-2xl font-news-serif font-bold text-slate-900 tracking-tight">
                  RKM Advertising - A Radio Advertising Agency in Noida &amp; Nationwide
                </h2>
                <p>
                  RKM Advertising is a full-fledged FM Radio advertising agency in India renowned for our strategic brand services With in-depth consumer research and world-class creative work RKM Advertising becomes the best radio advertising agency. We will help you advertise in FM Radio stations in Delhi, Bangalore, Pune, Chennai, Hyderabad, and Mumbai among other 80 cities where FM Radio advertising is beneficial as they have good listenership. Radio has been with us since ages as we are dedicated towards our work for generating the best possible result to our customers. We are in strong collaboration with the leading FM radio stations in India like Radio Mirchi, Red FM, AIR, Radio Fever, Radio Indigo, Suryan FM, Radio One. With that achievement we promise our customers that booking in RKM Advertising will bring a great move.
                </p>
                <p>
                  You can find the complete detail of the card rate and best advertising offer rate online of FM Stations in India at RKM Advertising. You can contact RKM Advertising, the Radio advertising agency either through email sales@rkmads.com or calling us at +91 9878339302.
                </p>

                <div className="space-y-2 pt-2">
                  <h3 className="font-bold text-slate-900 text-base">Advantages of Radio Advertising</h3>
                  <p>FM Radio advertising has many advantages. The Advertisers switch to Radio Advertising due to the following reasons:</p>
                  <ol className="list-decimal pl-5 space-y-1.5 text-slate-700">
                    <li>
                      <strong>Local Targeting becomes the advantage in FM Radio advertising.</strong> Through playing an ad on FM, one can reach out to a single city. For e.g. a brand wants to target only delhi through radio advertising then they can pick only the specific area Radio Station like Radio Mirchi.
                    </li>
                    <li>
                      <strong>Radio Advertising helps to reach a listener multiple times.</strong> As research suggests, a consumer needs to listen to an ad 4-5 times before he/she takes an action or forms an opinion. FM Radio advertising has a great advantage for marketing campaigns at a high rate.
                    </li>
                    <li>
                      <strong>An FM advertiser can use multiple jingles in a single FM Radio advertising campaign.</strong>
                    </li>
                    <li>
                      <strong>FM Radio Advertising rate provides one of the lowest costs per reach.</strong>
                    </li>
                  </ol>
                </div>
              </article>

              {/* Article 4: List of FM Radio Advertising Options & Table */}
              <article className="space-y-4">
                <h2 className="text-xl sm:text-2xl font-news-serif font-bold text-slate-900 tracking-tight">
                  List of FM Radio Advertising options
                </h2>
                <div className="overflow-x-auto border border-slate-200 rounded-lg shadow-sm">
                  <table className="w-full text-left text-xs sm:text-sm">
                    <thead className="bg-slate-100/90 text-slate-900 font-bold border-b border-slate-200">
                      <tr>
                        <th className="p-3 w-16">Sr No</th>
                        <th className="p-3 w-48">Option</th>
                        <th className="p-3">Explanation</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {RADIO_AD_OPTIONS.map((opt) => (
                        <tr key={opt.srNo} className="hover:bg-slate-50 transition-colors">
                          <td className="p-3 font-semibold text-slate-500">{opt.srNo}</td>
                          <td className="p-3 font-bold text-slate-900">{opt.option}</td>
                          <td className="p-3 text-slate-600 leading-relaxed">{opt.explanation}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </article>

              {/* Article 5: Schedule & Best Practices */}
              <article className="space-y-4">
                <h2 className="text-xl sm:text-2xl font-news-serif font-bold text-slate-900 tracking-tight">
                  Schedule for Radio Advertising Agency
                </h2>
                <p>
                  For the next day FM Radio advertising timeline is prepared every night. So, if the jingles are provided before 4pm to the expected Radio Channel will start processing it for the next day. FM Stations advertising department does not work on the weekends.
                </p>
                <p>
                  <strong>Proof of Execution in Radio Channels:</strong> A time schedule is provided by the Radio stations to Advertisers and radio advertising agencies. The timings schedule of the ad time has exact time when the ad would be played on the FM, and is made available or is informed to the advertiser in advance. At the successful ending of the ad, Radio ad broadcast certificate is provided by the FM stations which act as a proof of execution. Radio stations provide recording on request for RJ mentions and other FM advertising options.
                </p>

                <div className="space-y-2 pt-2">
                  <h3 className="font-bold text-slate-900 text-base">Best Practices in FM Radio advertising</h3>
                  <ol className="list-decimal pl-5 space-y-1.5 text-slate-700">
                    <li>Get your ad closely placed to the ad breaks in the radio program.</li>
                    <li>With your consumer’s listenership timing get your ad booked and advertised on that time band.</li>
                    <li>At first use a mix of jingle length to create impact and then to maintain continuity in a radio campaign.</li>
                    <li>Ask your agency for discounted rates and do not buy the FM Advertising rate card.</li>
                  </ol>
                </div>
              </article>

              {/* Article 6: Popular RJs in India Table */}
              <article className="space-y-4">
                <h2 className="text-xl sm:text-2xl font-news-serif font-bold text-slate-900 tracking-tight">
                  List of few popular RJs in India FM Radio stations
                </h2>
                <div className="overflow-x-auto border border-slate-200 rounded-lg shadow-sm">
                  <table className="w-full text-left text-xs sm:text-sm">
                    <thead className="bg-slate-100/90 text-slate-900 font-bold border-b border-slate-200">
                      <tr>
                        <th className="p-3 w-16">Sr No</th>
                        <th className="p-3">RJ Name</th>
                        <th className="p-3">Station</th>
                        <th className="p-3">City</th>
                        <th className="p-3">Show / Slot</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {POPULAR_RJS.map((rj) => (
                        <tr key={rj.srNo} className="hover:bg-slate-50 transition-colors">
                          <td className="p-3 font-semibold text-slate-500">{rj.srNo}</td>
                          <td className="p-3 font-bold text-slate-900">{rj.name}</td>
                          <td className="p-3 text-red-700 font-semibold">{rj.station}</td>
                          <td className="p-3 text-slate-700">{rj.city}</td>
                          <td className="p-3 text-slate-500">{rj.slot}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </article>

              {/* Article 7: Frequently Asked Questions (FAQ) */}
              <article className="space-y-4">
                <h2 className="text-xl sm:text-2xl font-news-serif font-bold text-slate-900 tracking-tight">
                  Frequently Asked questions (FAQ) about FM Radio advertising
                </h2>
                <div className="space-y-3">
                  {RADIO_FAQS.map((faq, idx) => (
                    <details
                      key={idx}
                      className="group bg-white border border-slate-200 rounded-lg p-4 transition-all"
                    >
                      <summary className="font-bold text-slate-900 cursor-pointer list-none flex items-center justify-between">
                        <span>{idx + 1}. {faq.q}</span>
                        <span className="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
                      </summary>
                      <p className="mt-2.5 text-slate-600 text-xs sm:text-sm leading-relaxed border-t border-slate-100 pt-2.5">
                        {faq.a}
                      </p>
                    </details>
                  ))}
                </div>
              </article>
            </div>
          </div>
        </section>
      </div>

      {/* ======================================================================
          STATION DETAILS MODAL
          ====================================================================== */}
      {selectedStation && createPortal(
        <div className="fixed inset-0 z-[9999] bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-100 p-6 space-y-6">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <StationLogoBadge
                  network={selectedStation.network}
                  frequency={selectedStation.frequency}
                />
                <div>
                  <h3 className="font-news-serif font-bold text-xl text-slate-900">
                    {selectedStation.name}
                  </h3>
                  <p className="text-xs text-slate-500">
                    {selectedStation.city}, {selectedStation.state} • {selectedStation.language}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setSelectedStation(null)}
                className="text-slate-400 hover:text-slate-600 text-lg p-1"
              >
                ✕
              </button>
            </div>

            {/* Quick Pricing Summary */}
            <div className="grid grid-cols-2 gap-3 bg-red-50/60 border border-red-100 rounded-xl p-3.5 text-center">
              <div>
                <span className="block text-[11px] font-bold text-slate-500 uppercase">Official Card Rate</span>
                <span className="text-sm font-semibold text-red-500 line-through">
                  ₹{selectedStation.cardRate.toFixed(2)} / sec
                </span>
              </div>
              <div>
                <span className="block text-[11px] font-bold text-red-700 uppercase">RKM Offer Rate</span>
                <span className="text-base font-extrabold text-red-600">
                  ₹{selectedStation.offerRate.toFixed(2)} / sec
                </span>
              </div>
            </div>

            {/* Time Band Pricing Table */}
            <div className="space-y-2">
              <h4 className="font-bold text-xs uppercase tracking-wider text-slate-900">
                Time Band Pricing Breakdown
              </h4>
              <div className="border border-slate-200 rounded-lg overflow-hidden text-xs">
                <div className="flex justify-between p-2.5 bg-slate-50 border-b border-slate-100 font-medium">
                  <span>Morning Prime (7:00 AM – 12:00 PM)</span>
                  <span className="font-bold text-slate-900">₹{selectedStation.morningPrimeRate}/sec</span>
                </div>
                <div className="flex justify-between p-2.5 bg-white border-b border-slate-100 font-medium">
                  <span>Afternoon Band (12:00 PM – 5:00 PM)</span>
                  <span className="font-bold text-slate-900">₹{selectedStation.afternoonRate}/sec</span>
                </div>
                <div className="flex justify-between p-2.5 bg-slate-50 border-b border-slate-100 font-medium">
                  <span>Evening Prime (5:00 PM – 9:00 PM)</span>
                  <span className="font-bold text-slate-900">₹{selectedStation.eveningPrimeRate}/sec</span>
                </div>
                <div className="flex justify-between p-2.5 bg-white font-medium">
                  <span>Late Night (9:00 PM – 12:00 AM)</span>
                  <span className="font-bold text-slate-900">₹{selectedStation.nightRate}/sec</span>
                </div>
              </div>
            </div>

            {/* Popular Shows & RJs */}
            {selectedStation.popularShows && (
              <div className="space-y-1.5 text-xs">
                <h4 className="font-bold text-slate-900 uppercase tracking-wider">
                  Flagship Shows &amp; Host RJs
                </h4>
                <ul className="list-disc pl-4 text-slate-600 space-y-1">
                  {selectedStation.popularShows.map((show, idx) => (
                    <li key={idx}>{show}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Modal Actions */}
            <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setSelectedStation(null)}
                className="px-4 py-2 border border-slate-300 rounded-lg text-xs font-semibold text-slate-700 hover:bg-slate-50"
              >
                Close
              </button>
              <button
                type="button"
                onClick={() => {
                  toggleCart(selectedStation);
                  setSelectedStation(null);
                  setIsCartOpen(true);
                }}
                className="px-5 py-2 bg-[#E11D48] hover:bg-[#BE123C] text-white rounded-lg text-xs font-bold shadow"
              >
                {cart[selectedStation.id] ? 'View in Cart ➔' : '+ Add to Campaign Plan'}
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}

      {/* ======================================================================
          CAMPAIGN PLANNER / CART DRAWER (Floating CTA)
          ====================================================================== */}
      {cartStationsList.length > 0 && !isCartOpen && createPortal(
        <div className="fixed bottom-6 right-6 z-[999] animate-bounce">
          <button
            onClick={() => setIsCartOpen(true)}
            className="bg-[#E11D48] hover:bg-[#BE123C] text-white font-bold text-sm px-5 py-3 rounded-full shadow-2xl flex items-center gap-2.5 border-2 border-white"
          >
            <span>📻 Campaign Plan ({cartStationsList.length})</span>
            <span className="bg-white text-red-600 text-xs font-black px-2 py-0.5 rounded-full">
              ₹{totalEstimatedCost.toLocaleString('en-IN')}
            </span>
          </button>
        </div>,
        document.body
      )}

      {/* Cart Modal / Drawer */}
      {isCartOpen && createPortal(
        <div className="fixed inset-0 z-[9999] bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-100 p-6 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="font-news-serif font-bold text-xl text-slate-900">
                  Your Radio Campaign Plan ({cartStationsList.length} Stations)
                </h3>
                <p className="text-xs text-slate-500">
                  Custom broadcast package with multi-station frequency discounts.
                </p>
              </div>
              <button
                onClick={() => setIsCartOpen(false)}
                className="text-slate-400 hover:text-slate-600 text-lg p-1"
              >
                ✕
              </button>
            </div>

            {/* Campaign Config Sliders */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-slate-50 p-4 rounded-xl border border-slate-200">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Ad Duration (Seconds)
                </label>
                <select
                  value={adDurationSec}
                  onChange={(e) => setAdDurationSec(Number(e.target.value))}
                  className="w-full text-xs border border-slate-300 rounded p-1.5 bg-white font-semibold"
                >
                  <option value={10}>10 Seconds Jingle</option>
                  <option value={15}>15 Seconds Jingle</option>
                  <option value={20}>20 Seconds Jingle (Standard)</option>
                  <option value={30}>30 Seconds Jingle</option>
                  <option value={45}>45 Seconds RJ Mention</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Spots Per Day
                </label>
                <select
                  value={spotsPerDay}
                  onChange={(e) => setSpotsPerDay(Number(e.target.value))}
                  className="w-full text-xs border border-slate-300 rounded p-1.5 bg-white font-semibold"
                >
                  <option value={4}>4 Spots / day</option>
                  <option value={6}>6 Spots / day (Recommended)</option>
                  <option value={8}>8 Spots / day</option>
                  <option value={10}>10 Spots / day</option>
                  <option value={12}>12 Spots / day (Heavy Blitz)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Campaign Days
                </label>
                <select
                  value={campaignDays}
                  onChange={(e) => setCampaignDays(Number(e.target.value))}
                  className="w-full text-xs border border-slate-300 rounded p-1.5 bg-white font-semibold"
                >
                  <option value={3}>3 Days (Weekend Launch)</option>
                  <option value={5}>5 Days</option>
                  <option value={7}>7 Days (1 Week Standard)</option>
                  <option value={10}>10 Days</option>
                  <option value={15}>15 Days</option>
                  <option value={30}>30 Days (Full Month)</option>
                </select>
              </div>
            </div>

            {/* Selected Stations List */}
            <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
              {cartStationsList.map((station) => (
                <div
                  key={station.id}
                  className="flex items-center justify-between bg-white border border-slate-200 rounded-lg p-2.5 text-xs"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="font-bold text-slate-900">{station.name}</span>
                    <span className="text-[11px] text-slate-500">({station.language})</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-bold text-red-600">₹{station.offerRate}/sec</span>
                    <button
                      onClick={() => toggleCart(station)}
                      className="text-red-500 hover:text-red-700 font-bold px-1"
                    >
                      ✕
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Pricing Total Box */}
            <div className="bg-red-50 border border-red-200 rounded-xl p-4 space-y-2">
              <div className="flex justify-between text-xs text-slate-600">
                <span>Standard Card Rate Total:</span>
                <span className="line-through">₹{totalCardCost.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-xs text-emerald-700 font-bold">
                <span>Direct Broadcaster Savings:</span>
                <span>- ₹{totalSavings.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-base sm:text-lg font-black text-slate-900 border-t border-red-200 pt-2">
                <span>Estimated Campaign Budget:</span>
                <span className="text-red-600">₹{totalEstimatedCost.toLocaleString('en-IN')}*</span>
              </div>
              <p className="text-[10px] text-slate-500 italic">
                *GST (18%) applicable as per government mandate. Includes complimentary creative scriptwriting and broadcast certification.
              </p>
            </div>

            {/* Cart Modal Footer */}
            <div className="flex items-center justify-between pt-2">
              <button
                onClick={() => setCart({})}
                className="text-xs text-red-600 font-semibold hover:underline"
              >
                Clear Cart
              </button>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="px-4 py-2 border border-slate-300 rounded-lg text-xs font-semibold text-slate-700"
                >
                  Continue Browsing
                </button>
                <Link
                  to="/contact"
                  className="px-5 py-2.5 bg-[#E11D48] hover:bg-[#BE123C] text-white rounded-lg text-xs font-bold shadow-md uppercase tracking-wider"
                >
                  Lock Rates &amp; Book Plan ➔
                </Link>
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
};
