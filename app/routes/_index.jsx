import {HeroCarousel} from '~/components/HeroCarousel';
import {KitchenPlannerInput} from '~/components/KitchenPlannerInput';
import {TrustStrip} from '~/components/TrustStrip';
import {FeaturedCategoriesGrid} from '~/components/FeaturedCategoriesGrid';
import {FeaturedRow} from '~/components/FeaturedRow';
import {PartnerPromoBand} from '~/components/PartnerPromoBand';
import {products} from '~/lib/mock/products';

/**
 * Storefront home — composes the chrome (in PageLayout) with the seven
 * Sprint 3 sections:
 *
 *   HeroCarousel
 *   KitchenPlannerInput   ("Build my kitchen" AI teaser)
 *   TrustStrip
 *   FeaturedCategoriesGrid (all 14)
 *   FeaturedRow            (8 cross-category products)
 *   PartnerPromoBand
 *   FeaturedRow            (bestsellers under ₹50K — "Add to cart" eligible)
 */

export const meta = () => [
  {title: 'Keystonne — Commercial Kitchen Procurement for India'},
  {
    name: 'description',
    content:
      'Catalog, spec, quote, and source commercial kitchen equipment in India. For restaurants, hotels, cloud kitchens, and institutions.',
  },
];

export default function Homepage() {
  // Pick a varied subset for the first row, then the < ₹50K subset for the
  // second row so visitors see both "browse + add to cart" and "request quote"
  // patterns next to each other.
  const spotlight = products.slice(0, 4).concat(products.slice(4, 8));
  const addToCartEligible = products.filter(
    (p) => typeof p.priceINR === 'number' && p.priceINR < 50_000,
  );

  return (
    <>
      <HeroCarousel />
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
      {addToCartEligible.length > 0 && (
        <FeaturedRow
          eyebrow="Ships within a week"
          title="Stock items — ready to ship"
          products={addToCartEligible}
          viewAllTo="/collections/all"
        />
      )}
    </>
  );
}
