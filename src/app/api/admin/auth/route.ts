import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();
    
    console.log('POST /api/admin/auth - Login attempt for:', email);

    if (!email || !password) {
      console.log('Missing email or password');
      return NextResponse.json({ message: 'Email and password are required' }, { status: 400 });
    }

    // Get admin credentials from environment variables
    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD;

    console.log('ADMIN_EMAIL:', adminEmail);
    console.log('ADMIN_PASSWORD set:', !!adminPassword);

    if (!adminEmail || !adminPassword) {
      console.error('Admin credentials not configured in environment variables');
      return NextResponse.json({ message: 'Server configuration error' }, { status: 500 });
    }

    // Verify credentials
    if (email === adminEmail && password === adminPassword) {
      // Create session token (you could use JWT here for more security)
      const sessionToken = Buffer.from(`${email}:${Date.now()}`).toString('base64');
      
      console.log('Login successful, setting cookie with token:', sessionToken);
      
      const response = NextResponse.json({ 
        message: 'Login successful',
        authenticated: true 
      });

      // Set HTTP-only cookie for server-side verification
      response.cookies.set('admin-session', sessionToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax', // Changed from 'strict' to 'lax' for better compatibility
        maxAge: 60 * 60 * 24 * 7, // 7 days in seconds
        path: '/', // Ensure cookie is available for all paths
      });

      console.log('Cookie set successfully');
      return response;
    } else {
      console.log('Invalid credentials provided');
      return NextResponse.json({ message: 'Invalid email or password' }, { status: 401 });
    }
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
    console.log('All cookies:', request.cookies.getAll().map(c => `${c.name}=${c.value}`));
    console.log('ADMIN_EMAIL env var:', process.env.ADMIN_EMAIL);
    
    if (!sessionCookie?.value) {
      console.log('No session cookie found');
      return NextResponse.json({ authenticated: false, message: 'No session cookie' }, { status: 401 });
    }

    // Verify session token
    try {
      const decoded = Buffer.from(sessionCookie.value, 'base64').toString();
      console.log('Decoded session:', decoded);
      
      const [email, timestamp] = decoded.split(':');
      const sessionTime = parseInt(timestamp);
      const now = Date.now();

      console.log('Session email:', email);
      console.log('Session timestamp:', sessionTime);
      console.log('Current time:', now);
      console.log('Time difference (hours):', (now - sessionTime) / (60 * 60 * 1000));

      // Check if session is valid (within 7 days)
      const maxAge = 60 * 60 * 24 * 7 * 1000; // 7 days in milliseconds
      if (now - sessionTime > maxAge) {
        console.log('Session expired');
        return NextResponse.json({ authenticated: false, message: 'Session expired' }, { status: 401 });
      }

      if (email === process.env.ADMIN_EMAIL) {
        console.log('Session valid for admin user');
        return NextResponse.json({ authenticated: true, email });
      } else {
        console.log('Session email does not match admin email');
        return NextResponse.json({ authenticated: false, message: 'Invalid session' }, { status: 401 });
      }
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
