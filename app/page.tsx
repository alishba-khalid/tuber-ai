import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import HowItWorks from '@/components/HowItWorks';
import Showcase from '@/components/Showcase';
import About from '@/components/About';
import Features from '@/components/Features';
import UseCases from '@/components/UseCases';
import Comparison from '@/components/Comparison';
import EbookSection from '@/components/EbookSection';
import Pricing from '@/components/Pricing';
import FAQ from '@/components/FAQ';
import CTABanner from '@/components/CTABanner';
import Footer from '@/components/Footer';

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'GenByGhost',
  url: 'https://www.genbyghost.com',
  logo: 'https://www.genbyghost.com/icon',
};

const softwareApplicationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'GenByGhost',
  applicationCategory: 'MultimediaApplication',
  operatingSystem: 'Web',
  description: 'AI documentary and faceless YouTube channel generator that scripts, narrates, renders, and publishes long-form videos up to 10 hours.',
  offers: {
    '@type': 'AggregateOffer',
    priceCurrency: 'USD',
    lowPrice: '29.00',
    highPrice: '259.00',
    offerCount: '5',
    offers: [
      {
        '@type': 'Offer',
        name: 'Archive Plan',
        price: '29.00',
        priceCurrency: 'USD',
        url: 'https://www.genbyghost.com/pricing',
      },
      {
        '@type': 'Offer',
        name: 'Series Plan',
        price: '49.00',
        priceCurrency: 'USD',
        url: 'https://www.genbyghost.com/pricing',
      },
      {
        '@type': 'Offer',
        name: 'Studio Plan',
        price: '89.00',
        priceCurrency: 'USD',
        url: 'https://www.genbyghost.com/pricing',
      },
      {
        '@type': 'Offer',
        name: 'Network Plan',
        price: '139.00',
        priceCurrency: 'USD',
        url: 'https://www.genbyghost.com/pricing',
      },
      {
        '@type': 'Offer',
        name: 'Syndicate Plan',
        price: '259.00',
        priceCurrency: 'USD',
        url: 'https://www.genbyghost.com/pricing',
      },
    ],
  },
};

export default function Home() {
  return (
    <main className="min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareApplicationJsonLd) }}
      />
      <Navbar />
      <Hero />
      <HowItWorks />
      <Showcase />
      <About />
      <Features />
      <UseCases />
      <Comparison />
      <EbookSection />
      <Pricing />
      <FAQ />
      <CTABanner />
      <Footer />
    </main>
  );
}
