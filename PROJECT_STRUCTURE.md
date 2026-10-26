# AdBooking Platform — Project Description & Structure Specification

Inspired by **[rkmads.com](https://www.rkmads.com/)**, this platform is a modern, high-conversion online advertisement booking portal for **Newspapers, Radio FM, Cinema, Outdoor (OOH/DOOH), and Television**. It modernizes the traditional classifieds workflow into a frictionless, SaaS-grade experience.

---

## 1. Executive Project Description

### 1.1 Core Business Purpose
To allow individual advertisers, SMEs, agencies, and legal professionals to book advertisements across 150+ regional and national media publications without physical agency visits, manual rate negotiations, or complex offline paperwork.

### 1.2 Key Media Verticals & Services Portfolio (RKM Advertising 360°)
1. **Newspaper Advertising (Core Transactional Funnel):**
   * Classified Text, Classified Display, and Commercial Display (Quarter, Half, Full & Front Page) across 150+ regional and national dailies.
2. **Digital Marketing:**
   * Google Search & Display Ads, Meta Performance marketing, SEO, and lead generation campaigns.
3. **Radio Advertising (100+ Cities):**
   * Top FM networks (Radio Mirchi, Red FM, Big FM, Radio City, Fever 104) with prime-time commercial slots and RJ mentions.
4. **Cinema Advertising (70mm Multiplexes):**
   * On-screen slide ads and 10–30s commercial video ads across national multiplex chains (PVR INOX, Cinepolis).
5. **Digital PR:**
   * Guaranteed brand features on 50+ tier-1 news portals (Zee News, Lokmat, LatestLY, Dailyhunt, Hindustan Metro).
6. **Influencer Marketing:**
   * 10,000+ verified creators across Instagram Reels, YouTube integrations, and regional vernacular micro-influencer bundles.
7. **Television Advertising (275+ Channels):**
   * 10–30s TV commercial spots on national news (Aaj Tak, India TV, NDTV) and regional entertainment GECs.
8. **Programmatic Ads (100+ Networks):**
   * Automated DSP media buying on Google DV360, The Trade Desk, real-time bidding, rich media, and GPS geofencing.
9. **OTT & Connected TV (100+ Streaming Platforms):**
   * Living room CTV 4K spots and mobile video pre-rolls across Disney+ Hotstar, JioCinema, SonyLIV, Zee5, and MX Player.
10. **Transit Media (100+ Metropolitan Routes):**
    * Full city bus wraps (DTC, BEST, BMTC), metro train wraps, auto rickshaw hoods, and airport cab branding.
11. **Lift & Elevator Branding (100+ Premium Societies):**
    * Captive residential and corporate lift digital video screens, acrylic eye-level posters, and full door wraps with RWA permission.
12. **Outdoor / DOOH (250+ Hoardings & Digital Totems):**
    * Highway unipoles, bridge gantries, mall totems, and digital LED billboards with geotagged audit proofing.

---

## 2. Platform Architecture & Data Flow

```
[ Advertiser / User ]
       │
       ▼
[ Omni-Search & Rate Explorer ] ──► [ Step 1: Select Media & Publication ]
                                                    │
                                                    ▼
[ Real-Time Newsprint Simulator ] ◄── [ Step 2: Choose Edition & Package ]
       │                                            │
       ▼                                            ▼
[ Dynamic Rate Calculator ]  ──────► [ Step 3: Compose Ad & Enhancements ]
                                                    │
                                                    ▼
[ Cut-off Aware Date Scheduler ] ◄── [ Step 4: Schedule Date & Upload Docs ]
                                                    │
                                                    ▼
[ Express Checkout / Razorpay UPI QR ] ──► [ Order Confirmation & Tax Invoice ]
                                                    │
                                                    ▼
                                    [ Editorial Verification & Publication ]
                                                    │
                                                    ▼
                                    [ Scanned e-Tearsheet Uploaded & Viewed ]
```

---

## 3. Complete Directory Structure

```
rkm-ad-booking/
├── .env.example                       # Environment template (Database, S3, Gateway keys)
├── .gitignore
├── README.md
├── PROJECT_STRUCTURE.md               # This project architecture & specification file
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── postcss.config.js
├── prisma/
│   ├── schema.prisma                  # PostgreSQL schema (Publications, Editions, Rates, Bookings)
│   └── seed.ts                        # Seed data (Top Indian publications, rate cards, categories)
├── public/
│   ├── images/
│   │   ├── newspapers/                # Logos (TOI, HT, Dainik Jagran, Amar Ujala, The Hindu)
│   │   ├── categories/                # Category vector icons
│   │   └── textures/                  # Newsprint realistic background overlay
│   └── docs/                          # Sample legal affidavit templates
├── src/
│   ├── app/
│   │   ├── (marketing)/               # Public-facing informative & SEO pages
│   │   │   ├── page.tsx               # Home Page with Omni-Search & popular categories
│   │   │   ├── newspaper-ads/
│   │   │   │   ├── page.tsx           # Newspaper listing & format guide
│   │   │   │   └── [category]/        # Dynamic category landing pages (e.g. /matrimonial)
│   │   │   │       └── page.tsx
│   │   │   ├── radio-ads/page.tsx     # Radio FM advertising & inquiry modal
│   │   │   ├── cinema-ads/page.tsx    # Cinema & multiplex advertising
│   │   │   ├── outdoor-ads/page.tsx   # OOH / DOOH advertising
│   │   │   ├── rate-cards/page.tsx    # Comprehensive edition-wise rate card explorer
│   │   │   └── track-ad/page.tsx      # Public ad status tracking by Order ID
│   │   ├── (booking)/                 # Core 4-Step Booking Engine
│   │   │   └── book-ad/
│   │   │       ├── layout.tsx         # Sticky funnel header with cut-off deadline badge
│   │   │       ├── step-1/page.tsx    # Select Newspaper, Category & Region
│   │   │       ├── step-2/page.tsx    # Select Package & Edition Combo
│   │   │       ├── step-3/page.tsx    # Split-Screen Composer + Live Newspaper Simulator
│   │   │       └── step-4/page.tsx    # Calendar date selection & Document uploader
│   │   ├── (checkout)/
│   │   │   ├── checkout/page.tsx      # Order review, GST details & Payment options
│   │   │   └── confirmation/page.tsx  # Booking receipt, invoice & tracking link
│   │   ├── (dashboard)/               # User Portal
│   │   │   └── dashboard/
│   │   │       ├── page.tsx           # Active bookings & recent activity
│   │   │       ├── my-ads/page.tsx    # Detailed booking history & status timeline
│   │   │       ├── tearsheets/page.tsx# Digital e-Tearsheet scanned proof viewer
│   │   │       └── invoices/page.tsx  # Downloadable GST tax invoices
│   │   ├── (admin)/                   # Operations & Publication Desk
│   │   │   └── admin/
│   │   │       ├── page.tsx           # Analytics & pending review orders
│   │   │       ├── orders/page.tsx    # Order verification (Affidavit check, Approve/Reject)
│   │   │       ├── rate-cards/page.tsx# Tariff manager & edition cutoff editor
│   │   │       └── tearsheets/page.tsx# Upload publication proofs matching order numbers
│   │   └── api/                       # API Route Handlers
│   │       ├── calculate-rate/route.ts# Dynamic real-time rate calculator endpoint
│   │       ├── publications/route.ts  # Fetch media, editions and cutoff times
│   │       ├── bookings/route.ts      # Create draft / process booking
│   │       ├── payments/
│   │       │   ├── create-order/route.ts # Initialize Razorpay/Cashfree order
│   │       │   └── webhook/route.ts      # Handle payment confirmation webhook
│   │       └── upload/route.ts        # Handle creative & document uploads to S3
│   ├── components/
│   │   ├── ui/                        # Button, Dialog, Select, Dropdown, Tabs, Modal
│   │   ├── home/
│   │   │   ├── HeroOmniSearch.tsx     # 3-field media/category/city selector
│   │   │   ├── CategoryGrid.tsx       # Visual icon grid for categories
│   │   │   ├── NewspaperCarousel.tsx  # Publication logos with quick rate links
│   │   │   └── TrustSection.tsx       # INS Accreditation, guarantees, testimonials
│   │   ├── booking/
│   │   │   ├── BookingStepper.tsx     # Progress stepper with countdown timer
│   │   │   ├── PackageCard.tsx        # Combo package cards with "Save X%" chips
│   │   │   ├── AdComposer.tsx         # Text editor with dynamic line-break visualizer
│   │   │   ├── NewspaperPreview.tsx   # Canvas/DOM simulated newspaper column
│   │   │   ├── EnhancementToggles.tsx # Bold, color fill, border, tick checkboxes
│   │   │   ├── PriceBreakdown.tsx     # Sticky itemized cost ticker (Base + Addons + GST)
│   │   │   ├── CutoffCalendar.tsx     # Smart date picker with greyed-out expired dates
│   │   │   └── DocumentDropzone.tsx   # Drag-and-drop document verifier
│   │   ├── checkout/
│   │   │   ├── UPIQRCodeModal.tsx     # Instant UPI payment modal
│   │   │   └── BillingForm.tsx        # Customer address & GSTIN verification
│   │   ├── dashboard/
│   │   │   ├── OrderTimeline.tsx      # Step progress (Placed -> Approved -> Published)
│   │   │   └── TearsheetViewer.tsx    # Pan & zoom high-res scanned newspaper clipping
│   │   └── shared/
│   │       ├── Navbar.tsx             # Main responsive navigation
│   │       ├── Footer.tsx             # Links, rate cards, contact, legal disclaimer
│   │       └── WhatsAppChatPill.tsx   # Persistent floating WhatsApp support button
│   ├── hooks/
│   │   ├── useRateCalculator.ts       # Client-side dynamic pricing calculation hook
│   │   └── useCountdownTimer.ts       # Publication cut-off timer hook
│   ├── store/
│   │   └── useBookingStore.ts         # Zustand store managing booking state across steps
│   ├── types/
│   │   └── booking.ts                 # TypeScript interfaces for orders, rates & publications
│   └── lib/
│       ├── prisma.ts                  # Prisma client instance
│       ├── textCalculator.ts          # Word & line counting regex per newspaper standard
│       └── utils.ts                   # Class mergers, currency formatters
```

---

## 4. Key Page Content & Functional Breakdown

### Page 1: Home Page (`/`)
* **Header / Navigation:** Primary media tabs, Rate card finder, Order tracker, Helpline (`+91-9878339302`), and Account login.
* **Hero Section (Omni-Search):** 3-in-1 dropdown widget (*Media* $\rightarrow$ *Category* $\rightarrow$ *Publication/Edition*) with instant "Check Rates & Book" CTA.
* **Category Quick-Pill Links:** Direct shortcuts for *Matrimonial*, *Change of Name*, *Property for Sale*, *Public Notice*, and *Obituary*.
* **Top Publications Carousel:** Times of India, Hindustan Times, Dainik Jagran, Dainik Bhaskar, Amar Ujala, The Hindu.
* **Trust & Value Props:** INS Accredited Agency badge, Best Rate Guarantee, Free Design Assistance, e-Tearsheet guarantee.

### Page 2: Category Landing Pages (`/newspaper-ads/[category]`)
* **Intent-Specific Guidelines:** Legal notice instructions, required documentation (e.g., Notarized Affidavit for Name Change).
* **Sample Ad Templates:** Ready-to-use sample texts with click-to-copy insertion into composer.
* **Rate Comparison Table:** Multi-publication comparison for that specific category.

### Page 3: 4-Step Booking Engine (`/book-ad/`)
* **Step 1 (`/book-ad/step-1`):** Filter & choose publication, language, state, and ad category.
* **Step 2 (`/book-ad/step-2`):** Select city edition or combo deals (e.g., *TOI Delhi + NBT Combo - Save 40%*).
* **Step 3 (`/book-ad/step-3` - Ad Composer):**
  * Left pane: Rich text input, real-time line/word counters, visual enhancements (Bold, Color box, Border, Tick).
  * Right pane: Real-time Newsprint Column Simulator + Sticky Price Ticker.
* **Step 4 (`/book-ad/step-4`):**
  * Calendar with publication cut-off detection (past deadlines greyed out).
  * Drag-and-drop document upload (Affidavits, FIRs, Death certificates) with instant preview.

### Page 4: Checkout & Order Confirmation (`/checkout`, `/confirmation`)
* **Checkout Page:** Billing details, auto-fetching GSTIN tax input, coupon codes, and express UPI QR code / Netbanking.
* **Confirmation Page:** Order ID, downloadable booking receipt, tracking link, and opt-in for WhatsApp status alerts.

### Page 5: Public Order Tracking & User Dashboard (`/track-ad`, `/dashboard`)
* **Timeline Tracker:** `Order Placed` $\rightarrow$ `Editorial Review` $\rightarrow$ `Sent to Press` $\rightarrow$ `Published & Proof Uploaded`.
* **e-Tearsheet Viewer:** Interactive zoom/pan viewer displaying the actual published newspaper page with the ad highlighted.
* **Invoices:** Compliant GST tax invoices for business accounts.

---

## 5. Technical Specifications & Dependencies

| Tool / Technology | Version / Choice | Purpose |
| :--- | :--- | :--- |
| **Framework** | Next.js 14+ (App Router) | High-performance SSR for SEO & client components for composer |
| **Styling** | Tailwind CSS + Lucide Icons | Responsive modern design and visual micro-interactions |
| **State Management** | Zustand | Persistent state across 4-step funnel without full page refreshes |
| **Database & ORM** | PostgreSQL + Prisma ORM | Relational integrity for rate cards, combo logic, and financial records |
| **Payment Gateway** | Razorpay / Cashfree | Instant UPI QR, Netbanking, Cards, Auto-reconciliation |
| **File Storage** | AWS S3 / Cloudflare R2 | Storage for affidavits, display ad creatives, and scanned tearsheets |
