import {Link} from 'react-router';
import {ChevronLeft, ArrowRight, FileSignature} from 'lucide-react';

/**
 * Signup is implemented by the 9-step apply flow (CLAUDE.md §6: route is
 * /partner/apply). This route exists to satisfy the locked URL structure
 * but redirects visitors to the canonical application.
 */

export const meta = () => [{title: 'Sign up — Keystonne Partners'}];

export default function PartnerSignup() {
  return (
    <section className="mx-auto max-w-[700px] px-4 py-16 md:px-6 md:py-20 text-center">
      <Link
        to="/partner"
        className="mb-6 inline-flex items-center gap-1 text-[12px] font-semibold text-gray-500 hover:text-brand-primary"
      >
        <ChevronLeft className="h-3.5 w-3.5" />
        Back to partner programme
      </Link>

      <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-brand-primary-50 text-brand-primary">
        <FileSignature className="h-7 w-7" />
      </div>
      <h1 className="mt-5 text-3xl font-semibold tracking-tight text-ink">
        Becoming a partner takes one form.
      </h1>
      <p className="mt-3 text-sm text-gray-600 md:text-base">
        We don&apos;t have a separate "sign up" — every partner goes
        through the same nine-step application so we can verify KYC,
        payout details, and references. It takes about 10 minutes.
        We review within 3 working days.
      </p>
      <div className="mt-7 flex justify-center gap-3">
        <Link
          to="/partner/apply"
          className="inline-flex items-center gap-2 rounded-xl btn-primary px-5 py-3 text-sm font-semibold"
        >
          Start the application
          <ArrowRight className="h-4 w-4" />
        </Link>
        <Link
          to="/partner/login"
          className="inline-flex items-center gap-2 rounded-xl border border-gray-300 bg-white px-5 py-3 text-sm font-semibold text-ink hover:border-ink/40"
        >
          I already applied
        </Link>
      </div>
    </section>
  );
}
