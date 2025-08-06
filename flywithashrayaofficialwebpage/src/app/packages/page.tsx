"use client";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle, Users, Heart, Home, Globe, Star, Shield } from "react-feather";
import Header from "../components/Header";
import Footer from "../components/Footer";

const packages = [
  {
    id: 1,
    title: "Pilgrimage Packages",
    icon: <Globe className="w-5 h-5" />,
    description: "Sacred journeys meticulously crafted for spiritual enlightenment and cultural immersion.",
    highlights: [
      "Expert-led theological interpretations",
      "VIP access to restricted holy sites",
      "Customizable devotional schedules",
      "On-site ritual coordination",
      "Multilingual spiritual guides"
    ],
    features: [
      { icon: <Shield className="w-4 h-4" />, text: "Sacred site security protocols" },
      { icon: <Star className="w-4 h-4" />, text: "Premium pilgrimage accreditation" },
      { icon: <Users className="w-4 h-4" />, text: "Small group exclusivity" }
    ],
    cta: "Request Spiritual Itinerary"
  },
  {
    id: 2,
    title: "Luxury Honeymoons",
    icon: <Heart className="w-5 h-5" />,
    description: "Bespoke romantic escapes designed for discerning couples seeking unparalleled intimacy.",
    highlights: [
      "Private charter flight options",
      "Michelin-starred dining experiences",
      "Personalized butler service",
      "Ultra-luxury accommodation curation",
      "Discreet celebrity-style privacy"
    ],
    features: [
      { icon: <Star className="w-4 h-4" />, text: "Forbes Travel Guide standards" },
      { icon: <Shield className="w-4 h-4" />, text: "Discretion guarantee" },
      { icon: <Users className="w-4 h-4" />, text: "Dedicated romance concierge" }
    ],
    cta: "Begin Your Love Story"
  },
  {
    id: 3,
    title: "Family Expeditions",
    icon: <Home className="w-5 h-5" />,
    description: "Multigenerational travel programs blending education, adventure, and bonding.",
    highlights: [
      "Certified child development specialists",
      "Elder-accessible luxury vehicles",
      "Educational activity certification",
      "24/7 family support hotline",
      "Custom nutritional planning"
    ],
    features: [
      { icon: <Shield className="w-4 h-4" />, text: "Child safety certified" },
      { icon: <Star className="w-4 h-4" />, text: "Learning accredited" },
      { icon: <Users className="w-4 h-4" />, text: "Multilingual nanny services" }
    ],
    cta: "Plan Family Legacy Travel"
  }
];

interface PremiumFeatureProps {
  icon: React.ReactNode;
  text: string;
}

const PremiumFeature = ({ icon, text }: PremiumFeatureProps) => (
  <div className="flex items-center space-x-2 bg-gray-50 px-3 py-2 rounded-lg">
    <div className="text-blue-600">{icon}</div>
    <span className="text-sm font-medium text-gray-700">{text}</span>
  </div>
);

interface PackageCardProps {
  pkg: {
    id: number;
    title: string;
    icon: React.ReactNode;
    description: string;
    highlights: string[];
    features: Array<{
      icon: React.ReactNode;
      text: string;
    }>;
    cta: string;
  };
}

const PackageCard = ({ pkg }: PackageCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4 }}
    className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_12px_40px_rgb(0,0,0,0.08)] transition-all duration-300"
  >
    <div className="p-8">
      <div className="flex items-start justify-between mb-6">
        <div>
          <div className="flex items-center mb-2">
            <div className="bg-blue-50 p-2.5 rounded-lg text-blue-600 mr-3">
              {pkg.icon}
            </div>
            <h3 className="text-2xl font-semibold text-gray-900">{pkg.title}</h3>
          </div>
          <p className="text-gray-600 pl-12">{pkg.description}</p>
        </div>
      </div>
      
      <div className="border-t border-gray-100 pt-6 mb-6">
        <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">CURATED EXPERIENCES</h4>
        <ul className="space-y-3 mb-6">
          {pkg.highlights.map((item, i) => (
            <li key={i} className="flex items-start">
              <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
              <span className="text-gray-700">{item}</span>
            </li>
          ))}
        </ul>
      </div>
      
      <div className="mb-8">
        <div className="flex flex-wrap gap-2">
          {pkg.features.map((feature, i) => (
            <PremiumFeature key={i} icon={feature.icon} text={feature.text} />
          ))}
        </div>
      </div>
      
      <button className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-4 rounded-xl font-medium group transition-all duration-300 shadow-[0_4px_15px_rgba(59,130,246,0.3)] hover:shadow-[0_6px_20px_rgba(59,130,246,0.4)]">
        <span>{pkg.cta}</span>
        <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
      </button>
    </div>
  </motion.div>
);

const PackagesPage = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-20">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center px-4 py-2 bg-blue-50 rounded-full mb-4"
          >
            <span className="text-sm font-medium text-blue-600">WORLD-CLASS TRAVEL SOLUTIONS</span>
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight"
          >
            Exceptional Travel <span className="text-blue-600">Experiences</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl text-gray-600 max-w-3xl mx-auto"
          >
            Meticulously crafted journeys delivering unmatched service excellence and memorable moments
          </motion.p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {packages.map((pkg) => (
            <PackageCard key={pkg.id} pkg={pkg} />
          ))}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default PackagesPage;