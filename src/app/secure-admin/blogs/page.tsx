'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Plus, 
  Search, 
  Edit3, 
  Trash2, 
  Eye, 
  Calendar,
  User,
  Filter
} from 'lucide-react';
import { toast } from 'react-hot-toast';

interface Blog {
  _id: string;
  heading: string;
  subheading: string;
  author: string;
  publish_date: string;
  banner_image_url: string;
  slug: string;
  created_at: string;
  updated_at: string;
}

export default function AdminBlogsPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [filteredBlogs, setFilteredBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'date' | 'title' | 'author'>('date');

  useEffect(() => {
    fetchBlogs();
  }, []);

  useEffect(() => {
    filterAndSortBlogs();
  }, [blogs, searchTerm, sortBy]);

  const fetchBlogs = async () => {
    try {
      const response = await fetch('/api/blogs');
      if (response.ok) {
        const data = await response.json();
        setBlogs(data);
      } else {
        toast.error('Failed to fetch blogs');
      }
    } catch (error) {
      console.error('Error fetching blogs:', error);
      toast.error('Error loading blogs');
    } finally {
      setLoading(false);
    }
  };

  const filterAndSortBlogs = () => {
    let filtered = blogs.filter(blog =>
      blog.heading.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.subheading.toLowerCase().includes(searchTerm.toLowerCase())
    );

    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'title':
          return a.heading.localeCompare(b.heading);
        case 'author':
          return a.author.localeCompare(b.author);
        case 'date':
        default:
          return new Date(b.publish_date).getTime() - new Date(a.publish_date).getTime();
      }
    });

    setFilteredBlogs(filtered);
  };

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete "${title}"?`)) {
      return;
    }

    try {
      const response = await fetch(`/api/blogs/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setBlogs(blogs.filter(blog => blog._id !== id));
        toast.success('Blog deleted successfully');
      } else {
        toast.error('Failed to delete blog');
      }
    } catch (error) {
      console.error('Error deleting blog:', error);
      toast.error('Error deleting blog');
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };
  if (loading) {
    return (
      <div className="py-8 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading blogs...</p>
        </div>
      </div>
    );
  }
  return (
    <div className="py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Blog Management</h1>
              <p className="text-gray-600 mt-2">
                Manage your blog posts - create, edit, and delete articles
              </p>
            </div>
            <Link href="/admin/blogs/create">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold">
                <Plus className="w-4 h-4 mr-2" />
                Create New Blog
              </Button>
            </Link>
          </div>
        </div>

        {/* Search and Filter */}
        <Card className="p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search blogs by title, author, or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-gray-500" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'date' | 'title' | 'author')}
                className="px-3 py-2 border border-gray-300 rounded-md bg-white text-sm"
              >
                <option value="date">Sort by Date</option>
                <option value="title">Sort by Title</option>
                <option value="author">Sort by Author</option>
              </select>
            </div>
          </div>
        </Card>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Eye className="w-6 h-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Blogs</p>
                <p className="text-2xl font-bold text-gray-900">{blogs.length}</p>
              </div>
            </div>
          </Card>
          <Card className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <Calendar className="w-6 h-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">This Month</p>
                <p className="text-2xl font-bold text-gray-900">
                  {blogs.filter(blog => {
                    const blogDate = new Date(blog.publish_date);
                    const currentDate = new Date();
                    return blogDate.getMonth() === currentDate.getMonth() && 
                           blogDate.getFullYear() === currentDate.getFullYear();
                  }).length}
                </p>
              </div>
            </div>
          </Card>
          <Card className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <User className="w-6 h-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Authors</p>
                <p className="text-2xl font-bold text-gray-900">
                  {new Set(blogs.map(blog => blog.author)).size}
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* Blog List */}
        {filteredBlogs.length === 0 ? (
          <Card className="p-12 text-center">
            <div className="text-gray-400 mb-4">
              <Eye className="w-12 h-12 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No blogs found</h3>
            <p className="text-gray-600 mb-6">
              {searchTerm ? 'Try adjusting your search terms' : 'Get started by creating your first blog post'}
            </p>
            {!searchTerm && (
              <Link href="/admin/blogs/create">
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <Plus className="w-4 h-4 mr-2" />
                  Create First Blog
                </Button>
              </Link>
            )}
          </Card>
        ) : (
            <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200 rounded-lg">
              <thead>
              <tr className="bg-gray-50">
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Banner</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Title</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Subheading</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Author</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Published</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
              </thead>
              <tbody>
              {filteredBlogs.map((blog) => (
                <tr key={blog._id} className="border-b last:border-b-0 hover:bg-gray-50">
                <td className="px-4 py-3">
                  {blog.banner_image_url ? (
                  <img
                    src={blog.banner_image_url}
                    alt={blog.heading}
                    className="w-20 h-12 object-cover rounded"
                  />
                  ) : (
                  <span className="text-gray-400 text-xs">No Image</span>
                  )}
                </td>
                <td className="px-4 py-3 font-semibold text-gray-900 max-w-xs truncate">{blog.heading}</td>
                <td className="px-4 py-3 text-gray-600 max-w-xs truncate">{blog.subheading}</td>
                <td className="px-4 py-3 flex items-center gap-2 text-gray-700">
                  <User className="w-4 h-4" />
                  {blog.author}
                </td>
                <td className="px-4 py-3">
                  <Badge variant="secondary" className="text-xs">
                  {formatDate(blog.publish_date)}
                  </Badge>
                </td>
                <td className="px-4 py-3">
                  <div className="flex gap-2">
                  <Link href={`/blog/${blog.slug}`} target="_blank">
                    <Button variant="outline" size="sm">
                    <Eye className="w-4 h-4 mr-2" />
                    View
                    </Button>
                  </Link>
                  <Link href={`/admin/blogs/edit/${blog._id}`}>
                    <Button variant="outline" size="sm">
                    <Edit3 className="w-4 h-4 mr-2" />
                    Edit
                    </Button>
                  </Link>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDelete(blog._id, blog.heading)}
                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                  </div>
                </td>
                </tr>
              ))}
              </tbody>
            </table>
            </div>
        )}
      </div>
    </div>
  );
}
