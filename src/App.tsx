import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { BookingProvider } from './context/BookingContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { FloatingActions } from './components/layout/FloatingActions';

// Pages
import { HomePage } from './pages/HomePage';
import { BookAdPage } from './pages/BookAdPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { TrackAdPage } from './pages/TrackAdPage';
import { RateCardsPage } from './pages/RateCardsPage';
import { NewspaperAdsPage } from './pages/NewspaperAdsPage';
import {
  RadioAdsPage,
  CinemaAdsPage,
  TvAdsPage,
  OutdoorAdsPage,
  DigitalMarketingPage,
  DigitalPrPage,
  InfluencerMarketingPage,
  TransitMediaPage,
  LiftBrandingPage,
  OttAdvertisingPage,
  ProgrammaticAdsPage,
} from './pages/MediaVerticalPages';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { TermsPage } from './pages/TermsPage';

// ScrollToTop and Route Indicator on route transition
const RouteTransitionHandler: React.FC = () => {
  const { pathname, search } = useLocation();

  useEffect(() => {
    // Immediate scroll to top
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });

    // Top progress bar micro-animation - deliberate, slower cadence
    const bar = document.getElementById('route-progress-bar');
    if (bar) {
      bar.style.opacity = '1';
      bar.style.width = '20%';

      const t1 = setTimeout(() => {
        if (bar) bar.style.width = '60%';
      }, 250);

      const t2 = setTimeout(() => {
        if (bar) bar.style.width = '100%';
      }, 650);

      const t3 = setTimeout(() => {
        if (bar) {
          bar.style.opacity = '0';
          setTimeout(() => {
            if (bar) bar.style.width = '0%';
          }, 600);
        }
      }, 1050);

      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
        clearTimeout(t3);
      };
    }
  }, [pathname, search]);

  // Global Intersection Observer for scroll-reveal animations across all pages
  useEffect(() => {
    // Small timeout to allow new DOM content to mount after route switch
    const timer = setTimeout(() => {
      // Auto-tag major sections, cards, and grids if not already tagged
      const targets = document.querySelectorAll(
        '.reveal-on-scroll, section:not(.hero):not(.sec-pad), .card, .step, .faq-item, .service-metric-card, .pub-badge, .media-vertical-section, .proof-stage, .config-panel'
      );

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-revealed');
              // Optional: unobserve once revealed for performance
              observer.unobserve(entry.target);
            }
          });
        },
        {
          threshold: 0.1,
          rootMargin: '0px 0px -40px 0px',
        }
      );

      targets.forEach((el) => {
        if (!el.classList.contains('reveal-on-scroll')) {
          el.classList.add('reveal-on-scroll');
        }
        // If element is already in initial viewport on page load, reveal it right away
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight - 50) {
          el.classList.add('is-revealed');
        } else {
          observer.observe(el);
        }
      });

      return () => {
        observer.disconnect();
      };
    }, 60);

    return () => clearTimeout(timer);
  }, [pathname, search]);

  return null;
};


// Animated Content Wrapper per route
const AnimatedRoutes: React.FC = () => {
  const location = useLocation();

  return (
    <div key={location.pathname} className="page-transition-wrapper flex-1">
      <Routes location={location}>
        <Route path="/" element={<HomePage />} />
        <Route path="/book-ad" element={<BookAdPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/track-ad" element={<TrackAdPage />} />
        <Route path="/rate-cards" element={<RateCardsPage />} />

        {/* Media Vertical Pages */}
        <Route path="/newspaper-ads" element={<NewspaperAdsPage />} />
        <Route path="/radio-ads" element={<RadioAdsPage />} />
        <Route path="/cinema-ads" element={<CinemaAdsPage />} />
        <Route path="/tv-ads" element={<TvAdsPage />} />
        <Route path="/outdoor-ads" element={<OutdoorAdsPage />} />
        <Route path="/digital-marketing" element={<DigitalMarketingPage />} />
        <Route path="/digital marketing" element={<Navigate to="/digital-marketing" replace />} />
        <Route path="/digital%20marketing" element={<Navigate to="/digital-marketing" replace />} />
        <Route path="/digital-pr" element={<DigitalPrPage />} />
        <Route path="/influencer-marketing" element={<InfluencerMarketingPage />} />
        <Route path="/transit-media" element={<TransitMediaPage />} />
        <Route path="/lift-branding" element={<LiftBrandingPage />} />
        <Route path="/ott-advertising" element={<OttAdvertisingPage />} />
        <Route path="/programmatic-ads" element={<ProgrammaticAdsPage />} />

        {/* Institutional & Legal Pages */}
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/terms" element={<TermsPage />} />

        {/* Catch-all redirect */}
        <Route path="*" element={<HomePage />} />
      </Routes>
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <BookingProvider>
      <Router>
        {/* Top Progress Bar for page navigation */}
        <div id="route-progress-bar" style={{ width: '0%', opacity: 0 }} />
        <RouteTransitionHandler />
        <Navbar />
        <AnimatedRoutes />
        <Footer />
        <FloatingActions />
      </Router>
    </BookingProvider>
  );
};

export default App;

