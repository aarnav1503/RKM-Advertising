import React, { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';

interface CutoffCountdownBadgeProps {
  cutoffHour?: number;
}

export const CutoffCountdownBadge: React.FC<CutoffCountdownBadgeProps> = ({ cutoffHour = 15 }) => {
  const [statusText, setStatusText] = useState('');
  const [isPast, setIsPast] = useState(false);

  useEffect(() => {
    const checkCutoff = () => {
      const now = new Date();
      const nextDate = new Date(now);
      const isPastCutoff = now.getHours() >= cutoffHour;
      setIsPast(isPastCutoff);

      if (isPastCutoff) {
        nextDate.setDate(nextDate.getDate() + 2);
      } else {
        nextDate.setDate(nextDate.getDate() + 1);
      }

      const releaseStr = nextDate.toLocaleDateString('en-IN', {
        weekday: 'short',
        day: 'numeric',
        month: 'short',
      });

      const deadline = new Date(now);
      deadline.setHours(cutoffHour, 0, 0, 0);
      const diffMs = deadline.getTime() - now.getTime();

      if (diffMs > 0) {
        const hours = Math.floor(diffMs / (1000 * 60 * 60)).toString().padStart(2, '0');
        const mins = Math.floor((diffMs / (1000 * 60)) % 60).toString().padStart(2, '0');
        const secs = Math.floor((diffMs / 1000) % 60).toString().padStart(2, '0');
        setStatusText(
          `Booking closes in ${hours}:${mins}:${secs} for print on ${releaseStr}`
        );
      } else {
        setStatusText(
          `Today's ${cutoffHour > 12 ? cutoffHour - 12 : cutoffHour}:00 PM press cut-off has passed. Earliest publication: ${releaseStr}`
        );
      }
    };

    checkCutoff();
    const interval = setInterval(checkCutoff, 1000);
    return () => clearInterval(interval);
  }, [cutoffHour]);

  return (
    <div
      className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-head font-semibold tracking-wide border transition-colors ${
        isPast
          ? 'bg-amber-50 text-amber-900 border-amber-200'
          : 'bg-emerald-50 text-emerald-900 border-emerald-200'
      }`}
    >
      <Clock className={`w-3.5 h-3.5 ${isPast ? 'text-amber-600' : 'text-emerald-600 animate-pulse'}`} />
      <span>{statusText}</span>
    </div>
  );
};
