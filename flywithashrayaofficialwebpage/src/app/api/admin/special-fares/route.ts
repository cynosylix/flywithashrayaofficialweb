import { NextResponse } from 'next/server';
import { NextRequest } from 'next/request';
import connectionToDatabase from '../../../../../lib/mongoose';
import SpecialFare from '../../../../../models/SpecialFare';

export async function GET(request: NextRequest) {
  try {
    await connectionToDatabase();
    
    const { searchParams } = new URL(request.url);
    const isActive = searchParams.get('isActive');
    const isFeatured = searchParams.get('isFeatured');
    
    const query: any = {};
    if (isActive !== null) query.isActive = isActive === 'true';
    if (isFeatured !== null) query.isFeatured = isFeatured === 'true';
    
    const specialFares = await SpecialFare.find(query).sort({ createdAt: -1 });
    
    return NextResponse.json(
      { specialFares },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching special fares:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectionToDatabase();
    
    const data = await request.json();
    
    // Validate required fields
    if (!data.title || !data.description || !data.price || !data.originalPrice || !data.destinations) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }
    
    const newFare = new SpecialFare(data);
    await newFare.save();
    
    return NextResponse.json(
      { message: "Special fare added successfully", data: newFare },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error adding special fare:", error);
    return NextResponse.json(
      { error: "Internal server error" },
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
        { error: "Special fare ID is required" },
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
        { error: "Special fare not found" },
        { status: 404 }
      );
    }
    
    return NextResponse.json(
      { message: "Special fare updated successfully", data: updatedFare },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating special fare:", error);
    return NextResponse.json(
      { error: "Internal server error" },
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
        { error: "Special fare ID is required" },
        { status: 400 }
      );
    }
    
    const deletedFare = await SpecialFare.findByIdAndDelete(id);
    
    if (!deletedFare) {
      return NextResponse.json(
        { error: "Special fare not found" },
        { status: 404 }
      );
    }
    
    return NextResponse.json(
      { message: "Special fare deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting special fare:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
