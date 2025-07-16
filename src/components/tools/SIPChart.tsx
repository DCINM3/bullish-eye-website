'use client';

import { useEffect, useRef } from 'react';
import { Chart, registerables } from 'chart.js';
import { Card } from '@/components/ui/card';

// Register all Chart.js components
Chart.register(...registerables);

interface SIPChartProps {
  totalInvestment: number;
  estimatedReturns: number;
  maturityAmount: number;
  monthlyData: {
    month: number;
    investment: number;
    value: number;
  }[];
}

const SIPChart = ({ totalInvestment, estimatedReturns, maturityAmount, monthlyData }: SIPChartProps) => {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    if (chartRef.current) {
      // Destroy previous chart instance
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }

      const months = monthlyData.map(data => data.month);
      const investments = monthlyData.map(data => data.investment);
      const values = monthlyData.map(data => data.value);

      // Convert months to years for x-axis display if larger periods
      const displayLabels = months.map(month => {
        if (month === 0) return '0';
        if (month % 12 === 0) return `${month/12}Y`;
        return `${month}M`;
      });

      const ctx = chartRef.current.getContext('2d');
      
      if (ctx) {
        chartInstance.current = new Chart(ctx, {
          type: 'line',
          data: {
            labels: displayLabels,
            datasets: [
              {
                label: 'Investment Amount',
                data: investments,
                backgroundColor: 'rgba(59, 130, 246, 0.2)', // blue-500 with opacity
                borderColor: 'rgb(59, 130, 246)', // blue-500
                borderWidth: 2,
                fill: true,
                tension: 0.1,
              },
              {
                label: 'Investment Value',
                data: values,
                backgroundColor: 'rgba(16, 185, 129, 0.2)', // green-500 with opacity
                borderColor: 'rgb(16, 185, 129)', // green-500
                borderWidth: 2,
                fill: true,
                tension: 0.1,
              }
            ]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              tooltip: {
                mode: 'index',
                intersect: false,
                callbacks: {
                  label: function(context) {
                    let label = context.dataset.label || '';
                    if (label) {
                      label += ': ';
                    }
                    if (context.parsed.y !== null) {
                      label += new Intl.NumberFormat('en-IN', {
                        style: 'currency',
                        currency: 'INR',
                        maximumFractionDigits: 0
                      }).format(context.parsed.y);
                    }
                    return label;
                  },
                  title: function(context) {
                    const label = context[0].label;
                    if (label.endsWith('Y')) {
                      return `Year ${label.replace('Y', '')}`;
                    }
                    if (label.endsWith('M')) {
                      return `Month ${label.replace('M', '')}`;
                    }
                    return `Period ${label}`;
                  }
                }
              },
              legend: {
                position: 'top',
              },
              title: {
                display: true,
                text: 'Investment Growth Projection'
              }
            },
            scales: {
              x: {
                title: {
                  display: true,
                  text: 'Time Period'
                }
              },
              y: {
                beginAtZero: true,
                title: {
                  display: true,
                  text: 'Value (₹)'
                },
                ticks: {
                  callback: function(value) {
                    return '₹' + value.toLocaleString('en-IN');
                  }
                }
              }
            }
          }
        });
      }
    }

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [totalInvestment, estimatedReturns, maturityAmount, monthlyData]);

  return (
    <Card className="p-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-4">Investment Growth Chart</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-sm text-blue-600 font-medium">Total Investment</p>
            <p className="text-2xl font-bold text-gray-900">₹{totalInvestment.toLocaleString('en-IN')}</p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <p className="text-sm text-green-600 font-medium">Estimated Returns</p>
            <p className="text-2xl font-bold text-gray-900">₹{estimatedReturns.toLocaleString('en-IN')}</p>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg">
            <p className="text-sm text-purple-600 font-medium">Maturity Amount</p>
            <p className="text-2xl font-bold text-gray-900">₹{maturityAmount.toLocaleString('en-IN')}</p>
          </div>
        </div>
      </div>
      <div className="h-80">
        <canvas ref={chartRef}></canvas>
      </div>
      <div className="mt-4 text-sm text-gray-600">
        <p>This chart shows the projected growth of your SIP investment over time.</p>
      </div>
    </Card>
  );
};

export default SIPChart;
