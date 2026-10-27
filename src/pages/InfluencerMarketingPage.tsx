import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';
import {
  INFLUENCER_CATEGORIES,
  UGC_VIDEOS,
  CAPABILITY_FEATURES,
  InfluencerCategory,
  UgcVideoCreator,
} from '../data/influencerMarketingData';

export const InfluencerMarketingPage: React.FC = () => {
  // Inquiry Form State (Reference Image 1)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    company: '',
    email: '',
    phone: '',
    website: '',
    platform: 'Instagram',
    niche: 'Fashion & Beauty',
    tier: 'Micro (10K - 100K followers)',
    lookingFor: 'Instagram Reels & Stories',
    objective: 'Brand Awareness & Reach',
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Selected Category filter for category carousel
  const [selectedCategory, setSelectedCategory] = useState<InfluencerCategory | null>(null);
  const [activeCategoryIndex, setActiveCategoryIndex] = useState(0);

  // UGC Video Modal State
  const [activeVideoModal, setActiveVideoModal] = useState<UgcVideoCreator | null>(null);

  // General "Get In Touch" Modal State (from right-side promo flyer)
  const [isGetInTouchOpen, setIsGetInTouchOpen] = useState(false);

  // Hero carousel index
  const [heroSlide, setHeroSlide] = useState(0);

  // Capabilities promo slide index
  const [promoSlide, setPromoSlide] = useState(0);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.firstName || !formData.phone) {
      alert('Please fill in your Name and Phone Number.');
      return;
    }
    setFormSubmitted(true);
  };

  return (
    <div style={{ backgroundColor: '#f1f5f9', minHeight: '100vh', paddingBottom: '70px', color: '#1e293b' }}>
      {/* 1. Page Header Banner */}
      <div
        style={{
          background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
          borderBottom: '1px solid #e2e8f0',
          padding: '40px 20px 30px',
          textAlign: 'center',
        }}
      >
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: '8px' }}>
            <Link to="/" style={{ color: '#0284c7', textDecoration: 'none' }}>Home</Link>
            <span style={{ margin: '0 8px' }}>/</span>
            <span style={{ color: '#475569' }}>Influencer Marketing</span>
          </div>
          <h1
            style={{
              fontSize: 'clamp(1.5rem, 3.2vw, 2.3rem)',
              fontWeight: 800,
              color: '#0f172a',
              letterSpacing: '-0.02em',
              lineHeight: 1.25,
              margin: '0 0 10px',
            }}
          >
            India’s Leading Influencer Marketing Agency – Connecting Brands with Top Creators!
          </h1>
          <p
            style={{
              fontSize: '1rem',
              color: '#475569',
              maxWidth: '850px',
              margin: '0 auto',
              lineHeight: 1.5,
            }}
          >
            Data-backed creator campaigns on Instagram, YouTube, LinkedIn & Meta. Verified audiences,
            viral UGC reels, and performance-driven sales growth with India’s 2.5M+ creator network.
          </p>
        </div>
      </div>

      <div style={{ maxWidth: '1140px', margin: '0 auto', padding: '36px 16px 0' }}>
        {/* 2. Hero 2-Column Section (Reference Image 1 Top) */}
        <section
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '24px',
            alignItems: 'stretch',
            marginBottom: '40px',
          }}
        >
          {/* Left Column: Visual Pink/Coral Creator Card */}
          <div
            style={{
              background: 'linear-gradient(135deg, #fb7185 0%, #f43f5e 50%, #e11d48 100%)',
              borderRadius: '16px',
              padding: '30px 24px 20px',
              color: '#ffffff',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              boxShadow: '0 10px 25px -5px rgba(225, 29, 72, 0.25)',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {/* Background geometric accents */}
            <div
              style={{
                position: 'absolute',
                top: '-40px',
                right: '-40px',
                width: '180px',
                height: '180px',
                borderRadius: '50%',
                background: 'rgba(255, 255, 255, 0.1)',
                pointerEvents: 'none',
              }}
            />

            <div>
              <div
                style={{
                  textAlign: 'center',
                  fontSize: '0.82rem',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  fontWeight: 800,
                  color: '#ffe4e6',
                  marginBottom: '4px',
                }}
              >
                FIND THE <span style={{ color: '#ffffff', textDecoration: 'underline' }}>PERFECT</span>
              </div>
              <h2
                style={{
                  textAlign: 'center',
                  fontSize: 'clamp(1.4rem, 2.5vw, 1.85rem)',
                  fontWeight: 900,
                  margin: '0 0 16px',
                  letterSpacing: '-0.01em',
                  textShadow: '0 2px 4px rgba(0,0,0,0.15)',
                }}
              >
                INFLUENCER FOR YOUR BRAND.
              </h2>

              {/* 3 Value Badges */}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  flexWrap: 'wrap',
                  gap: '10px',
                  marginBottom: '22px',
                }}
              >
                <span
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.22)',
                    backdropFilter: 'blur(6px)',
                    padding: '5px 12px',
                    borderRadius: '20px',
                    fontSize: '0.78rem',
                    fontWeight: 700,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '5px',
                  }}
                >
                  <span style={{ color: '#a7f3d0' }}>✓</span> 15K+ Vetted Influencers
                </span>
                <span
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.22)',
                    backdropFilter: 'blur(6px)',
                    padding: '5px 12px',
                    borderRadius: '20px',
                    fontSize: '0.78rem',
                    fontWeight: 700,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '5px',
                  }}
                >
                  <span style={{ color: '#a7f3d0' }}>✓</span> Managed Collaborations
                </span>
                <span
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.22)',
                    backdropFilter: 'blur(6px)',
                    padding: '5px 12px',
                    borderRadius: '20px',
                    fontSize: '0.78rem',
                    fontWeight: 700,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '5px',
                  }}
                >
                  <span style={{ color: '#a7f3d0' }}>✓</span> Get Content Rights
                </span>
              </div>

              {/* Creator Mockup graphic */}
              <div
                style={{
                  position: 'relative',
                  width: '100%',
                  maxWidth: '380px',
                  margin: '0 auto 16px',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  boxShadow: '0 16px 32px rgba(0,0,0,0.25)',
                  border: '3px solid rgba(255,255,255,0.85)',
                  backgroundColor: '#ffffff',
                }}
              >
                <img
                  src="https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80"
                  alt="Creator taking selfie"
                  style={{
                    width: '100%',
                    height: '340px',
                    objectFit: 'cover',
                    display: 'block',
                  }}
                />

                {/* Floating Social Icons (matching reference) */}
                <div
                  style={{
                    position: 'absolute',
                    top: '14px',
                    left: '14px',
                    width: '34px',
                    height: '34px',
                    borderRadius: '8px',
                    backgroundColor: '#1877f2',
                    color: '#ffffff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 900,
                    fontSize: '1.2rem',
                    boxShadow: '0 4px 10px rgba(0,0,0,0.3)',
                  }}
                >
                  f
                </div>
                <div
                  style={{
                    position: 'absolute',
                    top: '14px',
                    right: '14px',
                    width: '34px',
                    height: '34px',
                    borderRadius: '8px',
                    background: 'radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 5%, #fd5949 45%, #d6249f 60%, #285AEB 90%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1rem',
                    boxShadow: '0 4px 10px rgba(0,0,0,0.3)',
                  }}
                >
                  📷
                </div>
                <div
                  style={{
                    position: 'absolute',
                    bottom: '16px',
                    left: '14px',
                    width: '34px',
                    height: '34px',
                    borderRadius: '50%',
                    backgroundColor: '#000000',
                    color: '#ffffff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '0.9rem',
                    fontWeight: 900,
                    boxShadow: '0 4px 10px rgba(0,0,0,0.3)',
                  }}
                >
                  ♪
                </div>

                {/* Floating hashtag */}
                <div
                  style={{
                    position: 'absolute',
                    top: '48%',
                    right: '14px',
                    width: '30px',
                    height: '30px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    color: '#e11d48',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 900,
                    fontSize: '1rem',
                    boxShadow: '0 4px 8px rgba(0,0,0,0.15)',
                  }}
                >
                  #
                </div>

                {/* Floating likes badge */}
                <div
                  style={{
                    position: 'absolute',
                    bottom: '16px',
                    right: '16px',
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    color: '#0f172a',
                    padding: '5px 12px',
                    borderRadius: '20px',
                    fontSize: '0.78rem',
                    fontWeight: 800,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '5px',
                    boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
                  }}
                >
                  <span style={{ color: '#ef4444' }}>❤️</span> 182K
                </div>
              </div>
            </div>

            {/* Carousel indicator dots */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                gap: '6px',
                marginTop: '10px',
              }}
            >
              {[0, 1, 2].map((idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setHeroSlide(idx)}
                  aria-label={`Slide ${idx + 1}`}
                  style={{
                    width: heroSlide === idx ? '22px' : '8px',
                    height: '8px',
                    borderRadius: '4px',
                    backgroundColor: heroSlide === idx ? '#ffffff' : 'rgba(255,255,255,0.4)',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'all 0.25s ease',
                  }}
                />
              ))}
            </div>
          </div>

          {/* Right Column: High-Impact Agency Text Box */}
          <div
            style={{
              backgroundColor: '#ffffff',
              borderRadius: '16px',
              padding: '36px 32px',
              boxShadow: '0 4px 16px rgba(0,0,0,0.06)',
              border: '1px solid #e2e8f0',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}
          >
            <h2
              style={{
                fontSize: 'clamp(1.35rem, 2.2vw, 1.75rem)',
                fontWeight: 800,
                color: '#0f172a',
                lineHeight: 1.3,
                margin: '0 0 16px',
              }}
            >
              Boost Your Brand with India’s Top Influencer Marketing Experts
            </h2>

            <p
              style={{
                fontSize: '0.92rem',
                color: '#475569',
                lineHeight: 1.68,
                margin: '0 0 16px',
              }}
            >
              We are India’s top influencer marketing company, helping brands maximize their impact with the right influencers and celebrities across leading platforms. Launch influencer campaigns on Instagram, Facebook, YouTube, LinkedIn, Twitter, and even marketplaces like Amazon and Flipkart.
            </p>

            <p
              style={{
                fontSize: '0.92rem',
                color: '#475569',
                lineHeight: 1.68,
                margin: '0 0 16px',
              }}
            >
              Our data-driven, influencer-led strategies amplify brand reach by up to 10X through authentic, engaging content, including product reviews, corporate shoutouts, event promotions, and lifestyle collaborations. Whether you’re in beauty, fashion, travel, tech, finance, fitness, education, or entertainment, we connect you with influencers who truly resonate with your audience—regardless of their size or location.
            </p>

            <p
              style={{
                fontSize: '0.92rem',
                color: '#1e293b',
                fontWeight: 600,
                lineHeight: 1.6,
                margin: '0 0 24px',
              }}
            >
              Say goodbye to boring ads and hello to relatable, high-impact content that delivers real results. Let’s get started today!
            </p>

            {/* Feature Highlights Grid */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
                gap: '12px',
                paddingTop: '16px',
                borderTop: '1px solid #f1f5f9',
              }}
            >
              <div style={{ background: '#f8fafc', padding: '10px 14px', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#e11d48' }}>10X</div>
                <div style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 600 }}>Reach Amplification</div>
              </div>
              <div style={{ background: '#f8fafc', padding: '10px 14px', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0284c7' }}>2.5M+</div>
                <div style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 600 }}>Indian Creators</div>
              </div>
              <div style={{ background: '#f8fafc', padding: '10px 14px', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#16a34a' }}>100%</div>
                <div style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 600 }}>Commercial Rights</div>
              </div>
            </div>
          </div>
        </section>

        {/* 3. Lead Capture Form: "Interested to know more" (Reference Image 1 Middle) */}
        <section
          style={{
            backgroundColor: '#e0e7ff',
            borderRadius: '16px',
            padding: '36px 30px',
            marginBottom: '48px',
            boxShadow: '0 4px 16px rgba(99, 102, 241, 0.08)',
            border: '1px solid #c7d2fe',
          }}
        >
          <h2
            style={{
              textAlign: 'center',
              fontSize: '1.5rem',
              fontWeight: 800,
              color: '#1e1b4b',
              margin: '0 0 26px',
            }}
          >
            Interested to know more
          </h2>

          <form onSubmit={handleFormSubmit}>
            {/* Row 1: Your Name, Last Name, Company / Brand */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                gap: '16px',
                marginBottom: '16px',
              }}
            >
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#312e81', marginBottom: '6px' }}>
                  Your Name *
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  placeholder="Your Name"
                  required
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    borderRadius: '6px',
                    border: '1px solid #cbd5e1',
                    fontSize: '0.88rem',
                    backgroundColor: '#ffffff',
                    color: '#0f172a',
                    outline: 'none',
                    boxSizing: 'border-box',
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#312e81', marginBottom: '6px' }}>
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  placeholder="Last Name"
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    borderRadius: '6px',
                    border: '1px solid #cbd5e1',
                    fontSize: '0.88rem',
                    backgroundColor: '#ffffff',
                    color: '#0f172a',
                    outline: 'none',
                    boxSizing: 'border-box',
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#312e81', marginBottom: '6px' }}>
                  Company / Brand
                </label>
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleInputChange}
                  placeholder="Company / Brand Name"
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    borderRadius: '6px',
                    border: '1px solid #cbd5e1',
                    fontSize: '0.88rem',
                    backgroundColor: '#ffffff',
                    color: '#0f172a',
                    outline: 'none',
                    boxSizing: 'border-box',
                  }}
                />
              </div>
            </div>

            {/* Row 2: Email, Phone Number, Website / Social Media */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                gap: '16px',
                marginBottom: '16px',
              }}
            >
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#312e81', marginBottom: '6px' }}>
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Email Address"
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    borderRadius: '6px',
                    border: '1px solid #cbd5e1',
                    fontSize: '0.88rem',
                    backgroundColor: '#ffffff',
                    color: '#0f172a',
                    outline: 'none',
                    boxSizing: 'border-box',
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#312e81', marginBottom: '6px' }}>
                  Phone Number *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="Phone Number"
                  required
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    borderRadius: '6px',
                    border: '1px solid #cbd5e1',
                    fontSize: '0.88rem',
                    backgroundColor: '#ffffff',
                    color: '#0f172a',
                    outline: 'none',
                    boxSizing: 'border-box',
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#312e81', marginBottom: '6px' }}>
                  Website / Social Media
                </label>
                <input
                  type="text"
                  name="website"
                  value={formData.website}
                  onChange={handleInputChange}
                  placeholder="Website / Social Media Handles"
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    borderRadius: '6px',
                    border: '1px solid #cbd5e1',
                    fontSize: '0.88rem',
                    backgroundColor: '#ffffff',
                    color: '#0f172a',
                    outline: 'none',
                    boxSizing: 'border-box',
                  }}
                />
              </div>
            </div>

            {/* Row 3: Type of Platform, What industry/niche */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: '16px',
                marginBottom: '16px',
              }}
            >
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#312e81', marginBottom: '6px' }}>
                  Type of Platform
                </label>
                <select
                  name="platform"
                  value={formData.platform}
                  onChange={handleInputChange}
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    borderRadius: '6px',
                    border: '1px solid #cbd5e1',
                    fontSize: '0.88rem',
                    backgroundColor: '#ffffff',
                    color: '#0f172a',
                    outline: 'none',
                    boxSizing: 'border-box',
                  }}
                >
                  <option value="Instagram">Instagram (Reels, Stories & Posts)</option>
                  <option value="YouTube">YouTube (Shorts & Dedicated Reviews)</option>
                  <option value="Facebook">Facebook Video & Groups</option>
                  <option value="LinkedIn">LinkedIn (B2B & Thought Leaders)</option>
                  <option value="Twitter">Twitter / X (Trending Discussions)</option>
                  <option value="Multi-Platform">Multi-Platform Omnichannel Mix</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#312e81', marginBottom: '6px' }}>
                  What industry/niche should the influencer be from?
                </label>
                <select
                  name="niche"
                  value={formData.niche}
                  onChange={handleInputChange}
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    borderRadius: '6px',
                    border: '1px solid #cbd5e1',
                    fontSize: '0.88rem',
                    backgroundColor: '#ffffff',
                    color: '#0f172a',
                    outline: 'none',
                    boxSizing: 'border-box',
                  }}
                >
                  <option value="Fashion & Beauty">Fashion &amp; Beauty</option>
                  <option value="Fitness & Health">Fitness &amp; Health</option>
                  <option value="Technology & Gadgets">Technology &amp; Gadgets</option>
                  <option value="Automobile">Automobile &amp; Bikes</option>
                  <option value="Comedy & Entertainment">Comedy &amp; Entertainment</option>
                  <option value="Education & EdTech">Education &amp; EdTech</option>
                  <option value="Food & Beverage">Food &amp; Beverage</option>
                  <option value="Travel & Hospitality">Travel &amp; Hospitality</option>
                  <option value="Finance & FinTech">Finance &amp; FinTech</option>
                  <option value="Gaming & Esports">Gaming &amp; Esports</option>
                  <option value="Parenting & Family">Parenting &amp; Family</option>
                  <option value="Real Estate & Interior">Real Estate &amp; Interior Decor</option>
                </select>
              </div>
            </div>

            {/* Row 4: What type of influencers are you looking for?, What you are looking for? */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: '16px',
                marginBottom: '16px',
              }}
            >
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#312e81', marginBottom: '6px' }}>
                  What type of influencers are you looking for?
                </label>
                <select
                  name="tier"
                  value={formData.tier}
                  onChange={handleInputChange}
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    borderRadius: '6px',
                    border: '1px solid #cbd5e1',
                    fontSize: '0.88rem',
                    backgroundColor: '#ffffff',
                    color: '#0f172a',
                    outline: 'none',
                    boxSizing: 'border-box',
                  }}
                >
                  <option value="Nano (1K - 10K followers)">Nano (1K - 10K followers) – High Trust &amp; Local Reach</option>
                  <option value="Micro (10K - 100K followers)">Micro (10K - 100K followers) – High Engagement ROI</option>
                  <option value="Macro (100K - 1M followers)">Macro (100K - 1M followers) – National Brand Visibility</option>
                  <option value="Mega / Celebrities (1M+ followers)">Mega / Celebrities (1M+ followers) – Massive Reach &amp; Stardom</option>
                  <option value="Mixed Multi-Tier Package">Mixed Multi-Tier Campaign Cohort</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#312e81', marginBottom: '6px' }}>
                  What you are looking for?
                </label>
                <select
                  name="lookingFor"
                  value={formData.lookingFor}
                  onChange={handleInputChange}
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    borderRadius: '6px',
                    border: '1px solid #cbd5e1',
                    fontSize: '0.88rem',
                    backgroundColor: '#ffffff',
                    color: '#0f172a',
                    outline: 'none',
                    boxSizing: 'border-box',
                  }}
                >
                  <option value="Instagram Reels & Stories">Instagram Reels &amp; Stories</option>
                  <option value="Dedicated Video / Shorts">Dedicated YouTube Video / YouTube Shorts</option>
                  <option value="Product Review / Unboxing">Product Review / Unboxing / Testimonial</option>
                  <option value="Brand Ambassadorship">Long-Term Brand Ambassadorship</option>
                  <option value="Event / Store Launch Presence">Event / Store Launch Celebrity Presence</option>
                  <option value="Barter Collaboration">Barter / Gifting Collaboration</option>
                  <option value="Meme Marketing Campaign">Viral Meme Page Distribution</option>
                </select>
              </div>
            </div>

            {/* Row 5: What are your main objectives for this influencer campaign? */}
            <div style={{ marginBottom: '24px' }}>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#312e81', marginBottom: '6px' }}>
                What are your main objectives for this influencer campaign?
              </label>
              <select
                name="objective"
                value={formData.objective}
                onChange={handleInputChange}
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  borderRadius: '6px',
                  border: '1px solid #cbd5e1',
                  fontSize: '0.88rem',
                  backgroundColor: '#ffffff',
                  color: '#0f172a',
                  outline: 'none',
                  boxSizing: 'border-box',
                }}
              >
                <option value="Brand Awareness & Reach">Brand Awareness &amp; Massive Reach</option>
                <option value="Sales & Conversions">E-Commerce Sales, Leads &amp; Direct Conversions</option>
                <option value="App Downloads / User Acquisition">App Downloads / User Sign-ups</option>
                <option value="Product Launch Buzz">New Product Launch Hype &amp; Unboxing</option>
                <option value="Social Media Growth">Instagram / YouTube Follower Growth &amp; Engagement</option>
                <option value="User-Generated Content (UGC)">Building a UGC Video Ad Creative Library</option>
              </select>
            </div>

            {/* Submit Button */}
            <div style={{ textAlign: 'center' }}>
              <button
                type="submit"
                style={{
                  backgroundColor: '#000000',
                  color: '#ffffff',
                  padding: '12px 42px',
                  borderRadius: '6px',
                  fontSize: '0.95rem',
                  fontWeight: 700,
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'background-color 0.2s ease, transform 0.15s ease',
                  letterSpacing: '0.04em',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#1e293b';
                  e.currentTarget.style.transform = 'translateY(-1px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#000000';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                Next
              </button>
            </div>
          </form>
        </section>

        {/* 4. Category Grid / Carousel ("FIND THE MOST SUITABLE INFLUENCER FOR YOUR BRAND") (Reference Image 1 Bottom) */}
        <section style={{ marginBottom: '56px', textAlign: 'center' }}>
          <h2
            style={{
              fontSize: 'clamp(1.25rem, 2.4vw, 1.65rem)',
              fontWeight: 800,
              color: '#0f172a',
              letterSpacing: '-0.01em',
              textTransform: 'uppercase',
              margin: '0 0 24px',
            }}
          >
            FIND THE MOST SUITABLE INFLUENCER FOR YOUR BRAND
          </h2>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
              gap: '14px',
              marginBottom: '20px',
            }}
          >
            {(activeCategoryIndex === 0
              ? INFLUENCER_CATEGORIES.slice(0, 6)
              : INFLUENCER_CATEGORIES.slice(4, 10)
            ).map((cat) => (
              <div
                key={cat.id}
                onClick={() => {
                  setSelectedCategory(cat);
                  setFormData((prev) => ({ ...prev, niche: cat.name.replace(' Influencers', '') }));
                }}
                style={{
                  backgroundColor: '#ffffff',
                  borderRadius: '12px',
                  padding: '20px 12px 14px',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                  border: selectedCategory?.id === cat.id ? '2px solid #e11d48' : '1px solid #e2e8f0',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  minHeight: '155px',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = '0 8px 20px rgba(0,0,0,0.08)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.05)';
                }}
              >
                {/* Icon graphic */}
                <div
                  style={{
                    width: '50px',
                    height: '50px',
                    borderRadius: '50%',
                    backgroundColor: '#f8fafc',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.7rem',
                    marginBottom: '8px',
                    border: '1px solid #e2e8f0',
                  }}
                >
                  {cat.emoji}
                </div>

                <div
                  style={{
                    fontSize: '0.78rem',
                    fontWeight: 800,
                    color: '#0f172a',
                    textTransform: 'uppercase',
                    textAlign: 'center',
                    lineHeight: 1.25,
                    marginBottom: '8px',
                  }}
                >
                  {cat.name}
                </div>

                {/* Social icons row */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#64748b', fontSize: '0.82rem' }}>
                  <span title="Instagram" style={{ color: '#e1306c' }}>📷</span>
                  <span title="YouTube" style={{ color: '#ff0000' }}>▶</span>
                  <span style={{ fontSize: '0.68rem', color: '#64748b', fontWeight: 600 }}>{cat.creatorCount.split(' ')[0]}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Carousel dots indicator */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '6px' }}>
            {[0, 1].map((idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setActiveCategoryIndex(idx)}
                aria-label={`Category page ${idx + 1}`}
                style={{
                  width: activeCategoryIndex === idx ? '22px' : '8px',
                  height: '8px',
                  borderRadius: '4px',
                  backgroundColor: activeCategoryIndex === idx ? '#e11d48' : '#cbd5e1',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.25s ease',
                }}
              />
            ))}
          </div>
        </section>

        {/* 5. UGC Video Gallery ("GET VIRAL UGC VIDEOS FOR YOUR BRAND") (Reference Image 2 Top) */}
        <section style={{ marginBottom: '56px' }}>
          <div style={{ textAlign: 'center', marginBottom: '30px' }}>
            <h2
              style={{
                fontSize: 'clamp(1.3rem, 2.5vw, 1.75rem)',
                fontWeight: 800,
                color: '#0f172a',
                letterSpacing: '-0.01em',
                margin: '0 0 6px',
              }}
            >
              GET VIRAL UGC VIDEOS FOR YOUR BRAND
            </h2>
            <p style={{ fontSize: '0.95rem', color: '#475569', margin: 0 }}>
              Have a look at some of the best creators that partner with RKM Advertising!
            </p>
          </div>

          {/* 6 Video Cards Grid (3x2 on desktop) */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
              gap: '22px',
            }}
          >
            {UGC_VIDEOS.map((video) => (
              <div
                key={video.id}
                onClick={() => setActiveVideoModal(video)}
                style={{
                  backgroundColor: '#ffffff',
                  borderRadius: '14px',
                  overflow: 'hidden',
                  boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
                  border: '1px solid #e2e8f0',
                  cursor: 'pointer',
                  transition: 'transform 0.25s ease, box-shadow 0.25s ease',
                  position: 'relative',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-6px)';
                  e.currentTarget.style.boxShadow = '0 12px 28px rgba(0,0,0,0.14)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.08)';
                }}
              >
                {/* 9:16 Video Thumbnail Container */}
                <div style={{ position: 'relative', width: '100%', height: '340px', backgroundColor: '#0f172a' }}>
                  <img
                    src={video.thumbnailUrl}
                    alt={video.title}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      display: 'block',
                    }}
                  />

                  {/* Gradient Overlays */}
                  <div
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      height: '70px',
                      background: 'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0) 100%)',
                      pointerEvents: 'none',
                    }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      height: '80px',
                      background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0) 100%)',
                      pointerEvents: 'none',
                    }}
                  />

                  {/* Top Branding Pill (matches user screenshot BookMyAd style) */}
                  <div
                    style={{
                      position: 'absolute',
                      top: '12px',
                      left: '12px',
                      right: '12px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                    }}
                  >
                    <div
                      style={{
                        width: '28px',
                        height: '28px',
                        borderRadius: '50%',
                        backgroundColor: '#ffffff',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '0.65rem',
                        fontWeight: 900,
                        color: '#e11d48',
                        border: '1.5px solid #e11d48',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.3)',
                      }}
                    >
                      RKM
                    </div>
                    <div style={{ color: '#ffffff', fontSize: '0.78rem', fontWeight: 700, textShadow: '0 1px 3px rgba(0,0,0,0.8)' }}>
                      {video.channelName}
                    </div>
                  </div>

                  {/* Center YouTube Play / Shorts Button (Red icon with white arrow) */}
                  <div
                    style={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                      width: '54px',
                      height: '42px',
                      backgroundColor: '#ff0000',
                      borderRadius: '12px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 4px 16px rgba(255,0,0,0.5)',
                      transition: 'transform 0.2s ease',
                    }}
                  >
                    <div
                      style={{
                        width: 0,
                        height: 0,
                        borderLeft: '14px solid #ffffff',
                        borderTop: '8px solid transparent',
                        borderBottom: '8px solid transparent',
                        marginLeft: '3px',
                      }}
                    />
                  </div>

                  {/* Bottom Share Icon & Views */}
                  <div
                    style={{
                      position: 'absolute',
                      bottom: '12px',
                      left: '12px',
                      right: '12px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      color: '#ffffff',
                      fontSize: '0.75rem',
                    }}
                  >
                    <div
                      style={{
                        width: '28px',
                        height: '28px',
                        borderRadius: '50%',
                        backgroundColor: 'rgba(0,0,0,0.5)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '0.85rem',
                      }}
                    >
                      ↗
                    </div>
                    <div style={{ fontWeight: 600, textShadow: '0 1px 3px rgba(0,0,0,0.8)' }}>
                      {video.views} • {video.duration}
                    </div>
                  </div>
                </div>

                {/* Card Title & Creator Info */}
                <div style={{ padding: '12px 14px 14px' }}>
                  <div style={{ fontSize: '0.72rem', color: '#e11d48', fontWeight: 700, textTransform: 'uppercase', marginBottom: '4px' }}>
                    {video.niche}
                  </div>
                  <div
                    style={{
                      fontSize: '0.85rem',
                      fontWeight: 700,
                      color: '#0f172a',
                      lineHeight: 1.35,
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                    }}
                  >
                    {video.title}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 6. Capabilities 6-Grid + "POWER UP with Influencer Magic!" Flyer (Reference Image 2 Bottom) */}
        <section
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '24px',
            alignItems: 'start',
            marginBottom: '60px',
          }}
        >
          {/* Left: 6 Capabilities Feature Cards in 2 columns */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))',
              gap: '16px',
            }}
          >
            {CAPABILITY_FEATURES.map((feat) => (
              <div
                key={feat.id}
                style={{
                  backgroundColor: '#ffffff',
                  borderRadius: '12px',
                  padding: '24px 20px',
                  boxShadow: '0 2px 10px rgba(0,0,0,0.04)',
                  border: '1px solid #e2e8f0',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                }}
              >
                {/* Red outline illustration icon */}
                <div
                  style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '10px',
                    backgroundColor: '#fff1f2',
                    border: '1.5px solid #fecdd3',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#e11d48',
                    fontSize: '1.4rem',
                    marginBottom: '12px',
                  }}
                >
                  {feat.id === 'network' && '🌐'}
                  {feat.id === 'matching' && '🤝'}
                  {feat.id === 'budget' && '💰'}
                  {feat.id === 'managed' && '📋'}
                  {feat.id === 'pricing' && '🏷️'}
                  {feat.id === 'strategy' && '🎯'}
                </div>

                <h3
                  style={{
                    fontSize: '0.95rem',
                    fontWeight: 800,
                    color: '#0f172a',
                    margin: '0 0 8px',
                  }}
                >
                  {feat.title}
                </h3>

                <p
                  style={{
                    fontSize: '0.8rem',
                    color: '#64748b',
                    lineHeight: 1.5,
                    margin: 0,
                  }}
                >
                  {feat.description}
                </p>
              </div>
            ))}
          </div>

          {/* Right: "POWER UP with Influencer Magic!" Flyer Box */}
          <div
            style={{
              backgroundColor: '#ffffff',
              borderRadius: '16px',
              padding: '28px 24px 20px',
              boxShadow: '0 8px 24px rgba(0,0,0,0.08)',
              border: '1.5px solid #cbd5e1',
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              position: 'relative',
            }}
          >
            <div style={{ fontSize: '0.82rem', fontWeight: 800, color: '#64748b', letterSpacing: '0.05em' }}>
              POWER UP
            </div>
            <h3
              style={{
                fontSize: '1.25rem',
                fontWeight: 900,
                color: '#e11d48',
                margin: '2px 0 16px',
              }}
            >
              with Influencer Magic!
            </h3>

            {/* Illustration graphic mockup with creators */}
            <div
              style={{
                width: '100%',
                maxWidth: '260px',
                margin: '0 auto 16px',
                borderRadius: '12px',
                overflow: 'hidden',
                border: '1px solid #f1f5f9',
                backgroundColor: '#f8fafc',
                padding: '12px',
              }}
            >
              <img
                src="https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=500&q=80"
                alt="Influencer Growth Stats"
                style={{ width: '100%', height: '120px', objectFit: 'cover', borderRadius: '8px', marginBottom: '8px' }}
              />
              <div style={{ display: 'flex', justifyContent: 'space-around', gap: '8px' }}>
                <div>
                  <div style={{ fontSize: '1.15rem', fontWeight: 900, color: '#e11d48' }}>30%</div>
                  <div style={{ fontSize: '0.68rem', color: '#64748b' }}>increase in conversion ratio</div>
                </div>
                <div>
                  <div style={{ fontSize: '1.15rem', fontWeight: 900, color: '#e11d48' }}>60%</div>
                  <div style={{ fontSize: '0.68rem', color: '#64748b' }}>increase in engagement</div>
                </div>
              </div>
            </div>

            {/* Red Headline Banner */}
            <div
              style={{
                backgroundColor: '#b91c1c',
                color: '#ffffff',
                width: '100%',
                padding: '8px 12px',
                fontWeight: 800,
                fontSize: '0.9rem',
                borderRadius: '4px',
                marginBottom: '14px',
              }}
            >
              Turn Influence into Sales.
            </div>

            {/* Follower Gain & Sales Stats */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-around',
                width: '100%',
                marginBottom: '20px',
              }}
            >
              <div>
                <div style={{ fontSize: '1.2rem', fontWeight: 900, color: '#0f172a' }}>20%</div>
                <div style={{ fontSize: '0.72rem', color: '#64748b' }}>follower gain</div>
              </div>
              <div>
                <div style={{ fontSize: '1.2rem', fontWeight: 900, color: '#0f172a' }}>15%</div>
                <div style={{ fontSize: '0.72rem', color: '#64748b' }}>increase in sales</div>
              </div>
            </div>

            {/* CTA Button */}
            <button
              type="button"
              onClick={() => setIsGetInTouchOpen(true)}
              style={{
                border: '1.5px solid #e11d48',
                backgroundColor: 'transparent',
                color: '#e11d48',
                padding: '8px 24px',
                borderRadius: '6px',
                fontSize: '0.85rem',
                fontWeight: 700,
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                marginBottom: '16px',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#e11d48';
                e.currentTarget.style.color = '#ffffff';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.color = '#e11d48';
              }}
            >
              Get In Touch now!
            </button>

            {/* Pagination dots below flyer */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: '6px' }}>
              {[0, 1, 2].map((idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setPromoSlide(idx)}
                  aria-label={`Promo slide ${idx + 1}`}
                  style={{
                    width: promoSlide === idx ? '22px' : '8px',
                    height: '8px',
                    borderRadius: '4px',
                    backgroundColor: promoSlide === idx ? '#e11d48' : '#cbd5e1',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'all 0.25s ease',
                  }}
                />
              ))}
            </div>
          </div>
        </section>

        {/* 7. Comprehensive Authority Content (Reference Image 3) */}
        <section
          style={{
            backgroundColor: '#ffffff',
            borderRadius: '16px',
            padding: '40px 32px',
            boxShadow: '0 4px 16px rgba(0,0,0,0.06)',
            border: '1px solid #e2e8f0',
            marginBottom: '40px',
          }}
        >
          {/* Section: Influencer Marketing with RKM Advertising */}
          <div style={{ marginBottom: '32px' }}>
            <h2
              style={{
                fontSize: '1.45rem',
                fontWeight: 800,
                color: '#0f172a',
                margin: '0 0 12px',
              }}
            >
              Influencer Marketing with RKM Advertising
            </h2>
            <p style={{ fontSize: '0.9rem', color: '#475569', lineHeight: 1.65, margin: 0 }}>
              Being India’s best Influencer Marketing company, we create successful social media campaigns with India’s top influencers on YouTube and Instagram at the best price. We work in collaboration with various Influencers, Top YouTube Influencers in India, and Top Instagram Influencers in India, who have a strong presence across various social media channels for providing our clients’ brands with the best results with Influencer Marketing. Expand your brand’s reach and engagement with authentic influencer-driven marketing strategies.
            </p>
          </div>

          {/* Section: Our influencer marketing solutions */}
          <div style={{ marginBottom: '36px' }}>
            <h2
              style={{
                fontSize: '1.35rem',
                fontWeight: 800,
                color: '#0f172a',
                margin: '0 0 18px',
              }}
            >
              Our influencer marketing solutions
            </h2>
            <p style={{ fontSize: '0.9rem', color: '#64748b', marginBottom: '16px' }}>
              We make influencer marketing stress-free for you. We manage all your Influencer Marketing requirements from end to end:
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
              <div style={{ background: '#f8fafc', padding: '16px 20px', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                <div style={{ fontWeight: 800, fontSize: '0.92rem', color: '#0f172a', marginBottom: '4px' }}>
                  YouTube Influencer Marketing
                </div>
                <div style={{ fontSize: '0.85rem', color: '#64748b', lineHeight: 1.5 }}>
                  Dedicated videos &amp; YouTube Shorts with 2,000+ expert YouTubers for maximum national and regional reach.
                </div>
              </div>

              <div style={{ background: '#f8fafc', padding: '16px 20px', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                <div style={{ fontWeight: 800, fontSize: '0.92rem', color: '#0f172a', marginBottom: '4px' }}>
                  Instagram Influencer Marketing
                </div>
                <div style={{ fontSize: '0.85rem', color: '#64748b', lineHeight: 1.5 }}>
                  Access 10,000+ creators across Nano, Micro, Macro &amp; Mega categories in 20+ genres &amp; 18+ Indian languages.
                </div>
              </div>

              <div style={{ background: '#f8fafc', padding: '16px 20px', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                <div style={{ fontWeight: 800, fontSize: '0.92rem', color: '#0f172a', marginBottom: '4px' }}>
                  Barter with Nano &amp; Micro Influencers
                </div>
                <div style={{ fontSize: '0.85rem', color: '#64748b', lineHeight: 1.5 }}>
                  Get authentic unboxings, testimonials &amp; product reviews from 20,000+ vetted Nano &amp; Micro influencers on gift/sample basis.
                </div>
              </div>

              <div style={{ background: '#f8fafc', padding: '16px 20px', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                <div style={{ fontWeight: 800, fontSize: '0.92rem', color: '#0f172a', marginBottom: '4px' }}>
                  Viral Meme Marketing
                </div>
                <div style={{ fontSize: '0.85rem', color: '#64748b', lineHeight: 1.5 }}>
                  Boost engagement &amp; go viral with 2,000+ top meme creators and community meme pages commanding millions of impressions.
                </div>
              </div>

              <div style={{ background: '#f8fafc', padding: '16px 20px', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                <div style={{ fontWeight: 800, fontSize: '0.92rem', color: '#0f172a', marginBottom: '4px' }}>
                  On-Demand UGC Creation
                </div>
                <div style={{ fontSize: '0.85rem', color: '#64748b', lineHeight: 1.5 }}>
                  High-converting unboxing, demonstration, and testimonial video assets ready for Meta Ads, Google Ads, and website landing pages.
                </div>
              </div>

              <div style={{ background: '#f8fafc', padding: '16px 20px', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                <div style={{ fontWeight: 800, fontSize: '0.92rem', color: '#0f172a', marginBottom: '4px' }}>
                  Celebrity Endorsements
                </div>
                <div style={{ fontSize: '0.85rem', color: '#64748b', lineHeight: 1.5 }}>
                  Build household credibility with top A-list Bollywood actors, sports icons, and regional celebrities across digital, OTT &amp; TV.
                </div>
              </div>
            </div>
          </div>

          {/* Section: How We Strategize Influencer Marketing Campaigns */}
          <div style={{ marginBottom: '36px' }}>
            <h2
              style={{
                fontSize: '1.35rem',
                fontWeight: 800,
                color: '#0f172a',
                margin: '0 0 16px',
              }}
            >
              How We Strategize Influencer Marketing Campaigns
            </h2>

            <div style={{ marginBottom: '16px' }}>
              <div style={{ fontWeight: 800, fontSize: '0.95rem', color: '#0f172a', marginBottom: '4px' }}>
                1. Selecting the Right Influencers
              </div>
              <p style={{ fontSize: '0.88rem', color: '#475569', lineHeight: 1.6, margin: 0 }}>
                Call <a href="tel:+919811447321" style={{ color: '#0284c7', fontWeight: 700, textDecoration: 'none' }}>+91 98114 47321</a> or fill out our contact form, and our influencer marketing experts will connect with you within 1–2 hours. We analyze your brand goals and craft a customized influencer marketing strategy with top Instagram, YouTube, LinkedIn, and Meta influencers for maximum engagement and ROI.
              </p>
            </div>

            <div style={{ marginBottom: '16px' }}>
              <div style={{ fontWeight: 800, fontSize: '0.95rem', color: '#0f172a', marginBottom: '4px' }}>
                2. Crafting Engaging Campaigns
              </div>
              <p style={{ fontSize: '0.88rem', color: '#475569', lineHeight: 1.6, margin: 0 }}>
                We create high-impact influencer campaigns that not only engage but also outshine competitors. Our personalized influencer marketing strategies ensure content that resonates, boosting brand interaction and conversions.
              </p>
            </div>

            <div>
              <div style={{ fontWeight: 800, fontSize: '0.95rem', color: '#0f172a', marginBottom: '6px' }}>
                3. Achieving Brand Success
              </div>
              <p style={{ fontSize: '0.88rem', color: '#475569', lineHeight: 1.6, margin: '0 0 10px' }}>
                Our influencer marketing platform amplifies brand awareness, leads, and sales through data-driven influencer marketing techniques. Partner with India’s top influencers and experience 10X brand reach, better ROI, and higher profits:
              </p>
              <ul style={{ margin: 0, paddingLeft: '22px', fontSize: '0.88rem', color: '#475569', lineHeight: 1.7 }}>
                <li>Consumers trust recommendations from influencers</li>
                <li>The continual organic growth of social media video</li>
                <li>Boost organic search traffic, brand recalls, and engagement</li>
                <li>Significantly more effective than traditional paid cold advertising</li>
                <li>Build your brand’s lasting authority and credibility</li>
              </ul>
            </div>
          </div>

          {/* Section: Be Our Celebrity Partners : */}
          <div
            style={{
              backgroundColor: '#fff7ed',
              borderRadius: '12px',
              padding: '24px 24px',
              border: '1px solid #ffedd5',
            }}
          >
            <h2
              style={{
                fontSize: '1.25rem',
                fontWeight: 800,
                color: '#9a3412',
                margin: '0 0 8px',
              }}
            >
              Be Our Celebrity Partners :
            </h2>
            <div style={{ fontSize: '0.92rem', color: '#7c2d12', fontWeight: 700, marginBottom: '6px' }}>
              Brands are built on trust, not just ads.
            </div>
            <p style={{ fontSize: '0.88rem', color: '#9a3412', lineHeight: 1.6, margin: '0 0 14px' }}>
              Without <strong>Influencer Marketing &amp; UGC (User-Generated Content)</strong>, your social media is just a collection of creatives—with no real emotional impact!
            </p>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                gap: '12px',
                marginBottom: '16px',
              }}
            >
              <div style={{ background: '#ffffff', padding: '10px 14px', borderRadius: '8px', border: '1px solid #fed7aa', fontWeight: 700, fontSize: '0.85rem', color: '#c2410c' }}>
                ✓ 30% boost in conversion rates
              </div>
              <div style={{ background: '#ffffff', padding: '10px 14px', borderRadius: '8px', border: '1px solid #fed7aa', fontWeight: 700, fontSize: '0.85rem', color: '#c2410c' }}>
                ✓ 60% rise in engagement
              </div>
              <div style={{ background: '#ffffff', padding: '10px 14px', borderRadius: '8px', border: '1px solid #fed7aa', fontWeight: 700, fontSize: '0.85rem', color: '#c2410c' }}>
                ✓ 20% follower growth
              </div>
              <div style={{ background: '#ffffff', padding: '10px 14px', borderRadius: '8px', border: '1px solid #fed7aa', fontWeight: 700, fontSize: '0.85rem', color: '#c2410c' }}>
                ✓ 15% increase in sales
              </div>
            </div>

            <p style={{ fontSize: '0.88rem', color: '#431407', fontWeight: 600, margin: '0 0 16px' }}>
              Choose the best influencers &amp; celebrities for your campaigns to increase your brand reach up to 10X. Let’s Influence Together!
            </p>

            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
              <a
                href="tel:+919811447321"
                style={{
                  backgroundColor: '#ea580c',
                  color: '#ffffff',
                  padding: '10px 22px',
                  borderRadius: '6px',
                  textDecoration: 'none',
                  fontSize: '0.88rem',
                  fontWeight: 700,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                }}
              >
                📞 Call Now: +91 98114 47321
              </a>
              <button
                type="button"
                onClick={() => setIsGetInTouchOpen(true)}
                style={{
                  backgroundColor: '#0f172a',
                  color: '#ffffff',
                  padding: '10px 22px',
                  borderRadius: '6px',
                  border: 'none',
                  fontSize: '0.88rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                }}
              >
                Request Custom Roster
              </button>
            </div>
          </div>
        </section>
      </div>

      {/* MODAL 1: Form Submitted Confirmation Modal */}
      {formSubmitted &&
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
                animation: 'fadeIn 0.25s ease',
              }}
            >
              <div
                style={{
                  width: '60px',
                  height: '60px',
                  borderRadius: '50%',
                  backgroundColor: '#dcfce7',
                  color: '#16a34a',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '2rem',
                  margin: '0 auto 16px',
                }}
              >
                ✓
              </div>
              <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#0f172a', margin: '0 0 8px' }}>
                Inquiry Received, {formData.firstName}!
              </h3>
              <p style={{ fontSize: '0.9rem', color: '#475569', lineHeight: 1.5, margin: '0 0 16px' }}>
                Our senior creator strategist is compiling a custom media kit and influencer shortlist for{' '}
                <strong>{formData.company || 'your brand'}</strong> in the <strong>{formData.niche}</strong> niche on{' '}
                <strong>{formData.platform}</strong>.
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
                <div><strong>Influencer Tier:</strong> {formData.tier}</div>
                <div><strong>Deliverable:</strong> {formData.lookingFor}</div>
                <div><strong>Campaign Goal:</strong> {formData.objective}</div>
                <div><strong>Turnaround:</strong> Within 1–2 Business Hours</div>
              </div>
              <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
                <a
                  href="tel:+919811447321"
                  style={{
                    backgroundColor: '#16a34a',
                    color: '#ffffff',
                    padding: '10px 20px',
                    borderRadius: '6px',
                    fontWeight: 700,
                    fontSize: '0.85rem',
                    textDecoration: 'none',
                  }}
                >
                  📞 Call Now
                </a>
                <button
                  type="button"
                  onClick={() => setFormSubmitted(false)}
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

      {/* MODAL 2: UGC Video Player & Creator Specimen Modal */}
      {activeVideoModal &&
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
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setActiveVideoModal(null)}
                aria-label="Close modal"
                style={{
                  position: 'absolute',
                  top: '12px',
                  right: '12px',
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  backgroundColor: '#ef4444',
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

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))' }}>
                {/* Visual Reel Preview */}
                <div style={{ position: 'relative', height: '360px', backgroundColor: '#000000' }}>
                  <img
                    src={activeVideoModal.thumbnailUrl}
                    alt={activeVideoModal.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      backgroundColor: 'rgba(0,0,0,0.3)',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#ffffff',
                    }}
                  >
                    <div
                      style={{
                        width: '64px',
                        height: '48px',
                        backgroundColor: '#ff0000',
                        borderRadius: '14px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: '10px',
                        boxShadow: '0 4px 16px rgba(255,0,0,0.6)',
                      }}
                    >
                      <div
                        style={{
                          width: 0,
                          height: 0,
                          borderLeft: '16px solid #ffffff',
                          borderTop: '10px solid transparent',
                          borderBottom: '10px solid transparent',
                          marginLeft: '4px',
                        }}
                      />
                    </div>
                    <div style={{ fontSize: '0.85rem', fontWeight: 700 }}>Creator Reel Demo</div>
                    <div style={{ fontSize: '0.72rem', color: '#cbd5e1' }}>{activeVideoModal.views}</div>
                  </div>
                </div>

                {/* Details */}
                <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#e11d48', textTransform: 'uppercase', marginBottom: '4px' }}>
                      {activeVideoModal.niche}
                    </div>
                    <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0f172a', margin: '0 0 10px', lineHeight: 1.3 }}>
                      {activeVideoModal.title}
                    </h3>
                    <div style={{ fontSize: '0.82rem', color: '#334155', marginBottom: '12px' }}>
                      <strong>Creator:</strong> {activeVideoModal.creatorName} ({activeVideoModal.channelName})
                    </div>
                    <p style={{ fontSize: '0.82rem', color: '#64748b', lineHeight: 1.55, margin: '0 0 16px' }}>
                      {activeVideoModal.description}
                    </p>
                  </div>

                  <div>
                    <button
                      type="button"
                      onClick={() => {
                        setActiveVideoModal(null);
                        setIsGetInTouchOpen(true);
                      }}
                      style={{
                        width: '100%',
                        backgroundColor: '#0f172a',
                        color: '#ffffff',
                        padding: '11px 16px',
                        borderRadius: '8px',
                        fontSize: '0.88rem',
                        fontWeight: 700,
                        border: 'none',
                        cursor: 'pointer',
                        marginBottom: '8px',
                      }}
                    >
                      Book Similar UGC Creator
                    </button>
                    <a
                      href="tel:+919811447321"
                      style={{
                        display: 'block',
                        textAlign: 'center',
                        fontSize: '0.8rem',
                        color: '#0284c7',
                        fontWeight: 700,
                        textDecoration: 'none',
                      }}
                    >
                      Or Call: +91 98114 47321
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>,
          document.body
        )}

      {/* MODAL 3: "Get In Touch Now!" Promo Modal */}
      {isGetInTouchOpen &&
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
                maxWidth: '460px',
                width: '100%',
                padding: '28px 24px',
                boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
                position: 'relative',
              }}
            >
              <button
                type="button"
                onClick={() => setIsGetInTouchOpen(false)}
                aria-label="Close"
                style={{
                  position: 'absolute',
                  top: '12px',
                  right: '12px',
                  width: '30px',
                  height: '30px',
                  borderRadius: '50%',
                  backgroundColor: '#ef4444',
                  color: '#ffffff',
                  border: 'none',
                  fontSize: '0.9rem',
                  fontWeight: 900,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                ✕
              </button>

              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', margin: '0 0 6px' }}>
                Power Up with Influencer Magic!
              </h3>
              <p style={{ fontSize: '0.85rem', color: '#64748b', margin: '0 0 16px' }}>
                Leave your details below and our creator partnership team will call you within 15 minutes.
              </p>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  alert('Thank you! Our influencer team will contact you shortly.');
                  setIsGetInTouchOpen(false);
                }}
              >
                <div style={{ marginBottom: '12px' }}>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#334155', marginBottom: '4px' }}>
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Enter your name"
                    style={{
                      width: '100%',
                      padding: '9px 12px',
                      borderRadius: '6px',
                      border: '1px solid #cbd5e1',
                      fontSize: '0.88rem',
                      boxSizing: 'border-box',
                    }}
                  />
                </div>

                <div style={{ marginBottom: '12px' }}>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#334155', marginBottom: '4px' }}>
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    style={{
                      width: '100%',
                      padding: '9px 12px',
                      borderRadius: '6px',
                      border: '1px solid #cbd5e1',
                      fontSize: '0.88rem',
                      boxSizing: 'border-box',
                    }}
                  />
                </div>

                <div style={{ marginBottom: '16px' }}>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#334155', marginBottom: '4px' }}>
                    Brand / Product Category
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. D2C Skincare, Fintech App, Fashion"
                    style={{
                      width: '100%',
                      padding: '9px 12px',
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
                    width: '100%',
                    backgroundColor: '#e11d48',
                    color: '#ffffff',
                    padding: '11px',
                    borderRadius: '6px',
                    fontSize: '0.9rem',
                    fontWeight: 800,
                    border: 'none',
                    cursor: 'pointer',
                  }}
                >
                  Submit &amp; Get Custom Shortlist
                </button>
              </form>
            </div>
          </div>,
          document.body
        )}
    </div>
  );
};
