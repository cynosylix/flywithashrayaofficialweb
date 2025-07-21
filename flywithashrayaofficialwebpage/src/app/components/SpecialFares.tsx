"use client";
import { motion, useInView, useAnimation } from "framer-motion";
import { useEffect, useRef } from "react";
import { cardVariants, containerVariants, FeatureItemVariants, floatingOrbVariants, PriceVariants, TitleVariants } from "../animationVariants";




const SpecialFares = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.1 });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  const specials = [
    {
      title: "Summer Getaway Sale",
      price: 899,
      originalPrice: 1499,
      features: [
        "Valid for travel between June - August",
        "Flights + 4-star hotel included",
        "Free cancellation up to 30 days",
        "10 European destinations"
      ],
      cta: "Grab This Deal",
      highlightColor: "from-amber-400 to-yellow-500",
      accentColor: "bg-amber-500",
      icon: "☀️"
    },
    {
      title: "Winter Escape",
      price: 1199,
      originalPrice: 1799,
      features: [
        "Book by September 30",
        "Daily breakfast & spa credit",
        "Room upgrade available",
        "Ski resorts & tropical options"
      ],
      cta: "Book Now",
      highlightColor: "from-blue-400 to-cyan-500",
      accentColor: "bg-blue-500",
      icon: "❄️"
    },
    {
      title: "Honeymoon Package",
      price: 2299,
      originalPrice: 2999,
      features: [
        "Romantic ocean view suite",
        "Champagne & flowers included",
        "Couples massage & private dinner",
        "Free anniversary return"
      ],
      cta: "Plan Honeymoon",
      highlightColor: "from-pink-500 to-rose-500",
      accentColor: "bg-rose-500",
      icon: "💖"
    }
  ];


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

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
          variants={containerVariants}
          initial="hidden"
          animate={controls}
        >
          {specials.map((special, index) => (
            <motion.div 
              key={index}
              className="flex perspective-1000"
              variants={cardVariants}
              whileHover="hover"
            >
              <div className={`relative flex-1 rounded-2xl overflow-hidden transform-style-preserve-3d transition-all duration-500 hover:z-10`}>
                {/* Card background gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${special.highlightColor} opacity-20`}></div>
                
                {/* Card content */}
                <div className="relative bg-gray-900/80 backdrop-blur-sm border border-gray-800/50 rounded-2xl p-8 h-full flex flex-col">
                  {/* Icon badge */}
                  <motion.div 
                    className={`w-16 h-16 ${special.accentColor} rounded-xl flex items-center justify-center text-2xl mb-6 mx-auto shadow-lg`}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ 
                      type: "spring",
                      delay: 0.3 + index * 0.1,
                      stiffness: 200,
                      damping: 10
                    }}
                  >
                    {special.icon}
                  </motion.div>
                  
                  {/* Title */}
                  <motion.h3 
                    className="text-2xl font-bold text-center text-white mb-6"
                    whileHover={{ color: "#fbbf24" }}
                  >
                    {special.title}
                  </motion.h3>
                  
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
                    <div className={`text-sm ${special.accentColor} text-white px-3 py-1 rounded-full inline-block mt-2`}>
                      Save ${special.originalPrice - special.price}
                    </div>
                  </motion.div>
                  
                  {/* Features */}
                  <ul className="space-y-3 mb-8 flex-grow">
                    {special.features.map((feature, i) => (
                      <motion.li 
                        key={i}
                        className="flex items-start"
                        custom={i}
                        variants={FeatureItemVariants}
                      >
                        <CheckmarkIcon />
                        <span className="text-gray-300">{feature}</span>
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
                      href="#contact"
                      className={`group w-full py-4 px-6 text-center font-medium rounded-xl bg-gradient-to-r ${special.highlightColor} text-white shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center space-x-2`}
                    >
                      <span>{special.cta}</span>
                      <ArrowRightIcon />
                    </a>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
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