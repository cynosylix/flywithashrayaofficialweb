"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

const AffiliatedPartners = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const partners = [
    { name: "Akash Air", logo: "/affiliation/AkasaAirLogo.jpg" },
    { name: "Fly91", logo: "/affiliation/Fly91_Logo.jpg" },
    { name: "IndiGo", logo: "/affiliation/IndiGo-Logo.png" },
    { name: "Singapore Airlines", logo: "/affiliation/singapore-airlines-logo.png" },
  ];

  // Animation variants with proper TypeScript typing
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
        ease: "easeOut" as const
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 30 },
    show: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.6, 
        ease: [0.16, 1, 0.3, 1] as const
      } 
    }
  };

  return (
    <section 
      ref={ref}
      className="relative py-28 bg-gradient-to-b from-white to-gray-50/50 overflow-hidden"
    >
      {/* Background elements */}
      <div className="absolute inset-0 opacity-5 bg-[url('/pattern-grid.svg')] bg-[length:80px_80px]" />
      <div className="absolute top-20 left-1/4 w-64 h-64 bg-blue-100/20 rounded-full mix-blend-multiply filter blur-[100px]" />
      <div className="absolute bottom-20 right-1/4 w-72 h-72 bg-amber-100/20 rounded-full mix-blend-multiply filter blur-[100px]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vh] rounded-full bg-blue-500/3 filter blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-20"
        >
          <motion.span
            initial={{ scale: 0.9, opacity: 0 }}
            animate={isInView ? { scale: 1, opacity: 1 } : {}}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="inline-block px-5 py-2.5 bg-blue-50 text-blue-600 rounded-full text-sm font-medium mb-6 border border-blue-100/50 shadow-sm shadow-blue-100/30"
          >
            Official Affiliations
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-4xl md:text-5xl font-bold mb-6 tracking-tight"
          >
            Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-400">Trusted</span> Partners
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed"
          >
            We're proud to be officially affiliated with these industry leaders, bringing you verified services and exclusive benefits.
          </motion.p>
        </motion.div>

        {/* Partners grid */}
        <motion.div
          initial="hidden"
          animate={isInView ? "show" : "hidden"}
          variants={container}
          className="relative"
        >
          <motion.div
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-400/50 to-transparent"
          />
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-12">
            {partners.map((partner) => (
              <motion.div
                key={partner.name}
                variants={item}
                initial="hidden"
                animate={isInView ? "show" : "hidden"}
                whileHover={{ 
                  y: -5,
                  transition: { 
                    duration: 0.3, 
                    ease: "easeOut" as const 
                  }
                }}
                className="flex flex-col items-center justify-center p-6 bg-white rounded-xl shadow-xs hover:shadow-sm transition-all duration-300 border border-gray-100/80 hover:border-blue-100/50 group"
              >
                <div className="relative h-16 w-full flex items-center justify-center mb-4">
                  <Image 
                    src={partner.logo} 
                    alt={partner.name}
                    width={120}
                    height={60}
                    className="object-contain h-full w-full opacity-90 group-hover:opacity-100 transition-opacity duration-300"
                  />
                </div>
                <div className="text-center">
                  <span className="text-xs font-medium text-gray-400 group-hover:text-blue-500 transition-colors duration-300">
                    OFFICIAL PARTNER
                  </span>
                  <h3 className="text-sm font-medium text-gray-700 mt-1">{partner.name}</h3>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-400/50 to-transparent"
          />
        </motion.div>

        {/* Verification badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="text-center mt-16"
        >
          <div className="inline-flex items-center bg-gray-50/50 px-4 py-2 rounded-full border border-gray-200 shadow-xs">
            <svg className="w-4 h-4 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            <span className="text-sm font-medium text-gray-600">
              All partnerships are verified and officially recognized
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AffiliatedPartners;