import ServicePageLayout, { ContentSection, FeatureList } from '@/components/layout/ServicePageLayout';
import { Layers } from 'lucide-react';

export default function UnlistedSharesPage() {
  const access = [
    "Companies like NSDL, Reliance Retail, Capgemini, HDB Financial, PharmEasy",
    "Entry timing strategy before listing",
    "Expert valuation & financial analysis",
    "Lock-in terms, documentation, and demat process",
  ];

  const why = [
    "Diversification beyond listed markets",
    "Pre-IPO value unlocking",
    "Higher long-term compounding potential",
    "Hedge against public market volatility",
  ];

  const faqItems = [
    {
      q: 'How do I invest in unlisted companies?',
      a: 'We offer curated unlisted stock opportunities with full research reports.',
    },
    {
      q: 'Is there a lock-in period?',
      a: 'Yes, most unlisted shares have 6–12 month lock-in before listing.',
    },
  ];

  return (
    <ServicePageLayout 
      title="Unlisted Shares"
      subtitle="Access Tomorrow's Leaders — Today."
      icon={Layers}
      iconBgColor="from-purple-500 to-purple-700"
      faqItems={faqItems}
    >
      <ContentSection title="🟣 Unlisted Shares">
        <p>Our exclusive unlisted equity platform brings you investment opportunities in high-potential private companies — including startups and mature pre-IPO players. These are often closed to retail and offer significant alpha potential.</p>
      </ContentSection>

      <ContentSection title="💼 What You Access:">
        <FeatureList items={access} />
      </ContentSection>
      
      <ContentSection title="💹 Why It Matters:">
        <FeatureList items={why} />
      </ContentSection>
      
      <p className="mt-6 font-semibold">📩 Interested in exclusive deals? Contact us for current offerings.</p>
    </ServicePageLayout>
  );
}
