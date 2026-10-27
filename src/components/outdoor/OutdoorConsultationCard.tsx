import React, { useState } from 'react';
import { CheckCircle2, ShieldCheck, Award, Clock } from 'lucide-react';
import {
  OUTDOOR_MEDIA_TYPES,
  ILLUMINATION_OPTIONS,
  BUDGET_OPTIONS,
} from '../../data/outdoorData';

export const OutdoorConsultationCard: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    city: '',
    mediaType: '',
    numberOfSites: '',
    illumination: '',
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
      !formData.mediaType.trim() ||
      !formData.numberOfSites.trim() ||
      !formData.illumination.trim() ||
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
      id="outdoor-consult-planner"
      className="bg-white border border-paper-line shadow-press transition-all relative"
      style={{
        borderRadius: '56px 14px 56px 14px',
        padding: '38px 32px',
      }}
    >
      <div className="text-center mb-7">
        <h2 className="font-news-serif text-2xl sm:text-3xl font-bold text-ink tracking-tight mb-1.5">
          Start Your Outdoor / DOOH Advertising With us
        </h2>
        <div className="text-red-600 font-head font-bold text-sm tracking-wide">
          Please fill out this form
        </div>
      </div>

      {submitted ? (
        <div className="text-center py-10 px-4 bg-emerald-50 rounded-3xl border border-emerald-200">
          <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto mb-3" />
          <h3 className="font-news-serif text-xl font-bold text-emerald-900 mb-2">
            Consultation Request Received!
          </h3>
          <p className="text-sm text-emerald-800 max-w-lg mx-auto mb-5 leading-relaxed">
            Thank you, <strong>{formData.name}</strong>. Our senior Outdoor Media Planner will prepare an availability deck with geotagged coordinates and reach out to you at <strong>{formData.phone}</strong>.
          </p>
          <button
            type="button"
            onClick={() => setSubmitted(false)}
            className="px-6 py-2.5 rounded-md bg-red-600 text-white font-head font-bold text-xs uppercase tracking-wider hover:bg-red-700 transition-colors shadow-sm"
          >
            Submit Another Request
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Row 1: Name, Phone, Email */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your Name *"
                required
                className="w-full px-4 py-3 rounded-md border border-paper-line bg-white text-ink text-sm font-sans focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-red-600 transition-all placeholder:text-ink-muted/60"
              />
            </div>
            <div>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Phone Number *"
                required
                className="w-full px-4 py-3 rounded-md border border-paper-line bg-white text-ink text-sm font-sans focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-red-600 transition-all placeholder:text-ink-muted/60"
              />
            </div>
            <div>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email Address *"
                required
                className="w-full px-4 py-3 rounded-md border border-paper-line bg-white text-ink text-sm font-sans focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-red-600 transition-all placeholder:text-ink-muted/60"
              />
            </div>
          </div>

          {/* Row 2: City, Select Media Type, Number of Sites */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                placeholder="City (e.g. Solan, Delhi NCR) *"
                required
                className="w-full px-4 py-3 rounded-md border border-paper-line bg-white text-ink text-sm font-sans focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-red-600 transition-all placeholder:text-ink-muted/60"
              />
            </div>
            <div className="relative">
              <select
                name="mediaType"
                value={formData.mediaType}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 pr-10 rounded-md border border-paper-line bg-white text-ink text-sm font-sans focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-red-600 transition-all appearance-none cursor-pointer"
                style={{
                  backgroundImage: selectArrow,
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'right 12px center',
                  backgroundSize: '16px',
                }}
              >
                <option value="">Select Media Type *</option>
                {OUTDOOR_MEDIA_TYPES.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <input
                type="text"
                name="numberOfSites"
                value={formData.numberOfSites}
                onChange={handleChange}
                placeholder="Number of Sites *"
                required
                className="w-full px-4 py-3 rounded-md border border-paper-line bg-white text-ink text-sm font-sans focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-red-600 transition-all placeholder:text-ink-muted/60"
              />
            </div>
          </div>

          {/* Row 3: Select Illumination, Select Campaign Budget, Consult Media Planner button */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
            <div className="relative">
              <select
                name="illumination"
                value={formData.illumination}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 pr-10 rounded-md border border-paper-line bg-white text-ink text-sm font-sans focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-red-600 transition-all appearance-none cursor-pointer"
                style={{
                  backgroundImage: selectArrow,
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'right 12px center',
                  backgroundSize: '16px',
                }}
              >
                <option value="">Select Illumination *</option>
                {ILLUMINATION_OPTIONS.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>
            <div className="relative">
              <select
                name="budget"
                value={formData.budget}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 pr-10 rounded-md border border-paper-line bg-white text-ink text-sm font-sans focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-red-600 transition-all appearance-none cursor-pointer"
                style={{
                  backgroundImage: selectArrow,
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'right 12px center',
                  backgroundSize: '16px',
                }}
              >
                <option value="">Select Campaign Budget *</option>
                {BUDGET_OPTIONS.map((b) => (
                  <option key={b} value={b}>
                    {b}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <button
                type="submit"
                className="w-full py-3.5 px-6 rounded-md bg-red-600 hover:bg-red-700 text-white font-head font-bold text-sm uppercase tracking-wider transition-all shadow-md hover:shadow-lg active:scale-[0.99] flex items-center justify-center gap-2"
              >
                <span>Consult Media Planner</span>
              </button>
            </div>
          </div>
        </form>
      )}

      {/* Trust Guarantees */}
      <div className="mt-8 pt-6 border-t border-paper-line grid grid-cols-1 sm:grid-cols-3 gap-4 text-center sm:text-left text-xs font-sans text-ink-muted">
        <div className="flex items-center gap-2 justify-center sm:justify-start">
          <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
          <span><strong>100% Licensed:</strong> MCD, BMC &amp; State Authorities</span>
        </div>
        <div className="flex items-center gap-2 justify-center sm:justify-start">
          <Award className="w-4 h-4 text-blue-600 shrink-0" />
          <span><strong>Heavy Vinyl:</strong> 380-420 GSM UV-Treated Flex</span>
        </div>
        <div className="flex items-center gap-2 justify-center sm:justify-start">
          <Clock className="w-4 h-4 text-brand shrink-0" />
          <span><strong>Night Illumination:</strong> Automated timer switches</span>
        </div>
      </div>
    </div>
  );
};
