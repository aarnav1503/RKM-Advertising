import React from 'react';
import { PageHeader } from '../components/layout/PageHeader';
import { ShieldCheck, Award } from 'lucide-react';
import { Link } from 'react-router-dom';

export const AboutPage: React.FC = () => {
  return (
    <div className="bg-paper min-h-screen pb-20">
      <PageHeader
        title="About RKM Ads — The Media Buying Vanguard"
        subtitle="Bridging 150+ heritage Indian newsprints and contemporary digital broadcast channels through a self-service technological interface."
        badge="Accredited Agency Since 2012"
        breadcrumbs={[{ label: 'About Us' }]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 space-y-16">
        {/* Story Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 space-y-5">
            <span className="text-xs font-head font-bold uppercase tracking-wider text-brand">
              Our Founding Purpose
            </span>
            <h2 className="font-news-serif text-3xl sm:text-4xl font-bold text-ink tracking-tight">
              Eliminating Friction from India’s $12B Media Landscape
            </h2>
            <p className="text-sm sm:text-base text-ink-muted leading-relaxed font-sans">
              Traditionally, booking a legal statutory notice, matrimonial listing, or radio commercial required traveling to physical media agency counters, enduring opaque offline markups, and hoping a physical copy of the newspaper could be discovered at a morning newsstand.
            </p>
            <p className="text-sm sm:text-base text-ink-muted leading-relaxed font-sans">
              Founded in 2012 and INS-accredited, <strong>RKM Ads</strong> engineered a modern SaaS platform alternative. With our real-time tactile broadsheet simulator, dual tariff calculation algorithms, and verified digital e-Tearsheet archiving, we have empowered over 50,000 businesses, advocates, and families across India.
            </p>

            <div className="pt-2 flex flex-wrap gap-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-paper-tint border border-paper-line text-xs font-head font-semibold text-ink">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                INS Full Agency Accreditation
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-paper-tint border border-paper-line text-xs font-head font-semibold text-ink">
                <Award className="w-4 h-4 text-brand" />
                Authorized Government Tender Agency
              </span>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-paper-line shadow-press space-y-6">
              <h3 className="font-news-serif text-2xl font-bold text-ink">
                RKM Advertising At a Glance
              </h3>
              <div className="grid grid-cols-2 gap-4 text-center">
                <div className="p-4 rounded-2xl bg-paper-tint border border-paper-line">
                  <div className="font-news-serif text-3xl font-bold text-ink">14+</div>
                  <div className="text-[11px] font-head font-semibold text-ink-muted uppercase tracking-wider mt-1">
                    Years Operational
                  </div>
                </div>
                <div className="p-4 rounded-2xl bg-paper-tint border border-paper-line">
                  <div className="font-news-serif text-3xl font-bold text-brand">150+</div>
                  <div className="text-[11px] font-head font-semibold text-ink-muted uppercase tracking-wider mt-1">
                    Integrated Dailies
                  </div>
                </div>
                <div className="p-4 rounded-2xl bg-paper-tint border border-paper-line">
                  <div className="font-news-serif text-3xl font-bold text-ink">100+</div>
                  <div className="text-[11px] font-head font-semibold text-ink-muted uppercase tracking-wider mt-1">
                    Radio &amp; Cinema Hubs
                  </div>
                </div>
                <div className="p-4 rounded-2xl bg-paper-tint border border-paper-line">
                  <div className="font-news-serif text-3xl font-bold text-emerald-700">50K+</div>
                  <div className="text-[11px] font-head font-semibold text-ink-muted uppercase tracking-wider mt-1">
                    Notices Released
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Pillars Grid */}
        <div>
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h3 className="font-news-serif text-3xl font-bold text-ink tracking-tight mb-2">
              Our 4 Pillars of Media Excellence
            </h3>
            <p className="text-xs sm:text-sm text-ink-muted font-sans">
              Engineered to bring trust, algorithmic speed, and certified delivery to traditional and digital media buying.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-3xl p-6 border border-paper-line shadow-press space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-brand-light flex items-center justify-center text-brand font-bold">
                1
              </div>
              <h4 className="font-head text-base font-bold text-ink uppercase tracking-wider">
                Direct INS Tariffs
              </h4>
              <p className="text-xs text-ink-muted leading-relaxed font-sans">
                Zero arbitrary agent markups. You pay exact Indian Newspaper Society published rate cards with complete transparency.
              </p>
            </div>

            <div className="bg-white rounded-3xl p-6 border border-paper-line shadow-press space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-brand-light flex items-center justify-center text-brand font-bold">
                2
              </div>
              <h4 className="font-head text-base font-bold text-ink uppercase tracking-wider">
                Broadsheet Simulator
              </h4>
              <p className="text-xs text-ink-muted leading-relaxed font-sans">
                Experience tactile newspaper font rendering and line counts before paying a single rupee. What you compose is what prints.
              </p>
            </div>

            <div className="bg-white rounded-3xl p-6 border border-paper-line shadow-press space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-brand-light flex items-center justify-center text-brand font-bold">
                3
              </div>
              <h4 className="font-head text-base font-bold text-ink uppercase tracking-wider">
                Press Cut-off Precision
              </h4>
              <p className="text-xs text-ink-muted leading-relaxed font-sans">
                Dynamic countdown timers ensure your copy is reviewed by our legal editorial desk in time for the midnight press run.
              </p>
            </div>

            <div className="bg-white rounded-3xl p-6 border border-paper-line shadow-press space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-brand-light flex items-center justify-center text-brand font-bold">
                4
              </div>
              <h4 className="font-head text-base font-bold text-ink uppercase tracking-wider">
                Certified e-Tearsheets
              </h4>
              <p className="text-xs text-ink-muted leading-relaxed font-sans">
                High-resolution morning page scans delivered digitally with authorized GST invoice for court, bank, and passport proof.
              </p>
            </div>
          </div>
        </div>

        {/* CTA banner */}
        <div className="bg-ink text-paper-soft rounded-3xl p-8 sm:p-12 text-center space-y-4 shadow-press border border-ink/40">
          <h3 className="font-news-serif text-3xl font-bold text-white">
            Ready to Broadcast Your Message Across India?
          </h3>
          <p className="text-xs sm:text-sm text-paper-soft/75 max-w-xl mx-auto font-sans leading-relaxed">
            Start with our 4-step booking wizard or consult directly with our senior media planners for multi-city commercial campaigns.
          </p>
          <div className="pt-2 flex flex-wrap justify-center gap-4">
            <Link
              to="/book-ad"
              className="px-6 py-3 rounded-full bg-brand text-white font-head font-bold text-xs uppercase tracking-wider shadow-accent hover:bg-brand-hover transition-all"
            >
              Compose Advertisement
            </Link>
            <Link
              to="/contact"
              className="px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white font-head font-bold text-xs uppercase tracking-wider transition-all"
            >
              Contact Advisory Desk
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
