'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { 
  TrendingUp, 
  Shield, 
  Target, 
  Users, 
  ArrowRight,
  Play,
  CheckCircle
} from 'lucide-react';

export default function HeroSection() {
  const [currentStat, setCurrentStat] = useState(0);
  
  const stats = [
    { label: 'Active Investors', value: '10,000+', icon: Users },
    { label: 'Portfolio Value', value: '₹500Cr+', icon: TrendingUp },
    { label: 'Success Rate', value: '95%', icon: Target },
    { label: 'Years Experience', value: '15+', icon: Shield },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStat((prev) => (prev + 1) % stats.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 min-h-screen flex items-center top-[-50px]">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl animate-pulse-glow"></div>
        <div className="absolute top-40 right-20 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl animate-pulse-glow" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl animate-pulse-glow" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center space-x-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium">
                <TrendingUp className="w-4 h-4" />
                <span>Your Financial Partner</span>
              </div>
              
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight">
                Your journey to{' '}
                <span className="text-gradient bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  financial freedom
                </span>{' '}
                starts here
              </h1>
              
              <p className="text-xl text-gray-600 leading-relaxed max-w-2xl">
                Sow the seeds of financial growth today, reap the rewards tomorrow. 
                Empowering investors of all levels with knowledge and tools to achieve their financial goals.
              </p>
            </div>

            {/* Key Benefits */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                
                'Diversified Investment Opportunities',
                'End-to-End Financial Planning'
              ].map((benefit, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <CheckCircle className="`w-5 h-5 text-bull-600" />
                  <span className="text-gray-700 font-semibold">{benefit}</span>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                <Link href="/contact">Start Investing Now</Link>
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              
              
            </div>

           
          </div>

          {/* Right Content - Market Dashboard */}
          <div className="relative">
            <div className="bg-white rounded-3xl shadow-2xl p-8 transform rotate-3 hover:rotate-0 transition-transform duration-500">
              <img src="/banner.jpg" alt="Investment Growth Graph" className="w-auto h-full object-cover rounded-lg mb-4" />
              
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
