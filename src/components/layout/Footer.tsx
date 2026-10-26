import React from 'react';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  return (
    <footer>
      <div className="wrap">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 mb-9 text-left">
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="logo" style={{ marginBottom: '12px', color: '#FFF' }}>
              RKM Ads<span>.</span>
            </div>
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
            <Link to="/newspaper-ads">Classified Text</Link>
            <Link to="/newspaper-ads">Classified Display</Link>
            <Link to="/newspaper-ads">Display Ads</Link>
            <Link to="/rate-cards">Tariff Cards</Link>
          </div>
          <div>
            <h4 style={{ font: '600 13px var(--head)', letterSpacing: '.12em', textTransform: 'uppercase', color: '#FFF', marginBottom: '14px' }}>
              Other Media
            </h4>
            <Link to="/radio-ads">Radio FM</Link>
            <Link to="/cinema-ads">Cinema Screen</Link>
            <Link to="/tv-ads">Television Ads</Link>
            <Link to="/outdoor-ads">Outdoor &amp; DOOH</Link>
          </div>
          <div>
            <h4 style={{ font: '600 13px var(--head)', letterSpacing: '.12em', textTransform: 'uppercase', color: '#FFF', marginBottom: '14px' }}>
              Services
            </h4>
            <Link to="/digital-marketing">Digital PR</Link>
            <Link to="/digital-marketing">Google Ads</Link>
            <Link to="/track-ad">Track Booking</Link>
            <Link to="/book-ad">Book Online</Link>
          </div>
          <div>
            <h4 style={{ font: '600 13px var(--head)', letterSpacing: '.12em', textTransform: 'uppercase', color: '#FFF', marginBottom: '14px' }}>
              Company
            </h4>
            <Link to="/about">About Us</Link>
            <Link to="/contact">Contact Us</Link>
            <Link to="/terms">Terms &amp; Policies</Link>
            <Link to="/terms#refunds">Refund Policy</Link>
          </div>
        </div>
        <div style={{ borderTop: '1px solid rgba(255,255,255,.1)', paddingTop: '20px', fontSize: '13px', opacity: 0.65, display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
          <span>© 2026 RKM Ads / BookMyAd Clone. INS Accredited Agency. Sector 58, Noida, UP, India.</span>
          <span>Mon–Sat: 10:00 AM – 7:00 PM IST</span>
        </div>
      </div>
    </footer>
  );
};
