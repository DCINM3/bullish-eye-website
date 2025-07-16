import { notFound } from 'next/navigation';
import clientPromise from '@/lib/mongodb';
import { formatDate } from '@/lib/utils';
import Image from 'next/image';
import { Calendar, User, Clock, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import ShareButtons from '@/components/blog/ShareButtons';
import BlogComments from '@/components/blog/BlogComments';

interface NewsPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  try {
    const client = await clientPromise;
    const db = client.db();
    const news = await db.collection('blogs').find(
      { category: 'News' }, 
      { projection: { slug: 1 } }
    ).toArray();
    
    return news.map((item) => ({
      slug: item.slug,
    }));
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  }
}

export async function generateMetadata({ params }: NewsPageProps) {
  try {
    const { slug } = await params;
    const client = await clientPromise;
    const db = client.db();
    const news = await db.collection('blogs').findOne({ slug, category: 'News' });
    
    // Remove trailing slash if present
    const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || 'https://www.bullisheyes.com').replace(/\/$/, '');

    if (!news) {
      return {
        title: 'News Not Found - Bullish Eyes',
      };
    }

    const url = `${siteUrl}/news/${news.slug}`;
    const imageUrl = news.banner_image_url && !news.banner_image_url.startsWith('http') 
      ? `${siteUrl}${news.banner_image_url}` 
      : news.banner_image_url;

    return {
      metadataBase: new URL(siteUrl),
      title: `${news.heading} - Bullish Eyes News`,
      description: news.subheading || news.heading,
      openGraph: {
        title: news.heading,
        description: news.subheading || news.heading,
        url,
        siteName: 'Bullish Eyes',
        locale: 'en_US',
        type: 'article',
        images: imageUrl ? [{
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: news.heading,
        }] : [],
      },
      twitter: {
        card: 'summary_large_image',
        title: news.heading,
        description: news.subheading || news.heading,
        images: imageUrl ? [imageUrl] : [],
      },
      alternates: {
        canonical: url,
      },
      other: {
        'og:image:width': '1200',
        'og:image:height': '630',
      }
    };
  } catch (error) {
    return {
      title: 'News - Bullish Eyes',
    };
  }
}

export default async function NewsArticlePage({ params }: NewsPageProps) {
  try {
    const { slug } = await params;
    const client = await clientPromise;
    const db = client.db();
    const news = await db.collection('blogs').findOne({ slug, category: 'News' });

    if (!news) {
      notFound();
    }

    // Get the absolute URL for the news article
    const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || 'https://www.bullisheyes.com').replace(/\/$/, '');
    const canonicalUrl = `${siteUrl}/news/${news.slug}`;
    
    // Calculate reading time
    const readTime = Math.ceil(news.content.replace(/<[^>]*>/g, '').split(' ').length / 200);

    return (
      <div className="min-h-screen bg-gray-50">
        <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Back Button */}
          <div className="mb-6">
            <Link href="/news">
              <Button variant="outline" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to News
              </Button>
            </Link>
          </div>

          {/* Banner Image */}
          {news.banner_image_url && (
            <div className="relative h-64 md:h-96 w-full mb-8 rounded-xl overflow-hidden shadow-lg">
              <Image
                src={news.banner_image_url}
                alt={news.heading}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}

          {/* Article Header */}
          <header className="mb-8">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 leading-tight">
              {news.heading}
            </h1>
            
            {news.subheading && (
              <h2 className="text-xl md:text-2xl text-gray-600 mb-6 leading-relaxed">
                {news.subheading}
              </h2>
            )}

            {/* Meta Information */}
            <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600 pb-6 border-b border-gray-200">
              <div className="flex items-center space-x-2">
                <User className="w-4 h-4" />
                <span>By {news.author}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4" />
                <span>{formatDate(new Date(news.publish_date))}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4" />
                <span>{readTime} min read</span>
              </div>
            </div>
          </header>

          {/* Article Content */}
          <div className="prose prose-lg max-w-none">
            <div dangerouslySetInnerHTML={{ __html: news.content }} />
          </div>

          {/* Share Section */}
          <div className="mt-8 pb-8 border-b border-gray-200">
            <ShareButtons 
              url={`${(process.env.NEXT_PUBLIC_SITE_URL || 'https://www.bullisheyes.com').replace(/\/$/, '')}/news/${news.slug}`}
              title={news.heading}
              description={news.subheading}
              imageUrl={news.banner_image_url && !news.banner_image_url.startsWith('http') 
                ? `${process.env.NEXT_PUBLIC_SITE_URL || 'https://www.bullisheyes.com'}${news.banner_image_url}` 
                : news.banner_image_url}
            />
          </div>

          {/* Article Footer */}
          <footer className="mt-12 pt-8 border-t border-gray-200">
            <div className="bg-blue-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                About the Author
              </h3>
              <p className="text-gray-600">
                {news.author} is a financial expert at Bullish Eyes, specializing in investment strategies and market analysis.
              </p>
            </div>

            {/* Comments Section */}
            <BlogComments blogId={news._id.toString()} />
          </footer>
        </article>
      </div>
    );
  } catch (error) {
    console.error('Error loading news:', error);
    notFound();
  }
}
