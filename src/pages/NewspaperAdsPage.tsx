import React from 'react';
import { MediaVerticalTemplate } from '../components/layout/MediaVerticalTemplate';
import { MEDIA_VERTICALS } from '../data/mediaData';

export const NewspaperAdsPage: React.FC = () => {
  const vertical = MEDIA_VERTICALS.find((v) => v.id === 'newspaper') || MEDIA_VERTICALS[0];
  return <MediaVerticalTemplate vertical={vertical} />;
};
