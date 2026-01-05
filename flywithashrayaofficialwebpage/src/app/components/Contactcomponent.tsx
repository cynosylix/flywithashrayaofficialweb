'use client'
import { useState, useRef } from 'react'
import { motion, useTransform, useScroll, Transition } from 'framer-motion'
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock, FaBuilding, FaExternalLinkAlt } from 'react-icons/fa'
import { RiCustomerService2Fill } from 'react-icons/ri'
import { Variants } from 'framer-motion'

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      when: "beforeChildren"
    }
  }
}

const cardVariants: Variants = {
  hidden: { y: 50, opacity: 0, rotateX: -15 },
  visible: {
    y: 0,
    opacity: 1,
    rotateX: 0,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1],
      rotateX: { duration: 1, ease: [0.22, 1, 0.36, 1] }
    }
  },
  hover: {
    y: -15,
    scale: 1.03,
    rotateY: 2,
    transition: {
      duration: 0.4,
      ease: "easeOut"
    }
  }
}

const locations = [
  {
    id: 1,
    title: "Head Office - Pampady",
    address: "Vin's Tower, Kalachanda Jn., NH 183 Behind Federal Bank ATM Pampady, Kottayam, Kerala, India",
    phones: "+91 9400416016\n+91 9496416016",
    email: "info@flywithashraya.com",
    hours: "Mon-Sat: 9AM - 6PM",
    mapUrl: "https://www.google.com/maps/place/Fly+With+Ashraya/@9.5691395,76.6305772,873m/data=!3m1!1e3!4m14!1m7!3m6!1s0x3b062d8007486355:0x2d4e5e190382302d!2sFly+With+Ashraya!8m2!3d9.5691395!4d76.6354481!16s%2Fg%2F11jzsdphr9!3m5!1s0x3b062d8007486355:0x2d4e5e190382302d!8m2!3d9.5691395!4d76.6354481!16s%2Fg%2F11jzsdphr9?entry=ttu",
    mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3928.7151!2d76.6354481!3d9.5691395!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b062d8007486355%3A0x2d4e5e190382302d!2sFly%20With%20Ashraya!5e0!3m2!1sen!2sin!4v1710000000000!5m2!1sen!2sin"
  },
  {
    id: 2,
    title: "Branch Office - Mundakayam",
    address: "Kunnumpurathu Building, Opposite South Indian Bank, NH 183, Mundakayam, Kottayam, Kerala, India",
    phones: "+91 9400916016\n+91 97787 53870",
    email: "info@flywithashraya.com",
    hours: "Mon-Sat: 8AM - 5PM",
    mapUrl: "https://www.google.com/maps/place/Fly+With+Ashraya/@9.5396371,76.8796718,873m/data=!3m1!1e3!4m14!1m7!3m6!1s0x3b0649c01c1563d3:0x1008ca93944fdba0!2sFly+With+Ashraya!8m2!3d9.5396371!4d76.8822467!16s%2Fg%2F11x7rhn1pw!3m5!1s0x3b0649c01c1563d3:0x1008ca93944fdba0!8m2!3d9.5396371!4d76.8822467!16s%2Fg%2F11x7rhn1pw?entry=ttu",
    mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3929.1234!2d76.8822467!3d9.5396371!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b0649c01c1563d3%3A0x1008ca93944fdba0!2sFly%20With%20Ashraya!5e0!3m2!1sen!2sin!4v1710000000000!5m2!1sen!2sin"
  },
  {
    id: 3,
    title: "International Branch - Kuwait",
    address: "Building 81, Opposite Police Station, Tea Spot Building, Street 3, Jleeb Al-Shuyoukh, Kuwait",
    phones: "+965 69680820\n+965 97341915",
    email: "info@flywithashraya.com\nnikhil@flywithashraya.com",
    hours: "Time (Online only)",
    mapUrl: "https://www.google.com/maps/dir//Jleeb+Al-Shuyoukh,+Ardiya,+Kuwait/@29.1617505,47.9656301,59780m/data=!3m1!1e3!4m9!4m8!1m0!1m5!1m1!1s0x3fcf99f798d926f3:0x47d5ffc6e6027536!2m2!1d47.9330522!2d29.2595663!3e0?entry=ttu",
    mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d27791.2345!2d47.9330522!3d29.2595663!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3fcf99f798d926f3%3A0x47d5ffc6e6027536!2sJleeb%20Al-Shuyoukh!5e0!3m2!1sen!2sin!4v1710000000000!5m2!1sen!2sin"
  }
]

// ... [rest of the animation variants and transitions remain the same] ...

export default function PremiumContact() {
  const containerRef = useRef<HTMLDivElement>(null)
  // ... [previous state and scroll effects remain the same] ...

  const handleMapClick = (mapUrl: string) => {
    window.open(mapUrl, '_blank', 'noopener,noreferrer')
  }

  return (
    <div 
      ref={containerRef}
      className="relative bg-gradient-to-br from-gray-50 via-gray-100 to-gray-50 py-12 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      {/* ... [background and decorative elements remain the same] ... */}

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "0px 0px -150px 0px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-10 perspective-1000"
          style={{ perspective: "1000px" }}
        >
          {locations.map((location) => (
            <motion.div
              key={location.id}
              variants={cardVariants}
              whileHover="hover"
              className={`relative rounded-3xl overflow-hidden transition-all duration-300 transform-style-preserve-3d shadow-xl`}
              style={{
                transformStyle: "preserve-3d",
                willChange: "transform"
              }}
            >
              <div className="backdrop-blur-md bg-white/80 border border-white/30 shadow-2xl h-full flex flex-col">
                {/* Card Header */}
                <div className="p-8 cursor-pointer relative z-10 flex-1 flex flex-col">
                  <div className="flex items-center mb-6">
                    <motion.div
                      className="p-3 rounded-xl bg-gradient-to-br from-indigo-100 to-purple-100 text-indigo-600 shadow-sm backdrop-blur-sm bg-opacity-60 relative overflow-hidden"
                      whileHover={{ rotate: 5, scale: 1.05 }}
                    >
                      <FaBuilding className="h-6 w-6" />
                    </motion.div>
                    <h3 className="ml-4 text-xl font-bold text-gray-900">{location.title}</h3>
                  </div>

                  {/* Contact Info */}
                  <div className="space-y-6 flex-1">
                    <div className="flex items-start">
                      <div className="p-2 rounded-lg bg-indigo-50/60 text-indigo-600 flex-shrink-0 backdrop-blur-sm">
                        <FaMapMarkerAlt className="h-4 w-4 mt-0.5" />
                      </div>
                      <p className="ml-3 text-base text-gray-600 leading-relaxed">{location.address}</p>
                    </div>
                    <div className="flex items-start">
                      <div className="p-2 rounded-lg bg-indigo-50/60 text-indigo-600 flex-shrink-0 backdrop-blur-sm">
                        <FaPhone className="h-4 w-4 mt-0.5" />
                      </div>
                      <div className="ml-3">
                        {location.phones.split('\n').map((phone, index) => (
                          <a
                            key={index}
                            href={`tel:${phone.replace(/\s+/g, '')}`}
                            className="block text-base text-gray-600 hover:text-indigo-600 transition-colors duration-300"
                            onClick={(e) => e.stopPropagation()}
                          >
                            {phone}
                          </a>
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="p-2 rounded-lg bg-indigo-50/60 text-indigo-600 flex-shrink-0 backdrop-blur-sm">
                        <FaEnvelope className="h-4 w-4 mt-0.5" />
                      </div>
                      <a
                        href={`mailto:${location.email.split('\n')[0]}`}
                        className="ml-3 text-base text-gray-600 hover:text-indigo-600 transition-colors duration-300"
                        onClick={(e) => e.stopPropagation()}
                      >
                        {location.email.split('\n')[0]}
                      </a>
                    </div>
                    <div className="flex items-start">
                      <div className="p-2 rounded-lg bg-indigo-50/60 text-indigo-600 flex-shrink-0 backdrop-blur-sm">
                        <FaClock className="h-4 w-4 mt-0.5" />
                      </div>
                      <p className="ml-3 text-base text-gray-600">{location.hours}</p>
                    </div>
                  </div>
                </div>

                {/* Interactive Map Section */}
                <div 
                  className="relative w-full h-64 overflow-hidden transform translate-z-0 cursor-pointer"
                  onClick={() => handleMapClick(location.mapUrl)}
                >
                  <motion.div
                    className="absolute inset-0 rounded-b-3xl overflow-hidden"
                    whileHover={{ 
                      boxShadow: 'inset 0 0 0 4px rgba(99, 102, 241, 0.5)',
                      transition: { duration: 0.3 }
                    }}
                  >
                    <iframe
                      src={location.mapEmbedUrl}
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      className="absolute inset-0 w-full h-full object-cover"
                      aria-label={`Map of ${location.title}`}
                    />
                  </motion.div>
                  
                  <div className="absolute bottom-4 right-4">
                    <a
                      href={location.mapUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-white/90 p-3 rounded-full shadow-lg hover:bg-indigo-50 transition-all duration-300 flex items-center justify-center border border-white/30"
                      aria-label="Open in Google Maps"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <FaExternalLinkAlt className="h-4 w-4 text-indigo-600" />
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px 0px -100px 0px" }}
          transition={{ delay: 0.4, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mt-32 text-center"
        >
          <div className="inline-flex items-center justify-center mb-8">
            <motion.div
              className="w-24 h-24 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-2xl backdrop-blur-sm bg-opacity-90 border border-white/30 relative overflow-hidden"
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.8, 1, 0.8],
                transition: { duration: 6, repeat: Infinity, ease: "easeInOut" }
              }}
            >
              <RiCustomerService2Fill className="h-12 w-12 text-white" />
            </motion.div>
          </div>
          <h3 className="text-4xl font-bold text-gray-900 mb-6">
            Need immediate assistance?
          </h3>
          <p className="mt-2 text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Our dedicated support team is ready to help you with any questions or concerns you may have.
          </p>
          <div className="mt-12 flex flex-col sm:flex-row justify-center gap-8">
            <motion.a
              whileHover={{
                scale: 1.05,
                boxShadow: "0 20px 40px -10px rgba(79, 70, 229, 0.4)",
                y: -5
              }}
              whileTap={{ scale: 0.98, y: 0 }}
              href="tel:+919400416016"
              className="px-12 py-6 bg-gradient-to-br from-indigo-600 to-purple-600 text-white font-medium rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 flex items-center justify-center gap-4 text-lg backdrop-blur-sm bg-opacity-90 border border-white/30 relative overflow-hidden group"
            >
              <FaPhone className="h-6 w-6" />
              Call Support
            </motion.a>
            <motion.a
              whileHover={{
                scale: 1.05,
                boxShadow: "0 20px 40px -10px rgba(0, 0, 0, 0.1)",
                y: -5
              }}
              whileTap={{ scale: 0.98, y: 0 }}
              href="mailto:info@flywithashraya.com"
              className="px-12 py-6 bg-white/90 text-indigo-600 font-medium rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 border border-gray-200 hover:border-indigo-300 flex items-center justify-center gap-4 text-lg backdrop-blur-sm relative overflow-hidden group"
            >
              <FaEnvelope className="h-6 w-6" />
              Email Us
            </motion.a>
          </div>
        </motion.div>
      </div>
    </div>
  )
}