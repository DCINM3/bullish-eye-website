'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  TrendingUp, 
  Calendar, 
  DollarSign, 
  Percent, 
  ArrowLeft, 
  RefreshCw, 
  ChevronDown, 
  DownloadCloud,
  Award,
  Calculator,
  AlertCircle
} from 'lucide-react';
import SIPChart from '@/components/tools/SIPChart';
import FinancialQuote from '@/components/tools/FinancialQuote';

type InvestmentFrequency = 'monthly' | 'weekly' | 'daily';
type StepUpType = 'none' | 'yearly' | 'half-yearly' | 'quarterly';
type InvestmentType = 'sip' | 'lumpsum';

function SIPCalculatorContent() {
  // Get URL search params to check if lumpsum calculator is requested
  const searchParams = useSearchParams();
  const typeParam = searchParams.get('type');
  
  // Investment type - initialize based on URL parameter if available
  const [investmentType, setInvestmentType] = useState<InvestmentType>(
    typeParam === 'lumpsum' ? 'lumpsum' : 'sip'
  );
  
  // Base SIP parameters
  const [amount, setAmount] = useState(5000);
  const [years, setYears] = useState(10);
  const [expectedReturn, setExpectedReturn] = useState(12);
  const [frequency, setFrequency] = useState<InvestmentFrequency>('monthly');
  
  // Step-up parameters
  const [stepUpType, setStepUpType] = useState<StepUpType>('none');
  const [stepUpPercentage, setStepUpPercentage] = useState(10);

  // Advanced parameters
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [inflationRate, setInflationRate] = useState(6);
  const [taxRate, setTaxRate] = useState(10);
  
  // Results
  const [totalInvestment, setTotalInvestment] = useState(0);
  const [estimatedReturns, setEstimatedReturns] = useState(0);
  const [maturityAmount, setMaturityAmount] = useState(0);
  const [monthlyData, setMonthlyData] = useState<{ month: number; investment: number; value: number; }[]>([]);
  
  // Calculate the results whenever the inputs change
  useEffect(() => {
    if (investmentType === 'sip') {
      calculateSIP();
    } else {
      calculateLumpsum();
    }
  }, [investmentType, amount, years, expectedReturn, frequency, stepUpType, stepUpPercentage, inflationRate, taxRate]);

  const calculateSIP = () => {
    // Convert annual returns to the appropriate period based on frequency
    let periodsPerYear: number;
    let periodAmount: number;
    
    switch (frequency) {
      case 'monthly':
        periodsPerYear = 12;
        periodAmount = amount;
        break;
      case 'weekly':
        periodsPerYear = 52;
        // For weekly, divide the monthly amount to get per-week investment
        periodAmount = amount / 4.33; // Monthly amount divided by average weeks in a month
        break;
      case 'daily':
        periodsPerYear = 365;
        // For daily, divide the monthly amount to get per-day investment
        periodAmount = amount / 30; // Monthly amount divided by average days in a month
        break;
      default:
        periodsPerYear = 12;
        periodAmount = amount;
    }
    
    const periodicRate = Math.pow(1 + expectedReturn / 100, 1 / periodsPerYear) - 1;
    const totalPeriods = years * periodsPerYear;
    
    let totalInvested = 0;
    let finalAmount = 0;
    const data: { month: number; investment: number; value: number }[] = [];
    
    // For display purposes, we'll convert the period to an equivalent month
    const periodToMonthFactor = 12 / periodsPerYear;
    
    let currentPeriodAmount = periodAmount;
    
    for (let period = 1; period <= totalPeriods; period++) {
      // Adjust amount for step-ups if applicable
      if (stepUpType !== 'none') {
        let periodsPerStepUp: number;
        
        switch (stepUpType) {
          case 'yearly':
            periodsPerStepUp = periodsPerYear;
            break;
          case 'half-yearly':
            periodsPerStepUp = periodsPerYear / 2;
            break;
          case 'quarterly':
            periodsPerStepUp = periodsPerYear / 4;
            break;
          default:
            periodsPerStepUp = periodsPerYear;
        }
        
        if (period % periodsPerStepUp === 0) {
          currentPeriodAmount *= (1 + stepUpPercentage / 100);
        }
      }
      
      totalInvested += currentPeriodAmount;
      finalAmount = (finalAmount + currentPeriodAmount) * (1 + periodicRate);
      
      // Record data for chart (only save data for specific intervals to avoid too many points)
      if (period % Math.max(1, Math.floor(totalPeriods / 100)) === 0 || period === totalPeriods) {
        // Convert period to equivalent month for consistent chart display across frequencies
        const equivalentMonth = Math.round(period * periodToMonthFactor);
        data.push({
          month: equivalentMonth,
          investment: Math.round(totalInvested),
          value: Math.round(finalAmount)
        });
      }
    }
    
    // Apply inflation adjustment if in advanced mode
    if (showAdvanced) {
      const inflationFactor = Math.pow(1 + inflationRate / 100, -years);
      finalAmount = finalAmount * inflationFactor;
    }
    
    // Apply tax on gains if in advanced mode
    let taxableAmount = 0;
    if (showAdvanced && taxRate > 0) {
      const gains = finalAmount - totalInvested;
      taxableAmount = gains * (taxRate / 100);
      finalAmount -= taxableAmount;
    }
    
    setTotalInvestment(Math.round(totalInvested));
    setMaturityAmount(Math.round(finalAmount));
    setEstimatedReturns(Math.round(finalAmount - totalInvested));
    setMonthlyData(data);
  };

  // Calculate lumpsum investment
  const calculateLumpsum = () => {
    const annualRate = expectedReturn / 100;
    let totalInvested = amount;
    let finalAmount = amount;
    const data: { month: number; investment: number; value: number }[] = [];
    
    // Add initial point
    data.push({
      month: 0,
      investment: amount,
      value: amount
    });
    
    // Calculate compound growth for each year
    for (let year = 1; year <= years; year++) {
      finalAmount = finalAmount * (1 + annualRate);
      
      // Record data points for each year
      data.push({
        month: year * 12, // Convert years to months for consistent chart display
        investment: amount,
        value: Math.round(finalAmount)
      });
    }
    
    // Apply inflation adjustment if in advanced mode
    if (showAdvanced) {
      const inflationFactor = Math.pow(1 + inflationRate / 100, -years);
      finalAmount = finalAmount * inflationFactor;
    }
    
    // Apply tax on gains if in advanced mode
    if (showAdvanced && taxRate > 0) {
      const gains = finalAmount - totalInvested;
      const taxableAmount = gains * (taxRate / 100);
      finalAmount -= taxableAmount;
    }
    
    setTotalInvestment(Math.round(totalInvested));
    setMaturityAmount(Math.round(finalAmount));
    setEstimatedReturns(Math.round(finalAmount - totalInvested));
    setMonthlyData(data);
  };

  const resetCalculator = () => {
    setInvestmentType('sip');
    setAmount(5000);
    setYears(10);
    setExpectedReturn(12);
    setFrequency('monthly');
    setStepUpType('none');
    setStepUpPercentage(10);
    setInflationRate(6);
    setTaxRate(10);
    setShowAdvanced(false);
  };
  
  // Function to render amount formatting with commas for thousands
  const formatCurrency = (value: number) => {
    return value.toLocaleString('en-IN');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-gradient-to-r from-blue-700 to-indigo-800 py-16 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div>
              <Link href="/tools" className="inline-flex items-center text-blue-100 hover:text-white mb-4">
                <ArrowLeft className="w-4 h-4 mr-2" />
                <span>Back to Tools</span>
              </Link>
              <h1 className="text-3xl md:text-4xl font-bold">
                {investmentType === 'lumpsum' ? 'Lumpsum Calculator' : 'SIP Calculator'}
              </h1>
              <p className="mt-2 text-blue-100">
                {investmentType === 'lumpsum' 
                  ? 'Calculate potential returns on your one-time investments with our advanced calculator'
                  : 'Plan your investments and visualize your wealth growth with our advanced SIP calculator'}
              </p>
            </div>
            <div className="mt-4 md:mt-0">
              <Button
                variant="outline" 
                className="bg-white/10 text-white border-white/30 hover:bg-white/20"
                onClick={resetCalculator}
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Reset Calculator
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Calculator Section */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Input Column */}
            <div className="lg:col-span-1">
              <div className="space-y-6">
                  {/* Investment Type Tabs */}
                <Card className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Investment Type</h3>
                  <Tabs 
                    defaultValue="sip" 
                    className="w-full" 
                    value={investmentType}
                    onValueChange={(value) => {
                      setInvestmentType(value as InvestmentType);
                      if (value === 'lumpsum') {
                        setFrequency('monthly'); // Reset frequency when switching to lumpsum
                      }
                    }}
                  >
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="sip" className="text-sm">SIP</TabsTrigger>
                      <TabsTrigger value="lumpsum" className="text-sm">Lumpsum</TabsTrigger>
                    </TabsList>
                    <TabsContent value="sip">
                      <p className="text-sm text-gray-600 mt-2">
                        Systematic Investment Plan - Invest fixed amounts at regular intervals
                      </p>
                    </TabsContent>
                    <TabsContent value="lumpsum">
                      <p className="text-sm text-gray-600 mt-2">
                        One-time investment - Invest a fixed amount once and let it grow
                      </p>
                    </TabsContent>
                  </Tabs>
                </Card>                {/* Basic Parameters */}
                <Card className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Basic Parameters</h3>
                  
                  <div className="space-y-6">
                    {/* Investment Amount */}
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <label htmlFor="amount" className="text-sm font-medium text-gray-700">
                          <DollarSign className="inline w-4 h-4 mr-1" />
                          Investment Amount (₹)
                        </label>
                        <div className="bg-gray-100 px-2 py-1 rounded text-sm font-medium">
                          ₹{formatCurrency(amount)}
                        </div>
                      </div>
                      <Input
                        id="amount"
                        type="range"
                        min="100"
                        max="100000"
                        step="100"
                        value={amount}
                        onChange={(e) => setAmount(parseInt(e.target.value))}
                        className="cursor-pointer"
                      />
                      <div className="flex justify-between text-xs text-gray-500 mt-1">
                        <span>₹100</span>
                        <span>₹100,000</span>
                      </div>
                      <div className="mt-3 flex gap-2">
                        {[1000, 5000, 10000, 25000].map((value) => (
                          <Button
                            key={value}
                            variant="outline"
                            size="sm"
                            className="text-xs py-1 px-2 h-auto"
                            onClick={() => setAmount(value)}
                          >
                            ₹{formatCurrency(value)}
                          </Button>
                        ))}
                      </div>
                    </div>
                    
                    {/* Investment Period */}
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <label htmlFor="years" className="text-sm font-medium text-gray-700">
                          <Calendar className="inline w-4 h-4 mr-1" />
                          Investment Period (Years)
                        </label>
                        <div className="bg-gray-100 px-2 py-1 rounded text-sm font-medium">
                          {years} Years
                        </div>
                      </div>
                      <Input
                        id="years"
                        type="range"
                        min="1"
                        max="30"
                        step="1"
                        value={years}
                        onChange={(e) => setYears(parseInt(e.target.value))}
                        className="cursor-pointer"
                      />
                      <div className="flex justify-between text-xs text-gray-500 mt-1">
                        <span>1 Year</span>
                        <span>30 Years</span>
                      </div>
                      <div className="mt-3 flex gap-2">
                        {[5, 10, 15, 20].map((value) => (
                          <Button
                            key={value}
                            variant="outline"
                            size="sm"
                            className="text-xs py-1 px-2 h-auto"
                            onClick={() => setYears(value)}
                          >
                            {value} Years
                          </Button>
                        ))}
                      </div>
                    </div>
                    
                    {/* Expected Returns */}
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <label htmlFor="expectedReturn" className="text-sm font-medium text-gray-700">
                          <TrendingUp className="inline w-4 h-4 mr-1" />
                          Expected Returns (% p.a)
                        </label>
                        <div className="bg-gray-100 px-2 py-1 rounded text-sm font-medium">
                          {expectedReturn}%
                        </div>
                      </div>
                      <Input
                        id="expectedReturn"
                        type="range"
                        min="1"
                        max="30"
                        step="0.5"
                        value={expectedReturn}
                        onChange={(e) => setExpectedReturn(parseFloat(e.target.value))}
                        className="cursor-pointer"
                      />
                      <div className="flex justify-between text-xs text-gray-500 mt-1">
                        <span>1%</span>
                        <span>30%</span>
                      </div>
                      <div className="mt-3 flex gap-2">
                        {[8, 10, 12, 15].map((value) => (
                          <Button
                            key={value}
                            variant="outline"
                            size="sm"
                            className="text-xs py-1 px-2 h-auto"
                            onClick={() => setExpectedReturn(value)}
                          >
                            {value}%
                          </Button>
                        ))}
                      </div>
                    </div>
                  </div>
                </Card>
                
                {/* Investment Frequency - Only show for SIP */}
                {investmentType === 'sip' && (
                  <Card className="p-6">
                    <h3 className="text-lg font-semibold mb-4">Investment Frequency</h3>
                    <div className="grid grid-cols-3 gap-3">
                      <Button
                        variant={frequency === 'monthly' ? 'default' : 'outline'}
                        onClick={() => setFrequency('monthly')}
                        className={frequency === 'monthly' ? 'bg-blue-600 text-white' : ''}
                      >
                        Monthly
                      </Button>
                      <Button
                        variant={frequency === 'weekly' ? 'default' : 'outline'}
                        onClick={() => setFrequency('weekly')}
                        className={frequency === 'weekly' ? 'bg-blue-600 text-white' : ''}
                      >
                        Weekly
                      </Button>
                      <Button
                        variant={frequency === 'daily' ? 'default' : 'outline'}
                        onClick={() => setFrequency('daily')}
                        className={frequency === 'daily' ? 'bg-blue-600 text-white' : ''}
                      >
                        Daily
                      </Button>
                    </div>
                    <div className="mt-4 text-sm text-gray-600">
                      <p>Select how frequently you want to invest your money.</p>
                    </div>
                  </Card>
                )}
                
                {/* Step-Up Investment - Only show for SIP */}
                {investmentType === 'sip' && (
                  <Card className="p-6">
                    <h3 className="text-lg font-semibold mb-4">Step-Up Investment</h3>
                    <div className="mb-4">
                      <label className="text-sm font-medium text-gray-700 block mb-2">Increase investment by:</label>
                      <div className="grid grid-cols-2 gap-3">
                        <Button
                          variant={stepUpType === 'none' ? 'default' : 'outline'}
                          onClick={() => setStepUpType('none')}
                          className={stepUpType === 'none' ? 'bg-blue-600 text-white' : ''}
                        >
                          None
                        </Button>
                        <Button
                          variant={stepUpType === 'yearly' ? 'default' : 'outline'}
                          onClick={() => setStepUpType('yearly')}
                          className={stepUpType === 'yearly' ? 'bg-blue-600 text-white' : ''}
                        >
                          Yearly
                        </Button>
                      </div>
                    </div>
                    
                    {stepUpType !== 'none' && (
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <label htmlFor="stepUpPercentage" className="text-sm font-medium text-gray-700">
                            <Percent className="inline w-4 h-4 mr-1" />
                            Step-Up Percentage (%)
                          </label>
                          <div className="bg-gray-100 px-2 py-1 rounded text-sm font-medium">
                            {stepUpPercentage}%
                          </div>
                        </div>
                        <Input
                          id="stepUpPercentage"
                          type="range"
                          min="1"
                          max="100"
                          step="1"
                          value={stepUpPercentage}
                          onChange={(e) => setStepUpPercentage(parseInt(e.target.value))}
                          className="cursor-pointer"
                        />
                        <div className="flex justify-between text-xs text-gray-500 mt-1">
                          <span>1%</span>
                          <span>100%</span>
                        </div>
                        <div className="mt-4 p-3 bg-blue-50 border border-blue-100 rounded-md text-sm text-blue-700">
                          Your investment amount will increase by {stepUpPercentage}% {stepUpType}.
                        </div>
                      </div>
                    )}
                  </Card>
                )}
                
                {/* Advanced Parameters */}
                <Card className="p-6">
                  <button
                    onClick={() => setShowAdvanced(!showAdvanced)}
                    className="flex justify-between items-center w-full text-left"
                  >
                    <h3 className="text-lg font-semibold">Advanced Parameters</h3>
                    <ChevronDown className={`w-5 h-5 transition-transform duration-200 ${showAdvanced ? 'transform rotate-180' : ''}`} />
                  </button>
                  
                  {showAdvanced && (
                    <div className="mt-4 space-y-6">
                      {/* Inflation Rate */}
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <label htmlFor="inflationRate" className="text-sm font-medium text-gray-700">
                            Inflation Rate (% p.a)
                          </label>
                          <div className="bg-gray-100 px-2 py-1 rounded text-sm font-medium">
                            {inflationRate}%
                          </div>
                        </div>
                        <Input
                          id="inflationRate"
                          type="range"
                          min="0"
                          max="20"
                          step="0.5"
                          value={inflationRate}
                          onChange={(e) => setInflationRate(parseFloat(e.target.value))}
                          className="cursor-pointer"
                        />
                        <div className="flex justify-between text-xs text-gray-500 mt-1">
                          <span>0%</span>
                          <span>20%</span>
                        </div>
                        <div className="mt-2 text-xs text-gray-600">
                          Adjusts the future value of your investment for inflation.
                        </div>
                      </div>
                      
                      {/* Tax Rate */}
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <label htmlFor="taxRate" className="text-sm font-medium text-gray-700">
                            Tax on Gains (%)
                          </label>
                          <div className="bg-gray-100 px-2 py-1 rounded text-sm font-medium">
                            {taxRate}%
                          </div>
                        </div>
                        <Input
                          id="taxRate"
                          type="range"
                          min="0"
                          max="40"
                          step="1"
                          value={taxRate}
                          onChange={(e) => setTaxRate(parseInt(e.target.value))}
                          className="cursor-pointer"
                        />
                        <div className="flex justify-between text-xs text-gray-500 mt-1">
                          <span>0%</span>
                          <span>40%</span>
                        </div>
                        <div className="mt-2 text-xs text-gray-600">
                          Estimated tax rate on your investment gains.
                        </div>
                      </div>
                    </div>
                  )}
                </Card>
              </div>
            </div>

            {/* Results Column */}
            <div className="lg:col-span-2">
              <div className="space-y-6">
                {/* Results Summary Card */}
                <Card className="p-6 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-bold">Your Investment Summary</h3>
                    <Button
                      variant="outline"
                      size="sm"
                      className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                    >
                      <DownloadCloud className="w-4 h-4 mr-2" />
                      Save Results
                    </Button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                      <p className="text-blue-100 mb-1">Total Investment</p>
                      <h4 className="text-2xl font-bold mb-1">₹{formatCurrency(totalInvestment)}</h4>
                      <p className="text-xs text-blue-100">Amount invested over {years} years</p>
                    </div>
                    
                    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                      <p className="text-blue-100 mb-1">Estimated Returns</p>
                      <h4 className="text-2xl font-bold mb-1">₹{formatCurrency(estimatedReturns)}</h4>
                      <p className="text-xs text-blue-100">Growth on your investment</p>
                    </div>
                    
                    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                      <p className="text-blue-100 mb-1">Maturity Amount</p>
                      <h4 className="text-2xl font-bold mb-1">₹{formatCurrency(maturityAmount)}</h4>
                      <p className="text-xs text-blue-100">Total value after {years} years</p>
                    </div>
                  </div>
                  
                  <div className="mt-6 flex flex-col md:flex-row justify-between items-start md:items-center text-sm bg-white/10 backdrop-blur-sm rounded-lg p-4">
                    <div className="mb-4 md:mb-0">
                      <p className="text-blue-100">Your wealth will grow {Math.round((maturityAmount / totalInvestment) * 100) / 100}x in {years} years at {expectedReturn}% returns</p>
                    </div>
                    <div className="flex items-center">
                      <Award className="w-5 h-5 mr-2 text-yellow-300" />
                      <span>
                        {investmentType === 'lumpsum' ? 
                          `One-time investment of ₹${formatCurrency(amount)}` :
                          (stepUpType === 'none' ? 
                            `${frequency.charAt(0).toUpperCase() + frequency.slice(1)} investment of ₹${formatCurrency(amount)}` :
                            `${frequency.charAt(0).toUpperCase() + frequency.slice(1)} investment with ${stepUpPercentage}% ${stepUpType} step-up`)
                        }
                      </span>
                    </div>
                  </div>
                </Card>
                
                {/* Graph Card */}
                {monthlyData.length > 0 && (
                  <SIPChart
                    totalInvestment={totalInvestment}
                    estimatedReturns={estimatedReturns}
                    maturityAmount={maturityAmount}
                    monthlyData={monthlyData}
                  />
                )}
                
                {/* Investment Tips & Quotes */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="p-6">
                    <h3 className="flex items-center text-lg font-semibold mb-4">
                      <Calculator className="w-5 h-5 mr-2 text-blue-600" />
                      SIP Investment Tips
                    </h3>
                    <ul className="space-y-3 text-sm text-gray-700">
                      <li className="flex items-start">
                        <span className="bg-blue-100 text-blue-800 rounded-full w-5 h-5 flex items-center justify-center mr-2 shrink-0 mt-0.5">1</span>
                        <span>Start early to benefit from the power of compounding</span>
                      </li>
                      <li className="flex items-start">
                        <span className="bg-blue-100 text-blue-800 rounded-full w-5 h-5 flex items-center justify-center mr-2 shrink-0 mt-0.5">2</span>
                        <span>Be consistent with your investments for better results</span>
                      </li>
                      <li className="flex items-start">
                        <span className="bg-blue-100 text-blue-800 rounded-full w-5 h-5 flex items-center justify-center mr-2 shrink-0 mt-0.5">3</span>
                        <span>Increase your investment amount periodically as your income grows</span>
                      </li>
                      <li className="flex items-start">
                        <span className="bg-blue-100 text-blue-800 rounded-full w-5 h-5 flex items-center justify-center mr-2 shrink-0 mt-0.5">4</span>
                        <span>Align your SIP duration with your financial goals</span>
                      </li>
                    </ul>
                    <div className="mt-4 p-3 bg-yellow-50 border border-yellow-100 rounded-md text-sm">
                      <div className="flex">
                        <AlertCircle className="w-5 h-5 text-yellow-600 mr-2 shrink-0" />
                        <p className="text-yellow-800">
                          This calculator provides estimates only. Actual returns may vary based on market conditions and fund performance.
                        </p>
                      </div>
                    </div>
                  </Card>
                  
                  <FinancialQuote />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="bg-gray-100 py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Ready to start your investment journey?</h2>
          <p className="text-lg text-gray-600 mb-8">
            Our investment advisors can help you create a personalized SIP strategy
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white">
                Talk to an Advisor
              </Button>
            </Link>
            <Link href="/services/mutual-funds">
              <Button size="lg" variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50">
                Explore Mutual Funds
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

// Loading component for Suspense fallback
function LoadingComponent() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Loading calculator...</p>
      </div>
    </div>
  );
}

// Main export component wrapped in Suspense
export default function SIPCalculatorPage() {
  return (
    <Suspense fallback={<LoadingComponent />}>
      <SIPCalculatorContent />
    </Suspense>
  );
}
