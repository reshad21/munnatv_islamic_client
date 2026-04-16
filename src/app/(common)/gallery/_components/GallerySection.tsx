"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface GalleryItem {
  id: string;
  image: string;
  status: boolean;
  createdAt: string;
  updatedAt: string;
}

interface GallerySectionProps {
  galleryData: GalleryItem[];
}

const GallerySection: React.FC<GallerySectionProps> = ({ galleryData }) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  if (!galleryData || galleryData.length === 0) {
    return <div className="text-center py-10 text-gray-500">No images available</div>;
  }

  const openLightbox = (index: number) => {
    setSelectedIndex(index);
  };

  const closeLightbox = () => {
    setSelectedIndex(null);
  };

  const goToPrevious = () => {
    if (selectedIndex !== null) {
      setSelectedIndex((selectedIndex - 1 + galleryData.length) % galleryData.length);
    }
  };

  const goToNext = () => {
    if (selectedIndex !== null) {
      setSelectedIndex((selectedIndex + 1) % galleryData.length);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') goToPrevious();
    if (e.key === 'ArrowRight') goToNext();
  };

  return (
    <>
      {/* Gallery Grid */}
      <div className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-5xl mx-auto px-4 py-8 transition-all duration-300 ${selectedIndex !== null ? 'filter blur-md pointer-events-none select-none' : ''}`}>
        {galleryData.map((item, idx) => (
          <div
            key={item.id}
            onClick={() => openLightbox(idx)}
            className="relative rounded-2xl overflow-hidden group aspect-square bg-gradient-to-br from-gray-100 to-gray-200 shadow-md hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 cursor-pointer"
          >
            <Image
              src={item.image}
              alt={`Gallery image ${idx + 1}`}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110 group-hover:blur-sm"
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
              priority={idx < 4}
              unoptimized
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
            {/* Plus Icon on Hover */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" className="text-white drop-shadow-lg">
                <circle cx="12" cy="12" r="11" fill="rgba(0,0,0,0.5)" />
                <path d="M12 8v8M8 12h8" stroke="white" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {selectedIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
          onClick={closeLightbox}
          onKeyDown={handleKeyDown}
          tabIndex={0}
        >
          {/* Close Button */}
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 z-50 text-white hover:text-gray-300 transition-colors p-2"
            aria-label="Close"
          >
            <X size={32} />
          </button>


          {/* Previous Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              goToPrevious();
            }}
            className="fixed md:absolute left-2 md:left-8 top-1/2 -translate-y-1/2 z-50 text-white hover:text-gray-300 transition-colors p-3 bg-black/40 rounded-full hover:bg-black/60 shadow-lg focus:outline-none"
            style={{transform: 'translateY(-50%)'}}
            aria-label="Previous"
          >
            <ChevronLeft size={36} />
          </button>

          {/* Next Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              goToNext();
            }}
            className="fixed md:absolute right-2 md:right-8 top-1/2 -translate-y-1/2 z-50 text-white hover:text-gray-300 transition-colors p-3 bg-black/40 rounded-full hover:bg-black/60 shadow-lg focus:outline-none"
            style={{transform: 'translateY(-50%)'}}
            aria-label="Next"
          >
            <ChevronRight size={36} />
          </button>

          {/* Main Image */}
          <div 
            className="relative w-full h-full max-w-6xl max-h-[85vh] mx-auto px-20 py-16"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={galleryData[selectedIndex].image}
              alt={`Gallery image ${selectedIndex + 1}`}
              fill
              className="object-contain"
              unoptimized
            />
          </div>

          {/* Thumbnail Strip */}
          <div className="absolute bottom-0 left-0 right-0 bg-black/80 backdrop-blur-sm py-4 px-4 overflow-x-auto">
            <div className="flex gap-3 justify-center items-center max-w-7xl mx-auto">
              {galleryData.map((item, idx) => (
                <div
                  key={item.id}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedIndex(idx);
                  }}
                  className={`relative flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden cursor-pointer transition-all duration-300 ${
                    idx === selectedIndex
                      ? 'ring-4 ring-white scale-110'
                      : 'ring-2 ring-transparent hover:ring-white/50 opacity-60 hover:opacity-100'
                  }`}
                >
                  <Image
                    src={item.image}
                    alt={`Thumbnail ${idx + 1}`}
                    fill
                    className="object-cover"
                    sizes="80px"
                    unoptimized
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Image Counter */}
          <div className="absolute top-4 left-1/2 transform -translate-x-1/2 text-white text-lg font-semibold bg-black/50 px-4 py-2 rounded-full">
            {selectedIndex + 1} / {galleryData.length}
          </div>
        </div>
      )}
    </>
  );
};

export default GallerySection;