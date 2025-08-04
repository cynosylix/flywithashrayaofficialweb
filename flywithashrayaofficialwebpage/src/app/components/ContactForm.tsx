import { motion } from "framer-motion";
import { FaFacebook, FaTwitter, FaInstagram, FaPinterest, FaPaperPlane } from "react-icons/fa";
import { IoIosMail, IoIosGlobe } from "react-icons/io";

const ContactForm = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission (API call, etc.)
    alert("Message sent!");
  };

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="relative overflow-hidden py-20 px-4 sm:px-6 lg:px-8"
    >
      {/* Background with gradient overlay */}
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')] bg-cover bg-center" />
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 via-purple-600/30 to-blue-800/40 backdrop-blur-md" />

      <div className="relative max-w-6xl mx-auto">
        {/* Animated header (like GlobalPresence) */}
        <motion.div 
          className="text-center mb-16"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <motion.div
            className="w-20 h-20 mx-auto rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-xl mb-6 border border-white/20 relative overflow-hidden"
            whileHover={{ scale: 1.05 }}
          >
            <IoIosMail className="h-10 w-10 text-white" />
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Talk With <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-300 to-pink-400">Our Team</span>
          </h2>
         <p className="text-lg text-white/80 max-w-2xl mx-auto">
  Any questions? We&apos;re here to help. Connect with us via socials or send a message.
</p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-12 bg-white/10 backdrop-blur-lg rounded-2xl overflow-hidden border border-white/20 shadow-2xl">
          {/* Social Media Section (Glass Panel) */}
          <motion.div 
            className="lg:w-1/3 p-10 bg-gradient-to-br from-indigo-500/10 to-purple-600/20"
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
              <IoIosGlobe className="text-amber-300" /> Global Connections
            </h3>
            <div className="space-y-6">
              <div className="flex gap-4">
                <a href="#" className="p-3 bg-white/10 rounded-full hover:bg-white/20 transition-all">
                  <FaFacebook className="text-blue-400 text-xl" />
                </a>
                <a href="#" className="p-3 bg-white/10 rounded-full hover:bg-white/20 transition-all">
                  <FaTwitter className="text-sky-300 text-xl" />
                </a>
                <a href="#" className="p-3 bg-white/10 rounded-full hover:bg-white/20 transition-all">
                  <FaInstagram className="text-pink-400 text-xl" />
                </a>
                <a href="#" className="p-3 bg-white/10 rounded-full hover:bg-white/20 transition-all">
                  <FaPinterest className="text-red-400 text-xl" />
                </a>
              </div>
              <div className="space-y-4">
                <p className="text-white/80">Prefer direct communication?</p>
                <button className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/20 rounded-lg text-white hover:bg-white/10 transition-all">
                  <IoIosMail /> info@flywithashraya.com
                </button>
              </div>
            </div>
          </motion.div>

          {/* Contact Form (Glass Panel) */}
          <motion.form
            onSubmit={handleSubmit}
            className="lg:w-2/3 p-10 bg-white/5 backdrop-blur-sm"
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-white/80 mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-purple-400"
                  placeholder="John Doe"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-white/80 mb-2">
                  Your Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-purple-400"
                  placeholder="john@example.com"
                  required
                />
              </div>
              <div className="md:col-span-2">
                <label htmlFor="subject" className="block text-white/80 mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-purple-400"
                  placeholder="How can we help?"
                  required
                />
              </div>
              <div className="md:col-span-2">
                <label htmlFor="message" className="block text-white/80 mb-2">
                  Your Message
                </label>
                <textarea
                  id="message"
                  rows={5}
                  className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-purple-400"
                  placeholder="Share your thoughts..."
                ></textarea>
              </div>
            </div>
            <motion.button
              type="submit"
              className="mt-8 w-full md:w-auto px-8 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg flex items-center gap-2 hover:shadow-lg transition-all"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <FaPaperPlane /> Send Message
            </motion.button>
          </motion.form>
        </div>
      </div>
    </motion.section>
  );
};

export default ContactForm;