import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import connectionToDatabase from '../../../../../lib/mongoose';
import { SpecialFare } from '../../../../../models/SpecialFare';

// Helper function for error responses
const errorResponse = (message: string, status: number) => {
  return NextResponse.json(
    { success: false, error: message },
    { status }
  );
};

export async function GET(request: NextRequest) {
  try {
    await connectionToDatabase();
    
    const { searchParams } = new URL(request.url);
    const isActive = searchParams.get('isActive');
    const isFeatured = searchParams.get('isFeatured');
    const isLimitedTime = searchParams.get('isLimitedTime');
    const limit = searchParams.get('limit');
    
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const query: any = {};
    if (isActive !== null) query.isActive = isActive === 'true';
    if (isFeatured !== null) query.isFeatured = isFeatured === 'true';
    if (isLimitedTime === 'true') query.isLimitedTime = true;
    
    let queryBuilder = SpecialFare.find(query).sort({ createdAt: -1 });
    
    if (limit && !isNaN(Number(limit))) {
      queryBuilder = queryBuilder.limit(Number(limit));
    }
    
    const specialFares = await queryBuilder.exec();
    
    return NextResponse.json(
      { success: true, data: specialFares },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching special fares:", error);
    return errorResponse("Internal server error", 500);
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
      return errorResponse(`Missing required fields: ${missingFields.join(', ')}`, 400);
    }
    
    // Validate price fields are numbers
    if (isNaN(Number(data.price)) || isNaN(Number(data.originalPrice))) {
      return errorResponse("Price and originalPrice must be numbers", 400);
    }
    
    const newFare = new SpecialFare({
      ...data,
      price: Number(data.price),
      originalPrice: Number(data.originalPrice),
      isActive: data.isActive || false,
      isFeatured: data.isFeatured || false,
      isLimitedTime: data.isLimitedTime || false,
    });
    
    await newFare.save();
    
    return NextResponse.json(
      { 
        success: true,
        message: "Special fare created successfully", 
        data: newFare 
      },
      { status: 201 }
    );
    
  } catch (error) {
    console.error("Error creating special fare:", error);
    return errorResponse("Internal server error", 500);
  }
}

export async function PUT(request: NextRequest) {
  try {
    await connectionToDatabase();
    
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return errorResponse("Special fare ID is required", 400);
    }
    
    const data = await request.json();
    
    // Validate price fields if provided
    if (data.price && isNaN(Number(data.price))) {
      return errorResponse("Price must be a number", 400);
    }
    if (data.originalPrice && isNaN(Number(data.originalPrice))) {
      return errorResponse("Original price must be a number", 400);
    }
    
    const updatedFare = await SpecialFare.findByIdAndUpdate(
      id,
      { 
        ...data,
        ...(data.price && { price: Number(data.price) }),
        ...(data.originalPrice && { originalPrice: Number(data.originalPrice) }),
        updatedAt: new Date() 
      },
      { new: true, runValidators: true }
    );
    
    if (!updatedFare) {
      return errorResponse("Special fare not found", 404);
    }
    
    return NextResponse.json(
      { 
        success: true,
        message: "Special fare updated successfully", 
        data: updatedFare 
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating special fare:", error);
    return errorResponse("Internal server error", 500);
  }
}

export async function DELETE(request: NextRequest) {
  try {
    await connectionToDatabase();
    
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return errorResponse("Special fare ID is required", 400);
    }
    
    const deletedFare = await SpecialFare.findByIdAndDelete(id);
    
    if (!deletedFare) {
      return errorResponse("Special fare not found", 404);
    }
    
    return NextResponse.json(
      { 
        success: true,
        message: "Special fare deleted successfully" 
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting special fare:", error);
    return errorResponse("Internal server error", 500);
  }
}
