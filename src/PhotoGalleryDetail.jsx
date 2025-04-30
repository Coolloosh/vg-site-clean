import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import PageHero from './PageHero';


const galleryData = {
  "deer-park-3-7": {
    title: "Deer Park Tavern",
    date: "March 7, 2025",
    location: "Newark, DE",
    heroImage: "/band.png",
    photos: [
      { src: "/fanclub1.png", caption: "Photo by Jane Doe" },
      { src: "/graphic6.JPG", caption: "Crowd going wild" },
      { src: "/HeroImg2.png", caption: "Backdrop chaos" },
      { src: "/HeroImg4.png", caption: "Lighting by Max" },
      { src: "/photos/deerpark5.jpg", caption: "Encore moment" },
      { src: "/photos/deerpark6.jpg", caption: "Stage left energy" }
    ]
  }
};

export default function PhotoGalleryDetail() {
  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;
  const { slug } = useParams();
  const [visibleCount, setVisibleCount] = useState(6);
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const touchStartX = useRef(null);
  const loadRef = useRef(null);

  const gallery = galleryData[slug];
  const { title, date, location, heroImage, photos } = gallery;

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    if (!touchStartX.current) return;
    const diffX = touchStartX.current - e.changedTouches[0].clientX;
    if (diffX > 50) nextLightbox();
    else if (diffX < -50) prevLightbox();
    touchStartX.current = null;
  };

  const nextLightbox = () => {
    setLightboxIndex((i) => (i + 1) % photos.length);
  };

  const prevLightbox = () => {
    setLightboxIndex((i) => (i - 1 + photos.length) % photos.length);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisibleCount((prev) => Math.min(prev + 6, photos.length));
        }
      },
      { threshold: 1.0 }
    );

    if (loadRef.current && visibleCount < photos.length) {
      observer.observe(loadRef.current);
    }

    return () => {
      if (loadRef.current) observer.unobserve(loadRef.current);
    };
  }, [visibleCount, photos.length]);

  return (
    <main className="min-h-screen bg-black text-white font-sans overflow-x-hidden">
       <PageHero
              image="/shows4.JPG"
              title={title}
              subtitle={
                <span className="text-purple-300 text-xl tracking-wide italic">
                  {date} – {location}
                </span>
              }
            
         
        ></PageHero>
      {/*border border-purple-700*/}
      <section className="max-w-6xl mx-auto py-15 px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {photos.slice(0, visibleCount).map((img, i) => (
            <motion.img
            key={i}
            src={img.src}
            alt={`Gallery photo ${i + 1}`}
            onClick={() => setLightboxIndex(i)}
            whileHover={isMobile ? {} : { scale: 1.03 }}
            className="w-full h-64 object-cover rounded-xl shadow-md cursor-pointer transition-transform"
          />
          ))}
        </div>
        <div ref={loadRef} className="h-12 mt-10 flex justify-center items-center text-purple-400 text-sm">
          {visibleCount < photos.length ? 'Loading more photos...' : 'All photos loaded'}
        </div>
        
<div className="text-center pb-10">
<Link
  to="/gallery/photos"
  className={`text-purple-400 px-6 font-bold text-lg transition ${
    !isMobile ? 'hover:underline hover:text-green-400' : ''
  }`}
>
  Back to Gallery
</Link>
             </div>
             
             <footer className="bg-black py-6 text-center text-sm text-gray-500">
        <p>© 2025 Vanylla Godzylla. All rights reserved.</p>
        <p>
  Follow us: 
  <a
    href="https://instagram.com/vanylla.godzylla"
    className="hover:text-pink-400 ml-1"
  >
    Instagram
  </a> • 
  <a
    href="#"
    className={`ml-1 transition ${
      !isMobile ? 'hover:text-blue-400' : ''
    }`}
  >
    Facebook
  </a> • 
  <a
    href="https://www.youtube.com/@vanyllagodzylla1282"
    className={`ml-1 transition ${
      !isMobile ? 'hover:text-red-500' : ''
    }`}
  >
    YouTube
  </a>
</p>
      </footer>
      </section>
      {/*border border-purple-700*/} 

      {lightboxIndex !== null && (
        <div className="fixed inset-0 bg-black/90 z-50 flex flex-col items-center justify-center px-4" onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
          <button onClick={() => setLightboxIndex(null)} className="absolute top-6 right-6 text-white text-4xl">×</button>
          <button onClick={prevLightbox} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white text-4xl px-4">‹</button>
          <img src={photos[lightboxIndex].src} alt="Full View" className="max-h-[80vh] max-w-[90vw] rounded-xl shadow-xl" />
          <p className="mt-4 text-purple-300 text-center max-w-xl text-sm">{photos[lightboxIndex].caption}</p>
          <button onClick={nextLightbox} className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white text-4xl px-4">›</button>
        </div>
      )}


    </main>
  );
}
