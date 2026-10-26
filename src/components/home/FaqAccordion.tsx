import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

interface FaqItem {
  question: string;
  answer: string;
}

interface FaqAccordionProps {
  items?: FaqItem[];
  title?: string;
  subtitle?: string;
}

export const FaqAccordion: React.FC<FaqAccordionProps> = ({
  items,
  title = 'Frequently Asked Questions',
  subtitle = 'Everything you need to know about Indian print cut-offs, rates, affidavits, and tearsheet proofs.',
}) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const defaultItems: FaqItem[] = [
    {
      question: 'What is a certified e-Tearsheet and how do I download it?',
      answer:
        'An e-Tearsheet is a certified, high-resolution digital scan of the exact newspaper page in which your advertisement appeared, with your notice highlighted. Traditional platforms force you to search morning newsstands; RKM Ads uploads your certified e-Tearsheet directly into your "Track Ad" dashboard by 9:00 AM on the day of publication.',
    },
    {
      question: 'Which ad categories require mandatory legal documentation/affidavits?',
      answer:
        'As mandated by the Indian Newspaper Society (INS) and legal precedent: (1) Change of Name requires a notarized name change affidavit under 6 months old and ID proof; (2) Public/Court Notices require an advocate letterhead or certified court order; (3) Obituary notices require a doctor’s death certificate; (4) Lost & Found requires a police NCR or DD entry copy. You can upload documents securely in Step 4.',
    },
    {
      question: 'How do you calculate per-line vs. per-word billing?',
      answer:
        'Different publications enforce distinct rate cards. The Times of India, The Hindu, and The Economic Times calculate tariffs on a 5-line base (with approx. 35 characters per line). Dainik Jagran, Hindustan Times, and Amar Ujala calculate on a 20-word base. Our client-side calculation engine switches regex rules automatically to prevent unexpected charges.',
    },
    {
      question: 'What are the deadline cut-off times for next-day release?',
      answer:
        'For most daily newspapers, bookings must be completed before 3:00 PM on the working day prior to publication. For Sunday matrimonial editions, the cut-off is strictly Friday at 3:00 PM. Our live countdown timer automatically alerts you to the exact time remaining.',
    },
    {
      question: 'Can I claim GST input tax credit for commercial ads?',
      answer:
        'Yes. All advertisement transactions on RKM Ads carry an authorized GST tax invoice (5% GST for print media, 18% for digital/broadcast). Simply input your company GSTIN during checkout to receive an automatic B2B tax invoice.',
    },
    {
      question: 'What payment methods are supported on RKM Ads?',
      answer:
        'We support instant zero-surcharge UPI payments via dynamic QR code (Google Pay, PhonePe, Paytm, BHIM), all major Credit/Debit cards (Visa, MasterCard, RuPay, Amex), and Net Banking across 50+ commercial banks.',
    },
  ];

  const faqs = items && items.length > 0 ? items : defaultItems;

  return (
    <section className="py-16 sm:py-24 bg-paper-tint border-b border-paper-line">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-paper border border-paper-line text-xs font-head font-bold uppercase tracking-wider text-ink mb-3">
            <HelpCircle className="w-3.5 h-3.5 text-brand" />
            <span>Support &amp; Clarity</span>
          </div>
          <h2 className="font-news-serif text-3xl sm:text-4xl font-bold text-ink tracking-tight mb-3">
            {title}
          </h2>
          <p className="text-sm sm:text-base text-ink-muted font-sans max-w-xl mx-auto">
            {subtitle}
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-paper-line overflow-hidden shadow-sm transition-all"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full py-4 px-6 text-left flex items-center justify-between gap-4 font-head font-bold text-sm sm:text-base text-ink hover:text-brand transition-colors"
                >
                  <span>{faq.question}</span>
                  <ChevronDown
                    className={`w-4 h-4 shrink-0 transition-transform duration-200 text-ink-muted ${
                      isOpen ? 'rotate-180 text-brand' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-6 pb-5 pt-1 text-xs sm:text-sm text-ink-muted font-sans leading-relaxed border-t border-paper-line-light animate-in fade-in duration-150">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
