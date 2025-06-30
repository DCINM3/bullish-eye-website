import ServicePageLayout, { ContentSection, FeatureList } from '@/components/layout/ServicePageLayout';
import { PieChart } from 'lucide-react';

export default function MutualFundsPage() {
  const features = [
    "Goal-based fund selection: Retirement, child education, home buying, travel, and more.",
    "SIP & lump sum planning: Structured investments with optimized timing and frequency.",
    "ELSS tax planning: Save up to ₹1.5 lakh under Section 80C with market-linked potential.",
    "Portfolio reviews: Quarterly reviews with buy/hold/switch insights.",
    "Risk-aligned allocation: Conservative, balanced, or aggressive — customized to you."
  ];

  const whyUs = [
    "Data-backed recommendations",
    "Zero commission bias",
    "AMC-agnostic approach",
    "Real-time fund performance tracking"
  ];

  const faqItems = [
    {
      q: 'Can I start SIPs online?',
      a: 'Yes, we offer 100% digital onboarding with automated SIP setups.',
    },
    {
      q: 'Is ELSS better than other tax-saving options?',
      a: 'ELSS offers market-linked returns and the shortest lock-in among 80C options.',
    },
  ];

  return (    <ServicePageLayout 
      title="Mutual Fund Services"
      subtitle="Smart Diversification. Reliable Growth."
      icon={PieChart}
      iconBgColor="from-blue-500 to-blue-700"
      faqItems={faqItems}
      serviceKey="mutual-funds"
    >
      <ContentSection title="🟡 Mutual Fund Services">
        <p>Mutual funds are the cornerstone of long-term wealth creation — offering access to professionally managed, diversified portfolios across equity, debt, and hybrid instruments. At Bullish Eyes, we don't just recommend funds — we architect your portfolio to reflect your aspirations.</p>
      </ContentSection>

      <ContentSection title="💼 What We Offer:">
        <FeatureList items={features} />
      </ContentSection>
      
      <ContentSection title="💬 Why Choose Us?">
        <FeatureList items={whyUs} />
      </ContentSection>
      
      <p className="mt-6 font-semibold">📞 Book a free mutual fund audit to get started.</p>
    </ServicePageLayout>
  );
}
