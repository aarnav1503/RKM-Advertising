import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
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
  InfluencerMarketingPage,
  TransitMediaPage,
  LiftBrandingPage,
  OttAdvertisingPage,
  ProgrammaticAdsPage,
} from './pages/MediaVerticalPages';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { TermsPage } from './pages/TermsPage';

// ScrollToTop on route transition
const ScrollToTop: React.FC = () => {
  const { pathname, search } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname, search]);

  return null;
};

export const App: React.FC = () => {
  return (
    <BookingProvider>
      <Router>
        <ScrollToTop />
        <Navbar />
        <Routes>
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
        <Footer />
        <FloatingActions />
      </Router>
    </BookingProvider>
  );
};

export default App;
