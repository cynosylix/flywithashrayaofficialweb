import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import connectionToDatabase from '../../../../../lib/mongoose';
import { SpecialFare } from '../../../../../models/SpecialFare';

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

export async function POST(request: NextRequest) {
  try {
    await connectionToDatabase();
    
    const data = await request.json();
    
    // Validate required fields
    const requiredFields = [
      'title', 'description', 'price', 'originalPrice',
      'validFrom', 'validTo', 'departureCities', 'arrivalCities'
    ];
    
    const missingFields = requiredFields.filter(field => !data[field]);
    if (missingFields.length > 0) {
      return NextResponse.json(
        { success: false, error: `Missing required fields: ${missingFields.join(', ')}` },
        { status: 400 }
      );
    }
    
    const newFare = new SpecialFare(data);
    await newFare.save();
    
    return NextResponse.json(
      { success: true, message: "Special fare created", data: newFare },
      { status: 201 }
    );
    
  } catch (error) {
    console.error("Error creating special fare:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create special fare" },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    await connectionToDatabase();
    
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) {
      return NextResponse.json(
        { success: false, error: "Special fare ID required" },
        { status: 400 }
      );
    }
    
    const data = await request.json();
    const updatedFare = await SpecialFare.findByIdAndUpdate(
      id,
      { ...data, updatedAt: new Date() },
      { new: true }
    );
    
    if (!updatedFare) {
      return NextResponse.json(
        { success: false, error: "Special fare not found" },
        { status: 404 }
      );
    }
    
    return NextResponse.json(
      { success: true, message: "Special fare updated", data: updatedFare },
      { status: 200 }
    );
    
  } catch (error) {
    console.error("Error updating special fare:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update special fare" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    await connectionToDatabase();
    
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) {
      return NextResponse.json(
        { success: false, error: "Special fare ID required" },
        { status: 400 }
      );
    }
    
    // Soft delete (recommended)
    const deletedFare = await SpecialFare.findByIdAndUpdate(
      id,
      { isActive: false, updatedAt: new Date() },
      { new: true }
    );
    
    if (!deletedFare) {
      return NextResponse.json(
        { success: false, error: "Special fare not found" },
        { status: 404 }
      );
    }
    
    return NextResponse.json(
      { success: true, message: "Special fare deactivated" },
      { status: 200 }
    );
    
  } catch (error) {
    console.error("Error deleting special fare:", error);
    return NextResponse.json(
      { success: false, error: "Failed to deactivate special fare" },
      { status: 500 }
    );
  }
}