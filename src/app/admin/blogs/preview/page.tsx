'use client';

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, User, ArrowLeft, Eye } from 'lucide-react';

interface PreviewData {
  banner_image_url: string;
  heading: string;
  subheading: string;
  author: string;
  publish_date: string;
  content: string;
  slug?: string;
}

export default function BlogPreview() {
  const [previewData, setPreviewData] = useState<PreviewData | null>(null);

  useEffect(() => {
    const data = localStorage.getItem('blog-preview');
    if (data) {
      try {
        setPreviewData(JSON.parse(data));
      } catch (error) {
        console.error('Error parsing preview data:', error);
      }
    }
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (!previewData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Eye className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">No Preview Data</h2>
          <p className="text-gray-600 mb-4">No preview data found. Please go back and try again.</p>
          <Button onClick={() => window.close()} variant="outline">
            Close Preview
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Preview Header */}
      <div className="bg-blue-600 text-white py-4 px-4 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Eye className="w-5 h-5" />
            <span className="font-medium">Blog Preview</span>
          </div>
          <div className="flex items-center space-x-2">
            <Badge variant="secondary" className="bg-white/20 text-white">
              Preview Mode
            </Badge>
            <Button
              onClick={() => window.close()}
              size="sm"
              variant="outline"
              className="text-white border-white/30 hover:bg-white/10"
            >
              Close
            </Button>
          </div>
        </div>
      </div>

      {/* Blog Content */}
      <div className="py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <article className="bg-white rounded-lg shadow-sm overflow-hidden">
            {/* Banner Image */}
            {previewData.banner_image_url && (
              <div className="h-64 md:h-80 overflow-hidden">
                <img
                  src={previewData.banner_image_url}
                  alt={previewData.heading}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            {/* Article Header */}
            <div className="p-6 md:p-8">
              <div className="mb-6">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
                  {previewData.heading}
                </h1>
                
                {previewData.subheading && (
                  <p className="text-xl text-gray-600 leading-relaxed">
                    {previewData.subheading}
                  </p>
                )}
              </div>

              {/* Meta Information */}
              <div className="flex flex-wrap items-center gap-4 pb-6 mb-6 border-b border-gray-200">
                <div className="flex items-center text-gray-600">
                  <User className="w-4 h-4 mr-2" />
                  <span className="font-medium">{previewData.author}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Calendar className="w-4 h-4 mr-2" />
                  <span>{formatDate(previewData.publish_date)}</span>
                </div>
              </div>

              {/* Article Content */}
              <div 
                className="prose prose-lg max-w-none"
                dangerouslySetInnerHTML={{ __html: previewData.content }}
                style={{
                  lineHeight: '1.8',
                  fontSize: '16px'
                }}
              />
            </div>
          </article>

          {/* Preview Notice */}
          <Card className="mt-8 p-4 bg-yellow-50 border-yellow-200">
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0">
                <Eye className="w-5 h-5 text-yellow-600" />
              </div>
              <div>
                <h3 className="text-sm font-medium text-yellow-800">Preview Mode</h3>
                <p className="text-sm text-yellow-700 mt-1">
                  This is how your blog post will appear to readers. Close this window to continue editing.
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>

      <style jsx global>{`
        .prose h1 {
          font-size: 2.25rem;
          font-weight: 700;
          line-height: 1.2;
          margin: 2rem 0 1rem 0;
          color: #1f2937;
        }
        
        .prose h2 {
          font-size: 1.875rem;
          font-weight: 600;
          line-height: 1.3;
          margin: 2rem 0 1rem 0;
          color: #1f2937;
        }
        
        .prose h3 {
          font-size: 1.5rem;
          font-weight: 600;
          line-height: 1.4;
          margin: 1.5rem 0 0.75rem 0;
          color: #1f2937;
        }
        
        .prose p {
          margin: 1rem 0;
          color: #374151;
        }
        
        .prose ul, .prose ol {
          margin: 1rem 0;
          padding-left: 1.5rem;
        }
        
        .prose li {
          margin: 0.5rem 0;
          color: #374151;
        }
        
        .prose blockquote {
          border-left: 4px solid #e5e7eb;
          padding-left: 1rem;
          margin: 1.5rem 0;
          font-style: italic;
          color: #6b7280;
        }
        
        .prose code {
          background-color: #f3f4f6;
          padding: 0.125rem 0.25rem;
          border-radius: 0.25rem;
          font-size: 0.875rem;
          color: #1f2937;
        }
        
        .prose pre {
          background-color: #1f2937;
          color: #f9fafb;
          padding: 1rem;
          border-radius: 0.5rem;
          overflow-x: auto;
          margin: 1.5rem 0;
        }
        
        .prose img {
          border-radius: 0.5rem;
          margin: 1.5rem 0;
          max-width: 100%;
          height: auto;
        }
        
        .prose a {
          color: #3b82f6;
          text-decoration: underline;
        }
        
        .prose a:hover {
          color: #1d4ed8;
        }
      `}</style>
    </div>
  );
}
