'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { X, ArrowLeft, Maximize2 } from 'lucide-react';

const allImages = [
  '/images/past/WhatsApp Image 2026-03-16 at 11.02.24 AM.jpeg',
  '/images/past/WhatsApp Image 2026-03-16 at 11.02.25 AM (1).jpeg',
  '/images/past/WhatsApp Image 2026-03-16 at 11.02.25 AM.jpeg',
  '/images/past/WhatsApp Image 2026-03-16 at 11.02.26 AM.jpeg',
  '/images/past/WhatsApp Image 2026-03-16 at 11.02.27 AM (1).jpeg',
  '/images/past/WhatsApp Image 2026-03-16 at 11.02.27 AM.jpeg',
  '/images/past/WhatsApp Image 2026-03-16 at 11.02.28 AM (1).jpeg',
  '/images/past/WhatsApp Image 2026-03-16 at 11.02.28 AM.jpeg',
  '/images/past/WhatsApp Image 2026-03-16 at 11.02.29 AM (1).jpeg',
  '/images/past/WhatsApp Image 2026-03-16 at 11.02.29 AM.jpeg',
  '/images/past/WhatsApp Image 2026-03-16 at 11.02.30 AM.jpeg',
  '/images/past/WhatsApp Image 2026-03-16 at 11.02.31 AM (1).jpeg',
  '/images/past/WhatsApp Image 2026-03-16 at 11.02.31 AM.jpeg',
  '/images/past/WhatsApp Image 2026-03-16 at 11.02.32 AM (1).jpeg',
  '/images/past/WhatsApp Image 2026-03-16 at 11.02.32 AM.jpeg',
  '/images/past/WhatsApp Image 2026-03-16 at 11.02.33 AM.jpeg',
  '/images/past/WhatsApp Image 2026-03-16 at 11.02.34 AM (1).jpeg',
  '/images/past/WhatsApp Image 2026-03-16 at 11.02.34 AM.jpeg',
  '/images/past/WhatsApp Image 2026-03-16 at 11.02.35 AM (1).jpeg',
  '/images/past/WhatsApp Image 2026-03-16 at 11.02.35 AM.jpeg',
  '/images/past/WhatsApp Image 2026-03-16 at 11.02.36 AM (1).jpeg',
  '/images/past/WhatsApp Image 2026-03-16 at 11.02.36 AM.jpeg',
  '/images/past/WhatsApp Image 2026-03-16 at 11.02.37 AM.jpeg',
  '/images/past/WhatsApp Image 2026-03-16 at 11.02.38 AM (1).jpeg',
  '/images/past/WhatsApp Image 2026-03-16 at 11.02.38 AM.jpeg',
  '/images/past/WhatsApp Image 2026-03-16 at 11.02.39 AM.jpeg',
  '/images/past/WhatsApp Image 2026-03-16 at 11.02.40 AM.jpeg',
  '/images/past/WhatsApp Image 2026-03-16 at 11.02.41 AM.jpeg',
  '/images/past/WhatsApp Image 2026-03-16 at 11.02.42 AM.jpeg',
  '/images/past/WhatsApp Image 2026-03-16 at 11.02.44 AM.jpeg',
  '/images/past/WhatsApp Image 2026-03-16 at 11.02.45 AM.jpeg',
  '/images/past/WhatsApp Image 2026-03-16 at 11.02.46 AM.jpeg',
  '/images/past/WhatsApp Image 2026-03-16 at 11.02.47 AM.jpeg',
  '/images/past/WhatsApp Image 2026-03-16 at 11.02.48 AM (1).jpeg',
  '/images/past/WhatsApp Image 2026-03-16 at 11.02.48 AM.jpeg',
  '/images/past/WhatsApp Image 2026-03-16 at 11.02.51 AM (1).jpeg',
  '/images/past/WhatsApp Image 2026-03-16 at 11.02.51 AM.jpeg',
  '/images/past/WhatsApp Image 2026-03-16 at 11.02.56 AM (1).jpeg',
  '/images/past/WhatsApp Image 2026-03-16 at 11.02.56 AM.jpeg',
  '/images/past/WhatsApp Image 2026-03-16 at 11.02.57 AM (1).jpeg',
  '/images/past/WhatsApp Image 2026-03-16 at 11.02.57 AM.jpeg',
  '/images/past/WhatsApp Image 2026-03-16 at 11.02.59 AM.jpeg',
  '/images/past/IMG_20250411_222802.jpg',
  '/images/past/PXL_20250413_183134873.jpg',
  '/images/past/PXL_20250413_183440609.MP.jpg',
];

export default function GalleryPage() {
  const [activeImage, setActiveImage] = useState<string | null>(null);

  return (
    <main className="min-h-screen bg-white">
      {/* Navigation Header */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
          <Link 
            href="/" 
            className="flex items-center gap-2 font-bold text-black hover:text-blue-600 transition-colors"
          >
            <ArrowLeft size={20} />
            <span>Back to Home</span>
          </Link>
          <h1 className="text-xl font-black uppercase tracking-widest text-black">Event Archive</h1>
          <div className="w-24"></div> {/* Spacer for symmetry */}
        </div>
      </nav>

      <section className="py-12 px-4 sm:px-8 max-w-7xl mx-auto">
        <div className="mb-12">
          <h2 className="text-4xl md:text-6xl font-black text-black tracking-tighter mb-4">Capturing the Moment</h2>
          <p className="text-gray-500 text-lg max-w-2xl font-medium">
            Explore our journey through a collection of memories from past festivals and events.
          </p>
        </div>

        {/* Masonry Grid */}
        <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-6 space-y-6">
          {allImages.map((src, idx) => (
            <div 
              key={idx} 
              className="relative rounded-2xl overflow-hidden cursor-pointer group break-inside-avoid shadow-lg hover:shadow-2xl transition-all duration-500"
              onClick={() => setActiveImage(src)}
            >
              <Image 
                src={src} 
                alt={`Event ${idx}`} 
                width={500} 
                height={700} 
                className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <Maximize2 className="text-white" size={32} />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Lightbox Modal */}
      {activeImage && (
        <div 
          className="fixed inset-0 z-[100] backdrop-blur-2xl bg-black/95 flex items-center justify-center p-4 sm:p-8"
          onClick={() => setActiveImage(null)}
        >
          <button 
            onClick={() => setActiveImage(null)} 
            className="absolute top-8 right-8 p-3 bg-white text-black rounded-full shadow-2xl hover:scale-110 transition-transform"
          >
            <X size={24} />
          </button>
          <div className="relative w-full max-w-6xl h-full flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
            <Image 
              src={activeImage} 
              alt="Gallery item" 
              fill 
              className="object-contain" 
              priority 
            />
          </div>
        </div>
      )}

      {/* Footer Spacer */}
      <div className="h-24"></div>
    </main>
  );
}
