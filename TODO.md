# Gallery Component Organization - TODO

## Phase 1: Fix Naming Inconsistencies
- [ ] Rename `galary_hed_image.tsx` to `gallery_header_image.tsx`
- [ ] Rename `image_component.tsx` to `gallery_component.tsx`
- [ ] Update all import statements in affected files

## Phase 2: Create Type Definitions
- [ ] Create `types/gallery.ts` for TypeScript interfaces
- [ ] Define GalleryImage interface
- [ ] Define GallerySection interface

## Phase 3: Create Data Management
- [ ] Create `data/galleryData.ts` for centralized image data
- [ ] Move hardcoded image arrays to data file
- [ ] Organize images by categories and branches

## Phase 4: Create Reusable Components
- [ ] Create `components/gallery/GalleryImage.tsx` for individual images
- [ ] Create `components/gallery/GalleryGrid.tsx` for responsive grid layout
- [ ] Create `components/gallery/GalleryModal.tsx` for lightbox functionality
- [ ] Create `components/gallery/GallerySection.tsx` for section management

## Phase 5: Refactor Main Gallery
- [ ] Update `gallery/page.tsx` to use new component structure
- [ ] Implement proper data flow between components
- [ ] Add loading states and error handling

## Phase 6: Enhancements
- [ ] Add image optimization
- [ ] Implement lazy loading
- [ ] Add accessibility features
- [ ] Test responsive design across devices
