'use client';

import { useState, useEffect } from 'react';
import { useIndianMarketData } from '@/hooks/useMarketData';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { TrendingUp, TrendingDown, Activity, IndianRupee, RefreshCw, Building2, Clock } from 'lucide-react';
import { getIndianMarketStatus, formatISTTime } from '@/lib/marketStatus';

export default function MarketStats() {
  const [currentTime, setCurrentTime] = useState('');
  const [marketStatus, setMarketStatus] = useState(getIndianMarketStatus());

  // Update time and market status every second
  useEffect(() => {
    const updateStatus = () => {
      setCurrentTime(formatISTTime());
      setMarketStatus(getIndianMarketStatus());
    };

    updateStatus(); // Initial update
    const interval = setInterval(updateStatus, 1000);
    
    return () => clearInterval(interval);
  }, []);

  // Live Indian market data
  const { data: indianMarketData, loading: marketLoading, error: marketError, refetch } = useIndianMarketData(300000);
  // Map icons and exchanges for known symbols
  const symbolMeta: Record<string, { icon: any; exchange: string }> = {
    'RELIANCE': { icon: TrendingUp, exchange: 'NSE' },
    'TCS': { icon: Activity, exchange: 'NSE' },
    'INFY': { icon: TrendingUp, exchange: 'NSE' },
    'HDFCBANK': { icon: Building2, exchange: 'NSE' },
    'ICICIBANK': { icon: Building2, exchange: 'NSE' },
    'SBIN': { icon: Building2, exchange: 'NSE' },
    'BHARTIARTL': { icon: TrendingUp, exchange: 'NSE' },
    'ITC': { icon: TrendingUp, exchange: 'NSE' },
  };

  const getStatusColor = () => {
    switch (marketStatus.status) {
      case 'Open': return 'text-green-600 bg-green-100';
      case 'Pre-Market': return 'text-blue-600 bg-blue-100';
      case 'Post-Market': return 'text-orange-600 bg-orange-100';
      case 'Closed': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header with Real-time Clock */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Indian Market Overview</h3>
          <div className="flex items-center space-x-4 text-sm text-gray-600">
            <div className="flex items-center space-x-1">
              <Clock className="w-4 h-4" />
              <span>IST: {currentTime}</span>
            </div>
            <span>•</span>
            <span>NSE & BSE</span>
          </div>
        </div>
        <Button
          variant="outline"
          size="sm"
          className="flex items-center space-x-2"
          onClick={refetch}
          disabled={marketLoading}
        >
          <RefreshCw className="w-4 h-4" />
          <span>{marketLoading ? 'Loading...' : 'Refresh'}</span>
        </Button>
      </div>

      {/* Market Status */}
      <div className={`rounded-lg p-4 border-l-4 ${
        marketStatus.isOpen ? 'border-l-green-500 bg-green-50' : 'border-l-red-500 bg-red-50'
      }`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className={`w-3 h-3 rounded-full ${
              marketStatus.isOpen ? 'bg-green-500 animate-pulse' : 'bg-red-500'
            }`}></div>
            <div>
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor()}`}>
                {marketStatus.status}
              </span>
              <p className="text-sm text-gray-600 mt-1">{marketStatus.nextEvent}</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm font-medium text-gray-900">
              {marketStatus.isOpen ? 'Trading Hours' : 'Next Event'}
            </p>
            <p className="text-sm text-gray-600">
              {marketStatus.isOpen ? '9:15 AM - 3:30 PM IST' : `in ${marketStatus.timeUntilNext}`}
            </p>
          </div>
        </div>
      </div>

      {/* Market Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {marketError && (
          <div className="col-span-4 text-center text-red-500">{marketError}</div>
        )}
        {indianMarketData.map((stat, index) => {
          const meta = symbolMeta[stat.symbol] || { icon: TrendingUp, exchange: 'NSE' };
          const Icon = meta.icon;
          return (
            <Card key={index} className="market-card p-6 relative overflow-hidden border-l-4 border-l-orange-500">
              {/* Background Pattern */}
              <div className="absolute top-0 right-0 w-20 h-20 opacity-5">
                <Icon className="w-full h-full" />
              </div>
              <div className="relative space-y-4">
                {/* Header */}
                <div className="flex items-center justify-between">
                  <div className={`p-2 rounded-lg ${
                    stat.change >= 0 ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                  }`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-medium text-orange-600 bg-orange-50 px-2 py-1 rounded">
                    {meta.exchange}
                  </span>
                </div>
                {/* Content */}
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">{stat.name}</p>
                  <p className="text-2xl font-bold text-gray-900">
                    ₹{stat.price.toFixed(2)}
                  </p>
                </div>
                {/* Change */}
                <div className="flex items-center justify-between">
                  <div className={`flex items-center space-x-1 px-2 py-1 rounded-md ${
                    stat.change >= 0 ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'
                  }`}>
                    {stat.change >= 0 ? (
                      <TrendingUp className="w-3 h-3" />
                    ) : (
                      <TrendingDown className="w-3 h-3" />
                    )}
                    <span className="text-sm font-medium">
                      {stat.change >= 0 ? '+' : ''}{stat.change.toFixed(2)}
                    </span>
                  </div>
                  <span className={`text-sm font-medium ${
                    stat.changePercent >= 0 ? 'text-green-600' : 'text-red-600'
                  }`}>
                    ({stat.changePercent >= 0 ? '+' : ''}{stat.changePercent.toFixed(2)}%)
                  </span>
                </div>
                {/* Market Status Indicator */}
                {!marketStatus.isOpen && (
                  <div className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                    Previous Close
                  </div>
                )}
              </div>
            </Card>
          );
        })}
      </div>

      {/* Last Updated */}
      <div className="text-center">
        <p className="text-xs text-gray-500">
          {marketStatus.isOpen ? 'Live Data' : 'Previous Close'} • Last updated: {currentTime} IST
        </p>
      </div>
    </div>
  );
}
