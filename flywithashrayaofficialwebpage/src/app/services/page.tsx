"use client";
import { motion, useInView, AnimatePresence, easeInOut } from "framer-motion";
import { useRef, useState } from "react";
import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";

// Import your service data (create a separate servicesData.ts file)
import { services, Service, ServiceCategory } from "../servicesData";

const ServicesPage = () => {
  const [activeCategory, setActiveCategory] = useState(0);
  const [hoveredService, setHoveredService] = useState<string | null>(null);

  const ctaRef = useRef(null);
  const heroRef = useRef(null);
  const isCtaInView = useInView(ctaRef, { once: true, margin: "-100px" });
  const isHeroInView = useInView(heroRef, { once: true, margin: "-100px" });

  const floatingVariants = {
    initial: { y: 0 },
    animate: {
      y: [0, -15, 0],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: easeInOut
      }
    }
  };

  const floatingVariantsFast = {
    initial: { y: 0 },
    animate: {
      y: [0, -10, 0],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: easeInOut
      }
    }
  };

  return (
    <div className="bg-gradient-to-b from-gray-50 via-white to-gray-50 min-h-screen relative overflow-hidden">
      <Header />
      
      {/* Animated background elements */}
      <motion.div 
        className="absolute top-20 left-10 w-40 h-40 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 pointer-events-none"
        variants={floatingVariants}
        initial="initial"
        animate="animate"
      />
      <motion.div 
        className="absolute bottom-20 right-10 w-60 h-60 bg-yellow-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 pointer-events-none"
        variants={floatingVariantsFast}
        initial="initial"
        animate="animate"
      />
      <motion.div 
        className="absolute top-1/3 right-1/4 w-32 h-32 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-15 pointer-events-none"
        variants={floatingVariants}
        initial="initial"
        animate="animate"
      />

      {/* Hero Section */}
      <div 
        ref={heroRef}
        className="relative bg-gradient-to-b from-gray-50 via-white to-gray-50 text-gray-900 py-28 px-6 overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/5 z-0"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-[url('/pattern.svg')] bg-[length:300px_300px] opacity-5"></div>
        
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="mb-6"
          >
            <span className="inline-block px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-4">
              Premium Solutions
            </span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-5xl md:text-6xl font-serif font-medium mb-6 tracking-tight"
          >
            <span className="text-gradient bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">Elevate</span> Your Experience
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-lg max-w-3xl mx-auto text-gray-600"
          >
            Comprehensive solutions tailored to your travel and documentation requirements with unparalleled service excellence
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="mt-12"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative overflow-hidden group bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-4 rounded-lg font-medium tracking-wide shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <span className="relative z-10">Explore Services</span>
              <span className="absolute inset-0 bg-gradient-to-r from-blue-700 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            </motion.button>
          </motion.div>
        </div>
      </div>

      {/* Services Navigation */}
      <div className="max-w-7xl mx-auto px-6 relative z-10 mt-7">
        <div className="flex overflow-x-auto pb-2 scrollbar-hide">
          <div className="flex space-x-2">
            {services.map((category: ServiceCategory, index: number) => (
              <motion.button
                key={category.category}
                onClick={() => setActiveCategory(index)}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className={`px-6 py-3 rounded-full font-medium text-sm whitespace-nowrap transition-colors duration-300 ${
                  activeCategory === index
                    ? "bg-blue-600 text-white shadow-md"
                    : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
                }`}
              >
                {category.category}
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      {/* Services Grid */}
      <div className="max-w-7xl mx-auto py-16 px-6 relative z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {services[activeCategory].items.map((service: Service, idx: number) => (
              <Link 
                key={service.slug} 
                href={`/services_details/${service.slug}`}
                passHref
              >
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: idx * 0.05, ease: "backOut" }}
                  whileHover={{ y: -10 }}
                  onHoverStart={() => setHoveredService(service.name)}
                  onHoverEnd={() => setHoveredService(null)}
                  className="relative group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden border border-gray-100 cursor-pointer"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-white/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative z-10 p-8 h-full flex flex-col">
                    <div className="text-5xl mb-6 transition-all duration-500 group-hover:scale-110 group-hover:text-blue-600">
                      {service.icon}
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">{service.name}</h3>
                    <p className="text-gray-600 mb-6 text-sm leading-relaxed">{service.description}</p>
                    <div className="mt-auto">
                      <div className="px-4 py-2 text-sm font-medium text-blue-600 hover:text-white rounded-md bg-white hover:bg-blue-600 border border-blue-600 hover:border-blue-600 transition-all duration-300 group-hover:shadow-md inline-flex items-center">
                        View Details
                        <span className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">→</span>
                      </div>
                    </div>
                  </div>
                  
                  {hoveredService === service.name && (
                    <motion.div 
                      layoutId="serviceHover"
                      className="absolute inset-0 border-2 border-blue-400 rounded-xl pointer-events-none"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </motion.div>
              </Link>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Stats Section */}
      <div className="bg-gradient-to-r from-blue-900 to-blue-800 text-white py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {[
              { number: "1K+", label: "Happy Clients" },
              { number: "4+", label: "Years Experience" },
              { number: "50+", label: "Global Partners" },
              { number: "99%", label: "Satisfaction Rate" }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true, margin: "-100px" }}
                className="text-center"
              >
                <div className="text-4xl md:text-5xl font-bold mb-2">{stat.number}</div>
                <div className="text-sm uppercase tracking-wider opacity-80">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* CTA Section */}
      <div 
        ref={ctaRef}
        className="relative bg-gradient-to-b from-gray-50 via-white to-gray-50 text-gray-900 py-24 px-6 overflow-hidden"
      >
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('/pattern-dots.svg')] bg-[length:40px_40px] opacity-5"></div>
          <motion.div 
            className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-10 pointer-events-none"
            variants={floatingVariants}
            initial="initial"
            animate="animate"
          />
          <motion.div 
            className="absolute bottom-1/3 right-1/3 w-48 h-48 bg-yellow-100 rounded-full mix-blend-multiply filter blur-3xl opacity-10 pointer-events-none"
            variants={floatingVariantsFast}
            initial="initial"
            animate="animate"
          />
        </div>
        
        <div className="max-w-5xl mx-auto text-center relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isCtaInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="mb-16"
          >
            <motion.h2
              initial={{ opacity: 0 }}
              animate={isCtaInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ delay: 0.2 }}
              className="text-3xl md:text-4xl font-serif font-medium mb-8 leading-tight"
            >
              <span>Excellence in Every </span>
              <span className="text-gradient bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">Journey</span>
              <span>, Precision in Every </span>
              <span className="text-gradient bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">Document</span>
              <span>.</span>
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0 }}
              animate={isCtaInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ delay: 0.4 }}
              className="text-lg text-gray-600 mb-10 max-w-3xl mx-auto"
            >
              Seamless travel experiences and meticulous documentation services tailored to your unique needs.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={isCtaInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-col sm:flex-row justify-center gap-4"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative overflow-hidden group bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-4 rounded-lg font-medium tracking-wide shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <span className="relative z-10">Get Started Now</span>
                <span className="absolute inset-0 bg-gradient-to-r from-blue-700 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-transparent hover:bg-black/5 text-gray-900 font-semibold rounded-lg border-2 border-gray-900 hover:border-transparent transition-all duration-300"
              >
                Contact Our Team
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Floating Action Button */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.5, type: "spring" }}
        className="fixed bottom-8 right-8 z-50"
      >
        <motion.button
          whileHover={{ scale: 1.1, rotate: 90 }}
          whileTap={{ scale: 0.9 }}
          className="p-4 bg-gradient-to-br from-blue-600 to-blue-500 text-white rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center justify-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
        </motion.button>
      </motion.div>
      
      <Footer />
    </div>
  );
};

export default ServicesPage;
