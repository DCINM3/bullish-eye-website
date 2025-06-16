import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/newsletter';
import { Newsletter } from '@/types/newsletter';
import { verifyAdminAuth } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    const { email, source = 'footer' } = await request.json();

    // Validate email
    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { success: false, message: 'Please provide a valid email address' },
        { status: 400 }
      );
    }

    const db = await connectToDatabase();
    const newsletterCollection = db.collection('newsletter_subscribers');

    // Check if email already exists
    const existingSubscriber = await newsletterCollection.findOne({ email: email.toLowerCase() });
    
    if (existingSubscriber) {
      if (existingSubscriber.isActive) {
        return NextResponse.json(
          { success: false, message: 'This email is already subscribed to our newsletter' },
          { status: 409 }
        );
      } else {
        // Reactivate the subscription
        await newsletterCollection.updateOne(
          { email: email.toLowerCase() },
          { 
            $set: { 
              isActive: true, 
              subscribedAt: new Date(),
              source 
            } 
          }
        );
        return NextResponse.json({
          success: true,
          message: 'Successfully subscribed to newsletter!'
        });
      }
    }    // Create new subscription
    const newSubscriber = {
      email: email.toLowerCase(),
      subscribedAt: new Date(),
      isActive: true,
      source
    };

    await newsletterCollection.insertOne(newSubscriber);

    return NextResponse.json({
      success: true,
      message: 'Successfully subscribed to newsletter!'
    });

  } catch (error) {
    console.error('Newsletter subscription error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to subscribe. Please try again.' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    // Check if admin is authenticated
    const authResult = await verifyAdminAuth(request);
    if (!authResult.isValid) {
      return NextResponse.json(
        { success: false, message: `Unauthorized - ${authResult.error}` },
        { status: 401 }
      );
    }

    const db = await connectToDatabase();
    const newsletterCollection = db.collection('newsletter_subscribers');

    // Get query parameters
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const search = searchParams.get('search') || '';
    const status = searchParams.get('status') || 'all';

    // Build filter
    const filter: any = {};
    if (search) {
      filter.email = { $regex: search, $options: 'i' };
    }
    if (status !== 'all') {
      filter.isActive = status === 'active';
    }

    // Get total count
    const totalCount = await newsletterCollection.countDocuments(filter);

    // Get subscribers with pagination
    const subscribers = await newsletterCollection
      .find(filter)
      .sort({ subscribedAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .toArray();

    return NextResponse.json({
      success: true,
      data: {
        subscribers,
        pagination: {
          currentPage: page,
          totalPages: Math.ceil(totalCount / limit),
          totalCount,
          hasNext: page < Math.ceil(totalCount / limit),
          hasPrev: page > 1
        }
      }
    });

  } catch (error) {
    console.error('Newsletter fetch error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch subscribers' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    // Check if admin is authenticated
    const authResult = await verifyAdminAuth(request);
    if (!authResult.isValid) {
      return NextResponse.json(
        { success: false, message: `Unauthorized - ${authResult.error}` },
        { status: 401 }
      );
    }

    const { email: subscriberEmail } = await request.json();

    if (!subscriberEmail) {
      return NextResponse.json(
        { success: false, message: 'Email is required' },
        { status: 400 }
      );
    }

    const db = await connectToDatabase();
    const newsletterCollection = db.collection('newsletter_subscribers');

    const result = await newsletterCollection.updateOne(
      { email: subscriberEmail.toLowerCase() },
      { $set: { isActive: false } }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json(
        { success: false, message: 'Subscriber not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Subscriber unsubscribed successfully'
    });

  } catch (error) {
    console.error('Newsletter unsubscribe error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to unsubscribe' },
      { status: 500 }
    );
  }
}
