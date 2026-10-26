import React, { createContext, useContext, useState, useEffect } from 'react';
import { BookingState, CustomerBillingDetails, OrderRecord } from '../types';
import { PUBLICATIONS_DATA, CATEGORY_TEMPLATES, calculateLines } from '../data/publicationsData';

interface BookingContextType {
  booking: BookingState;
  updateBooking: (updates: Partial<BookingState>) => void;
  setCategoryTemplate: (categoryName: string) => void;
  resetBooking: () => void;
  customer: CustomerBillingDetails;
  updateCustomer: (updates: Partial<CustomerBillingDetails>) => void;
  currentOrderId: string | null;
  setCurrentOrderId: (id: string | null) => void;
  placeOrder: () => string;
  getOrder: (orderId: string) => OrderRecord | null;
}

const defaultBooking: BookingState = {
  publicationId: 'toi',
  publicationName: 'The Times of India',
  edition: 'Delhi NCR',
  category: 'Matrimonial',
  publishDate: '',
  adText: 'Wanted suitable match for Punjabi Khatri girl, 28, MBA, 5\u20326\u2033, working in Gurugram MNC as Product Manager. Well-settled family. Early marriage. Write to: marriage.delhi26@gmail.com.',
  enhancements: {
    bold: false,
    colorBg: false,
    borderTick: false,
  },
  adFormat: 'text',
  supportingDocName: undefined,
  calculatedPrice: {
    words: 24,
    lines: 4,
    usedUnits: 4,
    baseUnits: 5,
    extraUnits: 0,
    unitType: 'line',
    baseAmount: 1450,
    extraAmount: 0,
    enhancementsAmount: 0,
    subtotal: 1450,
    gstAmount: 72.5,
    totalPayable: 1522.5,
  },
};

const defaultCustomer: CustomerBillingDetails = {
  fullName: 'Rahul Verma',
  phone: '+91 98783 39302',
  email: 'rahul.verma@example.com',
  gstin: '',
  address: 'Sector 58, Noida',
  city: 'Noida',
  paymentMethod: 'upi',
};

// Seed sample orders for instant testing of tracker
const SAMPLE_ORDER: OrderRecord = {
  orderId: 'BMA-2026-9812',
  createdAt: '2026-10-24T14:32:00Z',
  booking: {
    ...defaultBooking,
    category: 'Change of name',
    adText: 'I, Anita Verma, daughter of Mohan Verma, resident of Model Town, Ludhiana, Punjab, have changed my name to Anita Sharma for all legal, educational, and official purposes. All concerned authorities please note.',
  },
  customer: {
    fullName: 'Anita Sharma',
    phone: '+91 98783 39302',
    email: 'anita.sharma@example.com',
    paymentMethod: 'upi',
  },
  status: 'published',
  milestones: [
    { title: 'Order Placed', description: 'Paid ₹ 1,522 via Instant UPI QR', completed: true, time: '24 Oct, 02:32 PM' },
    { title: 'Editorial Desk Verification', description: 'Notarised Name Change Affidavit Approved', completed: true, time: '24 Oct, 03:15 PM' },
    { title: 'Scheduled at Printing Press', description: 'Negative plate casted for North India Edition', completed: true, time: '25 Oct, 11:45 PM' },
    { title: 'Published & e-Tearsheet Verified', description: 'Morning newspaper edition released on stands', completed: true, time: '26 Oct, 06:00 AM' },
  ],
  tearsheet: {
    publication: 'THE TIMES OF INDIA',
    page: 'PAGE 14 — CLASSIFIED NOTICES',
    date: 'WEDNESDAY, 28 OCTOBER 2026',
    edition: 'DELHI NCR & NORTH INDIA',
    headline: 'CHANGE OF NAME NOTICE',
    category: 'CHANGE OF NAME',
    adText: 'I, Anita Verma, daughter of Mohan Verma, resident of Model Town, Ludhiana, Punjab, have changed my name to Anita Sharma for all legal, educational, and official purposes. All concerned authorities please note.',
  }
};

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export const BookingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [booking, setBooking] = useState<BookingState>(() => {
    const saved = localStorage.getItem('rkm_current_booking');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // ignore
      }
    }
    return defaultBooking;
  });

  const [customer, setCustomer] = useState<CustomerBillingDetails>(() => {
    const saved = localStorage.getItem('rkm_customer_details');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // ignore
      }
    }
    return defaultCustomer;
  });

  const [currentOrderId, setCurrentOrderId] = useState<string | null>(() => {
    return sessionStorage.getItem('rkm_last_order') || 'BMA-2026-9812';
  });

  // Calculate pricing whenever core attributes change
  const recalculatePrice = (b: BookingState): BookingState['calculatedPrice'] => {
    const pub = PUBLICATIONS_DATA[b.publicationId] || PUBLICATIONS_DATA.toi;
    const editionMultiplier = pub.editions[b.edition] || 1.0;
    
    const text = b.adText || '';
    const trimmed = text.trim();
    const words = trimmed ? trimmed.split(/\s+/).length : 0;
    const lines = trimmed ? calculateLines(trimmed, pub.charsPerLine || 35) : 0;

    const usedUnits = pub.unit === 'line' ? lines : words;
    const extraUnits = Math.max(0, usedUnits - pub.baseUnits);

    const baseAmount = Math.round(pub.baseRate * editionMultiplier);
    const extraAmount = Math.round(extraUnits * pub.extraRate * editionMultiplier);
    
    let enhancementsAmount = 0;
    if (b.enhancements.bold) enhancementsAmount += 50;
    if (b.enhancements.colorBg) enhancementsAmount += 150;
    if (b.enhancements.borderTick) enhancementsAmount += 30;

    const subtotal = baseAmount + extraAmount + enhancementsAmount;
    const gstAmount = Math.round(subtotal * 0.05 * 100) / 100;
    const totalPayable = Math.round((subtotal + gstAmount) * 100) / 100;

    return {
      words,
      lines,
      usedUnits,
      baseUnits: pub.baseUnits,
      extraUnits,
      unitType: pub.unit,
      baseAmount,
      extraAmount,
      enhancementsAmount,
      subtotal,
      gstAmount,
      totalPayable,
    };
  };

  const updateBooking = (updates: Partial<BookingState>) => {
    setBooking(prev => {
      const next = { ...prev, ...updates };
      // if publicationId changed, update publicationName
      if (updates.publicationId && PUBLICATIONS_DATA[updates.publicationId]) {
        next.publicationName = PUBLICATIONS_DATA[updates.publicationId].name;
        // check if current edition is supported, else pick first
        const availableEditions = Object.keys(PUBLICATIONS_DATA[updates.publicationId].editions);
        if (!availableEditions.includes(next.edition)) {
          next.edition = availableEditions[0];
        }
      }
      next.calculatedPrice = recalculatePrice(next);
      localStorage.setItem('rkm_current_booking', JSON.stringify(next));
      return next;
    });
  };

  const setCategoryTemplate = (categoryName: string) => {
    const tmpl = CATEGORY_TEMPLATES.find(c => c.name.toLowerCase() === categoryName.toLowerCase());
    if (tmpl) {
      updateBooking({
        category: tmpl.name,
        adText: tmpl.sampleText,
      });
    } else {
      updateBooking({ category: categoryName });
    }
  };

  const updateCustomer = (updates: Partial<CustomerBillingDetails>) => {
    setCustomer(prev => {
      const next = { ...prev, ...updates };
      localStorage.setItem('rkm_customer_details', JSON.stringify(next));
      return next;
    });
  };

  const resetBooking = () => {
    setBooking(defaultBooking);
    localStorage.removeItem('rkm_current_booking');
  };

  const placeOrder = (): string => {
    const orderId = 'BMA-2026-' + Math.floor(1000 + Math.random() * 9000);
    const pub = PUBLICATIONS_DATA[booking.publicationId] || PUBLICATIONS_DATA.toi;

    const newOrder: OrderRecord = {
      orderId,
      createdAt: new Date().toISOString(),
      booking: { ...booking },
      customer: { ...customer },
      status: 'placed',
      milestones: [
        { title: 'Order Placed & Verified', description: `Paid ₹ ${booking.calculatedPrice.totalPayable.toLocaleString('en-IN')} via ${customer.paymentMethod.toUpperCase()}`, completed: true, time: 'Just now' },
        { title: 'Editorial Desk Verification', description: 'Verifying legal affidavits & formatting', completed: false, time: 'Est. 15 mins' },
        { title: 'Scheduled at Printing Press', description: 'Composing layout for morning broadsheet', completed: false, time: 'Tonight 11:30 PM' },
        { title: 'Published & e-Tearsheet Verified', description: 'Certified scan download available on delivery day', completed: false, time: 'Release morning 6 AM' },
      ],
      tearsheet: {
        publication: pub.name.toUpperCase(),
        page: 'PAGE 14 — CLASSIFIED ADVERTISEMENTS',
        date: booking.publishDate ? new Date(booking.publishDate + 'T00:00').toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }).toUpperCase() : 'UPCOMING ISSUE',
        edition: `${booking.edition.toUpperCase()} EDITION`,
        headline: `${booking.category.toUpperCase()} NOTICE`,
        category: booking.category.toUpperCase(),
        adText: booking.adText,
      }
    };

    // save to localStorage orders map
    const existingOrdersStr = localStorage.getItem('rkm_orders_history');
    const existingOrders: Record<string, OrderRecord> = existingOrdersStr ? JSON.parse(existingOrdersStr) : {};
    existingOrders[orderId] = newOrder;
    localStorage.setItem('rkm_orders_history', JSON.stringify(existingOrders));

    setCurrentOrderId(orderId);
    sessionStorage.setItem('rkm_last_order', orderId);
    return orderId;
  };

  const getOrder = (orderId: string): OrderRecord | null => {
    if (!orderId) return null;
    const cleanId = orderId.trim().toUpperCase();
    if (cleanId === SAMPLE_ORDER.orderId) return SAMPLE_ORDER;

    const existingOrdersStr = localStorage.getItem('rkm_orders_history');
    if (existingOrdersStr) {
      try {
        const orders: Record<string, OrderRecord> = JSON.parse(existingOrdersStr);
        if (orders[cleanId]) return orders[cleanId];
      } catch {
        // ignore
      }
    }

    // If not found in storage, return dynamic mock with requested ID so user can test any ID
    return {
      ...SAMPLE_ORDER,
      orderId: cleanId,
    };
  };

  // Sync initial date if empty
  useEffect(() => {
    if (!booking.publishDate) {
      const now = new Date();
      now.setDate(now.getDate() + (now.getHours() >= 15 ? 2 : 1));
      updateBooking({ publishDate: now.toISOString().slice(0, 10) });
    }
  }, []);

  return (
    <BookingContext.Provider
      value={{
        booking,
        updateBooking,
        setCategoryTemplate,
        resetBooking,
        customer,
        updateCustomer,
        currentOrderId,
        setCurrentOrderId,
        placeOrder,
        getOrder,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = () => {
  const ctx = useContext(BookingContext);
  if (!ctx) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return ctx;
};
