export interface PrPublicationOption {
  id: string;
  name: string;
  tier: 'STARTER' | 'STANDARD' | 'ADVANCED';
  price: number;
  domainAuthority: number;
  turnaround: string;
  language: string;
  hasDisclaimer: boolean;
  sampleUrl?: string;
}

export interface PrDistributionPackage {
  id: string;
  name: 'SILVER' | 'GOLD' | 'DIAMOND';
  subtitle: string;
  isPopular?: boolean;
  mediaCount: string;
  features: string[];
  startingPrice?: number;
}

export const STARTER_PUBLICATIONS: PrPublicationOption[] = [
  {
    id: 'starter-1',
    name: 'The Print (Brand & Business Story)',
    tier: 'STARTER',
    price: 14500,
    domainAuthority: 84,
    turnaround: '48 Hrs',
    language: 'English',
    hasDisclaimer: true,
  },
  {
    id: 'starter-2',
    name: 'Dailyhunt News Syndication Feature',
    tier: 'STARTER',
    price: 4900,
    domainAuthority: 78,
    turnaround: '24-48 Hrs',
    language: 'Multi-lingual',
    hasDisclaimer: false,
  },
  {
    id: 'starter-3',
    name: 'Mid-day Online Spotlight',
    tier: 'STARTER',
    price: 15500,
    domainAuthority: 83,
    turnaround: '48-72 Hrs',
    language: 'English',
    hasDisclaimer: true,
  },
  {
    id: 'starter-4',
    name: 'ABP Live Hindi / Bengali Edition',
    tier: 'STARTER',
    price: 12000,
    domainAuthority: 86,
    turnaround: '48 Hrs',
    language: 'Hindi / Bengali',
    hasDisclaimer: true,
  },
  {
    id: 'starter-5',
    name: 'Zee News Digital Corporate Feature',
    tier: 'STARTER',
    price: 16000,
    domainAuthority: 88,
    turnaround: '48-72 Hrs',
    language: 'Hindi / English',
    hasDisclaimer: true,
  },
  {
    id: 'starter-6',
    name: 'Outlook India Spotlight Hub',
    tier: 'STARTER',
    price: 18000,
    domainAuthority: 87,
    turnaround: '48 Hrs',
    language: 'English',
    hasDisclaimer: true,
  },
];

export const STANDARD_PUBLICATIONS: PrPublicationOption[] = [
  {
    id: 'std-1',
    name: 'All - ABP English with Disclaimer (16800 INR)',
    tier: 'STANDARD',
    price: 32200,
    domainAuthority: 87,
    turnaround: '48-72 Hrs',
    language: 'English',
    hasDisclaimer: true,
  },
  {
    id: 'std-2',
    name: 'Hindustan Times Tech & Brand Chronicle',
    tier: 'STANDARD',
    price: 28500,
    domainAuthority: 91,
    turnaround: '48-72 Hrs',
    language: 'English',
    hasDisclaimer: true,
  },
  {
    id: 'std-3',
    name: 'LiveMint Brand Story & Market Feature',
    tier: 'STANDARD',
    price: 36000,
    domainAuthority: 90,
    turnaround: '48-72 Hrs',
    language: 'English',
    hasDisclaimer: true,
  },
  {
    id: 'std-4',
    name: 'The Hindu Business Line Corporate Voice',
    tier: 'STANDARD',
    price: 38000,
    domainAuthority: 88,
    turnaround: '48-72 Hrs',
    language: 'English',
    hasDisclaimer: true,
  },
  {
    id: 'std-5',
    name: 'Zee Business Online Executive Story',
    tier: 'STANDARD',
    price: 26000,
    domainAuthority: 86,
    turnaround: '48-72 Hrs',
    language: 'English / Hindi',
    hasDisclaimer: true,
  },
  {
    id: 'std-6',
    name: 'BW Businessworld Feature',
    tier: 'STANDARD',
    price: 29500,
    domainAuthority: 82,
    turnaround: '48 Hrs',
    language: 'English',
    hasDisclaimer: false,
  },
  {
    id: 'std-7',
    name: 'Outlook Money Brand Column',
    tier: 'STANDARD',
    price: 27000,
    domainAuthority: 85,
    turnaround: '48-72 Hrs',
    language: 'English',
    hasDisclaimer: true,
  },
];

export const ADVANCED_PUBLICATIONS: PrPublicationOption[] = [
  {
    id: 'adv-1',
    name: 'Forbes India Brand Voice Premium Story',
    tier: 'ADVANCED',
    price: 125000,
    domainAuthority: 92,
    turnaround: '3-5 Days',
    language: 'English',
    hasDisclaimer: true,
  },
  {
    id: 'adv-2',
    name: 'Entrepreneur India / Entrepreneur.com Feature',
    tier: 'ADVANCED',
    price: 68000,
    domainAuthority: 91,
    turnaround: '3-4 Days',
    language: 'English',
    hasDisclaimer: true,
  },
  {
    id: 'adv-3',
    name: 'The Week Magazine Online Feature',
    tier: 'ADVANCED',
    price: 49000,
    domainAuthority: 87,
    turnaround: '48-72 Hrs',
    language: 'English',
    hasDisclaimer: false,
  },
  {
    id: 'adv-4',
    name: 'Economic Times Brand Equity / Online Spotlight',
    tier: 'ADVANCED',
    price: 89000,
    domainAuthority: 93,
    turnaround: '3-5 Days',
    language: 'English',
    hasDisclaimer: true,
  },
  {
    id: 'adv-5',
    name: 'Business Standard Leadership Column',
    tier: 'ADVANCED',
    price: 58000,
    domainAuthority: 89,
    turnaround: '48-72 Hrs',
    language: 'English',
    hasDisclaimer: true,
  },
  {
    id: 'adv-6',
    name: 'Fortune India Executive Perspective',
    tier: 'ADVANCED',
    price: 95000,
    domainAuthority: 90,
    turnaround: '3-5 Days',
    language: 'English',
    hasDisclaimer: true,
  },
];

export const PR_DISTRIBUTION_PACKAGES: PrDistributionPackage[] = [
  {
    id: 'pkg-silver',
    name: 'SILVER',
    subtitle: 'Pocket Friendly',
    mediaCount: '50+ Media',
    features: [
      'Distribution / PR Syndication on 50 + Media / News Sites',
      'Inclusions in News Aggregators Google News, Daily Hunt etc.',
      'Regional Options Include Hindi Press Release, Gujrati, Bengali, Sites.',
      'Great for basic news dissemination.',
      'Good for Small Business with best ROI.',
      'Excellent for brand awareness and building basic online visibility.',
      'Ideal for Rudimentary Digital foot Print.',
    ],
    startingPrice: 15000,
  },
  {
    id: 'pkg-gold',
    name: 'GOLD',
    subtitle: 'Massive Exposure',
    isPopular: true,
    mediaCount: '100+ Media',
    features: [
      'Distribution / PR Syndication on 100 + Media / News Sites',
      'Inclusions in News Aggregators Google News, Daily Hunt etc.',
      'Multiple Syndication options available',
      'Best For Disseminating Corporate Announcements',
      'Excellent for MSME enterprises',
      'Perfect for corporate announcements or product launch',
      'Ideal for high visibility of your brand',
    ],
    startingPrice: 32000,
  },
  {
    id: 'pkg-diamond',
    name: 'DIAMOND',
    subtitle: 'Maximum Impact',
    mediaCount: '125+ Media',
    features: [
      'Distribution / PR Syndication on 125 + Media / News Sites',
      'Multiple syndications options available through ANI/PTI',
      'Best way to reach national level media',
      'Inclusions in Business Standard, Live mint, Zee Business etc.',
      'Perfect for major news dissemination pre, post event announcements',
      'Get chance to be published in premium new sites',
      'Multiple Syndication options available',
    ],
    startingPrice: 65000,
  },
];

export const PR_FEATURED_LOGOS = [
  { name: 'moneycontrol', label: 'moneycontrol', color: '#00833E' },
  { name: 'Business Line', label: 'The Hindu Business Line', color: '#0F4B81' },
  { name: 'Outlook MONEY', label: 'Outlook MONEY', color: '#E11D48' },
  { name: 'BW BUSINESSWORLD', label: 'BW BUSINESSWORLD', color: '#0284C7' },
  { name: 'Entrepreneur', label: 'Entrepreneur', color: '#111827' },
  { name: 'ZEEBUSINESS', label: 'ZEEBUSINESS', color: '#D97706' },
  { name: 'Hindustan Times', label: 'Hindustan Times', color: '#0284C7' },
  { name: 'LiveMint', label: 'LiveMint', color: '#EA580C' },
  { name: 'The Print', label: 'The Print', color: '#DC2626' },
  { name: 'Forbes India', label: 'Forbes India', color: '#1E293B' },
];
