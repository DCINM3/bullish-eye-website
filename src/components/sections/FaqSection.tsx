'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Plus, Minus } from "lucide-react";

const faqData = [
  {
    category: 'Mutual Funds',
    color: 'text-blue-700',
    questions: [
      {
        q: 'Can I start SIPs online?',
        a: 'Yes, we offer 100% digital onboarding with automated SIP setups.',
      },
      {
        q: 'Is ELSS better than other tax-saving options?',
        a: 'ELSS offers market-linked returns and the shortest lock-in among 80C options.',
      },
    ],
  },
  {
    category: 'NCDs & Bonds',
    color: 'text-green-700',
    questions: [
      {
        q: 'Are NCDs safe?',
        a: 'We only recommend NCDs with strong credit ratings and repayment records.',
      },
      {
        q: 'What is the typical return on corporate bonds?',
        a: 'Returns range from 7%–10%, depending on tenure and rating.',
      },
    ],
  },
  {
    category: 'Retirement Planning',
    color: 'text-orange-700',
    questions: [
      {
        q: 'When should I start planning for retirement?',
        a: 'The earlier the better—ideally in your 30s—to maximize compounding benefits.',
      },
      {
        q: 'Do you provide pension and annuity options?',
        a: 'Yes, including NPS, insurance-linked annuities, and post-retirement funds.',
      },
    ],
  },
    {
    category: 'Insurance Planning',
    color: 'text-purple-700',
    questions: [
      {
        q: 'How much term insurance do I need?',
        a: 'Usually 10–15x your annual income, based on dependents and liabilities.',
      },
      {
        q: 'Do you offer health insurance advisory?',
        a: 'Yes, we assist with selection, claims process, and premium optimization.',
      },
    ],
  },
  {
    category: 'Unlisted Shares',
    color: 'text-pink-700',
    questions: [
      {
        q: 'How do I invest in unlisted companies?',
        a: 'We offer curated unlisted stock opportunities with full research reports.',
      },
      {
        q: 'Is there a lock-in period?',
        a: 'Yes, most unlisted shares have 6–12 month lock-in before listing.',
      },
    ],
  },
    {
    category: 'Structured Products',
    color: 'text-yellow-700',
    questions: [
      {
        q: 'What are structured products?',
        a: 'Hybrid financial instruments combining fixed income and market-linked components.',
      },
      {
        q: 'Who should invest in them?',
        a: 'Ideal for HNIs or investors with specific goals and moderate risk tolerance.',
      },
    ],
  },
    {
    category: 'IPO Investing',
    color: 'text-indigo-700',
    questions: [
      {
        q: 'How do I increase chances of IPO allotment?',
        a: 'We guide you on optimal bidding strategies and category placement.',
      },
      {
        q: 'Can I apply via your platform?',
        a: 'Yes, we assist in application through supported brokers and UPI.',
      },
    ],
  },
];


export default function FaqSection() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-gray-600 mt-4 max-w-3xl mx-auto">
            Find answers to common questions about our services and investment strategies.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-12">
          {faqData.map((categoryItem) => (
            <div key={categoryItem.category}>
              <h3 className={`text-xl font-semibold mb-6 flex items-center ${categoryItem.color}`}>
                <span className="w-2 h-2 mr-3 bg-current rounded-full"></span>
                {categoryItem.category}
              </h3>
              <Accordion type="single" collapsible className="w-full space-y-4">
                {categoryItem.questions.map((faq, index) => (
                  <AccordionItem 
                    value={`item-${categoryItem.category}-${index}`} 
                    key={index}
                    className="border-0 border bg-white rounded-lg shadow-sm"
                  >
                    <AccordionTrigger className="text-left font-medium px-6 py-4 text-gray-800 hover:no-underline text-base group [&>svg]:hidden">
                      <span className="flex-grow">{faq.q}</span>
                      <div className="ml-4">
                        <Plus className="h-5 w-5 text-gray-500 group-data-[state=open]:hidden" />
                        <Minus className="h-5 w-5 text-gray-500 hidden group-data-[state=open]:block" />
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pb-5 text-gray-600 leading-relaxed">
                      {faq.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
} 