import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us - Bullish Eyes | Get in Touch',
  description: 'Contact Bullish Eyes for stock broking, IPO investments, portfolio management, and life insurance services. Email: contact@bullisheyes.com | Phone: +91 98765 43210',
  keywords: 'contact bullish eyes, financial services contact, stock broker contact, investment consultation',
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
