"use client";
import { motion, useAnimation, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { Package } from "../types/common";
import Link from "next/link";

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
      staggerChildren: 0.2,
      ease: [0.16, 1, 0.3, 1],
      duration: 1
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 60, rotateY: 15 },
  visible: {
    opacity: 1,
    y: 0,
    rotateY: 0,
    transition: {
      ease: [0.16, 1, 0.3, 1],
      duration: 0.8
    }
  },
  hover: {
    y: -15,
    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
    transition: {
      duration: 0.4,
      ease: "easeOut"
    }
  }
};

const imageHoverVariants = {
  hover: {
    scale: 1.1,
    transition: {
      duration: 1.2,
      ease: [0.22, 1, 0.36, 1]
    }
  }
};

const badgeVariants = {
  hover: {
    rotate: [0, -5, 5, 0],
    transition: {
      duration: 0.6
    }
  }
};

const PackagesSection = () => {
  const [activePackage, setActivePackage] = useState<number | null>(null);
  const controls = useAnimation();

  // Auto-rotate feature
  useEffect(() => {
    const interval = setInterval(() => {
      setActivePackage(prev => {
        const next = prev === null ? 0 : (prev + 1) % packages.length;
        highlightPackage(next);
        return next;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const highlightPackage = async (index: number) => {
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
  };

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

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {packages.map((pkg, index) => (
            <motion.div
              key={pkg.id}
              className="group relative bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-100/50 min-h-[700px] flex flex-col"
              variants={cardVariants}
              whileHover="hover"
              animate={activePackage === index ? controls : {}}
              onHoverStart={() => highlightPackage(index)}
              onHoverEnd={() => setActivePackage(null)}
              style={{ perspective: 1000 }}
            >
              <div className="relative h-80 overflow-hidden">
                <motion.div
                  className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent z-10"
                  variants={imageHoverVariants}
                />
                <motion.img
                  src={pkg.image}
                  alt={pkg.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                  variants={imageHoverVariants}
                />
                {pkg.badge && (
                  <motion.div
                    className={`absolute top-6 right-6 px-4 py-1.5 rounded-full text-sm font-bold shadow-lg z-20 ${pkg.badge === "Popular"
                        ? "bg-gradient-to-r from-amber-400 to-amber-500 text-gray-900"
                        : pkg.badge === "Best Seller"
                          ? "bg-gradient-to-r from-emerald-500 to-emerald-600 text-white"
                          : "bg-gradient-to-r from-rose-500 to-pink-600 text-white"
                      }`}
                    variants={badgeVariants}
                  >
                    {pkg.badge}
                  </motion.div>
                )}
                <div className="absolute bottom-6 left-6 z-20">
                  <span className="inline-block bg-black/80 text-white px-4 py-1.5 rounded-full text-sm font-medium backdrop-blur-sm">
                    {pkg.duration}
                  </span>
                </div>
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
                        <svg
                          className="w-5 h-5 text-blue-500 mr-3 mt-0.5 flex-shrink-0"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span className="text-gray-700 text-sm">{feature}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>

                <div className="mt-auto">
                  <motion.button
                    className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 px-8 rounded-xl font-medium relative overflow-hidden group"
                    whileHover={{
                      scale: 1.02,
                      boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.4)"
                    }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                      Book This Package
                    </span>
                    <span className="absolute inset-0 bg-gradient-to-r from-blue-700 to-blue-800 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0" />
                    <span className="absolute inset-0 border-2 border-white/20 rounded-xl pointer-events-none" />
                  </motion.button>
                </div>
              </div>

              {/* Glow effect */}
              <div className="absolute inset-0 rounded-3xl pointer-events-none overflow-hidden">
                <div className="absolute inset-0 bg-blue-500/10 group-hover:opacity-100 opacity-0 transition-opacity duration-500 mix-blend-overlay" />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* View all packages button */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Link href="/packages">
            <button className="inline-flex items-center justify-center px-8 py-4 border-2 border-gray-300 rounded-xl text-gray-700 font-medium hover:bg-gray-50 hover:border-gray-400 transition-all duration-300 group">
              <span>View All Packages</span>
              <svg
                className="w-5 h-5 ml-2 transition-transform duration-300 group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default PackagesSection;