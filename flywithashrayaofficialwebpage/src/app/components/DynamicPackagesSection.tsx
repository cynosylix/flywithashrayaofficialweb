"use client";

import { motion } from "framer-motion";
import { ArrowRight, CheckCircle, } from "react-feather";
import { usePackages } from '../hooks/usePackages';
import Link from "next/link";

const DynamicPackagesSection = () => {
  const { packages, loading, error } = usePackages();

  if (loading) {
    return (
      <section id="packages" className="py-28 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 rounded w-1/4 mx-auto mb-4"></div>
              <div className="h-12 bg-gray-200 rounded w-3/4 mx-auto mb-8"></div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="bg-white rounded-2xl p-8 shadow-lg">
                    <div className="h-48 bg-gray-200 rounded-lg mb-4"></div>
                    <div className="h-6 bg-gray-200 rounded mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded mb-4"></div>
                    <div className="space-y-2">
                      <div className="h-4 bg-gray-200 rounded"></div>
                      <div className="h-4 bg-gray-200 rounded"></div>
                      <div className="h-4 bg-gray-200 rounded"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="packages" className="py-28 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-red-600 mb-4">Error Loading Packages</h2>
            <p className="text-gray-600">{error}</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="packages" className="py-28 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-40 right-20 w-72 h-72 bg-amber-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-20 left-1/2 w-60 h-60 bg-emerald-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="inline-flex items-center justify-center px-4 py-2 bg-blue-50 rounded-full mb-6">
            <span className="text-sm font-medium text-blue-600 tracking-wider">PREMIUM TRAVEL</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-medium text-gray-900 mb-6 leading-tight">
            <span className="bg-gradient-to-r from-blue-600 to-amber-500 bg-clip-text text-transparent">Exclusive</span> Travel Packages
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Immerse yourself in handcrafted journeys designed for the most discerning travelers
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {packages.map((pkg, index) => (
            <motion.div
              key={pkg.id}
              className="group relative bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-100/50 min-h-[700px] flex flex-col"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="relative h-80 overflow-hidden">
                <motion.div
                  className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent z-10"
                  whileHover={{ opacity: 0.8 }}
                />
                <motion.img
                  src={pkg.image}
                  alt={pkg.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                />
                {pkg.badge && (
                  <motion.div
                    className={`absolute top-6 right-6 px-4 py-1.5 rounded-full text-sm font-bold shadow-lg z-20 ${
                      pkg.badge === "Popular"
                        ? "bg-gradient-to-r from-amber-400 to-amber-500 text-gray-900"
                        : pkg.badge === "Best Seller"
                          ? "bg-gradient-to-r from-emerald-500 to-emerald-600 text-white"
                          : "bg-gradient-to-r from-rose-500 to-pink-600 text-white"
                    }`}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    {pkg.badge}
                  </motion.div>
                )}
              </div>

              <div className="p-8 flex flex-col flex-grow">
                <div className="flex-grow">
                  <div className="flex justify-between items-start mb-6">
                    <h3 className="text-2xl font-serif font-semibold text-gray-900">
                      {pkg.title}
                    </h3>
                    <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">
                      {pkg.price}
                    </span>
                  </div>

                  <p className="text-gray-600 mb-6 text-base leading-relaxed">
                    {pkg.description}
                  </p>

                  <ul className="mb-8 space-y-3.5">
                    {pkg.features.map((feature, i) => (
                      <motion.li
                        key={i}
                        className="flex items-start"
                        whileHover={{ x: 5 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700 text-sm">{feature}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>

                <div className="mt-auto">
                  <motion.button
                    className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 px-8 rounded-xl font-medium relative overflow-hidden group"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Link href="/contact">
                      <span className="relative z-10 flex items-center justify-center gap-2">
                        Book This Package
                        <ArrowRight className="w-5 h-5" />
                      </span>
                    </Link>
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {packages.length === 0 && (
          <div className="text-center mt-16">
            <p className="text-gray-600">No packages available at the moment.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default DynamicPackagesSection;
