import {Hero} from '~/components/Hero';
import {KitchenPlannerInput} from '~/components/KitchenPlannerInput';
import {TrustStrip} from '~/components/TrustStrip';
import {FeaturedCategoriesGrid} from '~/components/FeaturedCategoriesGrid';
import {FeaturedRow} from '~/components/FeaturedRow';
import {PartnerPromoBand} from '~/components/PartnerPromoBand';
import {products} from '~/lib/mock/products';

/**
 * Storefront home — Sprint 3 of the Apple-inspired redesign.
 *
 * Composition (top to bottom):
 *   1. Hero                          — one bright editorial container
 *   2. KitchenPlannerInput           — quiet AI command module
 *   3. TrustStrip                    — five precise procurement claims
 *   4. FeaturedCategoriesGrid        — 14 compact category tiles
 *   5. FeaturedRow (spotlight)       — hand-picked spec-grade products
 *   6. PartnerPromoBand              — sample-commission module
 *
 * The second "Stock items — ready to ship" featured row from the
 * previous version was removed to let the page breathe; stock items
 * stay reachable from the catalog (and the new lead-time signal in
 * the category grid surfaces "stock" directly).
 */

export const meta = () => [
  {title: 'Keystonne — Commercial Kitchen Procurement for India'},
  {
    name: 'description',
    content:
      'Plan equipment, compare specs, request quotes, and manage partner-led projects from one procurement workspace. India-first commercial kitchen procurement.',
  },
];

export default function Homepage() {
  const spotlight = products.slice(0, 4).concat(products.slice(4, 8));

  return (
    <>
      <Hero />
      <KitchenPlannerInput />
      <TrustStrip />
      <FeaturedCategoriesGrid />
      <FeaturedRow
        eyebrow="Spec-grade picks"
        title="Built for India's busiest kitchens"
        products={spotlight}
        viewAllTo="/collections/all"
      />
      <PartnerPromoBand />
    </>
  );
}
