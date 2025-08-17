"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { FiCheck, FiArrowRight, FiClock, FiStar, FiAward, FiGlobe } from "react-icons/fi";

interface SpecialFare {
  _id: string;
  title: string;
  subtitle?: string;
  price: number;
  originalPrice?: number;
  discountPercentage?: number;
  discountAmount?: number;
  inclusions?: string[];
  isLimitedTime?: boolean;
  isBestSeller?: boolean;
  hotelIncluded?: boolean;
  hotelRating?: number;
  fareType?: string;
  images?: { url: string }[];
}

interface ParticlePosition {
  sizeClass: string;
  top: number;
  left: number;
  colorClass: string;
}

const SpecialFares = () => {
  const [specials, setSpecials] = useState<SpecialFare[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeCard, setActiveCard] = useState<number | null>(null);
  const [particlePositions, setParticlePositions] = useState<ParticlePosition[] | null>(null);

  useEffect(() => {
  // Generate particles only on client-side
  const generateParticles = (): ParticlePosition[] => {
    const particles: ParticlePosition[] = [];
    const count = 25;
    
    for (let i = 0; i < count; i++) {
      const size = Math.floor(Math.sin(i) * 5 + 10);
      particles.push({
        sizeClass: `w-${size}px h-${size}px`,
        top: Math.round((Math.sin(i / 2) * 30 + 50) % 100),
        left: Math.round((Math.cos(i / 2) * 30 + 50) % 100),
        colorClass: i % 4 === 0 ? 'bg-amber-400/10' :
                   i % 4 === 1 ? 'bg-blue-400/10' :
                   i % 4 === 2 ? 'bg-rose-400/10' : 'bg-teal-400/10'
      });
    }
    return particles;
  };

  setParticlePositions(generateParticles());
}, []);
  useEffect(() => {
    const fetchSpecialFares = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/admin/special-fares?limit=3");
        
        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(
            errorData.message || `Failed to load (Status: ${response.status})`
          );
        }

        const { data } = await response.json();

        if (!Array.isArray(data)) {
          throw new Error("Invalid data format received from API");
        }

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const processedData = data.map((item: any) => ({
          _id: item._id,
          title: item.title,
          subtitle: item.subtitle,
          price: Number(item.price),
          originalPrice: Number(item.originalPrice) || item.price,
          discountPercentage: item.discountPercentage
            ? Number(item.discountPercentage)
            : item.originalPrice
              ? Math.round(
                ((item.originalPrice - item.price) / item.originalPrice) * 100
              )
              : 0,
          discountAmount: item.discountAmount
            ? Number(item.discountAmount)
            : item.originalPrice
              ? item.originalPrice - item.price
              : 0,
          inclusions: item.inclusions || [],
          isLimitedTime: item.isLimitedTime || false,
          isBestSeller: item.isBestSeller || false,
          hotelIncluded: item.hotelIncluded || false,
          hotelRating: item.hotelRating ? Number(item.hotelRating) : undefined,
          fareType: item.fareType || "Package Deal",
          images: item.images || []
        }));

        setSpecials(processedData);
        setError(null);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to load special fares"
        );
        setSpecials([]);
      } finally {
        setLoading(false);
      }
    };

    fetchSpecialFares();
  }, []);

  const getColorClasses = (fare: SpecialFare) => {
    if (fare.isBestSeller) {
      return {
        highlightColor: "from-amber-500 to-yellow-600",
        accentColor: "bg-gradient-to-br from-amber-500 to-yellow-600",
        icon: <FiAward className="w-5 h-5 text-white" />,
        badgeText: "Best Seller",
        badgeColor: "bg-gradient-to-r from-amber-500 to-yellow-600",
        glowColor: "shadow-[0_0_25px_rgba(245,158,11,0.3)]"
      };
    }
    if (fare.isLimitedTime) {
      return {
        highlightColor: "from-blue-500 to-cyan-600",
        accentColor: "bg-gradient-to-br from-blue-500 to-cyan-600",
        icon: <FiClock className="w-5 h-5 text-white" />,
        badgeText: "Limited Time",
        badgeColor: "bg-gradient-to-r from-blue-500 to-cyan-600",
        glowColor: "shadow-[0_0_25px_rgba(59,130,246,0.3)]"
      };
    }
    if (fare.hotelIncluded && (fare.hotelRating ?? 0) >= 4) {
      return {
        highlightColor: "from-rose-500 to-pink-600",
        accentColor: "bg-gradient-to-br from-rose-500 to-pink-600",
        icon: <FiStar className="w-5 h-5 text-white" />,
        badgeText: "Premium Hotel",
        badgeColor: "bg-gradient-to-r from-rose-500 to-pink-600",
        glowColor: "shadow-[0_0_25px_rgba(244,63,94,0.3)]"
      };
    }
    return {
      highlightColor: "from-teal-500 to-emerald-600",
      accentColor: "bg-gradient-to-br from-teal-500 to-emerald-600",
      icon: "✈️",
      badgeText: "Featured Deal",
      badgeColor: "bg-gradient-to-r from-teal-500 to-emerald-600",
      glowColor: "shadow-[0_0_25px_rgba(13,148,136,0.3)]"
    };
  };

  if (error) {
    return (
      <section className="min-h-[50vh] py-16 bg-gradient-to-b from-gray-950 to-gray-900 flex items-center justify-center">
        <motion.div 
          className="max-w-md bg-gradient-to-br from-gray-900/80 to-gray-800/60 border border-gray-700/30 backdrop-blur-xl rounded-2xl px-6 py-8 text-center"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            animate={{ 
              rotate: [0, 10, -10, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{ 
              duration: 0.8, 
              repeat: Infinity,
              repeatType: "reverse" 
            }}
            className="mx-auto mb-4 w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center"
          >
            <svg className="w-6 h-6 text-red-400" fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </motion.div>
          <h3 className="text-lg font-bold text-red-300 mb-2">Couldnt Load Deals</h3>
          <p className="text-gray-400 mb-4">{error}</p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.location.reload()}
            className="text-sm bg-gradient-to-r from-red-600 to-rose-700 text-white px-4 py-2 rounded-lg transition-all hover:shadow-lg hover:shadow-red-500/30 font-medium"
          >
            Retry Now
          </motion.button>
        </motion.div>
      </section>
    );
  }

  return (
    <section  
      id="specials"
      className="py-16 bg-gradient-to-b from-gray-950 to-gray-900 relative overflow-hidden"
    >
      {/* Background elements */}
      <div className="absolute inset-0">
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[length:20px_20px]" />
        
        {/* Floating particles - client-side only */}
        {particlePositions && particlePositions.map((pos, i) => (
          <motion.div
            key={i}
            className={`absolute rounded-full ${pos.colorClass} ${pos.sizeClass}`}
            style={{
              top: `${pos.top}%`,
              left: `${pos.left}%`,
            }}
            animate={{
              y: [0, -40, 0],
              x: [0, (Math.sin(i) - 0.5) * 30, 0],
              opacity: [0.05, 0.3, 0.05],
            }}
            transition={{
              duration: Math.sin(i) * 6 + 8,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.2
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.h2
            className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-yellow-500 mb-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-block">Exclusive Travel Deals</span>
          </motion.h2>
          <motion.p
            className="text-gray-400 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Premium experiences at exceptional value
          </motion.p>
          <motion.div
            className="mt-4 flex justify-center"
            initial={{ width: 0 }}
            animate={{ width: "100px" }}
            transition={{ delay: 0.3 }}
          >
            <div className="h-1 w-24 bg-gradient-to-r from-amber-500 to-yellow-500 rounded-full" />
          </motion.div>
        </div>

        {/* Compact Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {specials.map((special, index) => {
            const colors = getColorClasses(special);
            
            const discountAmount = special.discountAmount || 0;
            const discountPercentage = special.discountPercentage || 0;

            return (
              <motion.div
                key={special._id}
                className="relative"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ 
                  y: -8,
                  transition: { duration: 0.3 } 
                }}
                onHoverStart={() => setActiveCard(index)}
                onHoverEnd={() => setActiveCard(null)}
              >
                {/* Card */}
                <div className={`relative h-full rounded-xl overflow-hidden border border-gray-700/30 bg-gradient-to-br from-gray-900/50 to-gray-800/30 backdrop-blur-sm transition-all duration-500 ${activeCard === index ? colors.glowColor : ''}`}>
                  {/* Animated background elements */}
                  <div className="absolute inset-0 opacity-20">
                    <div className={`absolute top-1/4 left-1/4 w-16 h-16 rounded-full ${colors.highlightColor.replace('from-', 'bg-').split(' ')[0]}`} />
                    <div className={`absolute bottom-1/4 right-1/4 w-10 h-10 rounded-full ${colors.highlightColor.replace('from-', 'bg-').split(' ')[0]}`} />
                  </div>
                  
                  {/* Card Content */}
                  <div className="relative z-10 h-full flex flex-col p-5">
                    {/* Badges */}
                    <div className="flex justify-between items-start mb-3">
                      <motion.div
                        className={`${colors.badgeColor} text-white text-xs font-semibold py-1 px-3 rounded-full relative overflow-hidden`}
                        whileHover={{ scale: 1.05 }}
                      >
                        <span className="relative z-10">{colors.badgeText}</span>
                        <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </motion.div>

                      {special.hotelIncluded && special.hotelRating && (
                        <motion.div 
                          className="flex items-center bg-black/30 text-amber-400 text-xs py-1 px-2 rounded-full"
                          whileHover={{ scale: 1.05 }}
                        >
                          <FiStar className="mr-1" />
                          {special.hotelRating.toFixed(1)}
                        </motion.div>
                      )}
                    </div>

                    {/* Animated Icon */}
                    <motion.div
                      className={`w-14 h-14 ${colors.accentColor} rounded-xl flex items-center justify-center mb-4 mx-auto`}
                      animate={{
                        rotate: [0, 5, -5, 0],
                        y: [0, -5, 0]
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        repeatType: "reverse"
                      }}
                    >
                      {colors.icon}
                    </motion.div>

                    {/* Title */}
                    <motion.h3
                      className="text-xl font-bold text-center text-white mb-2"
                      whileHover={{ color: '#fbbf24' }}
                      transition={{ duration: 0.3 }}
                    >
                      {special.title}
                    </motion.h3>

                    {/* Subtitle */}
                    {special.subtitle && (
                      <p className="text-center text-gray-300 text-sm mb-4">
                        {special.subtitle}
                      </p>
                    )}

                    {/* Price Section */}
                    <div className="text-center mb-4 relative">
                      <div className="text-3xl font-bold text-white relative inline-block">
                        <span>${special.price.toLocaleString()}</span>
                        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-amber-500 to-yellow-500 rounded-full" />
                      </div>
                      {special.originalPrice && special.originalPrice > special.price && (
                        <div className="mt-1">
                          <div className="text-sm text-gray-400 line-through">
                            ${special.originalPrice.toLocaleString()}
                          </div>
                          <motion.div
                            className={`text-xs ${colors.badgeColor} text-white px-2 py-1 rounded-full mt-1 font-medium inline-block`}
                            animate={{ scale: [1, 1.05, 1] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                          >
                            Save {discountPercentage}%
                          </motion.div>
                        </div>
                      )}
                    </div>

                    {/* Inclusions */}
                    <ul className="space-y-2 mb-4 flex-grow">
                      {special.inclusions?.slice(0, 3).map((inclusion, i) => (
                        <motion.li
                          key={i}
                          className="flex items-start py-1"
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.1 + i * 0.1 }}
                          whileHover={{ x: 5 }}
                        >
                          <FiCheck className="w-4 h-4 text-amber-400 mt-0.5 mr-2 flex-shrink-0" />
                          <span className="text-gray-300 text-sm">{inclusion}</span>
                        </motion.li>
                      ))}
                    </ul>

                    {/* CTA Button */}
                    <motion.a
                      href="/contact"
                      className={`group w-full py-3 text-center font-medium text-sm rounded-lg bg-gradient-to-r ${colors.highlightColor} text-white flex items-center justify-center mt-auto relative overflow-hidden`}
                      whileHover={{ 
                        scale: 1.03,
                        boxShadow: `0 10px 25px -5px ${colors.highlightColor.replace('from-', '').split(' ')[0].split('-')[0] === 'amber' ? 'rgba(245,158,11,0.4)' : 
                          colors.highlightColor.replace('from-', '').split(' ')[0].split('-')[0] === 'blue' ? 'rgba(59,130,246,0.4)' : 
                          colors.highlightColor.replace('from-', '').split(' ')[0].split('-')[0] === 'rose' ? 'rgba(244,63,94,0.4)' : 'rgba(13,148,136,0.4)'}`
                      }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <span className="relative z-10">Explore</span>
                      <FiArrowRight className="ml-2 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 relative z-10" />
                      <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </motion.a>
                  </div>
                </div>
                
                {/* Decorative corner elements */}
                <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-amber-500/50 rounded-tl-xl" />
                <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-amber-500/50 rounded-tr-xl" />
                <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-amber-500/50 rounded-bl-xl" />
                <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-amber-500/50 rounded-br-xl" />
              </motion.div>
            );
          })}
        </div>

        {/* View All Button */}
        <div className="mt-12 text-center">
          <motion.a 
            href="/all-deals" 
            className="inline-flex items-center text-amber-400 hover:text-amber-300 transition-colors font-medium group"
            whileHover={{ scale: 1.05 }}
          >
            <span className="mr-2">Explore all exclusive deals</span>
            <FiArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
          </motion.a>
        </div>
      </div>
      
      {/* Floating globe decoration */}
      <motion.div
        className="absolute top-10 right-10 opacity-10"
        animate={{
          y: [0, -20, 0],
          rotate: 360
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "linear"
        }}
      >
        <FiGlobe className="w-24 h-24 text-amber-400" />
      </motion.div>
    </section>
  );
};

export default SpecialFares;