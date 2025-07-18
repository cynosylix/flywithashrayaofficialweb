/**
 * Header component - Renders the navigation header of the application.
 * It includes navigation links and handles scroll state for styling.
 */

"use client"
import Link from 'next/link';
import { useState, useEffect } from 'react';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed w-full z-50 transition-all duration-500 ${scrolled ? 'py-3 bg-white bg-opacity-90 shadow-lg' : 'py-4 bg-white bg-opacity-90'}`}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="flex items-center text-2xl font-bold text-blue-400">
            <div className="w-10 h-10 bg-blue-400 rounded-full flex items-center justify-center mr-3 transition-all duration-300 hover:bg-yellow-400 hover:rotate-12">
              <svg className="w-5 h-5 text-gray-900" fill="currentColor" viewBox="0 0 20 20">
                <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd" />
              </svg>
            </div>
            FlyWithAshraya
          </Link>

          <div className="hidden md:flex space-x-8">
            <Link href="#home" className="text-gray-900 hover:text-blue-400 transition-colors relative py-2">
              Home
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-400"></span>
            </Link>
            <Link href="/about" className="text-gray-900 hover:text-blue-400 transition-colors relative py-2">
              About
            </Link>
            <Link href="#destinations" className="text-gray-900 hover:text-blue-400 transition-colors relative py-2">
              Destinations
            </Link>
            <Link href="#packages" className="text-gray-900 hover:text-blue-400 transition-colors relative py-2">
              Packages
            </Link>
            <Link href="#specials" className="text-gray-900 hover:text-blue-400 transition-colors relative py-2">
              Special Fares
            </Link>
            <Link href="#testimonials" className="text-gray-900 hover:text-blue-400 transition-colors relative py-2">
              Reviews
            </Link>
            <Link href="#contact" className="text-gray-900 hover:text-blue-400 transition-colors relative py-2">
              Contact
            </Link>
          </div>

          <button className="md:hidden text-gray-900 focus:outline-none">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Header;
