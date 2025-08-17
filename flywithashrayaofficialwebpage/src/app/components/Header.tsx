"use client";
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import Image from 'next/image';
import { 
  logoVariants, 
  navItemVariants, 
  underlineVariants, 
  mobileMenuVariants, 
  mobileItemVariants 
} from '../animationVariants';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("#home");
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 100);
  });

  const navLinks = [
    { href: "/#home", text: "Home" },
    { href: "/about", text: "About" },
    { href: "/services", text: "Destinations" },
    { href: "/packages", text: "Packages" },
    { href: "/#specials", text: "Special Fares" },
    { href: "/#testimonials", text: "Reviews" },
    { href: "/gallery", text: "Gallery" },
    { href: "/Contact", text: "Contact" }
  ];

  // Removed unused variables contactPhones, contactEmails, contactWebsite, socialLinks

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('section[id]');
      let current = '';

      sections.forEach(section => {
        const sectionElement = section as HTMLElement;
        const sectionTop = sectionElement.offsetTop;
        // Removed unused variable sectionHeight
        if (window.scrollY >= sectionTop - 300) {
          current = `#${section.id}`;
        }
      });

      setActiveLink(current || "#home");
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="fixed top-0 w-full z-50">
      <motion.nav
        className={`transition-all duration-500 ${scrolled ? 'py-2 bg-white/95 backdrop-blur-md shadow-lg' : 'py-3 bg-white/95 backdrop-blur-md'}`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            {/* Logo with perfect sizing */}
            <motion.div
              variants={logoVariants}
              initial="initial"
              animate="animate"
              whileHover="hover"
              className="flex-shrink-0"
            >
              <Link href="/" className="flex items-center h-14 w-auto min-w-[120px] max-w-[160px]">
                <Image
                  src="/logo.png"
                  alt="Company Logo"
                  width={0}  // Let the container control width
                  height={0} // Let the container control height
                  sizes="(max-width: 768px) 120px, 160px" // Responsive sizing
                  className="w-full h-auto object-contain object-left"
                  priority
                  style={{
                    width: '95%', // Fill container width
                    height: 'auto', // Maintain aspect ratio
                  }}
                />
              </Link>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-8">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.href}
                  variants={navItemVariants}
                  initial="initial"
                  animate="animate"
                  custom={index}
                  whileHover="hover"
                >
                  <Link
                    href={link.href}
                    className="relative py-2 text-gray-700 hover:text-blue-500 transition-colors font-medium"
                  >
                    {link.text}
                    <motion.span
                      className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-blue-500 to-cyan-400`}
                      variants={underlineVariants}
                      initial="initial"
                      animate={activeLink === link.href ? "active" : "initial"}
                      whileHover="hover"
                      transition={{ duration: 0.3, ease: "easeOut" }}
                    />
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              className="md:hidden text-gray-900 focus:outline-none relative z-50"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              whileTap={{ scale: 0.9 }}
              aria-label="Toggle menu"
            >
              <motion.div
                animate={mobileMenuOpen ? "open" : "closed"}
                className="flex flex-col space-y-1.5 w-6"
              >
                <motion.span
                  className="h-0.5 w-full bg-gray-900 rounded"
                  variants={{
                    closed: { rotate: 0, y: 0 },
                    open: { rotate: 45, y: 6 }
                  }}
                />
                <motion.span
                  className="h-0.5 w-full bg-gray-900 rounded"
                  variants={{
                    closed: { opacity: 1 },
                    open: { opacity: 0 }
                  }}
                />
                <motion.span
                  className="h-0.5 w-full bg-gray-900 rounded"
                  variants={{
                    closed: { rotate: 0, y: 0 },
                    open: { rotate: -45, y: -6 }
                  }}
                />
              </motion.div>
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              className="md:hidden bg-white/95 backdrop-blur-md shadow-xl"
              variants={mobileMenuVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <div className="px-4 pt-2 pb-6 space-y-1">
                {navLinks.map((link) => (
                  <motion.div
                    key={link.href}
                    variants={mobileItemVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                  >
                    <Link
                      href={link.href}
                      className={`block px-4 py-3 rounded-lg text-lg font-medium transition-colors ${activeLink === link.href
                          ? 'bg-blue-50 text-blue-600'
                          : 'text-gray-700 hover:bg-gray-50 hover:text-blue-500'
                        }`}
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
      </motion.nav>
    </header>
  );
};

export default Header;
