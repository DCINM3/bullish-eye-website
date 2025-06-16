import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Investment Blog - Bullish Eyes | Financial Insights & Market Analysis',
  description: 'Read expert insights on stock market, IPO investments, portfolio management, tax planning, and financial strategies. Stay updated with latest market trends.',
  keywords: 'investment blog, stock market insights, financial planning, IPO analysis, portfolio management, tax saving, market trends',
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
