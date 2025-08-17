"use client";
import { motion, useInView, useAnimation } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { cardVariants, containerVariants, FeatureItemVariants, floatingOrbVariants, PriceVariants, TitleVariants } from "../animationVariants";

interface SpecialFare {
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
  validFrom: Date;
  validTo: Date;
  travelPeriodText?: string;
  bookingDeadline?: Date;
  inclusions: string[];
  isFeatured: boolean;
  isLimitedTime: boolean;
  isBestSeller: boolean;
  images: { url: string; caption?: string; isFeatured?: boolean }[];
  thumbnail?: string;
  badgeText?: string;
  badgeColor?: string;
  fareType: string;
  hotelIncluded?: boolean;
  hotelRating?: number;
}

const SpecialFares = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.1 });
  const controls = useAnimation();
  const [specials, setSpecials] = useState<SpecialFare[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSpecialFares = async () => {
     try {
  const response = await fetch('/api/special-fares?limit=3');
  if (!response.ok) {
    // Set a friendly message instead of throwing an error
    setSpecials([]); // Empty the specials array
    return; // Exit early
  }
  
  const data = await response.json();
  
  if (data.data.length === 0) {
    // No special fares available
    setSpecials([]);
  } else {
    setSpecials(data.data);
  }
  
} catch (err) {
  // For actual errors, still show an error message
  setError(err instanceof Error ? err.message : 'An unknown error occurred');
} finally {
  setLoading(false);
}
    };

    fetchSpecialFares();
  }, []);

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  // Checkmark SVG component
  const CheckmarkIcon = () => (
    <svg className="w-5 h-5 text-amber-400 mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
    </svg>
  );

  // Arrow Right SVG component
  const ArrowRightIcon = () => (
    <svg className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
    </svg>
  );

  // Get color classes based on fare type or other properties
  const getColorClasses = (fare: SpecialFare) => {
    if (fare.isBestSeller) {
      return {
        highlightColor: "from-amber-400 to-yellow-500",
        accentColor: "bg-amber-500",
        icon: "🏆"
      };
    }
    if (fare.isLimitedTime) {
      return {
        highlightColor: "from-blue-400 to-cyan-500",
        accentColor: "bg-blue-500",
        icon: "⏳"
      };
    }
    if (fare.hotelIncluded && fare.hotelRating && fare.hotelRating >= 4) {
      return {
        highlightColor: "from-pink-500 to-rose-500",
        accentColor: "bg-rose-500",
        icon: "🏨"
      };
    }
    
    // Default colors
    return {
      highlightColor: "from-emerald-400 to-teal-500",
      accentColor: "bg-teal-500",
      icon: "✈️"
    };
  };

  // Get CTA text based on fare type
  const getCtaText = (fare: SpecialFare) => {
    if (fare.isLimitedTime) return "Book Now";
    if (fare.fareType === 'Package Deal') return "View Package";
    return "View Deal";
  };

  if (loading) {
    return (
      <section className="py-24 bg-gradient-to-b from-gray-950 to-gray-900">
        <div className="container mx-auto px-4 text-center text-white">
          Loading special offers...
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-24 bg-gradient-to-b from-gray-950 to-gray-900">
        <div className="container mx-auto px-4 text-center text-red-400">
          Error: {error}
        </div>
      </section>
    );
  }

  return (
    <section 
      id="specials" 
      className="py-24 bg-gradient-to-b from-gray-950 to-gray-900 relative overflow-hidden"
      ref={ref}
    >
      {/* 3D Parallax Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-900/50 to-gray-950/90"></div>
        <div className="absolute inset-0 opacity-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MDAiIGhlaWdodD0iNjAwIiB2aWV3Qm94PSIwIDAgNjAwIDYwMCI+PHBhdGggZD0iTTMwMCAxNTBjODIuOCAwIDE1MCA2Ny4yIDE1MCAxNTBzLTY3LjIgMTUwLTE1MCAxNTBTMTUwIDM4Mi44IDE1MCAzMDAgMjE3LjIgMTUwIDMwMCAxNTB6IiBmaWxsPSJub25lIiBzdHJva2U9IiNmZmYiIHN0cm9rZS13aWR0aD0iMSIgc3Ryb2tlLWRhc2hhcnJheT0iMTAsMTAiLz48L3N2Zz4=')] bg-[length:40px_40px]"></div>
        
        {/* Floating orbs */}
        {[1, 2, 3, 4, 5].map((i) => (
          <motion.div
            key={i}
            className={`absolute rounded-full ${i % 2 === 0 ? 'bg-amber-400/20' : 'bg-blue-400/20'}`}
            style={{
              width: `${50 + i * 10}px`,
              height: `${50 + i * 10}px`,
              top: `${10 + i * 15}%`,
              left: `${i * 15}%`,
              filter: 'blur(20px)'
            }}
            variants={floatingOrbVariants}
            initial="initial"
            animate="animate"
            custom={i}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          className="text-center mb-20"
          initial="hidden"
          animate={controls}
          variants={TitleVariants}
        >
          <motion.h2 
            className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-400 to-yellow-500 mb-6"
            whileHover={{
              textShadow: "0 0 15px rgba(245, 158, 11, 0.5)",
              transition: { duration: 0.3 }
            }}
          >
            Exclusive Travel Deals
          </motion.h2>
          <motion.p 
            className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
            whileHover={{ x: 3 }}
          >
            Discover limited-time offers with exceptional value for your dream vacation.
          </motion.p>
        </motion.div>

        {specials.length === 0 ? (
          <div className="text-center text-gray-400 py-10">
            No special offers available at the moment. Please check back later.
          </div>
        ) : (
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
            variants={containerVariants}
            initial="hidden"
            animate={controls}
          >
            {specials.map((special, index) => {
              const colors = getColorClasses(special);
              const ctaText = getCtaText(special);
              
              return (
                <motion.div 
                  key={special._id}
                  className="flex perspective-1000"
                  variants={cardVariants}
                  whileHover="hover"
                >
                  <div className={`relative flex-1 rounded-2xl overflow-hidden transform-style-preserve-3d transition-all duration-500 hover:z-10`}>
                    {/* Card background gradient */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${colors.highlightColor} opacity-20`}></div>
                    
                    {/* Card content */}
                    <div className="relative bg-gray-900/80 backdrop-blur-sm border border-gray-800/50 rounded-2xl p-8 h-full flex flex-col">
                      {/* Icon badge */}
                      <motion.div 
                        className={`w-16 h-16 ${colors.accentColor} rounded-xl flex items-center justify-center text-2xl mb-6 mx-auto shadow-lg`}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ 
                          type: "spring",
                          delay: 0.3 + index * 0.1,
                          stiffness: 200,
                          damping: 10
                        }}
                      >
                        {colors.icon}
                      </motion.div>
                      
                      {/* Title */}
                      <motion.h3 
                        className="text-2xl font-bold text-center text-white mb-6"
                        whileHover={{ color: "#fbbf24" }}
                      >
                        {special.title}
                      </motion.h3>
                      
                      {/* Subtitle if exists */}
                      {special.subtitle && (
                        <motion.p className="text-center text-gray-400 mb-4">
                          {special.subtitle}
                        </motion.p>
                      )}
                      
                      {/* Price */}
                      <motion.div 
                        className="text-center mb-8"
                        variants={PriceVariants}
                        whileHover="hover"
                      >
                        <div className="text-5xl font-bold text-white">
                          ${special.price}
                        </div>
                        <div className="text-lg text-gray-400 line-through mt-1">
                          ${special.originalPrice}
                        </div>
                        {special.discountPercentage && (
                          <div className={`text-sm ${colors.accentColor} text-white px-3 py-1 rounded-full inline-block mt-2`}>
                            Save {special.discountPercentage}% (${special.discountAmount})
                          </div>
                        )}
                      </motion.div>
                      
                      {/* Features (using inclusions) */}
                      <ul className="space-y-3 mb-8 flex-grow">
                        {special.inclusions.slice(0, 4).map((inclusion, i) => (
                          <motion.li 
                            key={i}
                            className="flex items-start"
                            custom={i}
                            variants={FeatureItemVariants}
                          >
                            <CheckmarkIcon />
                            <span className="text-gray-300">{inclusion}</span>
                          </motion.li>
                        ))}
                      </ul>
                      
                      {/* CTA Button */}
                      <motion.div
                        whileHover={{ 
                          scale: 1.02,
                          transition: { duration: 0.2 }
                        }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <a
                          href={`/special-fares/${special._id}`}
                          className={`group w-full py-4 px-6 text-center font-medium rounded-xl bg-gradient-to-r ${colors.highlightColor} text-white shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center space-x-2`}
                        >
                          <span>{ctaText}</span>
                          <ArrowRightIcon />
                        </a>
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </div>

      {/* Decorative floating elements */}
      <motion.div 
        className="absolute top-1/4 left-1/4 w-6 h-6 rounded-full bg-amber-400/30 blur-md"
        animate={{
          y: [0, -40, 0],
          x: [0, 20, 0],
          opacity: [0.3, 0.7, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div 
        className="absolute bottom-1/3 right-1/4 w-8 h-8 rounded-full bg-blue-400/30 blur-md"
        animate={{
          y: [0, -30, 0],
          x: [0, -15, 0],
          opacity: [0.4, 0.8, 0.4],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      />
    </section>
  );
};

export default SpecialFares;