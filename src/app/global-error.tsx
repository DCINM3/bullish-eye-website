'use client';

import React, { useEffect, useState } from 'react';
import { AlertTriangle, Home, Mail, RefreshCw } from 'lucide-react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const [countdown, setCountdown] = useState(8);

  useEffect(() => {
    console.error('Global Error:', error);
    
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
    <html>
      <body className="bg-gradient-to-br from-gray-50 to-blue-50 min-h-screen flex items-center justify-center p-4">
        <div className="max-w-md w-full">
          <div className="bg-white rounded-2xl shadow-2xl p-8 text-center space-y-6">
            {/* Icon */}
            <div className="w-20 h-20 bg-gradient-to-br from-red-500 to-orange-500 rounded-full flex items-center justify-center mx-auto">
              <AlertTriangle className="w-10 h-10 text-white" />
            </div>

            {/* Title */}
            <div className="space-y-2">
              <h1 className="text-2xl font-bold text-gray-900">
                Critical System Error
              </h1>
              <p className="text-gray-600">
                We're experiencing a critical issue and are working to resolve it immediately.
              </p>
            </div>

            {/* Contact Info */}
            <div className="bg-red-50 rounded-lg p-4 space-y-2">
              <p className="text-sm text-gray-700 font-medium">
                For urgent assistance, please contact:
              </p>
              <div className="flex items-center justify-center space-x-2 text-red-600">
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
              <button
                onClick={reset}
                className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Try Again</span>
              </button>
              <button
                onClick={handleGoHome}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center space-x-2 px-4 py-2 rounded-lg transition-colors"
              >
                <Home className="w-4 h-4" />
                <span>Go Home</span>
              </button>
            </div>

            {/* Error Details */}
            <details className="text-left bg-gray-50 rounded-lg p-3">
              <summary className="text-sm font-medium text-gray-700 cursor-pointer">
                Technical Details
              </summary>
              <div className="mt-2 text-xs text-gray-600 font-mono">
                <p>Error: {error.message}</p>
                {error.digest && <p>Digest: {error.digest}</p>}
                <p>Time: {new Date().toISOString()}</p>
              </div>
            </details>
          </div>
        </div>
      </body>
    </html>
  );
}
