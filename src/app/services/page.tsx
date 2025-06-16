import { Card } from "@/components/ui/card";
import Link from 'next/link';
import {
  PieChart,
  DollarSign,
  Layers,
  Calendar,
  Shield,
  BarChart2,
  Landmark,
  ArrowRight
} from "lucide-react";

export default function ServicesPage() {
  const services = [
    {
      icon: PieChart,
      title: "Mutual Funds",
      href: "/services/mutual-funds",
      description: "Smart Diversification. Reliable Growth. We architect your portfolio to reflect your aspirations.",
      color: "text-blue-600",
      bgColor: "bg-blue-400/20",
    },
    {
      icon: DollarSign,
      title: "NCDs & Bonds",
      href: "/services/fixed-income",
      description: "Stability Meets Simplicity. Ensure a predictable income stream without market swings.",
      color: "text-green-600",
      bgColor: "bg-green-400/20",
    },
    {
      icon: Layers,
      title: "Unlisted Shares",
      href: "/services/unlisted-shares",
      description: "Access Tomorrow's Leaders — Today. Invest in high-potential private companies.",
      color: "text-purple-600",
      bgColor: "bg-purple-400/20",
    },
    {
      icon: Calendar,
      title: "Retirement Planning",
      href: "/services/retirement-plan",
      description: "Live Your Second Innings with Confidence. Structured plans to accumulate and preserve wealth.",
      color: "text-orange-600",
      bgColor: "bg-orange-400/20",
    },
    {
      icon: Shield,
      title: "Insurance Planning",
      href: "/services/insurance-policy",
      description: "Fortify Your Financial Foundation. The perfect balance between adequate protection and affordability.",
      color: "text-indigo-600",
      bgColor: "bg-indigo-400/20",
    },
    {
      icon: BarChart2,
      title: "Structured Products",
      href: "/services/structure-product",
      description: "Customized Portfolios. Controlled Risk. A unique mix of capital protection and targeted returns.",
      color: "text-teal-600",
      bgColor: "bg-teal-400/20",
    },
    {
      icon: Landmark,
      title: "IPO Investing",
      href: "/services/ipo-investing",
      description: "Invest Early. Profit Early. Buy into high-growth companies at ground level with our support.",
      color: "text-pink-600",
      bgColor: "bg-pink-400/20",
    },
  ];

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <section className="bg-slate-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold">Our Financial Services</h1>
          <p className="mt-4 text-xl text-blue-200 max-w-3xl mx-auto">
            A complete suite of financial solutions designed to help you achieve your wealth creation and protection goals.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className="
              grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8
    justify-items-center
    [ &>*:last-child:nth-child(3n+1) ]:lg:col-start-2
            "
          >
            {services.map((service) => (
              <Link href={service.href} key={service.title} className="block group w-full max-w-md">
                <Card
                  className={`
                    h-full p-8 text-center hover:shadow-xl transition-shadow duration-300 hover:-translate-y-1 border flex flex-col
                    ${service.bgColor} backdrop-blur-md
                  `}
                  style={{ backgroundColor: undefined }}
                >
                  <div className={`w-16 h-16 rounded-xl bg-white/60 flex items-center justify-center mx-auto mb-6`}>
                    <service.icon className={`w-8 h-8 ${service.color}`} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{service.title}</h3>
                  <p className="text-gray-600 flex-grow">{service.description}</p>
                  <div className="mt-6">
                    <span className="font-semibold text-blue-600 group-hover:underline flex items-center justify-center">
                      View Details <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
