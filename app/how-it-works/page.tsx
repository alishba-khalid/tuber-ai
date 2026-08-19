import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import HowItWorks from '@/components/HowItWorks';
import Features from '@/components/Features';
import CTABanner from '@/components/CTABanner';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'How It Works — TuberAI',
  description: 'Learn how TuberAI\'s 5-stage AI pipeline generates full-length YouTube videos from a single prompt.',
};

export default function HowItWorksPage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <div className="pt-24">
        <div className="text-center py-16 max-w-3xl mx-auto px-4">
          <div className="badge badge-purple inline-flex mb-4">
            <span>The Technology</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-[#060F12] mb-4">
            How <span className="gradient-text">TuberAI</span> works
          </h1>
          <p className="text-[#7FA0AB] text-lg">
            A 5-stage automated pipeline that takes you from idea to a fully produced,
            ready-to-publish YouTube video — without any manual work.
          </p>
        </div>
        <HowItWorks />
        <Features />
        <CTABanner />
        <Footer />
      </div>
    </main>
  );
}
