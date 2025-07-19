import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useState, useCallback, useEffect } from "react";
import { FiX, FiChevronLeft, FiChevronRight } from "react-icons/fi";

const GalleryPage = () => {
  const [selectedImage, setSelectedImage] = useState<{id: number, gallery: string} | null>(null);

  const mundakayamImages = [
    { id: 1, src: "/MundakayamBranch/1.jpg" },
    { id: 2, src: "/MundakayamBranch/2.jpg" },
    { id: 3, src: "/MundakayamBranch/3.jpg" },
    { id: 4, src: "/MundakayamBranch/4.jpg" },
    { id: 5, src: "/MundakayamBranch/5.jpg" },
    { id: 6, src: "/MundakayamBranch/6.jpg" },
    { id: 7, src: "/MundakayamBranch/7.jpg" },
    { id: 8, src: "/MundakayamBranch/8.jpg" },
    { id: 9, src: "/MundakayamBranch/9.jpg" },
    { id: 10, src: "/MundakayamBranch/10.jpg" },
    { id: 11, src: "/MundakayamBranch/11.jpg" },
    { id: 12, src: "/MundakayamBranch/12.jpg" },
    { id: 13, src: "/MundakayamBranch/13.jpg" },
    { id: 14, src: "/MundakayamBranch/14.jpg" },
    { id: 15, src: "/MundakayamBranch/15.jpg" },
    { id: 16, src: "/MundakayamBranch/16.jpg" },
    { id: 17, src: "/MundakayamBranch/17.jpg" },
    { id: 18, src: "/MundakayamBranch/18.jpg" },
    { id: 19, src: "/MundakayamBranch/19.jpg"},
  ];

  const pampadyImages = [
    { id: 1, src: "/PampadyBranch/1.jpg" },
    { id: 2, src: "/PampadyBranch/2.jpg" },
    { id: 3, src: "/PampadyBranch/3.jpg" },
    { id: 4, src: "/PampadyBranch/4.jpg" },
    { id: 5, src: "/PampadyBranch/5.jpg" },
    { id: 6, src: "/PampadyBranch/6.jpg" },
    { id: 7, src: "/PampadyBranch/7.jpg" },
    { id: 8, src: "/PampadyBranch/8.jpg" },
    // Add more Pampady images as needed
  ];

  const navigateImage = useCallback((direction: "prev" | "next") => {
    if (selectedImage === null) return;
    
    const currentGallery = selectedImage.gallery === "mundakayam" ? mundakayamImages : pampadyImages;
    const currentIndex = currentGallery.findIndex(img => img.id === selectedImage.id);
    let newIndex;
    
    if (direction === "prev") {
      newIndex = currentIndex === 0 ? currentGallery.length - 1 : currentIndex - 1;
    } else {
      newIndex = currentIndex === currentGallery.length - 1 ? 0 : currentIndex + 1;
    }
    
    setSelectedImage({
      id: currentGallery[newIndex].id,
      gallery: selectedImage.gallery
    });
  }, [selectedImage]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedImage !== null) {
        if (e.key === "Escape") setSelectedImage(null);
        if (e.key === "ArrowLeft") navigateImage("prev");
        if (e.key === "ArrowRight") navigateImage("next");
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedImage, navigateImage]);

  const getCurrentImages = () => {
    if (!selectedImage) return [];
    return selectedImage.gallery === "mundakayam" ? mundakayamImages : pampadyImages;
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6 sm:px-12 lg:px-24 xl:px-32">
      {/* Mundakayam Gallery */}
      <section className="mb-20">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Our Mundakayam Branch Inauguration</h1>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {mundakayamImages.map((image) => (
            <motion.div
              key={`mundakayam-${image.id}`}
              className="relative overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
              whileHover={{ scale: 1.02 }}
              layout
            >
              <Image
                src={image.src}
                alt="Mundakayam Branch Inauguration"
                width={600}
                height={400}
                className="w-full h-72 object-cover cursor-pointer"
                onClick={() => setSelectedImage({id: image.id, gallery: "mundakayam"})}
              />
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Pampady Gallery */}
      <section className="mt-16">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Our Pampady Branch Inauguration</h1>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {pampadyImages.map((image) => (
            <motion.div
              key={`pampady-${image.id}`}
              className="relative overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
              whileHover={{ scale: 1.02 }}
              layout
            >
              <Image
                src={image.src}
                alt="Pampady Branch Inauguration"
                width={600}
                height={400}
                className="w-full h-72 object-cover cursor-pointer"
                onClick={() => setSelectedImage({id: image.id, gallery: "pampady"})}
              />
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Image Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div 
            className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
          >
            <motion.div 
              className="relative max-w-5xl w-full max-h-[90vh]"
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={getCurrentImages().find(img => img.id === selectedImage.id)!.src}
                alt={selectedImage.gallery === "mundakayam" ? "Mundakayam Branch" : "Pampady Branch"}
                width={1600}
                height={900}
                className="w-full max-h-[80vh] object-contain"
                priority
              />
              
              {/* Navigation Arrows */}
              <button 
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 p-3 rounded-full backdrop-blur-sm transition-all text-white"
                onClick={(e) => {
                  e.stopPropagation();
                  navigateImage("prev");
                }}
              >
                <FiChevronLeft size={28} />
              </button>
              <button 
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 p-3 rounded-full backdrop-blur-sm transition-all text-white"
                onClick={(e) => {
                  e.stopPropagation();
                  navigateImage("next");
                }}
              >
                <FiChevronRight size={28} />
              </button>
              
              {/* Close Button */}
              <button 
                className="absolute top-4 right-4 bg-white/10 hover:bg-white/20 p-3 rounded-full backdrop-blur-sm transition-all text-white"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedImage(null);
                }}
              >
                <FiX size={24} />
              </button>

              {/* Image Counter */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 text-white px-4 py-2 rounded-full text-sm">
                {getCurrentImages().findIndex(img => img.id === selectedImage.id) + 1} / {getCurrentImages().length}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default GalleryPage;