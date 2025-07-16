'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calculator, TrendingUp, LineChart, PiggyBank, Clock, BarChart3 } from 'lucide-react';

export default function ToolsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-900 to-indigo-800 py-20 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-72 h-72 bg-indigo-300 rounded-full mix-blend-multiply filter blur-xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium mb-8">
            <Calculator className="w-4 h-4" />
            <span>Free Financial Tools</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold leading-tight">
            Smart Tools for
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">
              Smart Investors
            </span>
          </h1>
          
          <p className="mt-6 text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
            Plan your finances with precision using our suite of advanced calculators and interactive tools.
          </p>
        </div>
      </section>

      {/* Tools Grid Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900">Our Financial Tools</h2>
            <p className="mt-4 text-xl text-gray-600">
              Free calculators and planners to help you make better financial decisions
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* SIP Calculator */}
            <Link href="/tools/sip-calculator" className="group">
              <Card className="h-full p-6 hover:shadow-xl transition-shadow duration-300 border-2 border-blue-100 group-hover:border-blue-500">
                <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mb-6 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                  <TrendingUp className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-gray-900 group-hover:text-blue-600 transition-colors duration-300">SIP Calculator</h3>
                <p className="text-gray-600">
                  Calculate returns on your systematic investment plans with advanced options and graphical representations.
                </p>
                <div className="mt-6 flex items-center text-blue-600 font-medium group-hover:text-blue-700 transition-colors duration-300">
                  <span>Try Calculator</span>
                  <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </div>
              </Card>
            </Link>

            {/* Lumpsum Calculator */}
            <Link href="/tools/sip-calculator?type=lumpsum" className="group">
              <Card className="h-full p-6 hover:shadow-xl transition-shadow duration-300 border-2 border-blue-100 group-hover:border-blue-500">
                <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mb-6 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                  <LineChart className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-gray-900 group-hover:text-blue-600 transition-colors duration-300">Lumpsum Calculator</h3>
                <p className="text-gray-600">
                  Calculate potential returns on one-time investments with customizable parameters.
                </p>
                <div className="mt-6 flex items-center text-blue-600 font-medium group-hover:text-blue-700 transition-colors duration-300">
                  <span>Try Calculator</span>
                  <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </div>
              </Card>
            </Link>

            {/* Goal Calculator - Coming Soon */}
            <Card className="h-full p-6 border-2 border-gray-100 bg-gray-50 opacity-75">
              <div className="bg-gray-200 rounded-full w-16 h-16 flex items-center justify-center mb-6 text-gray-500">
                <PiggyBank className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-700">Goal Calculator</h3>
              <p className="text-gray-500">
                Plan your investments to achieve specific financial goals like education, retirement, or a home.
              </p>
              <div className="mt-6 flex items-center text-gray-500 font-medium">
                <span>Coming Soon</span>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Why Use Our Tools Section */}
      <section className="py-16 bg-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900">Why Use Our Financial Tools</h2>
            <p className="mt-4 text-xl text-gray-600">
              Make informed decisions with our advanced calculators
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="bg-blue-100 rounded-full w-12 h-12 flex items-center justify-center mb-6 text-blue-600">
                <Calculator className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold mb-2 text-gray-900">Precision Planning</h3>
              <p className="text-gray-600">
                Advanced algorithms provide accurate projections based on historical market data and customizable parameters.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="bg-green-100 rounded-full w-12 h-12 flex items-center justify-center mb-6 text-green-600">
                <BarChart3 className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold mb-2 text-gray-900">Visual Insights</h3>
              <p className="text-gray-600">
                Interactive charts and graphs help visualize your investment growth and potential outcomes.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="bg-purple-100 rounded-full w-12 h-12 flex items-center justify-center mb-6 text-purple-600">
                <Clock className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold mb-2 text-gray-900">Real-time Updates</h3>
              <p className="text-gray-600">
                Instant calculations and responsive design let you experiment with different scenarios on any device.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-indigo-700">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h2 className="text-3xl font-bold">Ready to take control of your financial future?</h2>
          <p className="mt-4 text-xl text-blue-100">
            Start using our free financial tools today and make informed investment decisions.
          </p>
          <div className="mt-8">
            <Link href="/tools/sip-calculator">
              <Button size="lg" className="bg-white text-blue-700 hover:bg-blue-50">
                Try SIP Calculator Now
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
