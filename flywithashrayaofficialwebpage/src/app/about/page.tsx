"use client";
import Header from '../components/Header';
import Footer from '../components/Footer';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { FiGlobe, FiHeart, FiShield, FiAward, FiMapPin, FiTarget, FiEye, FiBriefcase, FiLinkedin, FiMail } from 'react-icons/fi';

const AboutSection = () => {
  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const staggerContainer = {
    visible: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  // Team members data
  const teamMembers = [
    {
      id: 1,
      name: "Nikhil Chamakalayil",
      role: "Managing Director",
      image: "/team/Nikhil-Chamakalayil.png"
    },
    {
      id: 2,
      name: "Sreelekha  Sajeev",
      role: "Head of operations & Accounts",
      image: "/team/Sreelekha-Sajeev.png"
    },
    {
      id: 3,
      name: "Saranya VS",
      role: "Customer Relationship Manager",
      image: "/team/Saranyamol.png"
    },
    {
      id: 4,
      name: "Karolin Thomas",
      role: "Travel COnsultant Visa",
      image: "/team/Karolin-Thomas.png"
    },
    
    {
      id: 6,
      name: "Sajini Abhilash",
      role: "Jr. Travel Consultant",
      image: "/team/Sajini-Abhilash.png"
    },
  ];

  // B2B Suppliers Data
  const b2bSuppliers = [
    {
      id: 1,
      name: "Agent Box",
      logo: "/B2B-Images/agentbox.png",
      services: ["Airline Tickets", "Group Bookings", "Last-minute Deals"],
      coverage: "100+ Airlines"
    },
    {
      id: 2,
      name: "EasyMyTrip",
      logo: "/B2B-Images/easymytrip.png",
      services: ["5-Star Hotels", "Resorts", "Villas"],
      coverage: "50+ Countries"
    },
    {
      id: 3,
      name: "Akbar Travels",
      logo: "/B2B-Images/akbartravels.jpeg",
      services: ["Flight Bookings", "Holiday Packages", "Visa Assistance"],
      coverage: "India & Middle East"
    },
    {
      id: 4,
      name: "Air IQ",
      logo: "/B2B-Images/airIQ.webp",
      services: ["Flight Data", "Analytics", "Travel Insights"],
      coverage: "Global"
    },
    {
      id: 5,
      name: "Al Hind",
      logo: "/B2B-Images/alhind.avif",
      services: ["Travel Insurance", "Visa Services", "Customer Support"],
      coverage: "Worldwide"
    },
    {
      id: 6,
      name: "Fly Creative",
      logo: "/B2B-Images/flycreative.png",
      services: ["Marketing", "Travel Campaigns", "Branding"],
      coverage: "Global"
    },
    {
      id: 7,
      name: "Trip Jack",
      logo: "/B2B-Images/logotripjack.png",
      services: ["Custom Packages", "Group Tours", "Event Travel"],
      coverage: "Worldwide"
    },
    {
      id: 8,
      name: "Make My Trip",
      logo: "/B2B-Images/makemytrip.svg",
      services: ["Flight Bookings", "Hotel Reservations", "Holiday Packages"],
      coverage: "India & International"
    },
    {
      id: 9,
      name: "Yatra",
      logo: "/B2B-Images/yatra.png",
      services: ["Flight Bookings", "Bus Tickets", "Hotel Bookings"],
      coverage: "India & Abroad"
    }
  ];

  return (
    <div className="overflow-hidden">
      <Header />

      {/* Hero Section */}
      <section className="relative py-28 bg-gradient-to-br from-blue-50 to-white">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-blue-100 to-transparent z-0"></div>
          <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-blue-50 rounded-full filter blur-3xl opacity-50"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <motion.div
              className="lg:w-1/2"
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
            >
              <motion.div variants={fadeInUp} className="mb-2">
                <span className="inline-block px-3 py-1 text-sm font-medium text-blue-600 bg-blue-100 rounded-full">
                  Since 2021
                </span>
              </motion.div>

              <motion.h1
                variants={fadeInUp}
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight"
              >
                Crafting <span className="text-blue-600">Exceptional</span> Travel Experiences
              </motion.h1>

              <motion.p
                variants={fadeInUp}
                className="text-lg md:text-xl text-gray-600 mb-8 leading-relaxed"
              >
                At Fly With Ashraya, we combine digital innovation with travel expertise to deliver
                seamless journeys that exceed expectations. Our customer-first approach ensures
                every trip is memorable and hassle-free.
              </motion.p>

              <motion.div variants={fadeInUp} className="flex items-center gap-4">
                <div className="flex -space-x-2">
                  {teamMembers.slice(0, 4).map((member) => (
                    <Image
                      key={member.id}
                      src={member.image}
                      alt={member.name}
                      width={40}
                      height={40}
                      className="rounded-full border-2 border-white object-cover"
                    />
                  ))}
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Trusted by thousands of travelers</p>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <FiAward key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                </div>
              </motion.div>
            </motion.div>

            <motion.div
              className="lg:w-1/2 relative"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="relative h-[500px] w-full rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1503220317375-aaad61436b1b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                  alt="Travel experience"
                  fill
                  className="object-cover rounded-xl"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/50 to-transparent"></div>
              </div>

              <motion.div
                className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-lg w-64"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <div className="flex items-center gap-3 mb-2">
                  <FiMapPin className="w-5 h-5 text-blue-600" />
                  <h4 className="font-semibold text-gray-900">Global Coverage</h4>
                </div>
                <p className="text-sm text-gray-600">India | Kuwait | Worldwide</p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Who We Are Section */}
      <section className="py-28 bg-white">
        <div className="container mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="max-w-5xl mx-auto"
          >
            <motion.div variants={fadeInUp} className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Who We Are
              </h2>
              <div className="w-20 h-1 bg-blue-600 mx-auto"></div>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              className="grid md:grid-cols-2 gap-12 items-center mb-16"
            >
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                  Our Journey
                </h3>
                <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                  Our journey began on August 16, 2021, with the establishment of Ashraya Digital Seva,
                  a common service center (CSC) dedicated to providing essential digital and government-related
                  services. The center was officially inaugurated by Poonjar MLA Sebastian Kulathunkal, marking
                  the start of our commitment to customer service and reliability.
                </p>
                <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                  As we earned the trust of our community, we recognized a growing demand for travel services,
                  leading us to expand our focus. This inspired the creation of Fly With Ashraya, a travel
                  consultancy committed to providing affordable and seamless travel experiences.
                </p>
                <p className="text-lg text-gray-600 leading-relaxed">
                  In 2022, we opened a second branch in Pampady, Kottayam, expanding our reach. Today, Fly With
                  Ashraya operates in both India and Kuwait, offering a wide range of travel solutions. We are
                  proud to be ISO 9001:2015 certified, demonstrating our commitment to quality management.
                </p>
              </div>
              <div className="relative h-80 rounded-xl overflow-hidden shadow-lg">
                <Image
                  src="/MundakayamBranch/3.jpg"
                  alt="Our journey"
                  fill
                  className="object-cover rounded-xl"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/30 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-6">
                  {/* <p className="text-white font-medium">Our first center inauguration</p> */}
                </div>
              </div>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              className="bg-blue-50 rounded-2xl p-8 md:p-12 relative overflow-hidden"
            >
              <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-blue-100 opacity-30"></div>
              <div className="relative z-10 grid md:grid-cols-3 gap-8">
                {[
                  { value: "2", label: "Branches" },
                  { value: "ISO 9001:2015", label: "Certified" },
                  { value: "100+", label: "Destinations" }
                ].map((stat, index) => (
                  <div key={index} className="text-center">
                    <p className="text-4xl font-bold text-blue-600 mb-2">{stat.value}</p>
                    <p className="text-gray-600">{stat.label}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-28 bg-gray-50">
        <div className="container mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="max-w-6xl mx-auto"
          >
            <motion.div variants={fadeInUp} className="text-center mb-20">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Our Core Values
              </h2>
              <div className="w-20 h-1 bg-blue-600 mx-auto"></div>
            </motion.div>

            <motion.div
              variants={staggerContainer}
              className="grid md:grid-cols-2 gap-12"
            >
              <motion.div
                variants={fadeInUp}
                className="bg-white p-8 rounded-2xl shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 rounded-full bg-blue-50 flex items-center justify-center">
                    <FiTarget className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">Our Mission</h3>
                </div>
                <p className="text-gray-600 leading-relaxed">
                  At Fly With Ashraya, our mission is to provide personalized, affordable, and seamless travel
                  experiences to every customer. We are committed to delivering exceptional air ticketing, visa
                  services, holiday packages, and travel solutions with trust, transparency, and customer
                  satisfaction at the core. Through innovative technology, dedicated support, and strong B2B
                  partnerships, we aim to simplify travel for individuals and families across India, Kuwait,
                  and beyond.
                </p>
              </motion.div>

              <motion.div
                variants={fadeInUp}
                className="bg-white p-8 rounded-2xl shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 rounded-full bg-indigo-50 flex items-center justify-center">
                    <FiEye className="w-6 h-6 text-indigo-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">Our Vision</h3>
                </div>
                <p className="text-gray-600 leading-relaxed">
                  Our vision is to become a leading name in the global travel industry by redefining convenience
                  and excellence in travel services. Fly With Ashraya aspires to be the most reliable and
                  customer-centric travel partner, connecting people to over 100 destinations with care, comfort,
                  and confidence — making every journey truly unforgettable.
                </p>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Certificates Section - Simple Version */}
      <section className="mt-20 max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        <h3 className="text-2xl font-semibold mb-8 text-gray-900">Our Certificates</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {[
            { name: "GST Registration Certificate", file: "/GST REGISTRATION CERTIFICATE.pdf" },
            { name: "IRCTC Certificate", file: "/IRCTC CERTIFICATE.pdf" },
            { name: "Udyam Registration Certificate", file: "/Udyam Registration Certificate UPDATED.pdf" },
            { name: "Shop and Establishment Certificate", file: "/PAMPADY_PANCHAYATH_LICENCE_2025-2026.pdf" },
            { name: "Task Membership Certificate ", file: "/TASK_CERTIFICATE_2025-2026.jpg" },
            
          ].map((cert, index) => (
            <a
              key={index}
href={cert.file}
                            target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center p-4 border border-gray-200 rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300"
            >
              <div className="w-16 h-16 mb-4 text-blue-600">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <span className="text-center text-sm font-medium text-gray-700">{cert.name}</span>
            </a>
          ))}
        </div>
      </section>
      {/* B2B Suppliers Section */}
      <section className="py-28 bg-white">
        <div className="container mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center mb-20"
          >
            <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our B2B Travel Products Suppliers
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-xl text-gray-600 max-w-3xl mx-auto">
              Trusted partnerships that power our exceptional travel solutions
            </motion.p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto"
          >
            {b2bSuppliers.map((supplier) => (
              <motion.div
                key={supplier.id}
                variants={fadeInUp}
                whileHover={{ y: -5 }}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 border border-gray-100"
              >
                <div className="p-6">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 rounded-lg bg-gray-100 flex items-center justify-center p-2">
                      <Image
                        src={supplier.logo}
                        alt={supplier.name}
                        width={64}
                        height={64}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">{supplier.name}</h3>
                  </div>

                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-gray-500 mb-2">SERVICES</h4>
                    <ul className="space-y-1">
                      {supplier.services.map((service, i) => (
                        <li key={i} className="flex items-center gap-2 text-gray-600">
                          <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                          {service}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <FiGlobe className="w-4 h-4 text-blue-500" />
                    <span>{supplier.coverage}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* <motion.div
            variants={fadeInUp}
            className="mt-16 bg-blue-50 rounded-2xl p-8 md:p-12 relative overflow-hidden"
          >
            <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-blue-100 opacity-30"></div>
            <div className="relative z-10">
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                  <FiBriefcase className="w-8 h-8 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Become a Partner</h3>
                  <p className="text-gray-600">
                    We&apos;re always looking to expand our network of trusted suppliers. If you provide
                    exceptional travel products or services, let&apos;s discuss partnership opportunities.
                  </p>
                </div>
              </div>
            </div>
          </motion.div> */}
        </div>
      </section>

      {/* Our Approach Section */}
      <section className="py-28 bg-white">
        <div className="container mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center mb-20"
          >
            <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Methodology
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-xl text-gray-600 max-w-3xl mx-auto">
              A three-dimensional framework ensuring unparalleled travel experiences
            </motion.p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto"
          >
            {[
              {
                title: "Discovery",
                description: "Our comprehensive consultation process uncovers your unique travel needs - preferences, budget, and aspirations.",
                icon: <FiHeart className="w-8 h-8 text-blue-600" />,
                bg: "bg-pink-50"
              },
              {
                title: "Curation",
                description: "Leveraging our global network to design itineraries that exceed expectations while staying within budget.",
                icon: <FiGlobe className="w-8 h-8 text-blue-600" />,
                bg: "bg-blue-50"
              },
              {
                title: "Execution",
                description: "Seamless coordination with 24/7 support, ensuring every detail is perfected throughout your journey.",
                icon: <FiShield className="w-8 h-8 text-blue-600" />,
                bg: "bg-indigo-50"
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                whileHover={{ y: -10 }}
                className={`${item.bg} p-8 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300`}
              >
                <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center shadow-sm mb-6">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

     {/* Team Section */}
<section className="py-28 bg-white">
  <div className="container mx-auto px-6">
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={staggerContainer}
      className="text-center mb-16"
    >
      <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
        Our Travel Experts
      </motion.h2>
      <motion.p variants={fadeInUp} className="text-xl text-gray-600 max-w-3xl mx-auto">
        The passionate professionals who make your journeys unforgettable
      </motion.p>
    </motion.div>

    <motion.div
      variants={staggerContainer}
      className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 max-w-7xl mx-auto"
    >
      {teamMembers.map((member) => (
        <motion.div
          key={member.id}
          variants={fadeInUp}
          whileHover={{ y: -10 }}
          className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500"
        >
          <div className="relative h-72 w-full">
            <Image
              src={member.image}
              alt={member.name}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/70 via-gray-900/30 to-transparent" />
          </div>
          
          <div className="absolute bottom-0 left-0 w-full p-6 text-white transition-all duration-500 transform translate-y-0 group-hover:translate-y-[-10px]">
            <div className="mb-2">
              <h3 className="text-xl font-bold">{member.name}</h3>
              <p className="text-blue-200">{member.role}</p>
            </div>
            
            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="flex space-x-2">
                <a href="#" className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors">
                  <FiLinkedin className="w-4 h-4" />
                </a>
                <a href="#" className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors">
                  <FiMail className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
          
          {/* Decorative element */}
          <div className="absolute top-4 right-4 w-12 h-12 rounded-full bg-blue-600/20 backdrop-blur-sm flex items-center justify-center">
            <FiAward className="w-5 h-5 text-white" />
          </div>
        </motion.div>
      ))}
    </motion.div>

    {/* Team Stats */}
    <motion.div 
      variants={fadeInUp}
      className="mt-20 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-8 md:p-12 relative overflow-hidden"
    >
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full filter blur-3xl"></div>
      </div>
      <div className="relative z-10 grid md:grid-cols-4 gap-8 text-center text-white">
        <div>
          <p className="text-4xl font-bold mb-2">6+</p>
          <p className="text-blue-100">Travel Experts</p>
        </div>
        <div>
          <p className="text-4xl font-bold mb-2">100+</p>
          <p className="text-blue-100">Years Combined Experience</p>
        </div>
        <div>
          <p className="text-4xl font-bold mb-2">24/7</p>
          <p className="text-blue-100">Customer Support</p>
        </div>
        <div>
          <p className="text-4xl font-bold mb-2">50+</p>
          <p className="text-blue-100">Countries Covered</p>
        </div>
      </div>
    </motion.div>
  </div>
</section>





      {/* Philosophy Section */}
      <section className="py-28 bg-gray-50">
        <div className="container mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="max-w-5xl mx-auto text-center"
          >
            <motion.div variants={fadeInUp} className="mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Our Travel Philosophy
              </h2>
              <div className="w-20 h-1 bg-blue-600 mx-auto"></div>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              className="bg-white rounded-3xl p-12 relative overflow-hidden shadow-md"
            >
              <div className="absolute -top-20 -left-20 w-64 h-64 rounded-full bg-blue-100 opacity-20"></div>
              <div className="absolute -bottom-20 -right-20 w-64 h-64 rounded-full bg-indigo-100 opacity-20"></div>

              <div className="relative z-10">
                <blockquote className="text-2xl md:text-3xl font-medium text-gray-900 mb-8 leading-relaxed">
                  &quot;We believe travel at its finest is both an art and a science - a harmonious
                  blend of meticulous planning and serendipitous discovery that transforms
                  perspectives and enriches lives.&quot;
                </blockquote>
                <div className="flex items-center justify-center gap-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden">
                    <Image
                      src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80"
                      alt="Team member"
                      width={48}
                      height={48}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">The Fly With Ashraya Team</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AboutSection;