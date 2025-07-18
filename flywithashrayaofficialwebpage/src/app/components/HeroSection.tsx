"use client";
import Link from "next/link";
import { motion } from "framer-motion";

const HeroSection = () => {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center bg-gray-900 overflow-hidden"
    >
      {/* Background Video - You'll need to add your video file to public/videos */}
      <video
        autoPlay
        muted
        loop
        className="absolute w-full h-full object-cover opacity-40"
      >
        <source src="/plain.mp4" type="video/mp4" />
      </video>

      <motion.div
        className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        
        <motion.h1
          className="text-4xl md:text-5xl lg:text-6xl font-serif text-white mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
        >
          Crafting Extraordinary Journeys
        </motion.h1>
        <motion.p
          className="text-xl md:text-2xl text-white mb-10 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        >
          Experience the world through our eyes - where every detail is
          meticulously planned to create unforgettable travel moments tailored
          just for you.
        </motion.p>
        <motion.div
          className="flex flex-wrap justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
        >
          <Link
            href="#packages"
            className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold px-8 py-4 rounded-full transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-xl"
          >
            Explore Packages
          </Link>
          <Link
            href="#contact"
            className="border-2 border-white hover:bg-white hover:text-gray-900 text-white font-semibold px-8 py-4 rounded-full transition-all duration-300 transform hover:-translate-y-1"
          >
            Contact Us
          </Link>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-white"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </motion.div>
    </section>
  );
};

export default HeroSection;
