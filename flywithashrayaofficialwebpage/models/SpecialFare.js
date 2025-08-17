import mongoose from 'mongoose';

const specialFareSchema = new mongoose.Schema({
  // Marketing Information
  title: { type: String, required: true },
  subtitle: { type: String },
  description: { type: String, required: true },
  shortDescription: { type: String },
  
  // Pricing
  price: { type: Number, required: true },
  originalPrice: { type: Number, required: true },
  discountPercentage: { type: Number },
  discountAmount: { type: Number },
  currency: { type: String, default: "USD" },
  
  // Flight Details
  airlines: [{
    airline: { type: mongoose.Schema.Types.ObjectId, ref: 'Airline' },
    flightNumber: { type: String },
    aircraftType: { type: String },
    departureTime: { type: String },
    arrivalTime: { type: String },
    duration: { type: String },
    stops: { type: Number, default: 0 },
    stopovers: [{
      airport: { type: String },
      duration: { type: String }
    }]
  }],
  
  // Travel Period
  validFrom: { type: Date, required: true },
  validTo: { type: Date, required: true },
  travelPeriodText: { type: String },
  bookingDeadline: { type: Date },
  
  // Route Information
  departureCities: [{
    city: { type: String, required: true },
    airportCode: { type: String, uppercase: true }
  }],
  arrivalCities: [{
    city: { type: String, required: true },
    airportCode: { type: String, uppercase: true }
  }],
  destinations: [{ type: String }],
  numberOfDestinations: { type: Number },
  
  // Accommodation
  hotelIncluded: { type: Boolean, default: false },
  hotelRating: { type: Number },
  hotelDetails: {
    name: { type: String },
    location: { type: String },
    amenities: [{ type: String }]
  },
  
  // Fare Conditions
  fareType: {
    type: String,
    enum: ['Economy', 'Premium Economy', 'Business', 'First Class', 'Package Deal'],
    default: 'Package Deal'
  },
  tripType: {
    type: String,
    enum: ['One Way', 'Round Trip', 'Multi City', 'Open Jaw'],
    default: 'Round Trip'
  },
  
  // Inclusions
  inclusions: [{ type: String }],
  exclusions: [{ type: String }],
  
  // Policies
  cancellationPolicy: {
    type: String,
    enum: ['Free cancellation', 'Partial refund', 'Non-refundable'],
    default: 'Free cancellation'
  },
  cancellationDetails: { type: String },
  changePolicy: { type: String },
  
  // Display Properties
  images: [{
    url: { type: String },
    caption: { type: String },
    isFeatured: { type: Boolean, default: false }
  }],
  thumbnail: { type: String },
  badgeText: { type: String },
  badgeColor: { type: String },
  
  // Status Flags
  isActive: { type: Boolean, default: true },
  isFeatured: { type: Boolean, default: false },
  isLimitedTime: { type: Boolean, default: true },
  isBestSeller: { type: Boolean, default: false },
  
  // Timestamps
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
}, {
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual for days remaining
specialFareSchema.virtual('daysRemaining').get(function() {
  return Math.ceil((this.validTo - Date.now()) / (1000 * 60 * 60 * 24));
});

// Update timestamps and calculate discounts
specialFareSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  
  if (this.originalPrice && this.price) {
    this.discountAmount = this.originalPrice - this.price;
    this.discountPercentage = Math.round((this.discountAmount / this.originalPrice) * 100);
  }
  
  next();
});

export const SpecialFare = mongoose.models.SpecialFare || mongoose.model('SpecialFare', specialFareSchema);