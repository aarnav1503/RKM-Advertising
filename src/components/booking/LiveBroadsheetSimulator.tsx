import React from 'react';
import { BookingState } from '../../types';
import { PUBLICATIONS_DATA } from '../../data/publicationsData';

interface LiveBroadsheetSimulatorProps {
  booking: BookingState;
}

export const LiveBroadsheetSimulator: React.FC<LiveBroadsheetSimulatorProps> = ({ booking }) => {
  const pub = PUBLICATIONS_DATA[booking.publicationId] || PUBLICATIONS_DATA.toi;
  const isBold = booking.enhancements.bold;
  const isColorBg = booking.enhancements.colorBg;
  const isBorderTick = booking.enhancements.borderTick;

  const formattedDate = booking.publishDate
    ? new Date(booking.publishDate + 'T00:00').toLocaleDateString('en-IN', {
        weekday: 'short',
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      }).toUpperCase()
    : 'UPCOMING ISSUE';

  return (
    <div className="bg-[#EAE4D7] rounded-3xl p-5 sm:p-7 border border-paper-line shadow-press">
      {/* Top Header Controls / Badges */}
      <div className="flex items-center justify-between gap-2 mb-4 pb-3 border-b border-paper-line-dark/15">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-pulse" />
          <span className="text-xs font-head font-bold tracking-wider uppercase text-ink">
            Live Print Simulation
          </span>
        </div>
        <span className="text-[11px] font-head font-medium bg-white px-3 py-1 rounded-full text-ink-muted border border-paper-line">
          Single Broadsheet Column (3.8 cm)
        </span>
      </div>

      {/* The Physical Newspaper Column Simulator */}
      <div className="bg-paper-tint text-ink p-5 sm:p-6 font-serif border border-ink/20 rounded-md shadow-newsprint paper-pattern select-none">
        {/* Newspaper Masthead Mini-Bar */}
        <div className="border-t-2 border-b border-ink py-1.5 flex items-baseline justify-between mb-2 text-xs">
          <span className="font-news-serif font-black tracking-tight text-ink uppercase text-sm sm:text-base">
            {pub.name}
          </span>
          <span className="font-head text-[11px] font-semibold tracking-wider text-ink/80">
            {formattedDate}
          </span>
        </div>

        {/* Edition Subtitle */}
        <div className="flex items-center justify-between text-[10px] text-ink-muted uppercase tracking-widest font-head pb-2 border-b border-ink/15 mb-3">
          <span>{booking.edition} EDITION</span>
          <span>CLASSIFIED NOTICES • PAGE 14</span>
        </div>

        {/* Category Header Strip */}
        <div className="bg-ink text-paper-soft text-center py-1 font-head text-[11px] font-bold tracking-widest uppercase mb-3">
          {booking.category}
        </div>

        {/* 3-Column Newspaper Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 text-xs leading-snug">
          {/* Left Dummy Column */}
          <div className="hidden md:block md:col-span-3 text-[11px] text-ink-muted leading-tight border-r border-paper-line pr-2 text-justify space-y-2">
            <div>
              <span className="font-bold text-ink">TO LET:</span> 2 BHK furnished flat, Sector 15. Family only. Covered parking, 24 hr water. Contact 98XXXXXX01.
            </div>
            <div>
              <span className="font-bold text-ink">WANTED:</span> Commercial office space, 500-800 sq ft, ground floor, near metro station. Immediate lease.
            </div>
          </div>

          {/* Center Target Live Ad Column */}
          <div className="md:col-span-6 flex flex-col justify-start">
            <div
              className={`transition-all duration-200 p-2.5 rounded text-[12.5px] leading-relaxed break-words whitespace-pre-wrap ${
                isBold ? 'font-bold text-ink-deep' : 'font-normal text-ink'
              } ${isColorBg ? 'bg-highlight-bg border border-amber-300' : 'bg-transparent'} ${
                isBorderTick ? 'border-2 border-dashed border-ink ring-1 ring-ink/20 shadow-sm' : ''
              }`}
            >
              {isBorderTick && (
                <span className="text-brand font-bold text-sm mr-1">✓</span>
              )}
              {booking.adText.trim() ? (
                <span>{booking.adText}</span>
              ) : (
                <span className="italic text-ink-muted">
                  Type your advertisement text on the left to see the live tactile broadsheet preview here...
                </span>
              )}
            </div>

            {/* Simulated editorial note */}
            <div className="mt-3 text-[10px] text-ink-muted font-sans border-t border-dashed border-paper-line-dark/20 pt-1.5 flex items-center justify-between">
              <span>Chars: {booking.adText.length}</span>
              <span className="text-brand font-semibold">
                {pub.unit === 'line'
                  ? `${booking.calculatedPrice.lines} Lines (~35 chars/line)`
                  : `${booking.calculatedPrice.words} Words counted`}
              </span>
            </div>
          </div>

          {/* Right Dummy Column */}
          <div className="hidden md:block md:col-span-3 text-[11px] text-ink-muted leading-tight border-l border-paper-line pl-2 text-justify space-y-2">
            <div>
              <span className="font-bold text-ink">SITUATIONS VACANT:</span> Female receptionist required for corporate dental clinic. Fluent English. Walk-in.
            </div>
            <div>
              <span className="font-bold text-ink">LOST & FOUND:</span> Brown leather briefcase in airport taxi. Important documents. High reward. Contact 9811XXXXXX.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
