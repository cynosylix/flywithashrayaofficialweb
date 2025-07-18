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
  id: number;
  title: string;
  description: string;
  price: string;
  duration: string;
  features: string[];
  image: string;
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
