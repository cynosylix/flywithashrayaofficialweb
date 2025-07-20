import { motion } from "framer-motion";
import { IoIosGlobe } from "react-icons/io";

const GlobalPresence = () => {
  return (
    <div >
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="text-center mb-24 relative overflow-hidden py-16"
      >
        {/* Background image with overlay */}
        <div
          className="mt-24 absolute inset-0 bg-[url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')] 
        bg-cover bg-center "
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white/90 via-white/50 to-white/30 backdrop-blur-sm" />

        <div className="relative z-10 px-4 sm:px-6 lg:px-8">
          <div className="mt-24  inline-flex items-center justify-center mb-8">
            <motion.div
              className="w-24 h-24 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-2xl backdrop-blur-sm bg-opacity-90 border border-white border-opacity-30 relative overflow-hidden"
              initial={{ scale: 0, rotate: -45 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            >
              {/* Shimmer effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                initial={{ x: -100 }}
                animate={{ x: "100%" }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
              <IoIosGlobe className="h-12 w-12 text-white" />
            </motion.div>
          </div>

          <motion.h2
            className="text-5xl font-extrabold text-gray-900 sm:text-6xl lg:text-7xl bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            Our Global Presence
          </motion.h2>

          <motion.p
            className="mt-8 max-w-2xl mx-auto text-xl text-gray-600 leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Discover our locations and connect with our team worldwide
          </motion.p>
        </div>
      </motion.div>
    </div>
  );

};

export default GlobalPresence;