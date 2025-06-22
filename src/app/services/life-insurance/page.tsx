import ServicePageLayout, { ContentSection, FeatureList } from '@/components/layout/ServicePageLayout';
import { Shield } from 'lucide-react';

export default function LifeInsurancePage() {
  const advisory = [
    "Term life insurance (pure cover)",
    "Health insurance & critical illness plans",
    "Accidental & disability coverage",
    "ULIPs & investment-linked insurance",
    "Group and family floater plans",
  ];

  const differently = [
    "Human-life value (HLV) based planning",
    "Side-by-side insurer comparison",
    "Claim ratio, solvency, IRDAI data analysis",
    "Annual policy reviews for evolving needs",
  ];

  return (    <ServicePageLayout 
      title="Insurance Planning"
      subtitle="Fortify Your Financial Foundation."
      icon={Shield}
      iconBgColor="from-indigo-500 to-indigo-700"
      serviceKey="life-insurance"
    >
      <ContentSection title="🔐 Insurance Planning">
        <p>Before you grow, you must first protect. Insurance is your safety net against life's financial uncertainties — illness, accidents, loss of life, and more. We help you strike the perfect balance between adequate protection and affordability.</p>
      </ContentSection>

      <ContentSection title="📌 Our Advisory Covers:">
        <FeatureList items={advisory} />
      </ContentSection>
      
      <ContentSection title="⚖️ What We Do Differently:">
        <FeatureList items={differently} />
      </ContentSection>
      
      <p className="mt-6 font-semibold">🛡️ Protect your dependents. Protect your goals.</p>
    </ServicePageLayout>
  );
} 