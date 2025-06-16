'use client';

import { useState, useEffect, useRef } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';

export default function TestimonialsSection() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
const testimonials = [
  {
    name: 'Rakesh J., Ind',
    role: 'Senior Software Engineer',
    content: "I've been using Bullish Eyes for over a year, and it's completely changed the way I invest. The platform is intuitive, and the customer support is outstanding. I've seen great returns and feel more confident in my financial future!",
    rating: 5,
    avatar: 'RJ'
  },
  {
    name: 'Sudhanshu R., Ind',
    role: 'Business Owner',
    content: "I was completely new to investing, but Bullish Eyes made it so easy! The user-friendly interface, educational resources, and automated investment options helped me start building my portfolio with confidence. Highly recommended for beginners!",
    rating: 5,
    avatar: 'SR'
  },
  {
    name: 'Vivek K., Ind',
    role: 'Marketing Manager',
    content: "I wanted a simple, hands-off approach to investing, and Bullish Eyes delivered. The manual portfolio management and smart rebalancing have helped me grow my wealth without constantly checking the markets. Stress-free and effective!",
    rating: 5,
    avatar: 'VK'
  },
  {
    name: 'Kali C., Ind',
    role: 'Investment Analyst',
    content: "I’m always on the lookout for high-growth opportunities, and Bullish  provides exactly that. The platform offers a great selection of stocks, ETFs, and all assets class, along with detailed analytics to guide my strategy. A game-changer for serious investors!",
    rating: 5,
    avatar: 'KC'
  },
  {
    name: 'Madhuri J., Ind',
    role: 'Retired Teacher',
    content: "Thanks to my Life Insurance Plan and Savings, I don’t have to worry about market fluctuations affecting my income. The guaranteed payouts allow me to manage my expenses comfortably and focus on what truly matters—enjoying life!",
    rating: 5,
    avatar: 'MJ'
  },
  {
    name: 'Shakti S., Ind',
    role: 'Government Employee',
    content: "I wanted a secure investment that would provide regular income without the risks of stock market fluctuations. Life- Guaranteed Income STAR delivers exactly that, giving me peace of mind and financial freedom.",
    rating: 5,
    avatar: 'SS'
  }
];

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  // Auto-slide effect
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 3000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [testimonials.length]);

  // Reset timer on manual navigation
  const handleManualNav = (callback: () => void) => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    callback();
    intervalRef.current = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 3000);
  };

  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center space-y-4 mb-16">
          <div className="inline-flex items-center space-x-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium">
            <Star className="w-4 h-4" />
            <span>What People Say</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
            Trusted by Thousands of Investors
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Don't just take our word for it. Here's what our satisfied clients have to say about their experience with Bullish Eyes.
          </p>
        </div>

        {/* Main Testimonial */}
        <div className="relative max-w-4xl mx-auto mb-12">
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-2xl p-8 md:p-12">
            <div className="text-center space-y-6">
              <Quote className="w-12 h-12 text-blue-500 mx-auto" />
              
              <blockquote className="text-xl md:text-2xl text-gray-700 leading-relaxed font-medium">
                "{testimonials[currentTestimonial].content}"
              </blockquote>
              
              <div className="flex justify-center space-x-1">
                {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              
              <div className="flex items-center justify-center space-x-4">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                  {testimonials[currentTestimonial].avatar}
                </div>
                <div className="text-left">
                  <p className="font-bold text-gray-900 text-lg">
                    {testimonials[currentTestimonial].name}
                  </p>
                  <p className="text-gray-600">
                    {testimonials[currentTestimonial].role}
                  </p>
                </div>
              </div>
            </div>
          </Card>

          {/* Navigation Buttons */}
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleManualNav(prevTestimonial)}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 rounded-full bg-white shadow-lg hover:shadow-xl"
          >
            <ChevronLeft className="w-5 h-5" />
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleManualNav(nextTestimonial)}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 rounded-full bg-white shadow-lg hover:shadow-xl"
          >
            <ChevronRight className="w-5 h-5" />
          </Button>
        </div>

        {/* Testimonial Indicators */}
        <div className="flex justify-center space-x-2 mb-12">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => handleManualNav(() => setCurrentTestimonial(index))}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentTestimonial ? 'bg-blue-600 w-8' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
