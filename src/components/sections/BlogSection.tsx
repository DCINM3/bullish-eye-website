'use client';

import * as React from 'react';
import Link from 'next/link';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import BlogCard, { BlogPost as BlogCardPost } from '@/components/blog/BlogCard';
import { Button } from '@/components/ui/button';
import { ArrowRight, Loader } from 'lucide-react';

// This is the shape of the data coming from the API
interface ApiBlogPost {
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
}

export default function BlogSection() {
  const [recentPosts, setRecentPosts] = React.useState<ApiBlogPost[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchRecentBlogs = async () => {
      try {
        const response = await fetch('/api/blogs');
        if (response.ok) {
          const allPosts: ApiBlogPost[] = await response.json();
          // Sort by date and get the latest 4 posts, including featured
          const sortedPosts = allPosts
            .sort((a, b) => new Date(b.publish_date).getTime() - new Date(a.publish_date).getTime())
            .slice(0, 4);
          setRecentPosts(sortedPosts);
        }
      } catch (error) {
        console.error('Error fetching recent blogs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecentBlogs();
  }, []);

  // Map the API blog post structure to the one expected by BlogCard
  const mapPostToCard = (post: ApiBlogPost): BlogCardPost => ({
    slug: post.slug,
    title: post.heading,
    excerpt: post.subheading,
    date: post.publish_date,
    imageUrl: post.banner_image_url || 'https://placehold.co/600x400/000000/ffffff?text=Image', // Fallback image
  });

  return (
    <section className="py-1 md:py-7 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-2 md:mb-12">
          <div>
            <h2 className="text-2xl md:text-4xl font-bold text-gray-900">
              From Our Blog
            </h2>
            <p className="text-sm md:text-lg text-gray-600 mt-2">
              Insights and analysis to help you on your investment journey.
            </p>
          </div>
          <Link href="/blog">
            <Button variant="outline">
              View All Posts <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>

        {loading ? (
          <div className="flex items-center justify-center h-64">
            <Loader className="w-8 h-8 animate-spin text-blue-600" />
          </div>
        ) : (
          <Carousel
            opts={{
              align: "start",
              loop: recentPosts.length > 3, // Only loop if there are enough items
            }}
            className="w-full"
          >
            <CarouselContent>
              {recentPosts.map((post) => (
                <CarouselItem key={post._id} className="md:basis-1/2 lg:basis-1/3 p-4">
                  <BlogCard post={mapPostToCard(post)} />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="absolute left-[-50px] top-1/2 -translate-y-1/2 hidden lg:flex" />
            <CarouselNext className="absolute right-[-50px] top-1/2 -translate-y-1/2 hidden lg:flex" />
          </Carousel>
        )}
      </div>
    </section>
  );
} 