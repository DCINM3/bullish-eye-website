'use client';

import React, { Component, ReactNode } from 'react';
import { AlertTriangle, Home, Mail, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
  errorInfo?: React.ErrorInfo;
}

class ErrorBoundary extends Component<Props, State> {
  private redirectTimer?: NodeJS.Timeout;

  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by Error Boundary:', error, errorInfo);
    this.setState({ error, errorInfo });
    
    // Start auto-redirect timer
    this.redirectTimer = setTimeout(() => {
      window.location.href = '/';
    }, 8000);
  }

  componentWillUnmount() {
    if (this.redirectTimer) {
      clearTimeout(this.redirectTimer);
    }
  }

  handleRetry = () => {
    if (this.redirectTimer) {
      clearTimeout(this.redirectTimer);
    }
    this.setState({ hasError: false, error: undefined, errorInfo: undefined });
  };

  handleGoHome = () => {
    if (this.redirectTimer) {
      clearTimeout(this.redirectTimer);
    }
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      return <ErrorFallback onRetry={this.handleRetry} onGoHome={this.handleGoHome} />;
    }

    return this.props.children;
  }
}

interface ErrorFallbackProps {
  onRetry: () => void;
  onGoHome: () => void;
}

function ErrorFallback({ onRetry, onGoHome }: ErrorFallbackProps) {
  const [countdown, setCountdown] = React.useState(8);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Error Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 text-center space-y-6">
          {/* Icon */}
          <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto">
            <AlertTriangle className="w-10 h-10 text-white" />
          </div>

          {/* Title */}
          <div className="space-y-2">
            <h1 className="text-2xl font-bold text-gray-900">
              Site Under Maintenance
            </h1>
            <p className="text-gray-600">
              We're experiencing technical difficulties and are working to resolve the issue.
            </p>
          </div>

          {/* Contact Info */}
          <div className="bg-blue-50 rounded-lg p-4 space-y-2">
            <p className="text-sm text-gray-700 font-medium">
              For immediate assistance, please contact:
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
              Automatically redirecting to home page in{' '}
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
              onClick={onRetry}
              variant="outline"
              className="flex-1 flex items-center justify-center space-x-2"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Try Again</span>
            </Button>
            <Button
              onClick={onGoHome}
              className="flex-1 bg-blue-600 hover:bg-blue-700 flex items-center justify-center space-x-2"
            >
              <Home className="w-4 h-4" />
              <span>Go Home</span>
            </Button>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500">
            Error ID: {Date.now().toString(36).toUpperCase()}
          </p>
        </div>
      </div>
    </div>
  );
}

export default ErrorBoundary;
