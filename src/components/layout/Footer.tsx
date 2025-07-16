import Link from 'next/link';
import NewsletterSubscription from '@/components/common/NewsletterSubscription';
import { 
  TrendingUp, 
  Mail, 
  Phone, 
  MapPin,
  Youtube,
  Twitter,
  Linkedin,
  X,
  Instagram,
  Facebook
} from 'lucide-react';
import WhatsAppIcon from '../icons/WhatsAppIcon';
import XIcon from '../icons/XIcon';


export default function Footer() {
  const quickLinks = [
    { name: 'About Us', href: '/about' },
    { name: 'Blog', href: '/blog' },
    { name: 'Contact Us', href: '/contact' },
    {name : 'Careers', href: '/careers'},
    {name : 'Disclosure', href: '/other/disclosure'},
  ];

  const services = [
    { name: 'Mutual Funds', href: '/services/mutual-funds' },
    { name: 'Fixed Income', href: '/services/fixed-income' },
    { name: 'Unlisted Shares', href: '/services/unlisted-shares' },
    { name: 'Retirement Plan', href: '/services/retirement-plan' },
    { name: 'Insurance Policy', href: '/services/insurance-policy' },
    { name: 'Structure Product', href: '/services/structure-product' },
  ];

  const socialLinks = [
    // { name: 'YouTube', icon: Youtube, href: 'https://youtube.com/@deepakchoudhary9620?si=1w6GTCGoMjnDcyoO', color: 'hover:text-red-400' },
    { name: 'X', icon: XIcon, href: 'https://x.com/Bullish_Eyes', color: 'hover:text-blue-400' },
    { name: 'LinkedIn', icon: Linkedin, href: 'https://www.linkedin.com/company/bullish-eyes/?viewAsMember=true', color: 'hover:text-blue-500' },
    { name: 'Instagram', icon: Instagram, href: 'https://www.instagram.com/bullish_eyes/', color: 'hover:text-pink-500' },
    { name: 'Facebook', icon: Facebook, href: 'https://www.facebook.com/bullisheyes.in/', color: 'hover:text-blue-600' },
    { name: 'WhatsApp', icon: WhatsAppIcon, href: 'https://whatsapp.com/channel/0029VavVqqiDzgTEsxg5ta2s', color: 'hover:text-green-500' },
  ];

  return (
    <footer className="bg-slate-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold text-white">Bullish Eyes</span>
                <span className="text-xs text-orange-400">Your Financial Partner</span>
              </div>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed">
              Empowering investors with knowledge and tools to achieve their financial goals. 
              Your journey to financial freedom starts here.
            </p>
            <div className="space-y-2 text-sm text-gray-400">
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-orange-400" />
                <span className="text-gray-300">contact@bullisheyes.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-orange-400" />
                <span className="text-gray-300">+91 91750 10080</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-orange-400" />
                <span className="text-gray-300">Mumbai, Maharashtra, India</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-gray-400 hover:text-orange-400 transition-colors duration-200 text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Our Services</h3>
            <ul className="space-y-2">
              {services.map((service) => (
                <li key={service.name}>
                  <Link 
                    href={service.href}
                    className="text-gray-400 hover:text-orange-400 transition-colors duration-200 text-sm"
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Media & Newsletter */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Connect With Us</h3>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <Link
                  key={social.name}
                  href={social.href}
                  className={`text-gray-400 ${social.color} transition-colors duration-200`}
                >
                  <social.icon className="w-5 h-5" />
                </Link>
              ))}
            </div>            <div className="space-y-3">
              <p className="text-sm text-gray-300 font-medium">Subscribe to our newsletter</p>
              <NewsletterSubscription source="footer" />
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t border-slate-800">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-gray-400">
              Copyright © 2025 Bullish Eyes. All rights reserved.
            </p>
            <div className="flex space-x-6 text-sm text-gray-400">
              <Link href="/other/privacy-policy" className="hover:text-orange-400 transition-colors duration-200">
                Privacy Policy
              </Link>
              <Link href="/other/terms-and-condition" className="hover:text-orange-400 transition-colors duration-200">
                Terms of Service
              </Link>
              <Link href="/other/disclaimer" className="hover:text-orange-400 transition-colors duration-200">
                Disclaimer
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
