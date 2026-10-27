import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useBooking } from '../context/BookingContext';
import { PUBLICATIONS_DATA, CATEGORY_TEMPLATES, formatINR } from '../data/publicationsData';
import { NewspaperCard } from '../components/common/NewspaperCard';

export const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { setCategoryTemplate } = useBooking();

  // Hero Omni State
  const [heroMedia, setHeroMedia] = useState('');
  const [heroCat, setHeroCat] = useState('');
  const [heroPub, setHeroPub] = useState('');

  // Track status section state
  const [trackId, setTrackId] = useState('');
  const [trackStep, setTrackStep] = useState(0);
  const [trackMsg, setTrackMsg] = useState('Enter your booking ID to track publishing milestones.');

  const handleHeroGo = () => {
    if (heroMedia === 'Newspaper' || !heroMedia) {
      if (heroCat) setCategoryTemplate(heroCat);
      navigate(
        `/book-ad?media=newspaper${heroPub ? `&pub=${heroPub}` : ''}${
          heroCat ? `&cat=${encodeURIComponent(heroCat)}` : ''
        }`
      );
    } else {
      const mediaRouteMap: Record<string, string> = {
        Radio: '/radio-ads',
        Cinema: '/cinema-ads',
        TV: '/tv-ads',
        Outdoor: '/outdoor-ads',
        Digital: '/digital-marketing',
      };
      navigate(mediaRouteMap[heroMedia] || '/book-ad');
    }
  };

  const handleTrack = () => {
    const v = trackId.trim();
    if (!v) {
      setTrackMsg('Please enter a valid booking ID (e.g. RKM-2026-9812).');
      return;
    }
    setTrackStep(3);
    setTrackMsg(
      `Order ${v} is verified & scheduled at press. Your scanned e-tearsheet will be available by 8:00 AM on the release date.`
    );
  };

  return (
    <main id="top">
      {/* ==========================================================================
          HERO SECTION WITH RESIZED & REALISTIC NEWSPAPER BROADSHEET
          ========================================================================== */}
      <div className="hero">
        {/* Left Side: Warm Studio Stage with Floating Authentic Newspaper (Visible on desktop & tablet, hidden on mobile) */}
        <div className="photo-stage hidden md:flex" aria-hidden="true">
          <div className="stage-pill">INS Accredited Network</div>

          {/* Realistically Scaled Broadsheet Newspaper */}
          <div className="np-broadsheet">
            <div className="np-top-strip">
              <span>Vol. CXLIX, No. 298</span>
              <span>Monday, 26 October 2026</span>
              <span>Price: ₹ 5.00</span>
            </div>

            <h3 className="np-masthead">The Daily Chronicle</h3>
            <div className="np-tagline">Northern India’s Foremost Morning Broadsheet • Established 1877</div>

            <div className="np-section-strip">
              <span>Nation</span>
              <span>City Pulse</span>
              <span>Commerce</span>
              <span>Sports</span>
              <span>Classifieds</span>
            </div>

            <div className="np-lead">
              <div>
                <h4>Metro Corridor Cleared After Three-Year Review</h4>
                <p className="np-dek">Work on the 14-km suburban line will commence this January, connecting eastern districts to the central airport.</p>
              </div>
              <div className="np-photo-box">
                <img
                  src="https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=500&q=80"
                  alt="Metro Rail Infrastructure"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'grayscale(100%) contrast(125%) brightness(95%)', display: 'block' }}
                />
                <span className="np-photo-caption">City Rail Division • Archive</span>
              </div>
            </div>

            <div className="np-columns">
              <h5>Alignment Backed</h5>
              <p>The urban transport council voted unanimously on Sunday to approve the revised track blueprint.</p>
              <p>Relocation packages have been finalized for all registered shopkeepers along the avenue.</p>
              <h5>Markets High</h5>
              <p>Benchmark indices closed with 240-point gains as heavy industry and power shares led the rally.</p>
              <h5>Early School</h5>
              <p>Winter classroom schedules will take effect from next week across all municipal wards.</p>
            </div>

            {/* Classified Ads Section with Highlighted Ad */}
            <div className="np-classifieds-wrap">
              <div className="np-classifieds-banner">
                <span>PAGE 14 — REGIONAL NOTICES</span>
                <strong>OFFICIAL CLASSIFIEDS</strong>
                <span>DELHI NCR</span>
              </div>
              <div className="np-ads-grid">
                <div className="ad-unit spotlight">
                  <b>CHANGE OF NAME</b>
                  I, Anita Verma, d/o Mohan Verma, r/o Model Town, have changed my name to Anita Sharma.
                </div>
                <div className="ad-unit">
                  <b>TO LET / RENT</b>
                  2 BHK furnished flat, Sector 15. Family only. Call 98XXXXXX01.
                </div>
                <div className="ad-unit">
                  <b>MATRIMONIAL</b>
                  Alliance invited for Khatri boy, 30, Software Engineer in Gurugram.
                </div>
                <div className="ad-unit">
                  <b>RECRUITMENT</b>
                  Clinic receptionist wanted. Fluent English required. Walk-in 10 AM.
                </div>
                <div className="ad-unit">
                  <b>PUBLIC NOTICE</b>
                  Lost share certificates of M/s Example Corp stand cancelled.
                </div>
                <div className="ad-unit">
                  <b>OBITUARY</b>
                  Shri Ramesh Kumar passed away peacefully on 12 Oct. Prayer meet Sunday.
                </div>
              </div>
            </div>
          </div>

          <div className="stage-pill-right">
            <span>Circulation: 1.45M copies daily</span>
          </div>
        </div>

        {/* Right Side: Fast Selection & Hero CTA */}
        <div className="side">
          <div className="h">
            <h1>Say it in print. Reach the entire city.</h1>
            <p className="sub">Book verified classified and display notices in India's leading dailies with live column preview and upfront rates.</p>
          </div>
          <div className="sage-box">
            <form className="omni" onSubmit={(e) => { e.preventDefault(); handleHeroGo(); }}>
              <div className="form-field">
                <label htmlFor="hm">Media Channel</label>
                <select id="hm" value={heroMedia} onChange={(e) => setHeroMedia(e.target.value)}>
                  <option value="">Select Channel</option>
                  <option value="Newspaper">Newspaper</option>
                  <option value="Radio FM">Radio FM</option>
                  <option value="Cinema">Cinema</option>
                  <option value="Outdoor">Outdoor</option>
                </select>
              </div>
              <div className="form-field">
                <label htmlFor="hc">Notice Category</label>
                <select id="hc" value={heroCat} onChange={(e) => setHeroCat(e.target.value)}>
                  <option value="">Select Category</option>
                  {CATEGORY_TEMPLATES.map((c) => (
                    <option key={c.name} value={c.name}>{c.name}</option>
                  ))}
                </select>
              </div>
              <div className="form-field">
                <label htmlFor="hp">Newspaper</label>
                <select id="hp" value={heroPub} onChange={(e) => setHeroPub(e.target.value)}>
                  <option value="">Select Newspaper</option>
                  {Object.values(PUBLICATIONS_DATA).map((pub) => (
                    <option key={pub.id} value={pub.id}>{pub.name}</option>
                  ))}
                </select>
              </div>
            </form>
            <button className="btn accent" type="button" onClick={handleHeroGo}>
              {heroMedia && heroMedia !== 'Newspaper' ? 'Request a Media Plan' : 'Check Rates & Book Now'}
            </button>
          </div>
        </div>
      </div>

      {/* ==========================================================================
          POPULAR CATEGORIES
          ========================================================================== */}
      <section id="categories">
        <div className="wrap">
          <h2>Pick the notice you need to publish</h2>
          <p className="lead">Each category includes ready-to-use legal formats and mandatory document checklists.</p>
          <div className="cats">
            {CATEGORY_TEMPLATES.map((cat, idx) => {
              const imgMap: Record<string, string> = {
                'Matrimonial': '/images/matrimonial.png',
                'Change of name': '/images/change-of-name.png',
                'Property': '/images/property.png',
                'Public notice': '/images/public-notice.png',
                'Recruitment': '/images/recruitment.png',
                'Obituary': '/images/obituary.png',
                'Lost & Found': '/images/lost-and-found.png',
                'Court Notice': '/images/court-notice.png',
              };
              const defaultImgs = [
                '/images/matrimonial.png',
                '/images/change-of-name.png',
                '/images/property.png',
                '/images/public-notice.png',
                '/images/recruitment.png',
                '/images/obituary.png',
                '/images/lost-and-found.png',
                '/images/court-notice.png',
              ];
              const imgSrc = imgMap[cat.name] || defaultImgs[idx % defaultImgs.length];
              return (
                <Link
                  key={cat.name}
                  className="cat"
                  to={`/book-ad?cat=${encodeURIComponent(cat.name)}`}
                  onClick={() => {
                    setCategoryTemplate(cat.name);
                  }}
                >
                  <div className="cat-thumb">
                    <img src={imgSrc} alt={cat.name} loading="lazy" />
                    <span className="cat-tag">{cat.name}</span>
                  </div>
                  <div className="cat-body">
                    <h3>{cat.name}</h3>
                    <p>{cat.description}</p>
                    <span>Starting from {formatINR(cat.baseMinRate)} ➔</span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ==========================================================================
          INTERACTIVE AD BOOKING BUILDER & LIVE PRINT PROOF
          ========================================================================== */}
      

      {/* ==========================================================================
          4-STEP BOOKING FLOW
          ========================================================================== */}
      <section id="how">
        <div className="wrap">
          <h2>From text to press in four steps</h2>
          <p className="lead">One seamless workflow for over 150 newspapers with auto-saved drafts.</p>
          <ol className="steps">
            <li><h3>1. Choose Publication</h3><p>Filter by newspaper, region, language, and category.</p></li>
            <li><h3>2. Select Edition</h3><p>Choose an individual city edition or discounted combo packages.</p></li>
            <li><h3>3. Compose Ad</h3><p>Type text, toggle enhancements, and review in the live column.</p></li>
            <li><h3>4. Schedule &amp; Pay</h3><p>Choose your print date, attach documents, and pay via UPI or card.</p></li>
          </ol>
        </div>
      </section>

      {/* ==========================================================================
          PUBLICATIONS RATE COMPARISON
          ========================================================================== */}
      <section id="rates" className="book-section">
        <div className="wrap">
          <h2>Over 150 accredited newspapers</h2>
          <p className="lead">Direct authorized tariff cards with zero hidden markup.</p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-7">
            {Object.values(PUBLICATIONS_DATA).map((p) => (
              <NewspaperCard
                key={p.id}
                id={p.id}
                name={p.name}
                shortTitle={p.shortTitle}
                language={p.language}
                reach={p.reach}
                copies={p.copies}
                unit={p.unit}
                baseRate={p.baseRate}
                to={`/book-ad?pub=${p.id}`}
              />
            ))}
          </div>

          <Link className="btn" to="/rate-cards">
            Explore All Rate Cards ➔
          </Link>
        </div>
      </section>

      {/* ==========================================================================
          ALL ADVERTISING SERVICES (RKM ADVERTISING 360° PORTFOLIO)
          ========================================================================== */}
      <section id="services" className="services-section">
        <div className="wrap">
          <div className="services-head">
            <div className="kicker">RKM Advertising 360° Portfolio</div>
            <h2>All Advertising Services &amp; Media Solutions</h2>
            <p>From nationwide newspaper front-pages to algorithmic programmatic video and high-dwell lift screens — book any medium with verified INS accreditation and real-time execution.</p>
          </div>

          {/* Top 6 Featured Visual Cards */}
          <div className="featured-services-grid">
            <div className="service-feature-card">
              <div className="service-feature-visual">
                <img src="https://images.unsplash.com/photo-1585829365295-ab7cd400c167?auto=format&fit=crop&w=400&q=80" alt="Newspaper Advertising" />
              </div>
              <div className="service-feature-info">
                <span className="start-tag">Start Your</span>
                <h3>Newspaper Advertising</h3>
                <Link className="book-btn" to="/newspaper-ads">Book Now</Link>
              </div>
            </div>

            <div className="service-feature-card">
              <div className="service-feature-visual">
                <img src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=400&q=80" alt="Digital Marketing" />
              </div>
              <div className="service-feature-info">
                <span className="start-tag">Start Your</span>
                <h3>Digital Marketing</h3>
                <Link className="book-btn" to="/digital-marketing">Book Now</Link>
              </div>
            </div>

            <div className="service-feature-card">
              <div className="service-feature-visual">
                <img
                  src="https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=400&q=80"
                  alt="Radio Advertising"
                  style={{ objectPosition: 'center 65%' }}
                />
              </div>
              <div className="service-feature-info">
                <span className="start-tag">Start Your</span>
                <h3>Radio Advertising</h3>
                <Link className="book-btn" to="/radio-ads">Book Now</Link>
              </div>
            </div>

            <div className="service-feature-card">
              <div className="service-feature-visual">
                <img src="https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=400&q=80" alt="Cinema Advertising" />
              </div>
              <div className="service-feature-info">
                <span className="start-tag">Start Your</span>
                <h3>Cinema Advertising</h3>
                <Link className="book-btn" to="/cinema-ads">Book Now</Link>
              </div>
            </div>

            <div className="service-feature-card">
              <div className="service-feature-visual">
                <img src="https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=400&q=80" alt="Digital PR" />
              </div>
              <div className="service-feature-info">
                <span className="start-tag">Start Your</span>
                <h3>Digital PR</h3>
                <Link className="book-btn" to="/digital-marketing">Book Now</Link>
              </div>
            </div>

            <div className="service-feature-card">
              <div className="service-feature-visual">
                <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80" alt="Influencer Marketing" />
              </div>
              <div className="service-feature-info">
                <span className="start-tag">Start Your</span>
                <h3>Influencer Marketing</h3>
                <Link className="book-btn" to="/influencer-marketing">Book Now</Link>
              </div>
            </div>
          </div>

          {/* Bottom 6 Metric Solution Cards */}
          <div className="metric-services-grid">
            <Link className="service-metric-card" to="/tv-ads">
              <div className="service-metric-icon">
                <svg width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="7" width="20" height="13" rx="2" ry="2"></rect>
                  <path d="M17 2l-5 5-5-5"></path>
                  <text x="12" y="15.5" fontSize="5" fontWeight="bold" fill="currentColor" stroke="none" textAnchor="middle" fontFamily="sans-serif">ADS</text>
                </svg>
              </div>
              <h4>TV Advertising</h4>
              <span className="metric-count">275+</span>
            </Link>

            <Link className="service-metric-card" to="/programmatic-ads">
              <div className="service-metric-icon">
                <svg width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                  <line x1="8" y1="21" x2="16" y2="21"></line>
                  <line x1="12" y1="17" x2="12" y2="21"></line>
                  <path d="M7 10l3-2v4l-3-2z"></path>
                  <path d="M15 8a3 3 0 0 1 0 4"></path>
                </svg>
              </div>
              <h4>Programmatic Ads</h4>
              <span className="metric-count">100+</span>
            </Link>

            <Link className="service-metric-card" to="/ott-advertising">
              <div className="service-metric-icon">
                <svg width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17.5 19H9a5 5 0 0 1-1-9.9 6 6 0 0 1 11.5 2 4 4 0 0 1-2 7.9z"></path>
                  <rect x="4" y="15" width="6" height="5" rx="1"></rect>
                  <rect x="14" y="15" width="6" height="5" rx="1"></rect>
                  <line x1="7" y1="12" x2="7" y2="15"></line>
                  <line x1="17" y1="12" x2="17" y2="15"></line>
                </svg>
              </div>
              <h4>OTT / Media Buying</h4>
              <span className="metric-count">100+</span>
            </Link>

            <Link className="service-metric-card" to="/transit-media">
              <div className="service-metric-icon">
                <svg width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="1" y="5" width="22" height="13" rx="2"></rect>
                  <circle cx="6" cy="18" r="2"></circle>
                  <circle cx="18" cy="18" r="2"></circle>
                  <path d="M1 10h22"></path>
                  <text x="12" y="14.5" fontSize="4.5" fontWeight="bold" fill="currentColor" stroke="none" textAnchor="middle" fontFamily="sans-serif">AD</text>
                </svg>
              </div>
              <h4>Transit Media</h4>
              <span className="metric-count">100+</span>
            </Link>

            <Link className="service-metric-card" to="/lift-branding">
              <div className="service-metric-icon">
                <svg width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="4" y="2" width="16" height="20" rx="2"></rect>
                  <line x1="12" y1="2" x2="12" y2="22"></line>
                  <path d="M8 7l2-2 2 2"></path>
                  <path d="M16 7l-2 2-2-2"></path>
                </svg>
              </div>
              <h4>Lift Branding</h4>
              <span className="metric-count">100+</span>
            </Link>

            <Link className="service-metric-card" to="/outdoor-ads">
              <div className="service-metric-icon">
                <svg width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="18" height="11" rx="2"></rect>
                  <line x1="12" y1="14" x2="12" y2="21"></line>
                  <line x1="8" y1="21" x2="16" y2="21"></line>
                  <text x="12" y="10.5" fontSize="5" fontWeight="bold" fill="currentColor" stroke="none" textAnchor="middle" fontFamily="sans-serif">AD</text>
                </svg>
              </div>
              <h4>Outdoor / DOOH</h4>
              <span className="metric-count">250+</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ==========================================================================
          MULTI-MEDIA PLANNING (RADIO, CINEMA, OUTDOOR)
          ========================================================================== */}
      <section id="media" className="py-8 md:py-16">
        <div className="w-full max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
          <div>
            <div className="text-center max-w-3xl mx-auto mb-8 md:mb-12">
              <h2 className="font-news-serif text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">
                Radio, cinema, television &amp; outdoor media
              </h2>
              <p className="mt-2.5 text-xs sm:text-sm md:text-base text-slate-600">
                Strategic 360° media planning built around your target cities and campaign budget. Click any medium to view rates.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-7">
              {/* Radio FM */}
              <Link
                to="/radio-ads"
                className="bg-white rounded-2xl md:rounded-3xl border border-slate-200/90 shadow-sm hover:shadow-2xl hover:border-[#EA580C] hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between overflow-hidden group"
              >
                <div>
                  <div className="relative h-28 sm:h-36 md:h-48 lg:h-60 w-full overflow-hidden bg-slate-100">
                    <img
                      src="https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=700&q=80"
                      alt="Radio FM Studio"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      style={{ objectPosition: 'center 65%' }}
                    />
                    <span className="absolute bottom-3 left-3 bg-slate-900/85 backdrop-blur-md text-white font-sans font-bold text-[10px] md:text-xs uppercase tracking-wider px-2.5 py-1 md:px-3 md:py-1.5 rounded-lg shadow-sm">
                      Radio FM
                    </span>
                  </div>

                  <div className="p-3.5 md:p-5 lg:p-6 space-y-1.5 md:space-y-2">
                    <h3 className="font-news-serif font-bold text-base md:text-lg lg:text-xl text-slate-900 group-hover:text-[#EA580C] transition-colors leading-snug">
                      Radio Advertising
                    </h3>
                    <p className="text-xs md:text-sm text-slate-500 leading-relaxed">
                      Top FM jingles &amp; RJ mentions in 100+ cities across Radio Mirchi, Red FM &amp; Big FM.
                    </p>
                  </div>
                </div>

                <div className="p-3.5 md:p-5 lg:p-6 pt-0 md:pt-0">
                  <div className="pt-3.5 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-[11px] md:text-xs font-semibold text-slate-400">
                      100+ Cities
                    </span>
                    <span className="text-[11px] md:text-xs font-bold text-[#EA580C] uppercase tracking-wider group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                      View Rates ➔
                    </span>
                  </div>
                </div>
              </Link>

              {/* Cinema Multiplex */}
              <Link
                to="/cinema-ads"
                className="bg-white rounded-2xl md:rounded-3xl border border-slate-200/90 shadow-sm hover:shadow-2xl hover:border-[#EA580C] hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between overflow-hidden group"
              >
                <div>
                  <div className="relative h-28 sm:h-36 md:h-48 lg:h-60 w-full overflow-hidden bg-slate-100">
                    <img
                      src="https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=700&q=80"
                      alt="Cinema Multiplex"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute bottom-3 left-3 bg-slate-900/85 backdrop-blur-md text-white font-sans font-bold text-[10px] md:text-xs uppercase tracking-wider px-2.5 py-1 md:px-3 md:py-1.5 rounded-lg shadow-sm">
                      Cinema 70mm
                    </span>
                  </div>

                  <div className="p-3.5 md:p-5 lg:p-6 space-y-1.5 md:space-y-2">
                    <h3 className="font-news-serif font-bold text-base md:text-lg lg:text-xl text-slate-900 group-hover:text-[#EA580C] transition-colors leading-snug">
                      Cinema Multiplex Ads
                    </h3>
                    <p className="text-xs md:text-sm text-slate-500 leading-relaxed">
                      10–30s on-screen commercials and foyer branding across PVR INOX &amp; Cinepolis.
                    </p>
                  </div>
                </div>

                <div className="p-3.5 md:p-5 lg:p-6 pt-0 md:pt-0">
                  <div className="pt-3.5 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-[11px] md:text-xs font-semibold text-slate-400">
                      1,500+ Screens
                    </span>
                    <span className="text-[11px] md:text-xs font-bold text-[#EA580C] uppercase tracking-wider group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                      View Rates ➔
                    </span>
                  </div>
                </div>
              </Link>

              {/* Television Broadcast */}
              <Link
                to="/tv-ads"
                className="bg-white rounded-2xl md:rounded-3xl border border-slate-200/90 shadow-sm hover:shadow-2xl hover:border-[#EA580C] hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between overflow-hidden group"
              >
                <div>
                  <div className="relative h-28 sm:h-36 md:h-48 lg:h-60 w-full overflow-hidden bg-slate-100">
                    <img
                      src="/images/television-broadcast.png"
                      alt="Television Broadcast"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute bottom-3 left-3 bg-slate-900/85 backdrop-blur-md text-white font-sans font-bold text-[10px] md:text-xs uppercase tracking-wider px-2.5 py-1 md:px-3 md:py-1.5 rounded-lg shadow-sm">
                      Television
                    </span>
                  </div>

                  <div className="p-3.5 md:p-5 lg:p-6 space-y-1.5 md:space-y-2">
                    <h3 className="font-news-serif font-bold text-base md:text-lg lg:text-xl text-slate-900 group-hover:text-[#EA580C] transition-colors leading-snug">
                      Television Broadcast
                    </h3>
                    <p className="text-xs md:text-sm text-slate-500 leading-relaxed">
                      National news, regional GEC &amp; sports channels with prime-time L-band and tickers.
                    </p>
                  </div>
                </div>

                <div className="p-3.5 md:p-5 lg:p-6 pt-0 md:pt-0">
                  <div className="pt-3.5 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-[11px] md:text-xs font-semibold text-slate-400">
                      80+ Channels
                    </span>
                    <span className="text-[11px] md:text-xs font-bold text-[#EA580C] uppercase tracking-wider group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                      View Rates ➔
                    </span>
                  </div>
                </div>
              </Link>

              {/* Billboards & DOOH */}
              <Link
                to="/outdoor-ads"
                className="bg-white rounded-2xl md:rounded-3xl border border-slate-200/90 shadow-sm hover:shadow-2xl hover:border-[#EA580C] hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between overflow-hidden group"
              >
                <div>
                  <div className="relative h-28 sm:h-36 md:h-48 lg:h-60 w-full overflow-hidden bg-slate-100">
                    <img
                      src="https://images.unsplash.com/photo-1542051841857-5f90071e7989?auto=format&fit=crop&w=700&q=80"
                      alt="Outdoor City Billboard"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute bottom-3 left-3 bg-slate-900/85 backdrop-blur-md text-white font-sans font-bold text-[10px] md:text-xs uppercase tracking-wider px-2.5 py-1 md:px-3 md:py-1.5 rounded-lg shadow-sm">
                      Outdoor &amp; DOOH
                    </span>
                  </div>

                  <div className="p-3.5 md:p-5 lg:p-6 space-y-1.5 md:space-y-2">
                    <h3 className="font-news-serif font-bold text-base md:text-lg lg:text-xl text-slate-900 group-hover:text-[#EA580C] transition-colors leading-snug">
                      Billboards &amp; DOOH
                    </h3>
                    <p className="text-xs md:text-sm text-slate-500 leading-relaxed">
                      Highway unipoles, metro train branding, bus wraps &amp; high-footfall digital LED screens.
                    </p>
                  </div>
                </div>

                <div className="p-3.5 md:p-5 lg:p-6 pt-0 md:pt-0">
                  <div className="pt-3.5 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-[11px] md:text-xs font-semibold text-slate-400">
                      High Footfall
                    </span>
                    <span className="text-[11px] md:text-xs font-bold text-[#EA580C] uppercase tracking-wider group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                      View Rates ➔
                    </span>
                  </div>
                </div>
              </Link>
            </div>
            </div>
          </div>
        </section>

      {/* ==========================================================================
          LIVE AD TRACKER & PROOFS
          ========================================================================== */}
      <section className="band" id="track">
        <div className="wrap">
          <h2>Track your notice to the printing press</h2>
          <p className="lead">Follow real-time status from verification to morning delivery. Download your scanned e-tearsheet proof once published.</p>

          <div className="trk">
            <input
              id="oid"
              placeholder="e.g. RKM-2026-9812"
              aria-label="Order ID"
              value={trackId}
              onChange={(e) => setTrackId(e.target.value)}
            />
            <button className="btn" type="button" onClick={handleTrack}>
              Track Status
            </button>
          </div>

          <ol className="stepper" id="stp">
            <li className={trackStep >= 0 && trackId ? 'on' : ''}>1. Placed</li>
            <li className={trackStep >= 1 ? 'on' : ''}>2. Editorial Verification</li>
            <li className={trackStep >= 2 ? 'on' : ''}>3. Scheduled at Press</li>
            <li className={trackStep >= 3 ? 'on' : ''}>4. Published &amp; Proof</li>
          </ol>
          <p className="meta-txt" style={{ marginTop: '14px' }}>
            {trackMsg}
          </p>

          <div className="trust">
            <div>
              <h3>INS Accredited</h3>
              <p>Direct submission to accredited publisher networks nationwide.</p>
            </div>
            <div>
              <h3>Publication Guarantee</h3>
              <p>Guaranteed release on the chosen date and edition.</p>
            </div>
            <div>
              <h3>Digital e-Tearsheet</h3>
              <p>Zoomable scan of the actual printed page plus compliant GST invoice.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================================================
          FAQ
          ========================================================================== */}
      <section id="faq">
        <div className="wrap" style={{ maxWidth: '840px' }}>
          <h2>Frequently asked questions</h2>
          <details>
            <summary>What documents are needed for a Change of Name ad?</summary>
            <p>Newspapers require a copy of a notarized affidavit (attested within the last 6 months) and a valid government ID proof. Upload them during Step 4 before payment.</p>
          </details>
          <details>
            <summary>How does the word vs. line counting formula work?</summary>
            <p>The Times of India charges on a per-line basis (standard ~35 characters per line). Hindi publications like Dainik Jagran charge per word. The live calculator handles this math automatically as you type.</p>
          </details>
          <details>
            <summary>What is the publication cut-off time?</summary>
            <p>Most national newspapers close their next-day editions by 3:00 PM. Weekend matrimonial sections close on Friday afternoon. The cut-off timer will automatically guide your date selection.</p>
          </details>
          <details>
            <summary>Can I obtain a GST invoice for tax credit?</summary>
            <p>Yes. Enter your GSTIN during checkout, and a compliant tax invoice will be generated along with your booking confirmation.</p>
          </details>
        </div>
      </section>
    </main>
  );
};
