import type { NextPage } from 'next';
import Head from 'next/head';
import Header from '../components/Header';
import AboutSection from '../components/AboutSection';
import DestinationsSection from '../components/DestinationsSection';
import Footer from '../components/Footer';
import PackagesSection from '../components/PackagesSection';
import ContactSection from '../components/ContactSection';
import HeroSection from '../components/HeroSection';
import TestimonialsSection from '../components/TestimonialsSection';


const HomePage: NextPage = () => {
  return (
    <div>
      <Head>
        <title>FlyWithAshraya | Beyond Extraordinary Journeys</title>
        <meta name="description" content="Experience the world through our eyes - where every detail is meticulously planned to create unforgettable travel moments tailored just for you." />
      </Head>

      <Header />
      <main>
        <HeroSection />
        <AboutSection />
        <DestinationsSection />
        <PackagesSection />
        {/* <SpecialsSection /> */}
        <TestimonialsSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;

