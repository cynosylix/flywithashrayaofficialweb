"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const ServicesPage = () => {
  const services = [
    {
      category: "Travel Services",
      items: [
        { name: "Flight Ticket", icon: "✈️", description: "Global flight bookings with competitive pricing and flexible options." },
        { name: "Bus Ticket", icon: "🚌", description: "Comfortable bus travel arrangements across all major routes." },
        { name: "Train Ticket", icon: "🚆", description: "Seamless rail travel solutions with premium booking options." },
        { name: "Holiday Package", icon: "🏖️", description: "Tailored vacation packages for unforgettable experiences." },
        { name: "Cruise Service", icon: "🛳️", description: "Luxury cruise bookings with exclusive onboard amenities." },
        { name: "Hotel Booking", icon: "🏨", description: "Premium accommodations at the best available rates worldwide." },
        { name: "Car Rental Service", icon: "🚗", description: "Flexible vehicle rentals with comprehensive insurance options." }
      ]
    },
    {
      category: "Document Services",
      items: [
        { name: "Attestation Service", icon: "📑", description: "Official document authentication for legal purposes." },
        { name: "Immigration Service", icon: "🛂", description: "Expert guidance on immigration procedures and requirements." },
        { name: "Visiting Visa Service", icon: "🛃", description: "Streamlined visa processing for short-term visits." },
        { name: "Passport Service", icon: "📘", description: "Assistance with passport applications and renewals." },
        { name: "Pan Card Service", icon: "💳", description: "Quick and reliable PAN card processing services." }
      ]
    },
    {
      category: "Insurance Services",
      items: [
        { name: "Car Insurance", icon: "🚘", description: "Comprehensive coverage plans for your vehicles." },
        { name: "Travel Insurance", icon: "🧳", description: "Protection for your journeys with extensive coverage." },
        { name: "Health Service", icon: "🏥", description: "Health insurance solutions for individuals and families." }
      ]
    },
    {
      category: "Other Services",
      items: [
        { name: "Village Service", icon: "🌄", description: "Specialized services for rural community needs." },
        { name: "Panchayat Services", icon: "🏛️", description: "Support for local governance documentation." },
        { name: "School and College Service", icon: "🎓", description: "Educational documentation and certification services." },
        { name: "Printing Service", icon: "🖨️", description: "High-quality professional printing solutions." }
      ]
    }
  ];

  const ctaRef = useRef(null);
  const isCtaInView = useInView(ctaRef, { once: true, margin: "-100px" });

  return (
    <div className="bg-gradient-to-b from-gray-50 via-white to-gray-50 min-h-screen relative overflow-hidden">
       <Header />
      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-40 h-40 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 pointer-events-none"></div>
      <div className="absolute bottom-20 right-10 w-60 h-60 bg-yellow-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 pointer-events-none"></div>

      {/* Hero Section */}
      <div className="relative bg-gradient-to-b from-gray-50 via-white to-gray-50 text-gray-900 py-28 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/5 z-0"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-[url('/pattern.svg')] bg-[length:300px_300px] opacity-5"></div>
        
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-5xl md:text-6xl font-serif font-medium mb-6 tracking-tight"
          >
            Our <span className="text-gradient bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">Premium</span> Services
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-lg max-w-3xl mx-auto text-gray-600"
          >
            Comprehensive solutions tailored to your travel and documentation requirements with unparalleled service excellence
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="mt-12"
          >
            {/* <button className="relative overflow-hidden group bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-4 rounded-lg font-medium tracking-wide shadow-lg hover:shadow-xl transition-all duration-300">
              Explore Services
              <span className="ml-2">→</span>
              <span className="absolute inset-0 bg-gradient-to-r from-blue-700 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            </button> */}
          </motion.div>
        </div>
      </div>

      {/* Services Grid */}
      <div className="max-w-7xl mx-auto py-20 px-6 relative z-10">
        {services.map((serviceCategory, index) => {
          const ref = useRef(null);
          const isInView = useInView(ref, { once: true, margin: "-100px" });
          
          return (
            <div key={serviceCategory.category} ref={ref} className="mb-24">
              <motion.h2
                initial={{ opacity: 0, x: -30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="text-3xl font-bold text-gray-900 mb-10 relative inline-block"
              >
                {serviceCategory.category}
                <motion.span 
                  initial={{ scaleX: 0 }}
                  animate={isInView ? { scaleX: 1 } : {}}
                  transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 to-blue-400 origin-left"
                ></motion.span>
              </motion.h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {serviceCategory.items.map((service, idx) => (
                  <motion.div
                    key={service.name}
                    initial={{ opacity: 0, y: 50 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: idx * 0.08 + 0.3, ease: "backOut" }}
                    whileHover={{ y: -8 }}
                    className="group relative bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-white opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="relative z-10 p-6 h-full flex flex-col">
                      <div className="text-5xl mb-6 transition-transform duration-500 group-hover:scale-110 group-hover:text-blue-600">
                        {service.icon}
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-3">{service.name}</h3>
                      <p className="text-gray-600 mb-6 text-sm leading-relaxed">{service.description}</p>
                      <div className="mt-auto">
                        <button className="px-4 py-2 text-sm font-medium text-blue-600 hover:text-white rounded-md bg-white hover:bg-blue-600 border border-blue-600 hover:border-blue-600 transition-all duration-300 group-hover:shadow-md">
                          View Details
                          <span className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">→</span>
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* CTA Section */}
      <div 
        ref={ctaRef}
        className="relative bg-gradient-to-b from-gray-50 via-white to-gray-50 text-gray-900 py-24 px-6 overflow-hidden"
      >
        <div className="absolute top-20 left-10 w-40 h-40 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 pointer-events-none"></div>
        <div className="absolute bottom-20 right-10 w-60 h-60 bg-yellow-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 pointer-events-none"></div>
        <div className="max-w-5xl mx-auto text-center relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isCtaInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2 className="text-3xl md:text-4xl font-serif font-medium mb-8 leading-tight">
              "Excellence in Every <span className="text-gradient bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">Journey</span>, Precision in Every <span className="text-gradient bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">Document</span>."
            </h2>
            <p className="text-lg text-gray-600 mb-10 max-w-3xl mx-auto">
              Partner with us for seamless travel experiences and meticulous documentation services tailored to your needs.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative overflow-hidden group bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-4 rounded-lg font-medium tracking-wide shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Get Started Now
                <span className="absolute inset-0 bg-gradient-to-r from-blue-700 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-transparent hover:bg-black/5 text-gray-900 font-semibold rounded-lg border-2 border-gray-900 hover:border-transparent transition-all duration-300"
              >
                Contact Our Team
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Floating Action Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5 }}
        className="fixed bottom-8 right-8 z-50"
      >
        <button className="p-4 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
        </button>
      </motion.div>
      <Footer />
    </div>
  );
};

export default ServicesPage;