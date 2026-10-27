export interface InfluencerCategory {
  id: string;
  name: string;
  iconType: string;
  emoji: string;
  platforms: ('instagram' | 'youtube' | 'tiktok' | 'linkedin')[];
  creatorCount: string;
  avgEngagement: string;
}

export interface UgcVideoCreator {
  id: string;
  channelName: string;
  title: string;
  creatorName: string;
  niche: string;
  thumbnailUrl: string;
  duration: string;
  views: string;
  embedSnippet?: string;
  description: string;
}

export interface CapabilityFeature {
  id: string;
  title: string;
  description: string;
  iconName: string;
}

export const INFLUENCER_CATEGORIES: InfluencerCategory[] = [
  {
    id: 'fitness',
    name: 'Fitness Influencers',
    iconType: 'fitness',
    emoji: '🏋️‍♀️',
    platforms: ['instagram', 'youtube'],
    creatorCount: '2,400+ Creators',
    avgEngagement: '4.8% ER',
  },
  {
    id: 'comedy',
    name: 'Comedy Influencers',
    iconType: 'comedy',
    emoji: '🎭',
    platforms: ['instagram', 'youtube'],
    creatorCount: '3,100+ Creators',
    avgEngagement: '6.2% ER',
  },
  {
    id: 'technology',
    name: 'Technology Influencers',
    iconType: 'tech',
    emoji: '💡',
    platforms: ['instagram', 'youtube'],
    creatorCount: '1,800+ Creators',
    avgEngagement: '5.1% ER',
  },
  {
    id: 'automobile',
    name: 'Automobile Influencers',
    iconType: 'auto',
    emoji: '🚗',
    platforms: ['instagram', 'youtube'],
    creatorCount: '950+ Creators',
    avgEngagement: '4.4% ER',
  },
  {
    id: 'beauty',
    name: 'Beauty Influencers',
    iconType: 'beauty',
    emoji: '💄',
    platforms: ['instagram', 'youtube'],
    creatorCount: '4,500+ Creators',
    avgEngagement: '5.9% ER',
  },
  {
    id: 'education',
    name: 'Education Influencers',
    iconType: 'education',
    emoji: '🎓',
    platforms: ['instagram', 'youtube'],
    creatorCount: '1,200+ Creators',
    avgEngagement: '4.1% ER',
  },
  {
    id: 'food',
    name: 'Food & Culinary',
    iconType: 'food',
    emoji: '🍔',
    platforms: ['instagram', 'youtube'],
    creatorCount: '2,900+ Creators',
    avgEngagement: '5.4% ER',
  },
  {
    id: 'travel',
    name: 'Travel & Lifestyle',
    iconType: 'travel',
    emoji: '✈️',
    platforms: ['instagram', 'youtube'],
    creatorCount: '3,400+ Creators',
    avgEngagement: '5.7% ER',
  },
  {
    id: 'gaming',
    name: 'Gaming & Esports',
    iconType: 'gaming',
    emoji: '🎮',
    platforms: ['youtube', 'instagram'],
    creatorCount: '1,650+ Creators',
    avgEngagement: '6.8% ER',
  },
  {
    id: 'finance',
    name: 'Finance & FinTech',
    iconType: 'finance',
    emoji: '📈',
    platforms: ['youtube', 'instagram', 'linkedin'],
    creatorCount: '880+ Creators',
    avgEngagement: '4.6% ER',
  },
];

export const UGC_VIDEOS: UgcVideoCreator[] = [
  {
    id: 'ugc-1',
    channelName: 'RKM_Change of Name Ad',
    title: 'How Easy It Is to Publish a Name Change Ad in Times of India',
    creatorName: 'Ananya Sharma',
    niche: 'Government Gazette & Name Change',
    thumbnailUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
    duration: '0:48',
    views: '142K Views',
    description: 'Creator explains how RKM Advertising handled her passport name change ad seamlessly across 2 major newspapers with certified doorstep tearsheets in under 24 hours.',
  },
  {
    id: 'ugc-2',
    channelName: 'RKM_Lost and Found Ad',
    title: 'Lost Property Documents? Here is How to Publish Legally Fast!',
    creatorName: 'Priya Iyer',
    niche: 'Legal Notice & Public Ads',
    thumbnailUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80',
    duration: '0:54',
    views: '98K Views',
    description: 'Detailed walkthrough on lost original property deeds, FIR filing, and running official notices in English and regional dailies via RKM Advertising.',
  },
  {
    id: 'ugc-3',
    channelName: 'RKM_Digital PR Distribution',
    title: 'How Our Startup Got Featured on Moneycontrol & LiveMint',
    creatorName: 'Rohan Mehra',
    niche: 'Digital PR & Startup Growth',
    thumbnailUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
    duration: '0:58',
    views: '260K Views',
    description: 'Tech founder explains how guaranteed press release distribution by RKM Advertising skyrocketed their search authority, Google News indexing, and investor inquiries.',
  },
  {
    id: 'ugc-4',
    channelName: 'RKM_Matrimonial Ads',
    title: 'Finding the Right Match: Sunday Matrimonial Newspaper Hacks',
    creatorName: 'Simran Walia',
    niche: 'Matrimonial & Community',
    thumbnailUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=600&q=80',
    duration: '0:42',
    views: '115K Views',
    description: 'Tips for drafting an effective matrimonial classified with box number privacy in Hindustan Times, Punjab Kesari, and Amar Ujala with discounted package rates.',
  },
  {
    id: 'ugc-5',
    channelName: 'RKM_Services Overview',
    title: '360° Media Agency: Print, Radio, Cinema & Digital in One Place',
    creatorName: 'Kavita Patel',
    niche: 'Brand Marketing & PR',
    thumbnailUrl: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&w=600&q=80',
    duration: '1:02',
    views: '320K Views',
    description: 'Brand consultant reviews RKM Advertising’s cross-channel media buying, highlighting lowest INS card rates, single-window billing, and fast turnaround.',
  },
  {
    id: 'ugc-6',
    channelName: 'RKM_Radio Advertising',
    title: 'Mirchi, Red FM, Big FM: Why Radio Jingles Still Print Money',
    creatorName: 'Arjun Singhania',
    niche: 'Retail & Local Advertising',
    thumbnailUrl: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=600&q=80',
    duration: '0:50',
    views: '185K Views',
    description: 'Retail chain founder explains how prime-time RJ mentions and synchronized spot radio ads brought massive footfall to their 5 city store launches.',
  },
];

export const CAPABILITY_FEATURES: CapabilityFeature[] = [
  {
    id: 'network',
    title: 'Influencer Network',
    description: 'We access over 14 Mil + Influencers Globally with 2.5 Mil + in India and a strong footprint in local languages',
    iconName: 'network',
  },
  {
    id: 'matching',
    title: 'Influencer Matching',
    description: 'We use algorithmic data to match relevant influencers basis category, brand, persona, objective & cost efficiency',
    iconName: 'matching',
  },
  {
    id: 'budget',
    title: 'Budget Distribution',
    description: 'We help marketers smartly allocate platform wise budgets for each campaign to maximize return on ad spend',
    iconName: 'budget',
  },
  {
    id: 'managed',
    title: 'Fully Managed',
    description: 'The campaigns are managed end to end from planning, content moderation, finance management to detailed live reporting',
    iconName: 'managed',
  },
  {
    id: 'pricing',
    title: 'Pricing Leverage',
    description: 'Unique pricing advantage on influencer pricing due to high repeat business, long-standing creator relations and volume scale',
    iconName: 'pricing',
  },
  {
    id: 'strategy',
    title: 'Content Strategy',
    description: 'We design winning content strategy basis the latest trends for brand category, social platform & conversion objective.',
    iconName: 'strategy',
  },
];
