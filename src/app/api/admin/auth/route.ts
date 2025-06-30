import { NextRequest, NextResponse } from 'next/server';
import * as bcrypt from 'bcryptjs';
import { connectToDatabase } from '@/lib/newsletter';
import { Admin, AdminLoginResponse } from '@/types/admin';

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();
    
    console.log('POST /api/admin/auth - Login attempt for:', email);

    if (!email || !password) {
      console.log('Missing email or password');
      return NextResponse.json({ message: 'Email and password are required' }, { status: 400 });
    }

    // Connect to MongoDB
    const db = await connectToDatabase();
    const adminsCollection = db.collection<Admin>('admins');

    // Find admin by email
    const admin = await adminsCollection.findOne({ email });
    if (!admin) {
      console.log('Admin not found');
      return NextResponse.json({ message: 'Invalid email or password' }, { status: 401 });
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(password, admin.password);
    if (!isValidPassword) {
      console.log('Invalid password');
      return NextResponse.json({ message: 'Invalid email or password' }, { status: 401 });
    }

    // Create session token with admin role
    const sessionToken = Buffer.from(`${email}:${admin.role}:${Date.now()}`).toString('base64');
    
    console.log('Login successful, setting cookie with token:', sessionToken);
    
    const response = NextResponse.json<AdminLoginResponse>({ 
      success: true,
      message: 'Login successful',
      admin: {
        email: admin.email,
        name: admin.name,
        role: admin.role
      }
    });

    // Set HTTP-only cookie for server-side verification
    response.cookies.set('admin-session', sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 days in seconds
      path: '/',
    });

    console.log('Cookie set successfully');
    return response;
  } catch (error) {
    console.error('Admin auth error:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const sessionCookie = request.cookies.get('admin-session');
    console.log('GET /api/admin/auth - Session check');
    console.log('Admin session cookie:', sessionCookie?.value || 'undefined');
    
    if (!sessionCookie?.value) {
      console.log('No session cookie found');
      return NextResponse.json({ authenticated: false, message: 'No session cookie' }, { status: 401 });
    }

    // Verify session token
    try {
      const decoded = Buffer.from(sessionCookie.value, 'base64').toString();
      console.log('Decoded session:', decoded);
      
      const [email, role, timestamp] = decoded.split(':');
      const sessionTime = parseInt(timestamp);
      const now = Date.now();

      // Check if session is valid (within 7 days)
      const maxAge = 60 * 60 * 24 * 7 * 1000; // 7 days in milliseconds
      if (now - sessionTime > maxAge) {
        console.log('Session expired');
        return NextResponse.json({ authenticated: false, message: 'Session expired' }, { status: 401 });
      }

      // Connect to MongoDB and verify admin still exists
      const db = await connectToDatabase();
      const adminsCollection = db.collection<Admin>('admins');
      const admin = await adminsCollection.findOne({ email });

      if (!admin) {
        console.log('Admin not found in database');
        return NextResponse.json({ authenticated: false, message: 'Invalid session' }, { status: 401 });
      }

      // Verify role matches
      if (admin.role !== role) {
        console.log('Role mismatch in session');
        return NextResponse.json({ authenticated: false, message: 'Invalid session' }, { status: 401 });
      }

      console.log('Session valid for admin:', email, 'with role:', role);
      return NextResponse.json({ 
        authenticated: true, 
        admin: {
          email: admin.email,
          name: admin.name,
          role: admin.role
        }
      });
    } catch (decodeError) {
      console.error('Session decode error:', decodeError);
      return NextResponse.json({ authenticated: false, message: 'Invalid session token' }, { status: 401 });
    }
  } catch (error) {
    console.error('Session verification error:', error);
    return NextResponse.json({ authenticated: false }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    console.log('DELETE /api/admin/auth - Logout request');
    
    const response = NextResponse.json({ message: 'Logged out successfully' });
    
    // Clear the session cookie
    response.cookies.set('admin-session', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 0,
      path: '/',
    });

    console.log('Session cookie cleared');
    return response;
  } catch (error) {
    console.error('Logout error:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
