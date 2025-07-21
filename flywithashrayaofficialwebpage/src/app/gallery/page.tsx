'use client';

import GalleryPage from "../components/image_component";
import Galary_hed_image from "../components/galary_hed_image";
import Footer from "../components/Footer";
import Header from "../components/Header";

const Galarypg = () => {


  

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-indigo-50">
      <Header></Header>
        <Galary_hed_image></Galary_hed_image>
        <GalleryPage></GalleryPage>
      <Footer></Footer>
    </div>
  );
};

export default Galarypg;