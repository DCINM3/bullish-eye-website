import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { slugify } from '@/lib/utils';
import { verifyAdminAuth } from '@/lib/auth';

// Public GET endpoint for blogs
export async function GET(request: NextRequest) {
  try { 
    const client = await clientPromise;
    const db = client.db();
    const collection = db.collection('blogs');

    const { searchParams } = new URL(request.url);
    const slug = searchParams.get('slug');

    if (slug) {
      const blog = await collection.findOne({ slug });
      if (!blog) {
        return NextResponse.json({ message: 'Blog not found' }, { status: 404 });
      }
      return NextResponse.json(blog);
    } else {
      const blogs = await collection
        .find({})
        .sort({ publish_date: -1 })
        .toArray();
      return NextResponse.json(blogs);
    }
  } catch (error) {
    console.error('Error fetching blogs:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}

// Protected POST endpoint for creating blogs
export async function POST(request: NextRequest) {
  try {
    // Check if admin is authenticated with blog management permission
    const authResult = await verifyAdminAuth(request, 'blog_management');
    if (!authResult.isValid) {
      return NextResponse.json({ message: `Unauthorized - ${authResult.error}` }, { status: 401 });
    }

    const client = await clientPromise;
    const db = client.db();
    const collection = db.collection('blogs');

    const { 
      banner_image_url, 
      heading, 
      subheading, 
      author, 
      publish_date, 
      content, 
      category, 
      is_featured, 
      featured_position 
    } = await request.json();

    if (!heading || !author || !publish_date || !content || !category) {
      return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
    }

    const slug = slugify(heading);
    const existing = await collection.findOne({ slug });
    if (existing) {
      return NextResponse.json({ message: 'Blog with this heading already exists' }, { status: 409 });
    }

    if (is_featured) {
      // Un-feature all other posts if this one is being featured
      await collection.updateMany({}, { $set: { is_featured: false } });
    }

    const blogPost = {
      banner_image_url: banner_image_url || '',
      heading,
      subheading: subheading || '',
      author,
      publish_date: new Date(publish_date),
      content,
      category,
      is_featured: is_featured || false,
      featured_position: is_featured ? featured_position : null,
      slug,
      created_at: new Date(),
      updated_at: new Date(),
    };

    const result = await collection.insertOne(blogPost);
    return NextResponse.json({ 
      message: 'Blog created successfully', 
      id: result.insertedId,
      slug: slug 
    }, { status: 201 });

  } catch (error) {
    console.error('Error creating blog:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
