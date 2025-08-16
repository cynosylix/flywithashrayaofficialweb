import mongoose from "mongoose";

const specialFareSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    originalPrice: { type: Number, required: true },
    
    // Airline-specific fields
    airlines: [{ 
        name: { type: String, required: true },
        flightNumber: { type: String },
        aircraftType: { type: String },
        departureTime: { type: String },
        arrivalTime: { type: String },
        duration: { type: String },
        stops: { type: Number, default: 0 },
        stopovers: [{ type: String }]
    }],
    
    // Flight details
    flightType: { 
        type: String, 
        enum: ['Economy', 'Premium Economy', 'Business', 'First Class'],
        default: 'Economy'
    },
    
    // Route information
    destinations: [{ type: String, required: true }],
    departureCities: [{ type: String, required: true }],
    arrivalCities: [{ type: String, required: true }],
    
    // Fare type and restrictions
    fareType: { 
        type: String, 
        enum: ['One Way', 'Round Trip', 'Multi City'],
        default: 'Round Trip'
    },
    
    // Baggage allowance
    baggage: {
        cabin: { type: String, default: "7kg" },
        checkIn: { type: String, default: "15kg" },
        extraBaggage: { type: Number, default: 0 }
    },
    
    // Validity and booking
    validFrom: { type: Date, required: true },
    validTo: { type: Date, required: true },
    bookingDeadline: { type: Date },
    
    // Booking limits
    maxBookings: { type: Number },
    currentBookings: { type: Number, default: 0 },
    
    // Fare restrictions
    restrictions: {
        advancePurchase: { type: Number, default: 0 },
        minimumStay: { type: String },
        maximumStay: { type: String },
        changeable: { type: Boolean, default: false },
        refundable: { type: Boolean, default: false },
        cancellationFee: { type: Number, default: 0 }
    },
    
    // What's included
    inclusions: [{ type: String }],
    exclusions: [{ type: String }],
    
    // Images and media
    images: [{ type: String }],
    thumbnail: { type: String },
    
    // Marketing
    tags: [{ type: String }],
    highlights: [{ type: String }],
    
    // Status
    isActive: { type: Boolean, default: true },
    isFeatured: { type: Boolean, default: false },
    isLimitedTime: { type: Boolean, default: true },
    
    // Pricing
    discountPercentage: { type: Number, default: 0 },
    
    // Policies
    termsAndConditions: { type: String },
    cancellationPolicy: { type: String },
    
    // Timestamps
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

// Update the updatedAt field before saving
specialFareSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

const SpecialFare = mongoose.models.SpecialFare || mongoose.model('SpecialFare', specialFareSchema);
export default SpecialFare;
