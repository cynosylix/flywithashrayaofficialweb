export interface Package {
  _id: string;
  name: string;
  description: string;
  price: number;
  duration: string;
  destinations: string[];
  departureCities: string[];
  packageType: string;
  accommodation: {
    type: string;
    name: string;
    rating: number;
    roomType: string;
    occupancy: string;
  };
  inclusions: string[];
  exclusions: string[];
  itinerary: Array<{
    day?: number;
    title: string;
    description: string;
    overnight: string;
    attractions: string[];
    activities?: string[];
    meals?: string[];
  }>;
  flights: {
    onward: {
      airline: string;
      departure: string;
      departureAirport: string;
      arrival: string;
      arrivalAirport: string;
      duration: string;
      baggageAllowance: string;
    };
    return: {
      airline: string;
      departure: string;
      departureAirport: string;
      arrival: string;
      arrivalAirport: string;
      duration: string;
      baggageAllowance: string;
    };
  };
  images: string[];
  thumbnail?: string;
  gallery?: string[];
  market: string;
  tags: string[];
  highlights: string[];
  minPersons: number;
  departureDates?: string[];
  cancellationPolicy?: string;
  contact?: {
    address: string;
    phoneNumbers: string[];
    website: string;
  };
  isActive: boolean;
  isFeatured: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface SpecialFare {
  _id: string;
  title: string;
  subtitle?: string;
  description: string;
  shortDescription?: string;
  price: number;
  originalPrice: number;
  discountPercentage?: number;
  discountAmount?: number;
  currency: string;
  airlines?: Array<{
    airline: string;
    flightNumber?: string;
    departureTime?: string;
    arrivalTime?: string;
    duration?: string;
    stops?: number;
    stopovers?: Array<{
      airport: string;
      duration: string;
    }>;
  }>;
  validFrom: string;
  validTo: string;
  travelPeriodText?: string;
  bookingDeadline?: string;
  departureCities: string[];
  arrivalCities: string[];
  destinations: string[];
  hotelIncluded?: boolean;
  hotelRating?: number;
  hotelDetails?: {
    name?: string;
    location?: string;
    amenities?: string[];
  };
  fareType: string;
  tripType: string;
  inclusions: string[];
  exclusions: string[];
  cancellationPolicy: string;
  images: Array<{
    url: string;
    caption?: string;
  }>;
  thumbnail?: string;
  isActive: boolean;
  isFeatured: boolean;
  isLimitedTime: boolean;
  isBestSeller: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data?: T;
  error?: string;
}
