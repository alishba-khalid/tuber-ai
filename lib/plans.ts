export interface Plan {
  id: string;
  name: string;
  price: number;
  credits: number;
  desc: string;
  popular?: boolean;
}

export const plans: Plan[] = [
  { id: 'starter', name: 'Archive', price: 29, credits: 300, desc: '1 documentary hour' },
  { id: 'plus', name: 'Series', price: 49, credits: 660, desc: '2 documentary hours' },
  { id: 'creator', name: 'Studio', price: 89, credits: 1500, desc: '5 documentary hours', popular: true },
  { id: 'studio', name: 'Network', price: 139, credits: 2700, desc: '9 documentary hours' },
  { id: 'pro', name: 'Syndicate', price: 259, credits: 6000, desc: '20 documentary hours' },
];

export function getPlan(id: string): Plan | undefined {
  return plans.find((p) => p.id === id);
}
