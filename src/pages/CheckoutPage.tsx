import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBooking } from '../context/BookingContext';
import { PageHeader } from '../components/layout/PageHeader';
import { formatINR } from '../data/publicationsData';
import { 
  ShieldCheck, 
  Lock, 
  QrCode, 
  ArrowRight, 
  ArrowLeft, 
  X, 
  CheckCircle2, 
  Check, 
  Calendar, 
  FileText, 
  CreditCard, 
  Building2, 
  Zap,
  Clock,
  Sparkles
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const CheckoutPage: React.FC = () => {
  const navigate = useNavigate();
  const { booking, customer, updateCustomer, placeOrder } = useBooking();
  const [isUpiModalOpen, setIsUpiModalOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (customer.paymentMethod === 'upi') {
      setIsUpiModalOpen(true);
    } else {
      handleCompletePayment();
    }
  };

  const handleCompletePayment = () => {
    setIsProcessing(true);
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
    });

    setTimeout(() => {
      const orderId = placeOrder();
      setIsProcessing(false);
      setIsUpiModalOpen(false);
      navigate(`/track-ad?order=${orderId}`);
    }, 1200);
  };

  const totalAmount = booking.calculatedPrice.totalPayable;
  const qrDataUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=upi://pay?pa=rkmads@icici%26pn=RKM%20Ads%26am=${totalAmount}`;

  return (
    <div className="bg-paper min-h-screen pb-20">
      <PageHeader
        title="Review & Confirm Booking"
        subtitle="Complete your billing information and verify publication schedule with 256-Bit SSL encryption."
        badge="Step 4 of 4: Final Checkout"
        breadcrumbs={[{ label: 'Book Ad', path: '/book-ad' }, { label: 'Step 4: Checkout' }]}
      />

      {/* 4-Step Wizard Stepper (Consistent with Step 1-3 on BookAdPage) */}
      <div className="bg-white border-b border-paper-line py-2.5 sm:py-3.5 px-3 sm:px-4 sticky top-[48px] sm:top-16 z-30 shadow-xs">
        <div className="max-w-7xl mx-auto flex items-center justify-between overflow-x-auto no-scrollbar gap-1 sm:gap-2">
          {/* Step 1 */}
          <button
            type="button"
            onClick={() => navigate('/book-ad')}
            className="flex items-center gap-1.5 sm:gap-2 py-1 px-2 sm:px-3 rounded-lg text-emerald-800 hover:bg-emerald-50 transition-all shrink-0 cursor-pointer text-left"
            title="Click to change edition"
          >
            <span className="w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center text-[10px] sm:text-xs font-bold shrink-0 bg-emerald-600 text-white">
              <Check className="w-3 h-3 sm:w-3.5 sm:h-3.5 stroke-[3]" />
            </span>
            <div className="flex flex-col">
              <span className="font-head text-[10px] sm:text-xs uppercase tracking-wider font-bold text-ink">
                1. Edition & Coverage
              </span>
              <span className="text-[9px] text-emerald-700 hidden md:block">
                {booking.edition}
              </span>
            </div>
          </button>

          <div className="h-px w-3 sm:w-8 bg-paper-line shrink-0" />

          {/* Step 2 */}
          <button
            type="button"
            onClick={() => navigate('/book-ad')}
            className="flex items-center gap-1.5 sm:gap-2 py-1 px-2 sm:px-3 rounded-lg text-emerald-800 hover:bg-emerald-50 transition-all shrink-0 cursor-pointer text-left"
            title="Click to change category or date"
          >
            <span className="w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center text-[10px] sm:text-xs font-bold shrink-0 bg-emerald-600 text-white">
              <Check className="w-3 h-3 sm:w-3.5 sm:h-3.5 stroke-[3]" />
            </span>
            <div className="flex flex-col">
              <span className="font-head text-[10px] sm:text-xs uppercase tracking-wider font-bold text-ink">
                2. Category & Date
              </span>
              <span className="text-[9px] text-emerald-700 hidden md:block truncate max-w-[120px]">
                {booking.category}
              </span>
            </div>
          </button>

          <div className="h-px w-3 sm:w-8 bg-paper-line shrink-0" />

          {/* Step 3 */}
          <button
            type="button"
            onClick={() => navigate('/book-ad')}
            className="flex items-center gap-1.5 sm:gap-2 py-1 px-2 sm:px-3 rounded-lg text-emerald-800 hover:bg-emerald-50 transition-all shrink-0 cursor-pointer text-left"
            title="Click to edit ad copy"
          >
            <span className="w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center text-[10px] sm:text-xs font-bold shrink-0 bg-emerald-600 text-white">
              <Check className="w-3 h-3 sm:w-3.5 sm:h-3.5 stroke-[3]" />
            </span>
            <div className="flex flex-col">
              <span className="font-head text-[10px] sm:text-xs uppercase tracking-wider font-bold text-ink">
                3. Compose & Preview
              </span>
              <span className="text-[9px] text-emerald-700 hidden md:block">
                Ad Text Ready
              </span>
            </div>
          </button>

          <div className="h-px w-3 sm:w-8 bg-paper-line shrink-0" />

          {/* Step 4: Active */}
          <div className="flex items-center gap-1.5 sm:gap-2 py-1 px-2.5 sm:px-3 rounded-lg bg-brand-light text-brand shrink-0">
            <span className="w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center text-[10px] sm:text-xs font-bold shrink-0 bg-brand text-white shadow-xs">
              4
            </span>
            <div className="flex flex-col">
              <span className="font-head text-[10px] sm:text-xs uppercase tracking-wider font-bold text-brand">
                4. Checkout & Pay
              </span>
              <span className="text-[9px] text-brand/80 hidden md:block">
                Final Step
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 pt-5 sm:pt-8 pb-20 sm:pb-12">
        <form onSubmit={handleSubmit} className="step-transition">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
            
            {/* Left Column: Billing Details & Payment Mode */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Back to Step 3 Quick Bar (Mobile & Desktop) */}
              <div className="flex items-center justify-between bg-white rounded-2xl p-3 sm:p-4 border border-paper-line shadow-xs">
                <button
                  type="button"
                  onClick={() => navigate('/book-ad')}
                  className="inline-flex items-center gap-2 text-xs font-head font-bold uppercase tracking-wider text-ink hover:text-brand transition-colors cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4 text-brand" />
                  <span>Return to Step 3 (Edit Ad Copy)</span>
                </button>
                <span className="text-[11px] font-sans text-ink-muted hidden sm:inline-flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-brand" /> Morning Press Run Closes at 8:00 PM
                </span>
              </div>

              {/* 1. Customer Contact & Billing Details */}
              <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-8 border border-paper-line shadow-press space-y-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 pb-4 border-b border-paper-line">
                  <div>
                    <h2 className="font-head text-sm sm:text-base font-bold text-ink uppercase tracking-wider flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-brand-light text-brand text-xs flex items-center justify-center font-bold">1</span>
                      Advertiser &amp; Billing Details
                    </h2>
                    <p className="text-xs text-ink-muted font-sans mt-0.5 ml-8">
                      Invoice will be generated with these details and sent via WhatsApp &amp; Email.
                    </p>
                  </div>
                  <span className="text-xs text-emerald-700 font-sans flex items-center gap-1 shrink-0 self-start sm:self-auto mt-1 sm:mt-0 ml-8 sm:ml-0 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-100 font-medium">
                    <Lock className="w-3.5 h-3.5 text-emerald-600" /> 256-Bit SSL Encrypted
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-head font-bold uppercase tracking-wider text-ink mb-1.5">
                      Full Name of Advertiser *
                    </label>
                    <input
                      required
                      type="text"
                      value={customer.fullName}
                      onChange={(e) => updateCustomer({ fullName: e.target.value })}
                      placeholder="e.g. Rahul Verma"
                      className="w-full bg-paper-tint border border-paper-line rounded-xl px-3.5 py-3 text-xs font-sans text-ink focus:outline-none focus:border-brand focus:bg-white transition-all font-medium"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-head font-bold uppercase tracking-wider text-ink mb-1.5">
                      WhatsApp Mobile Number *
                    </label>
                    <input
                      required
                      type="tel"
                      value={customer.phone}
                      onChange={(e) => updateCustomer({ phone: e.target.value })}
                      placeholder="+91 98XXXXXXXX"
                      className="w-full bg-paper-tint border border-paper-line rounded-xl px-3.5 py-3 text-xs font-sans text-ink focus:outline-none focus:border-brand focus:bg-white transition-all font-medium"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-head font-bold uppercase tracking-wider text-ink mb-1.5">
                      Email Address (For Tax Invoice) *
                    </label>
                    <input
                      required
                      type="email"
                      value={customer.email}
                      onChange={(e) => updateCustomer({ email: e.target.value })}
                      placeholder="rahul.verma@example.com"
                      className="w-full bg-paper-tint border border-paper-line rounded-xl px-3.5 py-3 text-xs font-sans text-ink focus:outline-none focus:border-brand focus:bg-white transition-all font-medium"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-head font-bold uppercase tracking-wider text-ink mb-1.5 flex items-center justify-between">
                      <span>GSTIN (Optional)</span>
                      <span className="text-[10px] text-brand font-medium">Input Tax Credit</span>
                    </label>
                    <input
                      type="text"
                      value={customer.gstin || ''}
                      onChange={(e) => updateCustomer({ gstin: e.target.value.toUpperCase() })}
                      placeholder="07AAAAA0000A1Z5"
                      className="w-full bg-paper-tint border border-paper-line rounded-xl px-3.5 py-3 text-xs font-sans text-ink focus:outline-none focus:border-brand focus:bg-white transition-all font-medium uppercase font-mono tracking-wider"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-head font-bold uppercase tracking-wider text-ink mb-1.5">
                    Billing Address &amp; City (Optional)
                  </label>
                  <input
                    type="text"
                    value={customer.address || ''}
                    onChange={(e) => updateCustomer({ address: e.target.value })}
                    placeholder="House/Office address, Sector/Area, City, Pincode"
                    className="w-full bg-paper-tint border border-paper-line rounded-xl px-3.5 py-3 text-xs font-sans text-ink focus:outline-none focus:border-brand focus:bg-white transition-all font-medium"
                  />
                </div>
              </div>

              {/* 2. Select Payment Mode */}
              <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-8 border border-paper-line shadow-press space-y-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 pb-4 border-b border-paper-line">
                  <div>
                    <h2 className="font-head text-sm sm:text-base font-bold text-ink uppercase tracking-wider flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-brand-light text-brand text-xs flex items-center justify-center font-bold">2</span>
                      Select Payment Method
                    </h2>
                    <p className="text-xs text-ink-muted font-sans mt-0.5 ml-8">
                      Direct publication release upon instant payment confirmation.
                    </p>
                  </div>
                  <span className="text-xs text-emerald-700 font-head font-semibold ml-8 sm:ml-0 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-100 self-start sm:self-auto">
                    Zero PG Surcharge
                  </span>
                </div>

                <div className="space-y-3">
                  {/* Option 1: Instant UPI QR */}
                  <label
                    className={`flex items-start gap-3.5 sm:gap-4 p-4 rounded-2xl border transition-all cursor-pointer ${
                      customer.paymentMethod === 'upi'
                        ? 'border-brand bg-brand-light/30 shadow-sm ring-1 ring-brand/30'
                        : 'border-paper-line bg-paper-tint hover:bg-white hover:border-ink-muted/30'
                    }`}
                  >
                    <input
                      type="radio"
                      name="payMethod"
                      checked={customer.paymentMethod === 'upi'}
                      onChange={() => updateCustomer({ paymentMethod: 'upi' })}
                      className="mt-1 text-brand accent-brand focus:ring-brand w-4 h-4 shrink-0 cursor-pointer"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center justify-between gap-1.5">
                        <strong className="text-xs sm:text-sm font-head font-bold text-ink flex items-center gap-2">
                          <Zap className="w-4 h-4 text-brand fill-brand" />
                          Instant UPI QR Code (Recommended)
                        </strong>
                        <span className="text-[10px] font-head font-bold uppercase bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full shrink-0">
                          Fastest Approval
                        </span>
                      </div>
                      <p className="text-xs text-ink-muted font-sans mt-1">
                        Scan directly using Google Pay, PhonePe, Paytm, or BHIM. Zero convenience fees.
                      </p>
                      <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mt-2.5 text-[11px] text-ink-muted">
                        <span className="px-2.5 py-0.5 rounded-md bg-white border border-paper-line font-medium text-ink shadow-xs">Google Pay</span>
                        <span className="px-2.5 py-0.5 rounded-md bg-white border border-paper-line font-medium text-ink shadow-xs">PhonePe</span>
                        <span className="px-2.5 py-0.5 rounded-md bg-white border border-paper-line font-medium text-ink shadow-xs">Paytm</span>
                        <span className="px-2.5 py-0.5 rounded-md bg-white border border-paper-line font-medium text-ink shadow-xs">BHIM UPI</span>
                      </div>
                    </div>
                  </label>

                  {/* Option 2: Card */}
                  <label
                    className={`flex items-start gap-3.5 sm:gap-4 p-4 rounded-2xl border transition-all cursor-pointer ${
                      customer.paymentMethod === 'card'
                        ? 'border-brand bg-brand-light/30 shadow-sm ring-1 ring-brand/30'
                        : 'border-paper-line bg-paper-tint hover:bg-white hover:border-ink-muted/30'
                    }`}
                  >
                    <input
                      type="radio"
                      name="payMethod"
                      checked={customer.paymentMethod === 'card'}
                      onChange={() => updateCustomer({ paymentMethod: 'card' })}
                      className="mt-1 text-brand accent-brand focus:ring-brand w-4 h-4 shrink-0 cursor-pointer"
                    />
                    <div className="flex-1 min-w-0">
                      <strong className="text-xs sm:text-sm font-head font-bold text-ink flex items-center gap-2">
                        <CreditCard className="w-4 h-4 text-ink-muted" />
                        Credit / Debit Card
                      </strong>
                      <p className="text-xs text-ink-muted font-sans mt-1">
                        All major Visa, MasterCard, RuPay, and American Express cards supported.
                      </p>
                    </div>
                  </label>

                  {/* Option 3: Netbanking */}
                  <label
                    className={`flex items-start gap-3.5 sm:gap-4 p-4 rounded-2xl border transition-all cursor-pointer ${
                      customer.paymentMethod === 'netbanking'
                        ? 'border-brand bg-brand-light/30 shadow-sm ring-1 ring-brand/30'
                        : 'border-paper-line bg-paper-tint hover:bg-white hover:border-ink-muted/30'
                    }`}
                  >
                    <input
                      type="radio"
                      name="payMethod"
                      checked={customer.paymentMethod === 'netbanking'}
                      onChange={() => updateCustomer({ paymentMethod: 'netbanking' })}
                      className="mt-1 text-brand accent-brand focus:ring-brand w-4 h-4 shrink-0 cursor-pointer"
                    />
                    <div className="flex-1 min-w-0">
                      <strong className="text-xs sm:text-sm font-head font-bold text-ink flex items-center gap-2">
                        <Building2 className="w-4 h-4 text-ink-muted" />
                        Net Banking &amp; Corporate NEFT
                      </strong>
                      <p className="text-xs text-ink-muted font-sans mt-1">
                        HDFC, ICICI, SBI, Axis, Kotak and 50+ commercial banks with instant settlement.
                      </p>
                    </div>
                  </label>
                </div>

                {/* Primary Action Buttons */}
                <div className="space-y-3 pt-3">
                  <button
                    type="submit"
                    className="w-full py-4 px-6 rounded-full bg-brand text-white font-head font-bold text-xs sm:text-sm tracking-wider uppercase shadow-accent hover:bg-brand-hover hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center justify-center gap-2.5 cursor-pointer"
                  >
                    <Lock className="w-4 h-4 shrink-0" />
                    <span>Pay {formatINR(totalAmount)} &amp; Release Notice</span>
                    <ArrowRight className="w-4 h-4 shrink-0" />
                  </button>

                  <button
                    type="button"
                    onClick={() => navigate('/book-ad')}
                    className="w-full py-3 px-4 rounded-full border border-paper-line text-ink-muted hover:text-ink text-xs font-head font-bold uppercase tracking-wider hover:bg-paper-soft transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back to Step 3: Edit Ad Copy &amp; Options</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Right Column: Order Review & Itemized Receipt */}
            <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-24">
              <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-7 border border-paper-line shadow-press space-y-5">
                <div className="flex items-center justify-between pb-3.5 border-b border-paper-line">
                  <div>
                    <h3 className="font-head text-sm sm:text-base font-bold text-ink uppercase tracking-wider">
                      Order Summary
                    </h3>
                    <p className="text-[11px] text-ink-muted font-sans">
                      Verified Press Insertion Docket
                    </p>
                  </div>
                  <span className="text-[10px] sm:text-[10.5px] font-head font-bold uppercase px-2.5 py-1 rounded-full bg-paper-tint border border-paper-line text-ink">
                    Official Receipt
                  </span>
                </div>

                {/* Insertion Metadata Cards */}
                <div className="space-y-2.5 text-xs font-sans">
                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-paper-tint border border-paper-line">
                    <span className="text-ink-muted font-medium">Publication:</span>
                    <span className="font-head font-bold text-ink text-right">{booking.publicationName}</span>
                  </div>

                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-paper-tint border border-paper-line">
                    <span className="text-ink-muted font-medium">Edition / Zone:</span>
                    <span className="font-semibold text-ink text-right">{booking.edition}</span>
                  </div>

                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-paper-tint border border-paper-line">
                    <span className="text-ink-muted font-medium">Category:</span>
                    <span className="font-head font-bold text-brand bg-brand-light/50 px-2.5 py-0.5 rounded-md text-right">
                      {booking.category}
                    </span>
                  </div>

                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-paper-tint border border-paper-line">
                    <span className="text-ink-muted font-medium flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-brand" />
                      Scheduled Release:
                    </span>
                    <span className="font-head font-bold text-ink text-right">
                      {booking.publishDate || 'Next Morning Issue'}
                    </span>
                  </div>

                  {booking.supportingDocName && (
                    <div className="flex items-center justify-between p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800">
                      <span className="font-medium flex items-center gap-1.5">
                        <FileText className="w-3.5 h-3.5 text-emerald-600" />
                        Attached Legal Affidavit:
                      </span>
                      <span className="truncate max-w-[150px] font-semibold text-right">
                        {booking.supportingDocName}
                      </span>
                    </div>
                  )}
                </div>

                {/* Formatted Broadsheet Ad Preview Box */}
                <div className="p-4 rounded-2xl bg-[#faf7f2] border-2 border-stone-300 font-serif text-xs leading-relaxed text-ink shadow-inner relative overflow-hidden">
                  <div className="flex items-center justify-between border-b border-stone-200 pb-2 mb-2">
                    <span className="text-[9px] font-head font-bold uppercase tracking-widest text-stone-500">
                      Live Newsprint Typography Excerpt
                    </span>
                    <span className="text-[9px] font-mono text-stone-400">
                      {booking.adFormat === 'text' ? 'ROD Classified' : 'Display Ad'}
                    </span>
                  </div>
                  <p className="line-clamp-5 italic text-stone-900 leading-normal selection:bg-amber-100">
                    "{booking.adText}"
                  </p>
                  {booking.enhancements && (
                    <div className="mt-2.5 pt-2 border-t border-stone-200 flex flex-wrap gap-1 text-[9.5px] font-head font-semibold text-stone-600">
                      {booking.enhancements.bold && <span className="bg-stone-200 px-1.5 py-0.5 rounded">Bold Header</span>}
                      {booking.enhancements.colorBg && <span className="bg-amber-200 px-1.5 py-0.5 rounded text-amber-900">Color Highlight</span>}
                      {booking.enhancements.borderTick && <span className="bg-stone-200 px-1.5 py-0.5 rounded">Border Box</span>}
                    </div>
                  )}
                </div>

                {/* Itemized Price Breakdown */}
                <div className="space-y-2 text-xs font-sans pt-3 border-t border-paper-line">
                  <div className="flex justify-between text-ink-muted">
                    <span>Base Tariff &amp; Composition</span>
                    <span className="font-mono text-ink font-semibold">
                      {formatINR(booking.calculatedPrice.subtotal)}
                    </span>
                  </div>
                  <div className="flex justify-between text-ink-muted">
                    <span>GST (5% Statutory Print Media Tax)</span>
                    <span className="font-mono text-ink font-semibold">
                      {formatINR(booking.calculatedPrice.gstAmount)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between gap-3 pt-3.5 border-t border-dashed border-paper-line">
                    <div>
                      <span className="font-head font-bold text-sm uppercase text-ink block">
                        Total Payable
                      </span>
                      <span className="text-[10px] text-ink-muted font-sans">
                        Inclusive of e-Tearsheet delivery
                      </span>
                    </div>
                    <span className="font-news-serif text-2xl sm:text-3xl font-bold text-brand font-mono whitespace-nowrap shrink-0">
                      {formatINR(totalAmount)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Guarantees Box */}
              <div className="bg-white rounded-2xl p-4 sm:p-5 border border-paper-line text-xs font-sans text-ink space-y-2.5 shadow-xs">
                <div className="flex items-center gap-2 font-head font-bold uppercase text-[11px] text-emerald-800">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>The Official RKM Ads Guarantee</span>
                </div>
                <p className="text-xs text-ink-muted leading-relaxed font-sans">
                  Every booking is verified directly by accredited INS editorial personnel. Certified digital e-tearsheet is delivered to your WhatsApp within 3 hours of morning broadsheet distribution.
                </p>
                <div className="pt-2 border-t border-paper-line flex items-center justify-between text-[10px] text-ink-muted font-head uppercase tracking-wider">
                  <span>100% Refund on rejection</span>
                  <span>INS Direct Bureau</span>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>

      {/* Dynamic UPI Payment Modal Simulation */}
      {isUpiModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full border border-paper-line shadow-2xl relative text-center space-y-4">
            <button
              onClick={() => setIsUpiModalOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-full text-ink-muted hover:bg-paper-soft hover:text-ink transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="inline-flex p-3 rounded-2xl bg-brand-light text-brand mb-1">
              <QrCode className="w-8 h-8" />
            </div>

            <h3 className="font-news-serif text-2xl font-bold text-ink">
              Scan UPI QR to Pay
            </h3>
            <p className="text-xs text-ink-muted font-sans max-w-xs mx-auto">
              Scan with any UPI app on your mobile (Google Pay, PhonePe, Paytm, BHIM)
            </p>

            {/* Simulated Dynamic QR Frame */}
            <div className="p-4 bg-paper-tint border-2 border-dashed border-paper-line rounded-2xl inline-block mx-auto shadow-sm">
              <img
                src={qrDataUrl}
                alt="UPI QR Code"
                className="w-44 h-44 object-contain rounded-lg"
              />
            </div>

            <div className="font-mono text-2xl font-bold text-brand">
              {formatINR(totalAmount)}
            </div>

            <div className="space-y-2 pt-2">
              <button
                type="button"
                disabled={isProcessing}
                onClick={handleCompletePayment}
                className="w-full py-3.5 px-6 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-head font-bold text-xs uppercase tracking-wider shadow-sm transition-all flex items-center justify-center gap-2"
              >
                {isProcessing ? (
                  <span>Verifying Payment...</span>
                ) : (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Simulate Successful UPI Payment</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() => setIsUpiModalOpen(false)}
                className="w-full py-2.5 rounded-full border border-paper-line text-ink-muted hover:text-ink text-xs font-head font-semibold uppercase tracking-wider hover:bg-paper-soft transition-colors"
              >
                Cancel &amp; Change Method
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
