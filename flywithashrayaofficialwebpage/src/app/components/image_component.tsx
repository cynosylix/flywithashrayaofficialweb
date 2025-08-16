import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useState, useCallback, useEffect } from "react";
import { FiX, FiChevronLeft, FiChevronRight } from "react-icons/fi";

// Image data moved to constants for better organization
const GALLERY_IMAGES = {
  mundakayam: Array.from({ length: 19 }, (_, i) => ({
    id: i + 1,
    src: `/MundakayamBranch/${i + 1}.jpg`,
  })),
  pampady: Array.from({ length: 8 }, (_, i) => ({
    id: i + 1,
    src: `/PampadyBranch/${i + 1}.jpg`,
  })),
};

type SelectedImage = {
  id: number;
  gallery: "mundakayam" | "pampady";
};

const GalleryPage = () => {
  const [selectedImage, setSelectedImage] = useState<SelectedImage | null>(null);

  const navigateImage = useCallback(
    (direction: "prev" | "next") => {
      if (!selectedImage) return;

      const currentImages = GALLERY_IMAGES[selectedImage.gallery];
      const currentIndex = currentImages.findIndex(
        (img) => img.id === selectedImage.id
      );
      const newIndex =
        direction === "prev"
          ? (currentIndex - 1 + currentImages.length) % currentImages.length
          : (currentIndex + 1) % currentImages.length;

      setSelectedImage({
        id: currentImages[newIndex].id,
        gallery: selectedImage.gallery,
      });
    },
    [selectedImage]
  );

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedImage) return;

      switch (e.key) {
        case "Escape":
          setSelectedImage(null);
          break;
        case "ArrowLeft":
          navigateImage("prev");
          break;
        case "ArrowRight":
          navigateImage("next");
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedImage, navigateImage]);

  const getCurrentImage = () => {
    if (!selectedImage) return null;
    return GALLERY_IMAGES[selectedImage.gallery].find(
      (img) => img.id === selectedImage.id
    );
  };

  const GallerySection = ({
    title,
    galleryKey,
  }: {
    title: string;
    galleryKey: keyof typeof GALLERY_IMAGES;
  }) => (
    <section className="mb-20">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl font-bold text-gray-900 mb-2">{title}</h1>
      </motion.div>

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        {GALLERY_IMAGES[galleryKey].map((image) => (
          <GalleryImage
            key={`${galleryKey}-${image.id}`}
            src={image.src}
            alt={`${title} ${image.id}`}
            onClick={() =>
              setSelectedImage({ id: image.id, gallery: galleryKey })
            }
          />
        ))}
      </motion.div>
    </section>
  );

  const GalleryImage = ({
    src,
    alt,
    onClick,
  }: {
    src: string;
    alt: string;
    onClick: () => void;
  }) => (
    <motion.div
      className="relative overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
      whileHover={{ scale: 1.02 }}
      layout
    >
      <Image
        src={src}
        alt={alt}
        width={600}
        height={400}
        className="w-full h-72 object-cover cursor-pointer"
        onClick={onClick}
      />
    </motion.div>
  );

  const ImageModal = () => {
    const currentImage = getCurrentImage();
    if (!selectedImage || !currentImage) return null;

    const currentImages = GALLERY_IMAGES[selectedImage.gallery];
    const currentIndex = currentImages.findIndex(
      (img) => img.id === selectedImage.id
    );

    return (
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
            src={currentImage.src}
            alt={
              selectedImage.gallery === "mundakayam"
                ? "Mundakayam Branch"
                : "Pampady Branch"
            }
            width={1600}
            height={900}
            className="w-full max-h-[80vh] object-contain"
            priority
          />

          <NavigationButton
            direction="prev"
            onClick={() => navigateImage("prev")}
          />
          <NavigationButton
            direction="next"
            onClick={() => navigateImage("next")}
          />

          <CloseButton onClick={() => setSelectedImage(null)} />

          <ImageCounter
            current={currentIndex + 1}
            total={currentImages.length}
          />
        </motion.div>
      </motion.div>
    );
  };

  const NavigationButton = ({
    direction,
    onClick,
  }: {
    direction: "prev" | "next";
    onClick: () => void;
  }) => (
    <button
      className={`absolute ${direction === "prev" ? "left-4" : "right-4"} top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 p-3 rounded-full backdrop-blur-sm transition-all text-white`}
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
    >
      {direction === "prev" ? (
        <FiChevronLeft size={28} />
      ) : (
        <FiChevronRight size={28} />
      )}
    </button>
  );

  const CloseButton = ({ onClick }: { onClick: () => void }) => (
    <button
      className="absolute top-4 right-4 bg-white/10 hover:bg-white/20 p-3 rounded-full backdrop-blur-sm transition-all text-white"
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
    >
      <FiX size={24} />
    </button>
  );

  const ImageCounter = ({
    current,
    total,
  }: {
    current: number;
    total: number;
  }) => (
    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 text-white px-4 py-2 rounded-full text-sm">
      {current} / {total}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6 sm:px-12 lg:px-24 xl:px-32">
      <GallerySection
        title="Our Mundakayam Branch Inauguration"
        galleryKey="mundakayam"
      />

      <GallerySection
        title="Our Pampady Branch Inauguration"
        galleryKey="pampady"
      />

      <AnimatePresence>{selectedImage && <ImageModal />}</AnimatePresence>
    </div>
  );
};

export default GalleryPage;