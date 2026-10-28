import React from 'react';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  return (
    <footer>
      <div className="wrap">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 mb-9 text-left">
          <div className="sm:col-span-2 lg:col-span-1">
            <Link to="/" className="logo" style={{ marginBottom: '12px', color: '#FFF', textDecoration: 'none' }}>
              <img
                src="/rkm-logo.png"
                alt="RKM Advertising Logo"
                className="logo-img"
                style={{ height: '36px', width: 'auto' }}
              />
              <span className="logo-text">
                RKM Ads<span className="logo-dot">.</span>
              </span>
            </Link>
            <p style={{ fontSize: '14px', opacity: 0.75, lineHeight: 1.6 }}>
              INS Accredited online advertisement agency for newspapers, radio, television, cinema and out-of-home media across India.
            </p>
            <div style={{ marginTop: '16px', fontSize: '15px', fontWeight: 600 }}>
              Helpline: <a href="tel:+919878339302" style={{ color: 'var(--accent)' }}>+91-9878339302</a>
            </div>
          </div>
          <div>
            <h4 style={{ font: '600 13px var(--head)', letterSpacing: '.12em', textTransform: 'uppercase', color: '#FFF', marginBottom: '14px' }}>
              Newspapers
            </h4>
            <div className="flex flex-col space-y-1">
              <Link to="/newspaper-ads" className="footer-link">Classified Text</Link>
              <Link to="/newspaper-ads" className="footer-link">Classified Display</Link>
              <Link to="/newspaper-ads" className="footer-link">Display Ads</Link>
              <Link to="/rate-cards" className="footer-link">Tariff Cards</Link>
            </div>
          </div>
          <div>
            <h4 style={{ font: '600 13px var(--head)', letterSpacing: '.12em', textTransform: 'uppercase', color: '#FFF', marginBottom: '14px' }}>
              Other Media
            </h4>
            <div className="flex flex-col space-y-1">
              <Link to="/radio-ads" className="footer-link">Radio FM</Link>
              <Link to="/cinema-ads" className="footer-link">Cinema Screen</Link>
              <Link to="/tv-ads" className="footer-link">Television Ads</Link>
              <Link to="/outdoor-ads" className="footer-link">Outdoor &amp; DOOH</Link>
            </div>
          </div>
          <div>
            <h4 style={{ font: '600 13px var(--head)', letterSpacing: '.12em', textTransform: 'uppercase', color: '#FFF', marginBottom: '14px' }}>
              Services
            </h4>
            <div className="flex flex-col space-y-1">
              <Link to="/digital-pr" className="footer-link">Digital PR</Link>
              <Link to="/digital-marketing" className="footer-link">Google Ads</Link>
              <Link to="/track-ad" className="footer-link">Track Booking</Link>
              <Link to="/book-ad" className="footer-link">Book Online</Link>
            </div>
          </div>
          <div>
            <h4 style={{ font: '600 13px var(--head)', letterSpacing: '.12em', textTransform: 'uppercase', color: '#FFF', marginBottom: '14px' }}>
              Company
            </h4>
            <div className="flex flex-col space-y-1">
              <Link to="/about" className="footer-link">About Us</Link>
              <Link to="/contact" className="footer-link">Contact Us</Link>
              <Link to="/terms" className="footer-link">Terms &amp; Policies</Link>
              <Link to="/terms#refunds" className="footer-link">Refund Policy</Link>
            </div>
          </div>
        </div>
        <div className="w-full" style={{ borderTop: '1px solid rgba(255,255,255,.1)', paddingTop: '20px' }}>
          <div style={{ fontSize: '13px', opacity: 0.7, display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px', alignItems: 'center' }}>
            <span>© 2026 RKM Ads. INS Accredited Agency. Sector 58, Noida, UP, India.</span>
            <span>Mon–Sat: 10:00 AM – 7:00 PM IST</span>
          </div>
          <div className="footer-credit-bar">
            <span className="footer-credit-text">
              Designed with <span className="footer-credit-heart" aria-label="love">❤️</span> by{' '}
              <a
                href="https://pocketsitestudio.in/"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-credit-link"
                title="PocketSite Studio — Handcrafted Websites"
              >
                PocketSite Studio
              </a>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
