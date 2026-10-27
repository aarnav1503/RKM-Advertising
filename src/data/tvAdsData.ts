export interface TvAdType {
  id: string;
  name: string;
  badge: string;
  description: string;
  formatDetails: string;
  mockupImage: string;
  tickerText?: string;
}

export interface TvBenefit {
  id: string;
  title: string;
  subtitle: string;
  iconName: string;
}

export interface TvAdExample {
  id: string;
  title: string;
  network: string;
  format: string;
  imageUrl: string;
  description: string;
}

export const TV_AD_TYPES: TvAdType[] = [
  {
    id: 'scrollers',
    name: 'Scrollers Ads',
    badge: 'Ticker / Aston Band',
    description:
      'Scrollers are ads that appear in a scrolling format, moving across the screen from one end to the other. They only support text and are commonly seen on News Channels.',
    formatDetails: 'Continuous text band at screen bottom, 45-60 character messages, 100% active visibility during live breaking news broadcasts.',
    mockupImage: 'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?auto=format&fit=crop&w=700&q=80',
    tickerText: 'AD HERE IS RUNNING LIVE • BOOK YOUR TV SCROLLER WITH RKM ADVERTISING • CALL +91 98114 47321',
  },
  {
    id: 'teleshopping',
    name: 'Teleshopping Ads',
    badge: 'Infomercial Programs',
    description:
      'Teleshopping ads are pre-recorded programs that are aired on TV when fewer people are watching. They can range from 10 to 30 minutes in length.',
    formatDetails: 'Long-form product demonstration, call-to-order phone overlays, high-converting slots on regional and national entertainment channels.',
    mockupImage: 'https://images.unsplash.com/photo-1593784991095-a205069470b6?auto=format&fit=crop&w=700&q=80',
  },
  {
    id: 'regular-fct',
    name: 'Regular- FCT Ads',
    badge: 'Free Commercial Time',
    description:
      "These are the common video ad that plays during the breaks and intervals. It's the most popular ad format and also attracts the audience towards your brand.",
    formatDetails: '10s, 20s, 30s prime-time commercial slots, maximum emotional brand storytelling, high frequency during mega sports and serials.',
    mockupImage: 'https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?auto=format&fit=crop&w=700&q=80',
  },
];

export const TV_BENEFITS: TvBenefit[] = [
  {
    id: 'large-audience',
    title: 'Large Audience',
    subtitle: 'Over 210 Million TV Households across urban and rural India',
    iconName: 'audience',
  },
  {
    id: 'most-effective',
    title: 'Most Effective',
    subtitle: 'Proven highest ROI, mass awareness and immediate brand recall',
    iconName: 'effective',
  },
  {
    id: 'full-screen',
    title: 'Full Screen',
    subtitle: '100% full-screen video impact with no competing banners or feeds',
    iconName: 'fullscreen',
  },
  {
    id: 'build-trust',
    title: 'Build Trust',
    subtitle: 'Consumers perceive TV advertised brands as authentic market leaders',
    iconName: 'trust',
  },
  {
    id: 'improve-sales',
    title: 'Improve Sales',
    subtitle: 'Immediate surge in retail inquiries, website visits, and distributor sign-ups',
    iconName: 'sales',
  },
];

export const TV_AD_EXAMPLES: TvAdExample[] = [
  {
    id: 'ex-1',
    title: 'Prime Time Anchor Split Screen & Side L-Band',
    network: 'National News Channel',
    format: 'Split Screen Ad',
    imageUrl: 'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?auto=format&fit=crop&w=600&q=80',
    description: 'Split screen commercial running simultaneously while the prime-time news anchor delivers headline updates, ensuring zero channel surfing.',
  },
  {
    id: 'ex-2',
    title: 'Celebrity Brand Endorsement 30s FCT Spot',
    network: 'General Entertainment (GEC)',
    format: 'Full Screen Video Spot',
    imageUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
    description: 'High-impact 30-second commercial spot featuring celebrity brand ambassador during prime-time soap operas and weekend reality shows.',
  },
  {
    id: 'ex-3',
    title: 'Studio Co-Sponsorship & Desk Logo Branding',
    network: 'Business & Financial News',
    format: 'Studio Integration',
    imageUrl: 'https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?auto=format&fit=crop&w=600&q=80',
    description: 'Integrated branding on anchor video walls, news desk placards, and digital backdrop panels during market opening bells.',
  },
  {
    id: 'ex-4',
    title: 'Regional News Ticker & Factory Showcase',
    network: 'Regional State Network',
    format: 'Continuous Ticker Ad',
    imageUrl: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=600&q=80',
    description: 'State-wide regional language ticker message running across the lower third of the screen with contact helpline and distributor callouts.',
  },
  {
    id: 'ex-5',
    title: 'Live Press Conference Aston Band Placement',
    network: 'Hindi & English News',
    format: 'Aston Band Banner',
    imageUrl: 'https://images.unsplash.com/photo-1526470608268-f674ce90ebd4?auto=format&fit=crop&w=600&q=80',
    description: 'Animated 10-second lower band appearing over live government press briefings and election news coverage with high viewer concentration.',
  },
  {
    id: 'ex-6',
    title: 'Prime-Time Debate Panel Multi-Window Ad',
    network: 'National News Debate',
    format: 'Debate Split Ad',
    imageUrl: 'https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?auto=format&fit=crop&w=600&q=80',
    description: 'Synchronized brand showcase on the debate screen frame while 4 panelists discuss hot national topics at 9:00 PM.',
  },
  {
    id: 'ex-7',
    title: 'Breaking News Bulletin "News at a Glance" Tag',
    network: '24x7 News Channel',
    format: 'Program Sponsorship Tag',
    imageUrl: 'https://images.unsplash.com/photo-1586339949916-3e9457bef6d3?auto=format&fit=crop&w=600&q=80',
    description: '5-second title sponsorship sting ("News at a Glance Powered By...") played before and after fast-paced headline updates.',
  },
  {
    id: 'ex-8',
    title: '3D Product Pop-up Graphic Over Live Show',
    network: 'Regional Entertainment',
    format: '3D Aston Pop-up',
    imageUrl: 'https://images.unsplash.com/photo-1593784991095-a205069470b6?auto=format&fit=crop&w=600&q=80',
    description: 'Eye-catching 3D animated product package rising from the bottom corner during popular serials with sound cue.',
  },
  {
    id: 'ex-9',
    title: 'Long-Form Teleshopping Infomercial Demonstration',
    network: 'Teleshopping / Afternoon Slots',
    format: 'Teleshopping Program',
    imageUrl: 'https://images.unsplash.com/photo-1556740758-90de374c12ad?auto=format&fit=crop&w=600&q=80',
    description: '15-minute live studio product unboxing and demonstration program with direct toll-free ordering callouts and payment on delivery.',
  },
];
