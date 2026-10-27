import { MediaVerticalInfo } from '../types';

export const MEDIA_VERTICALS: MediaVerticalInfo[] = [
  {
    id: 'newspaper',
    title: 'Newspaper Advertising Across India',
    shortTitle: 'Newspapers (Print)',
    slug: 'newspaper-ads',
    tagline: 'Direct INS-accredited rates across 150+ regional & national dailies with live newsprint column simulator.',
    description: 'Book Classified Text (ROD), Classified Display (CD), and Commercial Display (Quarter/Half/Full Page, Jackets) in English, Hindi, and vernacular dailies with verified digital e-Tearsheet delivery.',
    badge: 'Core Funnel • 150+ Dailies',
    startingPrice: '₹ 450 per ad',
    reach: '85M+ Daily Readers',
    heroImage: 'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?auto=format&fit=crop&w=1200&q=80',
    benefits: [
      'Authentic BroadSheet simulator with instant line/word count meter',
      'Dual Tariff billing engine for per-line (TOI) vs per-word (Jagran/HT)',
      'Verified digital e-Tearsheet page proof download with authorized GST invoice',
      'Daily 3:00 PM cut-off scheduler with live countdown timer'
    ],
    formats: [
      {
        title: 'Classified Text (ROD)',
        description: 'Run-on-line textual notices charged per word or 5 lines. Standard for matrimonials, change of name, and lost & found.',
        rate: 'From ₹ 450',
        specs: 'Text with optional Bold, Highlight Background & Border',
        popular: true,
      },
      {
        title: 'Classified Display (CD)',
        description: 'Custom boxed ads with border, logos, and custom typography placed in dedicated classified broadsheet columns.',
        rate: 'From ₹ 1,200',
        specs: 'Single column (3.8 cm) or double column (7.8 cm), Color / B&W',
      },
      {
        title: 'Commercial Display',
        description: 'Large impact page spreads on Page 1, Page 3, Front-page jackets, half and full broadsheet pages for maximum brand reach.',
        rate: 'From ₹ 12,000',
        specs: 'Quarter page (16x25 cm), Half page (33x25 cm), Full page (33x52 cm)',
      }
    ],
    partners: ['The Times of India', 'Hindustan Times', 'Dainik Jagran', 'Amar Ujala', 'The Hindu', 'Dainik Bhaskar', 'The Economic Times', 'Navbharat Times'],
    faqs: [
      {
        question: 'What is the daily deadline cut-off time for newspaper ads?',
        answer: 'Most national and regional dailies enforce a strict 3:00 PM daily cut-off for publication in the next morning’s edition. Sunday matrimonial deadlines close on Friday 3:00 PM.'
      },
      {
        question: 'How do I obtain proof that my newspaper ad was printed?',
        answer: 'RKM Ads provides an authorized high-resolution digital e-Tearsheet scanned from the morning edition with your specific notice highlighted, available on the Track Ad portal by 9:00 AM on the day of release.'
      },
      {
        question: 'Are name change affidavits mandatory?',
        answer: 'Yes, as per Indian Newspaper Society (INS) and Ministry of Home Affairs guidelines, name change notices require a signed and notarized affidavit issued within the last 6 months.'
      }
    ]
  },
  {
    id: 'radio',
    title: 'Radio FM Advertising in 100+ Cities',
    shortTitle: 'Radio FM',
    slug: 'radio-ads',
    tagline: 'High-frequency 10s–30s audio commercials, RJ mentions, and sponsored shows across premier FM stations.',
    description: 'Drive high-recall hyper-local campaigns across tier-1, tier-2, and tier-3 Indian cities with prime morning (8–11 AM) and evening (5–9 PM) commute drive-time slots.',
    badge: '100+ Cities • 45M Listeners',
    startingPrice: '₹ 25 / sec',
    reach: '45M+ Daily Commuters',
    heroImage: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=1200&q=80',
    benefits: [
      'Commercial spots on Radio Mirchi, Red FM, Big FM, Radio City, Fever 104',
      'Endorsements and live conversational on-air mentions by top celebrity RJs',
      'Studio creative scriptwriting, professional voiceover casting & sound engineering included',
      'Electronic telecast certificates (RO logs) verifying spot broadcast accuracy'
    ],
    formats: [
      {
        title: 'Prime Time Spots (Drive-Time)',
        description: 'Morning 8:00 AM - 11:00 AM & Evening 5:00 PM - 9:00 PM peak in-car and office commuter audience.',
        rate: 'From ₹ 45 / sec',
        specs: '10s, 15s, 20s or 30s audio wav commercial',
        popular: true,
      },
      {
        title: 'Non-Prime & Afternoon Bands',
        description: 'Midday and late-night frequency builder packages with 60% lower cost-per-second.',
        rate: 'From ₹ 18 / sec',
        specs: '10s to 30s audio spots distributed across daytime',
      },
      {
        title: 'RJ Mentions & Studio Visits',
        description: 'Host endorsement where celebrity RJ chats about your product during flagship radio shows.',
        rate: 'From ₹ 4,500 / mention',
        specs: '45–60s organic conversation + studio social media tag',
      }
    ],
    partners: ['Radio Mirchi 98.3', 'Red FM 93.5', 'Big FM 92.7', 'Radio City 91.1', 'Fever 104 FM', 'Radio One 94.3', 'Radio Nasha 107.2'],
    faqs: [
      {
        question: 'Do you help produce the voiceover and audio commercial?',
        answer: 'Yes! RKM Ads provides end-to-end studio scriptwriting, native Hindi/English/regional voiceover artists, and full sound mixing at zero extra charge with multi-spot packages.'
      },
      {
        question: 'What is the minimum campaign duration for radio?',
        answer: 'We recommend a minimum 5 to 7 day campaign with 8–10 spots per day to build effective ad recall in your target city.'
      }
    ]
  },
  {
    id: 'cinema',
    title: 'Cinema Screen & Multiplex Advertising',
    shortTitle: 'Cinema Screens',
    slug: 'cinema-ads',
    tagline: 'Captive, distraction-free 70mm big-screen video and audio commercials in Dolby Atmos.',
    description: 'Reach high-disposable-income urban moviegoers across national multiplex giants (PVR INOX, Cinepolis, Wave, MovieMax) before blockbuster Bollywood and Hollywood screenings.',
    badge: '3,800+ Screens • Zero Ad-Block',
    startingPrice: '₹ 3,500 / screen / week',
    reach: '18M+ Monthly Viewers',
    heroImage: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=1200&q=80',
    benefits: [
      'Guaranteed 100% captive attention with zero skip buttons or tabs',
      'Massive 70mm canvas with Dolby Surround 7.1 and Dolby Atmos sound',
      'Target blockbuster releases (Marvel, Khan, South blockbusters) or specific audi classes',
      'Foyer digital kiosks, sampling counters, and popcorn box branding combos'
    ],
    formats: [
      {
        title: 'On-Screen Video Commercials (10–30s)',
        description: 'High-definition video commercials played with house lights dimmed just before film start.',
        rate: 'From ₹ 4,200 / screen / wk',
        specs: '2K / 4K DCP format, 5.1 / 7.1 sound, 10s to 30s duration',
        popular: true,
      },
      {
        title: 'Mute / Audio Digital Slide Ads',
        description: 'Cost-effective high-res static slide displayed during theater entry and 10-minute intermission.',
        rate: 'From ₹ 1,800 / screen / wk',
        specs: '1920x1080 JPEG/DCP slide with 10s display interval',
      },
      {
        title: 'Foyer Standees & Kiosk Sampling',
        description: 'Physical touchpoints in ticket lounges, concessions lobby, and seat backrests.',
        rate: 'From ₹ 12,000 / theater / wk',
        specs: '6x3 ft backlit standees, couponing, product sampling counters',
      }
    ],
    partners: ['PVR INOX', 'Cinepolis', 'MovieMax', 'Miraj Cinemas', 'Wave Cinemas', 'Carnival Cinemas', 'Mukta A2'],
    faqs: [
      {
        question: 'What is DCP conversion and is it mandatory for cinema ads?',
        answer: 'Yes, movie theaters use Digital Cinema Package (DCP) encrypted servers. RKM Ads converts your MP4 video into certified theatrical DCP at subsidized rates.'
      },
      {
        question: 'Can I choose specific multiplex locations near my retail store?',
        answer: 'Absolutely. You can select individual malls, screens, or entire regional multiplex clusters down to single auditorium screens.'
      }
    ]
  },
  {
    id: 'tv',
    title: 'Television (TV) Commercial Broadcast',
    shortTitle: 'Television (TV)',
    slug: 'tv-ads',
    tagline: 'Mass-reach commercial spots on national news debates, regional entertainment GECs, and sports broadcasts.',
    description: 'Broadcast 10s–30s TV commercial spots (TVCs), Aston bands, L-bands, and live ticker sponsorships on Aaj Tak, NDTV, Republic TV, Star Plus, Zee TV, Sony, and Sun TV.',
    badge: '275+ Channels • 200M Households',
    startingPrice: '₹ 150 / 10s spot',
    reach: '200M+ TV Households',
    heroImage: '/images/television-broadcast.png',
    benefits: [
      'Unrivaled household brand authority and legitimacy across India',
      'Target prime-time 8:00 PM - 11:00 PM debate shows and family serials',
      'Unintrusive Aston bands and L-bands during live breaking news and cricket matches',
      'BARC ratings and certified telecast logs provided for every transmission'
    ],
    formats: [
      {
        title: 'Standard Commercial Spot (TVC)',
        description: '10s, 20s, or 30s video commercial running during regular scheduled ad breaks.',
        rate: 'From ₹ 350 / 10s',
        specs: '1080p broadcast HD MXF / MP4 format with EBU R128 audio compliance',
        popular: true,
      },
      {
        title: 'L-Band & Aston Band Graphics',
        description: 'Non-disruptive 10-second graphical banner overlay appearing on the lower third during live programming.',
        rate: 'From ₹ 600 / band',
        specs: 'Static or animated alpha-channel graphic overlay',
      },
      {
        title: 'Sponsored Segments & Debate Tickers',
        description: 'Exclusively "Powered By" title sponsorships on prime-time 9 PM news debates and weather updates.',
        rate: 'From ₹ 25,000 / day',
        specs: 'Anchor mention, logo bug watermarking & 2 TVC spots',
      }
    ],
    partners: ['Aaj Tak', 'India TV', 'NDTV 24x7', 'Republic Bharat', 'Star Plus', 'Zee News', 'Sony Entertainment', 'Sun TV', 'ABP News'],
    faqs: [
      {
        question: 'Do television commercials require CBFC certification?',
        answer: 'Yes, advertisements broadcast on Indian satellite television require approval from the Advertising Standards Council of India (ASCI) and channel standards & practices (S&P).'
      }
    ]
  },
  {
    id: 'outdoor',
    title: 'Outdoor & DOOH Billboard Advertising',
    shortTitle: 'Outdoor & DOOH',
    slug: 'outdoor-ads',
    tagline: 'High-impact highway unipoles, illuminated hoardings, metro station wraps, and digital LED totems.',
    description: 'Dominate urban skylines, high-traffic arterial junction corridors, toll plazas, and landmark shopping avenues across Delhi NCR, Mumbai, Bengaluru, Hyderabad, and Tier-1 hubs.',
    badge: '250+ Premium Sites • Geotagged Audits',
    startingPrice: '₹ 25,000 / month',
    reach: '2.5M+ Daily Vehicular Eyeballs',
    heroImage: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1200&q=80',
    benefits: [
      'Front-lit and back-lit heavy gauge PVC vinyl billboard fabrication',
      'Digital LED billboards with dayparted video loops and remote CMS updates',
      'Night-time illumination with automated timers and security maintenance',
      'Independent geotagged timestamped physical audit photos every 15 days'
    ],
    formats: [
      {
        title: 'Highway Unipoles & Billboards',
        description: 'Oversized highway and junction hoardings visible from 500 meters at 60 km/h.',
        rate: 'From ₹ 45,000 / mo',
        specs: '40x20 ft, 60x30 ft, or 80x40 ft front-lit heavy vinyl',
        popular: true,
      },
      {
        title: 'Digital Out-of-Home (DOOH) Totems',
        description: 'High-brightness P4/P6 LED digital screens at mall entrances, tech parks, and traffic lights.',
        rate: 'From ₹ 15,000 / screen / mo',
        specs: '10s animated video loop, 800+ impressions per day',
      },
      {
        title: 'Metro Pillars & Station Brandings',
        description: 'Series of sequential illuminated metro rail pillars and turnstile gate brandings.',
        rate: 'From ₹ 28,000 / 5 pillars',
        specs: 'Illuminated back-lit polycarbonate wraps',
      }
    ],
    partners: ['Delhi Metro (DMRC)', 'Mumbai Metro', 'NHAI Highway Corridors', 'Cyber Hub Gurugram', 'Bandra-Worli Sea Link', 'Outer Ring Road Bengaluru'],
    faqs: [
      {
        question: 'Who handles the municipality advertising taxes and permits?',
        answer: 'All RKM Ads outdoor inventory is 100% pre-cleared with respective municipal corporations (MCD, BMC, BBMP) with all statutory taxes included in your contract.'
      }
    ]
  },
  {
    id: 'digital-marketing',
    title: 'Digital PR & Guaranteed News Publication',
    shortTitle: 'Digital PR',
    slug: 'digital-marketing',
    tagline: 'Guaranteed editorial features on 50+ leading news portals with permanent do-follow backlinks.',
    description: 'Secure organic Google Top Stories indexation, authoritative domain authority boost, and founder profile features on Zee News, Lokmat, Mid-Day, LatestLY, Outlook India, and PTI Wire.',
    badge: '50+ Portals • Guaranteed Live URLs',
    startingPrice: '₹ 1,999 / article',
    reach: '60M+ Online Monthly Readers',
    heroImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
    benefits: [
      'Guaranteed publication within 24 to 48 hours of draft sign-off',
      'High Domain Authority (DA 60–90) do-follow links for SEO rankings',
      'Permanent published archive link with Google News fast-crawl indexing',
      'Professional PR copywriters draft news-worthy press releases'
    ],
    formats: [
      {
        title: 'Tier-1 News Portal Feature',
        description: 'Full-length brand profile or funding announcement on prominent national media portals.',
        rate: 'From ₹ 4,500 / portal',
        specs: '600–800 words, 2 do-follow backlinks, 1 featured image',
        popular: true,
      },
      {
        title: 'Vernacular Multi-State PR Bundle',
        description: 'Simultaneous release in Hindi, Marathi, Gujarati, and Tamil news websites.',
        rate: 'From ₹ 9,500 / 5 portals',
        specs: 'Translation included + multi-portal distribution',
      },
      {
        title: 'National Wire Syndication (ANI / PTI)',
        description: 'Syndicated wire distribution picked up automatically by 40+ secondary news outlets.',
        rate: 'From ₹ 28,000 / wire release',
        specs: 'Official wire feed reaching all national editorial desks',
      }
    ],
    partners: ['Zee News Online', 'Lokmat News', 'Mid-Day', 'LatestLY', 'Dailyhunt', 'Outlook India', 'Hindustan Metro', 'ANI News Wire'],
    faqs: [
      {
        question: 'Are the published news articles permanent?',
        answer: 'Yes, articles published through our authorized digital news distribution network remain permanently hosted on the respective publications.'
      }
    ]
  },
  {
    id: 'influencer',
    title: 'Influencer Marketing & Creator Campaigns',
    shortTitle: 'Influencer Marketing',
    slug: 'influencer-marketing',
    tagline: 'Connect with 10,000+ verified creators across Instagram Reels, YouTube, and regional vernacular voices.',
    description: 'Scale authentic word-of-mouth endorsements, product unboxings, store visits, and viral audio reels with end-to-end creator scouting, contract management, and ROI tracking.',
    badge: '10,000+ Creators • Micro to Macro',
    startingPrice: '₹ 5,000 / creator',
    reach: '120M+ Engaged Followers',
    heroImage: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=1200&q=80',
    benefits: [
      'Rigorous audit of audience demographics, bot-free engagement rates, and geo-location',
      'Creators across Lifestyle, Tech, Finance, Beauty, Food, and Regional Vernaculars',
      'Full usage rights for running performance ad spark boosts with creator handles',
      'Comprehensive performance dashboard with views, saves, and conversion analytics'
    ],
    formats: [
      {
        title: 'Dedicated Instagram Reel',
        description: 'High-production 30–60s vertical video focusing on your product features and special offer.',
        rate: 'From ₹ 8,000 / creator',
        specs: 'Collaborator tag, link in bio, audio trend integration',
        popular: true,
      },
      {
        title: 'YouTube Integrated Video Spot',
        description: '60–90 second mid-roll integration within an established YouTuber’s weekly video.',
        rate: 'From ₹ 25,000 / video',
        specs: 'Permanent description tracking link + pinned comment',
      },
      {
        title: 'Vernacular Micro-Influencer Cohort',
        description: 'Swarm campaign of 10 to 20 local creators generating concentrated regional social buzz.',
        rate: 'From ₹ 40,000 / cohort',
        specs: 'Coordinated same-day posting across regional cities',
      }
    ],
    partners: ['Instagram Verified Creators', 'YouTube Partner Program', 'Moj & Josh Regional Talent', 'Meta Creator Network'],
    faqs: [
      {
        question: 'How do you ensure the influencers have genuine followers?',
        answer: 'We utilize AI-powered audience authenticity tools that check for comment velocity, follower growth spikes, and authentic engagement ratios before recommending creators.'
      }
    ]
  },
  {
    id: 'transit',
    title: 'Transit Media & Moving Billboards',
    shortTitle: 'Transit Media',
    slug: 'transit-media',
    tagline: 'High-frequency city bus wraps, metro train wraps, auto rickshaw hoods, and airport cabs.',
    description: 'Turn entire public transit fleets into dynamic, mobile moving brand displays circulating through commercial districts, residential lanes, and university campuses 18 hours daily.',
    badge: '100+ Metro Routes • Moving Reach',
    startingPrice: '₹ 1,500 / vehicle / month',
    reach: '14M+ Daily Transit Commuters',
    heroImage: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1200&q=80',
    benefits: [
      'City buses (DTC, BEST, BMTC, KSRTC) navigating prime commercial routes',
      'Complete metro exterior vinyl wraps and interior overhead grab handles',
      'Auto rickshaw back hoods penetrating high-density inner residential gullies',
      'Airport EV cabs (BluSmart, Uber) with backseat digital tablets'
    ],
    formats: [
      {
        title: 'Full City Bus Wrap (Both Sides + Back)',
        description: 'Massive moving canvas 35 feet long traversing designated metro city routes all day.',
        rate: 'From ₹ 18,000 / bus / mo',
        specs: 'Exterior vinyl wrap with retro-reflective safety compliance',
        popular: true,
      },
      {
        title: 'Auto Rickshaw Hoods & Back Panels',
        description: 'Cost-effective hyper-local swarm branding penetrating residential streets.',
        rate: 'From ₹ 1,400 / auto / mo',
        specs: 'Minimum 50 autos package for hyper-local density',
      },
      {
        title: 'Metro Train Full External Wrap',
        description: '6-coach or 8-coach metro train exterior transformed into an iconic branded train.',
        rate: 'From ₹ 1,80,000 / train / mo',
        specs: 'Premium 3M vinyl approved by Rail Safety Board',
      }
    ],
    partners: ['Delhi DTC Buses', 'Mumbai BEST', 'Bangalore BMTC', 'Delhi Metro', 'BluSmart Mobility', 'Hyderabad Metro'],
    faqs: [
      {
        question: 'What is the minimum auto rickshaw fleet size for transit branding?',
        answer: 'For noticeable visual saturation in a specific pin code or city zone, we recommend a minimum campaign size of 50 auto rickshaws for 30 days.'
      }
    ]
  },
  {
    id: 'lift',
    title: 'Lift & Elevator Branding in Premium Societies',
    shortTitle: 'Lift & Elevator Branding',
    slug: 'lift-branding',
    tagline: 'Captive residential and corporate elevator digital screens, acrylic posters, and door wraps.',
    description: 'Engage high-net-worth families and corporate tech workers in an uncluttered, zero-distraction captive elevator environment during their daily 4 to 8 elevator rides.',
    badge: '100+ High-Rise Societies • Captive Audience',
    startingPrice: '₹ 1,200 / lift / month',
    reach: '4.2M+ Daily Captive Elevator Trips',
    heroImage: '/images/lift-elevator-branding.jpg',
    benefits: [
      'Gated residential high-rises in Gurgaon, Noida, Whitefield, BKC, and Powai',
      'Captive audience with average elevator wait + ride time of 75 seconds',
      'Eye-level acrylic framed posters and high-definition vertical video screens',
      'RWA permissions and society maintenance fully managed by RKM Ads'
    ],
    formats: [
      {
        title: 'Digital Elevator Video Screen (10s Spot)',
        description: 'Wall-mounted 15.6” HD smart displays with continuous ad rotation.',
        rate: 'From ₹ 1,400 / screen / mo',
        specs: '1080x1920 vertical video loop, audio optional',
        popular: true,
      },
      {
        title: 'Eye-Level Acrylic Framed Poster',
        description: 'A3 or A2 tamper-proof acrylic frame positioned beside floor buttons.',
        rate: 'From ₹ 900 / lift / mo',
        specs: 'Premium high-gloss print with scratch-proof frame',
      },
      {
        title: 'Full Elevator Door Wrap',
        description: 'Exterior and interior elevator doors wrapped in full-color vinyl.',
        rate: 'From ₹ 3,500 / door / mo',
        specs: 'Heavy vinyl with non-residue adhesive approved by lift OEMs',
      }
    ],
    partners: ['DLF Phase 5 Societies', 'Noida Expressway Condominiums', 'Prestige Tech Parks', 'Hiranandani Communities', 'Sobha Urban Living'],
    faqs: [
      {
        question: 'Do residential societies allow commercial advertisements inside lifts?',
        answer: 'Yes! RKM Ads holds exclusive long-term concession agreements with Resident Welfare Associations (RWAs) and facility management corporations across Delhi NCR, Mumbai, and Bangalore.'
      }
    ]
  },
  {
    id: 'ott',
    title: 'OTT & Connected TV (CTV) Advertising',
    shortTitle: 'OTT & Connected TV',
    slug: 'ott-advertising',
    tagline: 'Living room 4K CTV spots and mobile pre-rolls on Disney+ Hotstar, JioCinema, SonyLIV, and Zee5.',
    description: 'Reach modern cord-cutters on big-screen living room Smart TVs with programmatic precision, targeting by household income, device price band, geography, and sports viewership.',
    badge: '100+ Streaming Apps • 4K Living Room',
    startingPrice: '₹ 85 CPM',
    reach: '80M+ Monthly Streamers',
    heroImage: 'https://images.unsplash.com/photo-1593784991095-a205069470b6?auto=format&fit=crop&w=1200&q=80',
    benefits: [
      'Non-skippable 10s–15s pre-roll and mid-roll video commercials',
      'Big-screen Connected TV (CTV) targeting affluent living room households',
      'Live sports inventory during IPL, ICC World Cups, and Premier League matches',
      'Frequency capping and verified third-party completion rate reports (VTR > 92%)'
    ],
    formats: [
      {
        title: 'Connected TV (CTV) Big-Screen Spot',
        description: 'Non-skippable HD/4K commercial displayed exclusively on living room Smart TVs.',
        rate: '₹ 190 CPM',
        specs: '16:9 1080p video, 10s to 15s non-skippable',
        popular: true,
      },
      {
        title: 'Mobile OTT Video Pre-Roll',
        description: 'Interactive video ad running before shows with clickable CTA landing button.',
        rate: '₹ 95 CPM',
        specs: 'Non-skippable or skippable after 5s with app download CTA',
      },
      {
        title: 'Live Cricket Match Commercial Spot',
        description: 'High-voltage live streaming spots during IPL over-breaks and wicket falls.',
        rate: '₹ 280 CPM',
        specs: 'Live streaming concurrent audience targeting',
      }
    ],
    partners: ['Disney+ Hotstar', 'JioCinema', 'SonyLIV', 'Zee5', 'MX Player', 'Amazon Prime Video Ads'],
    faqs: [
      {
        question: 'What is CPM and how is it billed?',
        answer: 'CPM stands for Cost Per Mille (cost per 1,000 verified video impressions). For example, at ₹95 CPM, 100,000 complete video views cost ₹9,500.'
      }
    ]
  },
  {
    id: 'programmatic',
    title: 'Programmatic DSP & Real-Time Bidding',
    shortTitle: 'Programmatic Ads',
    slug: 'programmatic-ads',
    tagline: 'Automated media buying on Google DV360, The Trade Desk, real-time bidding, and GPS geofencing.',
    description: 'Harness enterprise Demand Side Platforms (DSPs) to buy ad inventory across 100,000+ premium websites and apps with real-time audience data, custom intent cohorts, and brand safety.',
    badge: '100+ DSP Networks • Precision Geofencing',
    startingPrice: '₹ 45 CPM',
    reach: '350M+ Addressable Devices',
    heroImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
    benefits: [
      'Google Display & Video 360 (DV360) and The Trade Desk seat access',
      'Precise 500-meter GPS polygon geofencing around competitor stores and events',
      'Cross-device frequency management preventing audience ad fatigue',
      'Brand safety filters blocking negative news, piracy, and fraudulent bot traffic'
    ],
    formats: [
      {
        title: 'High-Impact Rich Media Displays',
        description: 'Interactive canvas, interstitial banners, and 3D parallax mobile formats.',
        rate: '₹ 65 CPM',
        specs: 'HTML5 responsive rich media with video embedding',
        popular: true,
      },
      {
        title: 'GPS Geofenced In-App Video',
        description: 'Target users currently standing inside specific malls, airports, or dealerships.',
        rate: '₹ 110 CPM',
        specs: 'Polygon lat/long coordinate targeting + interstitial video',
      },
      {
        title: 'Omni-Channel Retargeting Campaign',
        description: 'Re-engage website drop-offs across web, mobile apps, YouTube, and news portals.',
        rate: '₹ 55 CPM',
        specs: 'Dynamic product feed retargeting with conversion tracking',
      }
    ],
    partners: ['Google DV360', 'The Trade Desk', 'Magnite', 'PubMatic', 'OpenX', 'LiveRamp Identity Link'],
    faqs: [
      {
        question: 'How does polygon GPS geofencing work for retail stores?',
        answer: 'We draw a digital perimeter around target physical locations (e.g., competing car showrooms or shopping malls). Users opening any ad-supported mobile app inside this boundary receive your high-priority localized banner.'
      }
    ]
  }
];
