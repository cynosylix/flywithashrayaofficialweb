import { NextRequest, NextResponse } from 'next/server';
import connectionToDatabase from '../../../../lib/mongoose';
import Package from '../../../../models/Package';

export async function GET(request: NextRequest) {
  try {
    // Add timeout handling
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000); // 8 second timeout
    
    await connectionToDatabase();
    clearTimeout(timeoutId);
    
    const { searchParams } = new URL(request.url);
    const isActive = searchParams.get('isActive');
    
    let query = {};
    if (isActive === 'true') {
      query = { isActive: true };
    }
    
    const packages = await Package.find(query)
      .sort({ createdAt: -1 })
      .lean()
      .limit(50); // Limit results for performance
    
    return NextResponse.json({ packages });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error('Error fetching packages:', error);
    
    // Handle timeout specifically
    if (error.name === 'AbortError') {
      return NextResponse.json(
        { error: 'Database connection timeout' },
        { status: 504 }
      );
    }
    
    return NextResponse.json(
      { error: 'Failed to fetch packages' },
      { status: 500 }
    );
  }
}
