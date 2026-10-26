import React from 'react';
import { Newspaper, LayoutTemplate, CalendarCheck, FileCheck, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const WorkflowSteps: React.FC = () => {
  const steps = [
    {
      num: '01',
      title: 'Select Media & Publication',
      desc: 'Pick your preferred newspaper, radio station, cinema hall, or billboard corridor with transparent INS base rates.',
      icon: Newspaper,
    },
    {
      num: '02',
      title: 'Compose in Live Simulator',
      desc: 'Draft text in our broadsheet column editor. Watch characters, lines, and total fees update dynamically with 0ms delay.',
      icon: LayoutTemplate,
    },
    {
      num: '03',
      title: 'Verify Affidavit & Schedule',
      desc: 'Pick print dates before the 3 PM press cut-off. Upload supporting legal notarized affidavits if booking statutory notices.',
      icon: CalendarCheck,
    },
    {
      num: '04',
      title: 'Instant UPI & Digital Proof',
      desc: 'Complete payment with zero surcharge. Track progress from editorial verification to morning e-Tearsheet download.',
      icon: FileCheck,
    },
  ];

  return (
    <section className="py-16 sm:py-24 bg-paper border-b border-paper-line">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-paper-tint border border-paper-line text-xs font-head font-bold uppercase tracking-wider text-ink mb-3">
            <span>Frictionless Self-Service</span>
          </div>
          <h2 className="font-news-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-ink tracking-tight mb-4">
            How It Works: From Draft to Press in 4 Steps
          </h2>
          <p className="text-sm sm:text-base text-ink-muted font-sans">
            No physical agency visits, no offline rate bargaining, and no uncertainty about whether your ad made it to the printing press.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((s, idx) => {
            const Icon = s.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-3xl p-6 sm:p-7 border border-paper-line shadow-press relative flex flex-col justify-between group hover:border-brand/40 transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-news-serif font-black text-2xl text-brand">
                      {s.num}
                    </span>
                    <div className="w-10 h-10 rounded-2xl bg-paper-soft flex items-center justify-center text-ink group-hover:bg-brand group-hover:text-white transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>
                  <h3 className="font-head text-base font-bold text-ink uppercase tracking-wider mb-2">
                    {s.title}
                  </h3>
                  <p className="text-xs text-ink-muted leading-relaxed font-sans">
                    {s.desc}
                  </p>
                </div>

                <div className="pt-6 mt-4 border-t border-paper-line-light">
                  <span className="text-[11px] font-head font-semibold uppercase tracking-wider text-ink/70">
                    Step {idx + 1} of 4
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <Link
            to="/book-ad"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-brand text-white font-head font-bold text-xs uppercase tracking-wider shadow-accent hover:bg-brand-hover hover:-translate-y-0.5 transition-all"
          >
            <span>Start Your 4-Step Booking</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};
