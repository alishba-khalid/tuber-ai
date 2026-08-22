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

export default function Home() {
  return (
    <main className="min-h-screen">
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
