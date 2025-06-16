'use client';

import { useState, useEffect } from 'react';
import MarketStats from '@/components/market/MarketStats';
import MarketChart from '@/components/market/MarketChart';
import { Card } from '@/components/ui/card';
import { TrendingUp, IndianRupee } from 'lucide-react';
import { getIndianMarketStatus } from '@/lib/marketStatus';

export default function MarketsPage() {
  const [marketStatus, setMarketStatus] = useState(getIndianMarketStatus());

  useEffect(() => {
    const interval = setInterval(() => {
      setMarketStatus(getIndianMarketStatus());
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  const getMarketStatusForExchange = (exchange: string) => {
    if (exchange === 'NSE' || exchange === 'BSE') {
      return {
        status: marketStatus.status,
        color: marketStatus.isOpen ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
      };
    }
    // MCX has different timings
    return {
      status: 'Closed',
      color: 'bg-red-100 text-red-800'
    };
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center space-x-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium">
            <TrendingUp className="w-4 h-4" />
            <span>Live Markets</span>
          </div>
          <h1 className="text-4xl font-bold text-gray-900">Market Overview</h1>
          <p className="text-xl text-gray-600">
            Real-time market data and comprehensive analysis
          </p>
        </div>

        {/* Market Stats */}
        <MarketStats />

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <MarketChart symbol="NIFTY 50" />
          <MarketChart symbol="SENSEX" />
        </div>

        {/* Market Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Indian Markets */}
          <Card className="p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center">
                <IndianRupee className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-xl font-bold text-gray-900">Indian Markets</h2>
            </div>
            <div className="space-y-3">
              {[
                { name: 'NSE', time: '9:15 AM - 3:30 PM IST', exchange: 'NSE' },
                { name: 'BSE', time: '9:15 AM - 3:30 PM IST', exchange: 'BSE' },
                { name: 'MCX', time: '9:00 AM - 11:30 PM IST', exchange: 'MCX' },
              ].map((market, index) => {
                const status = getMarketStatusForExchange(market.exchange);
                return (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">{market.name}</p>
                      <p className="text-sm text-gray-600">{market.time}</p>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${status.color}`}>
                      {status.status}
                    </span>
                  </div>
                );
              })}
            </div>
          </Card>

          {/* Global Markets */}
          <Card className="p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-xl font-bold text-gray-900">Global Markets</h2>
            </div>
            <div className="space-y-3">
              {[
                { name: 'NYSE', time: '9:30 AM - 4:00 PM EST' },
                { name: 'NASDAQ', time: '9:30 AM - 4:00 PM EST' },
                { name: 'LSE', time: '8:00 AM - 4:30 PM GMT' },
              ].map((market, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">{market.name}</p>
                    <p className="text-sm text-gray-600">{market.time}</p>
                  </div>
                  <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs font-medium">
                    Closed
                  </span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
