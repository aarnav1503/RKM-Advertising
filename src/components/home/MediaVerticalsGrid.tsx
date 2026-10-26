import React from 'react';
import { Link } from 'react-router-dom';
import { MEDIA_VERTICALS } from '../../data/mediaData';
import { ArrowUpRight, CheckCircle2 } from 'lucide-react';

export const MediaVerticalsGrid: React.FC = () => {
  return (
    <section className="py-16 sm:py-24 bg-paper-tint border-b border-paper-line">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-paper border border-paper-line text-xs font-head font-bold uppercase tracking-wider text-ink mb-3">
              <span className="w-2 h-2 rounded-full bg-brand" />
              <span>Full-Spectrum Media Buying (360°)</span>
            </div>
            <h2 className="font-news-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-ink tracking-tight">
              12 Media Channels, One Unified Platform.
            </h2>
          </div>
          <p className="text-sm sm:text-base text-ink-muted max-w-md font-sans leading-relaxed">
            From classified print notices in morning broadsheets to 4K living-room Connected TV spots and highway unipoles.
          </p>
        </div>

        {/* The 12 Media Verticals Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {MEDIA_VERTICALS.map((vertical) => (
            <div
              key={vertical.id}
              className="bg-white rounded-3xl border border-paper-line overflow-hidden shadow-press hover:shadow-press-hover hover:-translate-y-1 transition-all duration-300 flex flex-col group"
            >
              {/* Image banner */}
              <div className="relative h-44 overflow-hidden bg-paper-soft">
                <img
                  src={vertical.heroImage}
                  alt={vertical.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/20 to-transparent" />
                <div className="absolute top-3 left-3">
                  <span className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-[10.5px] font-head font-bold uppercase tracking-wider text-ink shadow-sm">
                    {vertical.badge}
                  </span>
                </div>
                <div className="absolute bottom-3 left-4 right-4 flex items-end justify-between">
                  <div>
                    <span className="text-[10px] font-head font-semibold uppercase tracking-wider text-paper-soft/80 block">
                      Starting From
                    </span>
                    <span className="text-sm font-head font-bold text-brand-amber">
                      {vertical.startingPrice}
                    </span>
                  </div>
                  <span className="text-[11px] font-head font-medium text-white/90 bg-white/20 backdrop-blur-md px-2.5 py-0.5 rounded-full">
                    {vertical.reach}
                  </span>
                </div>
              </div>

              {/* Card Content */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-news-serif text-xl font-bold text-ink mb-2 group-hover:text-brand transition-colors">
                    {vertical.shortTitle}
                  </h3>
                  <p className="text-xs text-ink-muted leading-relaxed font-sans mb-4 line-clamp-3">
                    {vertical.tagline}
                  </p>

                  <div className="space-y-1.5 mb-6">
                    {vertical.benefits.slice(0, 2).map((b, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-[11.5px] text-ink-muted">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span className="line-clamp-1">{b}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-paper-line-light flex items-center justify-between">
                  <Link
                    to={`/${vertical.slug}`}
                    className="text-xs font-head font-bold uppercase tracking-wider text-ink hover:text-brand flex items-center gap-1 group/link"
                  >
                    <span>Explore Rates &amp; Formats</span>
                    <ArrowUpRight className="w-3.5 h-3.5 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                  </Link>
                  <Link
                    to="/book-ad"
                    className="px-3.5 py-1.5 rounded-full bg-paper-tint hover:bg-brand hover:text-white border border-paper-line text-[11px] font-head font-semibold uppercase tracking-wider transition-colors"
                  >
                    Book Now
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
