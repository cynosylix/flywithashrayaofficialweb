"use client";
import { motion, useAnimation, AnimatePresence } from "framer-motion";
import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { Testimonial } from "../types/common";
import { testimonialCardVariants, testimonialsContainerVariants } from "../animationVariants";

const testimonials: Testimonial[] = [
  {
    id: 1,
    content: `&ldquo;FlyWithAshraya planned the perfect honeymoon for us! Every detail was taken care of, from the romantic dinners to the private tours. We didn&apos;t have to worry about a thing and could just enjoy our special time together.&rdquo;`,
    author: "Sarah Johnson",
    role: "European Honeymoon",
    rating: 5,
    image: "https://randomuser.me/api/portraits/women/32.jpg"
  },
  {
    id: 2,
    content: `&ldquo;The family vacation package to Japan was incredible. The team at FlyWithAshraya understood exactly what we needed to keep both kids and adults happy. The guides were knowledgeable and patient with our children.&rdquo;`,
    author: "Michael Chen",
    role: "Family Trip to Japan",
    rating: 5,
    image: "https://randomuser.me/api/portraits/men/45.jpg"
  },
  {
    id: 3,
    content: `&ldquo;I&apos;ve used many travel agencies before, but FlyWithAshraya stands out. Their attention to detail and personalized service is unmatched. When our flight was delayed, they had already rebooked our transfers!&rdquo;`,
    author: "Emily Rodriguez",
    role: "Solo Adventure in Bali",
    rating: 4.5,
    image: "https://randomuser.me/api/portraits/women/68.jpg"
  },
  {
    id: 4,
    content: `&ldquo;Our luxury safari experience was beyond expectations. FlyWithAshraya&apos;s connections got us exclusive lodges and private game drives we couldn&apos;t have booked on our own. Worth every penny!&rdquo;`,
    author: "David Wilson",
    role: "African Safari",
    rating: 5,
    image: "https://randomuser.me/api/portraits/men/22.jpg"
  },
  {
    id: 5,
    content: `&ldquo;As a solo female traveler, safety is my top concern. FlyWithAshraya arranged everything perfectly - vetted hotels, reliable drivers, and 24/7 support. I felt secure the entire trip.&rdquo;`,
    author: "Priya Patel",
    role: "Southeast Asia Tour",
    rating: 5,
    image: "https://randomuser.me/api/portraits/women/44.jpg"
  }
];

const quoteVariants = {
  hover: {
    scale: 1.02,
    transition: {
      duration: 0.6
    }
  }
};

const TestimonialsSection = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const controls = useAnimation();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleNext = useCallback(async () => {
    if (isAnimating || !isMounted) return;
    setIsAnimating(true);
    
    await controls.start({
      x: 100,
      opacity: 0,
      transition: { duration: 0.4 }
    });
    
    setActiveIndex(prev => (prev + 1) % testimonials.length);
    
    controls.set({ x: -100, opacity: 0 });
    await controls.start({
      x: 0,
      opacity: 1,
      transition: { duration: 0.6 }
    });
    
    setIsAnimating(false);
  }, [controls, isAnimating, isMounted]);

  const handlePrev = useCallback(async () => {
    if (isAnimating || !isMounted) return;
    setIsAnimating(true);
    
    await controls.start({
      x: -100,
      opacity: 0,
      transition: { duration: 0.4 }
    });
    
    setActiveIndex(prev => (prev - 1 + testimonials.length) % testimonials.length);
    
    controls.set({ x: 100, opacity: 0 });
    await controls.start({
      x: 0,
      opacity: 1,
      transition: { duration: 0.6 }
    });
    
    setIsAnimating(false);
  }, [controls, isAnimating, isMounted]);

  // Auto-rotate testimonials
  useEffect(() => {
    if (!isMounted) return;
    
    const interval = setInterval(() => {
      if (!isAnimating) handleNext();
    }, 6000);
    
    return () => clearInterval(interval);
  }, [isMounted, isAnimating, handleNext]);

  if (!isMounted) {
    return (
      <section id="testimonials" className="py-28 bg-gray-900 text-white relative overflow-hidden">
        {/* Static server-rendered fallback */}
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-20">
            <div className="inline-flex items-center justify-center px-4 py-2 bg-blue-900/30 rounded-full mb-6 backdrop-blur-sm border border-blue-700/30">
              <span className="text-sm font-medium text-blue-300 tracking-wider">CLIENT TESTIMONIALS</span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-medium text-white mb-6 leading-tight">
              <span className="bg-gradient-to-r from-amber-400 to-blue-300 bg-clip-text text-transparent">Trusted</span> by Travelers Worldwide
            </h2>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
              Hear from our valued clients about their extraordinary travel experiences
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.slice(0, 3).map((testimonial) => (
              <div key={testimonial.id} className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-2xl border border-gray-700">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`w-6 h-6 ${i < Math.floor(testimonial.rating) ? 'text-amber-400' : 'text-gray-600'}`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                
                <blockquote className="text-lg mb-8 relative pl-6">
                  <span className="absolute top-0 left-0 text-5xl text-blue-500/30 font-serif leading-none">&ldquo;</span>
                  <span className="relative z-10" dangerouslySetInnerHTML={{ __html: testimonial.content }} />
                </blockquote>
                
                <div className="flex items-center">
                  <div className="relative mr-4">
                    <Image
                      src={testimonial.image}
                      alt={testimonial.author}
                      width={64}
                      height={64}
                      className="w-16 h-16 rounded-full border-2 border-amber-400/80 object-cover"
                    />
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center border-2 border-gray-800">
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-bold text-lg text-white">{testimonial.author}</h4>
                    <p className="text-blue-300">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="testimonials" className="py-28 bg-gray-900 text-white relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 w-full h-full pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-blue-900/20 to-transparent"></div>
        <div className="absolute top-20 left-10 w-64 h-64 bg-blue-800 rounded-full mix-blend-overlay filter blur-3xl opacity-10 animate-blob"></div>
        <div className="absolute top-40 right-20 w-72 h-72 bg-amber-500 rounded-full mix-blend-overlay filter blur-3xl opacity-10 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-20 left-1/2 w-60 h-60 bg-emerald-500 rounded-full mix-blend-overlay filter blur-3xl opacity-10 animate-blob animation-delay-4000"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="inline-flex items-center justify-center px-4 py-2 bg-blue-900/30 rounded-full mb-6 backdrop-blur-sm border border-blue-700/30">
            <span className="text-sm font-medium text-blue-300 tracking-wider">CLIENT TESTIMONIALS</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-medium text-white mb-6 leading-tight">
            <span className="bg-gradient-to-r from-amber-400 to-blue-300 bg-clip-text text-transparent">Trusted</span> by Travelers Worldwide
          </h2>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
            Hear from our valued clients about their extraordinary travel experiences
          </p>
        </motion.div>

        {/* Desktop Grid View */}
        <motion.div 
          className="hidden lg:grid grid-cols-3 gap-8"
          variants={testimonialsContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {testimonials.slice(0, 3).map((testimonial) => (
            <motion.div
              key={testimonial.id}
              className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-2xl border border-gray-700 hover:border-blue-500 transition-all duration-500 relative overflow-hidden"
              variants={testimonialCardVariants}
              whileHover="hover"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-900/10 to-transparent pointer-events-none"></div>
              
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`w-6 h-6 ${i < Math.floor(testimonial.rating) ? 'text-amber-400' : 'text-gray-600'}`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              
              <motion.blockquote 
                className="text-lg mb-8 relative pl-6"
                variants={quoteVariants}
              >
                <span className="absolute top-0 left-0 text-5xl text-blue-500/30 font-serif leading-none">&ldquo;</span>
                <span className="relative z-10" dangerouslySetInnerHTML={{ __html: testimonial.content }} />
              </motion.blockquote>
              
              <div className="flex items-center">
                <div className="relative mr-4">
                  <Image
                    src={testimonial.image}
                    alt={testimonial.author}
                    width={64}
                    height={64}
                    className="w-16 h-16 rounded-full border-2 border-amber-400/80 object-cover"
                  />
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center border-2 border-gray-800">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
                <div>
                  <h4 className="font-bold text-lg text-white">{testimonial.author}</h4>
                  <p className="text-blue-300">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Mobile Carousel View */}
        <div className="lg:hidden relative">
          <button
            onClick={handlePrev}
            className="absolute left-2 top-1/2 -translate-y-1/2 z-20 bg-gray-800/80 hover:bg-gray-700/90 backdrop-blur-sm text-white rounded-full w-12 h-12 flex items-center justify-center transition-all transform hover:scale-110 active:scale-95 shadow-lg border border-gray-600"
            aria-label="Previous testimonial"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <div className="overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={testimonials[activeIndex].id}
                className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-2xl border border-gray-700"
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -100, opacity: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`w-6 h-6 ${i < Math.floor(testimonials[activeIndex].rating) ? 'text-amber-400' : 'text-gray-600'}`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                
                <blockquote className="text-lg mb-8 relative pl-6">
                  <span className="absolute top-0 left-0 text-5xl text-blue-500/30 font-serif leading-none">&ldquo;</span>
                  <span className="relative z-10" dangerouslySetInnerHTML={{ __html: testimonials[activeIndex].content }} />
                </blockquote>
                
                <div className="flex items-center">
                  <div className="relative mr-4">
                    <Image
                      src={testimonials[activeIndex].image}
                      alt={testimonials[activeIndex].author}
                      width={64}
                      height={64}
                      className="w-16 h-16 rounded-full border-2 border-amber-400/80 object-cover"
                    />
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center border-2 border-gray-800">
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-bold text-lg text-white">{testimonials[activeIndex].author}</h4>
                    <p className="text-blue-300">{testimonials[activeIndex].role}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
          
          <button
            onClick={handleNext}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-20 bg-gray-800/80 hover:bg-gray-700/90 backdrop-blur-sm text-white rounded-full w-12 h-12 flex items-center justify-center transition-all transform hover:scale-110 active:scale-95 shadow-lg border border-gray-600"
            aria-label="Next testimonial"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
          
          <div className="flex justify-center mt-6 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`w-3 h-3 rounded-full transition-all ${index === activeIndex ? 'bg-amber-400 w-6' : 'bg-gray-600'}`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;