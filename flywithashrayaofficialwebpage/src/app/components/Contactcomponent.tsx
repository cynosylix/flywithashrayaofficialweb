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
    title: "Head Office",
    address: "Velikkakathu Building Kalachanda Jn., NH 183 Behind Federal Bank ATM Pampady, Kottayam, Kerala, India",
    phones: "+91 9400416016\n+91 9496416016",
    email: "info@flywithashraya.com",
    hours: "Mon-Sat: 9AM - 6PM",
    mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3928.7151!2d76.6789!3d9.8765!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b062d8007486355%3A0x2d4e5e190382302d!2sFly%20With%20Ashraya!5e0!3m2!1sen!2sin!4v1234567890123!5m2!1sen!2sin"
  },
  {
    id: 2,
    title: "Branch Office 1",
    address: "Kunnumpurathu Building, Opposite South Indian Bank, NH 183, Mundakayam, Kottayam, Kerala, India",
    phones: "+91 9400916016\n+91 97787 53870",
    email: "info@flywithashraya.com",
    hours: "Mon-Sat: 8AM - 5PM",
    mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d621017.9568261022!2d76.882247!3d9.539637!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b0649c01c1563d3%3A0x1008ca93944fdba0!2sFly%20With%20Ashraya!5e0!3m2!1sen!2sus!4v1752842367919!5m2!1sen!2sus"
  },
  {
    id: 3,
    title: "International Branch",
    address: "Building 81, Opposite Police Station, Tea Spot Building, Street 3, Jleeb Al-Shuyoukh, Kuwait",
    phones: "+965 69680820\n+965 97341915",
    email: "info@flywithashraya.com\n nikhil@flywithashraya.com",
    hours: "Time (Online only)",
    mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d549398.062775777!2d47.935125!3d29.256636!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3fcf9914e19893c9%3A0x52c6ebdf0f3f6c3d!2sJleeb%20Al%20shuyoukh!5e0!3m2!1sen!2sus!4v1752842590769!5m2!1sen!2sus"
  }
]

const floatingTransition: Transition = {
  duration: 12,
  repeat: Infinity,
  repeatType: "reverse",
  ease: "easeInOut"
}

const floatingVariants: Variants = {
  animate: {
    y: [0, -40, 0],
    x: [0, 25, 0],
    rotate: [0, 5, 0],
    transition: floatingTransition
  }
}

const pulseTransition: Transition = {
  duration: 6,
  repeat: Infinity,
  ease: "easeInOut"
}

const pulseVariants: Variants = {
  animate: {
    scale: [1, 1.15, 1],
    opacity: [0.8, 1, 0.8],
    transition: pulseTransition
  }
}

export default function PremiumContact() {
  const [activeLocation, setActiveLocation] = useState<typeof locations[0] | null>(null)
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)
  const [loadedMaps, setLoadedMaps] = useState<number[]>([])
  const containerRef = useRef<HTMLDivElement>(null)
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  })
  
  const y = useTransform(scrollYProgress, [0, 1], [0, 200])
  const rotateX = useTransform(scrollYProgress, [0, 1], [0, 10])
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])

  const handleMapLoad = (id: number) => {
    if (!loadedMaps.includes(id)) {
      setLoadedMaps([...loadedMaps, id])
    }
  }

  return (
    
    <div 
      ref={containerRef}
      className="relative bg-gradient-to-br from-gray-50 via-gray-100 to-gray-50 py-12 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      
      {/* 3D Parallax Background */}
      <motion.div 
        className="absolute inset-0 overflow-hidden pointer-events-none"
        style={{ opacity, y }}
      >
        <motion.div
          className="absolute top-0 left-0 w-full h-full bg-[url('https://assets-global.website-files.com/5f5a53e153805db840dae2db/64c9a9a4f1b9c9d3d3d9c8e7_Grid.svg')] bg-repeat opacity-10"
          style={{ rotateX }}
        />
      </motion.div>

      {/* Animated floating elements */}
      <motion.div
        className="absolute top-0 left-0 w-full h-full pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
      >
        <motion.div
          className="absolute top-20 left-10 w-64 h-64 rounded-full bg-gradient-to-br from-indigo-200/30 to-purple-200/30 opacity-30 blur-3xl"
          variants={floatingVariants}
          animate="animate"
        />
        <motion.div
          className="absolute bottom-10 right-20 w-80 h-80 rounded-full bg-gradient-to-br from-purple-200/30 to-blue-200/30 opacity-30 blur-3xl"
          variants={floatingVariants}
          animate="animate"
          style={{ animationDelay: '2s' }}
        />
        <motion.div
          className="absolute top-1/3 right-1/4 w-96 h-96 rounded-full bg-gradient-to-br from-blue-200/20 to-indigo-200/20 opacity-20 blur-3xl"
          variants={floatingVariants}
          animate="animate"
          style={{ animationDelay: '4s' }}
        />
      </motion.div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header section with 3D effect */}
        

        {/* Location cards with enhanced map border animation */}
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
              onHoverStart={() => setHoveredCard(location.id)}
              onHoverEnd={() => setHoveredCard(null)}
              className={`relative rounded-3xl overflow-hidden transition-all duration-300 transform-style-preserve-3d ${
                (activeLocation?.id === location.id || (!activeLocation && location.id === 1)) 
                  ? 'ring-2 ring-indigo-500/50 shadow-2xl' 
                  : 'shadow-xl'
              }`}
              onClick={() => setActiveLocation(location)}
              style={{
                transformStyle: "preserve-3d",
                willChange: "transform"
              }}
            >
              {/* Glass morphism card with depth */}
              <div className="backdrop-blur-md bg-white/80 border border-white/30 shadow-2xl h-full flex flex-col">
                {/* Glow effect when hovered */}
                {hoveredCard === location.id && (
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-indigo-200/40 to-purple-200/40 opacity-30 pointer-events-none"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.3 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                  />
                )}

                {/* Card content */}
                <div className="p-8 cursor-pointer relative z-10 flex-1 flex flex-col">
                  <div className="flex items-center mb-6">
                    <motion.div
                      className="p-3 rounded-xl bg-gradient-to-br from-indigo-100 to-purple-100 text-indigo-600 shadow-sm backdrop-blur-sm bg-opacity-60 relative overflow-hidden"
                      whileHover={{ rotate: 5, scale: 1.05 }}
                    >
                      {/* Shimmer effect */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                        initial={{ x: -100 }}
                        animate={{ x: "100%" }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          ease: "linear"
                        }}
                      />
                      <FaBuilding className="h-6 w-6" />
                    </motion.div>
                    <h3 className="ml-4 text-xl font-bold text-gray-900">{location.title}</h3>
                  </div>

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
                        href={`mailto:${location.email}`}
                        className="ml-3 text-base text-gray-600 hover:text-indigo-600 transition-colors duration-300"
                        onClick={(e) => e.stopPropagation()}
                      >
                        {location.email}
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

                {/* Enhanced Map section with animated border */}
                <div className="relative w-full h-64 overflow-hidden transform translate-z-0">
                  {/* Animated border container */}
                  <motion.div
                    className="absolute inset-0 rounded-b-3xl overflow-hidden"
                    initial={{ boxShadow: 'inset 0 0 0 0px rgba(99, 102, 241, 0)' }}
                    whileHover={{ 
                      boxShadow: 'inset 0 0 0 4px rgba(99, 102, 241, 0.5)',
                      transition: { duration: 0.3 }
                    }}
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent z-10"
                      initial={{ opacity: 0 }}
                      animate={{ 
                        opacity: hoveredCard === location.id ? 0.4 : 0.2,
                        transition: { duration: 0.8, ease: "easeInOut" }
                      }}
                    />
                    
                    {/* Map Loading Skeleton */}
                    {!loadedMaps.includes(location.id) && (
                      <motion.div
                        className="absolute inset-0 bg-gray-200 animate-pulse"
                        initial={{ opacity: 1 }}
                        animate={{ 
                          opacity: 0,
                          transition: { delay: 0.5, duration: 0.5 }
                        }}
                        exit={{ opacity: 0 }}
                      />
                    )}
                    
                    {/* Map Container with Smooth Scale Animation */}
                    <motion.div
                      className="absolute inset-0 w-full h-full"
                      initial={{ scale: 1.05, opacity: 0 }}
                      animate={{ 
                        scale: 1,
                        opacity: loadedMaps.includes(location.id) ? 1 : 0,
                        transition: { 
                          scale: { duration: 1.2, ease: [0.22, 1, 0.36, 1] },
                          opacity: { duration: 0.8, ease: "easeOut" }
                        }
                      }}
                      whileHover={{
                        scale: 1.03,
                        transition: { duration: 0.8, ease: "easeOut" }
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
                        onLoad={() => handleMapLoad(location.id)}
                      />
                    </motion.div>
                  </motion.div>
                  
                  {/* Map Controls */}
                  <motion.div
                    className="absolute bottom-4 right-4 flex gap-2"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ 
                      opacity: 1, 
                      y: 0,
                      transition: { delay: 0.6 }
                    }}
                  >
                    <a
                      href={location.mapEmbedUrl.replace('embed', 'maps')}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-white/90 backdrop-blur-sm p-3 rounded-full shadow-lg hover:bg-indigo-50 transition-all duration-300 flex items-center justify-center border border-white/30 group"
                      aria-label="Open in Google Maps"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <motion.div
                        whileHover={{ rotate: 90 }}
                        transition={{ duration: 0.3 }}
                      >
                        <FaExternalLinkAlt className="h-4 w-4 text-indigo-600 group-hover:text-indigo-700 transition-colors" />
                      </motion.div>
                    </a>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Enhanced CTA section with 3D buttons */}
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
              variants={pulseVariants}
              animate="animate"
            >
              {/* Shimmer effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                initial={{ x: -100 }}
                animate={{ x: "100%" }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
              <RiCustomerService2Fill className="h-12 w-12 text-white" />
            </motion.div>
          </div>
          <motion.h3
            className="text-4xl font-bold text-gray-900 mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Need immediate assistance?
          </motion.h3>
          <motion.p
            className="mt-2 text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            Our dedicated support team is ready to help you with any questions or concerns you may have.
          </motion.p>
          <div className="mt-12 flex flex-col sm:flex-row justify-center gap-8">
            <motion.a
              whileHover={{
                scale: 1.05,
                boxShadow: "0 20px 40px -10px rgba(79, 70, 229, 0.4)",
                y: -5
              }}
              whileTap={{ scale: 0.98, y: 0 }}
              href="tel:+911234567890"
              className="px-12 py-6 bg-gradient-to-br from-indigo-600 to-purple-600 text-white font-medium rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 flex items-center justify-center gap-4 text-lg backdrop-blur-sm bg-opacity-90 border border-white/30 relative overflow-hidden group"
            >
              {/* Button shine effect */}
              <motion.span
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-0 group-hover:opacity-100"
                initial={{ x: -100 }}
                animate={{ x: "100%" }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "linear",
                  delay: 0.3
                }}
              />
              <motion.div
                animate={{
                  rotate: [0, 15, -15, 0],
                  transition: { duration: 2, repeat: Infinity }
                }}
              >
                <FaPhone className="h-6 w-6" />
              </motion.div>
              Call Support
            </motion.a>
            <motion.a
              whileHover={{
                scale: 1.05,
                boxShadow: "0 20px 40px -10px rgba(0, 0, 0, 0.1)",
                y: -5
              }}
              whileTap={{ scale: 0.98, y: 0 }}
              href="mailto:flywithashraya@gmail.com"
              className="px-12 py-6 bg-white/90 text-indigo-600 font-medium rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 border border-gray-200 hover:border-indigo-300 flex items-center justify-center gap-4 text-lg backdrop-blur-sm relative overflow-hidden group"
            >
              {/* Button shine effect */}
              <motion.span
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 group-hover:opacity-100"
                initial={{ x: -100 }}
                animate={{ x: "100%" }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "linear",
                  delay: 0.3
                }}
              />
              <motion.div
                animate={{
                  y: [0, -8, 0],
                  transition: { duration: 3, repeat: Infinity }
                }}
              >
                <FaEnvelope className="h-6 w-6" />
              </motion.div>
              Email Us
            </motion.a>
          </div>
        </motion.div>
      </div>
    </div>
  )
}