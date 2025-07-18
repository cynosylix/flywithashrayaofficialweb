"use client";
import { motion } from "framer-motion";
import { Testimonial } from "../types/common";

const testimonials: Testimonial[] = [
  {
    id: 1,
    content: `"FlyWithAshraya planned the perfect honeymoon for us! Every detail was taken care of, from the romantic dinners to the private tours. We didn't have to worry about a thing and could just enjoy our special time together."`,
    author: "Sarah Johnson",
    role: "European Honeymoon",
    rating: 5,
    image: "https://randomuser.me/api/portraits/women/32.jpg"
  },
  {
    id: 2,
    content: `"The family vacation package to Japan was incredible. The team at FlyWithAshraya understood exactly what we needed to keep both kids and adults happy. The guides were knowledgeable and patient with our children."`,
    author: "Michael Chen",
    role: "Family Trip to Japan",
    rating: 5,
    image: "https://randomuser.me/api/portraits/men/45.jpg"
  },
  {
    id: 3,
    content: `"I've used many travel agencies before, but FlyWithAshraya stands out. Their attention to detail and personalized service is unmatched. When our flight was delayed, they had already rebooked our transfers!"`,
    author: "Emily Rodriguez",
    role: "Solo Adventure in Bali",
    rating: 4.5,
    image: "https://randomuser.me/api/portraits/women/68.jpg"
  }
];

import { easeOut } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.2, ease: easeOut, duration: 0.8 } }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { ease: easeOut, duration: 0.8 } }
};

const TestimonialsSection = () => {
  return (
    <motion.section
      id="testimonials"
      className="py-20 bg-gray-900 text-white relative"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="absolute inset-0 bg-black opacity-70"></div>
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div className="text-center mb-16" variants={itemVariants}>
          <h2 className="text-3xl lg:text-4xl font-serif mb-4">Traveler Testimonials</h2>
          <p className="text-xl max-w-3xl mx-auto">
            Don't just take our word for it - hear from our satisfied travelers.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <motion.div
              key={testimonial.id}
              className="bg-gray-800 bg-opacity-50 backdrop-blur-sm p-8 rounded-lg border border-gray-700 hover:border-blue-500 transition-all duration-300"
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
            >
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`w-5 h-5 ${i < Math.floor(testimonial.rating) ? 'text-yellow-400' : 'text-gray-500'}`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    {i < testimonial.rating && i + 1 > testimonial.rating ? (
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    ) : (
                      <path
                        fillRule="evenodd"
                        d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
                        clipRule="evenodd"
                      />
                    )}
                  </svg>
                ))}
              </div>
              <blockquote className="text-lg italic mb-6 relative">
                <span className="absolute -top-8 -left-4 text-6xl text-gray-600">"</span>
                {testimonial.content}
              </blockquote>
              <div className="flex items-center">
                <img
                  src={testimonial.image}
                  alt={testimonial.author}
                  className="w-16 h-16 rounded-full border-2 border-yellow-400 mr-4"
                />
                <div>
                  <h4 className="font-bold text-lg">{testimonial.author}</h4>
                  <p className="text-gray-400">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default TestimonialsSection;
