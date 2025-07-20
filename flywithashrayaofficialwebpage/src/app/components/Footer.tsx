"use client";
import { motion, useAnimation, useInView } from "framer-motion";
import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";

type SocialMedia = {
  icon: JSX.Element;
  color: string;
  url: string;
  name: string;
};

type FooterLink = {
  text: string;
  url: string;
};

const Footer = () => {
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
  };

  const socialIconVariants = {
    hover: {
      y: -5,
      scale: 1.1,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10,
      },
    },
  };

  const linkVariants = {
    hover: {
      x: 5,
      color: "#ffffff",
      transition: {
        type: "spring",
        stiffness: 300,
      },
    },
  };

  const newsletterButtonVariants = {
    initial: { scale: 1 },
    hover: {
      scale: 1.03,
      boxShadow: "0 5px 15px rgba(59, 130, 246, 0.4)",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10,
      },
    },
    tap: {
      scale: 0.98,
    },
  };

  const socialMedia: SocialMedia[] = [
    {
      name: "Facebook",
      icon: (
        <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
      ),
      color: "bg-blue-600 hover:bg-blue-700",
      url: "https://www.facebook.com/flywithashraya"
    },
    {
      name: "Instagram",
      icon: (
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
      ),
      color: "bg-gradient-to-br from-pink-500 via-red-500 to-yellow-500 hover:opacity-90",
      url: "https://www.instagram.com/flywithashraya.in/"
    },
    {
      name: "Twitter",
      icon: (
        <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
      ),
      color: "bg-sky-500 hover:bg-sky-600",
      url: "https://twitter.com/flywithashraya"
    },
    {
      name: "LinkedIn",
      icon: (
        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
      ),
      color: "bg-blue-700 hover:bg-blue-800",
      url: "https://www.linkedin.com/in/fly-with-ashraya-ashraya-digital-b21891259"
    },
    {
      name: "YouTube",
      icon: (
        <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
      ),
      color: "bg-red-600 hover:bg-red-700",
      url: "https://www.youtube.com/@flywithashraya"
    }
  ];

  const quickLinks: FooterLink[] = [
    { text: "Home", url: "/" },
    { text: "About Us", url: "/about" },
    { text: "Destinations", url: "/destinations" },
    { text: "Packages", url: "/packages" },
    { text: "Special Deals", url: "/deals" }
  ];

  const supportLinks: FooterLink[] = [
    { text: "FAQs", url: "/faq" },
    { text: "Privacy Policy", url: "/privacy" },
    { text: "Terms & Conditions", url: "/terms" },
    { text: "Travel Insurance", url: "/insurance" },
    { text: "Cancellation Policy", url: "/cancellation" }
  ];

  const contactInfo = {
    phones: [
      "+91 9400416016",
      "+91 9400916016",
      "+91 9496416016",
      "+91 9778753870",
      "+91 9074165989"
    ],
    emails: [
      "info@flywithashraya.com",
      "flywithashraya@gmail.com"
    ],
    website: "https://www.flywithashraya.com"
  };

  return (
    <motion.footer
      ref={ref}
      className="bg-gradient-to-b from-gray-900 to-gray-950 text-white pt-24 pb-12 relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={controls}
      variants={containerVariants}
    >
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-yellow-400 to-pink-500"></div>
      
      {/* Subtle grid pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1MCIgaGVpZ2h0PSI1MCIgdmlld0JveD0iMCAwIDUwIDUwIj48cGF0aCBkPSJNMjUgMUExIDEgMCAwIDAgMjQgMkExIDEgMCAwIDAgMjUgM0ExIDEgMCAwIDAgMjYgMkExIDEgMCAwIDAgMjUgMU0yNSA3QTEgMSAwIDAgMCAyNCA4QTEgMSAwIDAgMCAyNSA5QTEgMSAwIDAgMCAyNiA4QTEgMSAwIDAgMCAyNSA3TTI1IDEzQTEgMSAwIDAgMCAyNCAxNEEgMSAxIDAgMCAwIDI1IDE1QTEgMSAwIDAgMCAyNiAxNEEgMSAxIDAgMCAwIDI1IDEzTTI1IDE5QTEgMSAwIDAgMCAyNCAyMEEgMSAxIDAgMCAwIDI1IDIxQTEgMSAwIDAgMCAyNiAyMEEgMSAxIDAgMCAwIDI1IDE5TTI1IDI1QTEgMSAwIDAgMCAyNCAyNkExIDEgMCAwIDAgMjUgMjdBMSAxIDAgMCAwIDI2IDI2QTEgMSAwIDAgMCAyNSAyNU0xOSAxQTEgMSAwIDAgMCAxOCAyQTEgMSAwIDAgMCAxOSAzQTEgMSAwIDAgMCAyMCAyQTEgMSAwIDAgMCAxOSAxTTE5IDdBMSAxIDAgMCAwIDE4IDhBIDEgMSAwIDAgMCAxOSA5QTEgMSAwIDAgMCAyMCA4QTEgMSAwIDAgMCAxOSA3TTE5IDEzQTEgMSAwIDAgMCAxOCAxNEEgMSAxIDAgMCAwIDE5IDE1QTEgMSAwIDAgMCAyMCAxNEEgMSAxIDAgMCAwIDE5IDEzTTE5IDE5QTEgMSAwIDAgMCAxOCAyMEEgMSAxIDAgMCAwIDE5IDIxQTEgMSAwIDAgMCAyMCAyMEEgMSAxIDAgMCAwIDE5IDE5TTE5IDI1QTEgMSAwIDAgMCAxOCAyNkExIDEgMCAwIDAgMTkgMjdBMSAxIDAgMCAwIDIwIDI2QTEgMSAwIDAgMCAxOSAyNU0xMyAxQTEgMSAwIDAgMCAxMiAyQTEgMSAwIDAgMCAxMyAzQTEgMSAwIDAgMCAxNCAyQTEgMSAwIDAgMCAxMyAxTTEzIDdBMSAxIDAgMCAwIDEyIDhBMSAxIDAgMCAwIDEzIDlBMSAxIDAgMCAwIDE0IDhBMSAxIDAgMCAwIDEzIDdNMTMgMTNBMSAxIDAgMCAwIDEyIDE0QSAxIDEgMCAwIDAgMTMgMTVBMSAxIDAgMCAwIDE0IDE0QSAxIDEgMCAwIDAgMTMgMTNNMTMgMTlBMSAxIDAgMCAwIDEyIDIwQSAxIDEgMCAwIDAgMTMgMjFBMSAxIDAgMCAwIDE0IDIwQTEgMSAwIDAgMCAxMyAxOU0xMyAyNUExIDEgMCAwIDAgMTIgMjZBMSAxIDAgMCAwIDEzIDI3QTEgMSAwIDAgMCAxNCAyNkExIDEgMCAwIDAgMTMgMjVNNyAxQTEgMSAwIDAgMCA2IDJBMSAxIDAgMCAwIDcgM0ExIDEgMCAwIDAgOCAyQTEgMSAwIDAgMCA3IDFNNyA3QTEgMSAwIDAgMCA2IDhBMSAxIDAgMCAwIDcgOUExIDEgMCAwIDAgOCA4QSAxIDEgMCAwIDAgNyA3TTcgMTNBMSAxIDAgMCAwIDYgMTRBMSAxIDAgMCAwIDcgMTVBMSAxIDAgMCAwIDggMTRBMSAxIDAgMCAwIDcgMTNNNyAxOUEgMSAxIDAgMCAwIDYgMjBBMSAxIDAgMCAwIDcgMjFBMSAxIDAgMCAwIDggMjBBMSAxIDAgMCAwIDcgMTlNNyAyNUExIDEgMCAwIDAgNiAyNkExIDEgMCAwIDAgNyAyN0ExIDEgMCAwIDAgOCAyNkExIDEgMCAwIDAgNyAyNU0xIDFBMSAxIDAgMCAwIDAgMkExIDEgMCAwIDAgMSAzQTEgMSAwIDAgMCAyIDJBMSAxIDAgMCAwIDEgMU0xIDdBMSAxIDAgMCAwIDAgOEEgMSAxIDAgMCAwIDEgOUExIDEgMCAwIDAgMiA4QTEgMSAwIDAgMCAxIDdNMSAxM0ExIDEgMCAwIDAgMCAxNEEgMSAxIDAgMCAwIDEgMTVBMSAxIDAgMCAwIDIgMTRBMSAxIDAgMCAwIDEgMTNNMSAxOUEgMSAxIDAgMCAwIDAgMjBBIDEgMSAwIDAgMCAxIDIxQTEgMSAwIDAgMCAyIDIwQTEgMSAwIDAgMCAxIDE5TTEgMjVBMSAxIDAgMCAwIDAgMjZBMSAxIDAgMCAwIDEgMjdBMSAxIDAgMCAwIDIgMjZBMSAxIDAgMCAwIDEgMjUiIGZpbGw9IndoaXRlIi8+PC9zdmc+')]"></div>
      </div>

      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          {/* Brand Column */}
          <motion.div variants={itemVariants}>
            <div className="flex items-center text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 mb-6">
              <Link href="/" className="flex items-center h-16 w-auto min-w-[120px] max-w-[160px]">
                <Image
                  src="/footerlogo.png"
                  alt="Company Logo"
                  width={0}
                  height={0}
                  sizes="(max-width: 768px) 120px, 160px"
                  className="w-full h-auto object-contain object-left"
                  priority
                  style={{
                    width: '100%',
                    height: 'auto',
                  }}
                />
              </Link>
            </div>
            <motion.p 
              className="text-gray-400 mb-6 leading-relaxed"
              whileHover={{ x: 3 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              Your trusted partner in creating unforgettable travel experiences around the globe. We specialize in bespoke journeys tailored to your unique preferences.
            </motion.p>
            <div className="flex space-x-3">
              {socialMedia.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-10 h-10 ${social.color} rounded-full flex items-center justify-center shadow-md transition-all duration-300`}
                  variants={socialIconVariants}
                  whileHover="hover"
                  aria-label={social.name}
                >
                  <svg
                    className="w-5 h-5 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    {social.icon}
                  </svg>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links Column */}
          <motion.div variants={itemVariants}>
            <motion.h4 
              className="text-xl font-serif mb-6 pb-2 relative after:absolute after:bottom-0 after:left-0 after:w-12 after:h-0.5 after:bg-gradient-to-r from-blue-500 to-cyan-400"
              whileHover={{ x: 3 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              Quick Links
            </motion.h4>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <motion.li
                  key={index}
                  variants={itemVariants}
                  whileHover="hover"
                >
                  <motion.a
                    href={link.url}
                    className="text-gray-400 hover:text-white transition-colors flex items-center group"
                    variants={linkVariants}
                  >
                    <svg
                      className="w-3 h-3 text-blue-500 mr-2 group-hover:text-cyan-400 transition-colors"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {link.text}
                  </motion.a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Support Column */}
          <motion.div variants={itemVariants}>
            <motion.h4 
              className="text-xl font-serif mb-6 pb-2 relative after:absolute after:bottom-0 after:left-0 after:w-12 after:h-0.5 after:bg-gradient-to-r from-blue-500 to-cyan-400"
              whileHover={{ x: 3 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              Support
            </motion.h4>
            <ul className="space-y-3">
              {supportLinks.map((link, index) => (
                <motion.li
                  key={index}
                  variants={itemVariants}
                  whileHover="hover"
                >
                  <motion.a
                    href={link.url}
                    className="text-gray-400 hover:text-white transition-colors flex items-center group"
                    variants={linkVariants}
                  >
                    <svg
                      className="w-3 h-3 text-blue-500 mr-2 group-hover:text-cyan-400 transition-colors"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {link.text}
                  </motion.a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Newsletter Column */}
          <motion.div variants={itemVariants}>
            <motion.h4 
              className="text-xl font-serif mb-6 pb-2 relative after:absolute after:bottom-0 after:left-0 after:w-12 after:h-0.5 after:bg-gradient-to-r from-blue-500 to-cyan-400"
              whileHover={{ x: 3 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              Newsletter
            </motion.h4>
            <motion.p 
              className="text-gray-400 mb-6 leading-relaxed"
              whileHover={{ x: 3 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              Subscribe to our newsletter for exclusive deals, travel inspiration, and the latest updates.
            </motion.p>
            <form className="mb-3">
              <motion.div whileHover={{ scale: 1.01 }}>
                <input
                  type="email"
                  placeholder="Your Email Address"
                  className="w-full bg-gray-800 border border-gray-700 text-white px-4 py-3 rounded-md mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                  required
                />
              </motion.div>
              <motion.button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white py-3 px-6 rounded-md transition-all duration-300 font-medium"
                variants={newsletterButtonVariants}
                whileHover="hover"
                whileTap="tap"
              >
                Subscribe
              </motion.button>
            </form>
          </motion.div>

          {/* Contact Column */}
          <motion.div variants={itemVariants}>
            <motion.h4 
              className="text-xl font-serif mb-6 pb-2 relative after:absolute after:bottom-0 after:left-0 after:w-12 after:h-0.5 after:bg-gradient-to-r from-blue-500 to-cyan-400"
              whileHover={{ x: 3 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              Contact
            </motion.h4>
            <ul className="space-y-3 text-gray-400">
              <li>
                <strong>Phone:</strong>
                <ul className="list-disc list-inside ml-4">
                  {contactInfo.phones.map((phone, index) => (
                    <li key={index}>
                      <a href={`tel:${phone.replace(/\s+/g, '')}`} className="hover:text-white">
                        {phone}
                      </a>
                    </li>
                  ))}
                </ul>
              </li>
              <li>
                <strong>Email:</strong>
                <ul className="list-disc list-inside ml-4">
                  {contactInfo.emails.map((email, index) => (
                    <li key={index}>
                      <a href={`mailto:${email}`} className="hover:text-white">
                        {email}
                      </a>
                    </li>
                  ))}
                </ul>
              </li>
              <li>
                <strong>Website:</strong> 
                <a href={contactInfo.website} target="_blank" rel="noopener noreferrer" className="hover:text-white">
                  {contactInfo.website.replace('https://', '')}
                </a>
              </li>
            </ul>
          </motion.div>
        </div>

        <motion.div 
          className="border-t border-gray-800 pt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <div className="flex flex-col md:flex-row justify-between items-center">
            <motion.div 
              className="text-gray-500 mb-4 md:mb-0"
              whileHover={{ scale: 1.02 }}
            >
              &copy; {new Date().getFullYear()} FlyWithAshraya. All rights reserved.
            </motion.div>
            <div className="flex flex-wrap justify-center gap-4 md:gap-6">
              {["Privacy Policy", "Terms of Service", "Sitemap"].map((item, index) => (
                <motion.a
                  key={index}
                  href={`/${item.toLowerCase().replace(' ', '-')}`}
                  className="text-gray-400 hover:text-white transition-colors text-sm md:text-base"
                  whileHover={{ 
                    scale: 1.05,
                    color: "#ffffff",
                    textShadow: "0 0 5px rgba(59, 130, 246, 0.5)"
                  }}
                >
                  {item}
                </motion.a>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Floating decorative elements */}
      <motion.div 
        className="absolute bottom-20 left-10 w-3 h-3 rounded-full bg-blue-500 opacity-70"
        animate={{
          y: [0, -15, 0],
          opacity: [0.7, 1, 0.7],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div 
        className="absolute top-1/3 right-20 w-2 h-2 rounded-full bg-cyan-400 opacity-70"
        animate={{
          y: [0, -10, 0],
          opacity: [0.5, 0.9, 0.5],
        }}
        transition={{
          duration: 3.5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.5,
        }}
      />
      <motion.div 
        className="absolute bottom-1/4 left-1/4 w-4 h-4 rounded-full bg-yellow-400 opacity-50"
        animate={{
          y: [0, -20, 0],
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.3,
        }}
      />
    </motion.footer>
  );
};

export default Footer;