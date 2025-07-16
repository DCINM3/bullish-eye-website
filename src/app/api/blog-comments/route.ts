import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const blogId = url.searchParams.get('blogId');
    
    const client = await clientPromise;
    const db = client.db();
    
    // If blogId is provided, fetch comments for that blog
    // Otherwise, fetch all comments (admin view)
    const query = blogId ? { blogId } : {};
    
    const comments = await db.collection('blog_comments')
      .find(query)
      .sort({ createdAt: -1 })
      .toArray();
    
    return NextResponse.json(comments);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch comments' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const { blogId, name, comment } = await req.json();
    
    const client = await clientPromise;
    const db = client.db();
    
    const newComment = {
      blogId,
      name,
      comment,
      createdAt: new Date(),
    };
    
    await db.collection('blog_comments').insertOne(newComment);
    
    return NextResponse.json(newComment);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to add comment' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const commentId = url.searchParams.get('id');
    
    if (!commentId) {
      return NextResponse.json({ error: 'Comment ID is required' }, { status: 400 });
    }
    
    const client = await clientPromise;
    const db = client.db();
    
    await db.collection('blog_comments').deleteOne({ _id: new ObjectId(commentId) });
    
    return NextResponse.json({ message: 'Comment deleted successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete comment' }, { status: 500 });
  }
}
