import ServicePageLayout, { ContentSection, FeatureList } from '@/components/layout/ServicePageLayout';
import { DollarSign } from 'lucide-react';

export default function FixedIncomePage() {
  const expertise = [
    "Government bonds: SGBs, T-Bills, RBI bonds",
    "Corporate NCDs: AAA/AA-rated debt with coupon visibility",
    "Tax-free bonds: Save tax on interest from select institutions",
    "Laddered bond portfolios: For long-term income strategy",
  ];

  const focus = [
    "Credit risk minimization",
    "Matching tenure with goals",
    "Liquidity profiling",
    "Secondary market bond access",
  ];

  const faqItems = [
    {
      q: 'Are NCDs safe?',
      a: 'We only recommend NCDs with strong credit ratings and repayment records.',
    },
    {
      q: 'What is the typical return on corporate bonds?',
      a: 'Returns range from 7%–10%, depending on tenure and rating.',
    },
  ];

  return (
    <ServicePageLayout 
      title="NCDs & Bonds (Fixed Income)"
      subtitle="Stability Meets Simplicity."
      icon={DollarSign}
      iconBgColor="from-green-500 to-green-700"
      faqItems={faqItems}
    >
      <ContentSection title="🟢 NCDs & Bonds (Fixed Income)">
        <p>Fixed income solutions like Non-Convertible Debentures (NCDs) and bonds offer a predictable income stream — without market swings. Ideal for income-seeking investors or portfolio stabilizers, these products ensure you earn while sleeping peacefully.</p>
      </ContentSection>

      <ContentSection title="🔒 Our Expertise Covers:">
        <FeatureList items={expertise} />
      </ContentSection>
      
      <ContentSection title="🎯 Our Focus:">
        <FeatureList items={focus} />
      </ContentSection>
      
      <p className="mt-6 font-semibold">🧾 Build your bond ladder. Schedule a consultation today.</p>
    </ServicePageLayout>
  );
}
