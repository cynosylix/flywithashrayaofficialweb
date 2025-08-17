"use client";
import { motion, useAnimation } from "framer-motion";
import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { ArrowRight, MapPin, Clock } from "react-feather";

import Image from "next/image";

interface Package {
  _id: string;
  name: string;
  description: string;
  price: number;
  duration: string;
  destinations: string[];
  images: string[];
  rating?: number;
  reviews?: number;
  tags?: string[];
}

const PackagesSection = () => {
  const [activePackage, setActivePackage] = useState<number | null>(null);
  const [packages, setPackages] = useState<Package[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("recommended");
  const controls = useAnimation();

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const response = await fetch('/api/admin/packages/?isActive=true');

        if (!response.ok) {
          throw new Error(`Failed to load packages (status: ${response.status})`);
        }

        const data = await response.json();

        // Handle different possible response structures
        let packagesArray = [];
        if (Array.isArray(data)) {
          packagesArray = data;
        } else if (Array.isArray(data.packages)) {
          packagesArray = data.packages;
        } else if (Array.isArray(data.data)) {
          packagesArray = data.data;
        }

        if (!Array.isArray(packagesArray)) {
          throw new Error("Invalid packages data format received from API");
        }

        setPackages(packagesArray);
      } catch (error) {
        setError(error instanceof Error ? error.message : "Failed to load packages");
      } finally {
        setLoading(false);
      }
    };

    fetchPackages();
  }, []);

  const highlightPackage = useCallback(async (index: number) => {
    await controls.start({
      scale: 1,
      transition: { duration: 0.3 }
    });

    setActivePackage(index);

    await controls.start({
      scale: 1.05,
      transition: { duration: 0.4 }
    });

    await controls.start({
      scale: 1,
      transition: { duration: 0.3 }
    });
  }, [controls]);

  const filteredPackages = packages.filter(pkg => {
    const matchesSearch = searchTerm === "" ||
      pkg.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pkg.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pkg.destinations.some(d => d.toLowerCase().includes(searchTerm.toLowerCase()));

    return matchesSearch;
  });

  const sortedPackages = [...filteredPackages].sort((a, b) => {
    switch (sortOption) {
      case 'price-low': return a.price - b.price;
      case 'price-high': return b.price - a.price;
      case 'duration': return a.duration.localeCompare(b.duration);
      default: return 0;
    }
  });

  if (loading) {
    return (
      <section id="packages" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <div className="h-8 bg-gray-200 rounded w-1/4 mx-auto mb-4 animate-pulse"></div>
            <div className="h-12 bg-gray-200 rounded w-3/4 mx-auto mb-8 animate-pulse"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-xl p-6 shadow-md h-96 animate-pulse"></div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="packages" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Error Loading Packages</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Try Again
          </button>
        </div>
      </section>
    );
  }

  return (
    <section id="packages" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Our Travel Packages
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover amazing destinations with our carefully curated packages
          </p>
        </div>



        {sortedPackages.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedPackages.map((pkg, index) => (
              <motion.div
                key={pkg._id}
                className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="h-48 relative">
                  <Image
                    src={pkg.images?.[0] || "/placeholder-image.jpg"}
                    alt={pkg.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>

                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-semibold text-gray-900">{pkg.name}</h3>
                    <span className="text-lg font-bold text-blue-600">${pkg.price}</span>
                  </div>

                  <p className="text-gray-600 mb-4">{pkg.description}</p>

                  <div className="flex items-center mb-4">
                    <Clock className="w-5 h-5 text-gray-500 mr-2" />
                    <span className="text-gray-700">{pkg.duration}</span>
                  </div>

                  <div className="flex items-center mb-6">
                    <MapPin className="w-5 h-5 text-gray-500 mr-2" />
                    <div className="flex flex-wrap gap-1">
                      {pkg.destinations?.slice(0, 3).map((dest, i) => (
                        <span key={i} className="text-sm bg-gray-100 px-2 py-1 rounded">
                          {dest}
                        </span>
                      ))}
                    </div>
                  </div>

                  {pkg.rating && (
                    <div className="flex items-center mb-4">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className="text-yellow-500">
                          {i < (pkg.rating || 0) ? '★' : '☆'}
                        </span>
                      ))}
                      <span className="text-sm text-gray-600 ml-1">
                        ({pkg.reviews || 0} reviews)
                      </span>
                    </div>
                  )}

                  <Link
                    href={`/packages/${pkg._id}`}
                    className="w-full flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-medium transition-colors"
                  >
                    <span>View Details</span>
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600">No packages match your search criteria.</p>
          </div>
        )}

        <div className="text-center mt-12">
          <Link
            href="/packages"
            className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
          >
            View all packages
            <ArrowRight className="w-5 h-5 ml-2" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PackagesSection;