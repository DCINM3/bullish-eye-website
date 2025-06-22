'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const serviceOptions = [
  { value: 'mutual-funds', label: 'Mutual Funds' },
  { value: 'life-insurance', label: 'Life Insurance' },
  { value: 'ipo-investing', label: 'IPO Investing' },
  { value: 'fixed-income', label: 'Fixed Income' },
  { value: 'retirement-plan', label: 'Retirement Plan' },
  { value: 'unlisted-shares', label: 'Unlisted Shares' },
  { value: 'structure-product', label: 'Structure Product' },
  { value: 'insurance-policy', label: 'Insurance Policy' },
];

export default function CreateProductPage() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    service: '',
    link: '',
    isActive: true,
  });
  const router = useRouter();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to create product');
      }

      router.push('/secure-admin/products');
    } catch (error) {
      alert('Error creating product: ' + (error instanceof Error ? error.message : 'Unknown error'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <div className="flex items-center mb-6">
        <Link href="/secure-admin/products">
          <Button variant="outline" size="sm" className="mr-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
        </Link>
        <h1 className="text-3xl font-bold text-gray-900">Create Product</h1>
      </div>

      <Card className="max-w-2xl">
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div>
            <Label htmlFor="title">Product Title *</Label>
            <Input
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              required
              placeholder="Enter product title"
            />
          </div>

          <div>
            <Label htmlFor="description">Description *</Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              required
              placeholder="Enter product description"
              rows={4}
            />
          </div>

          <div>
            <Label htmlFor="service">Service *</Label>
            <select
              id="service"
              name="service"
              value={formData.service}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select service</option>
              {serviceOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <Label htmlFor="link">Product Link (Optional)</Label>
            <Input
              id="link"
              name="link"
              value={formData.link}
              onChange={handleInputChange}
              placeholder="https://example.com/product-page"
            />
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="isActive"
              name="isActive"
              checked={formData.isActive}
              onChange={handleInputChange}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <Label htmlFor="isActive">Active (show on website)</Label>
          </div>

          <div className="flex gap-4 pt-4">
            <Button type="submit" disabled={loading} className="bg-blue-600 hover:bg-blue-700 text-white">
              {loading ? 'Creating...' : 'Create Product'}
            </Button>
            <Link href="/secure-admin/products">
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </Link>
          </div>
        </form>
      </Card>
    </div>
  );
}
