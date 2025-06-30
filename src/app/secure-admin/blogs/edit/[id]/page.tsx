'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import QuillEditor from '@/components/common/QuillEditor';
import { toast } from 'react-hot-toast';
import { 
  Save, 
  Eye, 
  ImageIcon, 
  Calendar,
  User,
  FileText,
  Type,
  ArrowLeft,
  Loader,
  Star,
  Tag
} from 'lucide-react';
import Link from 'next/link';

interface BlogData {
  _id: string;
  banner_image_url: string;
  heading: string;
  subheading: string;
  author: string;
  publish_date: string;
  content: string;
  slug: string;
  category?: string;
  is_featured?: boolean;
  featured_position?: number;
}

const categories = [
  'Education',
  'IPO',
  'Portfolio',
  'Tax Planning',
  'Investment',
  'Risk Management',
  'Insurance'
];

export default function AdminBlogEdit() {
  const router = useRouter();
  const params = useParams();
  const blogId = params.id as string;
  const [formData, setFormData] = useState({
    banner_image_url: '',
    heading: '',
    subheading: '',
    author: '',
    publish_date: '',
    content: '',
    category: '',
    is_featured: false,
    featured_position: 1
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [originalSlug, setOriginalSlug] = useState('');

  useEffect(() => {
    if (blogId) {
      fetchBlog();
    }
  }, [blogId]);

  const fetchBlog = async () => {
    try {
      const response = await fetch(`/api/blogs/${blogId}`);
      if (response.ok) {
        const blog: BlogData = await response.json();        setFormData({
          banner_image_url: blog.banner_image_url || '',
          heading: blog.heading || '',
          subheading: blog.subheading || '',
          author: blog.author || '',
          publish_date: blog.publish_date ? new Date(blog.publish_date).toISOString().split('T')[0] : '',
          content: blog.content || '',
          category: blog.category || '',
          is_featured: blog.is_featured || false,
          featured_position: blog.featured_position || 1
        });
        setOriginalSlug(blog.slug);
      } else {
        toast.error('Blog not found');
        router.push('/secure-admin/blogs');
      }
    } catch (error) {
      console.error('Error fetching blog:', error);
      toast.error('Error loading blog');
      router.push('/secure-admin/blogs');
    } finally {
      setIsLoading(false);
    }
  };
  const handleInputChange = (field: string, value: string | boolean | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.heading || !formData.author || !formData.publish_date || !formData.content || !formData.category) {
      toast.error('Please fill all required fields');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(`/api/blogs/${blogId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {
        toast.success('Blog updated successfully!');
        router.push('/secure-admin/blogs');
      } else {
        toast.error(data.message || 'Failed to update blog');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('An error occurred while updating the blog');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePreview = () => {
    // Store current form data in localStorage for preview
    localStorage.setItem('blog-preview', JSON.stringify({
      ...formData,
      slug: originalSlug
    }));
    window.open('/secure-admin/blogs/preview', '_blank');
  };
  if (isLoading) {
    return (
      <div className="py-8 flex items-center justify-center">
        <div className="text-center">
          <Loader className="w-8 h-8 animate-spin mx-auto mb-4 text-blue-600" />
          <p className="text-gray-600">Loading blog...</p>
        </div>
      </div>
    );
  }
  return (
    <div className="py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-4 mb-4">
            <Link href="/secure-admin/blogs">
              <Button variant="outline" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Blogs
              </Button>
            </Link>
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Edit Blog Post</h1>
          <p className="text-gray-600 mt-2">
            Update your blog content and settings.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Banner Image */}
          <Card className="p-6">
            <div className="flex items-center space-x-2 mb-4">
              <ImageIcon className="w-5 h-5 text-blue-600" />
              <h2 className="text-lg font-semibold">Banner Image</h2>
            </div>
            <div className="space-y-4">
              <Input
                type="url"
                placeholder="https://i.postimg.cc/your-image-url"
                value={formData.banner_image_url}
                onChange={(e) => handleInputChange('banner_image_url', e.target.value)}
                className="w-full"
              />
              <p className="text-sm text-gray-600">
                Upload your image to <a href="https://postimg.cc" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">PostImage</a> and paste the direct link here.
              </p>
              {formData.banner_image_url && (
                <div className="relative h-48 bg-gray-100 rounded-lg overflow-hidden">
                  <img
                    src={formData.banner_image_url}
                    alt="Banner preview"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                </div>
              )}
            </div>
          </Card>

          {/* Basic Information */}
          <Card className="p-6">
            <div className="flex items-center space-x-2 mb-4">
              <Type className="w-5 h-5 text-blue-600" />
              <h2 className="text-lg font-semibold">Basic Information</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label htmlFor="heading" className="block text-sm font-medium text-gray-700 mb-2">
                  Heading *
                </label>
                <Input
                  id="heading"
                  type="text"
                  required
                  placeholder="Enter blog heading"
                  value={formData.heading}
                  onChange={(e) => handleInputChange('heading', e.target.value)}
                  className="w-full"
                />
              </div>

              <div className="md:col-span-2">
                <label htmlFor="subheading" className="block text-sm font-medium text-gray-700 mb-2">
                  Subheading
                </label>
                <Textarea
                  id="subheading"
                  placeholder="Brief description or subtitle"
                  value={formData.subheading}
                  onChange={(e) => handleInputChange('subheading', e.target.value)}
                  className="w-full"
                  rows={2}
                />
              </div>

              <div>
                <label htmlFor="author" className="block text-sm font-medium text-gray-700 mb-2">
                  <User className="w-4 h-4 inline mr-1" />
                  Author *
                </label>
                <Input
                  id="author"
                  type="text"
                  required
                  placeholder="Author name"
                  value={formData.author}
                  onChange={(e) => handleInputChange('author', e.target.value)}
                  className="w-full"
                />
              </div>              <div>
                <label htmlFor="publish_date" className="block text-sm font-medium text-gray-700 mb-2">
                  <Calendar className="w-4 h-4 inline mr-1" />
                  Publish Date *
                </label>
                <Input
                  id="publish_date"
                  type="date"
                  required
                  value={formData.publish_date}
                  onChange={(e) => handleInputChange('publish_date', e.target.value)}
                  className="w-full"
                />
              </div>

              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                  <Tag className="w-4 h-4 inline mr-1" />
                  Category *
                </label>
                <select
                  id="category"
                  required
                  value={formData.category}
                  onChange={(e) => handleInputChange('category', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select a category</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              <div className="md:col-span-2">
                <div className="flex items-center space-x-4 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                  <input
                    type="checkbox"
                    id="is_featured"
                    checked={formData.is_featured}
                    onChange={(e) => handleInputChange('is_featured', e.target.checked)}
                    className="w-4 h-4 text-yellow-600 bg-gray-100 border-gray-300 rounded focus:ring-yellow-500"
                  />
                  <label htmlFor="is_featured" className="flex items-center text-sm font-medium text-gray-700">
                    <Star className="w-4 h-4 mr-2 text-yellow-500" />
                    Mark as Featured Article
                  </label>
                </div>
                
                {formData.is_featured && (
                  <div className="mt-4">
                    <label htmlFor="featured_position" className="block text-sm font-medium text-gray-700 mb-2">
                      Featured Position (1 or 2)
                    </label>
                    <select
                      id="featured_position"
                      value={formData.featured_position}
                      onChange={(e) => handleInputChange('featured_position', parseInt(e.target.value))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value={1}>Position 1 (Left/Top)</option>
                      <option value={2}>Position 2 (Right/Bottom)</option>
                    </select>
                    <p className="text-xs text-gray-600 mt-1">
                      Choose position 1 or 2. Previous article in selected position will be replaced.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </Card>

          {/* Content */}
          <Card className="p-6">
            <div className="flex items-center space-x-2 mb-4">
              <FileText className="w-5 h-5 text-blue-600" />
              <h2 className="text-lg font-semibold">Content *</h2>
            </div>
            <QuillEditor
              content={formData.content}
              onUpdate={(content) => handleInputChange('content', content)}
              placeholder="Write your blog content here..."
            />
          </Card>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-end">
            <Button
              type="button"
              variant="outline"
              onClick={handlePreview}
              className="flex items-center space-x-2"
            >
              <Eye className="w-4 h-4" />
              <span>Preview</span>
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-blue-600 hover:bg-blue-700 flex items-center space-x-2"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Updating...</span>
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  <span>Update Blog</span>
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
