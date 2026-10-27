import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';
import {
  TV_AD_TYPES,
  TV_BENEFITS,
  TV_AD_EXAMPLES,
  TvAdType,
  TvAdExample,
} from '../data/tvAdsData';

export const TvAdsPage: React.FC = () => {
  // Main Media Planner Form State (Image 1 Bottom)
  const [plannerForm, setPlannerForm] = useState({
    name: '',
    phone: '',
    email: '',
    city: '',
    genre: 'Hindi News',
    language: 'Hindi',
    adType: 'Regular- FCT Ads (Video)',
    budget: '₹1,00,000 - ₹3,00,000',
  });
  const [plannerSubmitted, setPlannerSubmitted] = useState(false);

  // Quick Basic Form State (Image 2 Bottom Right)
  const [basicForm, setBasicForm] = useState({
    name: '',
    email: '',
    phone: '',
    city: '',
    budget: '',
  });
  const [basicSubmitted, setBasicSubmitted] = useState(false);

  // Specimen preview modal
  const [activeSpecimen, setActiveSpecimen] = useState<TvAdExample | null>(null);

  // Selected Ad Type for detailed inspection
  const [selectedAdType, setSelectedAdType] = useState<TvAdType | null>(null);

  const handlePlannerChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setPlannerForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleBasicChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBasicForm((prev) => ({ ...prev, [name]: value }));
  };

  const handlePlannerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!plannerForm.name || !plannerForm.phone) {
      alert('Please fill in your Name and Phone Number.');
      return;
    }
    setPlannerSubmitted(true);
  };

  const handleBasicSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!basicForm.name || !basicForm.phone) {
      alert('Please fill in your Name and Phone Number.');
      return;
    }
    setBasicSubmitted(true);
  };

  return (
    <div style={{ backgroundColor: '#f1f5f9', minHeight: '100vh', paddingBottom: '70px', color: '#1e293b' }}>
      {/* 1. Page Header & Hero Section (Reference Image 1 Top) */}
      <div
        style={{
          background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
          borderBottom: '1px solid #e2e8f0',
          padding: '40px 20px 32px',
          textAlign: 'center',
        }}
      >
        <div style={{ maxWidth: '1060px', margin: '0 auto' }}>
          <div style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: '8px' }}>
            <Link to="/" style={{ color: '#0284c7', textDecoration: 'none' }}>Home</Link>
            <span style={{ margin: '0 8px' }}>/</span>
            <span style={{ color: '#475569' }}>Television Advertising</span>
          </div>

          <h1
            style={{
              fontSize: 'clamp(1.5rem, 3.2vw, 2.25rem)',
              fontWeight: 800,
              color: '#0f172a',
              letterSpacing: '-0.02em',
              lineHeight: 1.3,
              margin: '0 0 12px',
            }}
          >
            TV advertising with RKM Advertising, Get your ad on the right channels, at the right time, for the right price.
          </h1>

          <p
            style={{
              fontSize: '1rem',
              color: '#475569',
              maxWidth: '880px',
              margin: '0 auto',
              lineHeight: 1.6,
            }}
          >
            Reach millions of viewers with RKM Advertising’s TV advertising expertise. Television Advertising in India is the most popular platform of advertising for brands to reach out to huge number of audience.
          </p>
        </div>
      </div>

      <div style={{ maxWidth: '1140px', margin: '0 auto', padding: '40px 16px 0' }}>
        {/* 2. Types of TV Advertising- (Reference Image 1 Middle-Top) */}
        <section style={{ marginBottom: '56px', textAlign: 'center' }}>
          <h2
            style={{
              fontSize: 'clamp(1.35rem, 2.5vw, 1.8rem)',
              fontWeight: 800,
              color: '#0f172a',
              margin: '0 0 6px',
            }}
          >
            Types of TV Advertising-
          </h2>
          <p
            style={{
              fontSize: '0.95rem',
              color: '#475569',
              margin: '0 0 32px',
            }}
          >
            With RKM Advertising, you can easily release a variety of TV advertisements with ease
          </p>

          {/* 3 Column TV Mockup Cards */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))',
              gap: '24px',
              alignItems: 'stretch',
            }}
          >
            {TV_AD_TYPES.map((type) => (
              <div
                key={type.id}
                onClick={() => setSelectedAdType(type)}
                style={{
                  backgroundColor: '#ffffff',
                  borderRadius: '16px',
                  padding: '20px 20px 24px',
                  boxShadow: '0 4px 16px rgba(0,0,0,0.06)',
                  border: '1px solid #e2e8f0',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  cursor: 'pointer',
                  transition: 'transform 0.25s ease, box-shadow 0.25s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-6px)';
                  e.currentTarget.style.boxShadow = '0 12px 28px rgba(0,0,0,0.12)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.06)';
                }}
              >
                {/* TV Monitor Frame Mockup */}
                <div
                  style={{
                    width: '100%',
                    maxWidth: '320px',
                    margin: '0 auto 16px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                  }}
                >
                  {/* Screen Frame */}
                  <div
                    style={{
                      width: '100%',
                      height: '180px',
                      backgroundColor: '#0f172a',
                      borderRadius: '8px',
                      border: '4px solid #1e293b',
                      position: 'relative',
                      overflow: 'hidden',
                      boxShadow: '0 6px 16px rgba(0,0,0,0.2)',
                    }}
                  >
                    <img
                      src={type.mockupImage}
                      alt={type.name}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        display: 'block',
                      }}
                    />

                    {/* Specific On-Screen Overlays */}
                    {type.id === 'scrollers' && (
                      <div
                        style={{
                          position: 'absolute',
                          bottom: 0,
                          left: 0,
                          right: 0,
                          backgroundColor: '#dc2626',
                          color: '#ffffff',
                          padding: '4px 8px',
                          fontSize: '0.65rem',
                          fontWeight: 800,
                          letterSpacing: '0.04em',
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                        }}
                      >
                        ⚡ AD HERE IS RUNNING LIVE • RKM ADVERTISING
                      </div>
                    )}

                    {type.id === 'teleshopping' && (
                      <div
                        style={{
                          position: 'absolute',
                          top: '10px',
                          left: '10px',
                          backgroundColor: 'rgba(234, 88, 12, 0.95)',
                          color: '#ffffff',
                          padding: '2px 8px',
                          borderRadius: '4px',
                          fontSize: '0.68rem',
                          fontWeight: 800,
                        }}
                      >
                        SPECIAL DEAL • ORDER NOW
                      </div>
                    )}

                    {type.id === 'regular-fct' && (
                      <div
                        style={{
                          position: 'absolute',
                          top: '10px',
                          right: '10px',
                          backgroundColor: '#eab308',
                          color: '#0f172a',
                          padding: '3px 8px',
                          borderRadius: '4px',
                          fontSize: '0.68rem',
                          fontWeight: 900,
                          boxShadow: '0 2px 6px rgba(0,0,0,0.3)',
                        }}
                      >
                        SALE IS LIVE!
                      </div>
                    )}
                  </div>

                  {/* TV Stand / Base */}
                  <div
                    style={{
                      width: '40px',
                      height: '8px',
                      backgroundColor: '#334155',
                      margin: '0 auto',
                    }}
                  />
                  <div
                    style={{
                      width: '90px',
                      height: '4px',
                      backgroundColor: '#1e293b',
                      borderRadius: '2px',
                    }}
                  />
                </div>

                <h3
                  style={{
                    fontSize: '1.15rem',
                    fontWeight: 800,
                    color: '#0f172a',
                    margin: '0 0 10px',
                  }}
                >
                  {type.name}
                </h3>

                <p
                  style={{
                    fontSize: '0.85rem',
                    color: '#475569',
                    lineHeight: 1.6,
                    margin: '0 0 12px',
                  }}
                >
                  {type.description}
                </p>

                <div
                  style={{
                    marginTop: 'auto',
                    fontSize: '0.78rem',
                    color: '#dc2626',
                    fontWeight: 700,
                  }}
                >
                  View Broadcast Rates &amp; Specs →
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 3. Benefits of TV Advertising (Reference Image 1 Middle - Interlocking Diamond Diagram) */}
        <section style={{ marginBottom: '60px', textAlign: 'center' }}>
          <style>{`
            @media (min-width: 769px) {
              .tv-diamonds-desktop { display: flex !important; }
              .tv-diamonds-mobile { display: none !important; }
            }
            @media (max-width: 768px) {
              .tv-diamonds-desktop { display: none !important; }
              .tv-diamonds-mobile { display: grid !important; }
            }
          `}</style>

          <h2
            style={{
              fontSize: 'clamp(1.35rem, 2.5vw, 1.85rem)',
              fontWeight: 800,
              color: '#0f172a',
              margin: '0 0 36px',
            }}
          >
            Benefits of TV Advertising
          </h2>

          {/* Desktop Interlocking Diamond Layout */}
          <div
            className="tv-diamonds-desktop"
            style={{
              flexDirection: 'column',
              alignItems: 'center',
              maxWidth: '820px',
              margin: '0 auto',
              padding: '20px 10px',
            }}
          >
            {/* Top Row: 3 Diamonds */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                gap: 'clamp(20px, 4vw, 50px)',
                marginBottom: '-40px',
                zIndex: 2,
              }}
            >
              {/* Diamond 1: Large Audience */}
              <div
                style={{
                  width: '180px',
                  height: '180px',
                  backgroundColor: '#ffffff',
                  border: '2px solid #0f172a',
                  borderRadius: '24px',
                  transform: 'rotate(45deg)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 8px 20px rgba(0,0,0,0.06)',
                  transition: 'border-color 0.25s ease',
                  cursor: 'pointer',
                  margin: '15px',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#dc2626';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = '#0f172a';
                }}
              >
                <div
                  style={{
                    transform: 'rotate(-45deg)',
                    textAlign: 'center',
                    padding: '10px',
                  }}
                >
                  <div style={{ color: '#dc2626', fontSize: '1.75rem', marginBottom: '6px' }}>
                    📺
                  </div>
                  <div style={{ fontSize: '0.95rem', fontWeight: 800, color: '#0f172a' }}>
                    Large Audience
                  </div>
                </div>
              </div>

              {/* Diamond 2: Most Effective */}
              <div
                style={{
                  width: '180px',
                  height: '180px',
                  backgroundColor: '#ffffff',
                  border: '2px solid #0f172a',
                  borderRadius: '24px',
                  transform: 'rotate(45deg)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 8px 20px rgba(0,0,0,0.06)',
                  transition: 'border-color 0.25s ease',
                  cursor: 'pointer',
                  margin: '15px',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#dc2626';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = '#0f172a';
                }}
              >
                <div
                  style={{
                    transform: 'rotate(-45deg)',
                    textAlign: 'center',
                    padding: '10px',
                  }}
                >
                  <div style={{ color: '#dc2626', fontSize: '1.75rem', marginBottom: '6px' }}>
                    🎯
                  </div>
                  <div style={{ fontSize: '0.95rem', fontWeight: 800, color: '#0f172a' }}>
                    Most Effective
                  </div>
                </div>
              </div>

              {/* Diamond 3: Full Screen */}
              <div
                style={{
                  width: '180px',
                  height: '180px',
                  backgroundColor: '#ffffff',
                  border: '2px solid #0f172a',
                  borderRadius: '24px',
                  transform: 'rotate(45deg)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 8px 20px rgba(0,0,0,0.06)',
                  transition: 'border-color 0.25s ease',
                  cursor: 'pointer',
                  margin: '15px',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#dc2626';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = '#0f172a';
                }}
              >
                <div
                  style={{
                    transform: 'rotate(-45deg)',
                    textAlign: 'center',
                    padding: '10px',
                  }}
                >
                  <div style={{ color: '#dc2626', fontSize: '1.75rem', marginBottom: '6px' }}>
                    🖥️
                  </div>
                  <div style={{ fontSize: '0.95rem', fontWeight: 800, color: '#0f172a' }}>
                    Full Screen
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Row: 2 Diamonds nestled in the gaps */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                gap: 'clamp(20px, 6vw, 60px)',
                zIndex: 1,
              }}
            >
              {/* Diamond 4: Build Trust */}
              <div
                style={{
                  width: '180px',
                  height: '180px',
                  backgroundColor: '#ffffff',
                  border: '2px solid #0f172a',
                  borderRadius: '24px',
                  transform: 'rotate(45deg)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 8px 20px rgba(0,0,0,0.06)',
                  transition: 'border-color 0.25s ease',
                  cursor: 'pointer',
                  margin: '15px',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#dc2626';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = '#0f172a';
                }}
              >
                <div
                  style={{
                    transform: 'rotate(-45deg)',
                    textAlign: 'center',
                    padding: '10px',
                  }}
                >
                  <div style={{ color: '#dc2626', fontSize: '1.75rem', marginBottom: '6px' }}>
                    🤝
                  </div>
                  <div style={{ fontSize: '0.95rem', fontWeight: 800, color: '#0f172a' }}>
                    Build Trust
                  </div>
                </div>
              </div>

              {/* Diamond 5: Improve Sales */}
              <div
                style={{
                  width: '180px',
                  height: '180px',
                  backgroundColor: '#ffffff',
                  border: '2px solid #0f172a',
                  borderRadius: '24px',
                  transform: 'rotate(45deg)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 8px 20px rgba(0,0,0,0.06)',
                  transition: 'border-color 0.25s ease',
                  cursor: 'pointer',
                  margin: '15px',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#dc2626';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = '#0f172a';
                }}
              >
                <div
                  style={{
                    transform: 'rotate(-45deg)',
                    textAlign: 'center',
                    padding: '10px',
                  }}
                >
                  <div style={{ color: '#dc2626', fontSize: '1.75rem', marginBottom: '6px' }}>
                    📈
                  </div>
                  <div style={{ fontSize: '0.95rem', fontWeight: 800, color: '#0f172a' }}>
                    Improve Sales
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Responsive Benefits Layout */}
          <div
            className="tv-diamonds-mobile"
            style={{
              display: 'none',
              gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
              gap: '12px',
              padding: '0 8px',
            }}
          >
            {TV_BENEFITS.map((b) => (
              <div
                key={b.id}
                style={{
                  backgroundColor: '#ffffff',
                  borderRadius: '12px',
                  padding: '16px 12px',
                  border: '1.5px solid #0f172a',
                  textAlign: 'center',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.04)',
                }}
              >
                <div style={{ fontSize: '1.6rem', marginBottom: '6px' }}>
                  {b.id === 'large-audience' && '📺'}
                  {b.id === 'most-effective' && '🎯'}
                  {b.id === 'full-screen' && '🖥️'}
                  {b.id === 'build-trust' && '🤝'}
                  {b.id === 'improve-sales' && '📈'}
                </div>
                <div style={{ fontSize: '0.88rem', fontWeight: 800, color: '#0f172a', marginBottom: '4px' }}>
                  {b.title}
                </div>
                <div style={{ fontSize: '0.72rem', color: '#64748b', lineHeight: 1.35 }}>
                  {b.subtitle}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 4. Start Your TV Advertising With us Form (Reference Image 1 Bottom) */}
        <section
          style={{
            backgroundColor: '#ffffff',
            borderRadius: '20px',
            padding: '36px 30px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
            border: '1px solid #e2e8f0',
            marginBottom: '60px',
          }}
        >
          <div style={{ textAlign: 'center', marginBottom: '24px' }}>
            <h2
              style={{
                fontSize: '1.45rem',
                fontWeight: 800,
                color: '#0f172a',
                margin: '0 0 6px',
              }}
            >
              Start Your TV Advertising With us
            </h2>
            <div style={{ color: '#dc2626', fontSize: '0.85rem', fontWeight: 700 }}>
              Please fill out this form
            </div>
          </div>

          <form onSubmit={handlePlannerSubmit}>
            {/* Row 1: Your Name, Your Phone, Your Email */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                gap: '16px',
                marginBottom: '16px',
              }}
            >
              <input
                type="text"
                name="name"
                value={plannerForm.name}
                onChange={handlePlannerChange}
                placeholder="Your Name"
                required
                style={{
                  width: '100%',
                  padding: '11px 14px',
                  borderRadius: '6px',
                  border: '1px solid #cbd5e1',
                  fontSize: '0.88rem',
                  boxSizing: 'border-box',
                }}
              />
              <input
                type="tel"
                name="phone"
                value={plannerForm.phone}
                onChange={handlePlannerChange}
                placeholder="Your Phone"
                required
                style={{
                  width: '100%',
                  padding: '11px 14px',
                  borderRadius: '6px',
                  border: '1px solid #cbd5e1',
                  fontSize: '0.88rem',
                  boxSizing: 'border-box',
                }}
              />
              <input
                type="email"
                name="email"
                value={plannerForm.email}
                onChange={handlePlannerChange}
                placeholder="Your Email"
                style={{
                  width: '100%',
                  padding: '11px 14px',
                  borderRadius: '6px',
                  border: '1px solid #cbd5e1',
                  fontSize: '0.88rem',
                  boxSizing: 'border-box',
                }}
              />
            </div>

            {/* Row 2: Select City, Select Channel Genre, Select Language */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                gap: '16px',
                marginBottom: '16px',
              }}
            >
              <input
                type="text"
                name="city"
                value={plannerForm.city}
                onChange={handlePlannerChange}
                placeholder="Select City (e.g. Delhi NCR, Mumbai, Bangalore)"
                style={{
                  width: '100%',
                  padding: '11px 14px',
                  borderRadius: '6px',
                  border: '1px solid #cbd5e1',
                  fontSize: '0.88rem',
                  boxSizing: 'border-box',
                }}
              />
              <select
                name="genre"
                value={plannerForm.genre}
                onChange={handlePlannerChange}
                style={{
                  width: '100%',
                  padding: '11px 14px',
                  borderRadius: '6px',
                  border: '1px solid #cbd5e1',
                  fontSize: '0.88rem',
                  backgroundColor: '#ffffff',
                  boxSizing: 'border-box',
                }}
              >
                <option value="Hindi News">- Select Channel Genre -</option>
                <option value="Hindi News">Hindi News (Aaj Tak, ABP, Zee News, NDTV)</option>
                <option value="English News">English News (India Today, Times Now, CNN-News18)</option>
                <option value="Regional News">Regional News (UP, Bihar, Punjab, Bengal, South)</option>
                <option value="Hindi GEC">Hindi Entertainment (Star Plus, Sony, Zee TV, Colors)</option>
                <option value="Movies">Movie Channels (Star Gold, Sony MAX, Zee Cinema)</option>
                <option value="Music & Youth">Music Channels (MTV, 9XM, Mastiii)</option>
                <option value="Infotainment">Infotainment (Discovery, Nat Geo, History TV18)</option>
                <option value="Sports">Sports Channels (Star Sports, Sports18)</option>
              </select>
              <select
                name="language"
                value={plannerForm.language}
                onChange={handlePlannerChange}
                style={{
                  width: '100%',
                  padding: '11px 14px',
                  borderRadius: '6px',
                  border: '1px solid #cbd5e1',
                  fontSize: '0.88rem',
                  backgroundColor: '#ffffff',
                  boxSizing: 'border-box',
                }}
              >
                <option value="Hindi">Select Language: Hindi</option>
                <option value="English">English</option>
                <option value="Tamil">Tamil</option>
                <option value="Telugu">Telugu</option>
                <option value="Kannada">Kannada</option>
                <option value="Malayalam">Malayalam</option>
                <option value="Bengali">Bengali</option>
                <option value="Marathi">Marathi</option>
                <option value="Gujarati">Gujarati</option>
                <option value="Punjabi">Punjabi</option>
                <option value="All India">Pan-India Multi-Language</option>
              </select>
            </div>

            {/* Row 3: Select Ad Type, Select Campaign Budget, Consult Media Planner button */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                gap: '16px',
                alignItems: 'center',
              }}
            >
              <select
                name="adType"
                value={plannerForm.adType}
                onChange={handlePlannerChange}
                style={{
                  width: '100%',
                  padding: '11px 14px',
                  borderRadius: '6px',
                  border: '1px solid #cbd5e1',
                  fontSize: '0.88rem',
                  backgroundColor: '#ffffff',
                  boxSizing: 'border-box',
                }}
              >
                <option value="Regular- FCT Ads (Video)">Regular- FCT Ads (10s/20s/30s Video Spot)</option>
                <option value="Scrollers Ads">Scrollers / Bottom Ticker Ads</option>
                <option value="Aston Band / L-Band">Aston Band / L-Band Pop-Up</option>
                <option value="Teleshopping Program">Teleshopping Infomercial (15-30 mins)</option>
                <option value="Show Sponsorship">Program Co-Sponsorship Tag</option>
              </select>

              <select
                name="budget"
                value={plannerForm.budget}
                onChange={handlePlannerChange}
                style={{
                  width: '100%',
                  padding: '11px 14px',
                  borderRadius: '6px',
                  border: '1px solid #cbd5e1',
                  fontSize: '0.88rem',
                  backgroundColor: '#ffffff',
                  boxSizing: 'border-box',
                }}
              >
                <option value="Under ₹50,000">Select Campaign Budget: Under ₹50,000</option>
                <option value="₹50,000 - ₹1,00,000">₹50,000 - ₹1,00,000</option>
                <option value="₹1,00,000 - ₹3,00,000">₹1,00,000 - ₹3,00,000</option>
                <option value="₹3,00,000 - ₹5,00,000">₹3,00,000 - ₹5,00,000</option>
                <option value="₹5,00,000 - ₹10,00,000">₹5,00,000 - ₹10,00,000</option>
                <option value="₹10 Lakhs+">₹10 Lakhs+ (Mega National Campaign)</option>
              </select>

              <button
                type="submit"
                style={{
                  width: '100%',
                  backgroundColor: '#dc2626',
                  color: '#ffffff',
                  padding: '12px 16px',
                  borderRadius: '6px',
                  fontSize: '0.92rem',
                  fontWeight: 700,
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'background-color 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#b91c1c';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#dc2626';
                }}
              >
                Consult Media Planner
              </button>
            </div>
          </form>
        </section>

        {/* 5. Why TV Advertising is important? (Reference Image 2 Top) */}
        <section
          style={{
            backgroundColor: '#ffffff',
            borderRadius: '16px',
            padding: '32px 30px',
            boxShadow: '0 4px 16px rgba(0,0,0,0.06)',
            border: '1px solid #e2e8f0',
            marginBottom: '48px',
          }}
        >
          <h2
            style={{
              fontSize: '1.4rem',
              fontWeight: 800,
              color: '#0f172a',
              margin: '0 0 12px',
            }}
          >
            Why Tv Advertising is important?
          </h2>
          <p
            style={{
              fontSize: '0.92rem',
              color: '#475569',
              lineHeight: 1.7,
              margin: '0 0 20px',
            }}
          >
            TV is still the king regarding returns on investment, awareness and brand recall. TV advertising scored <strong>42%</strong>, with Newspapers trailing with <strong>13%</strong> and YouTube with a tiny <strong>6%</strong>. TV Advertising builds trust because people trust TV and it provides scale and reach. Adverts on TV are full screen, not fighting for screen space.
          </p>

          {/* Stat Recall Metric Comparison Bars */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '14px',
            }}
          >
            <div style={{ background: '#fef2f2', border: '1px solid #fecaca', padding: '14px 18px', borderRadius: '10px' }}>
              <div style={{ fontSize: '1.4rem', fontWeight: 900, color: '#dc2626' }}>42%</div>
              <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#991b1b' }}>Television Ad Recall</div>
              <div style={{ fontSize: '0.72rem', color: '#7f1d1d' }}>Highest spontaneous recall across Indian households</div>
            </div>

            <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', padding: '14px 18px', borderRadius: '10px' }}>
              <div style={{ fontSize: '1.4rem', fontWeight: 900, color: '#475569' }}>13%</div>
              <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#334155' }}>Newspaper Ads</div>
              <div style={{ fontSize: '0.72rem', color: '#64748b' }}>High local trust, single-day shelf life</div>
            </div>

            <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', padding: '14px 18px', borderRadius: '10px' }}>
              <div style={{ fontSize: '1.4rem', fontWeight: 900, color: '#475569' }}>6%</div>
              <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#334155' }}>YouTube Video Ads</div>
              <div style={{ fontSize: '0.72rem', color: '#64748b' }}>High skip rate (82% skip after 5 seconds)</div>
            </div>
          </div>
        </section>

        {/* 6. TV Advertising Examples (Reference Image 2 Middle - 3x3 Grid) */}
        <section style={{ marginBottom: '56px' }}>
          <h2
            style={{
              fontSize: 'clamp(1.3rem, 2.5vw, 1.75rem)',
              fontWeight: 800,
              color: '#0f172a',
              margin: '0 0 24px',
            }}
          >
            TV Advertising Examples
          </h2>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))',
              gap: '20px',
            }}
          >
            {TV_AD_EXAMPLES.map((example) => (
              <div
                key={example.id}
                onClick={() => setActiveSpecimen(example)}
                style={{
                  backgroundColor: '#ffffff',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  boxShadow: '0 3px 12px rgba(0,0,0,0.06)',
                  border: '1px solid #e2e8f0',
                  cursor: 'pointer',
                  transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = '0 10px 24px rgba(0,0,0,0.12)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 3px 12px rgba(0,0,0,0.06)';
                }}
              >
                {/* 16:9 Broadcast Screenshot Container */}
                <div style={{ position: 'relative', width: '100%', height: '190px', backgroundColor: '#0f172a' }}>
                  <img
                    src={example.imageUrl}
                    alt={example.title}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      display: 'block',
                    }}
                  />

                  {/* Red Live TV Badge */}
                  <div
                    style={{
                      position: 'absolute',
                      top: '10px',
                      left: '10px',
                      backgroundColor: '#dc2626',
                      color: '#ffffff',
                      padding: '2px 8px',
                      borderRadius: '4px',
                      fontSize: '0.68rem',
                      fontWeight: 800,
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                    }}
                  >
                    <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#ffffff' }} />
                    {example.format}
                  </div>

                  <div
                    style={{
                      position: 'absolute',
                      bottom: '10px',
                      right: '10px',
                      backgroundColor: 'rgba(0,0,0,0.75)',
                      color: '#ffffff',
                      padding: '2px 8px',
                      borderRadius: '4px',
                      fontSize: '0.68rem',
                      fontWeight: 600,
                    }}
                  >
                    Click to Zoom
                  </div>
                </div>

                <div style={{ padding: '14px 16px' }}>
                  <div style={{ fontSize: '0.72rem', color: '#dc2626', fontWeight: 700, textTransform: 'uppercase', marginBottom: '4px' }}>
                    {example.network}
                  </div>
                  <div style={{ fontSize: '0.88rem', fontWeight: 700, color: '#0f172a', lineHeight: 1.35, marginBottom: '6px' }}>
                    {example.title}
                  </div>
                  <div style={{ fontSize: '0.78rem', color: '#64748b', lineHeight: 1.45 }}>
                    {example.description}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 7. Bottom Two-Column: Why RKM Advertising + "Enter basic information" Form (Reference Image 2 Bottom) */}
        <section
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '30px',
            alignItems: 'start',
            marginBottom: '40px',
          }}
        >
          {/* Left Column: Why RKM Advertising for TV Advertising? */}
          <div
            style={{
              backgroundColor: '#ffffff',
              borderRadius: '16px',
              padding: '36px 30px',
              boxShadow: '0 4px 16px rgba(0,0,0,0.06)',
              border: '1px solid #e2e8f0',
            }}
          >
            <h2
              style={{
                fontSize: '1.45rem',
                fontWeight: 800,
                color: '#0f172a',
                lineHeight: 1.3,
                margin: '0 0 16px',
              }}
            >
              Why RKM Advertising for TV Advertising?
            </h2>

            <p style={{ fontSize: '0.92rem', color: '#475569', lineHeight: 1.68, margin: '0 0 16px' }}>
              With RKM Advertising, you can easily book your TV ads on any channel of your choice with <strong>"Guaranteed Lowest Rates"</strong>. We are the best TV Ad Agency in India. We have multiple offers for National &amp; Regional TV Ads according to your budget.
            </p>

            <p style={{ fontSize: '0.92rem', color: '#475569', lineHeight: 1.68, margin: '0 0 16px' }}>
              There are following options to advertise on: <strong>News Channels Advertising</strong>, <strong>Entertainment Channels</strong>, <strong>Music Channels</strong>, <strong>Movie Channels</strong>, <strong>Infotainment Channels</strong>.
            </p>

            <p style={{ fontSize: '0.92rem', color: '#0f172a', fontWeight: 700, lineHeight: 1.6, margin: '0 0 18px' }}>
              Need a TV Ad that sets your brand apart? RKM Advertising provides the best tv advertising rates in India.
            </p>

            <div
              style={{
                backgroundColor: '#f8fafc',
                border: '1px solid #e2e8f0',
                borderRadius: '10px',
                padding: '16px 20px',
                marginBottom: '20px',
              }}
            >
              <div style={{ fontSize: '0.88rem', color: '#334155', lineHeight: 1.6 }}>
                For more details about television advertisement and tv ad cost, feel free to contact us at{' '}
                <a href="tel:+919811447321" style={{ color: '#0284c7', fontWeight: 700, textDecoration: 'none' }}>
                  +91 98114 47321
                </a>{' '}
                or visit us at{' '}
                <a href="https://www.rkmadvertising.com" target="_blank" rel="noreferrer" style={{ color: '#0284c7', fontWeight: 700, textDecoration: 'none' }}>
                  www.rkmadvertising.com
                </a>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <a
                href="tel:+919811447321"
                style={{
                  backgroundColor: '#dc2626',
                  color: '#ffffff',
                  padding: '11px 22px',
                  borderRadius: '6px',
                  textDecoration: 'none',
                  fontSize: '0.88rem',
                  fontWeight: 700,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                }}
              >
                📞 Call Media Desk: +91 98114 47321
              </a>
              <a
                href="https://wa.me/919811447321?text=Hi%20RKM%20Advertising,%20I%20want%20to%20advertise%20on%20TV"
                target="_blank"
                rel="noreferrer"
                style={{
                  backgroundColor: '#16a34a',
                  color: '#ffffff',
                  padding: '11px 22px',
                  borderRadius: '6px',
                  textDecoration: 'none',
                  fontSize: '0.88rem',
                  fontWeight: 700,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                }}
              >
                💬 WhatsApp TV Rates
              </a>
            </div>
          </div>

          {/* Right Column: "Enter basic information" Form */}
          <div
            style={{
              backgroundColor: '#ffffff',
              borderRadius: '16px',
              padding: '36px 30px',
              boxShadow: '0 4px 16px rgba(0,0,0,0.06)',
              border: '1px solid #e2e8f0',
            }}
          >
            <h3
              style={{
                fontSize: '1.35rem',
                fontWeight: 800,
                color: '#0f172a',
                margin: '0 0 6px',
              }}
            >
              Enter basic information
            </h3>
            <div style={{ color: '#dc2626', fontSize: '0.82rem', fontWeight: 700, marginBottom: '20px' }}>
              Please fill out this form
            </div>

            <form onSubmit={handleBasicSubmit}>
              <div style={{ marginBottom: '14px' }}>
                <input
                  type="text"
                  name="name"
                  value={basicForm.name}
                  onChange={handleBasicChange}
                  placeholder="Your Name"
                  required
                  style={{
                    width: '100%',
                    padding: '11px 14px',
                    borderRadius: '6px',
                    border: '1px solid #cbd5e1',
                    fontSize: '0.88rem',
                    boxSizing: 'border-box',
                  }}
                />
              </div>

              <div style={{ marginBottom: '14px' }}>
                <input
                  type="email"
                  name="email"
                  value={basicForm.email}
                  onChange={handleBasicChange}
                  placeholder="Email Address"
                  style={{
                    width: '100%',
                    padding: '11px 14px',
                    borderRadius: '6px',
                    border: '1px solid #cbd5e1',
                    fontSize: '0.88rem',
                    boxSizing: 'border-box',
                  }}
                />
              </div>

              <div style={{ marginBottom: '14px' }}>
                <input
                  type="tel"
                  name="phone"
                  value={basicForm.phone}
                  onChange={handleBasicChange}
                  placeholder="Phone"
                  required
                  style={{
                    width: '100%',
                    padding: '11px 14px',
                    borderRadius: '6px',
                    border: '1px solid #cbd5e1',
                    fontSize: '0.88rem',
                    boxSizing: 'border-box',
                  }}
                />
              </div>

              <div style={{ marginBottom: '14px' }}>
                <input
                  type="text"
                  name="city"
                  value={basicForm.city}
                  onChange={handleBasicChange}
                  placeholder="City"
                  style={{
                    width: '100%',
                    padding: '11px 14px',
                    borderRadius: '6px',
                    border: '1px solid #cbd5e1',
                    fontSize: '0.88rem',
                    boxSizing: 'border-box',
                  }}
                />
              </div>

              <div style={{ marginBottom: '22px' }}>
                <input
                  type="text"
                  name="budget"
                  value={basicForm.budget}
                  onChange={handleBasicChange}
                  placeholder="Budget: (e.g. ₹1.5 Lakhs)"
                  style={{
                    width: '100%',
                    padding: '11px 14px',
                    borderRadius: '6px',
                    border: '1px solid #cbd5e1',
                    fontSize: '0.88rem',
                    boxSizing: 'border-box',
                  }}
                />
              </div>

              <button
                type="submit"
                style={{
                  backgroundColor: '#000000',
                  color: '#ffffff',
                  padding: '11px 28px',
                  borderRadius: '6px',
                  fontSize: '0.92rem',
                  fontWeight: 700,
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'background-color 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#1e293b';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#000000';
                }}
              >
                Get Quote
              </button>
            </form>
          </div>
        </section>
      </div>

      {/* MODAL 1: Planner Form Submitted Confirmation */}
      {plannerSubmitted &&
        createPortal(
          <div
            style={{
              position: 'fixed',
              inset: 0,
              backgroundColor: 'rgba(15, 23, 42, 0.75)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 9999,
              padding: '16px',
            }}
          >
            <div
              style={{
                backgroundColor: '#ffffff',
                borderRadius: '16px',
                maxWidth: '480px',
                width: '100%',
                padding: '32px 28px',
                textAlign: 'center',
                boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
              }}
            >
              <div
                style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '50%',
                  backgroundColor: '#fee2e2',
                  color: '#dc2626',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.8rem',
                  margin: '0 auto 16px',
                }}
              >
                📺
              </div>
              <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#0f172a', margin: '0 0 8px' }}>
                Media Plan Request Received!
              </h3>
              <p style={{ fontSize: '0.9rem', color: '#475569', lineHeight: 1.5, margin: '0 0 16px' }}>
                Thank you, <strong>{plannerForm.name}</strong>. Our TV media planning director is preparing an official
                channel rate card and CPRP slot availability for <strong>{plannerForm.genre}</strong> in{' '}
                <strong>{plannerForm.language}</strong>.
              </p>
              <div
                style={{
                  background: '#f8fafc',
                  border: '1px solid #e2e8f0',
                  borderRadius: '10px',
                  padding: '14px',
                  textAlign: 'left',
                  fontSize: '0.82rem',
                  color: '#334155',
                  marginBottom: '20px',
                }}
              >
                <div><strong>Ad Format:</strong> {plannerForm.adType}</div>
                <div><strong>Budget Range:</strong> {plannerForm.budget}</div>
                <div><strong>Target Region:</strong> {plannerForm.city || 'Pan-India'}</div>
                <div><strong>Response ETA:</strong> Within 1–2 Business Hours</div>
              </div>
              <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
                <a
                  href="tel:+919811447321"
                  style={{
                    backgroundColor: '#dc2626',
                    color: '#ffffff',
                    padding: '10px 20px',
                    borderRadius: '6px',
                    fontWeight: 700,
                    fontSize: '0.85rem',
                    textDecoration: 'none',
                  }}
                >
                  📞 Call Media Desk
                </a>
                <button
                  type="button"
                  onClick={() => setPlannerSubmitted(false)}
                  style={{
                    backgroundColor: '#0f172a',
                    color: '#ffffff',
                    padding: '10px 22px',
                    borderRadius: '6px',
                    fontWeight: 700,
                    fontSize: '0.85rem',
                    border: 'none',
                    cursor: 'pointer',
                  }}
                >
                  Close
                </button>
              </div>
            </div>
          </div>,
          document.body
        )}

      {/* MODAL 2: Basic Form Submitted Confirmation */}
      {basicSubmitted &&
        createPortal(
          <div
            style={{
              position: 'fixed',
              inset: 0,
              backgroundColor: 'rgba(15, 23, 42, 0.75)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 9999,
              padding: '16px',
            }}
          >
            <div
              style={{
                backgroundColor: '#ffffff',
                borderRadius: '16px',
                maxWidth: '440px',
                width: '100%',
                padding: '30px 24px',
                textAlign: 'center',
                boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
              }}
            >
              <div
                style={{
                  width: '50px',
                  height: '50px',
                  borderRadius: '50%',
                  backgroundColor: '#dcfce7',
                  color: '#16a34a',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.6rem',
                  margin: '0 auto 14px',
                }}
              >
                ✓
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', margin: '0 0 6px' }}>
                Quote Request Submitted
              </h3>
              <p style={{ fontSize: '0.88rem', color: '#475569', lineHeight: 1.5, margin: '0 0 16px' }}>
                We have received your request for <strong>{basicForm.city || 'National'}</strong> TV ad spots. Our broadcast
                liaison will contact <strong>{basicForm.phone}</strong> shortly with negotiated channel rate cards.
              </p>
              <button
                type="button"
                onClick={() => setBasicSubmitted(false)}
                style={{
                  backgroundColor: '#0f172a',
                  color: '#ffffff',
                  padding: '10px 24px',
                  borderRadius: '6px',
                  fontWeight: 700,
                  fontSize: '0.88rem',
                  border: 'none',
                  cursor: 'pointer',
                }}
              >
                OK
              </button>
            </div>
          </div>,
          document.body
        )}

      {/* MODAL 3: TV Broadcast Specimen Inspector */}
      {activeSpecimen &&
        createPortal(
          <div
            style={{
              position: 'fixed',
              inset: 0,
              backgroundColor: 'rgba(15, 23, 42, 0.85)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 9999,
              padding: '16px',
            }}
          >
            <div
              style={{
                backgroundColor: '#ffffff',
                borderRadius: '16px',
                maxWidth: '680px',
                width: '100%',
                overflow: 'hidden',
                boxShadow: '0 25px 50px rgba(0,0,0,0.4)',
                position: 'relative',
              }}
            >
              <button
                type="button"
                onClick={() => setActiveSpecimen(null)}
                aria-label="Close"
                style={{
                  position: 'absolute',
                  top: '12px',
                  right: '12px',
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  backgroundColor: '#dc2626',
                  color: '#ffffff',
                  border: 'none',
                  fontSize: '1rem',
                  fontWeight: 900,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  zIndex: 2,
                }}
              >
                ✕
              </button>

              <div style={{ width: '100%', height: '340px', backgroundColor: '#000000', position: 'relative' }}>
                <img
                  src={activeSpecimen.imageUrl}
                  alt={activeSpecimen.title}
                  style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                />
              </div>

              <div style={{ padding: '24px' }}>
                <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#dc2626', textTransform: 'uppercase', marginBottom: '4px' }}>
                  {activeSpecimen.network} • {activeSpecimen.format}
                </div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', margin: '0 0 8px' }}>
                  {activeSpecimen.title}
                </h3>
                <p style={{ fontSize: '0.88rem', color: '#64748b', lineHeight: 1.6, margin: '0 0 20px' }}>
                  {activeSpecimen.description}
                </p>

                <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                  <a
                    href="tel:+919811447321"
                    style={{
                      backgroundColor: '#dc2626',
                      color: '#ffffff',
                      padding: '10px 22px',
                      borderRadius: '6px',
                      textDecoration: 'none',
                      fontSize: '0.88rem',
                      fontWeight: 700,
                    }}
                  >
                    Book This Ad Slot
                  </a>
                  <button
                    type="button"
                    onClick={() => setActiveSpecimen(null)}
                    style={{
                      backgroundColor: '#0f172a',
                      color: '#ffffff',
                      padding: '10px 22px',
                      borderRadius: '6px',
                      fontSize: '0.88rem',
                      fontWeight: 700,
                      border: 'none',
                      cursor: 'pointer',
                    }}
                  >
                    Back to Gallery
                  </button>
                </div>
              </div>
            </div>
          </div>,
          document.body
        )}

      {/* MODAL 4: Ad Type Detail Modal */}
      {selectedAdType &&
        createPortal(
          <div
            style={{
              position: 'fixed',
              inset: 0,
              backgroundColor: 'rgba(15, 23, 42, 0.85)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 9999,
              padding: '16px',
            }}
          >
            <div
              style={{
                backgroundColor: '#ffffff',
                borderRadius: '16px',
                maxWidth: '560px',
                width: '100%',
                padding: '28px 24px',
                boxShadow: '0 25px 50px rgba(0,0,0,0.4)',
                position: 'relative',
              }}
            >
              <button
                type="button"
                onClick={() => setSelectedAdType(null)}
                aria-label="Close"
                style={{
                  position: 'absolute',
                  top: '12px',
                  right: '12px',
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  backgroundColor: '#dc2626',
                  color: '#ffffff',
                  border: 'none',
                  fontSize: '1rem',
                  fontWeight: 900,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                ✕
              </button>

              <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#dc2626', textTransform: 'uppercase', marginBottom: '4px' }}>
                {selectedAdType.badge}
              </div>
              <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#0f172a', margin: '0 0 12px' }}>
                {selectedAdType.name}
              </h3>
              <p style={{ fontSize: '0.9rem', color: '#475569', lineHeight: 1.6, margin: '0 0 14px' }}>
                {selectedAdType.description}
              </p>
              <div style={{ background: '#f8fafc', padding: '14px', borderRadius: '10px', border: '1px solid #e2e8f0', marginBottom: '20px' }}>
                <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#0f172a', marginBottom: '4px' }}>
                  Broadcast Specifications:
                </div>
                <div style={{ fontSize: '0.82rem', color: '#64748b', lineHeight: 1.5 }}>
                  {selectedAdType.formatDetails}
                </div>
              </div>

              <div style={{ display: 'flex', gap: '10px' }}>
                <a
                  href="tel:+919811447321"
                  style={{
                    backgroundColor: '#dc2626',
                    color: '#ffffff',
                    padding: '10px 22px',
                    borderRadius: '6px',
                    textDecoration: 'none',
                    fontSize: '0.88rem',
                    fontWeight: 700,
                  }}
                >
                  Get Instant Rate Card
                </a>
                <button
                  type="button"
                  onClick={() => setSelectedAdType(null)}
                  style={{
                    backgroundColor: '#0f172a',
                    color: '#ffffff',
                    padding: '10px 22px',
                    borderRadius: '6px',
                    fontSize: '0.88rem',
                    fontWeight: 700,
                    border: 'none',
                    cursor: 'pointer',
                  }}
                >
                  Close
                </button>
              </div>
            </div>
          </div>,
          document.body
        )}
    </div>
  );
};
