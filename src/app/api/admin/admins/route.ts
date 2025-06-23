import { NextRequest, NextResponse } from 'next/server';
import * as bcrypt from 'bcryptjs';
import { connectToDatabase } from '@/lib/newsletter';
import { Admin, AdminRole } from '@/types/admin';

// Get all admins
export async function GET(request: NextRequest) {
  try {
    // Verify super admin session
    const sessionCookie = request.cookies.get('admin-session');
    if (!sessionCookie?.value) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const [email, role] = Buffer.from(sessionCookie.value, 'base64').toString().split(':');
    if (role !== 'super_admin') {
      return NextResponse.json({ message: 'Forbidden' }, { status: 403 });
    }

    const db = await connectToDatabase();
    const adminsCollection = db.collection<Admin>('admins');
    
    // Exclude password field from results
    const admins = await adminsCollection.find({}, { projection: { password: 0 } }).toArray();
    
    return NextResponse.json({ admins });
  } catch (error) {
    console.error('Error fetching admins:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}

// Create new admin
export async function POST(request: NextRequest) {
  try {
    // Verify super admin session
    const sessionCookie = request.cookies.get('admin-session');
    if (!sessionCookie?.value) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const [email, role] = Buffer.from(sessionCookie.value, 'base64').toString().split(':');
    if (role !== 'super_admin') {
      return NextResponse.json({ message: 'Forbidden' }, { status: 403 });
    }

    const { email: newEmail, password, name, role: newRole } = await request.json();

    // Validate input
    if (!newEmail || !password || !name || !newRole) {
      return NextResponse.json({ message: 'All fields are required' }, { status: 400 });
    }

    const db = await connectToDatabase();
    const adminsCollection = db.collection<Admin>('admins');

    // Check if email already exists
    const existingAdmin = await adminsCollection.findOne({ email: newEmail });
    if (existingAdmin) {
      return NextResponse.json({ message: 'Email already exists' }, { status: 400 });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new admin
    const newAdmin: Admin = {
      email: newEmail,
      password: hashedPassword,
      name,
      role: newRole as AdminRole,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    await adminsCollection.insertOne(newAdmin);

    // Return admin without password
    const { password: _, ...adminWithoutPassword } = newAdmin;
    return NextResponse.json({ admin: adminWithoutPassword }, { status: 201 });
  } catch (error) {
    console.error('Error creating admin:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}

// Update admin
export async function PUT(request: NextRequest) {
  try {
    // Verify super admin session
    const sessionCookie = request.cookies.get('admin-session');
    if (!sessionCookie?.value) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const [email, role] = Buffer.from(sessionCookie.value, 'base64').toString().split(':');
    if (role !== 'super_admin') {
      return NextResponse.json({ message: 'Forbidden' }, { status: 403 });
    }

    const { _id, name, password, role: newRole } = await request.json();

    if (!_id) {
      return NextResponse.json({ message: 'Admin ID is required' }, { status: 400 });
    }

    const db = await connectToDatabase();
    const adminsCollection = db.collection<Admin>('admins');

    const updateData: Partial<Admin> = {
      updatedAt: new Date()
    };

    if (name) updateData.name = name;
    if (newRole) updateData.role = newRole as AdminRole;
    if (password) {
      updateData.password = await bcrypt.hash(password, 10);
    }

    const result = await adminsCollection.findOneAndUpdate(
      { _id },
      { $set: updateData },
      { returnDocument: 'after', projection: { password: 0 } }
    );

    if (!result) {
      return NextResponse.json({ message: 'Admin not found' }, { status: 404 });
    }

    return NextResponse.json({ admin: result });
  } catch (error) {
    console.error('Error updating admin:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}

// Delete admin
export async function DELETE(request: NextRequest) {
  try {
    // Verify super admin session
    const sessionCookie = request.cookies.get('admin-session');
    if (!sessionCookie?.value) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const [email, role] = Buffer.from(sessionCookie.value, 'base64').toString().split(':');
    if (role !== 'super_admin') {
      return NextResponse.json({ message: 'Forbidden' }, { status: 403 });
    }

    const { searchParams } = new URL(request.url);
    const adminId = searchParams.get('id');

    if (!adminId) {
      return NextResponse.json({ message: 'Admin ID is required' }, { status: 400 });
    }

    const db = await connectToDatabase();
    const adminsCollection = db.collection<Admin>('admins');

    // Prevent deleting the last super admin
    const superAdmins = await adminsCollection.countDocuments({ role: 'super_admin' });
    const adminToDelete = await adminsCollection.findOne({ _id: adminId });

    if (adminToDelete?.role === 'super_admin' && superAdmins <= 1) {
      return NextResponse.json({ message: 'Cannot delete the last super admin' }, { status: 400 });
    }

    const result = await adminsCollection.deleteOne({ _id: adminId });

    if (result.deletedCount === 0) {
      return NextResponse.json({ message: 'Admin not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Admin deleted successfully' });
  } catch (error) {
    console.error('Error deleting admin:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
} 