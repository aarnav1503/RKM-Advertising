import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  ChevronDown,
  Newspaper,
  Radio,
  Film,
  Tv,
  MapPin,
  Globe,
  Sparkles,
  Bus,
  Layers,
  MonitorPlay,
  Cpu,
  FileSpreadsheet,
  ArrowRight,
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isDrawerServicesOpen, setIsDrawerServicesOpen] = useState(true);
  const location = useLocation();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menus on location change
  useEffect(() => {
    setIsServicesOpen(false);
    setIsDrawerOpen(false);
  }, [location.pathname]);

  // Click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsServicesOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const coreServices = [
    {
      label: 'Newspaper Advertising',
      path: '/newspaper-ads',
      desc: '150+ Dailies, Classified & Display Ads',
      icon: Newspaper,
      badge: '150+ Dailies',
      iconBg: 'bg-amber-100/80 text-amber-900 group-hover:bg-amber-600 group-hover:text-white',
    },
    {
      label: 'Radio FM Ads',
      path: '/radio-ads',
      desc: 'Top FM spots in 100+ cities & RJ mentions',
      icon: Radio,
      badge: '100+ Cities',
      iconBg: 'bg-rose-100/80 text-rose-900 group-hover:bg-rose-600 group-hover:text-white',
    },
    {
      label: 'Cinema Advertising',
      path: '/cinema-ads',
      desc: 'PVR INOX & Cinepolis 70mm video ads',
      icon: Film,
      badge: '70mm Screens',
      iconBg: 'bg-purple-100/80 text-purple-900 group-hover:bg-purple-600 group-hover:text-white',
    },
    {
      label: 'Television Ads',
      path: '/tv-ads',
      desc: '275+ national news & entertainment channels',
      icon: Tv,
      badge: '275+ Channels',
      iconBg: 'bg-sky-100/80 text-sky-900 group-hover:bg-sky-600 group-hover:text-white',
    },
    {
      label: 'Outdoor & DOOH',
      path: '/outdoor-ads',
      desc: 'Highway unipoles, hoardings & LED screens',
      icon: MapPin,
      badge: 'Prime Spots',
      iconBg: 'bg-emerald-100/80 text-emerald-900 group-hover:bg-emerald-600 group-hover:text-white',
    },
    {
      label: 'Digital PR & News Wire',
      path: '/digital-marketing',
      desc: 'Guaranteed features on 50+ news portals',
      icon: Globe,
      badge: 'Guaranteed PR',
      iconBg: 'bg-teal-100/80 text-teal-900 group-hover:bg-teal-600 group-hover:text-white',
    },
    {
      label: 'Official Rate Cards',
      path: '/rate-cards',
      desc: '2026 INS accredited tariff directory',
      icon: FileSpreadsheet,
      badge: '2026 Tariffs',
      iconBg: 'bg-orange-100/80 text-brand group-hover:bg-brand group-hover:text-white',
    },
  ];

  const specializedServices = [
    {
      label: 'Influencer Marketing',
      path: '/influencer-marketing',
      desc: '10,000+ creators on Reels & YouTube',
      icon: Sparkles,
      badge: '10K Creators',
      iconBg: 'bg-fuchsia-100/80 text-fuchsia-900 group-hover:bg-fuchsia-600 group-hover:text-white',
    },
    {
      label: 'Transit Media',
      path: '/transit-media',
      desc: 'City bus wraps, metro rail & auto hoods',
      icon: Bus,
      badge: 'Metro & Bus',
      iconBg: 'bg-indigo-100/80 text-indigo-900 group-hover:bg-indigo-600 group-hover:text-white',
    },
    {
      label: 'Lift & Elevator Branding',
      path: '/lift-branding',
      desc: 'Captive screens in premium high-rises',
      icon: Layers,
      badge: 'Captive HD',
      iconBg: 'bg-cyan-100/80 text-cyan-900 group-hover:bg-cyan-600 group-hover:text-white',
    },
    {
      label: 'OTT & Connected TV',
      path: '/ott-advertising',
      desc: 'Hotstar, JioCinema & SonyLIV CTV 4K',
      icon: MonitorPlay,
      badge: 'Hotstar & Jio',
      iconBg: 'bg-violet-100/80 text-violet-900 group-hover:bg-violet-600 group-hover:text-white',
    },
    {
      label: 'Programmatic DSP',
      path: '/programmatic-ads',
      desc: 'Google DV360 with GPS polygon geofencing',
      icon: Cpu,
      badge: 'DV360 AI',
      iconBg: 'bg-slate-200/80 text-slate-800 group-hover:bg-slate-800 group-hover:text-white',
    },
  ];

  const isServicesActive = [
    '/newspaper-ads',
    '/radio-ads',
    '/cinema-ads',
    '/tv-ads',
    '/outdoor-ads',
    '/digital-marketing',
    '/rate-cards',
    '/influencer-marketing',
    '/transit-media',
    '/lift-branding',
    '/ott-advertising',
    '/programmatic-ads',
  ].includes(location.pathname);

  return (
    <>
      <header id="hd" className={`sticky top-0 z-50 ${isScrolled ? 's scrolled' : ''}`}>
        <Link className="logo" to="/">
          RKM Ads<span>.</span>
        </Link>

        {/* Clean Desktop Navigation with Services Menu */}
        <nav aria-label="Main" className="relative hidden lg:flex items-center gap-6">
          {/* Services Dropdown */}
          <div
            ref={dropdownRef}
            className="relative"
            onMouseEnter={() => setIsServicesOpen(true)}
            onMouseLeave={() => setIsServicesOpen(false)}
          >
            <button
              type="button"
              onClick={() => setIsServicesOpen(!isServicesOpen)}
              className={`flex items-center gap-1.5 font-head text-[13.5px] font-bold uppercase tracking-wider py-2 transition-colors cursor-pointer ${
                isServicesActive || isServicesOpen ? 'text-brand' : 'text-ink hover:text-brand'
              }`}
              aria-expanded={isServicesOpen}
            >
              <span>Services</span>
              <ChevronDown
                className={`w-3.5 h-3.5 transition-transform duration-200 ${
                  isServicesOpen ? 'rotate-180 text-brand' : ''
                }`}
              />
            </button>

            {/* Mega Dropdown Menu */}
            {isServicesOpen && (
              <div
                className="absolute top-full left-1/2 -translate-x-1/2 pt-3 z-50 animate-in fade-in zoom-in-95 duration-200"
                style={{ width: '710px', maxWidth: 'calc(100vw - 32px)' }}
              >
                <div className="bg-[#FAF8F5]/95 backdrop-blur-2xl backdrop-saturate-[190%] rounded-3xl p-6 border border-[#E6DFD3] shadow-[0_28px_60px_-15px_rgba(40,35,31,0.2),0_10px_25px_-5px_rgba(40,35,31,0.08),inset_0_1px_1px_0_rgba(255,255,255,0.9)] overflow-hidden">
                  {/* Top Bar Header */}
                  <div className="flex items-center justify-between pb-3.5 mb-4 border-b border-paper-line/70">
                    <div className="flex items-center gap-2.5">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-600"></span>
                      </span>
                      <span className="font-head text-[11px] font-bold uppercase tracking-[0.12em] text-ink-muted">
                        360° Omnichannel Media Portfolio
                      </span>
                      <span className="text-[9.5px] font-head font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200/60 hidden sm:inline-block">
                        INS Accredited
                      </span>
                    </div>
                    <Link
                      to="/rate-cards"
                      className="group/rc inline-flex items-center gap-1.5 text-[11px] font-head font-bold uppercase tracking-wider text-brand hover:text-white bg-brand/10 hover:bg-brand px-3 py-1 rounded-full transition-all duration-200 shadow-xs"
                    >
                      <span>2026 Rate Cards</span>
                      <ArrowRight className="w-3 h-3 transition-transform group-hover/rc:translate-x-0.5" />
                    </Link>
                  </div>

                  {/* Two Columns Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-5 gap-y-1.5">
                    {/* Left Column: Core Channels */}
                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-[10px] font-head font-bold uppercase tracking-[0.14em] text-ink-muted/80 px-2.5 py-1">
                        <span>Core Media Channels</span>
                        <span className="text-[9px] font-sans font-semibold text-ink-muted/60 lowercase">7 channels</span>
                      </div>
                      {coreServices.map((item) => {
                        const Icon = item.icon;
                        const isActive = location.pathname === item.path;
                        return (
                          <Link
                            key={item.path}
                            to={item.path}
                            className={`flex items-center gap-3 p-2 rounded-2xl transition-all duration-200 group border ${
                              isActive
                                ? 'bg-white shadow-sm border-brand/40 text-brand'
                                : 'border-transparent hover:border-paper-line/80 hover:bg-white/80 hover:shadow-xs text-ink'
                            }`}
                          >
                            <div
                              className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200 shrink-0 shadow-xs ${item.iconBg}`}
                            >
                              <Icon className="w-4 h-4 transition-transform group-hover:scale-110" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between gap-1">
                                <span className="font-head font-bold text-[12.5px] uppercase tracking-wider group-hover:text-brand transition-colors truncate">
                                  {item.label}
                                </span>
                                {item.badge && (
                                  <span className="text-[9px] font-sans font-medium text-ink-muted/70 px-1.5 py-0.2 rounded bg-paper-tint border border-paper-line/50 shrink-0 hidden sm:inline">
                                    {item.badge}
                                  </span>
                                )}
                              </div>
                              <div className="text-[10.5px] text-ink-muted/90 group-hover:text-ink truncate font-sans">
                                {item.desc}
                              </div>
                            </div>
                            <ArrowRight className="w-3 h-3 text-brand opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 shrink-0" />
                          </Link>
                        );
                      })}
                    </div>

                    {/* Right Column: Specialized Networks */}
                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-[10px] font-head font-bold uppercase tracking-[0.14em] text-ink-muted/80 px-2.5 py-1">
                        <span>Digital &amp; Specialized</span>
                        <span className="text-[9px] font-sans font-semibold text-ink-muted/60 lowercase">5 networks</span>
                      </div>
                      {specializedServices.map((item) => {
                        const Icon = item.icon;
                        const isActive = location.pathname === item.path;
                        return (
                          <Link
                            key={item.path}
                            to={item.path}
                            className={`flex items-center gap-3 p-2 rounded-2xl transition-all duration-200 group border ${
                              isActive
                                ? 'bg-white shadow-sm border-brand/40 text-brand'
                                : 'border-transparent hover:border-paper-line/80 hover:bg-white/80 hover:shadow-xs text-ink'
                            }`}
                          >
                            <div
                              className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200 shrink-0 shadow-xs ${item.iconBg}`}
                            >
                              <Icon className="w-4 h-4 transition-transform group-hover:scale-110" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between gap-1">
                                <span className="font-head font-bold text-[12.5px] uppercase tracking-wider group-hover:text-brand transition-colors truncate">
                                  {item.label}
                                </span>
                                {item.badge && (
                                  <span className="text-[9px] font-sans font-medium text-ink-muted/70 px-1.5 py-0.2 rounded bg-paper-tint border border-paper-line/50 shrink-0 hidden sm:inline">
                                    {item.badge}
                                  </span>
                                )}
                              </div>
                              <div className="text-[10.5px] text-ink-muted/90 group-hover:text-ink truncate font-sans">
                                {item.desc}
                              </div>
                            </div>
                            <ArrowRight className="w-3 h-3 text-brand opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 shrink-0" />
                          </Link>
                        );
                      })}
                    </div>
                  </div>

                  {/* Dropdown Bottom Banner */}
                  <div className="mt-4 pt-3.5 border-t border-paper-line/60 flex items-center justify-between text-xs font-sans text-ink-muted bg-paper-tint/60 -mx-6 -mb-6 p-4">
                    <div className="flex items-center gap-2">
                      <span className="text-amber-600 font-bold">★</span>
                      <span className="text-[11.5px] text-ink-muted">
                        Official Direct Tariffs • Verified Circulation Data
                      </span>
                    </div>
                    <Link
                      to="/book-ad"
                      className="inline-flex items-center gap-1.5 font-head font-bold uppercase text-[11px] text-brand hover:text-white bg-white hover:bg-brand px-3.5 py-1.5 rounded-full border border-brand/20 shadow-xs transition-all duration-200"
                    >
                      <span>Book Online Now</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Standalone Nav Links */}
          <Link
            to="/about"
            className={location.pathname === '/about' ? 'active' : ''}
          >
            About
          </Link>
          <Link
            to="/contact"
            className={location.pathname === '/contact' ? 'active' : ''}
          >
            Contact
          </Link>
        </nav>

        {/* Right Action Buttons */}
        <div className="right">
          <a className="phone-link" href="tel:+919878339302">
            📞 +91-9878339302
          </a>
          <Link className="btn sm outline" to="/track-ad">
            Track Ad
          </Link>
          <Link className="btn sm accent" to="/book-ad">
            Book Now
          </Link>
          <button
            className="mobile-toggle"
            aria-label="Open Navigation Menu"
            onClick={() => setIsDrawerOpen(true)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </header>

      {/* Mobile Drawer */}
      <div
        className={`mobile-drawer ${isDrawerOpen ? 'open' : ''}`}
        onClick={() => setIsDrawerOpen(false)}
      >
        <div className="mobile-drawer-content" onClick={(e) => e.stopPropagation()}>
          <div className="mobile-drawer-header">
            <Link className="logo" to="/" style={{ fontSize: '26px' }}>
              RKM Ads<span>.</span>
            </Link>
            <button
              className="mobile-close"
              aria-label="Close Navigation Menu"
              onClick={() => setIsDrawerOpen(false)}
            >
              ✕
            </button>
          </div>

          <div className="mobile-drawer-links space-y-4">
            {/* Top Root Links */}
            <div className="space-y-1">
              <Link
                to="/"
                onClick={() => setIsDrawerOpen(false)}
                className={`flex items-center justify-between px-3 py-2.5 rounded-xl font-head font-bold text-[14px] uppercase tracking-wider transition-colors ${
                  location.pathname === '/' ? 'bg-white shadow-xs text-brand' : 'text-ink hover:text-brand'
                }`}
              >
                <span>Home</span>
                <span className="text-xs text-ink-muted/50">➔</span>
              </Link>
            </div>

            {/* SERVICES SUBPART: Distinctive Elevated Folder / Card Container */}
            <div className="overflow-hidden rounded-2xl border-2 border-brand/25 bg-white shadow-md">
              {/* Header Banner */}
              <button
                type="button"
                onClick={() => setIsDrawerServicesOpen(!isDrawerServicesOpen)}
                className="w-full flex items-center justify-between font-head text-[13px] font-bold uppercase tracking-wider p-3.5 bg-gradient-to-r from-brand/10 via-amber-500/10 to-brand/5 text-brand text-left transition-colors cursor-pointer border-b border-brand/15"
                aria-expanded={isDrawerServicesOpen}
              >
                <div className="flex items-center gap-2.5">
                  <span className="w-6 h-6 rounded-lg bg-brand text-white flex items-center justify-center font-head text-xs font-bold shadow-xs">
                    ✦
                  </span>
                  <div>
                    <div className="text-[12.5px] font-bold text-ink tracking-wide">
                      Advertising Services
                    </div>
                    <div className="text-[9.5px] font-sans font-medium text-brand lowercase tracking-normal">
                      12 media verticals
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-[9px] font-sans font-bold uppercase px-2 py-0.5 rounded-full bg-brand text-white shadow-2xs">
                    {isDrawerServicesOpen ? 'Collapse ▲' : 'View All ▼'}
                  </span>
                </div>
              </button>

              {isDrawerServicesOpen && (
                <div className="p-3 bg-[#FAF8F5] space-y-3.5 animate-in fade-in duration-200">
                  {/* Category 1: Core Media Channels */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between px-1">
                      <span className="text-[9.5px] font-head font-bold uppercase tracking-[0.14em] text-brand">
                        ● Core Media Outlets
                      </span>
                      <span className="text-[8.5px] font-sans font-semibold text-ink-muted/70 bg-paper-line/50 px-1.5 py-0.5 rounded">
                        7 channels
                      </span>
                    </div>

                    <div className="grid grid-cols-1 gap-1.5">
                      {coreServices.map((item) => {
                        const Icon = item.icon;
                        const isActive = location.pathname === item.path;
                        return (
                          <Link
                            key={item.path}
                            to={item.path}
                            onClick={() => setIsDrawerOpen(false)}
                            className={`flex items-center gap-2.5 p-2 rounded-xl transition-all border ${
                              isActive
                                ? 'bg-white shadow-xs border-brand text-brand'
                                : 'bg-white hover:bg-white/90 border-[#E8E2D8] text-ink'
                            }`}
                          >
                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 shadow-2xs ${item.iconBg}`}>
                              <Icon className="w-3.5 h-3.5" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between gap-1">
                                <span className="font-head font-bold text-[12px] uppercase tracking-wide truncate">
                                  {item.label}
                                </span>
                                {item.badge && (
                                  <span className="text-[8.5px] font-sans font-semibold text-brand px-1.5 py-0.2 rounded bg-brand/10 shrink-0">
                                    {item.badge}
                                  </span>
                                )}
                              </div>
                              <p className="text-[10px] text-ink-muted truncate font-sans m-0">
                                {item.desc}
                              </p>
                            </div>
                            <ArrowRight className="w-3 h-3 text-ink-muted/40 shrink-0" />
                          </Link>
                        );
                      })}
                    </div>
                  </div>

                  {/* Category 2: Specialized & Digital Networks */}
                  <div className="pt-2 border-t border-[#E8E2D8] space-y-1.5">
                    <div className="flex items-center justify-between px-1">
                      <span className="text-[9.5px] font-head font-bold uppercase tracking-[0.14em] text-violet-700">
                        ● Digital &amp; Modern Media
                      </span>
                      <span className="text-[8.5px] font-sans font-semibold text-ink-muted/70 bg-paper-line/50 px-1.5 py-0.5 rounded">
                        5 networks
                      </span>
                    </div>

                    <div className="grid grid-cols-1 gap-1.5">
                      {specializedServices.map((item) => {
                        const Icon = item.icon;
                        const isActive = location.pathname === item.path;
                        return (
                          <Link
                            key={item.path}
                            to={item.path}
                            onClick={() => setIsDrawerOpen(false)}
                            className={`flex items-center gap-2.5 p-2 rounded-xl transition-all border ${
                              isActive
                                ? 'bg-white shadow-xs border-brand text-brand'
                                : 'bg-white hover:bg-white/90 border-[#E8E2D8] text-ink'
                            }`}
                          >
                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 shadow-2xs ${item.iconBg}`}>
                              <Icon className="w-3.5 h-3.5" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between gap-1">
                                <span className="font-head font-bold text-[12px] uppercase tracking-wide truncate">
                                  {item.label}
                                </span>
                                {item.badge && (
                                  <span className="text-[8.5px] font-sans font-semibold text-violet-700 px-1.5 py-0.2 rounded bg-violet-50 shrink-0">
                                    {item.badge}
                                  </span>
                                )}
                              </div>
                              <p className="text-[10px] text-ink-muted truncate font-sans m-0">
                                {item.desc}
                              </p>
                            </div>
                            <ArrowRight className="w-3 h-3 text-ink-muted/40 shrink-0" />
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Root Links */}
            <div className="space-y-0.5 pt-1 border-t border-paper-line-light">
              <div className="text-[9.5px] font-head font-bold uppercase tracking-[0.12em] text-ink-muted/70 px-3 py-1">
                Client Tools &amp; Information
              </div>
              <Link
                to="/rate-cards"
                onClick={() => setIsDrawerOpen(false)}
                className={`flex items-center justify-between px-3 py-2 rounded-xl font-head font-bold text-[13.5px] uppercase tracking-wider transition-colors ${
                  location.pathname === '/rate-cards' ? 'bg-white shadow-xs text-brand' : 'text-ink hover:text-brand'
                }`}
              >
                <span>Tariff Rate Cards</span>
                <span className="text-xs text-ink-muted/50">➔</span>
              </Link>
              <Link
                to="/track-ad"
                onClick={() => setIsDrawerOpen(false)}
                className={`flex items-center justify-between px-3 py-2 rounded-xl font-head font-bold text-[13.5px] uppercase tracking-wider transition-colors ${
                  location.pathname === '/track-ad' ? 'bg-white shadow-xs text-brand' : 'text-ink hover:text-brand'
                }`}
              >
                <span>Track Live Ad</span>
                <span className="text-xs text-ink-muted/50">➔</span>
              </Link>
              <Link
                to="/about"
                onClick={() => setIsDrawerOpen(false)}
                className={`flex items-center justify-between px-3 py-2 rounded-xl font-head font-bold text-[13.5px] uppercase tracking-wider transition-colors ${
                  location.pathname === '/about' ? 'bg-white shadow-xs text-brand' : 'text-ink hover:text-brand'
                }`}
              >
                <span>About RKM Ads</span>
                <span className="text-xs text-ink-muted/50">➔</span>
              </Link>
              <Link
                to="/contact"
                onClick={() => setIsDrawerOpen(false)}
                className={`flex items-center justify-between px-3 py-2 rounded-xl font-head font-bold text-[13.5px] uppercase tracking-wider transition-colors ${
                  location.pathname === '/contact' ? 'bg-white shadow-xs text-brand' : 'text-ink hover:text-brand'
                }`}
              >
                <span>Contact Support</span>
                <span className="text-xs text-ink-muted/50">➔</span>
              </Link>
              <Link
                to="/terms"
                onClick={() => setIsDrawerOpen(false)}
                className={`flex items-center justify-between px-3 py-2 rounded-xl font-head font-bold text-[13.5px] uppercase tracking-wider transition-colors ${
                  location.pathname === '/terms' ? 'bg-white shadow-xs text-brand' : 'text-ink hover:text-brand'
                }`}
              >
                <span>Terms &amp; Policies</span>
                <span className="text-xs text-ink-muted/50">➔</span>
              </Link>
            </div>
          </div>


          <div style={{ marginTop: '24px' }}>
            <Link className="btn accent" to="/book-ad" style={{ width: '100%' }}>
              Book Ad Online
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};
