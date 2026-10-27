import React, { useState } from 'react';
import { CheckCircle2, ShieldCheck, Award, Clock } from 'lucide-react';

export const LIFT_CITIES = [
  'Delhi NCR (Gurgaon / Noida / Delhi)',
  'Mumbai (MMR / Thane / Navi Mumbai)',
  'Bengaluru (Whitefield / Indiranagar / Koramangala)',
  'Hyderabad (HITEC City / Gachibowli)',
  'Pune (Kharadi / Hinjewadi / Wakad)',
  'Chennai',
  'Kolkata',
  'Ahmedabad',
  'Chandigarh Tricity',
  'Jaipur',
  'Solan',
] as const;

export const LIFT_BUILDING_TYPES = [
  'Residential High-Rise Gated Societies',
  'Grade-A Corporate IT Parks & Tech Hubs',
  'Luxury Commercial Centers & Shopping Malls',
  'Executive Co-Working & Enterprise Towers',
  'Mixed-Use Commercial & Residential Condos',
] as const;

export const LIFT_BUDGET_OPTIONS = [
  'Below ₹50,000',
  '₹50,000 - ₹1,50,000',
  '₹1,50,000 - ₹3,00,000',
  '₹3,00,000 - ₹5,00,000',
  '₹5,00,000 - ₹10,00,000',
  '₹10,00,000+',
] as const;

export const LiftConsultationCard: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    city: '',
    buildingType: '',
    numberOfSites: '',
    targetPincode: '',
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
      !formData.buildingType.trim() ||
      !formData.numberOfSites.trim() ||
      !formData.targetPincode.trim() ||
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
      id="lift-consult-planner"
      className="bg-white border border-paper-line shadow-press transition-all relative"
      style={{
        borderRadius: '56px 14px 56px 14px',
        padding: '38px 32px',
      }}
    >
      <div className="text-center mb-7">
        <h2 className="font-news-serif text-2xl sm:text-3xl font-bold text-ink tracking-tight mb-1.5">
          Start Your Lift Branding Advertising With us
        </h2>
        <div className="text-red-600 font-head font-bold text-sm tracking-wide">
          Please fill out this form
        </div>
      </div>

      {submitted ? (
        <div className="text-center py-10 px-4 bg-emerald-50 rounded-3xl border border-emerald-200">
          <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto mb-3" />
          <h3 className="font-news-serif text-xl font-bold text-emerald-900 mb-2">
            Elevator Branding Consultation Request Received!
          </h3>
          <p className="text-sm text-emerald-800 max-w-lg mx-auto mb-5 leading-relaxed">
            Thank you, <strong>{formData.name}</strong>. Our Senior Residential &amp; Corporate Media Planner will curate an RWA-cleared society list with lift counts for pincode <strong>{formData.targetPincode}</strong> and call you at <strong>{formData.phone}</strong>.
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
          {/* Row 1: Your Name, Your Phone, Your Email */}
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
                placeholder="Your Phone *"
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
                placeholder="Your Email *"
                required
                className="w-full px-4 py-3 rounded-md border border-paper-line bg-white text-ink text-sm font-sans focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-red-600 transition-all placeholder:text-ink-muted/60"
              />
            </div>
          </div>

          {/* Row 2: Select Select City, Select Building Type, No. Of Sites/Screens */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <select
                name="city"
                value={formData.city}
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
                <option value="" disabled>Select Select City *</option>
                {LIFT_CITIES.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </div>
            <div className="relative">
              <select
                name="buildingType"
                value={formData.buildingType}
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
                <option value="" disabled>Select Building Type *</option>
                {LIFT_BUILDING_TYPES.map((type) => (
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
                placeholder="No. Of Sites/Screens *"
                required
                className="w-full px-4 py-3 rounded-md border border-paper-line bg-white text-ink text-sm font-sans focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-red-600 transition-all placeholder:text-ink-muted/60"
              />
            </div>
          </div>

          {/* Row 3: Taget Pincode, Select Campaign Budget, Consult Media Planner Button */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
            <div>
              <input
                type="text"
                name="targetPincode"
                value={formData.targetPincode}
                onChange={handleChange}
                placeholder="Taget Pincode *"
                required
                className="w-full px-4 py-3 rounded-md border border-paper-line bg-white text-ink text-sm font-sans focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-red-600 transition-all placeholder:text-ink-muted/60"
              />
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
                <option value="" disabled>Select Campaign Budget *</option>
                {LIFT_BUDGET_OPTIONS.map((b) => (
                  <option key={b} value={b}>
                    {b}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <button
                type="submit"
                className="w-full py-3 px-4 rounded-md bg-red-600 text-white font-head font-bold text-sm tracking-wide hover:bg-red-700 active:bg-red-800 transition-colors shadow-md flex items-center justify-center cursor-pointer"
              >
                Consult Media Planner
              </button>
            </div>
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
            100% RWA Society Permissions
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
            Geo-Tagged Audit Photos
          </span>
        </div>
      </div>
    </div>
  );
};
