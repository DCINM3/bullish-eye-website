'use client';

import { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';

type InvestmentFrequency = 'monthly' | 'quarterly' | 'yearly';
type InvestmentType = 'sip' | 'lumpsum';

interface CalculatorProps {
  className?: string;
}

const motivationalQuotes = [
  "The best time to start investing was yesterday. The second best time is today.",
  "Compound interest is the eighth wonder of the world.",
  "Investing should be more like watching paint dry or watching grass grow.",
  "The individual investor should act consistently as an investor and not as a speculator.",
  "Don't look for the needle in the haystack. Just buy the haystack!",
  "It's not how much money you make, but how much money you keep.",
  "The stock market is a device for transferring money from the impatient to the patient.",
];

export function SIPCalculator({ className }: CalculatorProps) {
  // SIP parameters
  const [investmentType, setInvestmentType] = useState<InvestmentType>('sip');
  const [frequency, setFrequency] = useState<InvestmentFrequency>('monthly');
  const [principal, setPrincipal] = useState<number>(5000);
  const [years, setYears] = useState<number>(10);
  const [expectedReturn, setExpectedReturn] = useState<number>(12);
  const [annualIncrease, setAnnualIncrease] = useState<number>(0); // Step-up SIP
  
  // Results
  const [totalInvested, setTotalInvested] = useState<number>(0);
  const [estimatedReturns, setEstimatedReturns] = useState<number>(0);
  const [maturityValue, setMaturityValue] = useState<number>(0);
  const [chartData, setChartData] = useState<any[]>([]);
  const [quote, setQuote] = useState<string>('');

  // Constants for calculations
  const frequencyMultiplier = {
    monthly: 12,
    quarterly: 4,
    yearly: 1
  };

  // Calculate results based on input parameters
  useEffect(() => {
    // Select random motivational quote
    const randomQuote = motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)];
    setQuote(randomQuote);

    // Calculate results
    calculateResults();
  }, [investmentType, frequency, principal, years, expectedReturn, annualIncrease]);

  const calculateResults = () => {
    if (investmentType === 'lumpsum') {
      calculateLumpsum();
    } else {
      calculateSIP();
    }
  };

  const calculateLumpsum = () => {
    const ratePerYear = expectedReturn / 100;
    const futureValue = principal * Math.pow(1 + ratePerYear, years);
    
    setTotalInvested(principal);
    setEstimatedReturns(futureValue - principal);
    setMaturityValue(futureValue);
    
    // Generate chart data for lumpsum
    const newChartData = [];
    for (let i = 0; i <= years; i++) {
      const valueAtYear = principal * Math.pow(1 + ratePerYear, i);
      newChartData.push({
        year: i,
        invested: principal,
        value: Math.round(valueAtYear)
      });
    }
    setChartData(newChartData);
  };

  const calculateSIP = () => {
    const periodsPerYear = frequencyMultiplier[frequency];
    const totalMonths = years * periodsPerYear;
    
    const monthlyRate = expectedReturn / 100 / periodsPerYear;
    
    let invested = 0;
    let futureValue = 0;
    let currentPrincipal = principal;
    
    // Generate chart data for SIP with annual step-up
    const newChartData = [];
    newChartData.push({ year: 0, invested: 0, value: 0 });
    
    // For each year
    for (let y = 1; y <= years; y++) {
      let yearlyInvested = 0;
      let yearEndValue = (y === 1) ? 0 : newChartData[y-1].value;
      
      // For each period in the year (month/quarter/year)
      for (let p = 1; p <= periodsPerYear; p++) {
        // Apply step-up only at the beginning of a new year
        if (p === 1 && y > 1) {
          currentPrincipal = Math.round(currentPrincipal * (1 + annualIncrease / 100));
        }
        
        yearlyInvested += currentPrincipal;
        yearEndValue = (yearEndValue + currentPrincipal) * (1 + monthlyRate);
      }
      
      invested += yearlyInvested;
      futureValue = yearEndValue;
      
      newChartData.push({
        year: y,
        invested: Math.round(invested),
        value: Math.round(futureValue)
      });
    }
    
    setTotalInvested(invested);
    setEstimatedReturns(futureValue - invested);
    setMaturityValue(futureValue);
    setChartData(newChartData);
  };

  // Format currency in Indian style (lakhs, crores)
  const formatCurrency = (amount: number): string => {
    if (amount >= 10000000) { // 1 crore
      return `₹${(amount / 10000000).toFixed(2)} Cr`;
    } else if (amount >= 100000) { // 1 lakh
      return `₹${(amount / 100000).toFixed(2)} L`;
    } else {
      return `₹${Math.round(amount).toLocaleString('en-IN')}`;
    }
  };

  return (
    <div className={`w-full max-w-5xl mx-auto p-4 ${className}`}>
      <Card className="bg-white dark:bg-slate-900 shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-blue-600 dark:text-blue-400">
            Investment Calculator
          </CardTitle>
          <CardDescription>
            Plan your financial future with our advanced investment calculator
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="sip" className="w-full" onValueChange={(value) => setInvestmentType(value as InvestmentType)}>
            <TabsList className="grid grid-cols-2 w-full mb-6">
              <TabsTrigger value="sip">SIP Investment</TabsTrigger>
              <TabsTrigger value="lumpsum">Lump Sum</TabsTrigger>
            </TabsList>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <TabsContent value="sip" className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="frequency">Investment Frequency</Label>
                    <div className="grid grid-cols-3 gap-2">
                      <button 
                        onClick={() => setFrequency('monthly')}
                        className={`px-4 py-2 rounded-md ${frequency === 'monthly' ? 'bg-blue-600 text-white' : 'bg-gray-100 dark:bg-gray-800'}`}
                      >
                        Monthly
                      </button>
                      <button 
                        onClick={() => setFrequency('quarterly')}
                        className={`px-4 py-2 rounded-md ${frequency === 'quarterly' ? 'bg-blue-600 text-white' : 'bg-gray-100 dark:bg-gray-800'}`}
                      >
                        Quarterly
                      </button>
                      <button 
                        onClick={() => setFrequency('yearly')}
                        className={`px-4 py-2 rounded-md ${frequency === 'yearly' ? 'bg-blue-600 text-white' : 'bg-gray-100 dark:bg-gray-800'}`}
                      >
                        Yearly
                      </button>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label htmlFor="principal">Investment Amount (₹)</Label>
                      <span className="text-sm text-gray-500">{principal.toLocaleString('en-IN')}</span>
                    </div>
                    <Input
                      id="principal"
                      type="number"
                      value={principal}
                      onChange={(e) => setPrincipal(Number(e.target.value))}
                      min={500}
                      max={1000000}
                    />
                    <Slider
                      value={[principal]}
                      min={500}
                      max={100000}
                      step={500}
                      onValueChange={(value) => setPrincipal(value[0])}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label htmlFor="annualIncrease">Annual Step-up (%)</Label>
                      <span className="text-sm text-gray-500">{annualIncrease}%</span>
                    </div>
                    <Input
                      id="annualIncrease"
                      type="number"
                      value={annualIncrease}
                      onChange={(e) => setAnnualIncrease(Number(e.target.value))}
                      min={0}
                      max={20}
                    />
                    <Slider
                      value={[annualIncrease]}
                      min={0}
                      max={20}
                      step={1}
                      onValueChange={(value) => setAnnualIncrease(value[0])}
                    />
                  </div>
                </TabsContent>
                
                <TabsContent value="lumpsum" className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label htmlFor="lumpsum">Investment Amount (₹)</Label>
                      <span className="text-sm text-gray-500">{principal.toLocaleString('en-IN')}</span>
                    </div>
                    <Input
                      id="lumpsum"
                      type="number"
                      value={principal}
                      onChange={(e) => setPrincipal(Number(e.target.value))}
                      min={1000}
                      max={10000000}
                    />
                    <Slider
                      value={[principal]}
                      min={10000}
                      max={1000000}
                      step={10000}
                      onValueChange={(value) => setPrincipal(value[0])}
                    />
                  </div>
                </TabsContent>
                
                {/* Common parameters for both SIP and lumpsum */}
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label htmlFor="years">Time Period (years)</Label>
                    <span className="text-sm text-gray-500">{years} years</span>
                  </div>
                  <Input
                    id="years"
                    type="number"
                    value={years}
                    onChange={(e) => setYears(Number(e.target.value))}
                    min={1}
                    max={50}
                  />
                  <Slider
                    value={[years]}
                    min={1}
                    max={30}
                    step={1}
                    onValueChange={(value) => setYears(value[0])}
                  />
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label htmlFor="expectedReturn">Expected Return (%)</Label>
                    <span className="text-sm text-gray-500">{expectedReturn}%</span>
                  </div>
                  <Input
                    id="expectedReturn"
                    type="number"
                    value={expectedReturn}
                    onChange={(e) => setExpectedReturn(Number(e.target.value))}
                    min={1}
                    max={30}
                  />
                  <Slider
                    value={[expectedReturn]}
                    min={6}
                    max={24}
                    step={0.5}
                    onValueChange={(value) => setExpectedReturn(value[0])}
                  />
                </div>
                
                {/* Results */}
                <div className="bg-blue-50 dark:bg-slate-800 p-4 rounded-lg">
                  <h3 className="font-semibold text-lg mb-3">Results</h3>
                  <div className="grid grid-cols-3 gap-2">
                    <div>
                      <p className="text-sm text-gray-500">Invested Amount</p>
                      <p className="font-semibold">{formatCurrency(totalInvested)}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Est. Returns</p>
                      <p className="font-semibold text-green-600">{formatCurrency(estimatedReturns)}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Total Value</p>
                      <p className="font-semibold text-blue-600">{formatCurrency(maturityValue)}</p>
                    </div>
                  </div>
                </div>

                {/* Motivational Quote */}
                <div className="italic text-sm text-gray-600 dark:text-gray-400 border-l-4 border-blue-500 pl-3 py-1">
                  "{quote}"
                </div>
              </div>
              
              {/* Chart */}
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={chartData}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                      dataKey="year"
                      label={{ value: 'Years', position: 'insideBottom', offset: -5 }}
                    />
                    <YAxis
                      tickFormatter={(value) => {
                        if (value >= 10000000) return `${(value/10000000).toFixed(1)}Cr`;
                        if (value >= 100000) return `${(value/100000).toFixed(1)}L`;
                        return value;
                      }}
                    />
                    <Tooltip
                      formatter={(value: number) => [`${formatCurrency(value)}`, '']}
                      labelFormatter={(label) => `Year ${label}`}
                    />
                    <Legend />
                    <Area
                      type="monotone"
                      dataKey="invested"
                      name="Amount Invested"
                      stackId="1"
                      stroke="#8884d8"
                      fill="rgba(136, 132, 216, 0.6)"
                    />
                    <Area
                      type="monotone"
                      dataKey="value"
                      name="Estimated Value"
                      stackId="2"
                      stroke="#82ca9d"
                      fill="rgba(130, 202, 157, 0.6)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}

export default SIPCalculator;
