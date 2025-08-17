import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import connectionToDatabase from '../../../../../lib/mongoose';
import Package from '../../../../../models/Package';

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
    
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const query: Record<string, any> = {};
    if (isActive !== null) query.isActive = isActive === 'true';
    if (isFeatured !== null) query.isFeatured = isFeatured === 'true';
    
    const packages = await Package.find(query).sort({ createdAt: -1 });
    
    return NextResponse.json(
      { success: true, data: packages },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching packages:", error);
    return errorResponse("Internal server error", 500);
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectionToDatabase();
    
    const data = await request.json();
    
    // Validate required fields
    const requiredFields = ['name', 'description', 'price', 'duration', 'destinations'];
    const missingFields = requiredFields.filter(field => !data[field]);
    
    if (missingFields.length > 0) {
      return errorResponse(`Missing required fields: ${missingFields.join(', ')}`, 400);
    }
    
    // Validate price is a number
    if (isNaN(Number(data.price))) {
      return errorResponse("Price must be a number", 400);
    }
    
    const newPackage = new Package({
      ...data,
      price: Number(data.price),
      isActive: data.isActive || false,
      isFeatured: data.isFeatured || false,
    });
    
    await newPackage.save();
    
    return NextResponse.json(
      { 
        success: true,
        message: "Package created successfully", 
        data: newPackage 
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating package:", error);
    return errorResponse("Internal server error", 500);
  }
}

export async function PUT(request: NextRequest) {
  try {
    await connectionToDatabase();
    
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return errorResponse("Package ID is required", 400);
    }
    
    const data = await request.json();
    
    // Validate price if provided
    if (data.price && isNaN(Number(data.price))) {
      return errorResponse("Price must be a number", 400);
    }
    
    const updatedPackage = await Package.findByIdAndUpdate(
      id,
      { 
        ...data,
        ...(data.price && { price: Number(data.price) }),
        updatedAt: new Date() 
      },
      { new: true, runValidators: true }
    );
    
    if (!updatedPackage) {
      return errorResponse("Package not found", 404);
    }
    
    return NextResponse.json(
      { 
        success: true,
        message: "Package updated successfully", 
        data: updatedPackage 
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating package:", error);
    
    // Handle mongoose validation errors
    // if (error.name === 'ValidationError') {
    //   return errorResponse(error.message, 400);
    // }
    
    // return errorResponse("Internal server error", 500);
  }
}

export async function DELETE(request: NextRequest) {
  try {
    await connectionToDatabase();
    
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return errorResponse("Package ID is required", 400);
    }
    
    const deletedPackage = await Package.findByIdAndDelete(id);
    
    if (!deletedPackage) {
      return errorResponse("Package not found", 404);
    }
    
    return NextResponse.json(
      { 
        success: true,
        message: "Package deleted successfully" 
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting package:", error);
    return errorResponse("Internal server error", 500);
  }
}