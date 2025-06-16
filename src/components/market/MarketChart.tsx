'use client';

import { useState, useEffect } from 'react';
import { useIndianMarketData } from '@/hooks/useMarketData';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { TrendingUp, TrendingDown, BarChart3 } from 'lucide-react';

interface ChartData {
  time: string;
  price: number;
  volume?: number;
}

export default function MarketChart({ symbol = 'NIFTY 50' }: { symbol?: string }) {
  const [chartData, setChartData] = useState<ChartData[]>([]);
  const [timeframe, setTimeframe] = useState<'1D' | '1W' | '1M' | '3M'>('1D');
  const [chartType, setChartType] = useState<'line' | 'area'>('area');

  // Use live data for the selected symbol
  const { data: marketData, loading: marketLoading, error: marketError } = useIndianMarketData(300000);
  useEffect(() => {
    // Find the selected symbol's data
    const found = marketData.find(d => d.symbol.toUpperCase() === symbol.replace(/\s/g, '').toUpperCase());
    // Simulate chart data as a flat/repeated line for now
    if (found) {
      const dataPoints = timeframe === '1D' ? 24 : timeframe === '1W' ? 7 : timeframe === '1M' ? 30 : 90;
      const now = new Date();
      const data: ChartData[] = [];
      for (let i = 0; i < dataPoints; i++) {
        let timeLabel = '';
        if (timeframe === '1D') {
          timeLabel = `${i}:00`;
        } else {
          const date = new Date(now);
          date.setDate(date.getDate() - (dataPoints - i));
          timeLabel = date.toLocaleDateString('en-IN', { month: 'short', day: 'numeric' });
        }
        data.push({
          time: timeLabel,
          price: found.price,
          volume: found.volume
        });
      }
      setChartData(data);
    } else {
      setChartData([]);
    }
  }, [marketData, symbol, timeframe]);

  const currentPrice = chartData[chartData.length - 1]?.price || 0;
  const previousPrice = chartData[chartData.length - 2]?.price || 0;
  const change = currentPrice - previousPrice;
  const changePercent = previousPrice ? (change / previousPrice) * 100 : 0;

  const timeframes = [
    { label: '1D', value: '1D' as const },
    { label: '1W', value: '1W' as const },
    { label: '1M', value: '1M' as const },
    { label: '3M', value: '3M' as const },
  ];

  return (
    <Card className="market-card p-6">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{symbol}</h3>
            <div className="flex items-center space-x-4 mt-2">
              <span className="text-2xl font-bold text-gray-900">
                ₹{currentPrice.toFixed(2)}
              </span>
              <div className={`flex items-center space-x-1 px-2 py-1 rounded-md ${
                change >= 0 ? 'bg-bull-50 text-bull-600' : 'bg-bear-50 text-bear-600'
              }`}>
                {change >= 0 ? (
                  <TrendingUp className="w-4 h-4" />
                ) : (
                  <TrendingDown className="w-4 h-4" />
                )}
                <span className="text-sm font-medium">
                  {change >= 0 ? '+' : ''}{change.toFixed(2)} ({changePercent.toFixed(2)}%)
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Button
              variant={chartType === 'line' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setChartType('line')}
            >
              <TrendingUp className="w-4 h-4" />
            </Button>
            <Button
              variant={chartType === 'area' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setChartType('area')}
            >
              <BarChart3 className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Timeframe Selector */}
        <div className="flex space-x-2">
          {timeframes.map((tf) => (
            <Button
              key={tf.value}
              variant={timeframe === tf.value ? 'default' : 'outline'}
              size="sm"
              onClick={() => setTimeframe(tf.value)}
              className="text-xs"
            >
              {tf.label}
            </Button>
          ))}
        </div>

        {/* Chart */}
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            {chartType === 'area' ? (
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis 
                  dataKey="time" 
                  stroke="#64748b"
                  fontSize={12}
                  tickLine={false}
                />
                <YAxis 
                  stroke="#64748b"
                  fontSize={12}
                  tickLine={false}
                  domain={['dataMin - 100', 'dataMax + 100']}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'white',
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px',
                    fontSize: '12px'
                  }}
                  formatter={(value: number) => [`₹${value.toFixed(2)}`, 'Price']}
                />
                <Area
                  type="monotone"
                  dataKey="price"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  fill="url(#colorPrice)"
                />
              </AreaChart>
            ) : (
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis 
                  dataKey="time" 
                  stroke="#64748b"
                  fontSize={12}
                  tickLine={false}
                />
                <YAxis 
                  stroke="#64748b"
                  fontSize={12}
                  tickLine={false}
                  domain={['dataMin - 100', 'dataMax + 100']}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'white',
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px',
                    fontSize: '12px'
                  }}
                  formatter={(value: number) => [`₹${value.toFixed(2)}`, 'Price']}
                />
                <Line
                  type="monotone"
                  dataKey="price"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  dot={false}
                  activeDot={{ r: 4, fill: '#3b82f6' }}
                />
              </LineChart>
            )}
          </ResponsiveContainer>
        </div>

        {/* Chart Info */}
        <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-200">
          <div className="text-center">
            <p className="text-xs text-gray-500">High</p>
            <p className="font-semibold text-gray-900">
              ₹{Math.max(...chartData.map(d => d.price)).toFixed(2)}
            </p>
          </div>
          <div className="text-center">
            <p className="text-xs text-gray-500">Low</p>
            <p className="font-semibold text-gray-900">
              ₹{Math.min(...chartData.map(d => d.price)).toFixed(2)}
            </p>
          </div>
          <div className="text-center">
            <p className="text-xs text-gray-500">Volume</p>
            <p className="font-semibold text-gray-900">
              {((chartData[chartData.length - 1]?.volume || 0) / 1000000).toFixed(1)}M
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
}
