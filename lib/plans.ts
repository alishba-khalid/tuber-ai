export interface Tier {
  id: 'starter' | 'creator' | 'studio';
  name: string;
  monthlyPrice: number;
  annualPrice: number; // total per year ("2 months free" vs. monthly x12)
  videosPerMonth: number;
  maxVideoLength: string;
  resolution: string;
  voiceTier: string;
  features: string[];
  popular?: boolean;
}

export const tiers: Tier[] = [
  {
    id: 'starter',
    name: 'Starter',
    monthlyPrice: 29,
    annualPrice: 290,
    videosPerMonth: 3,
    maxVideoLength: 'Up to 30 min each',
    resolution: '1080p',
    voiceTier: 'Standard voices',
    features: [],
  },
  {
    id: 'creator',
    name: 'Creator',
    monthlyPrice: 79,
    annualPrice: 790,
    videosPerMonth: 12,
    maxVideoLength: 'Up to 3 hours each',
    resolution: '1080p',
    voiceTier: 'Premium voices',
    features: ['YouTube auto-publish'],
    popular: true,
  },
  {
    id: 'studio',
    name: 'Studio',
    monthlyPrice: 199,
    annualPrice: 1990,
    videosPerMonth: 40,
    maxVideoLength: 'Up to 10 hours each',
    resolution: '4K',
    voiceTier: 'Voice cloning',
    features: ['Priority render queue', 'API access'],
  },
];

export function getTier(id: string): Tier | undefined {
  return tiers.find((t) => t.id === id);
}

export const polarProductIds: Record<string, { monthly: string; annual: string }> = {
  starter: {
    monthly: process.env.POLAR_PRODUCT_ID_STARTER_MONTHLY || 'polar_prod_starter_monthly_placeholder',
    annual: process.env.POLAR_PRODUCT_ID_STARTER_ANNUAL || 'polar_prod_starter_annual_placeholder',
  },
  creator: {
    monthly: process.env.POLAR_PRODUCT_ID_CREATOR_MONTHLY || 'polar_prod_creator_monthly_placeholder',
    annual: process.env.POLAR_PRODUCT_ID_CREATOR_ANNUAL || 'polar_prod_creator_annual_placeholder',
  },
  studio: {
    monthly: process.env.POLAR_PRODUCT_ID_STUDIO_MONTHLY || 'polar_prod_studio_monthly_placeholder',
    annual: process.env.POLAR_PRODUCT_ID_STUDIO_ANNUAL || 'polar_prod_studio_annual_placeholder',
  },
};
