"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const AffiliatedPartners = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const partners = [
    { name: "Emirates", logo: "/logos/emirates.png" },
    { name: "Qatar Airways", logo: "/logos/qatar-airways.png" },
    { name: "Expedia", logo: "/logos/expedia.png" },
    { name: "Booking.com", logo: "/logos/booking.png" },
    { name: "Marriott", logo: "/logos/marriott.png" },
    { name: "Hertz", logo: "/logos/hertz.png" },
    { name: "Visa", logo: "/logos/visa.png" },
    { name: "Mastercard", logo: "/logos/mastercard.png" },
  ];

  return (
    <section 
      ref={ref}
      className="relative py-20 bg-gradient-to-b from-white to-gray-50 overflow-hidden"
    >
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-5 bg-[url('/pattern-grid.svg')] bg-[length:60px_60px]"></div>
      <div className="absolute top-20 left-1/4 w-48 h-48 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
      <div className="absolute bottom-20 right-1/4 w-64 h-64 bg-yellow-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-4">
            Trusted Partnerships
          </span>
          <h2 className="text-3xl md:text-4xl font-serif font-medium mb-4">
            We Are <span className="text-gradient bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">Affiliated</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Partnered with world-class brands to bring you the best travel and documentation services
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="relative"
        >
          {/* Animated gradient border */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-400 to-transparent"
          />
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8 py-12">
            {partners.map((partner, index) => (
              <motion.div
                key={partner.name}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="flex items-center justify-center p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100"
              >
                <div className="relative h-16 w-full flex items-center justify-center">
                  {/* Placeholder for logo - replace with actual Image component */}
                  <div className="text-gray-400 text-xs">
                    {partner.name} Logo
                  </div>
                  {/* Actual implementation would use:
                    <Image 
                      src={partner.logo} 
                      alt={partner.name}
                      width={120}
                      height={60}
                      className="object-contain h-full w-full"
                    />
                  */}
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-400 to-transparent"
          />
        </motion.div>

        
      </div>
    </section>
  );
};

export default AffiliatedPartners;