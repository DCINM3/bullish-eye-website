import ServicePageLayout, { ContentSection, FeatureList } from '@/components/layout/ServicePageLayout';
import { Calendar } from 'lucide-react';

export default function RetirementPlanPage() {
  const services = [
    "Retirement corpus goal mapping",
    "NPS account setup and Tier II strategies",
    "Pension products (annuity, deferred, hybrid)",
    "Post-retirement income structuring (SWPs, bond ladders)",
    "Inflation-adjusted spending models",
  ];

  const planning = [
    "Estimate future lifestyle expenses",
    "Adjust for inflation & longevity risk",
    "Select instruments across equity, debt & hybrid",
    "Create a withdrawal plan for 25+ years of retirement",
  ];

  const faqItems = [
    {
      q: 'When should I start planning for retirement?',
      a: 'The earlier the better—ideally in your 30s—to maximize compounding benefits.',
    },
    {
      q: 'Do you provide pension and annuity options?',
      a: 'Yes, including NPS, insurance-linked annuities, and post-retirement funds.',
    },
  ];

  return (
    <ServicePageLayout 
      title="Retirement Planning"
      subtitle="Live Your Second Innings with Confidence."
      icon={Calendar}
      iconBgColor="from-orange-500 to-orange-700"
      faqItems={faqItems}
    >
      <ContentSection title="🔵 Retirement Planning">
        <p>Retirement is not the end — it's your new beginning. We offer structured plans to help you accumulate and preserve wealth across three critical stages: accumulation, transition, and distribution.</p>
      </ContentSection>

      <ContentSection title="🧓 Services Include:">
        <FeatureList items={services} />
      </ContentSection>
      
      <ContentSection title="👣 Step-by-Step Planning:">
        <FeatureList items={planning} />
      </ContentSection>
      
      <p className="mt-6 font-semibold">📊 Want to retire early or stress-free? Talk to our advisors.</p>
    </ServicePageLayout>
  );
}
