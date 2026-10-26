import React, { useState } from 'react';
import { PageHeader } from '../components/layout/PageHeader';
import { Phone, Mail, MapPin, Clock, Send, CheckCircle2 } from 'lucide-react';
import { MEDIA_VERTICALS } from '../data/mediaData';

export const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    vertical: 'newspaper',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setFormData({ name: '', phone: '', email: '', vertical: 'newspaper', message: '' });
    }, 4000);
  };

  return (
    <div className="bg-paper min-h-screen pb-20">
      <PageHeader
        title="Contact RKM Ads Customer Care &amp; Advisory Desk"
        subtitle="Speak directly with our media planners, check press cut-off statuses, or request custom commercial campaign proposals."
        badge="24/7 Dedicated Client Support"
        breadcrumbs={[{ label: 'Contact Us' }]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Form */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-paper-line shadow-press space-y-6">
            <div>
              <h2 className="font-news-serif text-2xl font-bold text-ink">
                Send an Inquiry or RFP
              </h2>
              <p className="text-xs text-ink-muted font-sans mt-0.5">
                Our media operations desk typically responds within 15 minutes during business hours.
              </p>
            </div>

            {isSubmitted ? (
              <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-3 animate-in fade-in">
                <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                <h3 className="font-head text-base font-bold text-emerald-900 uppercase tracking-wider">
                  Inquiry Received Successfully!
                </h3>
                <p className="text-xs text-emerald-800 font-sans max-w-sm mx-auto">
                  An RKM Ads media specialist will call you on your provided phone number shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-head font-bold uppercase tracking-wider text-ink mb-1.5">
                      Your Name *
                    </label>
                    <input
                      required
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Rahul Verma"
                      className="w-full bg-paper-tint border border-paper-line rounded-xl px-3.5 py-3 text-xs font-sans text-ink focus:outline-none focus:border-brand font-medium"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-head font-bold uppercase tracking-wider text-ink mb-1.5">
                      Contact Number *
                    </label>
                    <input
                      required
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
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
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="rahul@example.com"
                      className="w-full bg-paper-tint border border-paper-line rounded-xl px-3.5 py-3 text-xs font-sans text-ink focus:outline-none focus:border-brand font-medium"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-head font-bold uppercase tracking-wider text-ink mb-1.5">
                      Media Channel of Interest
                    </label>
                    <select
                      value={formData.vertical}
                      onChange={(e) => setFormData({ ...formData, vertical: e.target.value })}
                      className="w-full bg-paper-tint border border-paper-line rounded-xl px-3.5 py-3 text-xs font-sans text-ink focus:outline-none focus:border-brand font-medium"
                    >
                      {MEDIA_VERTICALS.map((v) => (
                        <option key={v.id} value={v.id}>
                          {v.shortTitle}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-head font-bold uppercase tracking-wider text-ink mb-1.5">
                    Your Requirements &amp; Target Cities / Dates
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Provide details about your desired ad category, publications, budget range, or specific queries..."
                    className="w-full bg-paper-tint border border-paper-line rounded-xl p-3.5 text-xs font-sans text-ink focus:outline-none focus:border-brand resize-none leading-relaxed"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 px-6 rounded-full bg-brand text-white font-head font-bold text-xs uppercase tracking-wider shadow-accent hover:bg-brand-hover hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Submit Inquiry to Media Planner</span>
                </button>
              </form>
            )}
          </div>

          {/* Right: Contact Information & HQ */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-paper-line shadow-press space-y-6">
              <h3 className="font-news-serif text-2xl font-bold text-ink">
                Headquarters &amp; Direct Helplines
              </h3>

              <div className="space-y-4 text-xs font-sans text-ink-muted">
                <div className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-paper-tint border border-paper-line">
                  <Phone className="w-5 h-5 text-brand shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-sm font-head font-bold text-ink block">
                      Phone Helpline &amp; WhatsApp
                    </strong>
                    <a href="tel:+919878339302" className="text-brand font-semibold text-sm">
                      +91 98783 39302
                    </a>
                    <div className="text-[11px] text-ink-muted mt-0.5">
                      Toll-free booking helpline for all Indian states
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-paper-tint border border-paper-line">
                  <Mail className="w-5 h-5 text-brand shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-sm font-head font-bold text-ink block">
                      Editorial &amp; Client Support
                    </strong>
                    <a href="mailto:support@rkmads.com" className="text-brand font-semibold text-xs">
                      support@rkmads.com
                    </a>
                    <div className="text-[11px] text-ink-muted mt-0.5">
                      Send affidavits, court orders &amp; tax exemption certificates
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-paper-tint border border-paper-line">
                  <MapPin className="w-5 h-5 text-brand shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-sm font-head font-bold text-ink block">
                      Noida Corporate Headquarters
                    </strong>
                    <p className="text-xs leading-relaxed text-ink mt-0.5">
                      Plot B-14, IT &amp; Media Park, Sector 58, Noida, NCR, Uttar Pradesh 201301
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-paper-tint border border-paper-line">
                  <Clock className="w-5 h-5 text-brand shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-sm font-head font-bold text-ink block">
                      Operating Hours
                    </strong>
                    <div className="text-xs text-ink mt-0.5">
                      Monday to Saturday: 9:00 AM – 8:00 PM IST
                    </div>
                    <div className="text-[11px] text-ink-muted">
                      Online portal operates 24/7/365 with automated press cut-off scheduling
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Regional Presence */}
            <div className="bg-paper-tint rounded-2xl p-4 border border-paper-line text-xs font-sans text-ink-muted">
              <span className="font-head font-bold text-[11px] uppercase tracking-wider text-ink block mb-1">
                Regional Liaison Desks:
              </span>
              <p>
                <strong>Mumbai:</strong> Nariman Point • <strong>Bengaluru:</strong> MG Road • <strong>Kolkata:</strong> Park Street • <strong>Chandigarh:</strong> Sector 17
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
