"use client";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const HeroSection = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });
  
  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacityBg = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const handleExploreClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const packagesSection = document.getElementById('packages');
    if (packagesSection) {
      packagesSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={containerRef}
      id="home"
      className="relative min-h-screen flex items-center justify-center bg-gray-900 overflow-hidden"
    >
      {/* Luxury Parallax Background */}
      <motion.div 
        className="absolute inset-0 z-0"
        style={{ y: yBg, opacity: opacityBg }}
      >
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute w-full h-full object-cover"
          preload="auto"
        >
          <source src="/plain.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/30 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900/80 via-gray-900/30 to-transparent"></div>
      </motion.div>

      {/* Content */}
      <motion.div
        className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Luxury Badge */}
        <motion.div
          className="inline-flex items-center mb-4 text-sm font-medium tracking-wider text-yellow-400 uppercase"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
        >
          <span className="w-8 h-px bg-yellow-400 mr-2"></span>
          World Class Travel Services
          <span className="w-8 h-px bg-yellow-400 ml-2"></span>
        </motion.div>
        
        <motion.h1
          className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-serif text-white mb-8 leading-tight"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="block">Crafting</span>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-500">
            Extraordinary Journeys
          </span>
        </motion.h1>
        
        <motion.p
          className="text-xl md:text-2xl lg:text-3xl text-white/80 mb-12 max-w-4xl mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
        >
          Where luxury meets adventure - our bespoke travel experiences are 
          meticulously designed to create unforgettable moments that linger 
          long after you return home.
        </motion.p>
        
        <motion.div
          className="flex flex-wrap justify-center gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
        >
          <motion.button
            onClick={handleExploreClick}
            className="relative overflow-hidden group bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-900 font-bold px-12 py-5 rounded-full transition-all duration-300 hover:shadow-2xl hover:shadow-yellow-400/40"
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 10px 25px rgba(234, 179, 8, 0.4)"
            }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="relative z-10 flex items-center text-lg">
              Explore Packages
              <svg 
                className="ml-3 w-6 h-6 transition-transform group-hover:translate-x-2" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M14 5l7 7m0 0l-7 7m7-7H3" 
                />
              </svg>
            </span>
            <span className="absolute inset-0 bg-gradient-to-r from-yellow-500 to-yellow-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
          </motion.button>
          
          <Link
            href="#contact"
            className="relative overflow-hidden group border-2 border-white hover:border-transparent text-white font-semibold px-10 py-5 rounded-full transition-all duration-300 hover:shadow-2xl hover:shadow-white/30"
          >
            <span className="relative z-10">Contact Our Experts</span>
            <span className="absolute inset-0 bg-white/20 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
          </Link>
        </motion.div>
      </motion.div>

      {/* Luxury Scroll Indicator */}
      <motion.div
        className="absolute bottom-12 left-1/2 transform -translate-x-1/2 z-10"
        animate={{ 
          y: [0, 15, 0],
          opacity: [0.6, 1, 0.6]
        }}
        transition={{ 
          repeat: Infinity, 
          duration: 2, 
          ease: "easeInOut" 
        }}
      >
        
      </motion.div>

      {/* Luxury Overlay Pattern */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-10" style={{
        backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
        backgroundSize: '40px 40px'
      }}></div>
    </section>
  );
};

export default HeroSection;