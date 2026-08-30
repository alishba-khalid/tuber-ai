import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Pricing from '@/components/Pricing';
import FAQ from '@/components/FAQ';
import CTABanner from '@/components/CTABanner';
import Footer from '@/components/Footer';

const title = 'Pricing — GenByGhost';
const description = 'Simple credit-based pricing. Start from $29/month. All plans include full AI video generation, voice, visuals, and YouTube metadata.';

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: '/pricing' },
  openGraph: {
    title,
    description,
    type: 'website',
    url: '/pricing',
    images: ['/opengraph-image.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: ['/opengraph-image.png'],
  },
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
        <div className="text-center pt-16 px-4">
          <h1 className="text-3xl sm:text-4xl font-bold font-serif-heading text-[#ECFDF5]">
            AI video generator pricing
          </h1>
          <p className="text-[#8FAAA6] text-lg mt-4 max-w-xl mx-auto">
            Simple, credit-based plans for GenByGhost&apos;s AI video generator — starting at $29/month.
          </p>
        </div>
        <Pricing />
        <FAQ />
        <CTABanner />
        <Footer />
      </div>
    </main>
  );
}
