'use client';

import Contactcomponent from "../components/Contactcomponent";
import Contact_image from "../components/contact_image";
import Footer from "../components/Footer";
import Header from "../components/Header";
import ContactForm from "../components/ContactForm";

const ContactPage = () => {
  const mapContainerStyle = {
    width: '100%',
    height: '300px',
    borderRadius: '12px'
  };

  

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-indigo-50">
      <Header></Header>
        <Contact_image></Contact_image>
        <Contactcomponent></Contactcomponent>
        <ContactForm></ContactForm>
      <Footer></Footer>
    </div>
  );
};

export default ContactPage;