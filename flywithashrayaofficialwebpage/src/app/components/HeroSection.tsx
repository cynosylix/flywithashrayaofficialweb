import Link from 'next/link';

const HeroSection = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center bg-gray-900 overflow-hidden">
      {/* Background Video - You'll need to add your video file to public/videos */}
      <video 
        autoPlay 
        muted 
        loop 
        className="absolute w-full h-full object-cover opacity-40"
      >
        <source src="/plain.mp4" type="video/mp4" />
      </video>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-white mb-6 animate-fadeInUp">
            Crafting Extraordinary Journeys
          </h1>
          <p className="text-xl md:text-2xl text-white mb-10 max-w-3xl mx-auto animate-fadeInUp delay-100">
            Experience the world through our eyes - where every detail is meticulously planned to create unforgettable travel moments tailored just for you.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link 
              href="#packages" 
              className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold px-8 py-4 rounded-full transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-xl animate-fadeInUp delay-200"
            >
              Explore Packages
            </Link>
            <Link 
              href="#contact" 
              className="border-2 border-white hover:bg-white hover:text-gray-900 text-white font-semibold px-8 py-4 rounded-full transition-all duration-300 transform hover:-translate-y-1 animate-fadeInUp delay-300"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-white animate-bounce">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;