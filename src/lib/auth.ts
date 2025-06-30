import { NextRequest } from 'next/server';
import { connectToDatabase } from './newsletter';
import { Admin, Permission, hasPermission } from '@/types/admin';

export async function verifyAdminAuth(request: NextRequest, requiredPermission?: Permission): Promise<{ isValid: boolean; error?: string }> {
  try {
    const sessionCookie = request.cookies.get('admin-session');
    
    if (!sessionCookie?.value) {
      return { isValid: false, error: 'No session cookie' };
    }

    // Verify session token
    try {
      const decoded = Buffer.from(sessionCookie.value, 'base64').toString();
      const [email, role, timestamp] = decoded.split(':');
      const sessionTime = parseInt(timestamp);
      const now = Date.now();

      // Check if session is valid (within 7 days)
      const maxAge = 60 * 60 * 24 * 7 * 1000; // 7 days in milliseconds
      if (now - sessionTime > maxAge) {
        return { isValid: false, error: 'Session expired' };
      }

      // Verify admin exists in database
      const db = await connectToDatabase();
      const adminsCollection = db.collection<Admin>('admins');
      const admin = await adminsCollection.findOne({ email });

      if (!admin) {
        return { isValid: false, error: 'Invalid admin' };
      }

      // Verify role matches
      if (admin.role !== role) {
        return { isValid: false, error: 'Invalid session' };
      }

      // Check permission if required
      if (requiredPermission && !hasPermission(admin.role, requiredPermission)) {
        return { isValid: false, error: 'Permission denied' };
      }

      return { isValid: true };
    } catch (decodeError) {
      console.error('Session decode error:', decodeError);
      return { isValid: false, error: 'Invalid session token' };
    }
  } catch (error) {
    console.error('Auth verification error:', error);
    return { isValid: false, error: 'Authentication error' };
  }
}
