'use client';

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Quote } from 'lucide-react';

// List of financial and investment quotes
const financialQuotes = [
  {
    quote: "The best time to start investing was 20 years ago. The second best time is now.",
    author: "Chinese Proverb"
  },
  {
    quote: "Compound interest is the eighth wonder of the world. He who understands it, earns it; he who doesn't, pays it.",
    author: "Albert Einstein"
  },
  {
    quote: "The stock market is a device for transferring money from the impatient to the patient.",
    author: "Warren Buffett"
  },
  {
    quote: "Risk comes from not knowing what you're doing.",
    author: "Warren Buffett"
  },
  {
    quote: "In investing, what is comfortable is rarely profitable.",
    author: "Robert Arnott"
  },
  {
    quote: "It's not how much money you make, but how much money you keep, how hard it works for you, and how many generations you keep it for.",
    author: "Robert Kiyosaki"
  },
  {
    quote: "The individual investor should act consistently as an investor and not as a speculator.",
    author: "Benjamin Graham"
  },
  {
    quote: "The four most dangerous words in investing are: 'This time it's different.'",
    author: "Sir John Templeton"
  },
  {
    quote: "An investment in knowledge pays the best interest.",
    author: "Benjamin Franklin"
  },
  {
    quote: "The goal of investing isn't to minimize risk. It's to maximize returns for the level of risk you choose to accept.",
    author: "Peter Lynch"
  },
  {
    quote: "Investing should be more like watching paint dry or watching grass grow. If you want excitement, take $800 and go to Las Vegas.",
    author: "Paul Samuelson"
  },
  {
    quote: "The investor's chief problem – and even his worst enemy – is likely to be himself.",
    author: "Benjamin Graham"
  },
  {
    quote: "Successful investing takes time, discipline and patience.",
    author: "Warren Buffett"
  },
  {
    quote: "The best investment you can make is an investment in yourself. The more you learn, the more you'll earn.",
    author: "Warren Buffett"
  },
  {
    quote: "A SIP a day keeps financial worries away.",
    author: "Financial Wisdom"
  }
];

export default function FinancialQuote() {
  const [quote, setQuote] = useState(financialQuotes[0]);
  const [fadeState, setFadeState] = useState("fade-in");
  
  useEffect(() => {
    // Change the quote every 30 seconds
    const quoteInterval = setInterval(() => {
      changeQuote();
    }, 30000);
    
    return () => clearInterval(quoteInterval);
  }, []);

  const changeQuote = () => {
    setFadeState("fade-out");
    
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * financialQuotes.length);
      setQuote(financialQuotes[randomIndex]);
      setFadeState("fade-in");
    }, 500);
  };

  return (
    <Card 
      className="p-6 bg-gradient-to-r from-blue-50 to-purple-50 border-blue-100 relative overflow-hidden"
      onClick={changeQuote}
    >
      <Quote className="absolute top-4 left-4 w-8 h-8 text-blue-200" />
      <Quote className="absolute bottom-4 right-4 w-8 h-8 text-blue-200 transform rotate-180" />
      
      <div className={`py-8 px-10 text-center ${fadeState}`}>
        <p className="text-lg text-gray-800 italic mb-4">"{quote.quote}"</p>
        <p className="text-gray-600 font-medium">— {quote.author}</p>
      </div>
      
      <style jsx>{`
        .fade-in {
          opacity: 1;
          transition: opacity 0.5s ease-in;
        }
        .fade-out {
          opacity: 0;
          transition: opacity 0.5s ease-out;
        }
      `}</style>
    </Card>
  );
}
