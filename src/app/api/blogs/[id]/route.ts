import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';
import { slugify } from '@/lib/utils';
import { verifyAdminAuth } from '@/lib/auth';

// Public GET endpoint for a single blog post
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const client = await clientPromise;
    const db = client.db();
    const collection = db.collection('blogs');

    const blog = await collection.findOne({ _id: new ObjectId(id) });

    if (!blog) {
      return NextResponse.json({ message: 'Blog not found' }, { status: 404 });
    }

    return NextResponse.json(blog);
  } catch (error) {
    console.error('Error fetching blog:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}

// Protected PUT endpoint for updating a blog post
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Check if admin is authenticated with blog management permission
    const authResult = await verifyAdminAuth(request, 'blog_management');
    if (!authResult.isValid) {
      return NextResponse.json({ message: `Unauthorized - ${authResult.error}` }, { status: 401 });
    }

    const { id } = params;
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
    const existing = await collection.findOne({ 
      slug, 
      _id: { $ne: new ObjectId(id) } 
    });
    
    if (existing) {
      return NextResponse.json({ message: 'Blog with this heading already exists' }, { status: 409 });
    }

    if (is_featured) {
      // Un-feature all other posts if this one is being featured
      await collection.updateMany(
        { _id: { $ne: new ObjectId(id) } },
        { $set: { is_featured: false } }
      );
    }

    const updateData = {
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
      updated_at: new Date()
    };

    const result = await collection.findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: updateData },
      { returnDocument: 'after' }
    );

    if (!result) {
      return NextResponse.json({ message: 'Blog not found' }, { status: 404 });
    }

    return NextResponse.json({ 
      message: 'Blog updated successfully',
      blog: result
    });

  } catch (error) {
    console.error('Error updating blog:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}

// Protected DELETE endpoint for deleting a blog post
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Check if admin is authenticated with blog management permission
    const authResult = await verifyAdminAuth(request, 'blog_management');
    if (!authResult.isValid) {
      return NextResponse.json({ message: `Unauthorized - ${authResult.error}` }, { status: 401 });
    }

    const { id } = params;
    const client = await clientPromise;
    const db = client.db();
    const collection = db.collection('blogs');

    const result = await collection.deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return NextResponse.json({ message: 'Blog not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Blog deleted successfully' });

  } catch (error) {
    console.error('Error deleting blog:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
