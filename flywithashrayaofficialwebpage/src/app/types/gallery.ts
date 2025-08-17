// types/gallery.ts
export interface GalleryImage {
  id: number;
  src: string;
  alt: string;
}

export interface GallerySection {
  id: string;
  title: string;
  description: string;
  images: GalleryImage[];
}