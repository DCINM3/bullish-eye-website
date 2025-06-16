import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';
import { slugify } from '@/lib/utils';

// GET a single blog post by ID
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

// UPDATE a blog post by ID
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const client = await clientPromise;
    const db = client.db();
    const collection = db.collection('blogs');

    const reqBody = await request.json();
    const { is_featured, heading } = reqBody;

    // If the post is being featured, un-feature all other posts first.
    if (is_featured === true) {
      await collection.updateMany(
        { _id: { $ne: new ObjectId(id) } },
        { $set: { is_featured: false, featured_position: null } }
      );
    }

    const updateData = { ...reqBody };
    
    // if heading is updated, slug should be updated as well
    if (heading) {
        updateData.slug = slugify(heading);
    }
    updateData.updated_at = new Date();


    const result = await collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: updateData }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json({ message: 'Blog not found' }, { status: 404 });
    }

    return NextResponse.json({ 
      message: 'Blog updated successfully',
      slug: updateData.slug
    });

  } catch (error) {
    console.error('Error updating blog:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}

// DELETE a blog post by ID
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id:string } }
) {
  try {
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
