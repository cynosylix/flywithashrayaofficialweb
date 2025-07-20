"use client";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { useRef } from "react";

const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  // Premium animation variants
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
        ease: "easeInOut"
      }
    }
  };

  const fadeIn = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeInOut"
      }
    }
  };

  const slideIn = {
    hidden: { opacity: 0, x: 80 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 1,
        ease: "easeInOut"
      }
    }
  };

  const statCard = (i: number) => ({
    hidden: { opacity: 0, y: 40, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        delay: i * 0.15,
        duration: 0.7,
        ease: "backOut"
      }
    }
  });

  return (
    <section id="about" className="py-28 bg-gradient-to-b from-gray-50 via-white to-gray-50 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-20 left-10 w-40 h-40 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
        <div className="absolute bottom-20 right-10 w-60 h-60 bg-yellow-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
      </div>

      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 relative">
        <motion.div 
          ref={ref}
          className="flex flex-col lg:flex-row items-center gap-16"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={container}
        >
          {/* Text Content */}
          <motion.div className="lg:w-1/2" variants={fadeIn}>
            <motion.div
              className="inline-flex items-center mb-6 text-xs font-semibold tracking-wider text-blue-600 uppercase"
              variants={fadeIn}
            >
              <span className="w-8 h-px bg-blue-600 mr-2"></span>
              About FlyWithAshraya
            </motion.div>
            
            <motion.h2
              className="text-4xl md:text-5xl lg:text-[3.25rem] font-serif font-medium text-gray-900 mb-8 leading-tight"
              variants={fadeIn}
            >
              Crafting <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-400">Exceptional</span> Travel Journeys
            </motion.h2>
            
            <motion.p
              className="text-lg text-gray-600 mb-8 leading-relaxed"
              variants={fadeIn}
            >
              Fly With Ashraya redefines travel with comprehensive solutions including air ticketing, visa assistance, 
              attestation services, and bespoke holiday packages. With strategic offices in Pampady, Mundakayam, and 
              Kuwait, we deliver personalized support across India and the Gulf region.
            </motion.p>

            <motion.div
              className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
              variants={container}
            >
              {[
                { value: "10K+", label: "Happy Travelers", icon: "👨‍👩‍👧‍👦" },
                { value: "50+", label: "Destinations", icon: "✈️" },
                { value: "24/7", label: "Support", icon: "🛎️" },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-lg transition-all"
                  variants={statCard(i)}
                  whileHover={{ y: -8, boxShadow: "0 10px 25px -5px rgba(0,0,0,0.1)" }}
                >
                  <div className="text-2xl mb-2">{stat.icon}</div>
                  <div className="text-3xl font-bold text-blue-600 mb-1">
                    {stat.value}
                  </div>
                  <div className="text-gray-600 text-sm font-medium tracking-wide">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>

            <motion.div variants={fadeIn}>
               <Link href="/about">
               <motion.button 
                className="relative overflow-hidden group bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-4 rounded-lg font-medium tracking-wide"
                whileHover={{ 
                  scale: 1.02,
                  boxShadow: "0 10px 30px -5px rgba(37, 99, 235, 0.4)"
                }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="relative z-10">Discover Our Story</span>
                <span className="absolute inset-0 bg-gradient-to-r from-blue-700 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              </motion.button></Link>
              
            </motion.div>
          </motion.div>

          {/* Image Content */}
          <motion.div
            className="lg:w-1/2 relative"
            variants={slideIn}
          >
            <motion.div 
              className="relative rounded-2xl overflow-hidden shadow-2xl"
              whileHover={{ scale: 1.01 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <motion.img
                src="https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
                alt="Luxury Travel Experience"
                className="w-full h-auto object-cover aspect-[4/3]"
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/30 via-gray-900/10 to-transparent"></div>
            </motion.div>
            
            {/* Premium badge */}
            <motion.div
              className="absolute -top-6 -right-6 bg-gradient-to-br from-yellow-400 to-yellow-500 text-gray-900 px-6 py-4 rounded-lg font-bold shadow-xl"
              initial={{ rotate: -10, scale: 0.9 }}
              animate={{ rotate: 5, scale: 1 }}
              transition={{
                delay: 0.8,
                duration: 0.8,
                type: "spring",
                damping: 10,
                stiffness: 200,
              }}
              whileHover={{
                rotate: [5, -5, 5],
                transition: { duration: 0.8 },
              }}
            >
              <div className="text-xs uppercase tracking-wider">Established</div>
              <div className="text-2xl">2010</div>
            </motion.div>

            {/* Feature card */}
            <motion.div
              className="absolute -bottom-8 -left-8 bg-white p-5 rounded-xl shadow-xl border border-gray-100"
              initial={{ opacity: 0, y: 40, x: -20 }}
              animate={{ opacity: 1, y: 0, x: 0 }}
              transition={{ delay: 1.2, duration: 0.8 }}
              whileHover={{ y: -5 }}
            >
              <div className="flex items-start">
                <div className="bg-blue-100/80 p-2.5 rounded-lg mr-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-blue-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div>
                  <div className="font-bold text-gray-900 mb-1">Fast Service</div>
                  <div className="text-sm text-gray-500 leading-snug">Immediate booking confirmations</div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
      {/* Certificates Section */}
   
    </section>
  );
};

export default AboutSection;
