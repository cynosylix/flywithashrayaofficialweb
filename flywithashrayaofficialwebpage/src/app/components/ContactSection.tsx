"use client";
import { motion } from "framer-motion";
import { ContactInfo } from '../types/common';

const contactInfo: ContactInfo[] = [
  {
    icon: "map-marker-alt",
    title: "Our Office",
    content: [
      "Vin's Tower, Kalachanda Jn., NH 183 Behind Federal Bank ATM Pampady, Kottayam, Kerala, India"
    ]
  },
  {
    icon: "phone-alt",
    title: "Call Us",
    content: [
      "+1 (555) 123-4567",
      "Mon-Fri: 9am-6pm EST"
    ]
  },
  {
    icon: "envelope",
    title: "Email Us",
    content: [
      "info@flywithashraya.com",
      "bookings@flywithashraya.com"
    ]
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut" as const
    }
  }
};

const iconVariants = {
  hover: {
    rotate: [0, -10, 10, 0],
    scale: 1.1,
    transition: {
      duration: 0.6
    }
  }
};

const formElementVariants = {
  focus: {
    boxShadow: "0 0 0 2px rgba(59, 130, 246, 0.5)",
    borderColor: "#3B82F6",
    transition: { duration: 0.2 }
  }
};

const ContactSection = () => {
  return (
    <section id="contact" className="py-28 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 w-full h-full pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-40 right-20 w-72 h-72 bg-amber-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-20 left-1/2 w-60 h-60 bg-emerald-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="inline-flex items-center justify-center px-4 py-2 bg-blue-50 rounded-full mb-6">
            <span className="text-sm font-medium text-blue-600 tracking-wider">GET IN TOUCH</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-medium text-gray-900 mb-6 leading-tight">
            <span className="bg-gradient-to-r from-blue-600 to-amber-500 bg-clip-text text-transparent">Contact</span> Our Travel Experts
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Ready to plan your next adventure? Our team is available 24/7 to craft your perfect journey.
          </p>
        </motion.div>

        <motion.div 
          className="flex flex-col lg:flex-row gap-10"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Contact Info Card */}
          <motion.div 
            className="lg:w-5/12 bg-white p-10 rounded-2xl shadow-xl border border-gray-100"
            variants={itemVariants}
            whileHover={{ y: -5 }}
          >
            <motion.h3 
              className="text-3xl font-serif mb-8"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              Contact Information
            </motion.h3>
            
            <div className="space-y-8">
              {contactInfo.map((info, index) => (
                <motion.div 
                  key={index} 
                  className="flex group"
                  variants={itemVariants}
                >
                  <motion.div 
                    className="w-16 h-16 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center text-2xl mr-6 transition-all duration-300 group-hover:bg-blue-600 group-hover:text-white"
                    variants={iconVariants}
                    whileHover="hover"
                  >
                    {info.icon === "map-marker-alt" && (
                      <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                      </svg>
                    )}
                    {info.icon === "phone-alt" && (
                      <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                      </svg>
                    )}
                    {info.icon === "envelope" && (
                      <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                      </svg>
                    )}
                  </motion.div>
                  <div>
                    <h4 className="text-xl font-bold mb-2 text-gray-900">{info.title}</h4>
                    {info.content.map((line, i) => (
                      <p key={i} className="text-gray-600">{line}</p>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div 
              className="mt-12"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <h4 className="text-xl font-bold mb-6 text-gray-900">Follow Our Journey</h4>
              <div className="flex space-x-4">
                <motion.a 
                  href="#" 
                  className="w-12 h-12 bg-gray-50 hover:bg-blue-600 text-gray-700 hover:text-white rounded-xl flex items-center justify-center transition-all duration-300"
                  whileHover={{ y: -3, scale: 1.1 }}
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                  </svg>
                </motion.a>
                <motion.a 
                  href="#" 
                  className="w-12 h-12 bg-gray-50 hover:bg-blue-400 text-gray-700 hover:text-white rounded-xl flex items-center justify-center transition-all duration-300"
                  whileHover={{ y: -3, scale: 1.1 }}
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </motion.a>
                <motion.a 
                  href="#" 
                  className="w-12 h-12 bg-gray-50 hover:bg-pink-600 text-gray-700 hover:text-white rounded-xl flex items-center justify-center transition-all duration-300"
                  whileHover={{ y: -3, scale: 1.1 }}
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                  </svg>
                </motion.a>
              </div>
            </motion.div>
          </motion.div>

          {/* Contact Form Card */}
          <motion.div 
            className="lg:w-7/12 bg-white p-10 rounded-2xl shadow-xl border border-gray-100"
            variants={itemVariants}
            whileHover={{ y: -5 }}
          >
            <motion.h3 
              className="text-3xl font-serif mb-8"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              Send Us a Message
            </motion.h3>
            
            <form>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <motion.div
                  variants={itemVariants}
                >
                  <label htmlFor="name" className="block text-gray-700 mb-2 font-medium">Your Name</label>
                  <motion.input
                    type="text"
                    id="name"
                    className="w-full px-5 py-4 border border-gray-200 rounded-xl focus:outline-none"
                    required
                    whileFocus="focus"
                    variants={formElementVariants}
                  />
                </motion.div>
                <motion.div
                  variants={itemVariants}
                >
                  <label htmlFor="email" className="block text-gray-700 mb-2 font-medium">Email Address</label>
                  <motion.input
                    type="email"
                    id="email"
                    className="w-full px-5 py-4 border border-gray-200 rounded-xl focus:outline-none"
                    required
                    whileFocus="focus"
                    variants={formElementVariants}
                  />
                </motion.div>
              </div>
              
              <motion.div 
                className="mb-6"
                variants={itemVariants}
              >
                <label htmlFor="subject" className="block text-gray-700 mb-2 font-medium">Subject</label>
                <motion.input
                  type="text"
                  id="subject"
                  className="w-full px-5 py-4 border border-gray-200 rounded-xl focus:outline-none"
                  required
                  whileFocus="focus"
                  variants={formElementVariants}
                />
              </motion.div>
              
              <motion.div 
                className="mb-8"
                variants={itemVariants}
              >
                <label htmlFor="message" className="block text-gray-700 mb-2 font-medium">Your Message</label>
                <motion.textarea
                  id="message"
                  rows={5}
                  className="w-full px-5 py-4 border border-gray-200 rounded-xl focus:outline-none"
                  required
                  whileFocus="focus"
                  variants={formElementVariants}
                ></motion.textarea>
              </motion.div>
              
              <motion.button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-5 px-6 rounded-xl font-semibold text-lg relative overflow-hidden group"
                whileHover={{ 
                  y: -2,
                  boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.4)"
                }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Send Message
                </span>
                <span className="absolute inset-0 bg-gradient-to-r from-blue-700 to-blue-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"></span>
              </motion.button>
            </form>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;