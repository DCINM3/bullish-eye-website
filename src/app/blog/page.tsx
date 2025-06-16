'use client';

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import NewsletterSubscription from '@/components/common/NewsletterSubscription';
import { 
  Search, 
  Calendar, 
  Clock, 
  User, 
  Tag,
  TrendingUp,
  BookOpen,
  Filter,
  ArrowRight,
  Eye,
  Star,
  Loader,
  MessageCircle
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

interface BlogPost {
  _id: string;
  heading: string;
  subheading: string;
  content: string;
  author: string;
  publish_date: string;
  banner_image_url: string;
  slug: string;
  category?: string;
  is_featured?: boolean;
  featured_position?: number;
  created_at: string;
  updated_at: string;
}

const categories = [
  'All',
  'Education',
  'IPO',
  'Portfolio',
  'Tax Planning',
  'Investment',
  'Risk Management',
  'Insurance'
];

export default function BlogPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>([]);
  const [featuredPosts, setFeaturedPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBlogs();
  }, []);

  useEffect(() => {
    filterPosts();
  }, [blogPosts, searchTerm, selectedCategory]);

  const fetchBlogs = async () => {
    try {
      const response = await fetch('/api/blogs');
      if (response.ok) {
        const data = await response.json();
        setBlogPosts(data);
        // Get featured posts
        const featured = data.filter((post: BlogPost) => post.is_featured).slice(0, 2);
        setFeaturedPosts(featured);
      }
    } catch (error) {
      console.error('Error fetching blogs:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterPosts = () => {
    let filtered = blogPosts;

    // Filter by category
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(post => post.category === selectedCategory);
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(post =>
        post.heading.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.subheading.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.category?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredPosts(filtered);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const calculateReadTime = (content: string) => {
    const wordsPerMinute = 200;
    const wordCount = content.replace(/<[^>]*>/g, '').split(' ').length;
    return Math.ceil(wordCount / wordsPerMinute);
  };
  
  // All posts are now considered "regular posts" for the main feed
  const regularPosts = filteredPosts;

  // Remove full-page loading. Instead, show loading spinner only in the blog content area.

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-purple-900 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-8">
            <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium">
              <BookOpen className="w-4 h-4" />
              <span>Financial Insights</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              Investment
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-400">
                Insights
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
              Stay updated with the latest market trends, investment strategies, and financial insights from our experts.
            </p>
          </div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-12 -mt-10 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="bg-white shadow-xl border-0 p-6">
            <div className="flex flex-col lg:flex-row gap-6 items-center">
              {/* Search */}
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  type="text"
                  placeholder="Search articles, topics, or tags..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-3 w-full border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Category Filter */}
              <div className="flex items-center space-x-2">
                <Filter className="w-5 h-5 text-gray-600" />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
            </div>
          </Card>
        </div>
      </section>

        {/* Blog Content Area with Loading Spinner */}
        <section className="py-12 min-h-[400px]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {loading ? (
          <div className="flex flex-col items-center justify-center py-24">
            <Loader className="w-12 h-12 animate-spin text-blue-600 mb-4" />
            <span className="text-lg text-gray-600">Loading articles...</span>
          </div>
            ) : (
          <>
            {/* Featured Posts */}
            {featuredPosts.length > 0 && (
              <section className="mb-12">
            <div className="flex items-center space-x-2 mb-8">
              <TrendingUp className="w-6 h-6 text-orange-600" />
              <h2 className="text-2xl font-bold text-gray-900">Featured Articles</h2>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {featuredPosts.map((post) => (
                <Card key={post._id} className="group overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-0">
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={post.banner_image_url || 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&h=400&fit=crop'}
                  alt={post.heading}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                Featured
                  </span>
                </div>
                <div className="absolute top-4 right-4">
                  <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-medium">
                {post.category}
                  </span>
                </div>
              </div>
              <div className="p-6 space-y-4">
                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  <div className="flex items-center space-x-1">
                <User className="w-4 h-4" />
                <span>{post.author}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                <Calendar className="w-4 h-4" />
                <span>{formatDate(post.publish_date)}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                <Clock className="w-4 h-4" />
                <span>{calculateReadTime(post.content)} min read</span>
                  </div>
                </div>
                <Link href={`/blog/${post.slug}`}>
                  <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300 line-clamp-2 cursor-pointer">
                {post.heading}
                  </h3>
                </Link>
                <p className="text-gray-600 line-clamp-3">
                  {post.subheading}
                </p>
                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                  <div className="text-sm text-gray-600">
                {post.category && (
                  <span className="inline-flex items-center space-x-1 bg-gray-100 text-gray-700 px-2 py-1 rounded-md text-xs">
                    <Tag className="w-3 h-3" />
                    <span>{post.category}</span>
                  </span>
                )}
                  </div>
                  <Link href={`/blog/${post.slug}`}>
                <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700 hover:bg-blue-50">
                  Read More
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
                  </Link>
                </div>
              </div>
                </Card>
              ))}
            </div>
              </section>
            )}

            {/* Regular Posts */}
            <section>
              <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-gray-900">Latest Articles</h2>
            <span className="text-gray-600">{regularPosts.length} articles found</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {regularPosts.map((post) => (
              <Card key={post._id} className="group overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0">
                <div className="relative h-48 overflow-hidden">
              <Image
                src={post.banner_image_url || 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&h=400&fit=crop'}
                alt={post.heading}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute top-3 right-3">
                <span className="bg-blue-600 text-white px-2 py-1 rounded text-xs font-medium">
                  {post.category}
                </span>
              </div>
                </div>
                <div className="p-6 space-y-4">
              <div className="flex items-center space-x-3 text-xs text-gray-600">
                <div className="flex items-center space-x-1">
                  <User className="w-3 h-3" />
                  <span>{post.author}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock className="w-3 h-3" />
                  <span>{calculateReadTime(post.content)} min</span>
                </div>
              </div>
              <Link href={`/blog/${post.slug}`}>
                <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300 line-clamp-2 cursor-pointer">
                  {post.heading}
                </h3>
              </Link>
              <p className="text-gray-600 text-sm line-clamp-3">
                {post.subheading}
              </p>
              <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                <div className="flex items-center space-x-3 text-xs text-gray-600">
                  <span>{formatDate(post.publish_date)}</span>
                  {post.category && (
                <>
                  <span>•</span>
                  <span>{post.category}</span>
                </>
                  )}
                </div>
                <Link href={`/blog/${post.slug}`}>
                  <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700 p-1">
                <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
                </div>
              </Card>
            ))}
              </div>
              {/* Load More Button */}
              <div className="text-center mt-12">
            <Button size="lg" variant="outline" className="px-8 py-3">
              Load More Articles
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
              </div>
            </section>
          </>
            )}
          </div>
        </section>      {/* Newsletter Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8 space-y-6">
          <h2 className="text-3xl font-bold text-white">
            Stay Updated with Market Insights
          </h2>
          <p className="text-xl text-blue-100">
            Subscribe to our newsletter and never miss important financial updates and investment opportunities.
          </p>
          <div className="flex justify-center max-w-md mx-auto">
            <NewsletterSubscription source="blog" className="w-full" />
          </div>
        </div>
      </section>
    </div>
  );
}
