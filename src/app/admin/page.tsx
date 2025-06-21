'use client';

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, Plus, Settings, BarChart3, Mail, MessageSquare } from 'lucide-react';
import Link from 'next/link';

export default function AdminDashboard() {
  return (
    <div className="py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-2">
            Welcome to the Bullish Eyes admin panel
          </p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Link href="/admin/blogs">
            <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
              <div className="flex items-center">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <FileText className="w-6 h-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-gray-900">Manage Blogs</h3>
                  <p className="text-sm text-gray-600">Create and edit blog posts</p>
                </div>
              </div>
            </Card>
          </Link>

          <Link href="/admin/blogs/create">
            <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
              <div className="flex items-center">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Plus className="w-6 h-6 text-green-600" />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-gray-900">New Post</h3>
                  <p className="text-sm text-gray-600">Create a new blog post</p>
                </div>
              </div>
            </Card>
          </Link>
          <Link href="/admin/newsletter">
            <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
              <div className="flex items-center">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Mail className="w-6 h-6 text-purple-600" />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-gray-900">Newsletter</h3>
                  <p className="text-sm text-gray-600">Manage subscribers</p>
                </div>
              </div>
            </Card>
          </Link>
          <Link href="/admin/contact">
            <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
              <div className="flex items-center">
                <div className="p-2 bg-yellow-100 rounded-lg">
                  <BarChart3 className="w-6 h-6 text-yellow-600" />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-gray-900">Contact Form Data</h3>
                  <p className="text-sm text-gray-600">View submissions</p>
                </div>
              </div>
            </Card>
          </Link>
          
        </div>

        {/* Go to Blog Management section */}
        <Card className="p-6 text-center">
          <p className="text-gray-600 mb-4">Want to manage your blogs?</p>
          <Link href="/admin/blogs">
            <Button>Go to Blog Management</Button>
          </Link>
        </Card>
      </div>
    </div>
  );
}
