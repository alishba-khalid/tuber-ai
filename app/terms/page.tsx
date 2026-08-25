import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Terms of Service — GenByGhost',
  description: 'The terms that govern your use of GenByGhost, our AI-powered YouTube video generation platform.',
  alternates: { canonical: '/terms' },
};

const sections = [
  {
    heading: '1. Acceptance of Terms',
    body: `By creating an account or using GenByGhost ("the Service"), you agree to be bound by these Terms of Service. If you do not agree, do not use the Service. We may update these Terms from time to time; continued use after changes take effect means you accept the revised Terms.`,
  },
  {
    heading: '2. Description of the Service',
    body: `GenByGhost is an early-access platform for generating long-form YouTube video content — scripts, voice narration, visuals, and publishing tools — from a single topic prompt. Because we are in an early access period, features, output quality, processing times, and availability may change without notice as we continue to develop the Service. We'll do our best to communicate meaningful changes.`,
  },
  {
    heading: '3. Accounts',
    body: `You must provide accurate information when creating an account and are responsible for maintaining the confidentiality of your login credentials. You're responsible for all activity that occurs under your account. Notify us immediately if you suspect unauthorized use of your account.`,
  },
  {
    heading: '4. Credits, Billing & Refunds',
    body: `GenByGhost operates on a pay-as-you-go credit model — there is no free trial and no recurring subscription; you purchase credit packs as needed, and credits are consumed as you use generation features. Payments are processed by our third-party payment partner, Polar; we do not store your full payment card details. Because we're validating this product during an early access period, refund requests are reviewed case by case — contact us at support@genbyghost.com and we'll work with you.`,
  },
  {
    heading: '5. Acceptable Use',
    body: `You agree not to use the Service to generate content that is illegal, infringing, defamatory, harassing, or that violates YouTube's or any third party's terms of service. We reserve the right to suspend or terminate accounts that misuse the Service.`,
  },
  {
    heading: '6. Intellectual Property',
    body: `You retain ownership of the video, script, and audio content you generate using the Service, subject to your compliance with these Terms. GenByGhost retains all rights to the platform itself — its software, branding, and underlying technology.`,
  },
  {
    heading: '7. Third-Party Services',
    body: `The Service relies on third-party providers — including Google/Firebase for authentication and data storage, and Polar for payment processing — whose own terms and privacy practices also apply to your use of those specific features.`,
  },
  {
    heading: '8. Disclaimers & Limitation of Liability',
    body: `The Service is provided "as is" and "as available," without warranties of any kind, express or implied. To the maximum extent permitted by law, GenByGhost is not liable for any indirect, incidental, or consequential damages arising from your use of the Service, including any impact on YouTube channel performance, monetization, or platform standing.`,
  },
  {
    heading: '9. Termination',
    body: `You may stop using the Service and delete your account at any time by contacting us. We may suspend or terminate accounts that violate these Terms. Unused credits on a terminated account are handled per our refund policy above.`,
  },
  {
    heading: '10. Changes to These Terms',
    body: `We may revise these Terms as the Service evolves. We'll update the "last updated" date below when we do; material changes will be communicated where reasonably possible.`,
  },
  {
    heading: '11. Governing Law',
    body: `These Terms are governed by the laws of the jurisdiction in which GenByGhost operates, without regard to conflict-of-law principles. [Company: specify your governing jurisdiction here.]`,
  },
  {
    heading: '12. Contact',
    body: `Questions about these Terms? Reach us at support@genbyghost.com.`,
  },
];

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.genbyghost.com/' },
    { '@type': 'ListItem', position: 2, name: 'Terms of Service', item: 'https://www.genbyghost.com/terms' },
  ],
};

export default function TermsPage() {
  return (
    <main className="min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <Navbar />
      <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl sm:text-4xl font-bold font-serif-heading text-[#ECFDF5] mb-2">
            Terms of Service
          </h1>
          <p className="text-xs text-[#527E72] font-mono-label mb-12">Last updated: August 23, 2026</p>

          <div className="space-y-8">
            {sections.map((s) => (
              <section key={s.heading}>
                <h2 className="text-lg font-bold text-[#ECFDF5] mb-2">{s.heading}</h2>
                <p className="text-sm text-[#8FAAA6] leading-relaxed">{s.body}</p>
              </section>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
