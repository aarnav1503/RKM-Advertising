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
  Phone,
  MessageCircle,
  TrendingUp,
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedDrawerCategory, setSelectedDrawerCategory] = useState<'all' | 'print' | 'broadcast' | 'ooh' | 'digital'>('all');
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

  const allServices = [
    {
      label: 'Newspaper Advertising',
      category: 'print' as const,
      categoryName: 'Print & Tariffs',
      path: '/newspaper-ads',
      desc: '150+ Dailies, Classified & Display Ads',
      icon: Newspaper,
      badge: '150+ Dailies',
    },
    {
      label: 'Digital Marketing',
      category: 'digital' as const,
      categoryName: 'Digital & Performance',
      path: '/digital-marketing',
      desc: 'Performance Ads, SEO, Social Media & ROI Campaigns',
      icon: TrendingUp,
      badge: 'Google & Meta',
    },
    {
      label: 'Radio FM Ads',
      category: 'broadcast' as const,
      categoryName: 'Broadcast & Cinema',
      path: '/radio-ads',
      desc: 'Top FM spots in 100+ cities & RJ mentions',
      icon: Radio,
      badge: '100+ Cities',
    },
    {
      label: 'Cinema Advertising',
      category: 'broadcast' as const,
      categoryName: 'Broadcast & Cinema',
      path: '/cinema-ads',
      desc: 'PVR INOX & Cinepolis 70mm video ads',
      icon: Film,
      badge: '70mm Screens',
    },
    {
      label: 'Television Ads',
      category: 'broadcast' as const,
      categoryName: 'Broadcast & Cinema',
      path: '/tv-ads',
      desc: '275+ national news & entertainment channels',
      icon: Tv,
      badge: '275+ Channels',
    },
    {
      label: 'Outdoor & DOOH',
      category: 'ooh' as const,
      categoryName: 'Outdoor & Transit',
      path: '/outdoor-ads',
      desc: 'Highway unipoles, hoardings & LED screens',
      icon: MapPin,
      badge: 'Prime Spots',
    },
    {
      label: 'Digital PR & News Wire',
      category: 'digital' as const,
      categoryName: 'Digital & PR',
      path: '/digital-pr',
      desc: 'Guaranteed features on 50+ news portals',
      icon: Globe,
      badge: 'Guaranteed PR',
    },
    {
      label: 'Influencer Marketing',
      category: 'digital' as const,
      categoryName: 'Digital & PR',
      path: '/influencer-marketing',
      desc: '10,000+ creators on Reels & YouTube',
      icon: Sparkles,
      badge: '10K Creators',
    },
    {
      label: 'Transit Media',
      category: 'ooh' as const,
      categoryName: 'Outdoor & Transit',
      path: '/transit-media',
      desc: 'City bus wraps, metro rail & auto hoods',
      icon: Bus,
      badge: 'Metro & Bus',
    },
    {
      label: 'Lift & Elevator Branding',
      category: 'ooh' as const,
      categoryName: 'Outdoor & Transit',
      path: '/lift-branding',
      desc: 'Captive screens in premium high-rises',
      icon: Layers,
      badge: 'Captive HD',
    },
    {
      label: 'OTT & Connected TV',
      category: 'digital' as const,
      categoryName: 'Digital & PR',
      path: '/ott-advertising',
      desc: 'Hotstar, JioCinema & SonyLIV CTV 4K',
      icon: MonitorPlay,
      badge: 'Hotstar & Jio',
    },
    {
      label: 'Programmatic DSP',
      category: 'digital' as const,
      categoryName: 'Digital & PR',
      path: '/programmatic-ads',
      desc: 'Google DV360 with GPS polygon geofencing',
      icon: Cpu,
      badge: 'DV360 AI',
    },
  ];

  const coreServices = allServices.slice(0, 7);
  const specializedServices = allServices.slice(7);

  const drawerCategories = [
    { id: 'all' as const, label: 'All Channels', count: allServices.length },
    { id: 'print' as const, label: 'Print Media', count: allServices.filter((s) => s.category === 'print').length },
    { id: 'broadcast' as const, label: 'Broadcast', count: allServices.filter((s) => s.category === 'broadcast').length },
    { id: 'ooh' as const, label: 'OOH & Transit', count: allServices.filter((s) => s.category === 'ooh').length },
    { id: 'digital' as const, label: 'Digital & PR', count: allServices.filter((s) => s.category === 'digital').length },
  ];

  const domainGroups = [
    {
      id: 'print' as const,
      title: 'Print Media',
      items: allServices.filter((s) => s.category === 'print'),
    },
    {
      id: 'broadcast' as const,
      title: 'Broadcast & Cinema',
      items: allServices.filter((s) => s.category === 'broadcast'),
    },
    {
      id: 'ooh' as const,
      title: 'Outdoor & Transit Media',
      items: allServices.filter((s) => s.category === 'ooh'),
    },
    {
      id: 'digital' as const,
      title: 'Digital & Connected Media',
      items: allServices.filter((s) => s.category === 'digital'),
    },
  ];

  const isServicesActive = allServices.some((s) => s.path === location.pathname);

  return (
    <>
      <header id="hd" className={`sticky top-0 z-50 ${isScrolled ? 's scrolled' : ''}`}>
        <Link className="logo" to="/" aria-label="RKM Advertising">
          <img
            src="/rkm-logo.png"
            alt="RKM Advertising Logo"
            className="logo-img"
          />
          <span className="logo-text">
            RKM Ads<span className="logo-dot">.</span>
          </span>
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
                style={{ width: '880px', maxWidth: 'calc(100vw - 32px)' }}
              >
                <div
                  className="rounded-3xl p-6 border border-[#E4DDD0] shadow-[0_28px_60px_-15px_rgba(40,35,31,0.3),0_10px_25px_-5px_rgba(40,35,31,0.12)] overflow-hidden"
                  style={{ backgroundColor: '#FAF8F5' }}
                >
                  <div className="flex items-center justify-between pb-3.5 mb-4 border-b border-paper-line/70">
                    <div className="flex items-center gap-2.5">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-600"></span>
                      </span>
                      <span className="font-head text-[11px] font-bold uppercase tracking-[0.14em] text-ink-muted">
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
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2">
                    {/* Left Column */}
                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-[10.5px] font-head font-bold uppercase tracking-[0.14em] text-ink-muted/80 px-2.5 py-1">
                        <span>Core Media Channels</span>
                        <span className="text-[9.5px] font-sans font-semibold text-ink-muted/60 lowercase">7 channels</span>
                      </div>
                      {coreServices.map((item) => {
                        const Icon = item.icon;
                        const isActive = location.pathname === item.path;
                        return (
                          <Link
                            key={item.path}
                            to={item.path}
                            className={`flex items-center gap-3 p-2.5 rounded-2xl transition-all duration-200 group border ${
                              isActive
                                ? 'bg-white shadow-sm border-brand/40 text-brand'
                                : 'border-transparent hover:border-paper-line/80 hover:bg-white/80 hover:shadow-xs text-ink'
                            }`}
                          >
                            <div className="w-8 h-8 rounded-xl flex items-center justify-center transition-all duration-200 shrink-0 bg-[#F0EBE1] text-[#28231F] border border-[#E2DBD0] group-hover:bg-brand group-hover:border-brand group-hover:text-white shadow-2xs">
                              <Icon className="w-3.5 h-3.5 transition-transform group-hover:scale-110" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between gap-2">
                                <span className="font-head font-bold text-[13px] text-ink group-hover:text-brand transition-colors whitespace-nowrap">
                                  {item.label}
                                </span>
                                {item.badge && (
                                  <span className="text-[9.5px] font-sans font-medium text-ink-muted/80 px-2 py-0.5 rounded-md bg-paper-tint border border-paper-line/60 shrink-0 hidden sm:inline">
                                    {item.badge}
                                  </span>
                                )}
                              </div>
                              <div className="text-[11px] text-ink-muted/90 group-hover:text-ink font-sans truncate mt-0.5">
                                {item.desc}
                              </div>
                            </div>
                            <ArrowRight className="w-3 h-3 text-brand opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 shrink-0" />
                          </Link>
                        );
                      })}
                    </div>

                    {/* Right Column */}
                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-[10.5px] font-head font-bold uppercase tracking-[0.14em] text-ink-muted/80 px-2.5 py-1">
                        <span>Digital &amp; Specialized</span>
                        <span className="text-[9.5px] font-sans font-semibold text-ink-muted/60 lowercase">5 networks</span>
                      </div>
                      {specializedServices.map((item) => {
                        const Icon = item.icon;
                        const isActive = location.pathname === item.path;
                        return (
                          <Link
                            key={item.path}
                            to={item.path}
                            className={`flex items-center gap-3 p-2.5 rounded-2xl transition-all duration-200 group border ${
                              isActive
                                ? 'bg-white shadow-sm border-brand/40 text-brand'
                                : 'border-transparent hover:border-paper-line/80 hover:bg-white/80 hover:shadow-xs text-ink'
                            }`}
                          >
                            <div className="w-8 h-8 rounded-xl flex items-center justify-center transition-all duration-200 shrink-0 bg-[#F0EBE1] text-[#28231F] border border-[#E2DBD0] group-hover:bg-brand group-hover:border-brand group-hover:text-white shadow-2xs">
                              <Icon className="w-3.5 h-3.5 transition-transform group-hover:scale-110" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between gap-2">
                                <span className="font-head font-bold text-[13px] text-ink group-hover:text-brand transition-colors whitespace-nowrap">
                                  {item.label}
                                </span>
                                {item.badge && (
                                  <span className="text-[9.5px] font-sans font-medium text-ink-muted/80 px-2 py-0.5 rounded-md bg-paper-tint border border-paper-line/60 shrink-0 hidden sm:inline">
                                    {item.badge}
                                  </span>
                                )}
                              </div>
                              <div className="text-[11px] text-ink-muted/90 group-hover:text-ink font-sans truncate mt-0.5">
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
                  <div
                    className="mt-4 pt-3.5 border-t border-[#E4DDD0] flex items-center justify-between text-xs font-sans text-ink-muted -mx-6 -mb-6 p-4"
                    style={{ backgroundColor: '#F3EFE9' }}
                  >
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

      {/* Professional Mobile Sidebar (Drawer) */}
      <div
        className={`mobile-drawer ${isDrawerOpen ? 'open' : ''}`}
        onClick={() => setIsDrawerOpen(false)}
      >
        <div className="mobile-drawer-content" onClick={(e) => e.stopPropagation()}>
          {/* Drawer Header */}
          <div className="mobile-drawer-header">
            <div>
              <Link
                className="logo"
                to="/"
                onClick={() => setIsDrawerOpen(false)}
                style={{ fontSize: '23px', lineHeight: 1 }}
                aria-label="RKM Advertising"
              >
                <img
                  src="/rkm-logo.png"
                  alt="RKM Advertising Logo"
                  className="logo-img"
                  style={{ height: '32px', width: 'auto' }}
                />
                <span className="logo-text">
                  RKM Ads<span className="logo-dot">.</span>
                </span>
              </Link>
              <div className="flex items-center gap-2 mt-1.5">
                <span className="inline-flex items-center gap-1 text-[9px] font-head font-bold uppercase tracking-[0.14em] text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200/70">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
                  INS Accredited Agency
                </span>
                <span className="text-[9.5px] text-ink-muted/70 font-sans">
                  Est. 2004
                </span>
              </div>
            </div>
            <button
              className="mobile-close"
              aria-label="Close Navigation Menu"
              onClick={() => setIsDrawerOpen(false)}
            >
              ✕
            </button>
          </div>

          {/* Quick Action Bar */}
          <div className="grid grid-cols-2 gap-2 mb-4">
            <Link
              to="/book-ad"
              onClick={() => setIsDrawerOpen(false)}
              className="flex items-center justify-between p-2.5 rounded-xl bg-brand text-white shadow-xs font-head font-bold text-[12px] uppercase tracking-wider hover:bg-brand-hover transition-colors"
            >
              <span>Book Ad Online</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <Link
              to="/rate-cards"
              onClick={() => setIsDrawerOpen(false)}
              className="flex items-center justify-between p-2.5 rounded-xl bg-white border border-[#E0D8CB] text-ink shadow-2xs font-head font-bold text-[12px] uppercase tracking-wider hover:border-brand hover:text-brand transition-colors"
            >
              <span>Rate Cards</span>
              <span className="text-[9px] font-sans px-1.5 py-0.5 rounded bg-amber-50 text-amber-800 border border-amber-200/60 font-semibold">2026 Tariffs</span>
            </Link>
          </div>

          {/* Advertising Media Directory Header & Category Filter */}
          <div className="mb-3">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-head font-bold uppercase tracking-[0.15em] text-ink-muted/90 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-brand"></span>
                Media Disciplines
              </span>
              <span className="text-[9px] font-head font-bold uppercase tracking-wider text-brand px-2 py-0.5 rounded-full bg-brand/10 border border-brand/20">
                12 Channels
              </span>
            </div>

            {/* Horizontal Filter Tabs */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1.5 no-scrollbar -mx-1 px-1">
              {drawerCategories.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedDrawerCategory(cat.id)}
                  className={`text-[10.5px] font-head font-bold uppercase tracking-wider px-2.5 py-1 rounded-lg shrink-0 transition-all cursor-pointer ${
                    selectedDrawerCategory === cat.id
                      ? 'bg-ink text-white shadow-2xs'
                      : 'bg-white/80 text-ink-muted hover:text-ink hover:bg-white border border-paper-line/70'
                  }`}
                >
                  <span>{cat.label}</span>
                  <span className={`ml-1 text-[9px] ${selectedDrawerCategory === cat.id ? 'text-white/80' : 'text-ink-muted/70'}`}>
                    ({cat.count})
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Media Directory Cards */}
          <div className="space-y-3.5 mb-5">
            {selectedDrawerCategory === 'all' ? (
              // Grouped Domain Categories
              domainGroups.map((group) => (
                <div key={group.id} className="space-y-1.5">
                  <div className="text-[9.5px] font-head font-bold uppercase tracking-[0.14em] text-ink-muted/70 px-1">
                    {group.title}
                  </div>
                  <div className="space-y-1.5">
                    {group.items.map((item) => {
                      const Icon = item.icon;
                      const isActive = location.pathname === item.path;
                      return (
                        <Link
                          key={item.path}
                          to={item.path}
                          onClick={() => setIsDrawerOpen(false)}
                          className={`group flex items-center gap-3 p-2.5 rounded-xl transition-all duration-200 border ${
                            isActive
                              ? 'bg-white shadow-xs border-brand text-brand'
                              : 'bg-white/70 hover:bg-white border-[#E8E2D8] hover:border-brand/40 text-ink'
                          }`}
                        >
                          <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 bg-[#F0EBE1] text-[#28231F] border border-[#E2DBD0] group-hover:bg-brand group-hover:border-brand group-hover:text-white transition-all shadow-2xs">
                            <Icon className="w-3.5 h-3.5" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between gap-1.5">
                              <span className="font-head font-bold text-[12.5px] group-hover:text-brand transition-colors text-ink">
                                {item.label}
                              </span>
                              {item.badge && (
                                <span className="text-[8.5px] font-sans font-medium text-stone-600 bg-stone-100/90 border border-stone-200/80 px-1.5 py-0.2 rounded shrink-0">
                                  {item.badge}
                                </span>
                              )}
                            </div>
                            <p className="text-[10px] text-ink-muted/85 font-sans mt-0.5 m-0 line-clamp-1">
                              {item.desc}
                            </p>
                          </div>
                          <ArrowRight className="w-3 h-3 text-stone-400 group-hover:text-brand group-hover:translate-x-0.5 transition-all shrink-0" />
                        </Link>
                      );
                    })}
                  </div>
                </div>
              ))
            ) : (
              // Filtered Category View
              <div className="space-y-1.5">
                {allServices
                  .filter((s) => s.category === selectedDrawerCategory)
                  .map((item) => {
                    const Icon = item.icon;
                    const isActive = location.pathname === item.path;
                    return (
                      <Link
                        key={item.path}
                        to={item.path}
                        onClick={() => setIsDrawerOpen(false)}
                        className={`group flex items-center gap-3 p-2.5 rounded-xl transition-all duration-200 border ${
                          isActive
                            ? 'bg-white shadow-xs border-brand text-brand'
                            : 'bg-white/70 hover:bg-white border-[#E8E2D8] hover:border-brand/40 text-ink'
                        }`}
                      >
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 bg-[#F0EBE1] text-[#28231F] border border-[#E2DBD0] group-hover:bg-brand group-hover:border-brand group-hover:text-white transition-all shadow-2xs">
                          <Icon className="w-3.5 h-3.5" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-1.5">
                            <span className="font-head font-bold text-[12.5px] group-hover:text-brand transition-colors text-ink">
                              {item.label}
                            </span>
                            {item.badge && (
                              <span className="text-[8.5px] font-sans font-medium text-stone-600 bg-stone-100/90 border border-stone-200/80 px-1.5 py-0.2 rounded shrink-0">
                                {item.badge}
                              </span>
                            )}
                          </div>
                          <p className="text-[10px] text-ink-muted/85 font-sans mt-0.5 m-0 line-clamp-1">
                            {item.desc}
                          </p>
                        </div>
                        <ArrowRight className="w-3 h-3 text-stone-400 group-hover:text-brand group-hover:translate-x-0.5 transition-all shrink-0" />
                      </Link>
                    );
                  })}
              </div>
            )}
          </div>

          {/* Client Tools & Agency Desk Navigation */}
          <div className="pt-3 border-t border-paper-line/70 space-y-1 mb-4">
            <div className="text-[9.5px] font-head font-bold uppercase tracking-[0.14em] text-ink-muted/70 px-1 mb-1">
              Client Desk &amp; Verification
            </div>
            <Link
              to="/track-ad"
              onClick={() => setIsDrawerOpen(false)}
              className="flex items-center justify-between px-2.5 py-2 rounded-lg text-ink hover:text-brand hover:bg-white/60 transition-colors font-head font-bold text-[12px] uppercase tracking-wider"
            >
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-600"></span>
                </span>
                <span>Track Live Ad Status</span>
              </div>
              <ArrowRight className="w-3 h-3 text-ink-muted/50" />
            </Link>
            <Link
              to="/about"
              onClick={() => setIsDrawerOpen(false)}
              className="flex items-center justify-between px-2.5 py-2 rounded-lg text-ink hover:text-brand hover:bg-white/60 transition-colors font-head font-bold text-[12px] uppercase tracking-wider"
            >
              <span>About RKM Advertising</span>
              <ArrowRight className="w-3 h-3 text-ink-muted/50" />
            </Link>
            <Link
              to="/contact"
              onClick={() => setIsDrawerOpen(false)}
              className="flex items-center justify-between px-2.5 py-2 rounded-lg text-ink hover:text-brand hover:bg-white/60 transition-colors font-head font-bold text-[12px] uppercase tracking-wider"
            >
              <span>Contact Media Desk</span>
              <ArrowRight className="w-3 h-3 text-ink-muted/50" />
            </Link>
            <Link
              to="/terms"
              onClick={() => setIsDrawerOpen(false)}
              className="flex items-center justify-between px-2.5 py-2 rounded-lg text-ink hover:text-brand hover:bg-white/60 transition-colors font-head font-bold text-[12px] uppercase tracking-wider"
            >
              <span>Tariff Policies &amp; Terms</span>
              <ArrowRight className="w-3 h-3 text-ink-muted/50" />
            </Link>
          </div>

          {/* Agency Helpline & Direct Desk */}
          <div className="mt-auto p-3.5 rounded-2xl bg-white border border-[#E4DDCF] shadow-xs mb-8">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[9.5px] font-head font-bold uppercase tracking-[0.14em] text-stone-500">
                Direct Media Helpline
              </span>
              <span className="text-[8.5px] font-sans font-semibold text-emerald-800 bg-emerald-50 px-1.5 py-0.2 rounded border border-emerald-200/60">
                Active 24/7 Desk
              </span>
            </div>
            <div className="flex items-center justify-between gap-2">
              <a
                href="tel:+919878339302"
                className="flex items-center gap-1.5 text-ink font-head font-bold text-[13px] hover:text-brand transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-brand" />
                <span>+91-9878339302</span>
              </a>
              <a
                href="https://wa.me/919878339302?text=Hello%20RKM%20Ads,%20I%20would%20like%20to%20inquire%20about%20advertising%20rates."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-[11px] font-head font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 hover:bg-emerald-100 px-2.5 py-1 rounded-full border border-emerald-200 transition-colors"
              >
                <MessageCircle className="w-3 h-3 text-emerald-600" />
                <span>WhatsApp</span>
              </a>
            </div>
            <div className="mt-2.5 pt-2 border-t border-paper-line/50 text-[9.5px] text-ink-muted flex items-center justify-between">
              <span>Zero Broker Markup</span>
              <span className="font-semibold text-brand">Direct Publisher Rates</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
