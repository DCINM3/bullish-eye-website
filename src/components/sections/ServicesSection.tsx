"use client"
import { useRef, useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import Link from 'next/link';
import {
  TrendingUp,
  Shield,
  PieChart,
  Briefcase,
  Target,
  Users,
  ArrowRight,
  DollarSign,
  BarChart2,
  Layers,
  Calendar,
  FileText,
  Landmark, // for IPO
} from "lucide-react";

export default function ServicesSection() {
  const services = [
    {
      icon: PieChart,
      title: "Mutual Funds",
      href: "/services/mutual-funds",
      description: "Access professionally managed, diversified portfolios tailored to your financial aspirations.",
      color: "from-blue-500 to-blue-600",
    },
    {
      icon: DollarSign,
      title: "NCDs & Bonds",
      href: "/services/fixed-income",
      description: "Secure a predictable income stream with high-quality bonds and non-convertible debentures.",
      color: "from-green-500 to-green-600",
    },
    {
      icon: Layers,
      title: "Unlisted Shares",
      href: "/services/unlisted-shares",
      description: "Invest in high-growth potential companies and pre-IPO opportunities before they hit the market.",
      color: "from-purple-500 to-purple-600",
    },
    {
      icon: Calendar,
      title: "Retirement Planning",
      href: "/services/retirement-plan",
      description: "Build a robust retirement corpus with customized solutions for financial independence.",
      color: "from-orange-500 to-orange-600",
    },
    {
      icon: Shield,
      title: "Insurance Planning",
      href: "/services/insurance-policy",
      description: "Protect your loved ones and your financial goals with comprehensive life and health insurance plans.",
      color: "from-indigo-500 to-indigo-600",
    },
    {
      icon: BarChart2,
      title: "Structured Products",
      href: "/services/structure-product",
      description: "Access sophisticated, customized portfolios that offer a unique mix of capital protection and targeted returns.",
      color: "from-teal-500 to-teal-600",
    },
    {
      icon: Landmark,
      title: "IPO Investing",
      href: "/services/ipo-investing",
      description: "Get in on the ground floor of high-growth companies with our expert IPO analysis and application support.",
      color: "from-pink-500 to-pink-600",
    },
  ];

  const scrollRef = useRef<HTMLDivElement>(null);
  const [current, setCurrent] = useState(0);

  // Calculate how many cards per view
  const getCardsPerView = () => {
    if (typeof window === "undefined") return 1;
    if (window.innerWidth >= 1024) return 3;
    return 1;
  };

  // Auto-scroll effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % services.length);
    }, 4000); // Slower scroll
    return () => clearInterval(interval);
  }, [services.length]);

  // Scroll to current card
  useEffect(() => {
    if (scrollRef.current) {
      const cardWidth = scrollRef.current.firstChild
        ? (scrollRef.current.firstChild as HTMLElement).offsetWidth
        : 0;
      scrollRef.current.scrollTo({
        left: cardWidth * current,
        behavior: "smooth",
      });
    }
  }, [current]);

  // Manual navigation
  const handlePrev = () => {
    setCurrent((prev) =>
      prev === 0 ? services.length - 1 : prev - 1
    );
  };
  const handleNext = () => {
    setCurrent((prev) =>
      prev === services.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center space-y-4 mb-16">
          <div className="inline-flex items-center space-x-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium">
            <Briefcase className="w-4 h-4" />
            <span>Our Services</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
            Comprehensive Financial Solutions
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            From mutual funds to structured products, we provide end-to-end financial services to help you build and protect your wealth.
          </p>
        </div>

        {/* Carousel */}
        <div className="relative group">
          <div
            ref={scrollRef}
            className="flex overflow-x-auto scrollbar-hide snap-x snap-mandatory -mx-4 px-4"
            style={{
              scrollBehavior: "smooth",
              gap: "2rem",
            }}
          >
            {services.map((service, index) => (
              <div
                key={index}
                className="snap-center shrink-0 w-[85vw] md:w-[40vw] lg:w-[30vw] max-w-sm"
              >
                <Link href={service.href} className="block h-full">
                  <Card className="group/card h-full flex flex-col hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-0 shadow-lg">
                    <div className="p-8 space-y-6 flex flex-col flex-grow">
                      <div
                        className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center group-hover/card:scale-110 transition-transform duration-300`}
                      >
                        <service.icon className="w-8 h-8 text-white" />
                      </div>
                      <div className="space-y-4 flex-grow">
                        <h3 className="text-xl font-bold text-gray-900 group-hover/card:text-blue-600 transition-colors duration-300">
                          {service.title}
                        </h3>
                        <p className="text-gray-600 leading-relaxed">
                          {service.description}
                        </p>
                      </div>
                      <div className="mt-auto pt-4">
                        <div className="text-blue-600 font-semibold flex items-center group-hover/card:underline">
                          Learn More
                          <ArrowRight className="w-4 h-4 ml-2 group-hover/card:translate-x-1 transition-transform duration-300" />
                        </div>
                      </div>
                    </div>
                  </Card>
                </Link>
              </div>
            ))}
          </div>
          {/* Left Arrow */}
          <button
            onClick={handlePrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white rounded-full shadow p-2 transition-opacity opacity-0 group-hover:opacity-100"
            aria-label="Previous"
          >
            <ArrowRight className="w-5 h-5 rotate-180 text-blue-600" />
          </button>
          {/* Right Arrow */}
          <button
            onClick={handleNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white rounded-full shadow p-2 transition-opacity opacity-0 group-hover:opacity-100"
            aria-label="Next"
          >
            <ArrowRight className="w-5 h-5 text-blue-600" />
          </button>
        </div>
      </div>
    </section>
  );
}
