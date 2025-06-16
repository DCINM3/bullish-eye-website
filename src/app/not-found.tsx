'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Home, Search, Mail, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function NotFound() {
  const router = useRouter();
  const [countdown, setCountdown] = useState(8);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          router.push('/');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [router]);

  const handleGoHome = () => {
    router.push('/');
  };

  const handleGoBack = () => {
    router.back();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
      <div className="max-w-lg w-full">
        {/* 404 Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 text-center space-y-6">
          {/* 404 Number */}
          <div className="space-y-4">
            <div className="text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              404
            </div>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mx-auto"></div>
          </div>

          {/* Error Message */}
          <div className="space-y-3">
            <h1 className="text-2xl font-bold text-gray-900">
              Page Not Found
            </h1>
            <p className="text-gray-600 leading-relaxed">
              The page you're looking for doesn't exist or has been moved. 
              Our site might be under maintenance.
            </p>
          </div>

          {/* Contact Info */}
          <div className="bg-orange-50 rounded-lg p-4 space-y-2">
            <p className="text-sm text-gray-700 font-medium">
              Need help? Contact our support team:
            </p>
            <div className="flex items-center justify-center space-x-2 text-orange-600">
              <Mail className="w-4 h-4" />
              <a 
                href="mailto:contact@bullisheyes.com" 
                className="font-medium hover:underline"
              >
                contact@bullisheyes.com
              </a>
            </div>
          </div>

          {/* Auto Redirect Info */}
          <div className="bg-blue-50 rounded-lg p-4">
            <p className="text-sm text-gray-600">
              Redirecting to home page in{' '}
              <span className="font-bold text-blue-600">{countdown}</span> seconds
            </p>
            <div className="w-full bg-blue-200 rounded-full h-2 mt-2">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-1000"
                style={{ width: `${((8 - countdown) / 8) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              onClick={handleGoBack}
              variant="outline"
              className="flex-1 flex items-center justify-center space-x-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Go Back</span>
            </Button>
            <Button
              onClick={handleGoHome}
              className="flex-1 bg-blue-600 hover:bg-blue-700 flex items-center justify-center space-x-2"
            >
              <Home className="w-4 h-4" />
              <span>Go Home</span>
            </Button>
          </div>

          {/* Quick Links */}
          <div className="pt-4 border-t border-gray-200">
            <p className="text-sm text-gray-600 mb-3">Or try these popular pages:</p>
            <div className="flex flex-wrap justify-center gap-2">
              <Link 
                href="/about" 
                className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1 rounded-full transition-colors"
              >
                About Us
              </Link>
              <Link 
                href="/blog" 
                className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1 rounded-full transition-colors"
              >
                Blog
              </Link>
              <Link 
                href="/contact" 
                className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1 rounded-full transition-colors"
              >
                Contact
              </Link>
              <Link 
                href="/markets" 
                className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1 rounded-full transition-colors"
              >
                Markets
              </Link>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-6 text-center space-y-2">
          <p className="text-sm text-gray-500">
            Error Code: 404 | Time: {new Date().toLocaleTimeString()}
          </p>
          <p className="text-xs text-gray-400">
            If this problem persists, please contact our technical support team.
          </p>
        </div>
      </div>
    </div>
  );
}
