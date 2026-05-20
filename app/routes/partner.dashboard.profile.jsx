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
      <header className="mb-6">
        <span className="eyebrow">Profile</span>
        <h1 className="mt-2 text-2xl font-semibold tracking-tight text-ink md:text-3xl">
          Your partner profile.
        </h1>
        <p className="mt-1 text-sm text-gray-600">
          Approved {formatDate(demoPartner.approvedAt)} · Partner ID{' '}
          <span className="tabular font-medium text-ink">{demoPartner.id}</span>
        </p>
      </header>

      <div className="grid gap-4 lg:grid-cols-12">
        {/* Identity */}
        <div className="card p-5 lg:col-span-7">
          <div className="flex items-center gap-4">
            <div className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-brand-primary-600 to-brand-primary text-lg font-bold text-white">
              {demoPartner.initials}
            </div>
            <div>
              <div className="text-base font-semibold text-ink">{demoPartner.name}</div>
              <div className="text-[12px] text-gray-500">
                {demoPartner.persona} · {demoPartner.tier} tier
              </div>
            </div>
          </div>

          <ul className="mt-5 space-y-3 text-sm">
            <KV k="Email" v={demoPartner.email} icon={Mail} />
            <KV k="Mobile" v={demoPartner.mobile} icon={Phone} />
            <KV k="City" v={demoPartner.city} icon={MapPin} />
            <KV k="Joined" v={formatDate(demoPartner.approvedAt)} icon={Calendar} />
          </ul>
        </div>

        {/* Payout */}
        <div className="card p-5 lg:col-span-5">
          <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.14em] text-gray-500">
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
            className="mt-5 inline-flex items-center gap-1.5 rounded-xl border border-gray-300 bg-white px-3 py-1.5 text-[12px] font-semibold text-ink hover:border-ink/40"
          >
            Update payout method
          </button>
        </div>

        {/* Tax */}
        <div className="card p-5 lg:col-span-5">
          <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.14em] text-gray-500">
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
        <div className="card p-5 lg:col-span-7">
          <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.14em] text-gray-500">
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
      <span className="flex items-center gap-1.5 text-gray-500">
        {Icon && <Icon className="h-3.5 w-3.5" />}
        {k}
      </span>
      <span className="tabular text-right font-medium text-ink">{v}</span>
    </li>
  );
}
