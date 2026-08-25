import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Privacy Policy — GenByGhost',
  description: 'How GenByGhost collects, uses, and protects your data, including our use of cookies and third-party services.',
  alternates: { canonical: '/privacy' },
};

const sections = [
  {
    id: 'overview',
    heading: '1. Overview',
    body: `This Privacy Policy explains what information GenByGhost collects when you use our Service, how we use it, and the choices you have. By using the Service, you agree to the practices described here.`,
  },
  {
    id: 'information-we-collect',
    heading: '2. Information We Collect',
    body: `Account information: your email address, display name, and profile photo (if you sign in with Google), provided via Firebase Authentication. Usage data: the projects, scripts, and settings you create within the Service, stored in our database (Firebase/Firestore). Payment information: when you buy credits, our payment partner Polar processes your payment details directly — we never see or store your full card number.`,
  },
  {
    id: 'how-we-use-it',
    heading: '3. How We Use Information',
    body: `We use your information to operate your account, track and apply your credit balance, provide customer support, process payments, and improve the Service. We do not sell your personal information to third parties.`,
  },
  {
    id: 'cookies',
    heading: '4. Cookies & Tracking',
    body: `GenByGhost uses essential cookies and local storage to keep you signed in and remember your preferences. We do not currently use third-party advertising trackers. If that changes, we'll update this section and, where required, ask for your consent.`,
  },
  {
    id: 'third-parties',
    heading: '5. Third-Party Service Providers',
    body: `We rely on trusted providers to run the Service: Google / Firebase (authentication and database hosting), Polar (payment processing), and hosting/CDN infrastructure. Each of these providers has its own privacy practices governing the data they process on our behalf.`,
  },
  {
    id: 'retention',
    heading: '6. Data Retention',
    body: `We retain your account data for as long as your account is active. If you delete your account, we'll delete or anonymize your personal data within a reasonable period, except where we're required to retain records (for example, transaction history for tax or legal purposes).`,
  },
  {
    id: 'security',
    heading: '7. Data Security',
    body: `We use industry-standard practices to protect your data, including access-controlled databases and encrypted connections. No system is perfectly secure, but we take reasonable steps to safeguard your information.`,
  },
  {
    id: 'your-rights',
    heading: '8. Your Rights',
    body: `You can access, correct, or delete your account information at any time from your dashboard settings, or by contacting us at support@genbyghost.com to request a full account deletion.`,
  },
  {
    id: 'children',
    heading: '9. Children’s Privacy',
    body: `GenByGhost is not directed at children under 13, and we do not knowingly collect personal information from them. If you believe a child has provided us with personal data, contact us and we'll remove it.`,
  },
  {
    id: 'changes',
    heading: '10. Changes to This Policy',
    body: `We may update this Privacy Policy as the Service evolves. We'll update the "last updated" date below when we do.`,
  },
  {
    id: 'contact',
    heading: '11. Contact',
    body: `Questions about this Privacy Policy? Reach us at support@genbyghost.com.`,
  },
];

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.genbyghost.com/' },
    { '@type': 'ListItem', position: 2, name: 'Privacy Policy', item: 'https://www.genbyghost.com/privacy' },
  ],
};

export default function PrivacyPage() {
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
            Privacy Policy
          </h1>
          <p className="text-xs text-[#527E72] font-mono-label mb-12">Last updated: August 23, 2026</p>

          <div className="space-y-8">
            {sections.map((s) => (
              <section key={s.id} id={s.id} className="scroll-mt-24">
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
