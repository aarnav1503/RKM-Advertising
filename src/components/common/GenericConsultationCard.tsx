import React, { useState } from 'react';
import { CheckCircle2, ShieldCheck, Award, Clock } from 'lucide-react';
import { MediaVerticalInfo } from '../../types';

interface GenericConsultationCardProps {
  vertical: MediaVerticalInfo;
}

export const GenericConsultationCard: React.FC<GenericConsultationCardProps> = ({ vertical }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    city: '',
    formatTitle: '',
    targetScale: '',
    timeline: '',
    budget: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !formData.name.trim() ||
      !formData.phone.trim() ||
      !formData.email.trim() ||
      !formData.city.trim() ||
      !formData.formatTitle.trim() ||
      !formData.targetScale.trim() ||
      !formData.timeline.trim() ||
      !formData.budget.trim()
    ) {
      alert('Please fill out all mandatory fields before consulting.');
      return;
    }
    setSubmitted(true);
  };

  const selectArrow = `url("data:image/svg+xml;utf8,<svg fill='none' height='24' stroke='%235A514A' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' viewBox='0 0 24 24' width='24' xmlns='http://www.w3.org/2000/svg'><polyline points='6 9 12 15 18 9'></polyline></svg>")`;

  return (
    <div
      id={`${vertical.id}-consult-planner`}
      className="bg-white border border-paper-line shadow-press transition-all relative"
      style={{
        borderRadius: '56px 14px 56px 14px',
        padding: '38px 32px',
      }}
    >
      <div className="text-center mb-7">
        <h2 className="font-news-serif text-2xl sm:text-3xl font-bold text-ink tracking-tight mb-1.5">
          Start Your {vertical.shortTitle} Advertising With us
        </h2>
        <div className="text-red-600 font-head font-bold text-sm tracking-wide">
          Please fill out this form
        </div>
      </div>

      {submitted ? (
        <div className="p-8 text-center bg-emerald-50 rounded-2xl border border-emerald-200 space-y-3">
          <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <h3 className="font-news-serif text-2xl font-bold text-ink">
            Media Planner Request Received!
          </h3>
          <p className="text-xs sm:text-sm text-ink-muted max-w-lg mx-auto">
            Thank you, <strong className="text-ink">{formData.name}</strong>. Our Senior {vertical.shortTitle} Media Planner will contact you at{' '}
            <strong className="text-ink">{formData.phone}</strong> within 2 hours with customized rates and plans for{' '}
            <strong className="text-ink">{formData.city}</strong>.
          </p>
          <div className="pt-2">
            <button
              type="button"
              onClick={() => {
                setSubmitted(false);
                setFormData({
                  name: '',
                  phone: '',
                  email: '',
                  city: '',
                  formatTitle: '',
                  targetScale: '',
                  timeline: '',
                  budget: '',
                });
              }}
              className="text-xs font-head font-bold uppercase tracking-wider text-brand hover:underline"
            >
              Submit Another Inquiry
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Row 1: Name, Phone, Email */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder="Your Name *"
                className="w-full px-4 py-3 rounded-xl border border-paper-line bg-paper-tint text-xs sm:text-sm font-sans text-ink placeholder-ink-muted/70 focus:outline-none focus:border-ink focus:bg-white transition-all shadow-inner"
              />
            </div>

            <div>
              <input
                type="tel"
                name="phone"
                required
                value={formData.phone}
                onChange={handleChange}
                placeholder="Phone Number *"
                className="w-full px-4 py-3 rounded-xl border border-paper-line bg-paper-tint text-xs sm:text-sm font-sans text-ink placeholder-ink-muted/70 focus:outline-none focus:border-ink focus:bg-white transition-all shadow-inner"
              />
            </div>

            <div>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="Email Address *"
                className="w-full px-4 py-3 rounded-xl border border-paper-line bg-paper-tint text-xs sm:text-sm font-sans text-ink placeholder-ink-muted/70 focus:outline-none focus:border-ink focus:bg-white transition-all shadow-inner"
              />
            </div>
          </div>

          {/* Row 2: City, Format, Target Scale */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <input
                type="text"
                name="city"
                required
                value={formData.city}
                onChange={handleChange}
                placeholder="City / Region *"
                className="w-full px-4 py-3 rounded-xl border border-paper-line bg-paper-tint text-xs sm:text-sm font-sans text-ink placeholder-ink-muted/70 focus:outline-none focus:border-ink focus:bg-white transition-all shadow-inner"
              />
            </div>

            <div>
              <select
                name="formatTitle"
                required
                value={formData.formatTitle}
                onChange={handleChange}
                style={{
                  backgroundImage: selectArrow,
                  backgroundPosition: 'right 0.85rem center',
                  backgroundRepeat: 'no-repeat',
                  backgroundSize: '1.1em 1.1em',
                  paddingRight: '2.5rem',
                }}
                className="w-full px-4 py-3 rounded-xl border border-paper-line bg-paper-tint text-xs sm:text-sm font-sans text-ink focus:outline-none focus:border-ink focus:bg-white transition-all appearance-none cursor-pointer shadow-inner"
              >
                <option value="" disabled>Select Media Format *</option>
                {vertical.formats.map((fmt, idx) => (
                  <option key={idx} value={fmt.title}>
                    {fmt.title} ({fmt.rate})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <input
                type="text"
                name="targetScale"
                required
                value={formData.targetScale}
                onChange={handleChange}
                placeholder="Campaign Scale / Volume *"
                className="w-full px-4 py-3 rounded-xl border border-paper-line bg-paper-tint text-xs sm:text-sm font-sans text-ink placeholder-ink-muted/70 focus:outline-none focus:border-ink focus:bg-white transition-all shadow-inner"
              />
            </div>
          </div>

          {/* Row 3: Timeline, Budget */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <select
                name="timeline"
                required
                value={formData.timeline}
                onChange={handleChange}
                style={{
                  backgroundImage: selectArrow,
                  backgroundPosition: 'right 0.85rem center',
                  backgroundRepeat: 'no-repeat',
                  backgroundSize: '1.1em 1.1em',
                  paddingRight: '2.5rem',
                }}
                className="w-full px-4 py-3 rounded-xl border border-paper-line bg-paper-tint text-xs sm:text-sm font-sans text-ink focus:outline-none focus:border-ink focus:bg-white transition-all appearance-none cursor-pointer shadow-inner"
              >
                <option value="" disabled>Desired Timeline *</option>
                <option value="Immediate (Next 7 Days)">Immediate (Next 7 Days)</option>
                <option value="This Month">This Month</option>
                <option value="Next Month">Next Month</option>
                <option value="Quarterly / Long-term Planning">Quarterly / Long-term Planning</option>
              </select>
            </div>

            <div>
              <select
                name="budget"
                required
                value={formData.budget}
                onChange={handleChange}
                style={{
                  backgroundImage: selectArrow,
                  backgroundPosition: 'right 0.85rem center',
                  backgroundRepeat: 'no-repeat',
                  backgroundSize: '1.1em 1.1em',
                  paddingRight: '2.5rem',
                }}
                className="w-full px-4 py-3 rounded-xl border border-paper-line bg-paper-tint text-xs sm:text-sm font-sans text-ink focus:outline-none focus:border-ink focus:bg-white transition-all appearance-none cursor-pointer shadow-inner"
              >
                <option value="" disabled>Select Campaign Budget *</option>
                <option value="Below ₹50,000">Below ₹50,000</option>
                <option value="₹50,000 - ₹1,50,000">₹50,000 - ₹1,50,000</option>
                <option value="₹1,50,000 - ₹3,00,000">₹1,50,000 - ₹3,00,000</option>
                <option value="₹3,00,000 - ₹5,00,000">₹3,00,000 - ₹5,00,000</option>
                <option value="₹5,00,000 - ₹10,00,000">₹5,00,000 - ₹10,00,000</option>
                <option value="₹10,00,000+">₹10,00,000+</option>
              </select>
            </div>
          </div>

          {/* Submit Action */}
          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-3.5 rounded-lg bg-red-600 hover:bg-red-700 active:bg-red-800 text-white font-head font-bold text-xs sm:text-sm uppercase tracking-wider shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer"
            >
              Consult Media Planner
            </button>
          </div>
        </form>
      )}

      {/* Trust Badges */}
      <div className="mt-7 pt-6 border-t border-paper-line grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="flex items-center gap-2.5">
          <Clock className="w-4 h-4 text-brand shrink-0" />
          <span className="text-[11px] font-head font-semibold text-ink-muted uppercase tracking-wider">
            Fast-Track 2-Hour Response
          </span>
        </div>
        <div className="flex items-center gap-2.5">
          <Award className="w-4 h-4 text-brand shrink-0" />
          <span className="text-[11px] font-head font-semibold text-ink-muted uppercase tracking-wider">
            Direct Concession Rates
          </span>
        </div>
        <div className="flex items-center gap-2.5">
          <ShieldCheck className="w-4 h-4 text-brand shrink-0" />
          <span className="text-[11px] font-head font-semibold text-ink-muted uppercase tracking-wider">
            INS Accredited Agency
          </span>
        </div>
        <div className="flex items-center gap-2.5">
          <CheckCircle2 className="w-4 h-4 text-brand shrink-0" />
          <span className="text-[11px] font-head font-semibold text-ink-muted uppercase tracking-wider">
            100% Campaign Proofing
          </span>
        </div>
      </div>
    </div>
  );
};
