import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Showcase from '@/components/Showcase';
import About from '@/components/About';
import HowItWorks from '@/components/HowItWorks';
import AIWorkingVisual from '@/components/AIWorkingVisual';
import Features from '@/components/Features';
import UseCases from '@/components/UseCases';
import Comparison from '@/components/Comparison';
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
    '@type': 'Offer',
    price: '29',
    priceCurrency: 'USD',
    description: 'Plans start at $29/month with monthly generation credits included.',
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
      <Showcase />
      <About />
      <HowItWorks />
      <AIWorkingVisual />
      <Features />
      <UseCases />
      <Comparison />
      <Pricing />
      <FAQ />
      <CTABanner />
      <Footer />
    </main>
  );
}
