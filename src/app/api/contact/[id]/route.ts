import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/newsletter';
import { verifyAdminAuth } from '@/lib/auth';
import { ObjectId } from 'mongodb';

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Check if admin is authenticated
    const authResult = await verifyAdminAuth(request);
    if (!authResult.isValid) {
      return NextResponse.json(
        { success: false, message: `Unauthorized - ${authResult.error}` },
        { status: 401 }
      );
    }

    const { status } = await request.json();
    const { id } = params;

    if (!id || !status) {
      return NextResponse.json(
        { success: false, message: 'ID and status are required' },
        { status: 400 }
      );
    }

    if (!['not-viewed', 'opened', 'responded'].includes(status)) {
      return NextResponse.json(
        { success: false, message: 'Invalid status' },
        { status: 400 }
      );
    }

    // Validate ObjectId format
    if (!ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, message: 'Invalid ID format' },
        { status: 400 }
      );
    }

    const db = await connectToDatabase();
    const contactCollection = db.collection('contact_submissions');

    const result = await contactCollection.updateOne(
      { _id: new ObjectId(id) },
      { 
        $set: { 
          status,
          updatedAt: new Date()
        } 
      }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json(
        { success: false, message: 'Contact submission not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Status updated successfully'
    });

  } catch (error) {
    console.error('Contact status update error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to update status' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Check if admin is authenticated
    const authResult = await verifyAdminAuth(request);
    if (!authResult.isValid) {
      return NextResponse.json(
        { success: false, message: `Unauthorized - ${authResult.error}` },
        { status: 401 }
      );
    }

    const { id } = params;

    if (!id) {
      return NextResponse.json(
        { success: false, message: 'ID is required' },
        { status: 400 }
      );
    }

    // Validate ObjectId format
    if (!ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, message: 'Invalid ID format' },
        { status: 400 }
      );
    }

    const db = await connectToDatabase();
    const contactCollection = db.collection('contact_submissions');

    const result = await contactCollection.deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return NextResponse.json(
        { success: false, message: 'Contact submission not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Contact submission deleted successfully'
    });

  } catch (error) {
    console.error('Contact deletion error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to delete contact submission' },
      { status: 500 }
    );
  }
}
