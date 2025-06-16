import HeroSection from '@/components/sections/HeroSection';
import MarketStats from '@/components/market/MarketStats';
import ServicesSection from '@/components/sections/ServicesSection';
import MissionVisionSection from '@/components/sections/MissionVisionSection';
import TestimonialsSection from '@/components/sections/TestimonialsSection';
import BlogSection from '@/components/sections/BlogSection';
import Link from 'next/link';

export default function Home() {
  return (
    <main>
      <HeroSection />
      <BlogSection />
      {/* Market Stats */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900">Live Market Data</h2>
            <p className="text-gray-600">Real-time updates from Indian stock markets</p>
          </div>
          <MarketStats />
        </div>
      </section>

      <ServicesSection />
      <MissionVisionSection />
      <TestimonialsSection />
      
      
      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Start Your Investment Journey?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of satisfied investors who trust Bullish Eyes for their financial growth.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <button className="bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-colors duration-300">
                Get Started Now
              </button>
            </Link>
            <Link href="/contact">
              <button className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-blue-600 transition-all duration-300">
                Schedule Consultation
              </button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
