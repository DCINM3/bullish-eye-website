'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/components/ui/use-toast';

interface Comment {
  _id: string;
  name: string;
  comment: string;
  createdAt: string;
}

interface BlogCommentsProps {
  blogId: string;
  isAdmin?: boolean;
}

export default function BlogComments({ blogId, isAdmin }: BlogCommentsProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [name, setName] = useState('');
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchComments();
  }, [blogId]);

  const fetchComments = async () => {
    try {
      const response = await fetch(`/api/blog-comments?blogId=${blogId}`);
      const data = await response.json();
      setComments(data);
    } catch (error) {
      console.error('Failed to fetch comments:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !comment.trim()) {
      toast({
        title: 'Error',
        description: 'Please fill in both name and comment fields.',
        variant: 'destructive',
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch('/api/blog-comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ blogId, name, comment }),
      });

      if (!response.ok) throw new Error('Failed to submit comment');

      const newComment = await response.json();
      setComments([newComment, ...comments]);
      setName('');
      setComment('');
      toast({
        title: 'Success',
        description: 'Your comment has been added successfully.',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to submit comment. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (commentId: string) => {
    try {
      await fetch(`/api/blog-comments?id=${commentId}`, {
        method: 'DELETE',
      });
      setComments(comments.filter(c => c._id !== commentId));
      toast({
        title: 'Success',
        description: 'Comment deleted successfully.',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to delete comment.',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="mt-8 space-y-8">
      <h3 className="text-2xl font-semibold">Comments</h3>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="max-w-md"
        />
        <Textarea
          placeholder="Write your comment..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          rows={4}
        />
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Post Comment'}
        </Button>
      </form>

      <div className="space-y-4">
        {comments.map((c) => (
          <div key={c._id} className="bg-white p-4 rounded-lg shadow">
            <div className="flex justify-between items-start">
              <div>
                <h4 className="font-semibold">{c.name}</h4>
                <p className="text-sm text-gray-500">
                  {new Date(c.createdAt).toLocaleDateString()}
                </p>
                <p className="mt-2">{c.comment}</p>
              </div>
              {isAdmin && (
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleDelete(c._id)}
                >
                  Delete
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
