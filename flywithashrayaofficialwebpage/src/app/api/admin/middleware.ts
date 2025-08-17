import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';

interface JwtPayload {
  userId: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

export async function authenticateAdmin(request: NextRequest) {
  try {
    // Check for token in Authorization header
    const authHeader = request.headers.get('Authorization');
    let token = null;

    if (authHeader && authHeader.startsWith('Bearer ')) {
      token = authHeader.substring(7);
    } else {
      // Check for token in cookies
      const cookieHeader = request.headers.get('Cookie');
      if (cookieHeader) {
        const cookies = cookieHeader.split(';');
        const tokenCookie = cookies.find(cookie => 
          cookie.trim().startsWith('adminToken=')
        );
        if (tokenCookie) {
          token = tokenCookie.split('=')[1];
        }
      }
    }

    if (!token) {
      return {
        error: 'No admin token found',
        status: 401
      };
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key') as JwtPayload;
      
      // Check if user is admin (you can add role checking here)
      if (!decoded.userId) {
        return {
          error: 'Invalid admin token',
          status: 401
        };
      }

      return {
        userId: decoded.userId,
        valid: true
      };
      
    } catch (jwtError) {
      return {
        error: 'Invalid token',
        status: 401
      };
    }
  } catch (error) {
    return {
      error: 'Authentication error',
      status: 500
    };
  }
}

// Helper function to extract token from request
export function extractToken(request: NextRequest): string | null {
  // Check Authorization header first
  const authHeader = request.headers.get('Authorization');
  if (authHeader && authHeader.startsWith('Bearer ')) {
    return authHeader.substring(7);
  }

  // Check cookies
  const cookieHeader = request.headers.get('Cookie');
  if (cookieHeader) {
    const cookies = cookieHeader.split(';');
    const tokenCookie = cookies.find(cookie => 
      cookie.trim().startsWith('adminToken=')
    );
    if (tokenCookie) {
      return tokenCookie.split('=')[1];
    }
  }

  return null;
}
