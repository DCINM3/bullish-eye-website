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
  MessageCircle,
  Newspaper
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

export default function NewsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>([]);
  const [featuredPosts, setFeaturedPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBlogs();
  }, []);

  useEffect(() => {
    filterPosts();
  }, [blogPosts, searchTerm]);

  const fetchBlogs = async () => {
    try {
      const response = await fetch('/api/blogs');
      if (response.ok) {
        const data = await response.json();
        // Filter only News category blogs
        const newsBlogs = data.filter((blog: BlogPost) => blog.category === 'News');
        setBlogPosts(newsBlogs);
        
        // Get featured posts from News category and sort by position
        const featured = newsBlogs
          .filter((post: BlogPost) => post.is_featured)
          .sort((a: BlogPost, b: BlogPost) => (a.featured_position || 1) - (b.featured_position || 1))
          .slice(0, 2);
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

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(post =>
        post.heading.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.subheading.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.author.toLowerCase().includes(searchTerm.toLowerCase())
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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-blue-900 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-8">
            <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium">
              <Newspaper className="w-4 h-4" />
              <span>Latest News</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              Market
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                News
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
              Stay updated with the latest financial news, market movements, and economic trends.
            </p>
          </div>
        </div>
      </section>

      {/* Search Section */}
      <section className="py-12 -mt-10 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="bg-white shadow-xl border-0 p-6">
            <div className="flex flex-col lg:flex-row gap-6 items-center">
              {/* Search */}
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  type="text"
                  placeholder="Search news articles..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-3 w-full border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </Card>
        </div>
      </section>

        {/* News Content Area with Loading Spinner */}
        <section className="py-12 min-h-[400px]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {loading ? (
              <div className="flex flex-col items-center justify-center py-24">
                <Loader className="w-12 h-12 animate-spin text-blue-600 mb-4" />
                <span className="text-lg text-gray-600">Loading news articles...</span>
              </div>
            ) : (
              <>
                {/* Featured News */}
                {featuredPosts.length > 0 && (
                  <section className="mb-12">
                    <div className="flex items-center space-x-2 mb-8">
                      <TrendingUp className="w-6 h-6 text-blue-600" />
                      <h2 className="text-2xl font-bold text-gray-900">Featured News</h2>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                      {featuredPosts.map((post) => (
                        <Card key={post._id} className="group overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-0">
                          <div className="relative h-64 overflow-hidden">
                            <Image
                              src={post.banner_image_url}
                              alt={post.heading}
                              fill
                              className="object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                            <div className="absolute top-4 left-4">
                              <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                                Featured
                              </span>
                            </div>
                            <div className="absolute top-4 right-4">
                              <span className="bg-gray-700 text-white px-3 py-1 rounded-full text-xs font-medium">
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
                            <Link href={`/news/${post.slug}`}>
                              <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300 line-clamp-2 cursor-pointer">
                                {post.heading}
                              </h3>
                            </Link>
                            <p className="text-gray-600 line-clamp-3">
                              {post.subheading}
                            </p>
                            <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                              <div className="text-sm text-gray-600">
                                <span className="inline-flex items-center space-x-1 bg-gray-100 text-gray-700 px-2 py-1 rounded-md text-xs">
                                  <Tag className="w-3 h-3" />
                                  <span>{post.category}</span>
                                </span>
                              </div>
                              <Link href={`/news/${post.slug}`}>
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

                {/* Regular News */}
                <section>
                  <div className="flex items-center justify-between mb-8">
                    <h2 className="text-2xl font-bold text-gray-900">Latest News</h2>
                    <span className="text-gray-600">{regularPosts.length} articles found</span>
                  </div>
                  {regularPosts.length === 0 ? (
                    <div className="text-center py-12">
                      <Newspaper className="w-16 h-16 mx-auto text-gray-300 mb-4" />
                      <h3 className="text-xl font-medium text-gray-900">No news articles found</h3>
                      <p className="text-gray-600 mt-2">Check back later for updates or try a different search term.</p>
                    </div>
                  ) : (
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
                            <Link href={`/news/${post.slug}`}>
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
                              </div>
                              <Link href={`/news/${post.slug}`}>
                                <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700 p-1">
                                  <ArrowRight className="w-4 h-4" />
                                </Button>
                              </Link>
                            </div>
                          </div>
                        </Card>
                      ))}
                    </div>
                  )}
                  
                  {/* Load More Button */}
                  {regularPosts.length > 9 && (
                    <div className="text-center mt-12">
                      <Button size="lg" variant="outline" className="px-8 py-3">
                        Load More News
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </div>
                  )}
                </section>
              </>
            )}
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="py-16 bg-gradient-to-r from-gray-800 to-blue-700">
          <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8 space-y-6">
            <h2 className="text-3xl font-bold text-white">
              Stay Updated with Market News
            </h2>
            <p className="text-xl text-blue-100">
              Subscribe to our newsletter and receive the latest financial news directly to your inbox.
            </p>
            <div className="flex justify-center max-w-md mx-auto">
              <NewsletterSubscription source="news" className="w-full" />
            </div>
          </div>
        </section>
    </div>
  );
}
