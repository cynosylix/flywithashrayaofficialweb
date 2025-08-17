import mongoose from "mongoose";

const packageSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true,
        default: "5D4N - AZERBAIJJAN"
    },
    description: { 
        type: String, 
        required: true,
        default: "Discover the Land of Fire with this comprehensive 5-day tour package"
    },
    price: { 
        type: Number, 
        required: true 
    },
    duration: { 
        type: String, 
        required: true,
        default: "5 Days / 4 Nights"
    },
    destinations: [{ 
        type: String, 
        required: true,
    }],
    departureCities: [{ 
        type: String,
    }],
    
    // Package-specific fields
    packageType: { 
        type: String, 
        enum: ['Standard', 'Premium', 'Luxury', 'Budget', 'Custom'],
        default: 'Standard'
    },
    
    // Accommodation details
    accommodation: {
        type: { 
            type: String, 
            enum: ['Hotel', 'Resort', 'Villa', 'Apartment', 'Cruise'], 
            default: 'Hotel' 
        },
        name: {
            type: String,
            default: "Park Inn Baku"
        },
        rating: { 
            type: Number, 
            min: 1, 
            max: 5,
            default: 3 
        },
        roomType: {
            type: String,
            default: "Standard Room"
        },
        occupancy: {
            type: String,
            default: "Double"
        }
    },
    
    // What's included
    inclusions: [{ 
        type: String,
        default: [
            "Airport transfers",
            "Hotel accommodation",
            "Daily breakfast",
            "Sightseeing tours",
            "Entrance fees",
            "English speaking guide"
        ]
    }],
    exclusions: [{ 
        type: String,
        default: [
            "Flight tickets",
            "Visa fees",
            "Personal expenses",
            "Travel insurance",
            "Meals not mentioned"
        ]
    }],
    
    // Detailed itinerary
    itinerary: [{
        day: Number,
        title: String,
        description: String,
        attractions: [String],
        activities: [String],
        meals: {
            type: [String],
            default: ["Breakfast"]
        },
        overnight: String
    }],
    
    // Flight details
    flights: {
        onward: {
            airline: String,
            departure: String,
            departureAirport: String,
            arrival: String,
            arrivalAirport: String,
            duration: String,
            baggageAllowance: String
        },
        return: {
            airline: String,
            departure: String,
            departureAirport: String,
            arrival: String,
            arrivalAirport: String,
            duration: String,
            baggageAllowance: String
        }
    },
    
    // Images and media
    images: [{ type: String }],
    thumbnail: { type: String },
    gallery: [{ type: String }],
    
    // Package metadata
    market: {
        type: String,
    },
    tags: [{ 
        type: String,
    }],
    highlights: [{ 
        type: String,
        
    }],
    
    // Booking details
    minPersons: { 
        type: Number, 
        default: 1 
    },
    departureDates: [{ type: Date }],
    
    // Status and visibility
    isActive: { 
        type: Boolean, 
        default: true 
    },
    
    // Policies
    cancellationPolicy: { type: String },
    
    // Contact information
    contact: {
        address: {
            type: String,
            default: "Velikkakathu Building, Kalachanda Jn., NH 183, Pampady, Kottayam, Kerala, India - 686502"
        },
        phoneNumbers: [{
            type: String,
            default: ["+91 9400416016", "+91 9496416016", "+965 69680820"]
        }],
        website: {
            type: String,
            default: "www.flywithashraya.com"
        }
    },
    
    // Timestamps
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

// Update the updatedAt field before saving
packageSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

const Package = mongoose.models.Package || mongoose.model('Package', packageSchema);
export default Package;