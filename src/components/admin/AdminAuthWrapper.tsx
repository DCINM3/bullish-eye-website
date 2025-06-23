'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { toast } from 'react-hot-toast';
import { ShieldCheck, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AdminRole, hasPermission, Permission } from '@/types/admin';

interface AdminAuthWrapperProps {
  children: React.ReactNode;
  requiredPermission?: Permission;
}

interface AdminData {
  email: string;
  name: string;
  role: AdminRole;
}

export default function AdminAuthWrapper({ children, requiredPermission }: AdminAuthWrapperProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [adminData, setAdminData] = useState<AdminData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkAuthentication();
  }, []);

  const checkAuthentication = async () => {
    try {
      console.log('Checking authentication...');
      const response = await fetch('/api/admin/auth', {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Cache-Control': 'no-cache',
        },
      });
      
      console.log('Auth check response status:', response.status);
      
      if (response.ok) {
        const data = await response.json();
        console.log('Auth check successful:', data);
        setIsAuthenticated(true);
        setAdminData(data.admin);
        
        // Check permission if required
        if (requiredPermission && !hasPermission(data.admin.role, requiredPermission)) {
          console.log('Permission denied:', requiredPermission);
          toast.error('You do not have permission to access this page');
          router.push('/secure-admin');
          return;
        }
        
        setIsLoading(false);
        return;
      }
      
      // If not authenticated, redirect to login
      console.log('Auth check failed, redirecting to login');
      setIsAuthenticated(false);
      setAdminData(null);
      setIsLoading(false);
      if (pathname !== '/secure-admin/login') {
        router.push('/secure-admin/login');
      }
    } catch (error) {
      console.error('Auth check error:', error);
      setIsAuthenticated(false);
      setAdminData(null);
      setIsLoading(false);

      if (pathname !== '/secure-admin/login') {
        router.push('/secure-admin/login');
      }
    }
  };

  const handleLogout = async () => {
    try {
      console.log('Logging out...');
      await fetch('/api/admin/auth', { 
        method: 'DELETE',
        credentials: 'include'
      });
      setIsAuthenticated(false);
      setAdminData(null);
      toast.success('Logged out successfully');
      router.push('/secure-admin/login');
    } catch (error) {
      console.error('Logout error:', error);
      toast.error('Logout failed');
    }
  };

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Verifying authentication...</p>
        </div>
      </div>
    );
  }

  // If not authenticated, only show children on the login page
  if (!isAuthenticated) {
    if (pathname === '/secure-admin/login') {
      return <>{children}</>;
    }
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Redirecting to login...</p>
        </div>
      </div>
    );
  }

  // Show admin content with header
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Admin Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <ShieldCheck className="w-6 h-6 text-blue-600" />
              <h1 className="text-lg font-semibold text-gray-900">Admin Panel</h1>
              <span className="text-sm text-gray-500">•</span>
              <span className="text-sm text-gray-600">Bullish Eyes</span>
            </div>
            
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">
                Welcome, {adminData?.name} ({adminData?.role.replace('_', ' ')})
              </span>
              <Button
                onClick={handleLogout}
                variant="outline"
                size="sm"
                className="flex items-center space-x-2"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Admin Content */}
      <div>
        {children}
      </div>
    </div>
  );
}
