import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Pricing from '@/components/Pricing';
import FAQ from '@/components/FAQ';
import CTABanner from '@/components/CTABanner';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Pricing — GenByGhost',
  description: 'Simple credit-based pricing. Start from $20/month. All plans include full AI video generation, voice, visuals, and YouTube metadata.',
};

export default function PricingPage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <div className="pt-24">
        <Pricing />
        <FAQ />
        <CTABanner />
        <Footer />
      </div>
    </main>
  );
}
