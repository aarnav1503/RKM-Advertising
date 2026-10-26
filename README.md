# RKM Ads — Multi-Channel Media & Advertisement Booking Platform

> A modern, SaaS-grade alternative to traditional ad booking platforms with high-speed online booking and live newsprint simulation. Built with an editorial design aesthetic, real-time newsprint column simulator, dynamic multi-algorithm tariff engine, and verified e-Tearsheet proofing.

---

## 1. Project Overview

**RKM Ads** is a full-service online advertising and media-buying web platform designed to streamline the booking of print classifieds, commercial display advertisements, and multi-media campaigns across India. 

Traditionally, booking a legal notice, matrimonial listing, or commercial ad required visiting physical newspaper offices, negotiating offline tariffs, and dealing with ambiguous cut-off times and manual proof collection. RKM Ads digitizes this entire workflow into a **self-service 4-step experience** backed by direct INS (Indian Newspaper Society) accredited agency tariff integration.

---

## 2. Media Verticals Supported

| Media Channel | Format & Scope | Key Partners / Coverage |
|---|---|---|
| **Newspapers (Print)** | Classified Text (ROD), Classified Display (CD), Full Commercial Display (Quarter/Half/Full Page, Jackets) | *The Times of India, Hindustan Times, Dainik Jagran, Amar Ujala, The Hindu, Dainik Bhaskar* (150+ Dailies) |
| **Radio FM** | 10s–30s commercial audio spots, RJ mentions, show sponsorships, prime/non-prime time bands | *Radio Mirchi 98.3, Red FM 93.5, Big FM 92.7, Radio City 91.1* (100+ Cities) |
| **Cinema Screens** | 10s–30s on-screen video commercials, mute/audio slide displays, foyer kiosk sampling | *PVR INOX, Cinepolis, MovieMax, Wave Cinemas* |
| **Television (TV)** | Prime-time commercial spots, L-bands, Aston bands, news debate sponsorships | *Aaj Tak, NDTV, Republic TV, Star Plus, Sony, Zee* |
| **Outdoor & DOOH** | Highway unipoles, illuminated hoardings, metro station branding, digital LED screens, bus shelters (BQS) | Delhi NCR, Mumbai, Bengaluru, Hyderabad, Tier-1 Metro Corridors |
| **Digital PR & Wire** | Guaranteed digital press releases with do-follow backlinks and Google Top Stories indexation | *ANI, PTI, Zee News Online, HT Online, Outlook India* |

---

## 3. Core Technical & UX Innovations

### 1. Real-Time Newsprint Broadsheet Simulator
Instead of generic textareas, the platform renders a **tactile broadsheet newspaper column** (`Georgia` / `Gelasio` typography, authentic column borders, newsprint tint `#FAF7EE`, and neighboring dummy notices). As the advertiser drafts their text, the preview updates in real time with instantaneous visual reflection of:
* **Bold First Words** (`+₹50`)
* **Color Background Highlight Box** (`+₹150`)
* **Border & Tick Marks** (`+₹30`)

### 2. Dual Tariff Engine (Words vs. Lines)
Different Indian newspapers enforce divergent billing structures:
* **Per-Line Billing:** *The Times of India* charges per 5 lines ($\sim 35\text{ characters/line}$).
* **Per-Word Billing:** *Dainik Jagran* and *Hindustan Times* charge per 20 words.
The client-side engine automatically switches regex tokenizers dynamically based on the chosen publication and edition combo, calculating base fees, overage fees, enhancements, and GST (5%) with zero delay.

### 3. Dynamic Cut-off Countdown Timer
Newspapers enforce strict printing press deadlines (e.g., daily 3:00 PM cut-off; Friday 3:00 PM for Sunday Matrimonial editions). The calendar scheduler automatically greys out past deadlines and surfaces a live countdown badge:
> `Booking closes in 02:14:38 for print on Wednesday, 28 Oct`

### 4. Certified Digital e-Tearsheet Proof
Solves the traditional headache of finding physical copies of newspapers at morning stands. Once printed, a zoomable high-resolution digital scan of the exact newspaper page with the client's ad highlighted is available for download alongside an authorized GST invoice.

---

## 4. Complete Website Page Structure

```
rkm-ad-booking/
├── index.html                 # Main Portal: Broadsheet hero, Omni-search, Quick composer & FAQs
├── newspaper-ads.html         # Newspaper Hub: Classified text, display ad types & tariff comparison
├── radio-ads.html             # Radio FM: Station listing, spot rates & custom media planner
├── cinema-ads.html            # Cinema Advertising: Multiplex on-screen video & slide options
├── tv-ads.html                # Television Ads: National news & entertainment broadcast slots
├── outdoor-ads.html           # Outdoor & DOOH: Billboards, metro wraps, bus shelters & digital screens
├── digital-marketing.html     # Digital PR: Guaranteed news portal publication & Google Ads (PPC)
├── rate-cards.html            # Searchable Tariff Explorer: 2026 rates by publication, edition & category
├── book-ad.html               # 4-Step Booking Wizard: Live print simulator & instant calculator
├── checkout.html              # Checkout: Billing, GSTIN validation, Dynamic UPI QR Code modal
├── track-ad.html              # Order Tracker: 4-milestone stepper & digital e-Tearsheet proof viewer
├── about.html                 # About Us: INS accreditation, company milestones since 2012
├── contact.html               # Contact: Noida HQ address, customer care helpline & contact form
├── terms.html                 # Legal Policies: Editorial guidelines, affidavit requirements & refund rules
├── style.css                  # Unified design system & responsive styling
└── PROJECT_STRUCTURE.md       # Deep architectural breakdown and database schemas
```

---

## 5. User Journey & Booking Workflow

```
[ Visitor Lands on Platform ]
       │
       ▼
[ Selects Newspaper, Category & Edition ] (e.g. TOI • Matrimonial • Delhi NCR)
       │
       ▼
[ Drafts Ad in Split-Screen Composer ]
       ├── Live Character/Word Counter checks line limit
       ├── Visual Newsprint Column Simulator renders formatted output
       └── Sticky Price Ticker recalculates instantly (Base + Extra + Enhancements + 5% GST)
       │
       ▼
[ Selects Release Date & Uploads Legal Affidavit (if required) ]
       │
       ▼
[ Frictionless Checkout ]
       ├── Enters Name, Mobile & GSTIN
       └── Scans Dynamic UPI QR Code (GPay / PhonePe / Paytm / Cards)
       │
       ▼
[ Order Placed & Live Tracking ] (e.g. #BMA-2026-9812)
       ├── Milestone 1: Order Placed
       ├── Milestone 2: Editorial Desk Verification
       ├── Milestone 3: Scheduled at Printing Press
       └── Milestone 4: Published ➔ Download Scanned e-Tearsheet & GST Invoice
```

---

## 6. How to Run Locally

1. Clone or download the repository:
   ```bash
   cd c:\Users\aarna\OneDrive\Documents\Codes\RKM
   ```
2. Start the local development server:
   ```bash
   # Using Python
   python -m http.server 3000

   # Or using Node
   npx serve .
   ```
3. Open your browser and navigate to:
   ```
   http://localhost:3000
   ```
