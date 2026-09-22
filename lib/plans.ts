export interface Tier {
  id: 'archive' | 'series' | 'studio' | 'network' | 'syndicate';
  name: string;
  monthlyPrice: number;
  // Marketing-facing monthly credit pool ("Every plan is one credit pool" —
  // components/Pricing.tsx). Distinct from the legacy prepaid balance stored
  // as `credits` on the user doc (lib/flags.ts) — never conflate the two.
  monthlyCredits: number;
  // Enforcement unit /api/generate and the Polar webhook actually check.
  // Derived from monthlyCredits assuming one ~300-credit (1hr) documentary,
  // matching the "N full-length documentaries a month" copy on the pricing
  // page. NOT a true per-credit spend yet — the generate route still counts
  // videos, not credits, so a short video still consumes a full unit of
  // this quota. Converting the gate to spend monthlyCredits directly is a
  // separate, larger change (touches the generate route, the webhook, mock
  // mode, and wherever a failed generation's refund-on-failure logic lives).
  videosPerMonth: number;
  popular?: boolean;
}

export const tiers: Tier[] = [
  {
    id: 'archive',
    name: 'Archive',
    monthlyPrice: 29,
    monthlyCredits: 300,
    videosPerMonth: 1,
  },
  {
    id: 'series',
    name: 'Series',
    monthlyPrice: 49,
    monthlyCredits: 660,
    videosPerMonth: 2,
  },
  {
    id: 'studio',
    name: 'Studio',
    monthlyPrice: 89,
    monthlyCredits: 1500,
    videosPerMonth: 5,
    popular: true,
  },
  {
    id: 'network',
    name: 'Network',
    monthlyPrice: 139,
    monthlyCredits: 2700,
    videosPerMonth: 9,
  },
  {
    id: 'syndicate',
    name: 'Syndicate',
    monthlyPrice: 259,
    monthlyCredits: 6000,
    videosPerMonth: 20,
  },
];

export function getTier(id: string): Tier | undefined {
  return tiers.find((t) => t.id === id);
}

// One product per tier — verified live against the Polar catalog (Starter/
// Plus/Creator/Studio/Pro, all $29/$49/$89/$139/$259/mo, all
// recurring_interval: month, no annual variant for any of them). The env
// var names predate this id rename and are already set in Vercel, so they
// stay as-is; only which internal id points at which one changed:
//   archive   (was 'starter') -> POLAR_PRODUCT_ID_STARTER
//   series    (new)           -> POLAR_PRODUCT_ID_PLUS
//   studio    (was 'creator') -> POLAR_PRODUCT_ID_CREATOR
//   network   (was 'studio')  -> POLAR_PRODUCT_ID_STUDIO
//   syndicate (new)           -> POLAR_PRODUCT_ID_PRO
export const polarProductIds: Record<Tier['id'], string> = {
  archive: process.env.POLAR_PRODUCT_ID_STARTER || 'polar_prod_archive_placeholder',
  series: process.env.POLAR_PRODUCT_ID_PLUS || 'polar_prod_series_placeholder',
  studio: process.env.POLAR_PRODUCT_ID_CREATOR || 'polar_prod_studio_placeholder',
  network: process.env.POLAR_PRODUCT_ID_STUDIO || 'polar_prod_network_placeholder',
  syndicate: process.env.POLAR_PRODUCT_ID_PRO || 'polar_prod_syndicate_placeholder',
};
