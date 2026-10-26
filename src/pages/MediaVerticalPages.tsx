import React from 'react';
import { MediaVerticalTemplate } from '../components/layout/MediaVerticalTemplate';
import { MEDIA_VERTICALS } from '../data/mediaData';

export const RadioAdsPage: React.FC = () => {
  const vertical = MEDIA_VERTICALS.find((v) => v.id === 'radio') || MEDIA_VERTICALS[1];
  return <MediaVerticalTemplate vertical={vertical} />;
};

export const CinemaAdsPage: React.FC = () => {
  const vertical = MEDIA_VERTICALS.find((v) => v.id === 'cinema') || MEDIA_VERTICALS[2];
  return <MediaVerticalTemplate vertical={vertical} />;
};

export const TvAdsPage: React.FC = () => {
  const vertical = MEDIA_VERTICALS.find((v) => v.id === 'tv') || MEDIA_VERTICALS[3];
  return <MediaVerticalTemplate vertical={vertical} />;
};

export const OutdoorAdsPage: React.FC = () => {
  const vertical = MEDIA_VERTICALS.find((v) => v.id === 'outdoor') || MEDIA_VERTICALS[4];
  return <MediaVerticalTemplate vertical={vertical} />;
};

export const DigitalMarketingPage: React.FC = () => {
  const vertical = MEDIA_VERTICALS.find((v) => v.id === 'digital-marketing') || MEDIA_VERTICALS[5];
  return <MediaVerticalTemplate vertical={vertical} />;
};

export const InfluencerMarketingPage: React.FC = () => {
  const vertical = MEDIA_VERTICALS.find((v) => v.id === 'influencer') || MEDIA_VERTICALS[6];
  return <MediaVerticalTemplate vertical={vertical} />;
};

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
