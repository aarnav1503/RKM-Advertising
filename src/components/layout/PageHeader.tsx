import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

interface PageHeaderProps {
  title: string;
  subtitle: string;
  badge?: string;
  breadcrumbs?: { label: string; path?: string }[];
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  subtitle,
  badge,
  breadcrumbs,
}) => {
  return (
    <div className="bg-paper-tint border-b border-paper-line py-10 sm:py-14 relative overflow-hidden">
      {/* Subtle newsprint background ornament */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none select-none font-serif text-[180px] leading-none text-ink font-bold -top-10 -right-10 overflow-hidden">
        NEWS
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {breadcrumbs && breadcrumbs.length > 0 && (
          <nav className="flex items-center gap-1.5 text-xs font-head text-ink-muted mb-4 uppercase tracking-wider">
            <Link to="/" className="hover:text-brand flex items-center gap-1">
              <Home className="w-3.5 h-3.5" />
              <span>Home</span>
            </Link>
            {breadcrumbs.map((bc, idx) => (
              <React.Fragment key={idx}>
                <ChevronRight className="w-3.5 h-3.5 text-paper-line-dark/30" />
                {bc.path ? (
                  <Link to={bc.path} className="hover:text-brand">
                    {bc.label}
                  </Link>
                ) : (
                  <span className="text-ink font-semibold">{bc.label}</span>
                )}
              </React.Fragment>
            ))}
          </nav>
        )}

        {badge && (
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-paper-soft border border-paper-line text-xs font-head font-bold uppercase tracking-wider text-ink mb-3 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-brand" />
            {badge}
          </div>
        )}

        <h1 className="font-news-serif text-3xl sm:text-4xl md:text-5xl font-bold text-ink tracking-tight mb-3">
          {title}
        </h1>
        <p className="text-base sm:text-lg text-ink-muted max-w-3xl font-sans leading-relaxed">
          {subtitle}
        </p>
      </div>
    </div>
  );
};
