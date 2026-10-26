import React from 'react';

export const FloatingActions: React.FC = () => {
  return (
    <div className="floating-actions" role="region" aria-label="Quick Support Actions">
      <a
        className="floating-btn call-btn"
        href="tel:+919878339302"
        title="Call RKM Ads Support: +91-9878339302"
        aria-label="Call +91-9878339302"
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
        </svg>
        <span className="btn-desktop-text">Call: +91-9878339302</span>
        <span className="btn-mobile-text">Call Us</span>
      </a>
      <a
        className="floating-btn wa-btn"
        href="https://wa.me/919878339302"
        target="_blank"
        rel="noopener noreferrer"
        title="Chat on WhatsApp"
        aria-label="Chat on WhatsApp"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.63C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.04 14.69 2 12.04 2M12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.15 12.04 20.15C10.56 20.15 9.11 19.76 7.85 19L7.55 18.83L4.43 19.65L5.26 16.61L5.06 16.29C4.24 14.99 3.81 13.47 3.81 11.91C3.81 7.37 7.5 3.67 12.05 3.67M9.11 7.44C8.95 7.44 8.7 7.5 8.48 7.74C8.26 7.97 7.65 8.55 7.65 9.71C7.65 10.87 8.5 11.99 8.62 12.15C8.74 12.31 10.27 14.66 12.63 15.68C14.6 16.53 15 16.36 15.43 16.32C15.86 16.28 16.82 15.75 17.02 15.19C17.22 14.63 17.22 14.15 17.16 14.05C17.1 13.95 16.94 13.89 16.7 13.77C16.46 13.65 15.28 13.07 15.06 12.99C14.84 12.91 14.68 12.87 14.52 13.11C14.36 13.35 13.9 13.89 13.76 14.05C13.62 14.21 13.48 14.23 13.24 14.11C13 13.99 12.03 13.67 10.89 12.65C10 11.86 9.4 10.88 9.24 10.64C9.08 10.4 9.22 10.27 9.34 10.15C9.45 10.04 9.59 9.86 9.71 9.72C9.83 9.58 9.87 9.48 9.95 9.32C10.03 9.16 9.99 9.02 9.93 8.9C9.87 8.78 9.41 7.64 9.21 7.18C9.02 6.72 8.82 6.78 8.68 6.78C8.54 6.78 8.38 6.78 8.22 6.78L9.11 7.44Z" />
        </svg>
        <span className="btn-desktop-text">Chat on WhatsApp</span>
        <span className="btn-mobile-text">WhatsApp</span>
      </a>
    </div>
  );
};
