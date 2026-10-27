import React from 'react';

interface StationLogoBadgeProps {
  network: string;
  frequency: string;
  className?: string;
}

export const StationLogoBadge: React.FC<StationLogoBadgeProps> = ({
  network,
  frequency,
  className = '',
}) => {
  const norm = network.toLowerCase();

  // Radio Mirchi: Yellow / Orange brand
  if (norm.includes('mirchi')) {
    return (
      <div
        className={`w-28 sm:w-32 h-16 sm:h-20 rounded-md bg-gradient-to-r from-amber-400 via-amber-500 to-orange-500 flex flex-col items-center justify-center p-1.5 shadow-sm border border-amber-300/60 text-slate-950 font-black relative overflow-hidden select-none ${className}`}
      >
        <div className="absolute top-0.5 right-1 text-[8px] tracking-tighter font-extrabold uppercase bg-red-600 text-white px-1 rounded-sm">
          HOT!
        </div>
        <span className="text-sm sm:text-base font-black tracking-tight leading-none text-red-700 drop-shadow-sm">
          {frequency} FM
        </span>
        <span className="text-xs sm:text-[13px] font-black uppercase tracking-wider text-slate-900 mt-0.5 leading-none">
          RADIO MIRCHI
        </span>
        <span className="text-[7.5px] italic text-red-900 font-bold mt-0.5">
          it&apos;s hot!
        </span>
      </div>
    );
  }

  // Red FM: Iconic Red & White Bajaate Raho
  if (norm.includes('red')) {
    return (
      <div
        className={`w-28 sm:w-32 h-16 sm:h-20 rounded-md bg-gradient-to-br from-red-600 via-red-700 to-red-800 flex flex-col items-center justify-center p-1.5 shadow-sm border border-red-500 text-white select-none ${className}`}
      >
        <span className="text-[8px] font-extrabold uppercase tracking-widest text-amber-300">
          Superhits
        </span>
        <span className="text-base sm:text-lg font-black tracking-tighter leading-none text-white drop-shadow">
          RED FM
        </span>
        <span className="text-xs sm:text-sm font-black text-amber-300 leading-none mt-0.5">
          {frequency}
        </span>
        <span className="text-[7.5px] font-semibold text-red-100 tracking-tight mt-0.5">
          Bajaate Raho!
        </span>
      </div>
    );
  }

  // Radio Indigo: Deep Navy / Indigo
  if (norm.includes('indigo')) {
    return (
      <div
        className={`w-28 sm:w-32 h-16 sm:h-20 rounded-md bg-slate-900 border border-indigo-900 flex flex-col items-center justify-center p-1.5 shadow-sm text-white select-none ${className}`}
      >
        <span className="text-xs sm:text-sm font-bold tracking-tight text-indigo-300">
          radioindigo
        </span>
        <span className="text-sm sm:text-base font-black text-white leading-none mt-0.5">
          {frequency} FM
        </span>
        <span className="text-[7px] text-slate-400 tracking-tighter mt-1">
          the colour of music
        </span>
      </div>
    );
  }

  // Radio One: Blue / Cyan circular emblem
  if (norm.includes('one')) {
    return (
      <div
        className={`w-28 sm:w-32 h-16 sm:h-20 rounded-md bg-sky-50 border border-sky-200 flex flex-col items-center justify-center p-1.5 shadow-sm text-sky-900 select-none ${className}`}
      >
        <div className="w-8 h-8 rounded-full bg-sky-600 text-white flex items-center justify-center font-black text-xs shadow-inner">
          {frequency}
        </div>
        <span className="text-[11px] sm:text-xs font-black tracking-tight text-sky-950 mt-1">
          RADIO ONE
        </span>
        <span className="text-[7px] text-sky-700 font-semibold">
          Upgrade to 94.3
        </span>
      </div>
    );
  }

  // Big FM: Sky Blue / Yellow
  if (norm.includes('big')) {
    return (
      <div
        className={`w-28 sm:w-32 h-16 sm:h-20 rounded-md bg-gradient-to-b from-sky-500 to-sky-700 border border-sky-400 flex flex-col items-center justify-center p-1.5 shadow-sm text-white select-none ${className}`}
      >
        <span className="text-xs sm:text-sm font-black text-amber-300">
          {frequency}
        </span>
        <span className="text-sm sm:text-base font-black tracking-wider text-white leading-none mt-0.5">
          BIG FM
        </span>
        <span className="text-[7px] text-sky-100 font-medium tracking-tight mt-0.5">
          Suno Sunao, Life Banao
        </span>
      </div>
    );
  }

  // Radio City: Royal Blue / Gold
  if (norm.includes('city')) {
    return (
      <div
        className={`w-28 sm:w-32 h-16 sm:h-20 rounded-md bg-gradient-to-r from-blue-700 via-blue-800 to-indigo-900 border border-blue-600 flex flex-col items-center justify-center p-1.5 shadow-sm text-white select-none ${className}`}
      >
        <span className="text-xs sm:text-sm font-black text-amber-400">
          {frequency} FM
        </span>
        <span className="text-sm sm:text-base font-black tracking-tight text-white leading-none mt-0.5">
          Radio City
        </span>
        <span className="text-[7.5px] text-blue-200 font-medium tracking-tight mt-0.5">
          Rag Rag Mein Daude City
        </span>
      </div>
    );
  }

  // Fever FM: Magenta / Red
  if (norm.includes('fever')) {
    return (
      <div
        className={`w-28 sm:w-32 h-16 sm:h-20 rounded-md bg-gradient-to-br from-pink-600 via-rose-600 to-red-600 border border-rose-400 flex flex-col items-center justify-center p-1.5 shadow-sm text-white select-none ${className}`}
      >
        <span className="text-sm sm:text-base font-black tracking-wider text-white leading-none">
          FEVER FM
        </span>
        <span className="text-xs sm:text-sm font-black text-amber-200 mt-0.5">
          {frequency}
        </span>
        <span className="text-[7.5px] text-rose-100 font-semibold tracking-tight mt-0.5">
          Baap Bol Raha Hai
        </span>
      </div>
    );
  }

  // Default / Other Radio Networks
  return (
    <div
      className={`w-28 sm:w-32 h-16 sm:h-20 rounded-md bg-slate-800 border border-slate-700 flex flex-col items-center justify-center p-1.5 shadow-sm text-white select-none ${className}`}
    >
      <span className="text-xs sm:text-sm font-black text-orange-400">
        {frequency} FM
      </span>
      <span className="text-xs sm:text-sm font-bold tracking-tight text-white text-center leading-tight mt-0.5 line-clamp-1">
        {network}
      </span>
      <span className="text-[7.5px] text-slate-300 font-medium mt-0.5">
        Live Broadcast
      </span>
    </div>
  );
};
