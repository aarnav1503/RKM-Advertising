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
      <div className="bg-[#FAF7F2] text-ink p-4 sm:p-6 font-serif border-2 border-stone-300 rounded-2xl shadow-press paper-pattern select-none">
        {/* Newspaper Masthead Mini-Bar */}
        <div className="border-t-2 border-b-2 border-stone-800 py-1.5 flex items-baseline justify-between mb-2">
          <span className="font-news-serif font-black tracking-tight text-ink uppercase text-sm sm:text-base">
            {pub.name}
          </span>
          <span className="font-head text-[10px] font-bold tracking-wider text-stone-600">
            {formattedDate}
          </span>
        </div>

        {/* Edition & Section Subtitle */}
        <div className="flex items-center justify-between text-[9.5px] text-stone-500 uppercase tracking-widest font-head pb-2 border-b border-stone-300 mb-3">
          <span>{booking.edition} EDITION</span>
          <span>CLASSIFIED NOTICES • PAGE 14</span>
        </div>

        {/* Category Header Strip */}
        <div className="bg-stone-900 text-stone-100 text-center py-1 font-head text-[11px] font-bold tracking-widest uppercase mb-3 shadow-xs">
          {booking.category}
        </div>

        {/* Authentic Broadsheet Column Simulation */}
        <div className="space-y-3">
          {/* Preceding Classified Notice (Context) */}
          <div className="text-[11px] text-stone-500 leading-snug border-b border-stone-200 pb-2">
            <span className="font-bold text-stone-700">TO LET:</span> 2 BHK luxuriously furnished flat, Sector 15. Covered parking, 100% power backup. Family only. Ph: 9811XXXXXX.
          </div>

          {/* Center Target Live Ad Column */}
          <div className="relative">
            <div
              className={`transition-all duration-200 p-3 sm:p-3.5 rounded-lg text-xs sm:text-[13px] leading-relaxed break-words whitespace-pre-wrap ${
                isBold ? 'font-bold text-stone-950' : 'font-normal text-stone-800'
              } ${isColorBg ? 'bg-amber-100/90 border border-amber-300' : 'bg-stone-100/70 border border-stone-200'} ${
                isBorderTick ? 'border-2 border-dashed border-stone-800 ring-1 ring-stone-900/10 shadow-xs' : ''
              }`}
            >
              {isBorderTick && (
                <span className="text-brand font-bold text-sm mr-1">✓</span>
              )}
              {booking.adText.trim() ? (
                <span>{booking.adText}</span>
              ) : (
                <span className="italic text-stone-400">
                  Type your advertisement text on the left to see the live tactile broadsheet preview here...
                </span>
              )}
            </div>

            {/* Simulated editorial note */}
            <div className="mt-2 text-[10px] text-stone-500 font-sans flex items-center justify-between px-1">
              <span>Characters: <strong className="font-mono text-stone-700">{booking.adText.length}</strong></span>
              <span className="font-head font-bold text-brand uppercase">
                {pub.unit === 'line'
                  ? `${booking.calculatedPrice.lines} Lines Billed`
                  : `${booking.calculatedPrice.words} Words Billed`}
              </span>
            </div>
          </div>

          {/* Succeeding Classified Notice (Context) */}
          <div className="text-[11px] text-stone-500 leading-snug border-t border-stone-200 pt-2">
            <span className="font-bold text-stone-700">LOST &amp; FOUND:</span> Original Title Deed document of Flat No. 204 lost near Metro Station. Finder please contact: 9878XXXXXX.
          </div>
        </div>
      </div>
    </div>
  );
};
