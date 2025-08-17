"use client";
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar,  MapPin, Users, Star, CheckCircle, } from 'react-feather';
import { Plane, Hotel } from 'lucide-react';
import Link from 'next/link';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

interface Package {
  _id: string;
  name: string;
  description: string;
  packageType: string;
  price: number;
  duration: string;
  destinations: string[];
  departureCities: string[];
  highlights: string[];
  inclusions: string[];
  exclusions: string[];
  itinerary: Array<{
    day: number;
    title: string;
    description: string;
    meals: string[];
  }>;
  flights?: {
    onward?: {
      airline: string;
      departure: string;
      arrival: string;
    };
    return?: {
      airline: string;
      departure: string;
      arrival: string;
    };
  };
  accommodation?: {
    name: string;
    type: string;
    rating: number;
  };
  images: string[];
}

export default function PackageDetailsPage() {
  const params = useParams();
  const packageId = params.id as string;
  
  const [packageData, setPackageData] = useState<Package | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPackageDetails = async () => {
      try {
        const response = await fetch(`/api/packages/${packageId}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch package details');
        }
        
        const data = await response.json();
        setPackageData(data);
      } catch (error) {
        console.error('Error fetching package:', error);
        setError('Failed to load package details');
      } finally {
        setLoading(false);
      }
    };

    if (packageId) {
      fetchPackageDetails();
    }
  }, [packageId]);

  if (loading) {
    return (
      <div className="bg-gray-50 min-h-screen">
        <Header />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="flex items-center justify-center h-96">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600"></div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !packageData) {
    return (
      <div className="bg-gray-50 min-h-screen">
        <Header />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Package Not Found</h1>
            <p className="text-gray-600 mb-8">{error || 'The requested package could not be found.'}</p>
            <Link href="/packages" className="text-blue-600 hover:text-blue-800">
              ← Back to Packages
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-6"
        >
          <Link
            href="/packages"
            className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Packages
          </Link>
        </motion.div>

        {/* Package Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8"
        >
          {/* Hero Image */}
          {packageData.images?.length > 0 && (
            <div className="h-96 relative">
              <img
                src={packageData.images[0]}
                alt={packageData.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            </div>
          )}

          <div className="p-8">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h1 className="text-4xl font-bold text-gray-900 mb-2">{packageData.name}</h1>
                <p className="text-xl text-gray-600">{packageData.description}</p>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-blue-600">${packageData.price}</div>
                <div className="text-sm text-gray-500">per person</div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <div className="flex items-center">
                <Calendar className="w-5 h-5 text-blue-600 mr-2" />
                <div>
                  <div className="text-sm font-medium">Duration</div>
                  <div className="text-sm text-gray-600">{packageData.duration}</div>
                </div>
              </div>
              <div className="flex items-center">
                <MapPin className="w-5 h-5 text-blue-600 mr-2" />
                <div>
                  <div className="text-sm font-medium">Destinations</div>
                  <div className="text-sm text-gray-600">{packageData.destinations.join(', ')}</div>
                </div>
              </div>
              <div className="flex items-center">
                <Users className="w-5 h-5 text-blue-600 mr-2" />
                <div>
                  <div className="text-sm font-medium">Departure From</div>
                  <div className="text-sm text-gray-600">{packageData.departureCities.join(', ')}</div>
                </div>
              </div>
              <div className="flex items-center">
                <Star className="w-5 h-5 text-blue-600 mr-2" />
                <div>
                  <div className="text-sm font-medium">Package Type</div>
                  <div className="text-sm text-gray-600">{packageData.packageType}</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Highlights */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl shadow-lg p-8"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Highlights</h2>
              <ul className="space-y-3">
                {packageData.highlights?.map((highlight, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{highlight}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Itinerary */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl shadow-lg p-8"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Itinerary</h2>
              <div className="space-y-6">
                {packageData.itinerary?.map((day, index) => (
                  <div key={index} className="border-l-4 border-blue-600 pl-6">
                    <div className="flex items-center mb-2">
                      <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                        {day.day}
                      </div>
                      <h3 className="ml-3 text-lg font-semibold text-gray-900">{day.title}</h3>
                    </div>
                    <p className="text-gray-600 mb-2">{day.description}</p>
                    <div className="flex items-center text-sm text-gray-500">
                      <Calendar className="w-4 h-4 mr-1" />
                      <span>Meals: {day.meals.join(', ')}</span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Inclusions & Exclusions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-2xl shadow-lg p-8"
              >
              <h2 className="text-2xl font-bold text-gray-900 mb-6">What&apos;s Included</h2>
                <ul className="space-y-3">
                  {packageData.inclusions?.map((inclusion, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{inclusion}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-2xl shadow-lg p-8"
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-6">What&apos;s Not Included</h2>
                <ul className="space-y-3">
                  {packageData.exclusions?.map((exclusion, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-red-500 mr-3 mt-0.5 flex-shrink-0">×</span>
                      <span className="text-gray-700">{exclusion}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Booking Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl shadow-lg p-8"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-4">Book This Package</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Contact Us</label>
                  <div className="space-y-2">
                    <a href="tel:+919876543210" className="block w-full text-center bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors">
                      Call Now
                    </a>
                    <a href="mailto:info@flywithashraya.com" className="block w-full text-center bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors">
                      Email Us
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Accommodation */}
            {packageData.accommodation && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-2xl shadow-lg p-8"
              >
                <h3 className="text-xl font-bold text-gray-900 mb-4">Accommodation</h3>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <Hotel className="w-5 h-5 text-blue-600 mr-3" />
                    <span className="font-medium">{packageData.accommodation.name}</span>
                  </div>
                  <div className="flex items-center">
                    <Star className="w-5 h-5 text-yellow-500 mr-3" />
                    <span>{packageData.accommodation.rating} Star {packageData.accommodation.type}</span>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Flight Info */}
            {packageData.flights && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-2xl shadow-lg p-8"
              >
                <h3 className="text-xl font-bold text-gray-900 mb-4">Flight Details</h3>
                <div className="space-y-3">
                  {packageData.flights.onward && (
                    <div>
                      <div className="flex items-center mb-2">
                        <Plane className="w-5 h-5 text-blue-600 mr-3" />
                        <span className="font-medium">Onward Flight</span>
                      </div>
                      <p className="text-sm text-gray-600">
                        {packageData.flights.onward.airline}: {packageData.flights.onward.departure} → {packageData.flights.onward.arrival}
                      </p>
                    </div>
                  )}
                  {packageData.flights.return && (
                    <div>
                      <div className="flex items-center mb-2">
                        <Plane className="w-5 h-5 text-blue-600 mr-3" />
                        <span className="font-medium">Return Flight</span>
                      </div>
                      <p className="text-sm text-gray-600">
                        {packageData.flights.return.airline}: {packageData.flights.return.departure} → {packageData.flights.return.arrival}
                      </p>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
