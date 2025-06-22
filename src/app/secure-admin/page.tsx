'use client';

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, Plus, Settings, BarChart3, Mail, MessageSquare, Package } from 'lucide-react';
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
        </div>        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Link href="/secure-admin/blogs">
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

          <Link href="/secure-admin/blogs/create">
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

          <Link href="/secure-admin/products">
            <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
              <div className="flex items-center">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <Package className="w-6 h-6 text-orange-600" />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-gray-900">Manage Products</h3>
                  <p className="text-sm text-gray-600">View and edit products</p>
                </div>
              </div>
            </Card>
          </Link>

          <Link href="/secure-admin/products/create">
            <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
              <div className="flex items-center">
                <div className="p-2 bg-teal-100 rounded-lg">
                  <Plus className="w-6 h-6 text-teal-600" />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-gray-900">New Product</h3>
                  <p className="text-sm text-gray-600">Add a new product</p>
                </div>
              </div>
            </Card>
          </Link>

          <Link href="/secure-admin/newsletter">
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

          <Link href="/secure-admin/contact">
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
        </div>        {/* Go to Management sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="p-6 text-center">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Blog Management</h3>
            <p className="text-gray-600 mb-4">Manage your blog posts and articles</p>
            <Link href="/secure-admin/blogs">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">Go to Blog Management</Button>
            </Link>
          </Card>

          <Card className="p-6 text-center">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Product Management</h3>
            <p className="text-gray-600 mb-4">Manage products for your service pages</p>
            <Link href="/secure-admin/products">
              <Button className="bg-orange-600 hover:bg-orange-700 text-white">Go to Product Management</Button>
            </Link>
          </Card>
        </div>
      </div>
    </div>
  );
}
