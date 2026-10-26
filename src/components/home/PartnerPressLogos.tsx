import React from 'react';

export const PartnerPressLogos: React.FC = () => {
  const partners = [
    { name: 'The Times of India', type: 'Print Daily' },
    { name: 'Hindustan Times', type: 'Print Daily' },
    { name: 'Dainik Jagran', type: 'Hindi Daily' },
    { name: 'Amar Ujala', type: 'Northern Daily' },
    { name: 'The Hindu', type: 'National Daily' },
    { name: 'The Economic Times', type: 'Business Daily' },
    { name: 'Radio Mirchi 98.3', type: 'FM Radio' },
    { name: 'Red FM 93.5', type: 'FM Radio' },
    { name: 'PVR INOX', type: '70mm Multiplex' },
    { name: 'Disney+ Hotstar', type: 'OTT & CTV' },
    { name: 'Delhi Metro DMRC', type: 'Transit Media' },
    { name: 'Zee News Online', type: 'Digital PR' },
  ];

  return (
    <section className="py-12 bg-paper border-b border-paper-line overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-xs font-head font-bold uppercase tracking-widest text-ink-muted mb-8">
          Authorized Media Inventory &amp; Direct INS Concession Partnerships
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {partners.map((p, idx) => (
            <div
              key={idx}
              className="bg-paper-tint border border-paper-line rounded-2xl p-4 text-center hover:bg-white hover:border-brand/40 transition-colors shadow-sm flex flex-col justify-center items-center h-20"
            >
              <span className="font-serif font-bold text-xs sm:text-sm text-ink line-clamp-1">
                {p.name}
              </span>
              <span className="text-[10px] font-head text-ink-muted uppercase tracking-wider mt-0.5">
                {p.type}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
