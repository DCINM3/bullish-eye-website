import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Calendar, ArrowRight } from 'lucide-react';

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  imageUrl: string;
}

interface BlogCardProps {
  post: BlogPost;
}

export default function BlogCard({ post }: BlogCardProps) {
  return (
    <Link href={`/blog/${post.slug}`} className="block group">
      <Card className="h-full overflow-hidden transition-all duration-300 shadow-md hover:shadow-xl hover:-translate-y-1">
        <div className="relative w-full h-48">
          <Image
            src={post.imageUrl}
            alt={post.title}
            fill
            style={{ objectFit: 'cover' }}
            className="group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        <CardContent className="p-6">
          <div className="flex items-center space-x-2 text-sm text-gray-500 mb-2">
            <Calendar className="w-4 h-4" />
            <span>{new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
          </div>
          <h3 className="text-lg font-bold text-gray-900 mb-2 leading-tight group-hover:text-blue-600 transition-colors">
            {post.title}
          </h3>
          <p className="text-sm text-gray-600 mb-4 line-clamp-3">
            {post.excerpt}
          </p>
          <div className="flex items-center text-blue-600 font-semibold text-sm">
            Read More
            <ArrowRight className="w-4 h-4 ml-1 transition-transform duration-300 group-hover:translate-x-1" />
          </div>
        </CardContent>
      </Card>
    </Link>
  );
} 