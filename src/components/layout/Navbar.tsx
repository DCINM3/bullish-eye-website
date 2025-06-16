'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { 
  Menu, 
  X, 
  TrendingUp, 
  BookOpen, 
  User, 
  Home,
  Info,
  Phone,
  ChevronDown
} from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);

  const navigation = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'About Us', href: '/about', icon: Info },
  ];
  const navigation2 = [
    { name: 'Blog', href: '/blog', icon: BookOpen },
    { name: 'Contact Us', href: '/contact', icon: Phone },
  ];

  const servicesLinks = [
    { name: 'Mutual Funds', href: '/services/mutual-funds', description: 'Smart Diversification. Reliable Growth.' },
    { name: 'NCDs & Bonds', href: '/services/fixed-income', description: 'Stability Meets Simplicity.' },
    { name: 'Unlisted Shares', href: '/services/unlisted-shares', description: 'Access Tomorrow\'s Leaders — Today.' },
    { name: 'Retirement Planning', href: '/services/retirement-plan', description: 'Live Your Second Innings with Confidence.' },
    { name: 'Insurance Planning', href: '/services/insurance-policy', description: 'Fortify Your Financial Foundation.' },
    { name: 'Structured Products', href: '/services/structure-product', description: 'Customized Portfolios. Controlled Risk.' },
    { name: 'IPO Investing', href: '/services/ipo-investing', description: 'Invest Early. Profit Early.' },
  ];

  return (
    <nav className="bg-white/95 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <img
              src="/logo.png"
              alt="Bullish Eyes Logo"
              className="w-auto h-14 rounded-lg"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 transition-colors duration-200 font-medium"
              >
                <span>{item.name}</span>
              </Link>
            ))}

            {/* Services Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setServicesOpen(true)}
              onMouseLeave={() => setServicesOpen(false)}
            >
              <Link href="/services" className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 transition-colors duration-200 font-medium">
                <span>Services</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${servicesOpen ? 'rotate-180' : ''}`} />
              </Link>
              {servicesOpen && (
                <div className="absolute left-0 mt-0 w-72 bg-white border border-gray-200 shadow-lg rounded-md z-50">
                  {servicesLinks.map(link => (
                    <Link key={link.name} href={link.href} className="block px-4 py-3 text-gray-700 hover:bg-gray-100 transition-colors duration-200">
                      <p className="font-medium">{link.name}</p>
                      {/* <p className="text-xs text-gray-500">{link.description}</p> */}
                    </Link>
                  ))}
                </div>
              )}
            </div>
            
            {navigation2.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 transition-colors duration-200 font-medium"
              >
                <span>{item.name}</span>
              </Link>
            ))}

          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden absolute top-16 left-0 w-full bg-white shadow-lg border-t border-gray-200" style={{ maxHeight: 'calc(100vh - 4rem)', overflowY: 'auto' }}>
            <div className="flex flex-col space-y-1 p-4">
              {[...navigation, ...navigation2].map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 rounded-md p-3 transition-colors duration-200"
                  onClick={() => setIsOpen(false)}
                >
                  <item.icon className="w-5 h-5" />
                  <span>{item.name}</span>
                </Link>
              ))}
              
              {/* Mobile Services Accordion */}
              <div className="flex flex-col">
                <button
                  onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                  className="flex items-center justify-between w-full text-gray-700 rounded-md p-3 transition-colors duration-200 font-medium"
                >
                  <Link href="/services" onClick={() => setIsOpen(false)} className='flex items-center space-x-2'><TrendingUp className="w-5 h-5" /><span>Services</span></Link>
                  <ChevronDown className={`w-5 h-5 transition-transform duration-200 ${mobileServicesOpen ? 'rotate-180' : ''}`} />
                </button>
                {mobileServicesOpen && (
                  <div className="flex flex-col pl-6">
                    {servicesLinks.map(link => (
                       <Link key={link.name} href={link.href} className="py-2 text-gray-600 hover:text-blue-600" onClick={() => setIsOpen(false)}>
                         {link.name}
                       </Link>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
