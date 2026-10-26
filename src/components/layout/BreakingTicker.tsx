import React, { useState, useEffect } from 'react';
import { Clock, ShieldCheck, Newspaper, Award } from 'lucide-react';

export const BreakingTicker: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState<string>('');
  const [earliestDate, setEarliestDate] = useState<string>('');

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date();
      const cutoff = new Date(now);
      cutoff.setHours(15, 0, 0, 0); // 3:00 PM

      const targetDate = new Date(now);
      if (now.getHours() >= 15) {
        targetDate.setDate(targetDate.getDate() + 2);
      } else {
        targetDate.setDate(targetDate.getDate() + 1);
      }

      setEarliestDate(
        targetDate.toLocaleDateString('en-IN', {
          weekday: 'short',
          day: 'numeric',
          month: 'short',
        })
      );

      const diff = cutoff.getTime() - now.getTime();
      if (diff > 0) {
        const hours = Math.floor(diff / (1000 * 60 * 60)).toString().padStart(2, '0');
        const mins = Math.floor((diff / (1000 * 60)) % 60).toString().padStart(2, '0');
        const secs = Math.floor((diff / 1000) % 60).toString().padStart(2, '0');
        setTimeLeft(`${hours}:${mins}:${secs}`);
      } else {
        setTimeLeft('3:00 PM CUT-OFF PASSED');
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-ink text-paper-soft text-xs font-head tracking-wider uppercase border-b border-ink/40 py-2 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-brand-amber font-semibold">
          <Clock className="w-3.5 h-3.5 animate-pulse text-brand" />
          <span>DAILY PRESS DEADLINE:</span>
          <span className="text-white font-mono bg-ink-deep px-2 py-0.5 rounded border border-white/10">
            {timeLeft.includes(':') ? `CLOSES IN ${timeLeft}` : timeLeft}
          </span>
          <span className="text-paper-soft/80 hidden md:inline">
            for morning release on <strong className="text-white underline decoration-brand">{earliestDate}</strong>
          </span>
        </div>

        <div className="hidden lg:flex items-center gap-6 text-[11px] text-paper-soft/70">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>INS Accredited Direct Agency</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Newspaper className="w-3.5 h-3.5 text-brand" />
            <span>150+ Dailies • Per-Word / Per-Line Engine</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Award className="w-3.5 h-3.5 text-brand-amber" />
            <span>Verified Digital e-Tearsheets</span>
          </div>
        </div>
      </div>
    </div>
  );
};
