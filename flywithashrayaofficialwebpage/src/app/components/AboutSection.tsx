import { Destination, Package, Special, Testimonial } from '../types/common';

const AboutSection = () => {
  return (
    <section id="about" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center">
          <div className="lg:w-1/2 mb-12 lg:mb-0 lg:pr-10">
            <h2 className="text-3xl lg:text-4xl font-serif mb-4">About FlyWithAshraya</h2>
            <p className="text-lg mb-6">Your journey begins with us</p>
            <p className="mb-6">
              Fly With Ashraya offers cheap and affordable air ticketing, visa assistance, attestation,
              emigration support, customized holiday packages, and reliable transport services. With offices
              in Pampady and Mundakayam (Kottayam) and a presence in Kuwait, we serve clients across India and
              the Gulf. Kuwait customers can pay in KWD or INR. We provide group fares, special fares, and
              personalized staff support until you reach your destination. We also assist with visas and
              holiday bookings to Dubai, London, Maldives, and more.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className="text-3xl font-bold text-blue-500 mb-2">10K+</div>
                <div className="text-gray-600">Happy Travelers</div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className="text-3xl font-bold text-blue-500 mb-2">50+</div>
                <div className="text-gray-600">Destinations</div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className="text-3xl font-bold text-blue-500 mb-2">24/7</div>
                <div className="text-gray-600">Support</div>
              </div>
            </div>
          </div>

          <div className="lg:w-1/2 relative">
            <div className="relative rounded-lg overflow-hidden shadow-xl">
              <img
                src="https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
                alt="About Us"
                className="w-full h-auto object-cover"
              />
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-400 to-blue-800 opacity-20"></div>
            </div>
            <div className="absolute -top-5 -right-5 bg-yellow-400 text-gray-900 px-6 py-3 rounded-md font-bold shadow-lg transform rotate-3 animate-pulse">
              Since 2010
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;