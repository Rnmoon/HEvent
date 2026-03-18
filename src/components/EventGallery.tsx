'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Maximize2, X } from 'lucide-react'

// Dummy data for the gallery (would ideally come from CMS or DB)
const galleryData = [
  { id: '1', url: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?auto=format&fit=crop&q=80', alt: 'Festival Crowd Laser Show' },
  { id: '2', url: 'https://images.unsplash.com/photo-1540039155733-d7316ba31c25?auto=format&fit=crop&q=80', alt: 'DJ on Main Stage' },
  { id: '3', url: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80', alt: 'Illuminated Arena' },
  { id: '4', url: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&q=80', alt: 'Confetti Drop' },
  { id: '5', url: 'https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&q=80', alt: 'Live Band Performance' },
  { id: '6', url: 'https://images.unsplash.com/photo-1470229722913-7c090be5bcee?auto=format&fit=crop&q=80', alt: 'Electronic Stage' },
  { id: '7', url: 'https://images.unsplash.com/photo-1533174000244-b461823eb9b6?auto=format&fit=crop&q=80', alt: 'Fireworks over crowd' },
  { id: '8', url: 'https://images.unsplash.com/photo-1524368535928-5b5e00ddfb8d?auto=format&fit=crop&q=80', alt: 'Acoustic evening' },
]

export default function EventGallery() {
  const [activeImage, setActiveImage] = useState<string | null>(null)

  // Handle Escape Key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActiveImage(null)
    }
    if (activeImage) {
      window.addEventListener('keydown', handleKeyDown)
      // Prevent scrolling when lightbox is open
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [activeImage])

  return (
    <>
      <section className="w-full py-24 bg-[#050505] px-4 relative overflow-hidden">
        {/* Glows */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent-yellow/5 rounded-full blur-[150px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <span className="text-accent-yellow text-sm font-bold tracking-widest uppercase block mb-4">The Archives</span>
            <h2 className="text-5xl md:text-6xl font-black text-white uppercase tracking-tighter">Past Editions</h2>
          </div>

          {/* Masonry Layout: We use CSS columns for true masonry without JS calculation */}
          <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
            {galleryData.map(img => (
              <div 
                key={img.id} 
                className="relative cursor-pointer group rounded-2xl overflow-hidden break-inside-avoid shadow-2xl bg-gray-900 border border-white/5"
                onClick={() => setActiveImage(img.url)}
              >
                <div className="w-full relative" style={{ paddingTop: '100%' /* Just a fallback, but Next/Image with auto handles height better if we don't fix it */ }}>
                   <Image 
                     src={img.url} 
                     alt={img.alt} 
                     fill
                     sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                     className="object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
                   />
                </div>
                
                {/* Hover UI */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                   <div className="w-12 h-12 bg-accent-yellow text-background rounded-full flex items-center justify-center transform scale-75 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-500 delay-75 shadow-[0_0_20px_rgba(250,204,21,0.5)]">
                     <Maximize2 size={24} />
                   </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {activeImage && (
        <div 
          className="fixed inset-0 z-[100] backdrop-blur-2xl bg-black/95 flex items-center justify-center animate-in fade-in duration-300"
          onClick={() => setActiveImage(null)} // Click outside to close
        >
          {/* Close Button */}
          <button 
            onClick={() => setActiveImage(null)}
            className="absolute top-6 right-6 z-50 p-3 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors"
            title="Close (Esc)"
          >
            <X size={28} />
          </button>

          {/* Image Container */}
          <div 
            className="relative w-full max-w-6xl max-h-[90vh] aspect-video sm:aspect-[4/3] lg:aspect-video m-4"
            onClick={(e) => e.stopPropagation()} // Prevent bubbling up to the backdrop click
          >
            <Image 
              src={activeImage}
              alt="Expanded view"
              fill
              className="object-contain"
              sizes="100vw"
              priority
            />
          </div>
        </div>
      )}
    </>
  )
}
