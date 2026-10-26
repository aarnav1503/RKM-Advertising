import React from 'react';
import { PageHeader } from '../components/layout/PageHeader';
import { ShieldAlert, FileText, RotateCcw, AlertCircle } from 'lucide-react';

export const TermsPage: React.FC = () => {
  return (
    <div className="bg-paper min-h-screen pb-20">
      <PageHeader
        title="Editorial Guidelines, Affidavits &amp; Terms of Service"
        subtitle="Statutory compliance rules enforced by the Indian Newspaper Society (INS), Ministry of Information &amp; Broadcasting, and RKM Ads."
        badge="Legal &amp; Compliance Policy"
        breadcrumbs={[{ label: 'Terms & Policies' }]}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 space-y-10 font-sans text-xs sm:text-sm text-ink-muted leading-relaxed">
        {/* Section 1 */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-paper-line shadow-press space-y-4">
          <div className="flex items-center gap-2.5 text-ink">
            <FileText className="w-5 h-5 text-brand shrink-0" />
            <h2 className="font-news-serif text-2xl font-bold">
              1. Editorial Acceptance &amp; ASCI Compliance
            </h2>
          </div>
          <p>
            All advertisements placed via RKM Ads must adhere to the standards outlined by the <strong>Advertising Standards Council of India (ASCI)</strong> and the Press Council of India. Advertisements must not be misleading, defamatory, offensive, or contrary to the law of the land.
          </p>
          <p>
            Publishers reserve the absolute right to decline, suspend, or request revisions to any advertising copy that fails to meet their internal editorial standards or does not provide requisite notarized documentation.
          </p>
        </div>

        {/* Section 2 */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-paper-line shadow-press space-y-4">
          <div className="flex items-center gap-2.5 text-ink">
            <ShieldAlert className="w-5 h-5 text-brand shrink-0" />
            <h2 className="font-news-serif text-2xl font-bold">
              2. Mandatory Supporting Legal Documentation
            </h2>
          </div>
          <p>
            In compliance with Indian law, specific advertising categories mandate legal documentation prior to release. Failure to supply certified documents will result in publication postponement:
          </p>
          <ul className="space-y-3 pt-1">
            <li className="p-3 rounded-2xl bg-paper-tint border border-paper-line">
              <strong className="text-ink font-head uppercase text-xs block mb-0.5">
                Change of Name Notice
              </strong>
              Original or scanned clear copy of a Notarised Name Change Affidavit executed on non-judicial stamp paper within the last six months, accompanied by government ID proof (Aadhaar or Passport).
            </li>
            <li className="p-3 rounded-2xl bg-paper-tint border border-paper-line">
              <strong className="text-ink font-head uppercase text-xs block mb-0.5">
                Public / Legal Notice
              </strong>
              Formal notice draft on practicing Advocate or Solicitor letterhead with enrollment number, or a stamped certified copy of a judicial Court Order.
            </li>
            <li className="p-3 rounded-2xl bg-paper-tint border border-paper-line">
              <strong className="text-ink font-head uppercase text-xs block mb-0.5">
                Obituary &amp; Remembrance
              </strong>
              Copy of Doctor’s Death Certificate or registered Cremation / Burial ground receipt.
            </li>
            <li className="p-3 rounded-2xl bg-paper-tint border border-paper-line">
              <strong className="text-ink font-head uppercase text-xs block mb-0.5">
                Lost Documents (Property Deeds, Marksheets, Certificates)
              </strong>
              Police Non-Cognizable Report (NCR) or Daily Diary (DD) entry copy stamped by the jurisdiction police station.
            </li>
          </ul>
        </div>

        {/* Section 3 */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-paper-line shadow-press space-y-4">
          <div className="flex items-center gap-2.5 text-ink">
            <AlertCircle className="w-5 h-5 text-brand shrink-0" />
            <h2 className="font-news-serif text-2xl font-bold">
              3. Press Deadlines &amp; Cut-Off Times
            </h2>
          </div>
          <p>
            The platform enforces publication press cut-offs. For regular daily newspaper editions, orders must be placed and verified before <strong>3:00 PM IST</strong> on the business day prior to the requested print date.
          </p>
          <p>
            For specialized Sunday classified pull-outs (e.g. <em>The Times of India Times Soul / Matrimonials</em>), deadlines close strictly on <strong>Friday at 3:00 PM IST</strong>. Any bookings received subsequent to the deadline are automatically queued for the immediate next scheduled issue.
          </p>
        </div>

        {/* Section 4 */}
        <div id="refunds" className="bg-white rounded-3xl p-6 sm:p-8 border border-paper-line shadow-press space-y-4">
          <div className="flex items-center gap-2.5 text-ink">
            <RotateCcw className="w-5 h-5 text-emerald-600 shrink-0" />
            <h2 className="font-news-serif text-2xl font-bold">
              4. Cancellation &amp; 100% Refund Policy
            </h2>
          </div>
          <p>
            Advertisers may cancel an order and receive a <strong>100% refund</strong> provided the cancellation request is received prior to editorial dispatch to the printing press (before 4:00 PM on the day preceding release).
          </p>
          <p>
            If an advertisement is rejected by the publication's editorial board due to legal insufficiency or non-conformance, and the advertiser elects not to provide updated affidavits, the entire paid fee will be refunded back to the original source account (UPI / Bank / Card) within 3 to 5 business days with zero deduction.
          </p>
        </div>
      </div>
    </div>
  );
};
