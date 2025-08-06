// Service data and type definitions for the services page

export interface Service {
  slug: string;
  name: string;
  icon: string;
  description: string;
  detailedDescription?: string;
  features?: string[];
  process?: string[];
}

export interface ServiceCategory {
  category: string;
  items: Service[];
}

export const services: ServiceCategory[] = [
  {
    category: "Travel Services",
    items: [
      {
        slug: "flight-booking",
        name: "Flight Booking",
        icon: "✈️",
        description: "Book domestic and international flights with best prices and flexible options.",
        detailedDescription: "We provide comprehensive flight booking services for both domestic and international destinations. Our partnerships with major airlines ensure you get the best deals and flexible booking options.",
        features: [
          "Best price guarantee",
          "Flexible booking options",
          "24/7 customer support",
          "Easy cancellation and modification"
        ],
        process: [
          "Search flights",
          "Compare prices",
          "Select preferred option",
          "Complete booking",
          "Receive confirmation"
        ]
      },
      {
        slug: "air-ticketing",
        name: "Air Ticketing & Flight Bookings",
        icon: "✈️",
        description: "Comprehensive flight booking services for all your travel needs.",
        detailedDescription: "End-to-end flight booking services with competitive prices and flexible options for both domestic and international travel."
      },
      {
        slug: "holiday-packages",
        name: "Customized Holiday Packages",
        icon: "🌴",
        description: "Tailor-made holiday packages to suit your preferences and budget.",
        detailedDescription: "Create your dream vacation with our customized holiday packages that include flights, accommodation, and activities based on your preferences."
      },
      {
        slug: "group-tours",
        name: "Group Tours & Corporate Travel",
        icon: "👥",
        description: "Organized group tours and corporate travel solutions.",
        detailedDescription: "Specialized services for group travel including corporate retreats, educational tours, and family reunions with customized itineraries."
      },
      {
        slug: "vehicle-rentals",
        name: "Taxi & Vehicle Rentals",
        icon: "🚗",
        description: "Reliable vehicle rental services for your travel needs.",
        detailedDescription: "Convenient taxi and vehicle rental options with professional drivers for local and outstation travel."
      },
      {
        slug: "houseboats-resorts",
        name: "Houseboats & Resort Bookings",
        icon: "⛵",
        description: "Exclusive bookings for houseboats and luxury resorts.",
        detailedDescription: "Special arrangements for houseboat stays and premium resort bookings at popular tourist destinations."
      },
      {
        slug: "hotel-booking",
        name: "Hotel Booking",
        icon: "🏨",
        description: "Find and book hotels worldwide with exclusive deals and verified reviews.",
        detailedDescription: "Access thousands of hotels worldwide with exclusive deals and verified guest reviews. From budget stays to luxury resorts, we have options for every traveler.",
        features: [
          "Wide selection of hotels",
          "Best price guarantee",
          "Verified reviews",
          "Instant confirmation"
        ],
        process: [
          "Search destination",
          "Filter preferences",
          "Compare options",
          "Book and confirm",
          "Receive voucher"
        ]
      },
      {
        slug: "airport-lounge",
        name: "Airport Lounge Access & VIP Services",
        icon: "💎",
        description: "Premium airport experiences and VIP treatment.",
        detailedDescription: "Enhance your travel experience with airport lounge access, fast-track security, and personalized VIP services."
      },
      {
        slug: "visa-assistance",
        name: "Visa Assistance",
        icon: "🛂",
        description: "Complete visa application support with documentation guidance and submission.",
        detailedDescription: "Expert visa assistance for all major destinations. We guide you through the entire process, from documentation to submission and tracking.",
        features: [
          "Expert guidance",
          "Document checklist",
          "Application review",
          "Status tracking"
        ],
        process: [
          "Consultation",
          "Document preparation",
          "Application submission",
          "Follow-up",
          "Visa delivery"
        ]
      },
      {
        slug: "visa-guidance",
        name: "Travel Visa Guidance & Documentation",
        icon: "📝",
        description: "Expert assistance for all your visa requirements.",
        detailedDescription: "Comprehensive visa services including application support, documentation guidance, and status tracking."
      },
      {
        slug: "flight-changes",
        name: "Flight Rescheduling & Cancellation Support",
        icon: "🔄",
        description: "Assistance with flight modifications and cancellations.",
        detailedDescription: "Expert support for flight changes, cancellations, and refund processing with minimal hassle."
      }
    ]
  },
  {
    category: "Documentation Services",
    items: [
      {
        slug: "passport-services",
        name: "Passport Services",
        icon: "📋",
        description: "New passport application, renewal, and lost passport replacement services.",
        detailedDescription: "Complete passport services including new applications, renewals, and lost passport replacements. We handle all paperwork and appointments.",
        features: [
          "New passport application",
          "Passport renewal",
          "Lost passport replacement",
          "Tatkal services"
        ],
        process: [
          "Document verification",
          "Form filling",
          "Appointment booking",
          "Submission",
          "Delivery"
        ]
      },
      {
        slug: "pan-card-services",
        name: "PAN Card Services",
        icon: "💳",
        description: "New PAN card application, correction, and duplicate PAN card services.",
        detailedDescription: "Complete PAN card services including new applications, corrections, and duplicate card issuance. Fast processing with expert guidance.",
        features: [
          "New PAN application",
          "PAN correction",
          "Duplicate PAN",
          "E-PAN facility"
        ],
        process: [
          "Document collection",
          "Form submission",
          "Processing",
          "PAN generation",
          "Card delivery"
        ]
      },
      {
        slug: "gst-registration",
        name: "GST Registration",
        icon: "📊",
        description: "GST registration and compliance services for businesses and individuals.",
        detailedDescription: "Professional GST registration services for businesses and individuals. Complete compliance support and ongoing assistance.",
        features: [
          "GST registration",
          "Return filing",
          "Compliance support",
          "Consultation"
        ],
        process: [
          "Business verification",
          "Document preparation",
          "Application submission",
          "GSTIN generation",
          "Certificate delivery"
        ]
      },
      {
        slug: "visa-processing",
        name: "Visa Processing & Assistance",
        icon: "🛂",
        description: "End-to-end visa processing for various countries.",
        detailedDescription: "Professional visa application services including document preparation, form filling, and application submission."
      },
      {
        slug: "attestation",
        name: "Attestation & Legal Documentation",
        icon: "🏛️",
        description: "Document attestation and legalization services.",
        detailedDescription: "Official attestation of documents for international use including embassy legalization and apostille services."
      },
      {
        slug: "passport-id",
        name: "Passport & ID Services",
        icon: "📋",
        description: "Complete passport and identity document services.",
        detailedDescription: "Assistance with passport applications, renewals, and other identity document services."
      },
      {
        slug: "educational-attestation",
        name: "Educational Certificates Attestation",
        icon: "🎓",
        description: "Attestation of academic documents for international use.",
        detailedDescription: "Official attestation of degrees, diplomas, and academic transcripts for overseas education and employment."
      },
      {
        slug: "employment-attestation",
        name: "Employment Document Attestation",
        icon: "💼",
        description: "Authentication of employment-related documents.",
        detailedDescription: "Attestation of experience certificates, employment contracts, and other work-related documents."
      },
      {
        slug: "civil-attestation",
        name: "Birth & Marriage Certificate Attestation",
        icon: "👪",
        description: "Legalization of personal civil documents.",
        detailedDescription: "Official attestation of birth certificates, marriage certificates, and other personal documents."
      },
      {
        slug: "translation",
        name: "Document Translation Services",
        icon: "🌐",
        description: "Professional translation of official documents.",
        detailedDescription: "Certified translation services for various documents in multiple languages."
      },
      {
        slug: "pcc",
        name: "Police Clearance Certificates (PCC) Assistance",
        icon: "👮",
        description: "Help with obtaining police clearance certificates.",
        detailedDescription: "Guidance and support for obtaining police clearance certificates from various authorities."
      }
    ]
  },
  {
    category: "Travel Insurance",
    items: [
      {
        slug: "travel-insurance",
        name: "Travel Insurance",
        icon: "🛡️",
        description: "Comprehensive travel insurance coverage for domestic and international trips.",
        detailedDescription: "Protect your travels with comprehensive insurance coverage. From medical emergencies to trip cancellations, we've got you covered.",
        features: [
          "Medical coverage",
          "Trip cancellation",
          "Baggage protection",
          "24/7 assistance"
        ],
        process: [
          "Plan selection",
          "Premium calculation",
          "Policy purchase",
          "Coverage activation",
          "Claim support"
        ]
      }
    ]
  },
  {
    category: "Other Services",
    items: [
      {
        slug: "travel-consultancy",
        name: "Travel Consultancy & Planning",
        icon: "🗺️",
        description: "Expert travel advice and itinerary planning.",
        detailedDescription: "Personalized travel planning services to create perfect itineraries based on your preferences and budget."
      },
      {
        slug: "airport-transfers",
        name: "Airport Transfers & Meet & Greet",
        icon: "🚖",
        description: "Seamless airport transfers and welcome services.",
        detailedDescription: "Comfortable airport transfers with optional meet-and-greet services for a hassle-free arrival."
      },
      {
        slug: "special-assistance",
        name: "Special Assistance for Senior Citizens & Children",
        icon: "👵👶",
        description: "Dedicated support for special travel needs.",
        detailedDescription: "Personalized assistance for senior citizens, children, and travelers with special requirements."
      },
      {
        slug: "forex",
        name: "Forex Currency Exchange Assistance",
        icon: "💱",
        description: "Competitive foreign exchange services.",
        detailedDescription: "Currency exchange services with competitive rates and multiple currency options."
      },
      {
        slug: "health-guidelines",
        name: "Travel Health & COVID-19 Guidelines Support",
        icon: "🏥",
        description: "Updated health information for travelers.",
        detailedDescription: "Current health and COVID-19 related travel information and requirements for various destinations."
      },
      {
        slug: "emergency-support",
        name: "Emergency Travel Support & Helpline",
        icon: "🆘",
        description: "24/7 emergency assistance for travelers.",
        detailedDescription: "Round-the-clock support for travel emergencies including lost documents, medical issues, and other urgent situations."
      },
      {
        slug: "mice-travel",
        name: "Event & MICE Travel Management",
        icon: "🎪",
        description: "Professional management for business events and conferences.",
        detailedDescription: "Complete travel and logistics solutions for meetings, incentives, conferences, and exhibitions (MICE)."
      }
    ]
  }
];