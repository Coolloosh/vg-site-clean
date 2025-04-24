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
    "/HeroImg1.jpeg",
    "/HeroImg2.png",
    "/HeroImg3.png",
    "/HeroImg4.png",
  ];

  const prevHero = () =>
    setHeroIndex((prev) => (prev - 1 + heroImages.length) % heroImages.length);

  const nextHero = () =>
    setHeroIndex((prev) => (prev + 1) % heroImages.length);

  const [heroIndex, setHeroIndex] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => setHeroIndex(i => (i + 1) % heroImages.length), 12000);
    return () => clearInterval(timer);
  }, []);

  return (
    <main className="min-h-screen bg-black text-white font-sans">
      {/*<section id="home" className="relative min-h-[120vh] flex flex-col justify-center items-center text-center overflow-hidden">*/}
      <section id="home" className="relative min-h-screen flex flex-col justify-center items-center text-center overflow-hidden pt-24 pb-16">
        <img
          src={heroImages[heroIndex]}
          alt="Hero"
          className="absolute inset-0 w-full h-full object-cover scale-105 transition-opacity duration-1000"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

        <button
          onClick={prevHero}
          className="absolute left-4 sm:left-10 top-1/2 transform -translate-y-1/2 text-white text-4xl z-20 hover:text-green-400 transition"
          aria-label="Previous Slide"
        >
          ‹
        </button>

        <button
          onClick={nextHero}
          className="absolute right-4 sm:right-10 top-1/2 transform -translate-y-1/2 text-white text-4xl z-20 hover:text-green-400 transition "
          aria-label="Next Slide"
        >
          ›
        </button>

        <div className="relative z-10 px-6 max-w-3xl mx-auto text-white text-center">
          <h1 className="text-4xl xs:text-5xl sm:text-6xl md:text-7xl font-extrabold mb-6 leading-tight tracking-wide drop-shadow-[0_0_40px_rgba(255,255,255,.4)] ">
            Vanylla Godzylla
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-purple-300 mb-10 tracking-wide">
            Heavy Riffs. Loud Colors. Zero Apologies.
          </p>
          
         {/* drop-shadow-[0_0_40px_rgba(0,255,0,0.4)]   drop-shadow-[0_0_15px_rgba(186,85,211,0.7)]  <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#music"
              className="inline-flex items-center justify-center gap-2 border border-purple-400 text-white px-6 py-3 rounded-full font-semibold hover:bg-purple-700/40 hover:shadow-purple-400/40 backdrop-blur-md transition hover:scale-105 shadow-md"
            >
              🎷 Listen Now
            </a>
            <a
              href="#shows"
              className="inline-flex items-center justify-center gap-2 border border-green-400 px-6 py-3 rounded-full text-white hover:bg-green-700/40 hover:shadow-green-400/40 transition backdrop-blur-md hover:scale-105 shadow-md"
            >
              🎤 See Show Dates
            </a>
          </div>*/}
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
          Follow us: <a href="https://instagram.com/vanylla.godzylla" className="text-pink-400">Instagram</a> • <a href="#" className="hover:text-blue-400">Facebook</a> • <a href="https://www.youtube.com/@vanyllagodzylla1282" className="hover:text-red-500">YouTube</a>
        </p>
      </footer>
    </main>
  );
}
