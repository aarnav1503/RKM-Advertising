import React from 'react';
import { Link } from 'react-router-dom';
import { MediaVerticalInfo } from '../../types';
import { PageHeader } from './PageHeader';
import { FaqAccordion } from '../home/FaqAccordion';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

import { OutdoorConsultationCard } from '../outdoor/OutdoorConsultationCard';
import { TransitConsultationCard } from '../transit/TransitConsultationCard';
import { LiftConsultationCard } from '../lift/LiftConsultationCard';
import { OttConsultationCard } from '../ott/OttConsultationCard';
import { ProgrammaticConsultationCard } from '../programmatic/ProgrammaticConsultationCard';
import { GenericConsultationCard } from '../common/GenericConsultationCard';

interface MediaVerticalTemplateProps {
  vertical: MediaVerticalInfo;
}

export const MediaVerticalTemplate: React.FC<MediaVerticalTemplateProps> = ({ vertical }) => {
  return (
    <div className="bg-paper min-h-screen pb-20">
      <PageHeader
        title={vertical.title}
        subtitle={vertical.description}
        badge={vertical.badge}
        breadcrumbs={[{ label: 'Media Channels' }, { label: vertical.shortTitle }]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 space-y-16">
        {/* Hero Feature Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6 space-y-5">
            <span className="text-xs font-head font-bold uppercase tracking-wider text-brand">
              Audience Reach &amp; Guaranteed Inventory
            </span>
            <h2 className="font-news-serif text-3xl sm:text-4xl font-bold text-ink tracking-tight">
              {vertical.tagline}
            </h2>
            <div className="space-y-3 pt-2">
              {vertical.benefits.map((b, idx) => (
                <div key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-ink-muted">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{b}</span>
                </div>
              ))}
            </div>

            <div className="pt-4 flex flex-wrap items-center gap-4">
              <a
                href={`#${vertical.id}-consult-planner`}
                className="px-6 py-3 rounded-full bg-red-600 text-white font-head font-bold text-xs uppercase tracking-wider shadow-md hover:bg-red-700 transition-all flex items-center gap-2"
              >
                <span>Consult Media Planner</span>
                <ArrowRight className="w-4 h-4" />
              </a>
              <Link
                to="/rate-cards"
                className="px-6 py-3 rounded-full border border-paper-line bg-paper-tint text-ink hover:bg-white font-head font-bold text-xs uppercase tracking-wider transition-all"
              >
                Explore 2026 Rate Cards
              </Link>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="relative rounded-3xl overflow-hidden border border-paper-line shadow-press h-80 sm:h-96">
              <img
                src={vertical.heroImage}
                alt={vertical.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent flex items-end p-6">
                <div className="text-white space-y-1">
                  <span className="text-xs font-head uppercase tracking-wider text-brand-amber font-semibold block">
                    Starting From {vertical.startingPrice}
                  </span>
                  <div className="font-news-serif text-xl sm:text-2xl font-bold">
                    {vertical.reach} Verified Audience
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Ad Formats & Package Pricing Cards (Above Consult Section as requested) */}
        <div>
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h3 className="font-news-serif text-3xl font-bold text-ink tracking-tight mb-2">
              Available Formats &amp; Inventory Packages
            </h3>
            <p className="text-xs sm:text-sm text-ink-muted font-sans">
              Choose the right specification for your marketing objective and creative asset.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {vertical.formats.map((fmt, idx) => (
              <div
                key={idx}
                className={`bg-white rounded-3xl p-6 sm:p-7 border transition-all flex flex-col justify-between shadow-press relative ${
                  fmt.popular ? 'border-brand ring-2 ring-brand/10' : 'border-paper-line'
                }`}
              >
                {fmt.popular && (
                  <span className="absolute -top-3 right-6 px-3 py-0.5 rounded-full bg-brand text-white text-[10px] font-head font-bold uppercase tracking-wider shadow-sm">
                    Most Popular Choice
                  </span>
                )}

                <div>
                  <span className="text-[10.5px] font-head font-bold uppercase tracking-wider text-brand block mb-1">
                    {vertical.shortTitle}
                  </span>
                  <h4 className="font-news-serif text-xl font-bold text-ink mb-2">
                    {fmt.title}
                  </h4>
                  <p className="text-xs text-ink-muted leading-relaxed font-sans mb-4">
                    {fmt.description}
                  </p>
                  <div className="p-3 rounded-2xl bg-paper-tint border border-paper-line text-xs font-sans text-ink space-y-1 mb-6">
                    <div className="text-[10px] font-head font-bold uppercase tracking-wider text-ink-muted">
                      Technical Specifications:
                    </div>
                    <div className="font-mono text-[11px] text-ink">{fmt.specs}</div>
                  </div>
                </div>

                <div className="pt-4 border-t border-paper-line flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-head font-semibold text-ink-muted block uppercase">
                      Tariff Rate
                    </span>
                    <span className="font-news-serif text-lg font-bold text-brand">
                      {fmt.rate}
                    </span>
                  </div>
                  <a
                    href={`#${vertical.id}-consult-planner`}
                    className="px-4 py-2 rounded-full bg-ink text-paper-soft hover:bg-red-600 hover:text-white text-xs font-head font-bold uppercase tracking-wider transition-colors"
                  >
                    Inquire
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Media Consultation Planner Cards */}
        <div className="pt-2">
          {vertical.id === 'outdoor' ? (
            <OutdoorConsultationCard />
          ) : vertical.id === 'transit' ? (
            <TransitConsultationCard />
          ) : vertical.id === 'lift' ? (
            <LiftConsultationCard />
          ) : vertical.id === 'ott' ? (
            <OttConsultationCard />
          ) : vertical.id === 'programmatic' ? (
            <ProgrammaticConsultationCard />
          ) : (
            <GenericConsultationCard vertical={vertical} />
          )}
        </div>

        {/* Partner Networks Strip */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-paper-line shadow-press">
          <h4 className="font-head text-xs font-bold uppercase tracking-wider text-ink-muted mb-4 text-center">
            Authorized Partner Networks &amp; Concessions
          </h4>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {vertical.partners.map((partner, idx) => (
              <span
                key={idx}
                className="px-4 py-2 rounded-xl bg-paper-tint border border-paper-line text-xs font-serif font-bold text-ink shadow-sm"
              >
                {partner}
              </span>
            ))}
          </div>
        </div>

        {/* FAQs */}
        <FaqAccordion
          items={vertical.faqs}
          title={`${vertical.shortTitle} Booking FAQs`}
          subtitle={`Specific questions regarding ${vertical.shortTitle.toLowerCase()} lead times, creative submissions, and telecast/print proofing.`}
        />
      </div>
    </div>
  );
};
