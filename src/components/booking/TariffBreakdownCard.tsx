import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BookingState } from '../../types';
import { formatINR } from '../../data/publicationsData';
import { ArrowRight, ShieldCheck, FileCheck } from 'lucide-react';

interface TariffBreakdownCardProps {
  booking: BookingState;
  onProceed?: () => void;
  showProceedButton?: boolean;
}

export const TariffBreakdownCard: React.FC<TariffBreakdownCardProps> = ({
  booking,
  onProceed,
  showProceedButton = true,
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
    <div className="bg-white rounded-3xl p-6 border border-paper-line shadow-press">
      <div className="flex items-center justify-between pb-3 border-b border-paper-line mb-4">
        <h3 className="font-head text-base font-bold text-ink uppercase tracking-wider">
          Rate &amp; Tax Calculation
        </h3>
        <span className="text-[11px] font-head font-semibold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
          INS Tariff 2026
        </span>
      </div>

      <div className="space-y-3 text-sm font-sans mb-6">
        <div className="flex items-center justify-between text-ink-muted">
          <span>
            Base Tariff ({calculatedPrice.baseUnits} {calculatedPrice.unitType}s)
          </span>
          <span className="font-medium text-ink font-mono">
            {formatINR(calculatedPrice.baseAmount)}
          </span>
        </div>

        <div className="flex items-center justify-between text-ink-muted">
          <span>
            Extra {calculatedPrice.unitType}s ({calculatedPrice.extraUnits} extra)
          </span>
          <span className="font-medium text-ink font-mono">
            {formatINR(calculatedPrice.extraAmount)}
          </span>
        </div>

        <div className="flex items-center justify-between text-ink-muted">
          <span>Visual Enhancements</span>
          <span className="font-medium text-ink font-mono">
            {formatINR(calculatedPrice.enhancementsAmount)}
          </span>
        </div>

        <div className="flex items-center justify-between text-ink-muted pb-3 border-b border-dashed border-paper-line">
          <span>GST (5% Statutory Print Tax)</span>
          <span className="font-medium text-ink font-mono">
            {formatINR(calculatedPrice.gstAmount)}
          </span>
        </div>

        <div className="flex items-baseline justify-between pt-1">
          <div>
            <span className="font-head font-bold text-base uppercase tracking-wider text-ink block">
              Total Payable
            </span>
            <span className="text-[11px] text-ink-muted">
              Includes digital e-Tearsheet proof &amp; GST tax invoice
            </span>
          </div>
          <span className="font-news-serif text-2xl font-bold text-brand font-mono">
            {formatINR(calculatedPrice.totalPayable)}
          </span>
        </div>
      </div>

      {showProceedButton && (
        <button
          onClick={handleCheckout}
          className="w-full py-3.5 px-6 rounded-full bg-brand text-white font-head font-bold text-sm tracking-wider uppercase shadow-accent hover:bg-brand-hover hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 group"
        >
          <span>Proceed to Checkout</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
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
