import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/newsletter';
import { verifyAdminAuth } from '@/lib/auth';
import { ObjectId } from 'mongodb';

export async function POST(request: NextRequest) {
  try {
    const { firstName, lastName, email, phone, subject, message } = await request.json();

    // Validate required fields
    if (!firstName || !lastName || !email || !subject || !message) {
      return NextResponse.json(
        { success: false, message: 'Please fill in all required fields' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, message: 'Please provide a valid email address' },
        { status: 400 }
      );
    }

    const db = await connectToDatabase();
    const contactCollection = db.collection('contact_submissions');

    // Create new contact submission
    const newSubmission = {
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: email.toLowerCase().trim(),
      phone: phone?.trim() || '',
      subject: subject.trim(),
      message: message.trim(),
      status: 'not-viewed',
      submittedAt: new Date(),
      updatedAt: new Date()
    };

    const result = await contactCollection.insertOne(newSubmission);

    return NextResponse.json({
      success: true,
      message: 'Your message has been sent successfully! We will get back to you soon.',
      data: { ...newSubmission, _id: result.insertedId }
    });

  } catch (error) {
    console.error('Contact submission error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to send message. Please try again.' },
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
    const contactCollection = db.collection('contact_submissions');

    // Get query parameters
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const search = searchParams.get('search') || '';
    const status = searchParams.get('status') || 'all';

    // Build filter
    const filter: any = {};
    if (search) {
      filter.$or = [
        { firstName: { $regex: search, $options: 'i' } },
        { lastName: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { subject: { $regex: search, $options: 'i' } }
      ];
    }
    if (status !== 'all') {
      filter.status = status;
    }

    // Get total count
    const totalCount = await contactCollection.countDocuments(filter);

    // Get status counts
    const statusCounts = await contactCollection.aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 }
        }
      }
    ]).toArray();

    const counts = {
      total: totalCount,
      'not-viewed': 0,
      opened: 0,
      responded: 0
    };

    statusCounts.forEach(item => {
      if (item._id in counts) {
        counts[item._id as keyof typeof counts] = item.count;
      }
    });

    // Get submissions with pagination
    const submissions = await contactCollection
      .find(filter)
      .sort({ submittedAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .toArray();

    return NextResponse.json({
      success: true,
      data: {
        submissions,
        counts,
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
    console.error('Contact fetch error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch contact submissions' },
      { status: 500 }
    );
  }
}
