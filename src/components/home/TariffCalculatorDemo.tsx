import React, { useState } from 'react';
import { calculateLines, formatINR } from '../../data/publicationsData';
import { Calculator, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const TariffCalculatorDemo: React.FC = () => {
  const [testText, setTestText] = useState(
    'Wanted suitable alliance for beautiful Khatri girl, 28, 5′6″, MBA finance, working in Top MNC Gurugram. Well-settled family. Status match. Early marriage.'
  );

  const words = testText.trim() ? testText.trim().split(/\s+/).length : 0;
  const lines = testText.trim() ? calculateLines(testText.trim(), 35) : 0;

  // TOI calculation: Base 5 lines = ₹1,450; extra lines = ₹290/line
  const toiExtraLines = Math.max(0, lines - 5);
  const toiSubtotal = 1450 + toiExtraLines * 290;
  const toiTotal = Math.round(toiSubtotal * 1.05);

  // Jagran calculation: Base 20 words = ₹1,100; extra words = ₹55/word
  const jagranExtraWords = Math.max(0, words - 20);
  const jagranSubtotal = 1100 + jagranExtraWords * 55;
  const jagranTotal = Math.round(jagranSubtotal * 1.05);

  return (
    <section className="py-16 sm:py-24 bg-paper-tint border-b border-paper-line">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-5">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-paper border border-paper-line text-xs font-head font-bold uppercase tracking-wider text-ink">
              <Calculator className="w-3.5 h-3.5 text-brand" />
              <span>Dual Tariff Billing Engine</span>
            </div>

            <h2 className="font-news-serif text-3xl sm:text-4xl font-bold text-ink tracking-tight">
              Words vs. Lines: Automated Publication Tokenizer
            </h2>

            <p className="text-sm sm:text-base text-ink-muted leading-relaxed font-sans">
              Indian newspapers don’t bill uniformly. <em>The Times of India</em> bills per 5 lines ($\approx$ 35 characters/line), while <em>Dainik Jagran</em> and <em>Hindustan Times</em> bill per 20 words.
            </p>

            <div className="space-y-2.5 pt-2">
              <div className="flex items-start gap-2.5 text-xs text-ink-muted">
                <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0 font-bold text-[10px]">
                  ✓
                </div>
                <div>
                  <strong className="text-ink">Zero surprise overages:</strong> Regex character wrapping prevents cut-off words and calculates exact line breaks.
                </div>
              </div>
              <div className="flex items-start gap-2.5 text-xs text-ink-muted">
                <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0 font-bold text-[10px]">
                  ✓
                </div>
                <div>
                  <strong className="text-ink">Instant 5% GST calculation:</strong> Accurate statutory tax computation for print advertisement compliance.
                </div>
              </div>
            </div>

            <div className="pt-2">
              <Link
                to="/rate-cards"
                className="inline-flex items-center gap-2 text-xs font-head font-bold uppercase tracking-wider text-brand hover:underline"
              >
                <span>View All 2026 Rate Cards</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-paper-line shadow-press space-y-5">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-head font-bold uppercase tracking-wider text-ink">
                    Test Live Textarea Tokenizer
                  </label>
                  <span className="text-[11px] font-head font-semibold text-brand">
                    {words} Words • {lines} Lines (~35 char width)
                  </span>
                </div>
                <textarea
                  value={testText}
                  onChange={(e) => setTestText(e.target.value)}
                  rows={3}
                  className="w-full bg-paper-tint border border-paper-line rounded-2xl p-3.5 text-xs font-sans text-ink focus:outline-none focus:border-brand resize-none leading-relaxed"
                  placeholder="Type any advertisement copy to test dynamic tokenizer..."
                />
              </div>

              {/* Dual Comparison Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Per-Line Card (TOI) */}
                <div className="bg-paper-tint rounded-2xl p-4 border border-paper-line relative">
                  <span className="text-[10px] font-head font-bold uppercase tracking-wider text-brand block mb-1">
                    Line Billing Mode
                  </span>
                  <h4 className="font-news-serif text-sm font-bold text-ink mb-2">
                    The Times of India
                  </h4>
                  <div className="text-xs text-ink-muted space-y-1 mb-3">
                    <div>Base (5 Lines): ₹ 1,450</div>
                    <div>Extra Lines ({toiExtraLines}): {formatINR(toiExtraLines * 290)}</div>
                    <div>GST (5%): {formatINR(toiSubtotal * 0.05)}</div>
                  </div>
                  <div className="pt-2 border-t border-paper-line flex items-baseline justify-between">
                    <span className="text-xs font-head font-bold uppercase text-ink">Payable</span>
                    <span className="font-news-serif text-lg font-bold text-ink">
                      {formatINR(toiTotal)}
                    </span>
                  </div>
                </div>

                {/* Per-Word Card (Dainik Jagran) */}
                <div className="bg-paper-tint rounded-2xl p-4 border border-paper-line relative">
                  <span className="text-[10px] font-head font-bold uppercase tracking-wider text-emerald-700 block mb-1">
                    Word Billing Mode
                  </span>
                  <h4 className="font-news-serif text-sm font-bold text-ink mb-2">
                    Dainik Jagran
                  </h4>
                  <div className="text-xs text-ink-muted space-y-1 mb-3">
                    <div>Base (20 Words): ₹ 1,100</div>
                    <div>Extra Words ({jagranExtraWords}): {formatINR(jagranExtraWords * 55)}</div>
                    <div>GST (5%): {formatINR(jagranSubtotal * 0.05)}</div>
                  </div>
                  <div className="pt-2 border-t border-paper-line flex items-baseline justify-between">
                    <span className="text-xs font-head font-bold uppercase text-ink">Payable</span>
                    <span className="font-news-serif text-lg font-bold text-ink">
                      {formatINR(jagranTotal)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
