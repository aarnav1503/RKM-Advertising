import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BookingState } from '../../types';
import { formatINR } from '../../data/publicationsData';
import { ArrowRight, ShieldCheck, FileCheck } from 'lucide-react';

interface TariffBreakdownCardProps {
  booking: BookingState;
  onProceed?: () => void;
  showProceedButton?: boolean;
  currentStep?: number;
}

export const TariffBreakdownCard: React.FC<TariffBreakdownCardProps> = ({
  booking,
  onProceed,
  showProceedButton = true,
  currentStep = 1,
}) => {
  const navigate = useNavigate();
  const { calculatedPrice } = booking;

  const handleCheckout = () => {
    if (onProceed) {
      onProceed();
    } else {
      navigate('/checkout');
    }
  };

  return (
    <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 border border-paper-line shadow-press">
      <div className="flex items-center justify-between gap-2 pb-3 border-b border-paper-line mb-4">
        <h3 className="font-head text-xs sm:text-sm md:text-base font-bold text-ink uppercase tracking-wider truncate">
          Rate &amp; Tax Calculation
        </h3>
        <span className="text-[10px] sm:text-[11px] font-head font-bold uppercase tracking-wide px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 whitespace-nowrap shrink-0">
          INS Tariff 2026
        </span>
      </div>

      <div className="space-y-3 text-xs sm:text-sm font-sans mb-5 sm:mb-6">
        <div className="flex items-center justify-between text-ink-muted">
          <span>
            Base Tariff ({calculatedPrice.baseUnits} {calculatedPrice.unitType}s)
          </span>
          <span className="font-medium text-ink font-mono whitespace-nowrap">
            {formatINR(calculatedPrice.baseAmount)}
          </span>
        </div>

        <div className="flex items-center justify-between text-ink-muted">
          <span>
            Extra {calculatedPrice.unitType}s ({calculatedPrice.extraUnits} extra)
          </span>
          <span className="font-medium text-ink font-mono whitespace-nowrap">
            {formatINR(calculatedPrice.extraAmount)}
          </span>
        </div>

        <div className="flex items-center justify-between text-ink-muted">
          <span>Visual Enhancements</span>
          <span className="font-medium text-ink font-mono whitespace-nowrap">
            {formatINR(calculatedPrice.enhancementsAmount)}
          </span>
        </div>

        <div className="flex items-center justify-between text-ink-muted pb-3 border-b border-dashed border-paper-line">
          <span>GST (5% Statutory Print Tax)</span>
          <span className="font-medium text-ink font-mono whitespace-nowrap">
            {formatINR(calculatedPrice.gstAmount)}
          </span>
        </div>

        <div className="flex items-center justify-between gap-3 pt-1">
          <div className="min-w-0 flex-1">
            <span className="font-head font-bold text-sm sm:text-base uppercase tracking-wider text-ink block">
              Total Payable
            </span>
            <span className="text-[10.5px] sm:text-[11px] text-ink-muted leading-tight block">
              Includes digital e-Tearsheet proof &amp; GST tax invoice
            </span>
          </div>
          <span className="font-news-serif text-xl sm:text-2xl font-bold text-brand font-mono whitespace-nowrap shrink-0 text-right">
            {formatINR(calculatedPrice.totalPayable)}
          </span>
        </div>
      </div>

      {showProceedButton ? (
        <button
          type="button"
          onClick={handleCheckout}
          className="w-full py-3.5 px-6 rounded-full bg-brand text-white font-head font-bold text-sm tracking-wider uppercase shadow-accent hover:bg-brand-hover hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 group cursor-pointer"
        >
          <span>Proceed to Checkout</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      ) : (
        <div className="py-2.5 px-3.5 rounded-xl bg-paper-tint border border-paper-line/80 flex items-center justify-between text-xs text-ink-muted">
          <span className="font-head font-bold uppercase tracking-wider text-[10.5px] sm:text-[11px] text-ink flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse shrink-0" />
            Step {currentStep || 1} of 3 in progress
          </span>
          <span className="text-[10.5px] sm:text-[11px] font-sans text-brand font-semibold whitespace-nowrap">
            Checkout on Step 3 ➔
          </span>
        </div>
      )}

      <div className="mt-4 pt-3 border-t border-paper-line-light flex items-center justify-center gap-4 text-[11px] text-ink-muted font-sans">
        <div className="flex items-center gap-1">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          <span>INS Direct Agency</span>
        </div>
        <div className="flex items-center gap-1">
          <FileCheck className="w-3.5 h-3.5 text-brand" />
          <span>Authorized Invoice</span>
        </div>
      </div>
    </div>
  );
};
