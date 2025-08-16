"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

interface Destination {
  id: number;
  title: string;
  description: string;
  image: string;
}

const destinations: Destination[] = [
  {
    id: 1,
    title: "Paris, France",
    description: "The city of love awaits with its romantic ambiance, world-class cuisine, and iconic landmarks.",
    image: "https://images.unsplash.com/photo-1503917988258-f87a78e3c995?auto=format&fit=crop&w=1587&q=80",
  },
  {
    id: 2,
    title: "Tokyo, Japan",
    description: "Experience the perfect blend of ancient traditions and cutting-edge technology in this vibrant metropolis.",
    image: "https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?auto=format&fit=crop&w=1530&q=80",
  },
  {
    id: 3,
    title: "New York, USA",
    description: "The city that never sleeps offers endless entertainment, from Broadway shows to world-famous museums.",
    image: "https://images.unsplash.com/photo-1518391846015-55a9cc003b25?auto=format&fit=crop&w=1470&q=80",
  },
  {
    id: 4,
    title: "Bali, Indonesia",
    description: "Tropical paradise with lush jungles, pristine beaches, and a unique spiritual culture.",
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1587&q=80",
  },
  {
    id: 5,
    title: "Santorini, Greece",
    description: "Breathtaking sunsets, white-washed buildings, and crystal-clear waters make this island a dream destination.",
    image: "https://plus.unsplash.com/premium_photo-1661964149725-fbf14eabd38c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",

  },
];

const DestinationsSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);

  const getVisibleDestinations = () => {
    return Array.from({ length: 3 }, (_, i) => {
      const index = (activeIndex + i) % destinations.length;
      return destinations[index];
    });
  };

  const handleScroll = (dir: "left" | "right") => {
    if (isScrolling) return;
    
    setIsScrolling(true);
    setActiveIndex((prev) =>
      dir === "left"
        ? (prev - 1 + destinations.length) % destinations.length
        : (prev + 1) % destinations.length
    );
    
    setTimeout(() => setIsScrolling(false), 300);
  };

  // Auto-scroll every 5s
  useEffect(() => {
    const interval = setInterval(() => {
      handleScroll("right");
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const visibleDestinations = getVisibleDestinations();

  return (
    <section id="destinations" className="py-20 bg-blue-900 text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-black opacity-70" />
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-serif mb-4">Our Featured Destinations</h2>
          <p className="text-xl max-w-3xl mx-auto">
            Explore our handpicked selection of the world&apos;s most captivating destinations.
          </p>
        </div>

        <div className="relative flex items-center justify-center">
          <button
            onClick={() => handleScroll("left")}
            disabled={isScrolling}
            className="absolute left-0 z-20 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white rounded-full w-12 h-12 flex items-center justify-center ml-4 transition-all hover:scale-110 active:scale-95 shadow-lg border border-white/20"
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

          <div className="overflow-hidden w-full">
            <div className="flex justify-center gap-8">
              {visibleDestinations.map((destination) => (
                <div
                  key={`${destination.id}-${activeIndex}`}
                  className="relative rounded-xl overflow-hidden h-[28rem] w-80 flex-shrink-0 bg-gray-800 group shadow-2xl transition-transform hover:scale-105"
                >
                  <Image
                    src={destination.image}
                    alt={destination.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    width={320}
                    height={448}
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 p-6 w-full">
                    <h3 className="text-2xl font-bold mb-2">{destination.title}</h3>
                    <p className="text-sm text-gray-300 mb-4">{destination.description}</p>
                    <Link href="/packages">
                      <button className="bg-white text-gray-900 px-6 py-2 rounded-full font-semibold hover:bg-yellow-400 hover:text-gray-800 transition-colors">
                        Explore
                      </button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={() => handleScroll("right")}
            disabled={isScrolling}
            className="absolute right-0 z-20 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white rounded-full w-12 h-12 flex items-center justify-center mr-4 transition-all hover:scale-110 active:scale-95 shadow-lg border border-white/20"
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