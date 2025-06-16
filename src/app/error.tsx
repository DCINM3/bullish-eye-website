'use client';

import React, { useEffect, useState } from 'react';
import { AlertTriangle, Home, Mail, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const [countdown, setCountdown] = useState(8);

  useEffect(() => {
    console.error('Route Error:', error);
    
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          window.location.href = '/';
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [error]);

  const handleGoHome = () => {
    window.location.href = '/';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-2xl p-8 text-center space-y-6">
          {/* Icon */}
          <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto">
            <AlertTriangle className="w-10 h-10 text-white" />
          </div>

          {/* Title */}
          <div className="space-y-2">
            <h1 className="text-2xl font-bold text-gray-900">
              Page Under Maintenance
            </h1>
            <p className="text-gray-600">
              This page is temporarily unavailable due to maintenance. Please try again later.
            </p>
          </div>

          {/* Contact Info */}
          <div className="bg-blue-50 rounded-lg p-4 space-y-2">
            <p className="text-sm text-gray-700 font-medium">
              Need immediate help? Contact us:
            </p>
            <div className="flex items-center justify-center space-x-2 text-blue-600">
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
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-sm text-gray-600">
              Redirecting to home page in{' '}
              <span className="font-bold text-blue-600">{countdown}</span> seconds
            </p>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-1000"
                style={{ width: `${((8 - countdown) / 8) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              onClick={reset}
              variant="outline"
              className="flex-1 flex items-center justify-center space-x-2"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Try Again</span>
            </Button>
            <Button
              onClick={handleGoHome}
              className="flex-1 bg-blue-600 hover:bg-blue-700 flex items-center justify-center space-x-2"
            >
              <Home className="w-4 h-4" />
              <span>Go Home</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
