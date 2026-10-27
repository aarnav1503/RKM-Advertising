export interface OutdoorSite {
  id: string;
  title: string;
  city: string;
  state: string;
  area: string;
  mediaType: string;
  dimensions: string;
  illumination: 'Front Lit' | 'Back Lit' | 'Digital LED' | 'Non-Lit';
  dailyFootfall: string;
  ratePerMonth: string;
  image: string;
  status: 'Available' | 'High Demand' | 'Available Soon';
  authorityClearance: string;
  visibilityScore: number;
}

export interface OutdoorFormat {
  id: string;
  title: string;
  tagline: string;
  description: string;
  specs: string;
  avgCost: string;
  idealFor: string;
  reach: string;
  iconName: string;
  image: string;
  popular?: boolean;
}

export const OUTDOOR_MEDIA_TYPES = [
  'Highway Billboard / Unipole',
  'Digital DOOH Screen',
  'Metro Train & Station Branding',
  'Bus Queue Shelter (BQS)',
  'Mall Atrium & Retail DOOH',
  'Airport Totem & Departure Gantry',
  'Commercial Building Wrap',
  'Skywalk & Road Overbridge (ROB) Gantry'
] as const;

export const ILLUMINATION_OPTIONS = [
  'Front Lit (Halogen / LED Floodlight)',
  'Back Lit (Internal Glow Box)',
  'Non-Lit (Daylight / Ambient)',
  'Digital LED (Dynamic Video DOOH)',
  'Solar Powered Lit'
] as const;

export const BUDGET_OPTIONS = [
  'Below ₹50,000',
  '₹50,000 - ₹1,50,000',
  '₹1,50,000 - ₹3,00,000',
  '₹3,00,000 - ₹5,00,000',
  '₹5,00,000 - ₹10,00,000',
  '₹10,00,000+'
] as const;

export const OUTDOOR_FORMATS: OutdoorFormat[] = [
  {
    id: 'highway-unipoles',
    title: 'Highway Unipoles & Massive Billboards',
    tagline: 'High-speed vehicular visibility across key national highways and expressway junctions',
    description: 'Gigantic, structurally certified monopoles erected on high-density vehicular corridors. Elevated 60+ feet above highway grade, visible up to 600m away.',
    specs: 'Sizes: 40x20 ft, 60x30 ft, 80x40 ft • Heavy 380 GSM UV-treated PVC flex',
    avgCost: '₹45,000 - ₹1,80,000 / month',
    idealFor: 'Automobile launches, FMCG branding, Real Estate, Tier-1 consumer campaigns',
    reach: '250,000+ daily motorists',
    iconName: 'Maximize2',
    image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=800&q=80',
    popular: true
  },
  {
    id: 'digital-dooh',
    title: 'Digital Out-of-Home (DOOH) LED Networks',
    tagline: 'Programmatic, high-brightness screens in premier malls, tech parks, and downtown squares',
    description: 'Ultra-high-definition P4 outdoor LED screens running dayparted video loops. Instantly update creatives, sync with weather/live triggers, and target specific rush hours.',
    specs: '10s - 15s HD video slot • 800+ rotations/day • Remote cloud CMS schedule',
    avgCost: '₹18,000 - ₹75,000 / screen / mo',
    idealFor: 'D2C brands, Tech SaaS, FinTech, Entertainment OTT releases, Apparel',
    reach: '180,000+ affluent shoppers & tech workforce',
    iconName: 'Tv',
    image: 'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?auto=format&fit=crop&w=800&q=80',
    popular: true
  },
  {
    id: 'metro-media',
    title: 'Metro Rail Wraps & Station Network',
    tagline: 'Captive audience targeting across Delhi Metro (DMRC), Mumbai Metro, and Bengaluru Namma Metro',
    description: 'Dominate urban daily commuters through exterior full-train vinyl wraps, interior panel clusters, concourse turnstile branding, and illuminated pillar takeovers.',
    specs: 'Station pillar wraps, back-lit duratrans, 6-coach exterior train vinyl',
    avgCost: '₹35,000 - ₹2,50,000 / package',
    idealFor: 'EdTech, Mobile Apps, Banking, Consumer Electronics, Recruitment',
    reach: '850,000+ daily urban transit commuters',
    iconName: 'TrainTrack',
    image: 'https://images.unsplash.com/photo-1474487548417-781cb71495f3?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'bus-shelters',
    title: 'Bus Queue Shelters (BQS) & Street Furniture',
    tagline: 'Hyperlocal neighborhood street-level impact in premier residential and retail belts',
    description: 'Internally illuminated back-lit bus shelters positioned right at eye level of pedestrians and slow-moving vehicular traffic at red lights and stops.',
    specs: '20x5 ft double-sided back-lit lightbox • Polycarbonate shatterproof face',
    avgCost: '₹15,000 - ₹40,000 / shelter / mo',
    idealFor: 'Local retail, Hospitals, Schools, Food Delivery, Supermarkets',
    reach: '95,000+ daily neighbourhood impressions',
    iconName: 'Bus',
    image: 'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'airport-totems',
    title: 'Airport Digital Totems & Baggage Belt Brandings',
    tagline: 'Premium reach targeting corporate decision-makers, HNI travelers, and tourists',
    description: 'High-end static lightboxes and 4K digital totem video kiosks at security check-in, departure lounges, aerobridges, and arrival baggage carousels.',
    specs: '85" 4K interactive digital kiosks • Premium backlit fabric tension frame',
    avgCost: '₹85,000 - ₹4,50,000 / month',
    idealFor: 'Luxury luxury goods, B2B enterprise, Premium real estate, Wealth management',
    reach: '120,000+ high net-worth travelers',
    iconName: 'Plane',
    image: 'https://images.unsplash.com/photo-1530521954074-e64f6810b32d?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'flyover-gantries',
    title: 'Flyover & Skywalk Road Gantries',
    tagline: '100% head-on uninterrupted view spanning across all traffic lanes on major expressways',
    description: 'Unmissable cantilever and dual-pillar gantries spanning across 4 to 8 vehicular lanes directly overhead with high-intensity automated night LED floodlights.',
    specs: 'Sizes: 50x8 ft, 60x10 ft overhead structural steel • 4-lamp floodlights',
    avgCost: '₹60,000 - ₹2,20,000 / month',
    idealFor: 'Mass awareness, Political announcements, Mega sales, Brand equity',
    reach: '320,000+ daily commuter vehicles',
    iconName: 'Compass',
    image: 'https://images.unsplash.com/photo-1542051841857-5f90071e7989?auto=format&fit=crop&w=800&q=80'
  }
];

export const OUTDOOR_SITES: OutdoorSite[] = [
  {
    id: 'site-delhi-dnd',
    title: 'DND Flyway Expressway Mega Unipole',
    city: 'Delhi NCR',
    state: 'Delhi',
    area: 'Noida Toll Plaza Junction (Facing Delhi Traffic)',
    mediaType: 'Highway Billboard / Unipole',
    dimensions: '60 x 30 ft (1,800 sq.ft)',
    illumination: 'Front Lit',
    dailyFootfall: '240,000+ Vehicles',
    ratePerMonth: '₹1,25,000',
    image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=600&q=80',
    status: 'Available',
    authorityClearance: 'NOIDA Authority & MCD Cleared',
    visibilityScore: 98
  },
  {
    id: 'site-mumbai-weh',
    title: 'Western Express Highway (WEH) Cantilever Gantry',
    city: 'Mumbai',
    state: 'Maharashtra',
    area: 'Near Domestic Airport Flyover, Vile Parle East',
    mediaType: 'Highway Billboard / Unipole',
    dimensions: '50 x 25 ft (1,250 sq.ft)',
    illumination: 'Back Lit',
    dailyFootfall: '380,000+ Vehicles',
    ratePerMonth: '₹1,95,000',
    image: 'https://images.unsplash.com/photo-1542051841857-5f90071e7989?auto=format&fit=crop&w=600&q=80',
    status: 'High Demand',
    authorityClearance: 'BMC & MMRDA Certified',
    visibilityScore: 99
  },
  {
    id: 'site-bengaluru-orr',
    title: 'Outer Ring Road (ORR) Digital LED P4 Screen',
    city: 'Bengaluru',
    state: 'Karnataka',
    area: 'Bellandur EcoSpace Tech Park Junction',
    mediaType: 'Digital DOOH Screen',
    dimensions: '30 x 15 ft Curved 4K LED',
    illumination: 'Digital LED',
    dailyFootfall: '190,000+ Tech Professionals',
    ratePerMonth: '₹85,000',
    image: 'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?auto=format&fit=crop&w=600&q=80',
    status: 'Available',
    authorityClearance: 'BBMP Municipal Licensed',
    visibilityScore: 97
  },
  {
    id: 'site-solan-mall-road',
    title: 'Mall Road Junction Heritage Unipole',
    city: 'Solan',
    state: 'Himachal Pradesh',
    area: 'Old DC Office Chowk & Circular Mall Road',
    mediaType: 'Highway Billboard / Unipole',
    dimensions: '30 x 15 ft (450 sq.ft)',
    illumination: 'Front Lit',
    dailyFootfall: '48,000+ Tourists & Locals',
    ratePerMonth: '₹32,000',
    image: 'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&w=600&q=80',
    status: 'Available',
    authorityClearance: 'Municipal Corporation Solan Approved',
    visibilityScore: 96
  },
  {
    id: 'site-hyderabad-cyber',
    title: 'HITEC City Cyber Towers Digital DOOH Totem Cluster',
    city: 'Hyderabad',
    state: 'Telangana',
    area: 'Cyber Gateway & Inorbit Mall Approach Road',
    mediaType: 'Digital DOOH Screen',
    dimensions: '20 x 10 ft Ultra-Bright DOOH Dual-Screen',
    illumination: 'Digital LED',
    dailyFootfall: '165,000+ Daily Footfall',
    ratePerMonth: '₹72,000',
    image: 'https://images.unsplash.com/photo-1530521954074-e64f6810b32d?auto=format&fit=crop&w=600&q=80',
    status: 'Available',
    authorityClearance: 'GHMC Approved',
    visibilityScore: 95
  },
  {
    id: 'site-chandigarh-tribune',
    title: 'Tribune Chowk Grand Road Overbridge Gantry',
    city: 'Chandigarh',
    state: 'Chandigarh / Punjab',
    area: 'Dakshin Marg & Purv Marg Intersect',
    mediaType: 'Skywalk & Road Overbridge (ROB) Gantry',
    dimensions: '55 x 12 ft (660 sq.ft)',
    illumination: 'Back Lit',
    dailyFootfall: '140,000+ Vehicles',
    ratePerMonth: '₹58,000',
    image: 'https://images.unsplash.com/photo-1542051841857-5f90071e7989?auto=format&fit=crop&w=600&q=80',
    status: 'Available Soon',
    authorityClearance: 'Municipal Corporation Chandigarh',
    visibilityScore: 94
  }
];

export const OUTDOOR_FAQS = [
  {
    q: 'How does the Outdoor Media Planner consultation process work?',
    a: 'Once you submit the consult form, our Senior OOH Planner reviews your media type, city, site quantity, and budget. Within 15-30 minutes, you receive a tailored campaign deck containing live GPS coordinates, high-resolution site photographs, daytime/nighttime visibility angles, footfall analytics, and exact commercial quotation.'
  },
  {
    q: 'Are all municipality taxes and billboard licenses included in the quotation?',
    a: 'Yes, 100%. All RKM Ads outdoor media installations are strictly licensed with respective municipal bodies (MCD, BMC, BBMP, GHMC, etc.). All municipal advertisement taxes, structural stability engineer certificates, and electrical clearances are fully compliant and covered in your contract.'
  },
  {
    q: 'Who manages printing, mounting, and night lighting maintenance?',
    a: 'RKM Ads provides turnkey end-to-end campaign execution. We utilize heavy 380-420 GSM frontlit/backlit UV-curable vinyl flex with in-house large format printing, certified crane mounting crews, and automated astronomical timer switches guaranteeing 6-8 hours of uninterrupted night lighting.'
  },
  {
    q: 'How do I verify that my billboard is installed and illuminated properly?',
    a: 'We provide comprehensive proof of execution: high-resolution geo-tagged, timestamped daytime and nighttime inspection photos within 24 hours of installation, followed by bi-weekly physical audit monitoring reports throughout your campaign lifecycle.'
  },
  {
    q: 'What is the minimum duration required to book an outdoor campaign?',
    a: 'Standard traditional unipoles and hoardings are booked for 15 days, 1 month, or quarterly. For Digital DOOH screens, flexible slots can be scheduled from 3 days for weekend promotional blitzes up to annual long-term brand presence.'
  }
];
