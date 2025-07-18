import { Package } from '../types/common';

const packages: Package[] = [
  {
    id: 1,
    title: "Thailand Adventure",
    description: "Experience the vibrant culture and stunning landscapes of Thailand",
    price: "$2,499",
    duration: "14 Days",
    features: [
      "Private guided tours in Bangkok, Chiang Mai & Phuket",
      "5-star accommodations with city views",
      "Gourmet dining experiences",
      "First-class transportation"
    ],
    image: "/images/thailand.jpg",
    badge: "Popular"
  },
  {
    id: 2,
    title: "Bali Retreat",
    description: "Relax and rejuvenate in the tropical paradise of Bali",
    price: "$1,899",
    duration: "10 Days",
    features: [
      "Luxury beachfront resort",
      "Daily yoga and meditation sessions",
      "Traditional Balinese spa treatments",
      "Private tours to cultural sites"
    ],
    image: "/images/bali-retreat.jpg",
    badge: "Best Seller"
  },
  {
    id: 3,
    title: "Vietnam Explorer",
    description: "Discover the rich history and natural beauty of Vietnam",
    price: "$1,599",
    duration: "7 Days",
    features: [
      "Guided tours of Hanoi and Ho Chi Minh City",
      "Cruise in Ha Long Bay",
      "Street food tours with local experts",
      "Boutique hotel accommodations"
    ],
    image: "/images/vietnam.jpg",
    badge: "Limited Time"
  }
];

const PackagesSection = () => {
  return (
    <section id="packages" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-serif mb-4">Our Signature Packages</h2>
          <p className="text-xl max-w-3xl mx-auto">
            Tailored travel experiences designed to create unforgettable memories and lasting impressions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {packages.map((pkg) => (
            <div key={pkg.id} className="bg-white rounded-lg overflow-hidden shadow-lg transition-transform duration-300 hover:-translate-y-2">
              <div className="relative h-64 overflow-hidden">
                <img
                  src={pkg.image}
                  alt={pkg.title}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
                {pkg.badge && (
                  <div className="absolute top-4 right-4 bg-yellow-400 text-gray-900 px-4 py-1 rounded-full text-sm font-bold">
                    {pkg.badge}
                  </div>
                )}
                <div className="absolute bottom-4 left-4 bg-black bg-opacity-70 text-white px-3 py-1 rounded-full text-sm">
                  {pkg.duration}
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-serif mb-4 pb-4 relative after:absolute after:bottom-0 after:left-0 after:w-12 after:h-0.5 after:bg-blue-500">
                  {pkg.title}
                </h3>
                <ul className="mb-6 space-y-3">
                  {pkg.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <svg className="w-5 h-5 text-blue-500 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <div className="text-3xl font-bold text-blue-500 mb-4">{pkg.price} <span className="text-base font-normal text-gray-600">/person</span></div>
                <button className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 px-6 rounded-full transition-colors duration-300">
                  Book Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PackagesSection;