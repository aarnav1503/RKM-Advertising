import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBooking } from '../context/BookingContext';
import { PageHeader } from '../components/layout/PageHeader';
import { formatINR } from '../data/publicationsData';
import { ShieldCheck, Lock, QrCode, ArrowRight, X, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';

export const CheckoutPage: React.FC = () => {
  const navigate = useNavigate();
  const { booking, customer, updateCustomer, placeOrder } = useBooking();
  const [isUpiModalOpen, setIsUpiModalOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (customer.paymentMethod === 'upi') {
      setIsUpiModalOpen(true);
    } else {
      // Simulate direct card / netbanking completion
      handleCompletePayment();
    }
  };

  const handleCompletePayment = () => {
    setIsProcessing(true);
    // Fire celebratory confetti!
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
        title="Review &amp; Confirm Booking"
        subtitle="Complete your billing information and verify publication schedule with 256-Bit SSL encryption."
        badge="Secure Express Checkout"
        breadcrumbs={[{ label: 'Book Ad', path: '/book-ad' }, { label: 'Checkout' }]}
      />

      <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 pt-4 sm:pt-8 pb-20 sm:pb-12">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
            {/* Left: Billing Form & Payment Options */}
            <div className="lg:col-span-7 space-y-5 sm:space-y-6">
              {/* Customer Contact Details */}
              <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-8 border border-paper-line shadow-press space-y-4 sm:space-y-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 pb-3 border-b border-paper-line">
                  <h2 className="font-head text-sm sm:text-base font-bold text-ink uppercase tracking-wider">
                    1. Advertiser &amp; Billing Details
                  </h2>
                  <span className="text-xs text-ink-muted font-sans flex items-center gap-1">
                    <Lock className="w-3.5 h-3.5 text-brand" /> 256-Bit SSL Secure
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-head font-bold uppercase tracking-wider text-ink mb-1.5">
                      Full Name *
                    </label>
                    <input
                      required
                      type="text"
                      value={customer.fullName}
                      onChange={(e) => updateCustomer({ fullName: e.target.value })}
                      placeholder="e.g. Rahul Verma"
                      className="w-full bg-paper-tint border border-paper-line rounded-xl px-3.5 py-3 text-xs font-sans text-ink focus:outline-none focus:border-brand font-medium"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-head font-bold uppercase tracking-wider text-ink mb-1.5">
                      Mobile Number (For WhatsApp Receipt) *
                    </label>
                    <input
                      required
                      type="tel"
                      value={customer.phone}
                      onChange={(e) => updateCustomer({ phone: e.target.value })}
                      placeholder="+91 98XXXXXXXX"
                      className="w-full bg-paper-tint border border-paper-line rounded-xl px-3.5 py-3 text-xs font-sans text-ink focus:outline-none focus:border-brand font-medium"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-head font-bold uppercase tracking-wider text-ink mb-1.5">
                      Email Address *
                    </label>
                    <input
                      required
                      type="email"
                      value={customer.email}
                      onChange={(e) => updateCustomer({ email: e.target.value })}
                      placeholder="rahul.verma@example.com"
                      className="w-full bg-paper-tint border border-paper-line rounded-xl px-3.5 py-3 text-xs font-sans text-ink focus:outline-none focus:border-brand font-medium"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-head font-bold uppercase tracking-wider text-ink mb-1.5 flex items-center justify-between">
                      <span>GSTIN (Optional)</span>
                      <span className="text-[10px] text-ink-muted">For Tax Credit</span>
                    </label>
                    <input
                      type="text"
                      value={customer.gstin || ''}
                      onChange={(e) => updateCustomer({ gstin: e.target.value.toUpperCase() })}
                      placeholder="07AAAAA0000A1Z5"
                      className="w-full bg-paper-tint border border-paper-line rounded-xl px-3.5 py-3 text-xs font-sans text-ink focus:outline-none focus:border-brand font-medium uppercase font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-head font-bold uppercase tracking-wider text-ink mb-1.5">
                    Billing Address &amp; City
                  </label>
                  <input
                    type="text"
                    value={customer.address || ''}
                    onChange={(e) => updateCustomer({ address: e.target.value })}
                    placeholder="House/Office address, Sector/Area, City, Pincode"
                    className="w-full bg-paper-tint border border-paper-line rounded-xl px-3.5 py-3 text-xs font-sans text-ink focus:outline-none focus:border-brand font-medium"
                  />
                </div>
              </div>

              {/* Payment Methods */}
              <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-8 border border-paper-line shadow-press space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 pb-3 border-b border-paper-line">
                  <h2 className="font-head text-sm sm:text-base font-bold text-ink uppercase tracking-wider">
                    2. Select Payment Method
                  </h2>
                  <span className="text-xs text-emerald-700 font-head font-semibold">
                    Zero Payment Gateway Surcharge
                  </span>
                </div>

                {/* Option 1: Instant UPI QR */}
                <label
                  className={`flex items-start gap-3 sm:gap-4 p-3.5 sm:p-4 rounded-xl sm:rounded-2xl border transition-all cursor-pointer ${
                    customer.paymentMethod === 'upi'
                      ? 'border-brand bg-brand-light/30 shadow-sm'
                      : 'border-paper-line bg-paper-tint hover:bg-white'
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
                      <strong className="text-xs sm:text-sm font-head font-bold text-ink">
                        Instant UPI QR Code (Recommended)
                      </strong>
                      <span className="text-[9.5px] sm:text-[10.5px] font-head font-bold uppercase bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full shrink-0">
                        Fastest Approval
                      </span>
                    </div>
                    <p className="text-xs text-ink-muted font-sans mt-0.5">
                      Scan via Google Pay, PhonePe, Paytm, or BHIM. Zero convenience fees.
                    </p>
                    <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mt-2 text-[10.5px] sm:text-[11px] text-ink-muted">
                      <span className="px-2 py-0.5 rounded bg-white border border-paper-line">Google Pay</span>
                      <span className="px-2 py-0.5 rounded bg-white border border-paper-line">PhonePe</span>
                      <span className="px-2 py-0.5 rounded bg-white border border-paper-line">Paytm</span>
                      <span className="px-2 py-0.5 rounded bg-white border border-paper-line">BHIM UPI</span>
                    </div>
                  </div>
                </label>

                {/* Option 2: Card */}
                <label
                  className={`flex items-start gap-3 sm:gap-4 p-3.5 sm:p-4 rounded-xl sm:rounded-2xl border transition-all cursor-pointer ${
                    customer.paymentMethod === 'card'
                      ? 'border-brand bg-brand-light/30 shadow-sm'
                      : 'border-paper-line bg-paper-tint hover:bg-white'
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
                    <strong className="text-xs sm:text-sm font-head font-bold text-ink block">
                      Credit / Debit Card
                    </strong>
                    <p className="text-xs text-ink-muted font-sans mt-0.5">
                      Visa, MasterCard, RuPay, American Express corporate cards.
                    </p>
                  </div>
                </label>

                {/* Option 3: Netbanking */}
                <label
                  className={`flex items-start gap-3 sm:gap-4 p-3.5 sm:p-4 rounded-xl sm:rounded-2xl border transition-all cursor-pointer ${
                    customer.paymentMethod === 'netbanking'
                      ? 'border-brand bg-brand-light/30 shadow-sm'
                      : 'border-paper-line bg-paper-tint hover:bg-white'
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
                    <strong className="text-xs sm:text-sm font-head font-bold text-ink block">
                      Net Banking &amp; NEFT / RTGS
                    </strong>
                    <p className="text-xs text-ink-muted font-sans mt-0.5">
                      HDFC, ICICI, SBI, Axis, Kotak and 50+ commercial banks.
                    </p>
                  </div>
                </label>

                <button
                  type="submit"
                  className="w-full mt-4 py-3.5 sm:py-4 px-4 sm:px-6 rounded-full bg-brand text-white font-head font-bold text-xs sm:text-sm tracking-wider uppercase shadow-accent hover:bg-brand-hover hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2"
                >
                  <Lock className="w-4 h-4 shrink-0" />
                  <span className="text-center">
                    Pay {formatINR(totalAmount)} &amp; Release to Editorial Desk
                  </span>
                  <ArrowRight className="w-4 h-4 shrink-0" />
                </button>
              </div>
            </div>

            {/* Right: Order Review & Itemized Summary */}
            <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-24">
              <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-7 border border-paper-line shadow-press space-y-4 sm:space-y-5">
                <div className="flex items-center justify-between pb-3 border-b border-paper-line">
                  <h3 className="font-head text-sm sm:text-base font-bold text-ink uppercase tracking-wider">
                    Order Summary
                  </h3>
                  <span className="text-[10.5px] sm:text-[11px] font-head font-semibold px-2.5 py-0.5 rounded-full bg-paper-tint border border-paper-line text-ink">
                    Itemized Receipt
                  </span>
                </div>

                <div className="space-y-2.5 text-xs font-sans text-ink-muted">
                  <div className="flex justify-between">
                    <span className="font-semibold text-ink">Publication:</span>
                    <span>{booking.publicationName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold text-ink">Edition / Territory:</span>
                    <span>{booking.edition}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold text-ink">Category:</span>
                    <span className="font-bold text-ink">{booking.category}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold text-ink">Scheduled Print Date:</span>
                    <span className="font-bold text-brand">{booking.publishDate || 'Next Morning Issue'}</span>
                  </div>
                  {booking.supportingDocName && (
                    <div className="flex justify-between text-emerald-700">
                      <span className="font-semibold">Attached Document:</span>
                      <span className="truncate max-w-[160px]">{booking.supportingDocName}</span>
                    </div>
                  )}
                </div>

                {/* Formatted Ad Preview Box */}
                <div className="p-3.5 rounded-2xl bg-paper-tint border border-paper-line font-serif text-xs leading-relaxed text-ink shadow-inner">
                  <div className="text-[9.5px] font-head font-bold uppercase tracking-widest text-ink-muted mb-1">
                    Live Notice Text Preview:
                  </div>
                  <p className="line-clamp-4 italic">
                    "{booking.adText}"
                  </p>
                </div>

                {/* Price Breakdown */}
                <div className="space-y-2 text-xs font-sans pt-3 border-t border-paper-line">
                  <div className="flex justify-between text-ink-muted">
                    <span>Subtotal</span>
                    <span className="font-mono text-ink font-semibold">
                      {formatINR(booking.calculatedPrice.subtotal)}
                    </span>
                  </div>
                  <div className="flex justify-between text-ink-muted">
                    <span>GST (5% Statutory Print Tax)</span>
                    <span className="font-mono text-ink font-semibold">
                      {formatINR(booking.calculatedPrice.gstAmount)}
                    </span>
                  </div>
                  <div className="flex items-baseline justify-between pt-3 border-t border-dashed border-paper-line">
                    <span className="font-head font-bold text-sm uppercase text-ink">
                      Total Payable
                    </span>
                    <span className="font-news-serif text-2xl font-bold text-brand font-mono">
                      {formatINR(totalAmount)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Guarantees Box */}
              <div className="bg-paper-tint rounded-2xl p-4 border border-paper-line text-xs font-sans text-ink-muted space-y-2">
                <div className="flex items-center gap-2 font-head font-bold uppercase text-[11px] text-ink">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>The RKM Ads Guarantee</span>
                </div>
                <p className="leading-relaxed">
                  Every order is verified by our editorial desk and submitted directly into the morning press run. If an ad cannot be printed due to cut-off or affidavit rejection, a 100% refund is credited immediately.
                </p>
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
