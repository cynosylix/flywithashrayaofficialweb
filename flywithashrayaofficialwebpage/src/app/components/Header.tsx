
"use client"
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: "#home", text: "Home" },
    { href: "/about", text: "About" },
    { href: "#destinations", text: "Destinations" },
    { href: "#packages", text: "Packages" },
    { href: "#specials", text: "Special Fares" },
    { href: "#testimonials", text: "Reviews" },
    { href: "#contact", text: "Contact" }
  ];

  return (
    <header className="fixed top-0 w-full z-50">
      <nav className={`transition-all duration-500 ${scrolled ? 'py-3 bg-white bg-opacity-90 shadow-lg' : 'py-4 bg-white bg-opacity-90'}`}>
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            {/* Logo with PNG */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Link href="/" className="flex items-center text-2xl font-bold text-blue-400">
                <motion.div 
                  className="w-10 h-10 rounded-full flex items-center justify-center mr-3 overflow-hidden"
                  whileHover={{ 
                    rotate: 12,
                    transition: { duration: 0.3 }
                  }}
                >
                  <Image 
                    src="/logo.png" 
                    alt="FlyWithAshraya Logo"
                    width={40}
                    height={40}
                    className="object-contain"
                  />
                </motion.div>
                FlyWithAshraya
              </Link>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-8">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                >
                  <Link 
                    href={link.href} 
                    className="text-gray-900 hover:text-blue-400 transition-colors relative py-2 group"
                  >
                    {link.text}
                    <span className={`absolute bottom-0 left-0 h-0.5 bg-blue-400 transition-all duration-300 ${link.href === "#home" ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <motion.button 
              className="md:hidden text-gray-900 focus:outline-none"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              whileTap={{ scale: 0.9 }}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={mobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
              </svg>
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div 
              className="md:hidden bg-white shadow-lg"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="px-4 pt-2 pb-4 space-y-2">
                {navLinks.map((link) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Link 
                      href={link.href} 
                      className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:text-blue-400 hover:bg-gray-50"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {link.text}
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
};

export default Header;