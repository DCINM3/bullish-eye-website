import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  TrendingUp, 
  Shield, 
  Eye, 
  Lightbulb, 
  Users, 
  Target,
  Award,
  Calendar,
  Building2,
  CheckCircle,
  ArrowRight,
  Star,
  Globe,
  Heart
} from 'lucide-react';
import Link from 'next/link';

export default function AboutPage() {
  const coreValues = [
    {
      icon: Shield,
      title: 'Integrity',
      description: 'We conduct our business with the highest ethical standards.',
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: Eye,
      title: 'Transparency',
      description: 'We provide clear and transparent information to our clients.',
      color: 'from-green-500 to-green-600'
    },
    {
      icon: Lightbulb,
      title: 'Innovation',
      description: 'We continuously strive to improve our services and offer innovative solutions.',
      color: 'from-purple-500 to-purple-600'
    },
    {
      icon: Heart,
      title: 'Client Focus',
      description: 'We prioritize our clients\' needs and strive to exceed their expectations.',
      color: 'from-orange-500 to-orange-600'
    }
  ];

  const milestones = [
    {
      year: '2018',
      title: 'Foundation',
      description: 'Founded in 2018, Bullish Eyes began by providing stock broking services and assisting clients with basic equity knowledge and IPO investments.',
      icon: Building2
    },
    {
      year: '2019',
      title: 'IPO Services',
      description: 'Expanded to provide comprehensive IPO investment assistance.',
      icon: TrendingUp
    },
    {
      year: '2020',
      title: 'Investment ideas',
      description: 'Added investment ideas and market research to our services.',
      icon: TrendingUp
    },
    {
      year: '2023',
      title: 'Insurance Solutions',
      description: 'Added life insurance and guaranteed income plans.',
      icon: Shield
    },
    {
      year: '2025',
      title: 'Full-Service Provider',
      description: 'Became a comprehensive financial services provider.',
      icon: Award
    }
  ];

  // No achievements/stats to show for now as a startup.
  // Instead, we'll show an image in the "Our Story" section.

  const services = [
    'Fixed Income',
    'IPO Investment Guidance',
    'Mutual Funds',
    'Life Insurance Plans',
    'Market Research & Analysis',
    'Insurance Planning'
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-purple-900 text-white py-20 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-8">
            <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium">
              <Building2 className="w-4 h-4" />
              <span>About Bullish Eyes</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              Your Trusted
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-400">
                Financial Partner
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-blue-100 max-w-4xl mx-auto leading-relaxed">
              Founded in 2018, Bullish Eyes has been at the forefront of the Indian financial markets, 
              providing a range of services to investors.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-xl">
                <Link href="/services">Our Services</Link>
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button variant="outline" size="lg" className="border-2 border-white text-white hover:bg-white hover:text-blue-900 px-8 py-4 rounded-xl">
                <Link href="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 grid gap-10 md:grid-cols-2">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-blue-900">Our Mission</h2>
            <p className="text-lg text-gray-700">
              To empower investors of all levels with the knowledge and tools to achieve their financial goals.
            </p>
          </div>
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-purple-900">Our Vision</h2>
            <p className="text-lg text-gray-700">
              To be the most trusted and innovative financial services provider in India, delivering exceptional value and customer satisfaction.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                  Our Journey
                </h2>
                <p className="text-lg text-gray-600 leading-relaxed mb-6">
                  Founded in 2018, Bullish Eyes has been at the forefront of the Indian financial markets, providing a range of services to investors. We began by offering stock broking services and assisting clients with basic equity knowledge and IPO investments. Over the years, we have grown into a full-fledged financial services provider.
                </p>
                <p className="text-lg text-gray-600 leading-relaxed">
                  Today, we serve thousands of investors across India, helping them achieve their financial goals through innovative solutions and personalized service.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {services.map((service, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700 text-sm">{service}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-3xl p-8 shadow-2xl flex items-center justify-center min-h-[220px]">
                {/* No achievements/stats to show for now as a startup. Instead, we'll show an image or illustration here. */}
                <img
                  src="https://i.postimg.cc/mggnGmVh/pexels-karolina-grabowska-5717726.jpg"
                  alt="Finance Growth"
                  className="w-auto h-auto object-contain mx-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <div className="inline-flex items-center space-x-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium">
              <Star className="w-4 h-4" />
              <span>Our Core Values</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              What Drives Us Forward
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our values are the foundation of everything we do, guiding our decisions and shaping our culture.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {coreValues.map((value, index) => (
              <Card key={index} className="group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-0 shadow-lg bg-white">
                <div className="p-8 text-center space-y-6">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${value.color} flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300`}>
                    <value.icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="space-y-3">
                    <h3 className="text-xl font-bold text-gray-900">{value.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{value.description}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <div className="inline-flex items-center space-x-2 bg-orange-100 text-orange-800 px-4 py-2 rounded-full text-sm font-medium">
              <Calendar className="w-4 h-4" />
              <span>Our Journey</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Milestones That Define Us
            </h2>
          </div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-px h-full w-0.5 bg-gradient-to-b from-blue-500 to-purple-600"></div>

            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <div key={index} className={`relative flex items-center ${
                  index % 2 === 0 ? 'justify-start' : 'justify-end'
                }`}>
                  {/* Timeline Dot */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full border-4 border-white shadow-lg z-10"></div>

                  {/* Content Card */}
                  <Card className={`w-5/12 ${
                    index % 2 === 0 ? 'mr-auto' : 'ml-auto'
                  } shadow-lg hover:shadow-xl transition-shadow duration-300`}>
                    <div className="p-6 space-y-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                          <milestone.icon className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <span className="text-2xl font-bold text-blue-600">{milestone.year}</span>
                          <h3 className="text-lg font-semibold text-gray-900">{milestone.title}</h3>
                        </div>
                      </div>
                      <p className="text-gray-600">{milestone.description}</p>
                    </div>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8 space-y-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Ready to Start Your Investment Journey?
          </h2>
          <p className="text-xl text-blue-100">
            Join thousands of satisfied investors who trust Bullish Eyes for their financial growth.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 rounded-xl font-semibold">
              Get Started Today
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button variant="outline" size="lg" className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 rounded-xl font-semibold">
              <Link href="/contact">Contact Our Team</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
