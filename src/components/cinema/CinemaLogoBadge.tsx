import React from 'react';

interface CinemaLogoBadgeProps {
  chain: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const CinemaLogoBadge: React.FC<CinemaLogoBadgeProps> = ({
  chain,
  className = '',
  size = 'md',
}) => {
  const norm = chain.toLowerCase();

  // Dimension classes based on size
  const sizeClasses = {
    sm: 'w-24 h-12 text-[10px]',
    md: 'w-28 sm:w-36 h-16 sm:h-20 text-xs',
    lg: 'w-36 sm:w-44 h-20 sm:h-24 text-sm',
  }[size];

  // 1. PVR Pictures / PVR Cinemas (Gold metallic 3D typography on rich black background)
  if (norm.includes('pvr')) {
    return (
      <div
        className={`${sizeClasses} rounded-lg bg-gradient-to-b from-[#1c1c1e] via-[#0d0d0f] to-[#050507] border border-amber-500/30 flex flex-col items-center justify-center p-2 shadow-md relative overflow-hidden select-none group ${className}`}
      >
        {/* Subtle subtle golden glow in top center */}
        <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-20 h-10 bg-amber-400/10 rounded-full blur-md" />

        {/* PVR 3D Gold Logo */}
        <div className="flex items-center tracking-tight font-serif font-black text-xl sm:text-2xl drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
          <span className="bg-gradient-to-b from-[#fef08a] via-[#facc15] to-[#b45309] bg-clip-text text-transparent">
            PVR
          </span>
        </div>

        {/* PICTURES / CINEMAS Subline */}
        <span className="text-[8px] sm:text-[9.5px] font-serif tracking-[0.25em] uppercase text-amber-300/90 font-medium -mt-0.5">
          PICTURES
        </span>
      </div>
    );
  }

  // 2. INOX Live The Movie (Iconic Yellow background with Royal Blue INOX & red aperture O)
  if (norm.includes('inox')) {
    return (
      <div
        className={`${sizeClasses} rounded-lg bg-[#FFD700] border border-amber-400/80 flex flex-col items-center justify-center p-2 shadow-md relative overflow-hidden select-none ${className}`}
      >
        {/* INOX Typography */}
        <div className="flex items-center font-black tracking-tight text-xl sm:text-2xl leading-none">
          <span className="text-[#0B2F8A] font-extrabold tracking-tighter">IN</span>
          {/* Stylized O with red lens star inside */}
          <div className="relative mx-0.5 w-5 h-5 sm:w-6 sm:h-6 rounded-full border-[3px] border-[#0B2F8A] flex items-center justify-center bg-[#FFD700]">
            <span className="text-[#DC2626] text-xs sm:text-sm font-black leading-none -mt-0.5">✦</span>
          </div>
          <span className="text-[#0B2F8A] font-extrabold tracking-tighter">X</span>
        </div>

        {/* LIVE THE MOVIE Subline */}
        <span className="text-[7.5px] sm:text-[9px] font-sans font-black tracking-wider uppercase text-[#DC2626] mt-0.5">
          LIVE THE MOVIE
        </span>
      </div>
    );
  }

  // 3. Cinépolis (Royal Navy background with Yellow 4-petal star & clean White typography)
  if (norm.includes('cinépolis') || norm.includes('cinepolis')) {
    return (
      <div
        className={`${sizeClasses} rounded-lg bg-[#002D62] border border-blue-900 flex items-center justify-center gap-2 p-2 shadow-md relative overflow-hidden select-none ${className}`}
      >
        {/* 4-Petal Starflower Logo */}
        <svg
          className="w-5 h-5 sm:w-6 sm:h-6 text-[#FFCC00] flex-shrink-0 drop-shadow"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M12 2L14.2 9.8L22 12L14.2 14.2L12 22L9.8 14.2L2 12L9.8 9.8L12 2Z" />
        </svg>

        {/* Cinépolis Text */}
        <span className="text-white font-sans font-bold text-sm sm:text-base tracking-tight drop-shadow-sm">
          Cinépolis<span className="text-[9px] text-[#FFCC00]">®</span>
        </span>
      </div>
    );
  }

  // 4. Carnival Cinemas (Burgundy & Gold festive luxury)
  if (norm.includes('carnival')) {
    return (
      <div
        className={`${sizeClasses} rounded-lg bg-gradient-to-br from-[#7F1D1D] via-[#66101F] to-[#450A0A] border border-red-900 flex flex-col items-center justify-center p-2 shadow-md text-white select-none ${className}`}
      >
        <span className="text-amber-300 text-[10px] sm:text-xs">🎭</span>
        <span className="text-xs sm:text-sm font-serif font-black tracking-wider text-amber-200 uppercase leading-tight">
          CARNIVAL
        </span>
        <span className="text-[7px] sm:text-[8px] font-sans font-bold text-red-200 tracking-widest uppercase">
          CINEMAS
        </span>
      </div>
    );
  }

  // 5. Wave Cinemas (Wave Cyan / Navy Silver)
  if (norm.includes('wave')) {
    return (
      <div
        className={`${sizeClasses} rounded-lg bg-gradient-to-r from-[#032B44] to-[#0A4B6B] border border-cyan-800 flex flex-col items-center justify-center p-2 shadow-md text-white select-none ${className}`}
      >
        <div className="flex items-center gap-1">
          <span className="text-cyan-400 font-black text-sm">~</span>
          <span className="text-xs sm:text-sm font-sans font-extrabold tracking-tight text-white uppercase">
            WAVE
          </span>
          <span className="text-cyan-400 font-black text-sm">~</span>
        </div>
        <span className="text-[7.5px] text-cyan-200 font-semibold tracking-widest uppercase">
          CINEMAS
        </span>
      </div>
    );
  }

  // 6. Miraj Cinemas or Default Multiplex Badge
  return (
    <div
      className={`${sizeClasses} rounded-lg bg-gradient-to-b from-[#1E293B] to-[#0F172A] border border-slate-700 flex flex-col items-center justify-center p-2 shadow-md text-white select-none ${className}`}
    >
      <span className="text-xs sm:text-sm font-sans font-black tracking-wider text-red-400 uppercase">
        {chain}
      </span>
      <span className="text-[7.5px] text-slate-300 tracking-widest uppercase">
        MULTIPLEX
      </span>
    </div>
  );
};
