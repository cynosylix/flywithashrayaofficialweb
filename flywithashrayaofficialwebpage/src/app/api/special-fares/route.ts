import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import connectionToDatabase from '../../../../lib/mongoose';
import { SpecialFare } from '../../../../models/SpecialFare';

export async function GET(request: NextRequest) {
  try {
    await connectionToDatabase();
    
    const { searchParams } = new URL(request.url);
    const isActive = searchParams.get('isActive') ?? 'true';
    const isFeatured = searchParams.get('isFeatured');
    const isLimitedTime = searchParams.get('isLimitedTime');
    const limit = searchParams.get('limit');
    
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const query: any = { isActive: isActive === 'true' };
    if (isFeatured === 'true') query.isFeatured = true;
    if (isLimitedTime === 'true') query.isLimitedTime = true;
    
    let queryBuilder = SpecialFare.find(query)
      .sort({ createdAt: -1 });
    
    if (limit && !isNaN(Number(limit))) {
      queryBuilder = queryBuilder.limit(Number(limit));
    }
    
    const specialFares = await queryBuilder.exec();
    
    return NextResponse.json({ success: true, data: specialFares }, { status: 200 });
    
  } catch (error) {
    console.error("Error fetching special fares:", error);
    return NextResponse.json(
      { success: false, error: "Failed to load special fares" },
      { status: 500 }
    );
  }
}
