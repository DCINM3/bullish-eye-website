import ServicePageLayout, { ContentSection, FeatureList } from '@/components/layout/ServicePageLayout';
import { TrendingUp } from 'lucide-react';

export default function IpoInvestingPage() {
  const ourEdge = [
    "SME & Mainboard IPO Analysis: We cover the full spectrum of public offerings.",
    "Application Strategy: Guidance on bidding price, HNI/retail category, and maximizing allotment probability.",
    "Pre-IPO Research: Deep dives into company financials, DRHP analysis, and valuation metrics.",
    "Post-Listing View: Hold, sell, or accumulate? We provide data-backed recommendations.",
  ];

  const process = [
    "IPO calendar access and alerts",
    "One-on-one consultation on specific IPOs",
    "Application support via UPI/ASBA",
    "Portfolio integration of newly listed shares",
  ];

  const faqItems = [
    {
      q: 'How do I increase chances of IPO allotment?',
      a: 'We guide you on optimal bidding strategies and category placement.',
    },
    {
      q: 'Can I apply via your platform?',
      a: 'Yes, we assist in application through supported brokers and UPI.',
    },
  ];

  return (    <ServicePageLayout 
      title="IPO Investing"
      subtitle="Invest Early. Profit Early."
      icon={TrendingUp}
      iconBgColor="from-red-500 to-red-700"
      faqItems={faqItems}
      serviceKey="ipo-investing"
    >
      <ContentSection title="🚀 IPO Investing">
        <p>Initial Public Offerings (IPOs) are your first chance to own a piece of a company. While exciting, they require careful analysis to distinguish high-potential gems from overhyped stories. We help you invest in listings that are backed by strong fundamentals and fair valuations.</p>
      </ContentSection>

      <ContentSection title="🎯 Our Edge:">
        <FeatureList items={ourEdge} />
      </ContentSection>
      
      <ContentSection title="➡️ Our Process:">
        <FeatureList items={process} />
      </ContentSection>
      
      <p className="mt-6 font-semibold">Ready for the next big IPO? Get our expert analysis.</p>
    </ServicePageLayout>
  );
} 