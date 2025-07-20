"use client";

import { Destination } from "../types/common";
import { useState, useEffect } from "react";
import { motion, useAnimation, AnimatePresence } from "framer-motion";
import Link from "next/link";

const destinations: Destination[] = [
  {
    id: 1,
    title: "Paris, France",
    description: "The city of love awaits with its romantic ambiance, world-class cuisine, and iconic landmarks.",
    price: "From $1,299",
    image: "https://images.unsplash.com/photo-1503917988258-f87a78e3c995?auto=format&fit=crop&w=1587&q=80",
  },
  {
    id: 2,
    title: "Tokyo, Japan",
    description: "Experience the perfect blend of ancient traditions and cutting-edge technology in this vibrant metropolis.",
    price: "From $1,899",
    image: "https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?auto=format&fit=crop&w=1530&q=80",
  },
  {
    id: 3,
    title: "New York, USA",
    description: "The city that never sleeps offers endless entertainment, from Broadway shows to world-famous museums.",
    price: "From $999",
    image: "https://images.unsplash.com/photo-1518391846015-55a9cc003b25?auto=format&fit=crop&w=1470&q=80",
  },
  {
    id: 4,
    title: "Bali, Indonesia",
    description: "Tropical paradise with lush jungles, pristine beaches, and a unique spiritual culture.",
    price: "From $1,499",
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1587&q=80",
  },
  {
    id: 5,
    title: "Santorini, Greece",
    description: "Breathtaking sunsets, white-washed buildings, and crystal-clear waters make this island a dream destination.",
    price: "From $1,799",
    image: "https://images.unsplash.com/photo-1530158956483-82d514a1932f?auto=format&fit=crop&w=1587&q=80",
  },
];

const CARD_WIDTH = 320;
const CARD_GAP = 32;

const DestinationsSection = () => {
  const [mounted, setMounted] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const controls = useAnimation();

  useEffect(() => {
    setMounted(true);
  }, []);

  const getVisibleDestinations = () => {
    return Array.from({ length: 3 }, (_, i) => {
      const index = (activeIndex + i) % destinations.length;
      return destinations[index];
    });
  };

  const handleScroll = async (dir: "left" | "right") => {
    if (isAnimating) return;

    setIsAnimating(true);
    await controls.start({
      x: dir === "left" ? -CARD_WIDTH - CARD_GAP : CARD_WIDTH + CARD_GAP,
      opacity: 0,
      transition: { duration: 0.4 },
    });

    setActiveIndex((prev) =>
      dir === "left"
        ? (prev - 1 + destinations.length) % destinations.length
        : (prev + 1) % destinations.length
    );

    controls.set({ x: 0, opacity: 1 });
    setIsAnimating(false);
  };

  // Auto-scroll every 5s
  useEffect(() => {
    if (!mounted) return;
    const interval = setInterval(() => {
      if (!isAnimating) handleScroll("right");
    }, 5000);

    return () => clearInterval(interval);
  }, [mounted, isAnimating]);

  const visibleDestinations = getVisibleDestinations();

  if (!mounted) {
    return (
      <section id="destinations" className="py-20 bg-blue-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-70" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-serif mb-4">Our Featured Destinations</h2>
            <p className="text-xl max-w-3xl mx-auto">
              Explore our handpicked selection of the world's most captivating destinations.
            </p>
          </div>
          <div className="flex justify-center gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-[28rem] w-80 bg-gray-800 rounded-lg animate-pulse" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="destinations" className="py-20 bg-blue-900 text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-black opacity-70" />
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-serif mb-4">Our Featured Destinations</h2>
          <p className="text-xl max-w-3xl mx-auto">
            Explore our handpicked selection of the world's most captivating destinations.
          </p>
        </div>

        <div className="relative flex items-center justify-center">
          <button
            onClick={() => handleScroll("left")}
            disabled={isAnimating}
            className="absolute left-0 z-20 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white rounded-full w-12 h-12 flex items-center justify-center ml-4 transition-all transform hover:scale-110 active:scale-95 shadow-lg border border-white/20"
            aria-label="Scroll left"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Cards container */}
          <div className="overflow-hidden w-full">
            <motion.div
              className="flex justify-center gap-8"
              animate={controls}
              style={{ x: 0, opacity: 1 }}
            >
              <AnimatePresence initial={false} mode="wait">
                {visibleDestinations.map((destination) => (
                  <motion.div
                    key={`${destination.id}-${activeIndex}`}
                    layout
                    initial={{ opacity: 0.5, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.4 }}
                    className="relative rounded-xl overflow-hidden h-[28rem] w-80 flex-shrink-0 bg-gray-800 group shadow-2xl"
                    whileHover={{ scale: 1.03 }}
                  >
                    <img
                      src={destination.image}
                      alt={destination.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                    <div className="absolute bottom-0 left-0 p-6 w-full">
                      <h3 className="text-2xl font-bold mb-2">{destination.title}</h3>
                      <p className="text-sm text-gray-300 mb-4">{destination.description}</p>
                       <Link href="/packages">
                        <button className="bg-white text-gray-900 px-6 py-2 rounded-full font-semibold hover:bg-yellow-400 hover:text-gray-800 transition-colors">
                        Explore
                      </button></Link>
                     
                    </div>
                    <div className="absolute top-4 right-4 bg-yellow-400 text-gray-900 px-4 py-1 rounded-full font-bold shadow-md">
                      {destination.price}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          </div>

          {/* Right arrow */}
          <button
            onClick={() => handleScroll("right")}
            disabled={isAnimating}
            className="absolute right-0 z-20 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white rounded-full w-12 h-12 flex items-center justify-center mr-4 transition-all transform hover:scale-110 active:scale-95 shadow-lg border border-white/20"
            aria-label="Scroll right"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default DestinationsSection;
