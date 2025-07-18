"use client";
import { motion } from "framer-motion";
import { Package } from "../types/common";

const packages: Package[] = [
  {
    id: 1,
    title: "Thailand Adventure",
    description: "Experience the vibrant culture and stunning landscapes of Thailand",
    price: "$2,499",
    duration: "14 Days",
    features: [
      "Private guided tours in Bangkok, Chiang Mai & Phuket",
      "5-star accommodations with city views",
      "Gourmet dining experiences",
      "First-class transportation"
    ],
    image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    badge: "Popular"
  },
  {
    id: 2,
    title: "Bali Retreat",
    description: "Relax and rejuvenate in the tropical paradise of Bali",
    price: "$1,899",
    duration: "10 Days",
    features: [
      "Luxury beachfront resort",
      "Daily yoga and meditation sessions",
      "Traditional Balinese spa treatments",
      "Private tours to cultural sites"
    ],
    image: "https://images.unsplash.com/photo-1464037866556-6812c9d1c72e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    badge: "Best Seller"
  },
  {
    id: 3,
    title: "Vietnam Explorer",
    description: "Discover the rich history and natural beauty of Vietnam",
    price: "$1,599",
    duration: "7 Days",
    features: [
      "Guided tours of Hanoi and Ho Chi Minh City",
      "Cruise in Ha Long Bay",
      "Street food tours with local experts",
      "Boutique hotel accommodations"
    ],
    image: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1632&q=80",
    badge: "Limited Time"
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      ease: [0.16, 1, 0.3, 1],
      duration: 0.8
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      ease: [0.16, 1, 0.3, 1],
      duration: 0.8
    }
  }
};

const PackagesSection = () => {
  return (
    <section id="packages" className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-medium text-gray-900 mb-4">
            Premium Travel Packages
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Curated experiences designed for the discerning traveler
          </p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {packages.map((pkg) => (
            <motion.div
              key={pkg.id}
              className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-500 border border-gray-100"
              variants={cardVariants}
              whileHover={{ y: -10 }}
            >
              <div className="relative h-64 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
                <img
                  src={pkg.image}
                  alt={pkg.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                {pkg.badge && (
                  <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold shadow-sm z-20 ${
                    pkg.badge === "Popular" 
                      ? "bg-amber-400 text-gray-900" 
                      : pkg.badge === "Best Seller" 
                        ? "bg-emerald-500 text-white" 
                        : "bg-rose-500 text-white"
                  }`}>
                    {pkg.badge}
                  </div>
                )}
                <div className="absolute bottom-4 left-4 z-20">
                  <span className="inline-block bg-black/70 text-white px-3 py-1 rounded-full text-xs font-medium">
                    {pkg.duration}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-serif font-semibold text-gray-900">
                    {pkg.title}
                  </h3>
                  <span className="text-xl font-bold text-blue-600">
                    {pkg.price}
                  </span>
                </div>
                
                <p className="text-gray-600 mb-5 text-sm leading-relaxed">
                  {pkg.description}
                </p>
                
                <ul className="mb-6 space-y-3">
                  {pkg.features.slice(0, 3).map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <svg className="w-5 h-5 text-blue-500 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-gray-700 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <motion.button
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 px-6 rounded-lg font-medium transition-all duration-300 relative overflow-hidden group"
                  whileHover={{ 
                    scale: 1.02,
                    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)"
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="relative z-10">Book This Package</span>
                  <span className="absolute inset-0 bg-gradient-to-r from-blue-700 to-blue-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0" />
                </motion.button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default PackagesSection;