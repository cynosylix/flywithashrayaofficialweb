'use client';

import { Destination } from '../types/common';
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const initialDestinations: Destination[] = [
  {
    id: 1,
    title: "Paris, France",
    description: "The city of love awaits...",
    price: "From $1,299",
    image: "https://images.unsplash.com/photo-1503917988258-f87a78e3c995?auto=format&fit=crop&w=1587&q=80"
  },
  {
    id: 2,
    title: "Tokyo, Japan",
    description: "Experience the perfect blend...",
    price: "From $1,899",
    image: "https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?auto=format&fit=crop&w=1530&q=80"
  },
  {
    id: 3,
    title: "New York, USA",
    description: "The city that never sleeps...",
    price: "From $999",
    image: "https://images.unsplash.com/photo-1518391846015-55a9cc003b25?auto=format&fit=crop&w=1470&q=80"
  },
  {
    id: 4,
    title: "Bali, Indonesia",
    description: "Tropical paradise with lush jungles...",
    price: "From $1,499",
    image: "https://images.unsplash.com/photo-1518391846015-55a9cc003b25?auto=format&fit=crop&w=1470&q=80"
  },
  {
    id: 5,
    title: "Santorini, Greece",
    description: "Breathtaking sunsets, whitewashed buildings...",
    price: "From $1,799",
    image: "https://images.unsplash.com/photo-1503917988258-f87a78e3c995?auto=format&fit=crop&w=1587&q=80"
  }
];

const DestinationsSection = () => {
  const [destinations, setDestinations] = useState(initialDestinations);
  const [direction, setDirection] = useState<'left' | 'right'>('right');

  const handleScroll = (dir: 'left' | 'right') => {
    setDirection(dir);
    const updated = [...destinations];
    if (dir === 'right') {
      const first = updated.shift();
      if (first) updated.push(first);
    } else {
      const last = updated.pop();
      if (last) updated.unshift(last);
    }
    setDestinations(updated);
  };

  const variants = {
    enter: (dir: 'left' | 'right') => ({
      x: dir === 'right' ? 100 : -100,
      opacity: 0,
      scale: 0.95,
      transition: {
        duration: 0.4,
        ease: "easeInOut"
      }
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.4,
        ease: "easeInOut"
      }
    },
    exit: (dir: 'left' | 'right') => ({
      x: dir === 'right' ? -100 : 100,
      opacity: 0,
      scale: 0.95,
      transition: {
        duration: 0.4,
        ease: "easeInOut"
      }
    })
  };

  return (
    <section id="destinations" className="py-20 bg-blue-900 text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-black opacity-70"></div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-serif mb-4">Our Featured Destinations</h2>
          <p className="text-xl max-w-3xl mx-auto">
            Explore our handpicked selection of the world's most captivating destinations.
          </p>
        </div>

        <div className="relative flex items-center justify-center">
          {/* Left Button */}
          <button
            onClick={() => handleScroll('left')}
            className="absolute left-0 z-20 bg-white/30 hover:bg-white/50 text-white rounded-full w-10 h-10 flex items-center justify-center ml-2 transition-all"
            aria-label="Scroll left"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <div className="w-full overflow-hidden">
            <AnimatePresence initial={false} custom={direction}>
              <motion.div
                key={destinations[0].id}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                className="flex justify-center gap-8"
              >
                {destinations.slice(0, 3).map((destination) => (
                  <div key={destination.id} className="relative rounded-lg overflow-hidden h-96 w-80 flex-shrink-0 group bg-gray-800 shadow-lg">
                    <img
                      src={destination.image}
                      alt={destination.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-80"></div>
                    <div className="absolute bottom-0 left-0 p-6 w-full transition-all duration-500 transform translate-y-20 group-hover:translate-y-0 opacity-0 group-hover:opacity-100">
                      <h3 className="text-2xl font-bold mb-2">{destination.title}</h3>
                      <p className="mb-4">{destination.description}</p>
                      <button className="bg-transparent border border-white text-white px-6 py-2 rounded-full hover:bg-white hover:text-gray-900 transition-colors">
                        Explore
                      </button>
                    </div>
                    <div className="absolute top-4 right-4 bg-yellow-400 text-gray-900 px-4 py-1 rounded-full font-bold">
                      {destination.price}
                    </div>
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right Button */}
          <button
            onClick={() => handleScroll('right')}
            className="absolute right-0 z-20 bg-white/30 hover:bg-white/50 text-white rounded-full w-10 h-10 flex items-center justify-center mr-2 transition-all"
            aria-label="Scroll right"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default DestinationsSection;
