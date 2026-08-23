export interface Plan {
  id: string;
  name: string;
  price: number;
  credits: number;
  desc: string;
  popular?: boolean;
}

export const plans: Plan[] = [
  { id: 'starter', name: 'Starter', price: 29, credits: 300, desc: '1 hour video' },
  { id: 'plus', name: 'Plus', price: 49, credits: 660, desc: '2 hours video' },
  { id: 'creator', name: 'Creator', price: 89, credits: 1500, desc: '5 hours video', popular: true },
  { id: 'studio', name: 'Studio', price: 139, credits: 2700, desc: '9 hours video' },
  { id: 'pro', name: 'Pro', price: 259, credits: 6000, desc: '20 hours video' },
];

export function getPlan(id: string): Plan | undefined {
  return plans.find((p) => p.id === id);
}
