import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useImageGallery } from '../hooks/useImageGallery';
import { hotelImages } from '../data/images';

export function ImageGallery() {
  const { currentImageIndex, nextImage, prevImage } = useImageGallery(hotelImages.length);

  return (
    <div className="container mx-auto relative mt-4">
      <div className="relative h-[400px] overflow-hidden">
        <img 
          src={hotelImages[currentImageIndex]} 
          alt="Hotel" 
          className="w-full h-full object-cover"
        />
        <button 
          onClick={prevImage}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button 
          onClick={nextImage}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
        <div className="absolute bottom-4 right-4 bg-black/70 text-white px-2 py-1 rounded">
          {currentImageIndex + 1}/{hotelImages.length}
        </div>
      </div>
    </div>
  );
}
