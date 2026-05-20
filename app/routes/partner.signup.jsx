import {Link} from 'react-router';
import {ChevronLeft, ArrowRight, FileSignature} from 'lucide-react';

/**
 * Signup is the 9-step apply flow (CLAUDE.md §6). This route exists for
 * the canonical URL and routes to /partner/apply — restyled to the
 * Apple system.
 */

export const meta = () => [{title: 'Sign up — Keystonne Partners'}];

export default function PartnerSignup() {
  return (
    <section className="mx-auto max-w-[700px] px-4 py-20 text-center md:px-6">
      <Link
        to="/partner"
        className="mb-6 inline-flex items-center gap-1 text-[12px] font-medium"
        style={{color: 'var(--ks-muted)'}}
      >
        <ChevronLeft className="h-3.5 w-3.5" />
        Back to partner programme
      </Link>

      <div
        className="mx-auto grid h-14 w-14 place-items-center rounded-2xl"
        style={{
          background: 'var(--ks-blue-soft)',
          color: 'var(--ks-blue-dark)',
        }}
      >
        <FileSignature className="h-7 w-7" strokeWidth={1.5} />
      </div>
      <h1
        className="mt-5 text-3xl font-semibold tracking-tight md:text-[36px]"
        style={{color: 'var(--ks-ink)'}}
      >
        Becoming a partner takes one form.
      </h1>
      <p
        className="mt-3 text-sm md:text-base"
        style={{color: 'var(--ks-ink-2)'}}
      >
        We don&apos;t have a separate &ldquo;sign up&rdquo; — every partner
        goes through the same nine-step application so we can verify KYC,
        payout details, and references. It takes about ten minutes. We
        review within three working days.
      </p>
      <div className="mt-7 flex justify-center gap-3">
        <Link
          to="/partner/apply"
          className="apple-button-primary"
        >
          Start the application
          <ArrowRight className="h-4 w-4 opacity-70" />
        </Link>
        <Link
          to="/partner/login"
          className="apple-button-ghost"
        >
          I already applied
        </Link>
      </div>
    </section>
  );
}
