import React from 'react';
import { Link } from 'react-router-dom';

export interface NewspaperCardProps {
  id: string;
  name: string;
  shortTitle?: string;
  language: string;
  reach?: string;
  copies?: string;
  unit?: 'line' | 'word';
  baseRate?: number;
  showRate?: boolean;
  isSelected?: boolean;
  onClick?: () => void;
  to?: string;
  className?: string;
  badge?: string;
}

// Authentic vector mastheads/logos with tight bounding boxes matching reference
export const NewspaperLogo: React.FC<{ id: string; className?: string }> = ({ id, className = 'h-6 sm:h-7 w-auto' }) => {
  const normId = id.toLowerCase();

  if (normId.includes('toi') || normId.includes('times')) {
    // Exact authentic "The Times of India" emblem with twin elephants and serif title
    return (
      <svg
        viewBox="0 0 110 34"
        className={className}
        aria-label="The Times of India"
      >
        {/* Heraldic Elephant Crest */}
        <g transform="translate(43, 0) scale(0.48)" fill="#0f172a">
          {/* Central Shield */}
          <path d="M 24 8 Q 24 20 16 26 Q 8 20 8 8 Z" fill="none" stroke="#0f172a" strokeWidth="1.8" />
          {/* Star on top */}
          <circle cx="16" cy="3" r="2.2" />
          <path d="M 16 0 L 16 2 M 12 1.5 L 13.5 3 M 20 1.5 L 18.5 3" stroke="#0f172a" strokeWidth="1.2" />
          {/* Left Elephant */}
          <path d="M 7 16 C 4 15 2 12 2 9 C 2 6 4 5 6 5 C 6 2 4 1 2 2 C 0 3 -1 6 -1 9 C -1 13 1 17 5 19 L 5 22 L 7 22 Z" />
          {/* Right Elephant */}
          <path d="M 25 16 C 28 15 30 12 30 9 C 30 6 28 5 26 5 C 26 2 28 1 30 2 C 32 3 33 6 33 9 C 33 13 31 17 27 19 L 27 22 L 25 22 Z" />
          {/* Bottom Banner */}
          <path d="M 3 24 Q 16 26 29 24 L 29 26 Q 16 28 3 26 Z" fill="#0f172a" />
        </g>
        {/* Typographic Masthead */}
        <text
          x="55"
          y="30"
          textAnchor="middle"
          fontFamily="Georgia, 'Times New Roman', serif"
          fontSize="9.5"
          fontWeight="900"
          letterSpacing="0.4"
          fill="#0f172a"
        >
          THE TIMES OF INDIA
        </text>
      </svg>
    );
  }

  if (normId.includes('ht') || normId.includes('hindustan times')) {
    // Hindustan Times masthead
    return (
      <svg viewBox="0 0 100 30" className={className} aria-label="Hindustan Times">
        <g transform="translate(0, 4)">
          <rect x="0" y="2" width="18" height="18" rx="3" fill="#0284c7" />
          <text x="9" y="15" textAnchor="middle" fontFamily="sans-serif" fontSize="10" fontWeight="900" fill="#ffffff">
            HT
          </text>
          <text x="24" y="12" fontFamily="Georgia, serif" fontSize="10.5" fontWeight="800" fill="#0f172a">
            Hindustan
          </text>
          <text x="24" y="21" fontFamily="Georgia, serif" fontSize="9" fontWeight="700" fill="#334155" letterSpacing="0.3">
            Times
          </text>
        </g>
      </svg>
    );
  }

  if (normId.includes('dj') || normId.includes('jagran')) {
    // Dainik Jagran with rising sun
    return (
      <svg viewBox="0 0 105 32" className={className} aria-label="Dainik Jagran">
        <g transform="translate(0, 3)">
          <circle cx="10" cy="13" r="8" fill="#e11d48" />
          <path d="M 10 2 L 10 0 M 10 24 L 10 26 M 0 13 L 2 13 M 18 13 L 20 13" stroke="#e11d48" strokeWidth="1.8" strokeLinecap="round" />
          <path d="M 2 13 Q 10 9 18 13 L 18 19 Q 10 16 2 19 Z" fill="#ffffff" />
          <text x="26" y="14" fontFamily="'Noto Serif Devanagari', 'Mangal', Georgia, serif" fontSize="11.5" fontWeight="800" fill="#0f172a">
            दैनिक जागरण
          </text>
          <text x="26" y="23" fontFamily="sans-serif" fontSize="6.5" fontWeight="700" fill="#64748b" letterSpacing="0.6">
            DAINIK JAGRAN
          </text>
        </g>
      </svg>
    );
  }

  if (normId.includes('au') || normId.includes('amar')) {
    // Amar Ujala sunburst
    return (
      <svg viewBox="0 0 100 32" className={className} aria-label="Amar Ujala">
        <g transform="translate(0, 4)">
          <circle cx="9" cy="12" r="7.5" fill="#dc2626" />
          <path d="M 9 1 L 9 4 M 9 20 L 9 23 M 0 12 L 3 12 M 15 12 L 18 12" stroke="#dc2626" strokeWidth="1.5" />
          <text x="24" y="13" fontFamily="'Noto Serif Devanagari', Georgia, serif" fontSize="11.5" fontWeight="800" fill="#0f172a">
            अमर उजाला
          </text>
          <text x="24" y="22" fontFamily="sans-serif" fontSize="6.5" fontWeight="700" fill="#64748b" letterSpacing="0.6">
            AMAR UJALA
          </text>
        </g>
      </svg>
    );
  }

  if (normId.includes('hindu')) {
    // The Hindu
    return (
      <svg viewBox="0 0 105 30" className={className} aria-label="The Hindu">
        <g transform="translate(0, 4)">
          <circle cx="9" cy="11" r="8" fill="none" stroke="#0f172a" strokeWidth="1.4" />
          <path d="M 5 13 Q 9 7 13 13" fill="none" stroke="#0f172a" strokeWidth="1.4" />
          <circle cx="9" cy="7.5" r="1.2" fill="#0f172a" />
          <text x="23" y="15" fontFamily="Georgia, 'Times New Roman', serif" fontSize="12" fontWeight="900" letterSpacing="0.8" fill="#0f172a">
            THE HINDU
          </text>
        </g>
      </svg>
    );
  }

  if (normId.includes('db') || normId.includes('bhaskar')) {
    // Dainik Bhaskar
    return (
      <svg viewBox="0 0 105 32" className={className} aria-label="Dainik Bhaskar">
        <g transform="translate(0, 3)">
          <rect x="0" y="3" width="18" height="18" rx="9" fill="#ea580c" />
          <circle cx="9" cy="12" r="5.5" fill="#fef08a" />
          <text x="24" y="14" fontFamily="'Noto Serif Devanagari', Georgia, serif" fontSize="11" fontWeight="800" fill="#0f172a">
            दैनिक भास्कर
          </text>
          <text x="24" y="23" fontFamily="sans-serif" fontSize="6.5" fontWeight="700" fill="#64748b" letterSpacing="0.6">
            DAINIK BHASKAR
          </text>
        </g>
      </svg>
    );
  }

  if (normId.includes('et') || normId.includes('economic')) {
    // The Economic Times
    return (
      <svg viewBox="0 0 115 32" className={className} aria-label="The Economic Times">
        <g transform="translate(0, 6)">
          <text x="0" y="12" fontFamily="Georgia, 'Times New Roman', serif" fontSize="9" fontWeight="900" letterSpacing="0.4" fill="#0f172a">
            THE ECONOMIC TIMES
          </text>
          <text x="0" y="20" fontFamily="sans-serif" fontSize="6" fontWeight="700" fill="#b45309" letterSpacing="0.8">
            INDIA'S #1 BUSINESS DAILY
          </text>
        </g>
      </svg>
    );
  }

  if (normId.includes('tie') || normId.includes('indian express')) {
    // The Indian Express
    return (
      <svg viewBox="0 0 115 32" className={className} aria-label="The Indian Express">
        <g transform="translate(0, 5)">
          <path d="M 4 3 L 8 3 L 6 17 Z M 5 19 L 7 19 L 6 21 Z" fill="#dc2626" />
          <text x="12" y="13" fontFamily="Georgia, 'Times New Roman', serif" fontSize="9.5" fontWeight="900" letterSpacing="0.2" fill="#0f172a">
            The Indian Express
          </text>
          <text x="12" y="21" fontFamily="sans-serif" fontSize="6" fontWeight="700" fill="#dc2626" letterSpacing="0.6">
            JOURNALISM OF COURAGE
          </text>
        </g>
      </svg>
    );
  }

  if (normId.includes('pk') || normId.includes('punjab kesari') || normId.includes('kesari')) {
    // Punjab Kesari
    return (
      <svg viewBox="0 0 105 32" className={className} aria-label="Punjab Kesari">
        <g transform="translate(0, 3)">
          <rect x="0" y="3" width="18" height="18" rx="3" fill="#dc2626" />
          <path d="M 4 9 Q 9 4 14 9 L 14 17 Q 9 19 4 17 Z" fill="#fbbf24" />
          <circle cx="9" cy="11" r="2" fill="#dc2626" />
          <text x="24" y="14" fontFamily="'Noto Serif Devanagari', 'Mangal', Georgia, serif" fontSize="11" fontWeight="800" fill="#0f172a">
            पंजाब केसरी
          </text>
          <text x="24" y="23" fontFamily="sans-serif" fontSize="6.5" fontWeight="700" fill="#64748b" letterSpacing="0.6">
            PUNJAB KESARI
          </text>
        </g>
      </svg>
    );
  }

  return (
    <div className="flex items-center gap-1 px-1.5 py-0.5 bg-slate-100 rounded text-slate-800 font-serif font-bold text-[10px] uppercase tracking-wider">
      {id.toUpperCase()}
    </div>
  );
};

export const NewspaperCard: React.FC<NewspaperCardProps> = ({
  id,
  name,
  shortTitle,
  language,
  reach = 'National',
  copies = '60.2L',
  unit,
  baseRate,
  showRate = false,
  isSelected = false,
  onClick,
  to,
  className = '',
  badge,
}) => {
  const cleanTitle = shortTitle || name.replace(/^The\s+/i, '');

  const content = (
    <div
      className={`relative bg-white rounded-2xl border transition-all duration-200 select-none overflow-hidden ${
        isSelected
          ? 'border-slate-900 ring-2 ring-slate-900/15 shadow-md bg-slate-50/60'
          : 'border-slate-200/90 hover:border-slate-300 hover:shadow-md'
      } ${className}`}
    >
      {/* Main Single-Row Horizontal Layout (Direct Reference Matching) */}
      <div className="flex items-center justify-between px-3.5 py-3 sm:px-4 sm:py-3.5 gap-2.5">
        {/* Left: Authentic Vector Logo */}
        <div className="w-[78px] sm:w-[88px] flex items-center justify-start shrink-0">
          <NewspaperLogo id={id} className="h-6 sm:h-7 w-auto max-w-[76px] sm:max-w-[86px] object-contain" />
        </div>

        {/* Thin Vertical Divider Line */}
        <div className="h-7 w-[1px] bg-slate-200 shrink-0"></div>

        {/* Middle: Title & Subtitle */}
        <div className="flex-1 min-w-0 pl-1.5 sm:pl-2">
          <div className="flex items-center gap-1.5">
            <h4 className="font-serif font-bold text-slate-900 text-sm sm:text-[15px] leading-tight truncate">
              {cleanTitle}
            </h4>
            {badge && (
              <span className="px-1.5 py-0.2 rounded bg-amber-100 text-amber-900 font-head text-[8.5px] font-bold uppercase tracking-wider shrink-0">
                {badge}
              </span>
            )}
          </div>
          <p className="text-slate-500 text-[11px] sm:text-xs font-sans font-normal mt-0.5 truncate">
            {language} · {reach}
          </p>
        </div>

        {/* Right: COPIES + Big Stat */}
        <div className="text-right shrink-0 pl-2">
          <span className="block text-[9px] sm:text-[10px] font-semibold text-slate-400 tracking-wider uppercase">
            COPIES
          </span>
          <span className="block text-base sm:text-lg font-bold font-serif text-slate-900 leading-none mt-0.5">
            {copies}
          </span>
        </div>
      </div>

      {showRate && baseRate && (
        <div className="bg-slate-50/90 border-t border-slate-100 px-3.5 py-1.5 flex items-center justify-between text-[11px] text-slate-600">
          <span>Starting from <strong>₹{baseRate}</strong></span>
          <span className="text-[10px] uppercase font-semibold text-slate-400">
            Per-{unit === 'word' ? 'Word' : 'Line'}
          </span>
        </div>
      )}
    </div>
  );

  if (to) {
    return (
      <Link to={to} className="block text-inherit no-underline">
        {content}
      </Link>
    );
  }

  if (onClick) {
    return (
      <button
        type="button"
        onClick={onClick}
        className="w-full text-left bg-transparent p-0 border-0 cursor-pointer block"
      >
        {content}
      </button>
    );
  }

  return content;
};
