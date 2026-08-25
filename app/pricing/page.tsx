import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Pricing from '@/components/Pricing';
import FAQ from '@/components/FAQ';
import CTABanner from '@/components/CTABanner';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Pricing — GenByGhost',
  description: 'Simple credit-based pricing. Start from $29/month. All plans include full AI video generation, voice, visuals, and YouTube metadata.',
  alternates: { canonical: '/pricing' },
};

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.genbyghost.com/' },
    { '@type': 'ListItem', position: 2, name: 'Pricing', item: 'https://www.genbyghost.com/pricing' },
  ],
};

export default function PricingPage() {
  return (
    <main className="min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
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
