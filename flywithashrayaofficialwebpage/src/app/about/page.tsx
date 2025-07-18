import Header from '../components/Header';
import AboutSection from '../components/AboutSection';

import ContactSection from '../components/ContactSection';

import Footer from '../components/Footer';

export const metadata = {
  title: 'FlyWithAshraya | Beyond Extraordinary Journeys',
  description: 'Experience the world through our eyes - where every detail is meticulously planned to create unforgettable travel moments tailored just for you.',
};

export default function About() {
  return (
    <div>
      <Header />
      <main>
        <AboutSection />
        
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
