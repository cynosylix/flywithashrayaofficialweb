"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ChevronDown, ChevronUp, Phone, Mail, MapPin,  } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";

interface FAQItem {
  id: number;
  category: string;
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    id: 1,
    category: "Flight Booking & Payment",
    question: "How can I book a flight ticket?",
    answer: "You can book through our offices in Mundakayam, Pampady, and Kuwait, via WhatsApp, or through our upcoming Fly With Ashraya online platform. Our experienced travel consultants are available to assist you with the best flight options and deals."
  },
  {
    id: 2,
    category: "Flight Booking & Payment",
    question: "Do you offer EMI or part payment options?",
    answer: "Yes! We provide EMI plans for eligible customers. Contact our team for eligibility details and terms. We partner with leading financial institutions to offer flexible payment options that suit your budget."
  },
  {
    id: 3,
    category: "Flight Booking & Payment",
    question: "Can I reschedule or cancel my flight?",
    answer: "Yes, rescheduling and cancellations are possible based on airline policies and charges. We assist you with the process. Our team will guide you through the specific terms and help minimize any associated fees."
  },
  {
    id: 4,
    category: "Visa & Document Services",
    question: "Do you assist with visa processing?",
    answer: "Yes, we provide visit and tourist visa assistance for multiple countries, including Gulf countries. Our visa experts handle everything from documentation to submission, ensuring a smooth process."
  },
  {
    id: 5,
    category: "Visa & Document Services",
    question: "What documents require attestation?",
    answer: "We attest educational certificates, personal documents (birth, marriage), police clearance, commercial papers, and more for use abroad. Each document type has specific requirements based on the destination country."
  },
  {
    id: 6,
    category: "Visa & Document Services",
    question: "What is the attestation process and timeline?",
    answer: "The attestation process includes Notary, Home Department, MEA, Embassy, and MOFA (if applicable). It usually takes 5–15 working days depending on the document and destination. We provide regular updates throughout the process."
  },
  {
    id: 7,
    category: "Visa & Document Services",
    question: "Can I submit original documents by courier?",
    answer: "Yes, you can courier your documents to our Mundakayam, Pampady, or Kuwait offices. We provide status updates throughout the process and ensure safe handling of all documents."
  },
  {
    id: 8,
    category: "Houseboat Services",
    question: "What are the houseboat cruise timings?",
    answer: "• Day Cruise: 11:00 AM to 5:00 PM\n• Overnight Stay: Check-in at 12:00 PM, check-out next day at 9:00 AM\nWe offer flexible timing options for special occasions and group bookings."
  },
  {
    id: 9,
    category: "Houseboat Services",
    question: "What's included in the houseboat package?",
    answer: "Welcome drink, traditional Kerala lunch (veg/non-veg), cruising scenic backwaters, and for overnight stays, dinner and breakfast. All meals are prepared fresh by our onboard chefs using local ingredients."
  },
  {
    id: 10,
    category: "Houseboat Services",
    question: "Are the houseboats air-conditioned?",
    answer: "Yes, A/C is available during lunch hours for day cruises and overnight stays (usually from 9 PM to 6 AM). The A/C timing can be adjusted based on weather conditions and guest preferences."
  },
  {
    id: 11,
    category: "Houseboat Services",
    question: "How many people can be accommodated?",
    answer: "We offer houseboats ranging from 1-bedroom for couples to large 10-bedroom boats for groups. Each boat is designed to provide maximum comfort and privacy for all guests."
  },
  {
    id: 12,
    category: "Houseboat Services",
    question: "Is safety assured onboard?",
    answer: "Absolutely! All boats have life jackets, first aid kits, and trained crew. We conduct regular safety drills and maintain all safety equipment to international standards."
  },
  {
    id: 13,
    category: "Offices & Customer Support",
    question: "Where are your offices located?",
    answer: "Our offices are in Mundakayam, Pampady (Kottayam) in Kerala, and Kuwait. Each office is staffed with experienced travel consultants ready to assist you with your travel needs."
  },
  {
    id: 14,
    category: "Offices & Customer Support",
    question: "How can I contact Fly With Ashraya?",
    answer: "Call or WhatsApp: +91 9400416016 / +91 9496416016 / +965 69680820\nEmail: info@flywithashraya.com\nOur customer support team is available 24/7 to assist you."
  },
  {
    id: 15,
    category: "Offices & Customer Support",
    question: "How do I get updates on offers and packages?",
    answer: "Follow us on social media — Instagram, Facebook, WhatsApp — or check our website regularly. We also send exclusive offers to our newsletter subscribers."
  },
  {
    id: 16,
    category: "General Queries",
    question: "Do you offer group tours?",
    answer: "Yes! We organize group tours for families, associations, and corporate clients. Our group packages include special rates and customized itineraries to suit your group's preferences."
  },
  {
    id: 17,
    category: "General Queries",
    question: "Can you assist with extra baggage booking?",
    answer: "Yes, we help you add extra baggage according to airline policies. We ensure you get the best rates and avoid last-minute surprises at the airport."
  },
  {
    id: 18,
    category: "General Queries",
    question: "Is customer support available after booking?",
    answer: "Definitely. Our team supports you before, during, and after your travel. We provide 24/7 assistance for any travel-related queries or emergencies."
  }
];

const categories = ["All", "Flight Booking & Payment", "Visa & Document Services", "Houseboat Services", "Offices & Customer Support", "General Queries"];

export default function FAQPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [openItems, setOpenItems] = useState<number[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  const toggleItem = (id: number) => {
    setOpenItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  const filteredFAQs = faqData.filter(faq => {
    const matchesCategory = selectedCategory === "All" || faq.category === selectedCategory;
    const matchesSearch = searchTerm === "" || 
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
     
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
         <Header />
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl font-bold text-white mb-4"
          >
            Frequently Asked Questions
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl text-gray-200 max-w-3xl mx-auto"
          >
            Find answers to common questions about our services, booking process, and travel assistance
          </motion.p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Search and Filter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <div className="flex flex-col lg:flex-row gap-6 items-center">
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="Search questions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                      selectedCategory === category
                        ? "bg-blue-600 text-white"
                        : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* FAQ List */}
          <div className="space-y-4">
            <AnimatePresence>
              {filteredFAQs.map((faq, index) => (
                <motion.div
                  key={faq.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="bg-gray-800 rounded-lg overflow-hidden border border-gray-700"
                >
                  <button
                    onClick={() => toggleItem(faq.id)}
                    className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-700 transition-colors"
                  >
                    <div>
                      <span className="text-xs text-blue-400 font-medium mb-1 block">
                        {faq.category}
                      </span>
                      <h3 className="text-lg font-semibold text-white">
                        {faq.question}
                      </h3>
                    </div>
                    <div className="ml-4">
                      {openItems.includes(faq.id) ? (
                        <ChevronUp className="w-5 h-5 text-blue-400" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-gray-400" />
                      )}
                    </div>
                  </button>
                  
                  <AnimatePresence>
                    {openItems.includes(faq.id) && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="px-6 pb-4"
                      >
                        <div className="pt-4 border-t border-gray-700">
                          <p className="text-gray-300 leading-relaxed whitespace-pre-line">
                            {faq.answer}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {filteredFAQs.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <p className="text-gray-400 text-lg">
                No questions found matching your search. Try different keywords or browse all categories.
              </p>
            </motion.div>
          )}
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold text-white mb-4">
              Still Have Questions?
            </h2>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
              Our travel experts are ready to help you with any additional questions or special requirements.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:+919400416016"
                className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Phone className="w-5 h-5 mr-2" />
                Call Us
              </a>
              <a
                href="mailto:info@flywithashraya.com"
                className="inline-flex items-center px-6 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
              >
                <Mail className="w-5 h-5 mr-2" />
                Email Us
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Office Locations */}
      <section className="py-16 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-white mb-4">
              Our Office Locations
            </h2>
            <p className="text-gray-300">
              Visit us at any of our convenient locations
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Mundakayam Office",
                address: "Mundakayam, Kerala",
                phone: "+91 9400416016",
                icon: <MapPin className="w-6 h-6 text-blue-400" />
              },
              {
                name: "Pampady Office",
                address: "Pampady, Kottayam, Kerala",
                phone: "+91 9496416016",
                icon: <MapPin className="w-6 h-6 text-blue-400" />
              },
              {
                name: "Kuwait Office",
                address: "Kuwait City, Kuwait",
                phone: "+965 69680820",
                icon: <MapPin className="w-6 h-6 text-blue-400" />
              }
            ].map((office, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="bg-gray-800 p-6 rounded-lg text-center"
              >
                <div className="flex justify-center mb-4">
                  {office.icon}
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  {office.name}
                </h3>
                <p className="text-gray-300 mb-2">{office.address}</p>
                <a
                  href={`tel:${office.phone}`}
                  className="text-blue-400 hover:text-blue-300"
                >
                  {office.phone}
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      
       <Footer />
    </div>
  );
}
