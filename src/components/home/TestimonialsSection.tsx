import React from 'react';
import { Star, ShieldCheck, Quote } from 'lucide-react';

export const TestimonialsSection: React.FC = () => {
  const reviews = [
    {
      name: 'Adv. Sudhir Malhotra',
      role: 'Senior Advocate, Delhi High Court',
      category: 'Public & Court Notices',
      quote:
        'Booking statutory title notices and court summons used to take days of running to newspaper offices. With RKM Ads, I submit the advocate letterhead, pick the dates, and receive the certified digital e-Tearsheet by 9 AM release day.',
      rating: 5,
    },
    {
      name: 'Pooja & Rajesh Singhal',
      role: 'Family Advertisers, Gurugram',
      category: 'Matrimonial Ad (TOI Sunday)',
      quote:
        'The live broadsheet simulator was fantastic. We could see exactly how our daughter’s matrimonial notice would look in print with bold title and tick marks. We received genuine responses on Sunday itself.',
      rating: 5,
    },
    {
      name: 'Vikramaditya Roy',
      role: 'Marketing Head, Retail Chains',
      category: 'Radio FM & Transit Media',
      quote:
        'We ran an integrated 10-city radio campaign across Radio Mirchi and Red FM paired with metro pillar wraps. RKM Ads provided crystal clear RO logs, spot telecast certificates, and independent photo audit proofing.',
      rating: 5,
    },
  ];

  return (
    <section className="py-16 sm:py-24 bg-paper border-b border-paper-line">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-paper-tint border border-paper-line text-xs font-head font-bold uppercase tracking-wider text-ink mb-3">
            <Star className="w-3.5 h-3.5 text-brand-amber fill-brand-amber" />
            <span>4.9 / 5 Rating Across 12,000+ Reviews</span>
          </div>
          <h2 className="font-news-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-ink tracking-tight mb-4">
            Trusted by Legal Counsel, Businesses &amp; Families
          </h2>
          <p className="text-sm sm:text-base text-ink-muted font-sans">
            Read verified experiences from advertisers who booked print notices, broadcast campaigns, and digital PR.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((r, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl p-6 sm:p-7 border border-paper-line shadow-press flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex gap-1 text-brand-amber">
                    {[...Array(r.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <span className="text-[10.5px] font-head font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-paper-tint text-ink-muted border border-paper-line">
                    {r.category}
                  </span>
                </div>
                <Quote className="w-8 h-8 text-brand/20 mb-2" />
                <p className="text-xs sm:text-sm text-ink-muted leading-relaxed font-sans italic">
                  "{r.quote}"
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-paper-line-light flex items-center justify-between">
                <div>
                  <h4 className="font-head font-bold text-xs uppercase tracking-wider text-ink">
                    {r.name}
                  </h4>
                  <p className="text-[11px] text-ink-muted font-sans">{r.role}</p>
                </div>
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
