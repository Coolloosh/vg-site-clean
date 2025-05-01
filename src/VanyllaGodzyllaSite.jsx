// VanyllaGodzyllaSite.jsx — Hide mobile scrollbars + prevent horizontal drag on swipe
import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import GalleryTeaser from './GalleryTeaser';
import UpcomingShows from './UpcomingShows';
import MerchTeaser from './MerchTeaser';
import { useCart } from './CartContext';
import AlbumPromo from './albumpromo';

export default function VanyllaGodzyllaSite() {
  const { cart, updateCartItem, updateCartSize, getTotal } = useCart();
  const [cartOpen, setCartOpen] = useState(false);
  const [showVigPrompt, setShowVigPrompt] = useState(false);

  useEffect(() => {
    const hasSeen = localStorage.getItem('vigPrompt');
    if (!hasSeen) {
      setTimeout(() => setShowVigPrompt(true), 10000);
      localStorage.setItem('vigPrompt', 'true');
    }
  }, []);

  const heroImages = [
    { desktop: "/HeroImg1.jpeg", mobile: "/gal11.webp" },
    { desktop: "/HeroImg2.png", mobile: "/gal10.webp" },
    { desktop: "/HeroImg3.png", mobile: "/gal4.jpg" },
    { desktop: "/HeroImg4.png", mobile: "/gal5.webp" },
  ];

  const [heroIndex, setHeroIndex] = useState(0);
  const touchStartX = useRef(null);
  const touchStartY = useRef(null);

  const prevHero = () =>
    setHeroIndex((prev) => (prev - 1 + heroImages.length) % heroImages.length);
  const nextHero = () =>
    setHeroIndex((prev) => (prev + 1) % heroImages.length);

  useEffect(() => {
    const timer = setInterval(() => setHeroIndex(i => (i + 1) % heroImages.length), 12000);
    return () => clearInterval(timer);
  }, []);

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e) => {
    const deltaX = e.changedTouches[0].clientX - touchStartX.current;
    const deltaY = e.changedTouches[0].clientY - touchStartY.current;

    // Prevent page scrolling when horizontal swipe is detected
    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 50) {
      e.preventDefault();
      deltaX > 0 ? prevHero() : nextHero();
    }
    touchStartX.current = null;
    touchStartY.current = null;
  };

  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;


  return (
    <main className="min-h-screen bg-black text-white font-sans overflow-x-hidden touch-pan-y">
      <section
        id="home"
        className="relative h-[100vh] sm:h-screen flex flex-col justify-center items-center text-center overflow-hidden pt-24 pb-16"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <picture>
          <source media="(max-width: 768px)" srcSet={heroImages[heroIndex].mobile} />
          <img
            src={heroImages[heroIndex].desktop}
            alt="Hero"
            className="absolute inset-0 w-full h-full object-cover scale-105 transition-opacity duration-1000"
          />
        </picture>

        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

        <button
          onClick={prevHero}
          className="hidden sm:block absolute left-4 sm:left-10 top-1/2 transform -translate-y-1/2 text-white text-4xl z-20 hover:text-green-400 transition"
          aria-label="Previous Slide"
        >
          ‹
        </button>

        <button
          onClick={nextHero}
          className="hidden sm:block absolute right-4 sm:right-10 top-1/2 transform -translate-y-1/2 text-white text-4xl z-20 hover:text-green-400 transition"
          aria-label="Next Slide"
        >
          ›
        </button>

        <div className="relative z-10 px-6 max-w-3xl mx-auto text-purple-200 text-center">
          <h1 className="text-4xl xs:text-5xl sm:text-6xl md:text-7xl font-extrabold mb-6 leading-tight tracking-wide drop-shadow-[0_0_40px_rgba(255,255,255,.4)] ">
            Vanylla Godzylla
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-purple-300 mb-10 tracking-wide">
            Heavy Riffs. Loud Colors. Zero Apologies.
          </p>
        </div>
      </section>

      <section className="sm:pt-0 pt-16">
        <UpcomingShows />
        <MerchTeaser />
        <GalleryTeaser />
        <AlbumPromo />
      </section>

      {showVigPrompt && (
        <div className="fixed bottom-6 left-6 bg-purple-700 text-white p-4 rounded-xl shadow-lg z-50 max-w-xs animate-fade-in">
          <p className="text-sm mb-3">Want early access to merch & exclusive content?</p>
          <Link
            to="/fanclub"
            className="inline-block bg-green-500 hover:bg-green-400 text-black px-4 py-2 rounded-full font-bold shadow"
          >
            Become a V.I.G.
          </Link>
          <button
            onClick={() => setShowVigPrompt(false)}
            className="absolute top-2 right-3 text-white text-xl font-bold"
          >×</button>
        </div>
      )}

      <footer className="bg-black py-6 mt-20 text-center text-sm text-gray-500">
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
    </main>
  );
}