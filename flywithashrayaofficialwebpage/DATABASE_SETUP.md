# Database Setup Guide - Packages & Special Fares

## Overview
This guide explains how to set up and use the new database models for packages and special fares in your FlyWithAshraya application.

## Models Created

### 1. Package Model (`models/Package.js`)
**Fields:**
- `name` - Package name (required)
- `description` - Detailed description (required)
- `price` - Package price (required)
- `originalPrice` - Original price before discount
- `duration` - Package duration e.g., "7 Days / 6 Nights"
- `destinations` - Array of destination names
- `inclusions` - What's included in the package
- `exclusions` - What's not included
- `itinerary` - Day-by-day itinerary
- `images` - Array of image URLs
- `category` - Package category (Domestic/International/Luxury/etc.)
- `isActive` - Whether package is currently available
- `isFeatured` - Featured package flag
- `discountPercentage` - Discount percentage
- `createdAt` - Creation timestamp
- `updatedAt` - Last update timestamp

### 2. SpecialFare Model (`models/SpecialFare.js`)
**Fields:**
- `title` - Fare title (required)
- `description` - Detailed description (required)
- `price` - Special price (required)
- `originalPrice` - Original price (required)
- `validFrom` - Validity start date (required)
- `validTo` - Validity end date (required)
- `destinations` - Array of destination names
- `departureCities` - Available departure cities
- `airlines` - Airlines offering this fare
- `flightType` - Economy/Business/First Class
- `packageType` - Flight only or package deals
- `isLimitedTime` - Limited time offer flag
- `maxBookings` - Maximum bookings allowed
- `currentBookings` - Current booking count

## Usage Instructions

### 1. Import Models
```javascript
import Package from '@/models/Package';
import SpecialFare from '@/models/SpecialFare';
```

### 2. Basic CRUD Operations

#### Create a Package
```javascript
const newPackage = new Package({
    name: "Kerala Backwaters",
    description: "7 days luxury tour of Kerala backwaters",
    price: 35000,
    duration: "7 Days / 6 Nights",
    destinations: ["Alleppey", "Munnar", "Kochi"],
    inclusions: ["Hotel", "Meals", "Sightseeing", "Transfers"],
    isActive: true
});
await newPackage.save();
```

#### Create a Special Fare
```javascript
const newFare = new SpecialFare({
    title: "Dubai Summer Special",
    description: "Exclusive summer deal for Dubai",
    price: 45000,
    originalPrice: 55000,
    validFrom: new Date("2024-06-01"),
    validTo: new Date("2024-08-31"),
    destinations: ["Dubai", "Abu Dhabi"],
    isActive: true
});
await newFare.save();
```

#### Query Packages
```javascript
// Get all active packages
const packages = await Package.find({ isActive: true });

// Get featured packages
const featured = await Package.find({ isFeatured: true, isActive: true });

// Search packages by destination
const keralaPackages = await Package.find({ 
    destinations: { $in: ["Kerala"] },
    isActive: true 
});
```

#### Query Special Fares
```javascript
// Get active special fares
const fares = await SpecialFare.find({ 
    isActive: true,
    validTo: { $gte: new Date() }
});

// Get limited time offers
const limitedOffers = await SpecialFare.find({ 
    isLimitedTime: true,
    isActive: true 
});
```

## Database Integration

The models automatically integrate with your existing mongoose connection in `lib/mongoose.js`. No additional configuration is needed.

## Next Steps

1. **Update API Routes**: Modify the existing API routes to use these models instead of mock data
2. **Add Validation**: Implement input validation for API endpoints
3. **Add Pagination**: Implement pagination for large datasets
4. **Add Search**: Implement search functionality
5. **Add Image Upload**: Set up image upload functionality for package images

## Example API Route Update

Here's how to update your existing API routes to use the actual database:

```javascript
// In your API route files
import Package from '@/models/Package';
import connectionToDatabase from '@/lib/mongoose';

export async function GET(request) {
    try {
        await connectionToDatabase();
        const packages = await Package.find({ isActive: true });
        return NextResponse.json({ packages });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
