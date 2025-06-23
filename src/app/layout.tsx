import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import MarketTicker from '@/components/market/MarketTicker';
import ErrorBoundary from '@/components/common/ErrorBoundary';
import FloatingContact from '@/components/common/FloatingContact';
import { Toaster } from 'react-hot-toast';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Bullish Eyes - Your Financial Partner',
  description: 'Empowering investors with knowledge and tools to achieve their financial goals. Your journey to financial freedom starts here.',
  keywords: 'stock market, investment, financial planning, IPO, portfolio management, India',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        
          <MarketTicker />
          <Navbar />
          <main className="min-h-screen">
            {children}
          </main>
          <Footer />
          <FloatingContact />
          <Toaster 
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: '#363636',
                color: '#fff',
              },
            }}
          />
      
      </body>
    </html>
  );
}
