import { GallerySection, GalleryImage } from '@/app/types/gallery';
export const gallerySections: GallerySection[] = [
  {
    id: 'mundakayam',
    title: 'Our Mundakayam Branch Inauguration',
    description: 'Capturing the grand opening moments of our Mundakayam branch',
    images: [
      { id: 1, src: "/MundakayamBranch/1.jpg", alt: "Mundakayam Branch Inauguration - Image 1" },
      { id: 2, src: "/MundakayamBranch/2.jpg", alt: "Mundakayam Branch Inauguration - Image 2" },
      { id: 3, src: "/MundakayamBranch/3.jpg", alt: "Mundakayam Branch Inauguration - Image 3" },
      { id: 4, src: "/MundakayamBranch/4.jpg", alt: "Mundakayam Branch Inauguration - Image 4" },
      { id: 5, src: "/MundakayamBranch/5.jpg", alt: "Mundakayam Branch Inauguration - Image 5" },
      { id: 6, src: "/MundakayamBranch/6.jpg", alt: "Mundakayam Branch Inauguration - Image 6" },
      { id: 7, src: "/MundakayamBranch/7.jpg", alt: "Mundakayam Branch Inauguration - Image 7" },
      { id: 8, src: "/MundakayamBranch/8.jpg", alt: "Mundakayam Branch Inauguration - Image 8" },
      { id: 9, src: "/MundakayamBranch/9.jpg", alt: "Mundakayam Branch Inauguration - Image 9" },
      { id: 10, src: "/MundakayamBranch/10.jpg", alt: "Mundakayam Branch Inauguration - Image 10" },
      { id: 11, src: "/MundakayamBranch/11.jpg", alt: "Mundakayam Branch Inauguration - Image 11" },
      { id: 12, src: "/MundakayamBranch/12.jpg", alt: "Mundakayam Branch Inauguration - Image 12" },
      { id: 13, src: "/MundakayamBranch/13.jpg", alt: "Mundakayam Branch Inauguration - Image 13" },
      { id: 14, src: "/MundakayamBranch/14.jpg", alt: "Mundakayam Branch Inauguration - Image 14" },
      { id: 15, src: "/MundakayamBranch/15.jpg", alt: "Mundakayam Branch Inauguration - Image 15" },
      { id: 16, src: "/MundakayamBranch/16.jpg", alt: "Mundakayam Branch Inauguration - Image 16" },
      { id: 17, src: "/MundakayamBranch/17.jpg", alt: "Mundakayam Branch Inauguration - Image 17" },
      { id: 18, src: "/MundakayamBranch/18.jpg", alt: "Mundakayam Branch Inauguration - Image 18" },
      { id: 19, src: "/MundakayamBranch/19.jpg", alt: "Mundakayam Branch Inauguration - Image 19" },
    ]
  },
  {
    id: 'pampady',
    title: 'Our Pampady Branch Inauguration',
    description: 'Celebrating the opening of our Pampady branch',
    images: [
      { id: 1, src: "/PampadyBranch/1.jpg", alt: "Pampady Branch Inauguration - Image 1" },
      { id: 2, src: "/PampadyBranch/2.jpg", alt: "Pampady Branch Inauguration - Image 2" },
      { id: 3, src: "/PampadyBranch/3.jpg", alt: "Pampady Branch Inauguration - Image 3" },
      { id: 4, src: "/PampadyBranch/4.jpg", alt: "Pampady Branch Inauguration - Image 4" },
      { id: 5, src: "/PampadyBranch/5.jpg", alt: "Pampady Branch Inauguration - Image 5" },
      { id: 6, src: "/PampadyBranch/6.jpg", alt: "Pampady Branch Inauguration - Image 6" },
      { id: 7, src: "/PampadyBranch/7.jpg", alt: "Pampady Branch Inauguration - Image 7" },
      { id: 8, src: "/PampadyBranch/8.jpg", alt: "Pampady Branch Inauguration - Image 8" },
    ]
  }
];

export const getGalleryImagesBySection = (sectionId: string): GalleryImage[] => {
  const section = gallerySections.find(s => s.id === sectionId);
  return section ? section.images : [];
};

export const getAllGalleryImages = (): GalleryImage[] => {
  return gallerySections.flatMap(section => section.images);
};
