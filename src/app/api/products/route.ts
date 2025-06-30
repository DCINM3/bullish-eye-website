import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { Product } from '@/types/index';

export async function GET(request: NextRequest) {
  try {
    const client = await clientPromise;
    const db = client.db('bullish_eyes');
    
    // Get query parameters
    const { searchParams } = new URL(request.url);
    const service = searchParams.get('service');
    const isActive = searchParams.get('isActive');
    
    // Build filter
    const filter: any = {};
    if (service) {
      filter.service = service;
    }
    if (isActive === 'true') {
      filter.isActive = true;
    }
    
    const products = await db
      .collection('products')
      .find(filter)
      .sort({ createdAt: -1 })
      .toArray();

    return NextResponse.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const client = await clientPromise;
    const db = client.db('bullish_eyes');
    
    const body = await request.json();
    const { title, description, service, link, isActive } = body;

    if (!title || !description || !service) {
      return NextResponse.json(
        { error: 'Title, description, and service are required' },
        { status: 400 }
      );
    }

    const product: Omit<Product, '_id'> = {
      title,
      description,
      service,
      link: link || '',
      isActive: isActive !== undefined ? isActive : true,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await db.collection('products').insertOne(product);

    return NextResponse.json(
      { message: 'Product created successfully', id: result.insertedId },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating product:', error);
    return NextResponse.json(
      { error: 'Failed to create product' },
      { status: 500 }
    );
  }
}
