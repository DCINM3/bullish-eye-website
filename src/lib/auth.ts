import { NextRequest } from 'next/server';

export async function verifyAdminAuth(request: NextRequest): Promise<{ isValid: boolean; error?: string }> {
  try {
    const sessionCookie = request.cookies.get('admin-session');
    
    if (!sessionCookie?.value) {
      return { isValid: false, error: 'No session cookie' };
    }

    // Verify session token (same logic as auth route)
    try {
      const decoded = Buffer.from(sessionCookie.value, 'base64').toString();
      const [email, timestamp] = decoded.split(':');
      const sessionTime = parseInt(timestamp);
      const now = Date.now();

      // Check if session is valid (within 7 days)
      const maxAge = 60 * 60 * 24 * 7 * 1000; // 7 days in milliseconds
      if (now - sessionTime > maxAge) {
        return { isValid: false, error: 'Session expired' };
      }

      if (email !== process.env.ADMIN_EMAIL) {
        return { isValid: false, error: 'Invalid admin' };
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
