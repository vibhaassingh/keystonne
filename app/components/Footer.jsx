import {Link} from 'react-router';
import {ShieldCheck, Truck, FileText, Wrench} from 'lucide-react';
import {categories} from '~/lib/mock/categories';
import {KeystonneLogo} from '~/components/KeystonneLogo';

/**
 * Fat 4-column footer. Density over white space — buyers come here looking
 * for category links, partner CTAs, resources, and policy info.
 *
 * Original signature accepted `footer`, `header`, `publicStoreDomain` — we
 * ignore them because our nav data is locked locally (CLAUDE.md §6).
 */
export function Footer() {
  return (
    <footer className="mt-16 bg-slate-900 text-white/85">
      {/* Trust strip — restated at the foot for buyers who scroll past it */}
      <div className="border-b border-white/10">
        <div className="mx-auto grid max-w-[1400px] grid-cols-2 gap-6 px-6 py-6 md:grid-cols-4">
          <TrustItem
            icon={Truck}
            title="Pan-India freight"
            sub="Included on every order"
          />
          <TrustItem
            icon={FileText}
            title="GST invoice"
            sub="ITC-eligible on every purchase"
          />
          <TrustItem
            icon={ShieldCheck}
            title="1-year warranty"
            sub="On all Keystonne equipment"
          />
          <TrustItem
            icon={Wrench}
            title="Installation"
            sub="Included for orders above ₹10L"
          />
        </div>
      </div>

      {/* Link columns */}
      <div className="mx-auto grid max-w-[1400px] grid-cols-2 gap-8 px-6 py-12 md:grid-cols-12">
        {/* Brand + pitch */}
        <div className="col-span-2 md:col-span-3">
          <KeystonneLogo href={null} className="!h-8" />
          <p className="mt-4 max-w-xs text-sm text-white/70">
            India&apos;s commercial kitchen procurement platform. Catalog,
            spec, quote, and source equipment for restaurants, hotels, cloud
            kitchens, and institutions — all in one place.
          </p>
          <div className="mt-6 flex flex-wrap gap-2 text-[11px] uppercase tracking-wider text-white/60">
            <span className="rounded border border-white/15 px-2 py-1">
              Made in India
            </span>
            <span className="rounded border border-white/15 px-2 py-1">
              GST registered
            </span>
            <span className="rounded border border-white/15 px-2 py-1">
              MSME-friendly
            </span>
          </div>
        </div>

        <FooterColumn title="Shop categories">
          {categories.slice(0, 8).map((c) => (
            <FooterLink key={c.slug} to={`/collections/${c.slug}`}>
              {c.name}
            </FooterLink>
          ))}
          <FooterLink to="/collections/all">View all categories →</FooterLink>
        </FooterColumn>

        <FooterColumn title="Solutions">
          <FooterLink to="/business-type/cloud-kitchen">Cloud kitchens</FooterLink>
          <FooterLink to="/business-type/cafe">Cafés</FooterLink>
          <FooterLink to="/business-type/hotel-kitchen">Hotel kitchens</FooterLink>
          <FooterLink to="/business-type/qsr">QSR</FooterLink>
          <FooterLink to="/business-type/fine-dining">Fine dining</FooterLink>
          <FooterLink to="/business-type/catering-kitchen">Catering</FooterLink>
          <FooterLink to="/business-type/new-venture">New venture? →</FooterLink>
        </FooterColumn>

        <FooterColumn title="Partners">
          <FooterLink to="/partner">Become a partner</FooterLink>
          <FooterLink to="/partner/login">Partner sign in</FooterLink>
          <FooterLink to="/partner/dashboard/resources">Partner resources</FooterLink>
          <FooterLink to="/kitchen-planner">Kitchen planner</FooterLink>
          <FooterLink to="/upload-boq">Upload your BOQ</FooterLink>
          <FooterLink to="/quote">Request a quote</FooterLink>
        </FooterColumn>

        <FooterColumn title="Company">
          <FooterLink to="/about">About Keystonne</FooterLink>
          <FooterLink to="/contact">Contact sales</FooterLink>
          <FooterLink to="/policies">Policies</FooterLink>
          <FooterLink to="/policies/shipping-policy">Shipping</FooterLink>
          <FooterLink to="/policies/refund-policy">Returns</FooterLink>
        </FooterColumn>
      </div>

      {/* Legal bar */}
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-[1400px] flex-col items-start gap-2 px-6 py-4 text-[12px] text-white/60 md:flex-row md:items-center md:justify-between">
          <span>© {new Date().getFullYear()} Keystonne. All rights reserved.</span>
          <span className="tabular">
            Standard terms: 71% advance · 29% before dispatch · 4–7 working days delivery
          </span>
        </div>
      </div>
    </footer>
  );
}

function TrustItem({icon: Icon, title, sub}) {
  return (
    <div className="flex items-start gap-3">
      <Icon className="mt-0.5 h-5 w-5 shrink-0 text-brand-accent" />
      <div>
        <div className="text-sm font-semibold text-white">{title}</div>
        <div className="text-[12px] text-white/70">{sub}</div>
      </div>
    </div>
  );
}

function FooterColumn({title, children}) {
  return (
    <div className="md:col-span-2 lg:col-span-2">
      <h4 className="mb-3 text-[11px] font-bold uppercase tracking-wider text-white/60">
        {title}
      </h4>
      <ul className="space-y-2 text-sm">{children}</ul>
    </div>
  );
}

function FooterLink({to, children}) {
  return (
    <li>
      <Link
        to={to}
        prefetch="intent"
        className="text-white/80 hover:text-white hover:underline"
      >
        {children}
      </Link>
    </li>
  );
}
