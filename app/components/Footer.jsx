import {Link} from 'react-router';
import {ShieldCheck, Truck, FileText, Wrench} from 'lucide-react';
import {categories} from '~/lib/mock/categories';
import {KeystonneLogo} from '~/components/KeystonneLogo';

/**
 * Bright Apple-style footer — off-white surface, hairline top border,
 * compact sitemap columns, dark text. The deep-ink slab is gone; the
 * page resolves into a calm structured close instead of a dark block.
 *
 * Trust strip (freight, GST, warranty, install) runs across the top of
 * the footer so it's still visible to buyers who scroll past inline
 * trust signals during the demo.
 */
export function Footer() {
  return (
    <footer
      className="mt-20"
      style={{
        background: 'var(--ks-page-warm)',
        color: 'var(--ks-ink-2)',
        borderTop: '1px solid var(--ks-line-soft)',
      }}
    >
      {/* Trust strip */}
      <div style={{borderBottom: '1px solid var(--ks-line-soft)'}}>
        <div className="mx-auto grid max-w-[1400px] grid-cols-2 gap-4 px-6 py-8 md:grid-cols-4">
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
      <div className="mx-auto grid max-w-[1400px] grid-cols-2 gap-8 px-6 py-14 md:grid-cols-12">
        <div className="col-span-2 md:col-span-3">
          <KeystonneLogo tone="dark" href={null} className="!h-7" />
          <p
            className="mt-4 max-w-xs text-sm"
            style={{color: 'var(--ks-ink-2)'}}
          >
            India&apos;s commercial kitchen procurement platform. Catalog,
            spec, quote, and source equipment for restaurants, hotels, cloud
            kitchens, and institutions — all in one place.
          </p>
          <div className="mt-6 flex flex-wrap gap-2 text-[11px]">
            {['Made in India', 'GST registered', 'MSME-friendly'].map((badge) => (
              <span
                key={badge}
                className="rounded-full px-2.5 py-1"
                style={{
                  border: '1px solid var(--ks-line)',
                  color: 'var(--ks-muted)',
                }}
              >
                {badge}
              </span>
            ))}
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
      <div style={{borderTop: '1px solid var(--ks-line-soft)'}}>
        <div
          className="mx-auto flex max-w-[1400px] flex-col items-start gap-2 px-6 py-5 text-[12px] md:flex-row md:items-center md:justify-between"
          style={{color: 'var(--ks-muted)'}}
        >
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
      <div
        className="grid h-10 w-10 shrink-0 place-items-center rounded-xl"
        style={{
          background: 'var(--ks-card-tint)',
          border: '1px solid var(--ks-line-soft)',
          color: 'var(--ks-ink)',
        }}
      >
        <Icon className="h-5 w-5" strokeWidth={1.6} />
      </div>
      <div>
        <div className="text-sm font-semibold" style={{color: 'var(--ks-ink)'}}>
          {title}
        </div>
        <div className="text-[12px]" style={{color: 'var(--ks-muted)'}}>
          {sub}
        </div>
      </div>
    </div>
  );
}

function FooterColumn({title, children}) {
  return (
    <div className="md:col-span-2 lg:col-span-2">
      <h4
        className="mb-3 text-[11px] font-semibold uppercase tracking-[0.12em]"
        style={{color: 'var(--ks-muted)'}}
      >
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
        className="transition-colors hover:underline"
        style={{color: 'var(--ks-ink-2)'}}
      >
        {children}
      </Link>
    </li>
  );
}
