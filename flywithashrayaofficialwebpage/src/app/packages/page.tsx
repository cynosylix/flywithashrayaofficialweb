"use client";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Star, MapPin, Clock, Users, Activity, Calendar } from "react-feather";

type Package = {
  id: number;
  title: string;
  description: string;
  price: string;
  duration: string;
  features: string[];
  image: string;
  badge?: string;
  destinations?: string[];
  groupSize?: string;
  physicalRating?: string;
  ageRequirement?: string;
  included?: string[];
  itinerary?: {
    day: number;
    title: string;
    description: string;
    activities: string[];
  }[];
  reviews?: {
    id: number;
    name: string;
    rating: number;
    date: string;
    comment: string;
    avatar: string;
  }[];
  gallery?: string[];
  specialistImage?: string;
};

const samplePackages: Package[] = [
  {
    id: 1,
    title: "Tropical Paradise Getaway",
    description: "Experience the ultimate tropical vacation with pristine beaches and luxury resorts in the Maldives and Bali. Perfect for couples and families looking for relaxation and adventure in equal measure.",
    price: "$2,499",
    duration: "7 Days / 6 Nights",
    features: ["Beachfront villa", "All-inclusive gourmet meals", "Private snorkeling adventure", "Sunset champagne cruise", "Spa credit"],
    image: "https://www.holidify.com/images/cmsuploads/compressed/maldives-666122_960_720_20180813181137.jpg",
    badge: "Most Popular",
    destinations: ["Maldives", "Bali"],
    groupSize: "Small groups up to 10",
    physicalRating: "Moderate",
    ageRequirement: "12+ recommended",
    included: ["International flights", "Luxury accommodation", "All meals & drinks", "Guided excursions", "Airport transfers"],
    itinerary: [
      { 
        day: 1, 
        title: "Arrival and Relaxation", 
        description: "Check-in to your overwater villa and enjoy the resort amenities.", 
        activities: ["Welcome cocktail", "Gourmet dinner", "Resort orientation"] 
      },
      { 
        day: 2, 
        title: "Snorkeling Adventure", 
        description: "Explore vibrant coral reefs teeming with marine life with our expert guides.", 
        activities: ["Private snorkeling tour", "Beach picnic lunch", "Sunset yoga"] 
      },
    ],
    reviews: [
      { 
        id: 1, 
        name: "Alice Johnson", 
        rating: 5, 
        date: "May 2023", 
        comment: "This was the most magical vacation we've ever taken. Every detail was perfect and the service was impeccable.", 
        avatar: "https://media.istockphoto.com/id/1318055588/photo/mid-adult-male-tourist-with-smart-phone-in-barcelona.jpg?s=612x612&w=0&k=20&c=1HhtD3_fDcvXnDskeFcX7MVqDEwrBQOtmBOem-4eqZk=" 
      },
    ],
    gallery: ["/gallery/tropical1.jpg", "/gallery/tropical2.jpg"],
    specialistImage: "/specialists/specialist1.jpg"
  },
  {
    id: 2,
    title: "European Cultural Journey",
    description: "Immerse yourself in the rich history, art, and cuisine of Europe's most iconic cities. From Parisian boulevards to Roman ruins, this tour brings history to life.",
    price: "$3,199",
    duration: "10 Days / 9 Nights",
    features: ["VIP museum access", "Local expert guides", "Gourmet dining experiences", "Wine tasting", "Private transportation"],
    image: "https://images.unsplash.com/photo-1493707553966-283afac8c358?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    badge: "New Experience",
    destinations: ["Paris", "Rome", "Barcelona"],
    groupSize: "Intimate groups up to 15",
    physicalRating: "Easy",
    ageRequirement: "All ages welcome",
    included: ["Boutique hotels", "Daily breakfast", "All guided tours", "City passes", "High-speed train transfers"],
    itinerary: [
      { 
        day: 1, 
        title: "Parisian Elegance", 
        description: "Discover the City of Light through its iconic landmarks and hidden gems.", 
        activities: ["Eiffel Tower summit access", "Louvre highlights tour", "Seine River cruise"] 
      },
      { 
        day: 2, 
        title: "Roman Grandeur", 
        description: "Walk in the footsteps of emperors through ancient ruins and vibrant piazzas.", 
        activities: ["Colosseum underground tour", "Roman Forum exploration", "Trastevere food tour"] 
      },
    ],
    reviews: [
      { 
        id: 2, 
        name: "Robert Chen", 
        rating: 4.5, 
        date: "June 2023", 
        comment: "The depth of knowledge from our guides made this trip extraordinary. We saw places most tourists never discover.", 
        avatar: "/avatars/bob.jpg" 
      },
    ],
    gallery: ["/gallery/europe1.jpg", "/gallery/europe2.jpg"],
    specialistImage: "/specialists/specialist2.jpg"
  }
];

const PackageCard = ({ packageData }: { packageData: Package }) => {
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedImage, setSelectedImage] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const { scrollYProgress } = useScroll({
    target: isMounted ? containerRef : undefined,
    offset: ["start start", "end start"]
  }) ?? { scrollYProgress: 0 };
  
  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);

  if (!packageData) {
    return <div className="text-center py-20">Loading package details...</div>;
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white mb-16 rounded-xl shadow-xl overflow-hidden border border-gray-100"
      ref={containerRef}
    >
      {/* Hero Image with Parallax */}
      <div className="relative h-96 overflow-hidden">
        {isMounted && (
          <motion.div className="absolute inset-0" style={{ y }}>
            <Image
              src={packageData.image}
              alt={packageData.title}
              fill
              className="object-cover"
              priority
              quality={90}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
          </motion.div>
        )}
        
        {/* Badge */}
        {packageData.badge && (
          <div className="absolute top-6 right-6 bg-gradient-to-r from-amber-500 to-amber-600 text-white px-4 py-2 rounded-full shadow-lg font-medium text-sm">
            {packageData.badge}
          </div>
        )}
        
        {/* Title Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <h2 className="text-4xl font-serif font-bold text-white mb-2">{packageData.title}</h2>
          <div className="flex items-center space-x-4 text-white/90">
            <div className="flex items-center">
              <MapPin className="w-4 h-4 mr-1" />
              <span className="text-sm">{packageData.destinations?.join(" • ")}</span>
            </div>
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-1" />
              <span className="text-sm">{packageData.duration}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-8">
        {/* Price Ribbon */}
        <div className="mb-6">
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white px-6 py-3 rounded-lg inline-flex items-center">
            <span className="text-2xl font-bold mr-2">{packageData.price}</span>
            <span className="text-sm opacity-90">per person</span>
          </div>
        </div>

        {/* Description */}
        <p className="text-lg text-gray-700 mb-8 leading-relaxed">{packageData.description}</p>

        {/* Key Features */}
        <div className="mb-8">
          <h3 className="text-xl font-serif font-semibold text-gray-900 mb-4">Experience Highlights</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {packageData.features.map((feature, index) => (
              <div key={index} className="flex items-start">
                <div className="bg-blue-100 p-2 rounded-full mr-3 flex-shrink-0">
                  <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-gray-700">{feature}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Details Grid */}
        <div className="bg-gray-50 rounded-xl p-6 mb-8">
          <h3 className="text-xl font-serif font-semibold text-gray-900 mb-4">Tour Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="flex items-center">
              <div className="bg-blue-100 p-3 rounded-full mr-4">
                <Users className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-500">Group Size</h4>
                <p className="text-gray-900 font-medium">{packageData.groupSize}</p>
              </div>
            </div>
            <div className="flex items-center">
              <div className="bg-blue-100 p-3 rounded-full mr-4">
                <Activity className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-500">Physical Rating</h4>
                <p className="text-gray-900 font-medium">{packageData.physicalRating}</p>
              </div>
            </div>
            <div className="flex items-center">
              <div className="bg-blue-100 p-3 rounded-full mr-4">
                <Calendar className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-500">Age Requirement</h4>
                <p className="text-gray-900 font-medium">{packageData.ageRequirement}</p>
              </div>
            </div>
            <div className="flex items-center">
              <div className="bg-blue-100 p-3 rounded-full mr-4">
                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-500">Included</h4>
                <p className="text-gray-900 font-medium">{packageData.included?.length} major inclusions</p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row justify-between items-center bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-6">
          <div className="mb-4 sm:mb-0">
            <h3 className="text-xl font-serif font-semibold text-gray-900">Ready for Adventure?</h3>
            <p className="text-gray-700">Limited spaces available for this exclusive experience</p>
          </div>
          <button className="bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white px-8 py-3 rounded-lg font-medium shadow-md hover:shadow-lg transition-all duration-300">
            Book Now
          </button>
        </div>
      </div>
    </motion.div>
  );
};

const PackagesPage = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 mt-10">
        {/* Page Header */}
        <div className="text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-4"
          >
            Curated Travel Experiences
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-xl text-gray-600 max-w-3xl mx-auto"
          >
            Discover our handcrafted journeys designed to immerse you in the world's most extraordinary destinations.
          </motion.p>
        </div>
        
        {/* Packages Grid */}
        <div className="space-y-16">
          {samplePackages.map(pkg => (
            <PackageCard key={pkg.id} packageData={pkg} />
          ))}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default PackagesPage;