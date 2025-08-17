"use client";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle, Users, Heart, Home, Globe, Star, Shield, MapPin,  Clock, } from "react-feather";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useEffect, useState } from "react";
import { Hotel, Plane } from "lucide-react";
import Link from "next/link";

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

interface PremiumFeatureProps {
  icon: React.ReactNode;
  text: string;
}

const PremiumFeature = ({ icon, text }: PremiumFeatureProps) => (
  <div className="flex items-center space-x-2 bg-gray-50 px-3 py-2 rounded-lg">
    <div className="text-blue-600">{icon}</div>
    <span className="text-sm font-medium text-gray-700">{text}</span>
  </div>
);

interface PackageCardProps {
  pkg: Package;
}

const PackageCard = ({ pkg }: PackageCardProps) => {
  // Map package types to icons and features
  const getPackageDetails = (type: string) => {
    switch (type.toLowerCase()) {
      case "pilgrimage":
        return {
          icon: <Globe className="w-5 h-5" />,
          features: [
            { icon: <Shield className="w-4 h-4" />, text: "Sacred site security" },
            { icon: <Star className="w-4 h-4" />, text: "Premium accreditation" },
            { icon: <Users className="w-4 h-4" />, text: "Small group exclusivity" }
          ],
        };
      case "luxury":
        return {
          icon: <Heart className="w-5 h-5" />,
          features: [
            { icon: <Star className="w-4 h-4" />, text: "Forbes standards" },
            { icon: <Shield className="w-4 h-4" />, text: "Discretion guarantee" },
            { icon: <Users className="w-4 h-4" />, text: "Dedicated concierge" }
          ],
        };
      case "family":
        return {
          icon: <Home className="w-5 h-5" />,
          features: [
            { icon: <Shield className="w-4 h-4" />, text: "Child safety certified" },
            { icon: <Star className="w-4 h-4" />, text: "Learning accredited" },
            { icon: <Users className="w-4 h-4" />, text: "Nanny services" }
          ],
        };
      default:
        return {
          icon: <Star className="w-5 h-5" />,
          features: [
            { icon: <Star className="w-4 h-4" />, text: "Premium experience" },
            { icon: <Shield className="w-4 h-4" />, text: "Safety protocols" },
            { icon: <Users className="w-4 h-4" />, text: "Expert guides" }
          ],
        };
    }
  };

  const packageDetails = getPackageDetails(pkg.packageType);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_12px_40px_rgb(0,0,0,0.08)] transition-all duration-300"
    >
      {/* Package Image */}
      {pkg.images?.length > 0 && (
        <div className="h-48 relative">
          <img
            src={pkg.images[0]}
            alt={pkg.name}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      <div className="p-8">
        {/* Package Header */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <div className="flex items-center mb-2">
              <div className="bg-blue-50 p-2.5 rounded-lg text-blue-600 mr-3">
                {packageDetails.icon}
              </div>
              <h3 className="text-2xl font-semibold text-gray-900">{pkg.name}</h3>
            </div>
            <p className="text-gray-600 pl-12">{pkg.description}</p>
          </div>
        </div>

        {/* Price and Duration */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center text-blue-600 font-medium">
            <span className="text-2xl">${pkg.price}</span>
            <span className="text-sm ml-1">/person</span>
          </div>
          <div className="flex items-center text-gray-600">
            <Clock className="w-4 h-4 mr-1" />
            <span>{pkg.duration}</span>
          </div>
        </div>

        {/* Destinations */}
        <div className="flex items-center mb-4">
          <MapPin className="w-4 h-4 text-gray-500 mr-2" />
          <div className="flex flex-wrap gap-2">
            {pkg.destinations?.map((dest, i) => (
              <span key={i} className="text-sm bg-gray-100 px-2 py-1 rounded">
                {dest}
              </span>
            ))}
          </div>
        </div>

        {/* Departure Cities */}
        {pkg.departureCities?.length > 0 && (
          <div className="flex items-center mb-6">
            <Plane className="w-4 h-4 text-gray-500 mr-2" />
            <div className="flex flex-wrap gap-2">
              {pkg.departureCities.map((city, i) => (
                <span key={i} className="text-sm bg-gray-100 px-2 py-1 rounded">
                  {city}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Highlights */}
        <div className="border-t border-gray-100 pt-6 mb-6">
          <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">
            CURATED EXPERIENCES
          </h4>
          <ul className="space-y-3 mb-6">
            {pkg.highlights?.slice(0, 5).map((item, i) => (
              <li key={i} className="flex items-start">
                <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Inclusions & Exclusions */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
              INCLUDES
            </h4>
            <ul className="space-y-2">
              {pkg.inclusions?.slice(0, 3).map((item, i) => (
                <li key={i} className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  <span className="text-sm text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
              EXCLUDES
            </h4>
            <ul className="space-y-2">
              {pkg.exclusions?.slice(0, 3).map((item, i) => (
                <li key={i} className="flex items-center">
                  <svg className="w-4 h-4 text-red-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  <span className="text-sm text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Accommodation */}
        {pkg.accommodation && (
          <div className="mb-6">
            <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
              ACCOMMODATION
            </h4>
            <div className="flex items-center">
              <Hotel className="w-4 h-4 text-gray-500 mr-2" />
              <span className="text-sm text-gray-700">
                {pkg.accommodation.name} ({pkg.accommodation.type})
              </span>
              <div className="flex ml-2">
                {[...Array(pkg.accommodation.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Flight Info */}
        {pkg.flights && (
          <div className="mb-6">
            <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
              FLIGHT DETAILS
            </h4>
            <div className="space-y-2">
              {pkg.flights.onward && (
                <div className="flex items-center text-sm text-gray-700">
                  <Plane className="w-4 h-4 text-gray-500 mr-2" />
                  <span>
                    {pkg.flights.onward.airline}: {pkg.flights.onward.departure} → {pkg.flights.onward.arrival}
                  </span>
                </div>
              )}
              {pkg.flights.return && (
                <div className="flex items-center text-sm text-gray-700">
                  <Plane className="w-4 h-4 text-gray-500 mr-2 transform rotate-180" />
                  <span>
                    {pkg.flights.return.airline}: {pkg.flights.return.departure} → {pkg.flights.return.arrival}
                  </span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Premium Features */}
        <div className="mb-6">
          <div className="flex flex-wrap gap-2">
            {packageDetails.features.map((feature, i) => (
              <PremiumFeature key={i} icon={feature.icon} text={feature.text} />
            ))}
          </div>
        </div>

        {/* CTA Button */}
        <Link
          href={`/packages/${pkg._id}`}
          className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-4 rounded-xl font-medium group transition-all duration-300 shadow-[0_4px_15px_rgba(59,130,246,0.3)] hover:shadow-[0_6px_20px_rgba(59,130,246,0.4)]"
        >
          <span>Explore Package</span>
          <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      </div>
    </motion.div>
  );
};

const PackagesPage = () => {
  const [packages, setPackages] = useState<Package[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const response = await fetch('/api/admin/packages/?isActive=true');
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
          throw new TypeError("Response is not JSON");
        }
        
        const data = await response.json();
        setPackages(data.packages || data); // Handle both { packages: [...] } and direct array responses
      } catch (error) {
        console.error("Error fetching packages:", error);
        setError(error instanceof Error ? error.message : "Failed to load packages");
      } finally {
        setLoading(false);
      }
    };

    fetchPackages();
  }, []);

  if (loading) {
    return (
      <div className="bg-gray-50 min-h-screen">
        <Header />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center mb-20">
            <div className="inline-flex items-center px-4 py-2 bg-blue-50 rounded-full mb-4">
              <span className="text-sm font-medium text-blue-600">WORLD-CLASS TRAVEL SOLUTIONS</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
              Exceptional Travel <span className="text-blue-600">Experiences</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Meticulously crafted journeys delivering unmatched service excellence and memorable moments
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white border border-gray-200 rounded-2xl p-8 h-[600px] animate-pulse"></div>
            ))}
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-gray-50 min-h-screen">
        <Header />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center mb-20">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
              Error Loading Packages
            </h1>
            <p className="text-xl text-red-600 max-w-3xl mx-auto mb-8">
              {error}
            </p>
            <button 
              onClick={() => window.location.reload()}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-20">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center px-4 py-2 bg-blue-50 rounded-full mb-4"
          >
            <span className="text-sm font-medium text-blue-600">WORLD-CLASS TRAVEL SOLUTIONS</span>
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight"
          >
            Exceptional Travel <span className="text-blue-600">Experiences</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl text-gray-600 max-w-3xl mx-auto"
          >
            Meticulously crafted journeys delivering unmatched service excellence and memorable moments
          </motion.p>
        </div>
        
        {packages.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {packages.map((pkg) => (
              <PackageCard key={pkg._id} pkg={pkg} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <h3 className="text-2xl font-medium text-gray-700 mb-4">
              No packages available at the moment
            </h3>
            <p className="text-gray-500">
              Please check back later or contact us for more information
            </p>
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default PackagesPage;