'use client';

import { useState, useEffect, useCallback } from 'react';
import { MarketData } from '@/types';

const REFRESH_INTERVAL = 300000; // 5 minutes

export function useMarketData() {
  const [data, setData] = useState<MarketData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMarketData = useCallback(async () => {
    // Allow initial fetch even when loading is true.
    if (loading && data.length > 0) return;

    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/market/quote`);
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'Failed to parse error response' }));
        throw new Error(errorData.error || `Failed to fetch market data (${response.status})`);
      }
      
      const result = await response.json();
      
      if (result && Array.isArray(result)) {
          setData(result);
      } else {
          if (result && result.error) {
              throw new Error(result.error);
          }
          setData([]); 
          console.warn("API did not return an array:", result);
      }

    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred while fetching market data.');
      setData([]);
    } finally {
      setLoading(false);
    }
  }, [loading, data.length]);

  useEffect(() => {
    fetchMarketData();
    const interval = setInterval(fetchMarketData, REFRESH_INTERVAL);
    return () => clearInterval(interval);
  }, [fetchMarketData]);

  return { data, loading, error, refetch: fetchMarketData };
} 