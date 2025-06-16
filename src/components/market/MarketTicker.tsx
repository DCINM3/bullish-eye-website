'use client';

import { useEffect, useState } from 'react';
import { useIndianMarketData } from '@/hooks/useMarketData';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { getIndianMarketStatus } from '@/lib/marketStatus';

interface TickerData {
  symbol: string;
  price: number;
  change: number;
  changePercent: number;
}

export default function MarketTicker() {
  const [marketStatus, setMarketStatus] = useState(getIndianMarketStatus());

  useEffect(() => {
    const interval = setInterval(() => {
      setMarketStatus(getIndianMarketStatus());
    }, 60000); // Update every minute

    return () => clearInterval(interval);
  }, []);

  // Live Indian market data
  const { data: tickerData, loading: tickerLoading, error: tickerError } = useIndianMarketData(300000);

  const getStatusDisplay = () => {
    switch (marketStatus.status) {
      case 'Open': return { text: 'NSE • BSE Live', color: 'text-green-400' };
      case 'Pre-Market': return { text: 'Pre-Market', color: 'text-blue-400' };
      case 'Post-Market': return { text: 'Post-Market', color: 'text-orange-400' };
      case 'Closed': return { text: 'Markets Closed', color: 'text-red-400' };
      default: return { text: 'Markets Closed', color: 'text-gray-400' };
    }
  };

  const statusDisplay = getStatusDisplay();

  return (
    <div className="bg-slate-900 text-white py-2 sticky top-0 z-50 overflow-hidden relative">
      {/* Fixed ticker with proper animation class */}
      <div className="flex ticker-scroll whitespace-nowrap">
        {/* Duplicate the data for seamless loop */}
        {tickerError && (
          <div className="text-red-500 px-4">{tickerError}</div>
        )}
        {[...tickerData, ...tickerData, ...tickerData].map((item, index) => (
          <div key={`${item.symbol}-${index}`} className="flex items-center space-x-4 mx-8 whitespace-nowrap">
            <span className="font-semibold text-sm text-orange-400">{item.symbol}</span>
            <span className="text-sm text-white">₹{item.price.toFixed(2)}</span>
            <div className={`flex items-center space-x-1 text-xs px-2 py-1 rounded ${
              item.change >= 0 ? 'text-green-400 bg-green-900/30' : 'text-red-400 bg-red-900/30'
            }`}>
              {item.change >= 0 ? (
                <TrendingUp className="w-3 h-3" />
              ) : (
                <TrendingDown className="w-3 h-3" />
              )}
              <span>{item.change >= 0 ? '+' : ''}{item.change.toFixed(2)}</span>
              <span>({item.changePercent >= 0 ? '+' : ''}{item.changePercent.toFixed(2)}%)</span>
            </div>
          </div>
        ))}
      </div>

      {/* Market Status */}
      <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
        <div className={`flex items-center space-x-2 text-xs ${statusDisplay.color}`}>
          <div className={`w-2 h-2 rounded-full ${
            marketStatus.isOpen ? 'bg-green-400 animate-pulse' : 'bg-red-400'
          }`}></div>
          <span>{statusDisplay.text}</span>
        </div>
      </div>
    </div>
  );
}
