export type MediaCategory =
  | 'newspaper'
  | 'radio'
  | 'cinema'
  | 'tv'
  | 'outdoor'
  | 'digital-pr'
  | 'influencer'
  | 'transit'
  | 'lift'
  | 'ott'
  | 'programmatic';

export interface PublicationTariff {
  id: string;
  name: string;
  unit: 'line' | 'word';
  baseRate: number;
  extraRate: number;
  baseUnits: number;
  charsPerLine?: number;
  editions: Record<string, number>;
  categories: string[];
  cutoffHour: number; // e.g. 15 for 3:00 PM
  badge?: string;
  language: string;
  circulation: string;
}

export interface AdCategoryTemplate {
  name: string;
  description: string;
  baseMinRate: number;
  sampleText: string;
  requiredDoc?: string;
}

export interface BookingState {
  publicationId: string;
  publicationName: string;
  edition: string;
  category: string;
  publishDate: string;
  adText: string;
  enhancements: {
    bold: boolean;
    colorBg: boolean;
    borderTick: boolean;
  };
  adFormat: 'text' | 'cd' | 'display';
  supportingDocName?: string;
  calculatedPrice: {
    words: number;
    lines: number;
    usedUnits: number;
    baseUnits: number;
    extraUnits: number;
    unitType: 'line' | 'word';
    baseAmount: number;
    extraAmount: number;
    enhancementsAmount: number;
    subtotal: number;
    gstAmount: number;
    totalPayable: number;
  };
}

export interface CustomerBillingDetails {
  fullName: string;
  phone: string;
  email: string;
  gstin?: string;
  address?: string;
  city?: string;
  paymentMethod: 'upi' | 'card' | 'netbanking';
}

export interface OrderRecord {
  orderId: string;
  createdAt: string;
  booking: BookingState;
  customer: CustomerBillingDetails;
  status: 'placed' | 'editorial_verified' | 'press_scheduled' | 'published';
  milestones: {
    title: string;
    description: string;
    completed: boolean;
    time: string;
  }[];
  tearsheet: {
    publication: string;
    page: string;
    date: string;
    edition: string;
    headline: string;
    adText: string;
    category: string;
  };
}

export interface MediaVerticalInfo {
  id: string;
  title: string;
  shortTitle: string;
  slug: string;
  tagline: string;
  description: string;
  badge: string;
  startingPrice: string;
  reach: string;
  heroImage: string;
  benefits: string[];
  formats: {
    title: string;
    description: string;
    rate: string;
    specs: string;
    popular?: boolean;
  }[];
  partners: string[];
  faqs: {
    question: string;
    answer: string;
  }[];
}
