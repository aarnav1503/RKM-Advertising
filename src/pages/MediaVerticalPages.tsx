import React from 'react';
import { MediaVerticalTemplate } from '../components/layout/MediaVerticalTemplate';
import { MEDIA_VERTICALS } from '../data/mediaData';

export { RadioAdsPage } from './RadioAdsPage';
export { CinemaAdsPage } from './CinemaAdsPage';
export { TvAdsPage } from './TvAdsPage';

export const OutdoorAdsPage: React.FC = () => {
  const vertical = MEDIA_VERTICALS.find((v) => v.id === 'outdoor') || MEDIA_VERTICALS[4];
  return <MediaVerticalTemplate vertical={vertical} />;
};

export { DigitalMarketingPage } from './DigitalMarketingPage';
export { DigitalPrPage } from './DigitalPrPage';
export { InfluencerMarketingPage } from './InfluencerMarketingPage';

export const TransitMediaPage: React.FC = () => {
  const vertical = MEDIA_VERTICALS.find((v) => v.id === 'transit') || MEDIA_VERTICALS[7];
  return <MediaVerticalTemplate vertical={vertical} />;
};

export const LiftBrandingPage: React.FC = () => {
  const vertical = MEDIA_VERTICALS.find((v) => v.id === 'lift') || MEDIA_VERTICALS[8];
  return <MediaVerticalTemplate vertical={vertical} />;
};

export const OttAdvertisingPage: React.FC = () => {
  const vertical = MEDIA_VERTICALS.find((v) => v.id === 'ott') || MEDIA_VERTICALS[9];
  return <MediaVerticalTemplate vertical={vertical} />;
};

export const ProgrammaticAdsPage: React.FC = () => {
  const vertical = MEDIA_VERTICALS.find((v) => v.id === 'programmatic') || MEDIA_VERTICALS[10];
  return <MediaVerticalTemplate vertical={vertical} />;
};
