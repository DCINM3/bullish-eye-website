'use client';

import { useState, useEffect } from 'react';
import { MarketData } from '@/types';
// import finnhub from 'finnhub';

// Indian stock symbols for NSE/BSE
const INDIAN_SYMBOLS = [
  'RELIANCE.NS',
  'TCS.NS', 
  'INFY.NS',
  'HDFCBANK.NS',
  'ICICIBANK.NS',
  'SBIN.NS',
  'BHARTIARTL.NS',
  'ITC.NS'
];

export function useIndianMarketData(refreshInterval = 300000) { // 5 minutes
  const [data, setData] = useState<MarketData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchIndianMarketData = async () => {
    try {
      setError(null);
      const apiKey = process.env.NEXT_PUBLIC_FINHUB_API_KEY || process.env.FINHUB_API_KEY;
      if (!apiKey) throw new Error('Finnhub API key not set');

      const promises = INDIAN_SYMBOLS.map(async (symbol) => {
        const url = `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${apiKey}`;
        const res = await fetch(url);
        if (!res.ok) throw new Error(`Failed to fetch data for ${symbol}`);
        const data = await res.json();
        return {
          symbol: symbol.replace('.NS', ''),
          name: symbol.replace('.NS', ''),
          price: data.c,
          change: data.d,
          changePercent: data.dp,
          volume: data.v,
        };
      });

      const results = await Promise.allSettled(promises);
      const marketData: MarketData[] = results
        .filter(r => r.status === 'fulfilled')
        .map(r => (r as PromiseFulfilledResult<MarketData>).value);
      setData(marketData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch Indian market data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchIndianMarketData();
    const interval = setInterval(fetchIndianMarketData, refreshInterval);
    return () => clearInterval(interval);
  }, [refreshInterval]);

  return { data, loading, error, refetch: fetchIndianMarketData };
}

export function useIndianStock(symbol: string, refreshInterval = 300000) {
  const [data, setData] = useState<MarketData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setError(null);
      const apiKey = process.env.NEXT_PUBLIC_FINHUB_API_KEY || process.env.FINHUB_API_KEY;
      if (!apiKey) throw new Error('Finnhub API key not set');
      try {
        const url = `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${apiKey}`;
        const res = await fetch(url);
        if (!res.ok) throw new Error('Failed to fetch Indian stock data');
        const data = await res.json();
        setData({
          symbol: symbol.replace('.NS', ''),
          name: symbol.replace('.NS', ''),
          price: data.c,
          change: data.d,
          changePercent: data.dp,
          volume: data.v,
        });
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch Indian stock data');
      } finally {
        setLoading(false);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch Indian stock data');
      setLoading(false);
    }
  };

  useEffect(() => {
    if (symbol) {
      fetchData();
      const interval = setInterval(fetchData, refreshInterval);
      return () => clearInterval(interval);
    }
  }, [symbol, refreshInterval]);

  return { data, loading, error, refetch: fetchData };
}
