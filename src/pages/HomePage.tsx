import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useBooking } from '../context/BookingContext';
import { PUBLICATIONS_DATA, CATEGORY_TEMPLATES, calculateLines, formatINR } from '../data/publicationsData';

export const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { booking, updateBooking, setCategoryTemplate } = useBooking();

  // Hero Omni State
  const [heroMedia, setHeroMedia] = useState('Newspaper');
  const [heroCat, setHeroCat] = useState('Matrimonial');
  const [heroPub, setHeroPub] = useState('toi');

  // Interactive Booking Builder State on Home Page
  const [builderPub, setBuilderPub] = useState(booking.publicationId || 'toi');
  const [builderEd, setBuilderEd] = useState(booking.edition || 'Delhi NCR');
  const [builderCat, setBuilderCat] = useState(booking.category || 'Matrimonial');
  const [builderDate, setBuilderDate] = useState(booking.publishDate || '');
  const [builderText, setBuilderText] = useState(booking.adText || '');
  const [isBold, setIsBold] = useState(booking.enhancements.bold || false);
  const [isColor, setIsColor] = useState(booking.enhancements.colorBg || false);
  const [isBorder, setIsBorder] = useState(booking.enhancements.borderTick || false);
  const [checkoutMsg, setCheckoutMsg] = useState('');

  // Media plan inquiry form state
  const [inqName, setInqName] = useState('');
  const [inqPhone, setInqPhone] = useState('');
  const [inqMedium, setInqMedium] = useState('Radio FM');
  const [inqCityBudget, setInqCityBudget] = useState('');
  const [inqMsg, setInqMsg] = useState('');

  // Track status section state
  const [trackId, setTrackId] = useState('');
  const [trackStep, setTrackStep] = useState(0);
  const [trackMsg, setTrackMsg] = useState('Enter your booking ID to track publishing milestones.');

  // Cut-off timer calculation
  const [cutoffMsg, setCutoffMsg] = useState('Checking cut-off time...');

  // Available publications & editions map from index.html
  const P: Record<string, { n: string; u: 'line' | 'word'; base: number; ex: number; cpl?: number; bu: number }> = {
    toi: { n: 'The Times of India', u: 'line', base: 1450, ex: 290, cpl: 35, bu: 5 },
    ht: { n: 'Hindustan Times', u: 'word', base: 1900, ex: 95, bu: 20 },
    dj: { n: 'Dainik Jagran', u: 'word', base: 1100, ex: 55, bu: 20 },
    au: { n: 'Amar Ujala', u: 'word', base: 1000, ex: 50, bu: 20 }
  };

  const E: Record<string, number> = {
    'Delhi NCR': 1,
    'Mumbai': 1.25,
    'Lucknow': 0.6,
    'Chandigarh': 0.7,
    'Jaipur': 0.65,
    'Delhi NCR + UP combo': 1.45
  };

  const currentPub = P[builderPub] || P.toi;
  const currentEdMult = E[builderEd] || 1;

  // Calculation logic
  const trimmed = builderText.trim();
  const wordCount = trimmed ? trimmed.split(/\s+/).length : 0;
  const lineCount = trimmed ? calculateLines(trimmed, 35) : 0;
  const usedUnits = currentPub.u === 'line' ? lineCount : wordCount;
  const extraUnits = Math.max(0, usedUnits - currentPub.bu);
  const baseRate = currentPub.base * currentEdMult;
  const extraRate = extraUnits * currentPub.ex * currentEdMult;
  const enhRate = (isBold ? 50 : 0) + (isColor ? 150 : 0) + (isBorder ? 30 : 0);
  const subTotal = baseRate + extraRate + enhRate;
  const gst = subTotal * 0.05;
  const totalPayable = subTotal + gst;

  // Selected Category Object for required legal documents
  const selectedCatObj = CATEGORY_TEMPLATES.find((c) => c.name === builderCat);

  // Sync date min & cut-off timer
  useEffect(() => {
    const updateCutoff = () => {
      const now = new Date();
      const a = new Date(now);
      a.setDate(a.getDate() + (now.getHours() >= 15 ? 2 : 1));
      const s = a.toISOString().slice(0, 10);
      if (!builderDate) setBuilderDate(s);

      const e = new Date(now);
      e.setHours(15, 0, 0, 0);
      const ms = e.getTime() - now.getTime();
      const dateFmt = a.toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short' });

      if (ms > 0) {
        setCutoffMsg(
          `Booking closes in ${new Date(ms).toISOString().slice(11, 19)} for print on ${dateFmt}`
        );
      } else {
        setCutoffMsg(`Today's 3 PM cut-off has passed. Earliest print: ${dateFmt}`);
      }
    };

    updateCutoff();
    const timer = setInterval(updateCutoff, 1000);
    return () => clearInterval(timer);
  }, [builderDate]);

  // Set category template
  const applyCategory = (catName: string) => {
    setBuilderCat(catName);
    const tmpl = CATEGORY_TEMPLATES.find((c) => c.name === catName);
    if (tmpl) {
      setBuilderText(tmpl.sampleText);
    }
  };

  const handleHeroGo = () => {
    if (heroMedia === 'Newspaper') {
      setBuilderCat(heroCat);
      setBuilderPub(heroPub);
      applyCategory(heroCat);
      const bookEl = document.getElementById('book');
      if (bookEl) bookEl.scrollIntoView({ behavior: 'smooth' });
    } else {
      setInqMedium(heroMedia === 'Outdoor' ? 'Outdoor / DOOH' : heroMedia);
      const mediaEl = document.getElementById('media');
      if (mediaEl) mediaEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleContinueCheckout = () => {
    updateBooking({
      publicationId: builderPub,
      edition: builderEd,
      category: builderCat,
      publishDate: builderDate,
      adText: builderText,
      enhancements: { bold: isBold, colorBg: isColor, borderTick: isBorder },
    });
    setCheckoutMsg('✔ Draft saved! Redirecting to secure checkout...');
    setTimeout(() => {
      navigate('/checkout');
    }, 400);
  };

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setInqMsg('✔ Thank you! Our senior media planner will contact you within 2 working hours.');
    setInqName('');
    setInqPhone('');
    setInqCityBudget('');
  };

  const handleTrack = () => {
    const v = trackId.trim();
    if (!v) {
      setTrackMsg('Please enter a valid booking ID (e.g. BMA-2026-9812).');
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
                  <option value="Newspaper">Newspaper</option>
                  <option value="Radio FM">Radio FM</option>
                  <option value="Cinema">Cinema</option>
                  <option value="Outdoor">Outdoor</option>
                </select>
              </div>
              <div className="form-field">
                <label htmlFor="hc">Notice Category</label>
                <select id="hc" value={heroCat} onChange={(e) => setHeroCat(e.target.value)}>
                  {CATEGORY_TEMPLATES.map((c) => (
                    <option key={c.name} value={c.name}>{c.name}</option>
                  ))}
                </select>
              </div>
              <div className="form-field">
                <label htmlFor="hp">Newspaper</label>
                <select id="hp" value={heroPub} onChange={(e) => setHeroPub(e.target.value)}>
                  {Object.keys(P).map((k) => (
                    <option key={k} value={k}>{P[k].n}</option>
                  ))}
                </select>
              </div>
            </form>
            <button className="btn accent" type="button" onClick={handleHeroGo}>
              {heroMedia === 'Newspaper' ? 'Check Rates & Book Now' : 'Request a Media Plan'}
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
                <a
                  key={cat.name}
                  className="cat"
                  href="#book"
                  onClick={(e) => {
                    e.preventDefault();
                    applyCategory(cat.name);
                    const bookEl = document.getElementById('book');
                    if (bookEl) bookEl.scrollIntoView({ behavior: 'smooth' });
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
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* ==========================================================================
          INTERACTIVE AD BOOKING BUILDER & LIVE PRINT PROOF
          ========================================================================== */}
      <section className="book-section" id="book">
        <div className="wrap">
          <h2>Write your notice &amp; watch it print</h2>
          <p className="lead">Your text updates in an actual newspaper column in real time. Accurate character and line counters keep you in control of your budget.</p>

          <div className="builder-grid">
            {/* Left: Form Controls */}
            <div className="config-panel">
              <div className="row">
                <div className="form-field">
                  <label htmlFor="pub">Newspaper</label>
                  <select id="pub" value={builderPub} onChange={(e) => setBuilderPub(e.target.value)}>
                    {Object.keys(P).map((k) => (
                      <option key={k} value={k}>{P[k].n}</option>
                    ))}
                  </select>
                </div>
                <div className="form-field">
                  <label htmlFor="ed">Edition / Combo</label>
                  <select id="ed" value={builderEd} onChange={(e) => setBuilderEd(e.target.value)}>
                    {Object.keys(E).map((k) => (
                      <option key={k} value={k}>{k}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="row">
                <div className="form-field">
                  <label htmlFor="cat">Category</label>
                  <select id="cat" value={builderCat} onChange={(e) => applyCategory(e.target.value)}>
                    {CATEGORY_TEMPLATES.map((c) => (
                      <option key={c.name} value={c.name}>{c.name}</option>
                    ))}
                  </select>
                </div>
                <div className="form-field">
                  <label htmlFor="date">Insertion Date</label>
                  <input
                    type="date"
                    id="date"
                    value={builderDate}
                    onChange={(e) => setBuilderDate(e.target.value)}
                  />
                </div>
              </div>

              <div className="cut-badge">{cutoffMsg}</div>

              <div className="f">
                <label htmlFor="txt">Your Advertisement Content</label>
                <textarea
                  id="txt"
                  value={builderText}
                  onChange={(e) => setBuilderText(e.target.value)}
                  placeholder="Draft your advertisement text here..."
                />
                <div className="meter-box">
                  <span className="meta-txt">
                    {wordCount} words, {lineCount} lines (~35 chars/line)
                  </span>
                  <span className="meta-pill">
                    {currentPub.n} charges by {currentPub.u}
                  </span>
                </div>
              </div>

              <label>Visual Enhancements</label>
              <div className="tog">
                <label>
                  <input type="checkbox" checked={isBold} onChange={(e) => setIsBold(e.target.checked)} /> Bold Text (+₹50)
                </label>
                <label>
                  <input type="checkbox" checked={isColor} onChange={(e) => setIsColor(e.target.checked)} /> Color Highlight (+₹150)
                </label>
                <label>
                  <input type="checkbox" checked={isBorder} onChange={(e) => setIsBorder(e.target.checked)} /> Border &amp; Tick (+₹30)
                </label>
              </div>

              {selectedCatObj?.requiredDoc && (
                <div className="f" style={{ marginTop: '16px' }}>
                  <label htmlFor="doc">Supporting Legal Document</label>
                  <input type="file" id="doc" />
                  <p className="meta-txt" style={{ marginTop: '6px' }}>
                    Mandatory requirement: {selectedCatObj.requiredDoc}.
                  </p>
                </div>
              )}
            </div>

            {/* Right: Real-time Newsprint Proof & Itemized Bill */}
            <div className="proof-stage">
              <div className="proof-topbar">
                <span className="proof-tag">Live Broadsheet Simulation</span>
                <span className="proof-dims">Single Column (3.8 cm)</span>
              </div>

              {/* The Live Simulated Newsprint Clipping */}
              <div className="live-paper" aria-live="polite">
                <div className="paper-header">
                  <span>{currentPub.n.toUpperCase()}</span>
                  <span>
                    {builderDate
                      ? new Date(builderDate + 'T00:00').toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }).toUpperCase()
                      : ''}
                  </span>
                </div>
                <div className="paper-cat-banner">{builderCat.toUpperCase()}</div>
                <div className="paper-columns">
                  <div className="paper-col-side">
                    <b>TO LET</b><br />2 BHK furnished flat, Sector 15. Family only. Contact 98XXXXXX01.<br /><br />
                    <b>WANTED</b><br />Tenant for commercial showroom, 500 sq ft, ground floor.
                  </div>

                  {/* Target User Ad */}
                  <div
                    className={`target-ad-slot ${isBold ? 'b' : ''} ${isColor ? 'c' : ''} ${isBorder ? 't' : ''}`}
                  >
                    {isBorder ? '✓ ' : ''}
                    {builderText.trim() ? builderText : 'Your ad text will appear here formatted exactly as it will be printed in the newspaper column.'}
                  </div>

                  <div className="paper-col-side">
                    <b>SITUATIONS VACANT</b><br />Receptionist required for clinic. Graduate, fluent English.<br /><br />
                    <b>LOST &amp; FOUND</b><br />Brown briefcase in taxi. Reward offered.
                  </div>
                </div>
              </div>

              {/* Itemized Billing Card */}
              <div className="bill-card">
                <table className="bill" aria-label="Price breakdown">
                  <tbody>
                    <tr>
                      <td>Base Rate ({currentPub.bu} {currentPub.u}s)</td>
                      <td>{formatINR(baseRate)}</td>
                    </tr>
                    <tr>
                      <td>Extra {currentPub.u}s ({extraUnits})</td>
                      <td>{formatINR(extraRate)}</td>
                    </tr>
                    <tr>
                      <td>Enhancements</td>
                      <td>{formatINR(enhRate)}</td>
                    </tr>
                    <tr>
                      <td>GST (5%)</td>
                      <td>{formatINR(gst)}</td>
                    </tr>
                    <tr className="tot">
                      <td>Total Payable</td>
                      <td>{formatINR(totalPayable)}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <button
                className="btn accent"
                type="button"
                style={{ width: '100%', padding: '16px', fontSize: '14px' }}
                onClick={handleContinueCheckout}
              >
                Continue to Secure Checkout ➔
              </button>
              {checkoutMsg && (
                <p className="meta-txt" role="status" style={{ marginTop: '10px', textAlign: 'center', color: 'var(--green)' }}>
                  {checkoutMsg}
                </p>
              )}
            </div>
          </div>
        </div>
      </section>

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

          <div className="pub-badge-grid">
            <Link className="pub-badge-card" to="/rate-cards">
              <div className="pub-crest">TOI</div>
              <div>
                <strong>The Times of India</strong>
                <span>English • 1.45M Daily Readers</span>
              </div>
            </Link>
            <Link className="pub-badge-card" to="/rate-cards">
              <div className="pub-crest">HT</div>
              <div>
                <strong>Hindustan Times</strong>
                <span>English • 980K Daily Readers</span>
              </div>
            </Link>
            <Link className="pub-badge-card" to="/rate-cards">
              <div className="pub-crest">DJ</div>
              <div>
                <strong>Dainik Jagran</strong>
                <span>Hindi • 3.2M Daily Readers</span>
              </div>
            </Link>
            <Link className="pub-badge-card" to="/rate-cards">
              <div className="pub-crest">AU</div>
              <div>
                <strong>Amar Ujala</strong>
                <span>Hindi • 2.6M Daily Readers</span>
              </div>
            </Link>
            <Link className="pub-badge-card" to="/rate-cards">
              <div className="pub-crest">TH</div>
              <div>
                <strong>The Hindu</strong>
                <span>English • 850K Daily Readers</span>
              </div>
            </Link>
            <Link className="pub-badge-card" to="/rate-cards">
              <div className="pub-crest">DB</div>
              <div>
                <strong>Dainik Bhaskar</strong>
                <span>Hindi • 3.8M Daily Readers</span>
              </div>
            </Link>
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
                <img src="https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=400&q=80" alt="Radio Advertising" />
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
      <section id="media">
        <div className="wrap">
          <div className="med">
            <div>
              <h2>Radio, cinema, television &amp; outdoor media</h2>
              <p className="lead">Strategic 360° media planning built around your target cities and campaign budget. Click any medium to view rates.</p>

              <div className="media-cards-grid">
                <Link className="media-thumb-card" to="/radio-ads">
                  <div className="media-thumb-img">
                    <img src="https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=400&q=80" alt="Radio FM Studio" />
                    <span>Radio FM</span>
                  </div>
                  <div className="media-thumb-txt">
                    <strong>Radio Advertising</strong>
                    <p>Top FM spots in 100+ cities (Mirchi, Red FM, Big FM).</p>
                  </div>
                </Link>

                <Link className="media-thumb-card" to="/cinema-ads">
                  <div className="media-thumb-img">
                    <img src="https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=400&q=80" alt="Cinema Multiplex" />
                    <span>Cinema 70mm</span>
                  </div>
                  <div className="media-thumb-txt">
                    <strong>Cinema Multiplex Ads</strong>
                    <p>10–30s on-screen commercials across PVR INOX &amp; Cinepolis.</p>
                  </div>
                </Link>

                <Link className="media-thumb-card" to="/tv-ads">
                  <div className="media-thumb-img">
                    <img src="https://images.unsplash.com/photo-1578022761797-b8636ac1773c?auto=format&fit=crop&w=400&q=80" alt="TV Studio Broadcast" />
                    <span>Television</span>
                  </div>
                  <div className="media-thumb-txt">
                    <strong>Television Broadcast</strong>
                    <p>National news &amp; regional entertainment channels.</p>
                  </div>
                </Link>

                <Link className="media-thumb-card" to="/outdoor-ads">
                  <div className="media-thumb-img">
                    <img src="https://images.unsplash.com/photo-1542051841857-5f90071e7989?auto=format&fit=crop&w=400&q=80" alt="Outdoor City Billboard" />
                    <span>Outdoor &amp; DOOH</span>
                  </div>
                  <div className="media-thumb-txt">
                    <strong>Billboards &amp; DOOH</strong>
                    <p>Highway unipoles, metro branding &amp; digital LED screens.</p>
                  </div>
                </Link>
              </div>
            </div>

            <form className="config-panel" onSubmit={handleInquirySubmit}>
              <h3 style={{ fontSize: '22px', marginBottom: '16px', fontWeight: 600 }}>Request a Free Media Plan</h3>
              <div className="f">
                <label htmlFor="iq1">Full Name</label>
                <input
                  id="iq1"
                  required
                  placeholder="Rahul Sharma"
                  value={inqName}
                  onChange={(e) => setInqName(e.target.value)}
                />
              </div>
              <div className="f">
                <label htmlFor="iq2">Phone Number</label>
                <input
                  id="iq2"
                  type="tel"
                  required
                  placeholder="+91 98XXXXXXXX"
                  value={inqPhone}
                  onChange={(e) => setInqPhone(e.target.value)}
                />
              </div>
              <div className="f">
                <label htmlFor="iq3">Medium</label>
                <select id="iq3" value={inqMedium} onChange={(e) => setInqMedium(e.target.value)}>
                  <option value="Radio FM">Radio FM</option>
                  <option value="Cinema">Cinema</option>
                  <option value="Television">Television</option>
                  <option value="Outdoor / DOOH">Outdoor / DOOH</option>
                </select>
              </div>
              <div className="f">
                <label htmlFor="iq4">Target City &amp; Estimated Budget</label>
                <input
                  id="iq4"
                  placeholder="Delhi NCR, approx ₹75,000"
                  value={inqCityBudget}
                  onChange={(e) => setInqCityBudget(e.target.value)}
                />
              </div>
              <button className="btn accent" type="submit" style={{ width: '100%' }}>
                Submit Plan Request
              </button>
              {inqMsg && (
                <p className="meta-txt" role="status" style={{ marginTop: '10px', textAlign: 'center', color: 'var(--green)' }}>
                  {inqMsg}
                </p>
              )}
            </form>
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
              placeholder="e.g. BMA-2026-9812"
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
