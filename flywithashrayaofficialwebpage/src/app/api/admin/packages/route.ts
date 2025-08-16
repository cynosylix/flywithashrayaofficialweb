import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import connectionToDatabase from '../../../../../lib/mongoose';
import Package from '../../../../../models/Package';

export async function GET(request: NextRequest) {
  try {
    await connectionToDatabase();
    
    const { searchParams } = new URL(request.url);
    const isActive = searchParams.get('isActive');
    const isFeatured = searchParams.get('isFeatured');
    
    const query: any = {};
    if (isActive !== null) query.isActive = isActive === 'true';
    if (isFeatured !== null) query.isFeatured = isFeatured === 'true';
    
    const packages = await Package.find(query).sort({ createdAt: -1 });
    
    return NextResponse.json(
      { packages },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching packages:", error);
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
    if (!data.name || !data.description || !data.price || !data.duration || !data.destinations) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }
    
    const newPackage = new Package(data);
    await newPackage.save();
    
    return NextResponse.json(
      { message: "Package added successfully", data: newPackage },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error adding package:", error);
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
        { error: "Package ID is required" },
        { status: 400 }
      );
    }
    
    const data = await request.json();
    const updatedPackage = await Package.findByIdAndUpdate(
      id,
      { ...data, updatedAt: new Date() },
      { new: true }
    );
    
    if (!updatedPackage) {
      return NextResponse.json(
        { error: "Package not found" },
        { status: 404 }
      );
    }
    
    return NextResponse.json(
      { message: "Package updated successfully", data: updatedPackage },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating package:", error);
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
        { error: "Package ID is required" },
        { status: 400 }
      );
    }
    
    const deletedPackage = await Package.findByIdAndDelete(id);
    
    if (!deletedPackage) {
      return NextResponse.json(
        { error: "Package not found" },
        { status: 404 }
      );
    }
    
    return NextResponse.json(
      { message: "Package deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting package:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}