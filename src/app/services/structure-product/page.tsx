import ServicePageLayout, { ContentSection, FeatureList } from '@/components/layout/ServicePageLayout';
import { Briefcase } from 'lucide-react';

export default function StructureProductPage() {
  const types = [
    "Principal-protected notes (PPNs)",
    "Market-linked debentures (MLDs)",
    "Credit-linked notes (CLNs)",
    "Custom structured solutions",
  ];

  const benefits = [
    "Defined risk-reward scenarios",
    "Participation in upside, protection on downside",
    "Tax efficiency advantages",
    "Portfolio diversification beyond traditional assets",
  ];

  const faqItems = [
    {
      q: 'What are structured products?',
      a: 'Hybrid financial instruments combining fixed income and market-linked components.',
    },
    {
      q: 'Who should invest in them?',
      a: 'Ideal for HNIs or investors with specific goals and moderate risk tolerance.',
    },
  ];

  return (
    <ServicePageLayout 
      title="Structured Products"
      subtitle="Customized Portfolios. Controlled Risk."
      icon={Briefcase}
      iconBgColor="from-yellow-500 to-yellow-700"
      faqItems={faqItems}
    >
      <ContentSection title="🧱 Structured Products">
        <p>Structured products are sophisticated, tailor-made investment vehicles designed to meet specific financial objectives. They often combine features of debt and equity to offer customized risk-return profiles that are otherwise unavailable in the market.</p>
      </ContentSection>

      <ContentSection title="🗂️ Product Types We Offer:">
        <FeatureList items={types} />
      </ContentSection>
      
      <ContentSection title="📈 Key Benefits:">
        <FeatureList items={benefits} />
      </ContentSection>
      
      <p className="mt-6 font-semibold">Talk to us to see if a structured product fits your portfolio.</p>
    </ServicePageLayout>
  );
}
