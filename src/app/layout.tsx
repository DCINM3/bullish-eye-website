import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ServicesTicker from '@/components/layout/ServicesTicker';
import ErrorBoundary from '@/components/common/ErrorBoundary';
import FloatingContact from '@/components/common/FloatingContact';
import ToasterProvider from '@/components/providers/ToastProvider';

const inter = Inter({ subsets: ['latin'] });

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.bullisheyes.com';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: 'Bullish Eyes - Your Financial Partner',
  description: 'Empowering investors with knowledge and tools to achieve their financial goals. Your journey to financial freedom starts here.',
  keywords: 'stock market, investment, financial planning, IPO, portfolio management, India',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    siteName: 'Bullish Eyes',
    title: 'Bullish Eyes - Your Financial Partner',
    description: 'Empowering investors with knowledge and tools to achieve their financial goals.',
    images: [
      {
        url: `${siteUrl}/logo.png`,
        width: 1200,
        height: 630,
        alt: 'Bullish Eyes',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Bullish Eyes - Your Financial Partner',
    description: 'Empowering investors with knowledge and tools to achieve their financial goals.',
    images: [`${siteUrl}/logo.png`],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ErrorBoundary>
          <ServicesTicker />
          <Navbar />
          <main className="min-h-screen">
            {children}
          </main>
          <Footer />
          <FloatingContact />
          <ToasterProvider />
          </ErrorBoundary>
      </body>
    </html>
  );
}
