/**
 * TypeScript interfaces defining data models used in the FlyWithAshraya application.
 * Includes interfaces for Destination, Package, Special, Testimonial, and ContactInfo.
 */

export interface Destination {
  id: number;
  title: string;
  description: string;
  price: string;
  image: string;
}

export interface Package {
  _id?: string;
  id?: number;
  name: string;
  title?: string;
  description: string;
  price: number;
  duration: string;
  features?: string[];
  destinations?: string[];
  departureCities?: string[];
  packageType?: string;
  accommodation?: {
    type: string;
    name: string;
    rating: number;
    roomType: string;
    occupancy: string;
  };
  inclusions?: string[];
  exclusions?: string[];
  itinerary?: Array<{
    title: string;
    description: string;
    overnight: string;
    attractions: string[];
  }>;
  flights?: {
    onward: {
      airline: string;
      departure: string;
      departureAirport: string;
    };
    return: {
      airline: string;
      departure: string;
      departureAirport: string;
    };
  };
  images?: string[];
  thumbnail?: string;
  market?: string;
  tags?: string[];
  highlights?: string[];
  isActive: boolean;
  isFeatured?: boolean;
  createdAt?: string;
  updatedAt?: string;
  image?: string;
  badge?: string;
}

export interface Special {
  id: number;
  title: string;
  price: string;
  originalPrice: string;
  features: string[];
}

export interface Testimonial {
  location?: {
    lat: number;
    lng: number;
  } | {
    lat: number;
    lng: number;
  };
  id: number;
  content: string;
  author: string;
  role: string;
  rating: number;
  image: string;
}

export interface ContactInfo {
  icon: string;
  title: string;
  content: string[];
}
