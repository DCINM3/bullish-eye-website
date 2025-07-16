'use client';

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { 
  Search, 
  Trash2, 
  MessageSquare, 
  Calendar,
  Filter,
  ExternalLink
} from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';

interface Comment {
  _id: string;
  blogId: string;
  name: string;
  comment: string;
  createdAt: string;
}

interface Blog {
  _id: string;
  heading: string;
  slug: string;
}

export default function AdminComments() {
  const [comments, setComments] = useState<Comment[]>([]);
  const [filteredComments, setFilteredComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'date' | 'name'>('date');
  const [blogs, setBlogs] = useState<Record<string, Blog>>({});

  useEffect(() => {
    fetchComments();
  }, []);

  useEffect(() => {
    filterAndSortComments();
  }, [comments, searchTerm, sortBy]);

  const fetchComments = async () => {
    try {
      // Fetch all comments
      const commentsResponse = await fetch('/api/blog-comments');
      if (!commentsResponse.ok) {
        throw new Error('Failed to fetch comments');
      }
      const commentsData = await commentsResponse.json();
      setComments(commentsData);
      
      // Fetch blogs to map blog IDs to titles
      const blogsResponse = await fetch('/api/blogs');
      if (blogsResponse.ok) {
        const blogsData = await blogsResponse.json();
        const blogsMap: Record<string, Blog> = {};
        blogsData.forEach((blog: Blog) => {
          blogsMap[blog._id] = blog;
        });
        setBlogs(blogsMap);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      toast({
        title: 'Error',
        description: 'Failed to load comments',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const filterAndSortComments = () => {
    let filtered = comments.filter(comment =>
      comment.comment.toLowerCase().includes(searchTerm.toLowerCase()) ||
      comment.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'date':
        default:
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
    });

    setFilteredComments(filtered);
  };

  const handleDelete = async (commentId: string) => {
    if (!confirm('Are you sure you want to delete this comment?')) return;

    try {
      const response = await fetch(`/api/blog-comments?id=${commentId}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Failed to delete comment');

      setComments(comments.filter(c => c._id !== commentId));
      toast({
        title: 'Success',
        description: 'Comment deleted successfully',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to delete comment',
        variant: 'destructive',
      });
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="py-8 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading comments...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Blog Comments</h1>
          <p className="text-gray-600 mt-2">
            Review and moderate comments on your blog posts
          </p>
        </div>

        {/* Search and Filter */}
        <Card className="p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search comments by content or author name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-gray-500" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'date' | 'name')}
                className="px-3 py-2 border border-gray-300 rounded-md bg-white text-sm"
              >
                <option value="date">Sort by Date</option>
                <option value="name">Sort by Name</option>
              </select>
            </div>
          </div>
        </Card>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <Card className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <MessageSquare className="w-6 h-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Comments</p>
                <p className="text-2xl font-bold text-gray-900">{comments.length}</p>
              </div>
            </div>
          </Card>
          <Card className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <Calendar className="w-6 h-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">This Week</p>
                <p className="text-2xl font-bold text-gray-900">
                  {comments.filter(comment => {
                    const commentDate = new Date(comment.createdAt);
                    const oneWeekAgo = new Date();
                    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
                    return commentDate > oneWeekAgo;
                  }).length}
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* Comments List */}
        {filteredComments.length === 0 ? (
          <Card className="p-12 text-center">
            <div className="text-gray-400 mb-4">
              <MessageSquare className="w-12 h-12 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No comments found</h3>
            <p className="text-gray-600">
              {searchTerm ? 'Try adjusting your search terms' : 'Your blog posts do not have any comments yet'}
            </p>
          </Card>
        ) : (
          <div className="bg-white rounded-lg shadow">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead className="w-1/2">Comment</TableHead>
                  <TableHead>Blog</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredComments.map((comment) => {
                  const blog = comment.blogId ? blogs[comment.blogId] : null;
                  
                  return (
                    <TableRow key={comment._id}>
                      <TableCell className="font-medium">{comment.name}</TableCell>
                      <TableCell className="max-w-xs truncate">{comment.comment}</TableCell>
                      <TableCell>
                        {blog ? (
                          <Link href={`/blog/${blog.slug}`} target="_blank" className="text-blue-600 hover:text-blue-800 flex items-center">
                            View Post
                            <ExternalLink className="w-3 h-3 ml-1" />
                          </Link>
                        ) : (
                          <span className="text-gray-400">Unknown</span>
                        )}
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary" className="text-xs">
                          {formatDate(comment.createdAt)}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleDelete(comment._id)}
                        >
                          <Trash2 className="w-4 h-4 mr-1 text-red-600" />
                          Delete
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        )}
      </div>
    </div>
  );
}
