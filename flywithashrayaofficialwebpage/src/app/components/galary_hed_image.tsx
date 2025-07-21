import { motion } from "framer-motion";
import {  IoMdImages } from "react-icons/io";

const GalleryGlobalPresence = () => {
  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="text-center mb-24 relative overflow-hidden py-16"
      >
        {/* Background image with overlay */}
        <div
          className="mt-24 absolute inset-0 bg-[url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')] 
        bg-cover bg-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white/90 via-white/50 to-white/30 backdrop-blur-sm" />

        <div className="relative z-10 px-4 sm:px-6 lg:px-8">
          <div className="mt-24 inline-flex items-center justify-center mb-8">
            
          </div>

          {/* Gallery Icon Above Title */}
          <motion.div
            className="flex justify-center mb-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
          >
            <div className="p-4 bg-white/20 backdrop-blur-md rounded-full border border-white/30">
              <IoMdImages className="h-10 w-10 text-indigo-600" />
            </div>
          </motion.div>

          <motion.h2
            className="text-5xl font-extrabold text-gray-900 sm:text-6xl lg:text-7xl bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            Our Global Gallery
          </motion.h2>

          <motion.p
            className="mt-8 max-w-2xl mx-auto text-xl text-gray-600 leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Explore our collection of stunning visuals and creative work
          </motion.p>
        </div>
      </motion.div>
    </div>
  );
};

export default GalleryGlobalPresence;