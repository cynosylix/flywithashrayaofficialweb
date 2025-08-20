import { NextRequest, NextResponse } from 'next/server';
import connectionToDatabase from '../../../../lib/mongoose';
import Package from '../../../../models/Package';

export async function GET(request: NextRequest) {
  try {
    console.log('Connecting to database...');
    await connectionToDatabase();
    console.log('Database connected successfully');
    
    const { searchParams } = new URL(request.url);
    const isActive = searchParams.get('isActive');
    
    let query = {};
    if (isActive === 'true') {
      query = { isActive: true };
    }
    
    console.log('Fetching packages with query:', query);
    const packages = await Package.find(query)
      .sort({ createdAt: -1 })
      .lean()
      .limit(50);
    
    console.log(`Found ${packages.length} packages`);
    return NextResponse.json({ packages });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error('Error fetching packages:', error);
    
    return NextResponse.json(
      { error: 'Failed to fetch packages', details: error.message },
      { status: 500 }
    );
  }
}
