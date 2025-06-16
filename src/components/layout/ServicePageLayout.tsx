import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight, Plus, Minus } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

interface ServicePageLayoutProps {
  title: string;
  subtitle: string;
  icon: React.ElementType;
  iconBgColor: string;
  children: React.ReactNode;
  faqItems?: { q: string; a: string }[];
}

const ServicePageLayout: React.FC<ServicePageLayoutProps> = ({ title, subtitle, icon: Icon, iconBgColor, children, faqItems }) => {
  return (
    <div className="bg-gray-50 min-h-screen">
      <section className={`relative bg-slate-900 text-white py-24`}>
        <div className={`absolute inset-0 bg-gradient-to-br ${iconBgColor} opacity-80`}></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className={`w-20 h-20 mx-auto mb-6 rounded-2xl bg-white/20 flex items-center justify-center`}>
            <Icon className="w-12 h-12" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold">{title}</h1>
          <p className="mt-4 text-xl text-blue-100 max-w-3xl mx-auto">{subtitle}</p>
        </div>
      </section>

      <section className="py-16 -mt-20 relative z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="p-8 md:p-12 shadow-xl border-0 bg-white">
            {children}
            {faqItems && faqItems.length > 0 && (
              <div className="mt-12 pt-8 border-t">
                <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Frequently Asked Questions</h2>
                <Accordion type="single" collapsible className="w-full space-y-4">
                  {faqItems.map((faq, index) => (
                    <AccordionItem value={`item-${index}`} key={index} className="border-0 border bg-gray-50 rounded-lg shadow-sm">
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
            )}
          </Card>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900">Ready to Take the Next Step?</h2>
            <p className="mt-4 text-lg text-gray-600">Our advisors are here to help you build a robust financial future.</p>
            <Link href="/contact">
              <Button size="lg" className="mt-8 bg-blue-600 hover:bg-blue-700 text-white">
                  Schedule a Free Consultation
                  <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
        </div>
      </section>
    </div>
  );
};

export const ContentSection = ({ title, children }: { title: string, children: React.ReactNode }) => (
  <div className="mb-8 last:mb-0">
    <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
      {title.split(' ')[0]} 
      <span className="ml-2 font-semibold text-gray-700">{title.substring(title.indexOf(' ') + 1)}</span>
    </h3>
    <div className="space-y-4 text-gray-600 leading-relaxed text-base">
      {children}
    </div>
  </div>
);

export const FeatureList = ({ items }: { items: string[] }) => (
  <ul className="space-y-3">
    {items.map((item, index) => (
      <li key={index} className="flex items-start">
        <div className="w-5 h-5 flex-shrink-0 bg-blue-100 rounded-full flex items-center justify-center mr-3 mt-1">
          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
        </div>
        <span>{item}</span>
      </li>
    ))}
  </ul>
);

export default ServicePageLayout; 