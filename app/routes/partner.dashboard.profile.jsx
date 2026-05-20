import {Mail, Phone, MapPin, Calendar, Wallet, FileText, Shield} from 'lucide-react';
import {PartnerShell} from '~/components/partner/PartnerShell';
import {useRequirePartnerLogin} from '~/lib/usePartnerSession';
import {demoPartner} from '~/lib/mock/partner';
import {formatDate} from '~/lib/utils/formatDate';

export const meta = () => [{title: 'Profile — Keystonne Partner'}];

export default function PartnerProfile() {
  const {hydrated, isLoggedIn} = useRequirePartnerLogin();
  if (!hydrated || !isLoggedIn) return null;

  return (
    <PartnerShell>
      <header className="mb-7">
        <span className="apple-eyebrow">Profile</span>
        <h1
          className="mt-3 text-[28px] font-semibold tracking-tight md:text-[34px]"
          style={{color: 'var(--ks-ink)', letterSpacing: '-0.022em'}}
        >
          Your partner profile.
        </h1>
        <p
          className="mt-2 text-sm md:text-base"
          style={{color: 'var(--ks-ink-2)'}}
        >
          Approved {formatDate(demoPartner.approvedAt)} · Partner ID{' '}
          <span
            style={{
              color: 'var(--ks-ink)',
              fontWeight: 500,
              fontVariantNumeric: 'tabular-nums',
            }}
          >
            {demoPartner.id}
          </span>
        </p>
      </header>

      <div className="grid gap-4 lg:grid-cols-12">
        {/* Identity */}
        <div className="premium-panel p-6 lg:col-span-7">
          <div className="flex items-center gap-4">
            <div
              className="grid h-14 w-14 place-items-center rounded-2xl text-lg font-semibold text-white"
              style={{background: 'var(--ks-ink)'}}
            >
              {demoPartner.initials}
            </div>
            <div>
              <div
                className="text-base font-semibold"
                style={{color: 'var(--ks-ink)'}}
              >
                {demoPartner.name}
              </div>
              <div
                className="text-[12px]"
                style={{color: 'var(--ks-muted)'}}
              >
                {demoPartner.persona} · {demoPartner.tier} tier
              </div>
            </div>
          </div>

          <ul className="mt-6 space-y-3 text-sm">
            <KV k="Email" v={demoPartner.email} icon={Mail} />
            <KV k="Mobile" v={demoPartner.mobile} icon={Phone} />
            <KV k="City" v={demoPartner.city} icon={MapPin} />
            <KV k="Joined" v={formatDate(demoPartner.approvedAt)} icon={Calendar} />
          </ul>
        </div>

        {/* Payout */}
        <div className="premium-panel p-6 lg:col-span-5">
          <div
            className="flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.10em]"
            style={{color: 'var(--ks-emerald-dark)'}}
          >
            <Wallet className="h-3.5 w-3.5" />
            Payout details
          </div>
          <ul className="mt-4 space-y-3 text-sm">
            <KV k="Method" v="UPI" />
            <KV k="UPI ID" v="arjun@upi" />
            <KV k="Account holder" v={demoPartner.name} />
          </ul>
          <button
            type="button"
            className="apple-button-ghost mt-5"
            style={{padding: '0.5rem 1rem', fontSize: '12px'}}
          >
            Update payout method
          </button>
        </div>

        {/* Tax */}
        <div className="premium-panel p-6 lg:col-span-5">
          <div
            className="flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.10em]"
            style={{color: 'var(--ks-muted)'}}
          >
            <FileText className="h-3.5 w-3.5" />
            Tax
          </div>
          <ul className="mt-4 space-y-3 text-sm">
            <KV k="PAN" v="ABCDE1234F" />
            <KV k="GSTIN" v="29ABCDE1234F1Z5" />
            <KV k="TDS rate" v="10% (Section 194H)" />
            <KV k="Form 16A delivery" v="Quarterly via email" />
          </ul>
        </div>

        {/* Programme */}
        <div className="premium-panel p-6 lg:col-span-7">
          <div
            className="flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.10em]"
            style={{color: 'var(--ks-muted)'}}
          >
            <Shield className="h-3.5 w-3.5" />
            Programme settings
          </div>
          <ul className="mt-4 space-y-3 text-sm">
            <KV k="Referral handle" v={demoPartner.referralCode} />
            <KV k="Vanity URL" v={`keystonne.com/p/${demoPartner.referralCode}`} />
            <KV k="Tier" v={`${demoPartner.tier} (×1.10)`} />
            <KV k="Notifications" v="Email + WhatsApp on stage transitions" />
          </ul>
        </div>
      </div>
    </PartnerShell>
  );
}

function KV({k, v, icon: Icon}) {
  return (
    <li className="flex items-start justify-between gap-3">
      <span
        className="flex items-center gap-1.5"
        style={{color: 'var(--ks-muted)'}}
      >
        {Icon && <Icon className="h-3.5 w-3.5" />}
        {k}
      </span>
      <span
        className="text-right font-medium"
        style={{color: 'var(--ks-ink)', fontVariantNumeric: 'tabular-nums'}}
      >
        {v}
      </span>
    </li>
  );
}
