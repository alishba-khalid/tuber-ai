import type { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ArrowRight, BookOpen, Layers, Printer, TrendingUp, HelpCircle } from 'lucide-react';

const title = 'Turn a YouTube Video Script Into an Illustrated Book — GenByGhost';
const description = 'Turn any GenByGhost video script into a print-ready illustrated book. Automatic chapter typesetting, scene art placement, PDF and EPUB export for Amazon KDP and Gumroad.';

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: '/ai-book-generator' },
  openGraph: {
    title,
    description,
    type: 'website',
    url: '/ai-book-generator',
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
    { '@type': 'ListItem', position: 2, name: 'AI Book Generator', item: 'https://www.genbyghost.com/ai-book-generator' },
  ],
};

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What formats does the book generator export?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'GenByGhost exports in both print-ready PDF (ideal for physical paperback publishing on Amazon KDP) and standard EPUB formats (designed for digital e-book distribution on Amazon Kindle, Gumroad, and Google Play Books).',
      },
    },
    {
      '@type': 'Question',
      name: 'How are illustrations and scene art handled in the book?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The AI book generator automatically places high-resolution cinematic frames and stills at natural breaks in your narrative, such as the start of a chapter or transition between sections, replicating the visual flow of your video.',
      },
    },
    {
      '@type': 'Question',
      name: 'Are there any royalties or fees on my book sales?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No. You own 100% of the files you generate and export. Any profits you earn from selling your books on Amazon KDP, Gumroad, or other platforms belong entirely to you. GenByGhost never takes royalties.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I edit the book layout or text before exporting?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes! Before clicking export, you can modify chapter headings, rewrite sections of the text, adjust image placements, and tweak the layout parameters to make sure the book fits your exact creative vision.',
      },
    },
    {
      '@type': 'Question',
      name: 'What sizes are the exported PDFs optimized for?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Our PDF layouts are pre-formatted to standard trade publishing sizes (such as 6" x 9" and 5.5" x 8.5"), which are fully supported by Amazon KDP, IngramSpark, and other print-on-demand services, ensuring seamless upload without bleed errors.',
      },
    },
  ],
};

const faqs = [
  {
    q: 'What formats does the book generator export?',
    a: 'GenByGhost exports in both print-ready PDF (ideal for physical paperback publishing on Amazon KDP) and standard EPUB formats (designed for digital e-book distribution on Amazon Kindle, Gumroad, and Google Play Books).',
  },
  {
    q: 'How are illustrations and scene art handled in the book?',
    a: 'The AI book generator automatically places high-resolution cinematic frames and stills at natural breaks in your narrative, such as the start of a chapter or transition between sections, replicating the visual flow of your video.',
  },
  {
    q: 'Are there any royalties or fees on my book sales?',
    a: 'No. You own 100% of the files you generate and export. Any profits you earn from selling your books on Amazon KDP, Gumroad, or other platforms belong entirely to you. GenByGhost never takes royalties.',
  },
  {
    q: 'Can I edit the book layout or text before exporting?',
    a: 'Yes! Before clicking export, you can modify chapter headings, rewrite sections of the text, adjust image placements, and tweak the layout parameters to make sure the book fits your exact creative vision.',
  },
  {
    q: 'What sizes are the exported PDFs optimized for?',
    a: 'Our PDF layouts are pre-formatted to standard trade publishing sizes (such as 6" x 9" and 5.5" x 8.5"), which are fully supported by Amazon KDP, IngramSpark, and other print-on-demand services, ensuring seamless upload without bleed errors.',
  },
];

export default function AIBookGeneratorPage() {
  return (
    <main className="min-h-screen bg-[#050B0A] text-slate-100 relative overflow-hidden">
      {/* Background radial highlight */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#C5B49F]/5 rounded-full blur-[130px] pointer-events-none -z-10" />

      {/* JSON-LD Schemas */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <div className="text-center py-12 max-w-3xl mx-auto">
          <div className="badge-indigo inline-flex mb-4">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Dual-Channel Publishing</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold font-serif-heading text-[#ECFDF5] mb-6 leading-tight">
            Turn Your Video Script Into an Illustrated Book
          </h1>
          <p className="text-[#8FAAA6] text-lg mb-8 leading-relaxed">
            Turn any long-form video script into a professionally formatted, illustrated e-book and print-ready PDF in one click. Diversify your revenue across video views and digital shelves.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/auth/signup" className="btn-indigo-pill text-sm px-8 py-3.5 inline-flex items-center gap-2">
              Start creating
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/pricing" className="text-sm font-semibold text-[#8FAAA6] hover:text-[#ECFDF5] transition-colors">
              View credit pricing
            </Link>
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto border-t border-[#122823]">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold font-serif-heading text-[#ECFDF5]">
            How the Book Generator Works
          </h2>
          <p className="text-sm text-[#8FAAA6] mt-2">
            Convert digital narration into structured print formats through our automated book pipeline.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            {
              step: '01',
              title: 'Script Ingestion',
              desc: 'Import your long-form video script or generate a brand new narrative within our editor.',
              icon: <Layers className="w-5 h-5 text-[#C5B49F]" />,
            },
            {
              step: '02',
              title: 'Auto-Typesetting',
              desc: 'GenByGhost parses the script to format clean chapter headers, spacing, and page splits.',
              icon: <BookOpen className="w-5 h-5 text-[#C5B49F]" />,
            },
            {
              step: '03',
              title: 'Art Placement',
              desc: 'Visual scene frames are automatically placed at chapter intros and narrative breaks.',
              icon: <Printer className="w-5 h-5 text-[#C5B49F]" />,
            },
            {
              step: '04',
              title: 'PDF & EPUB Export',
              desc: 'Export KDP-ready PDFs and standard EPUB files optimized for print and e-readers.',
              icon: <ArrowRight className="w-5 h-5 text-[#C5B49F]" />,
            },
          ].map((w, idx) => (
            <div key={idx} className="bg-[#0A1412] border border-[#122823] rounded-2xl p-6 relative">
              <span className="absolute top-4 right-4 text-3xl font-mono-label font-bold text-[#122823]/50">
                {w.step}
              </span>
              <div className="w-10 h-10 rounded-lg bg-[#C5B49F]/10 flex items-center justify-center mb-4">
                {w.icon}
              </div>
              <h3 className="text-base font-bold font-serif-heading text-[#ECFDF5] mb-2">
                {w.title}
              </h3>
              <p className="text-xs text-[#8FAAA6] leading-relaxed">
                {w.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Dual Revenue Angle Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto border-t border-[#122823] bg-[#0A1412]/30 rounded-3xl">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center p-6">
          <div className="md:col-span-7 space-y-4">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-950/40 border border-emerald-800/40 text-[#C5B49F] text-[10px] font-mono-label font-bold uppercase tracking-wider">
              <TrendingUp className="w-3 h-3" /> Double Your Revenue Channel
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold font-serif-heading text-[#ECFDF5]">
              One Prompt. Two Publishing Channels.
            </h2>
            <p className="text-sm text-[#8FAAA6] leading-relaxed">
              Why settle for video ad revenue alone? With GenByGhost, you create a dual asset. While your 10-hour documentary gathers views and AdSense royalties on YouTube, your illustrated book format earns sales on Amazon KDP, Apple Books, and Gumroad. Build a self-sustaining media brand with a single core effort.
            </p>
          </div>
          <div className="md:col-span-5 grid grid-cols-1 gap-4">
            <div className="bg-[#0A1412] border border-[#122823] p-5 rounded-2xl">
              <h4 className="text-sm font-bold text-[#ECFDF5] mb-1">YouTube AdSense</h4>
              <p className="text-xs text-[#8FAAA6]">
                Earn recurring monthly ad revenue from highly engaging, long-form documentary views.
              </p>
            </div>
            <div className="bg-[#0A1412] border border-[#122823] p-5 rounded-2xl">
              <h4 className="text-sm font-bold text-[#ECFDF5] mb-1">Book Royalties</h4>
              <p className="text-xs text-[#8FAAA6]">
                Sell physical paperbacks on Amazon KDP and digital downloads on Gumroad with 100% royalty keep.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Guide Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto border-t border-[#122823]">
        <h2 className="text-2xl sm:text-3xl font-bold font-serif-heading text-[#ECFDF5] mb-6">
          Formatting Video Scripts into Print-Ready Books
        </h2>
        <div className="text-sm text-[#8FAAA6] space-y-6 leading-relaxed">
          <p>
            Turning a multi-hour video script into a readable, high-converting illustrated book requires more than a simple copy-paste. Because video narration relies heavily on voice inflections and visual cues, written text needs to stand on its own. Here is how to structure, format, and package your AI video scripts for professional publication on Amazon KDP and Gumroad.
          </p>
          <p>
            First, address <strong>pacing and structure</strong>. YouTube videos are paced for high viewer retention, often utilizing fast hook sequences and short, punchy paragraphs. In print, these can look fragmented. When exporting your script, combine conversational transitions and group related points into cohesive paragraphs. Use the auto-typesetting tool to map the narrative flow directly into distinct chapters, ensuring each major section of your video becomes a logical division in your book.
          </p>
          <p>
            Second, optimize your <strong>illustration density</strong>. On YouTube, a new visual frame appears every few seconds. In a printed book, too many illustrations inflate print costs and disrupt the reading flow. The ideal density is one high-resolution illustration per chapter or subsection (roughly every 500 to 1,000 words). GenByGhost allows you to select key cinematic frames from your video project and place them as beautiful, full-page or inline illustrations. Make sure your images are set to 300 DPI for crisp physical printing.
          </p>
          <p>
            Third, plan your <strong>book layout and sizes</strong>. For print-on-demand services like Amazon KDP, standard trade formats like 6" x 9" or 5.5" x 8.5" are the industry standards. Ensure you set adequate margins and gutter sizes so your text doesn't get cut off in the binding. GenByGhost's PDF exporter handles this automatically, creating a KDP-compliant print layout with the correct bleed parameters.
          </p>
          <p>
            Finally, write a <strong>compelling introduction and conclusion</strong>. Video scripts often jump straight into the hook. A book benefits from a dedicated introduction that outlines what the reader will learn, and a conclusion that redirects them back to your YouTube channel or other digital products. By bridging the gap between video and print, you create a premium product that viewers are excited to purchase.
          </p>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto border-t border-[#122823]">
        <div className="text-center mb-12">
          <div className="badge-indigo inline-flex mb-4">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>FAQ</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold font-serif-heading text-[#ECFDF5] mb-2">
            Frequently Asked Questions
          </h2>
          <p className="text-sm text-[#8FAAA6]">
            Everything you need to know about exporting books and publishing.
          </p>
        </div>

        <div className="space-y-4 max-w-3xl mx-auto">
          {faqs.map((faq, idx) => (
            <div key={idx} className="bg-[#0A1412] border border-[#122823] rounded-2xl p-6">
              <h4 className="font-serif-heading font-bold text-base text-[#ECFDF5] mb-2">
                {faq.q}
              </h4>
              <p className="text-sm text-[#8FAAA6] leading-relaxed">
                {faq.a}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Internal Navigation Links Hub */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto border-t border-[#122823]">
        <div className="bg-[#0A1412] border border-[#122823] p-8 rounded-2xl text-center">
          <h3 className="text-base font-bold font-serif-heading text-[#ECFDF5] mb-4">
            Explore More GenByGhost Features
          </h3>
          <div className="flex flex-wrap justify-center gap-6 text-sm">
            <Link href="/" className="text-[#C5B49F] hover:text-[#ECFDF5] transition-colors">
              Homepage
            </Link>
            <Link href="/pricing" className="text-[#C5B49F] hover:text-[#ECFDF5] transition-colors">
              Pricing Plans
            </Link>
            <Link href="/how-it-works" className="text-[#C5B49F] hover:text-[#ECFDF5] transition-colors">
              How It Works
            </Link>
            <Link href="/comparisons" className="text-[#C5B49F] hover:text-[#ECFDF5] transition-colors">
              Competitor Comparisons
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
