"use client";
import { motion, useInView, useAnimation } from "framer-motion";
import { useEffect, useRef } from "react";

const TrustedPartners = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.2 });
  const controls = useAnimation();

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        damping: 15,
        stiffness: 100
      }
    },
    hover: {
      y: -10,
      scale: 1.05,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 10
      }
    }
  };

  const titleVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  };

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  const partners = [
    { 
      name: "AirGlobal", 
      logo: "/partners/airglobal.svg",
      bgColor: "bg-blue-50"
    },
    { 
      name: "Oceanic Airlines", 
      logo: "/partners/oceanic.svg",
      bgColor: "bg-cyan-50" 
    },
    { 
      name: "Summit Hotels", 
      logo: "/partners/summit.svg",
      bgColor: "bg-amber-50"
    },
    { 
      name: "Blue Cruise", 
      logo: "/partners/bluecruise.svg",
      bgColor: "bg-indigo-50"
    },
    { 
      name: "Safari Adventures", 
      logo: "/partners/safari.svg",
      bgColor: "bg-emerald-50"
    },
    { 
      name: "Urban Stays", 
      logo: "/partners/urban.svg",
      bgColor: "bg-purple-50"
    },
  ];

  return (
    <section 
      id="partners" 
      className="py-28 bg-white relative overflow-hidden"
      ref={ref}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          className="text-center mb-20"
          initial="hidden"
          animate={controls}
          variants={titleVariants}
        >
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">Trusted Partners</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            We collaborate with industry leaders to bring you unparalleled travel experiences worldwide.
          </p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate={controls}
        >
          {partners.map((partner, index) => (
            <motion.div 
              key={index}
              className="flex flex-col items-center"
              variants={itemVariants}
              whileHover="hover"
            >
              <div className={`relative w-32 h-32 rounded-2xl ${partner.bgColor} p-6 shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center`}>
                <img 
                  src={partner.logo} 
                  alt={partner.name}
                  className="w-full h-full object-contain grayscale hover:grayscale-0 transition-all duration-500"
                />
              </div>
              <motion.h3 className="mt-4 text-sm font-medium text-gray-700">
                {partner.name}
              </motion.h3>
            </motion.div>
          ))}
        </motion.div>

        <motion.div 
          className="text-center mt-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <p className="text-gray-600 mb-8 text-lg">
            Interested in becoming a partner?
          </p>
          <motion.a
            href="#contact"
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-300 group"
            whileHover={{ 
              scale: 1.03,
              boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.4)"
            }}
            whileTap={{ scale: 0.98 }}
          >
            <span>Partner With Us</span>
            <svg className="w-5 h-5 ml-2 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
            </svg>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default TrustedPartners;