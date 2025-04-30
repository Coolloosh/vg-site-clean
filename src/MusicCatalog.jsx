// MusicCatalog.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import PageHero from './PageHero';
import { originalReleases, coverReleases } from './musicData.js';



export default function MusicCatalog() {
  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;

  return (
     <main className="min-h-screen bg-black text-white font-sans">
         <PageHero
  image="/booking1.webp"
  title="Music"
  subtitle={<span className="text-purple-400 text-2xl md:text-2xl italic tracking-wide drop-shadow-[0_0_25px_rgba(0,255,0,0.3)] animate-fade-in-slow opacity-90">Hear ye hear ye...</span>}
  gradientClass="bg-gradient-to-b from-transparent via-black/10 to-black"
  imageClass="object-[75%_bottom] sm:object-bottom brightness-50 scale-85 transition duration-[2000ms]"
  titleColor="purple"
  titleFont="font-sans font-extrabold tracking-normal"
/>
                    {/*   <PageHero
                      image="/music3.png"
                      title="Music"
                      subtitle={<span className="text-purple-400 text-2xl md:text-2xl italic tracking-wide drop-shadow-[0_0_25px_rgba(0,255,0,0.3)] animate-fade-in-slow opacity-90">Hear ye hear ye...</span>}
                     subtitle={<span className="text-green-400 text-xl md:text-2xl italic tracking-wide opacity-80">Whisper into the chaos...</span>}
                      gradientClass="bg-gradient-to-b from-transparent via-black/10 to-black"
                      imageClass="object-center brightness-40 scale-85 transition duration-[2000ms]"
                      
                      titleColor="purple"
                      titleFont="font-sans font-extrabold tracking-normal"
                      titleFont="font-bebas"
                    />*/}
    <div className="min-h-screen bg-black text-white py-12 px-6">
    
      <h1 className="text-4xl font-bold text-purple-400 mb-12 text-center">Music Catalog</h1>
     <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12">
  {originalReleases.map((release) => (
    <Link
    key={release.id}
    to={`/music/${release.id}`}
    className={`group relative block bg-black border border-purple-800 2xl overflow-hidden shadow-xl transform transition-transform duration-300 ${
      !isMobile ? 'hover:shadow-purple-600 hover:scale-105' : ''
    }`}
  >
    <div className="relative w-full h-72">
    <img
  src={release.cover}
  alt={release.title}
  className={`w-full h-full object-cover transition-transform duration-500 ${
    !isMobile ? 'group-hover:scale-110' : ''
  }`}
/>
      {/* Overlay label */}
      <div className="absolute bottom-0 w-full bg-black/60 py-3 px-4 backdrop-blur-sm text-center">
        <h2 className="text-green-400 font-extrabold text-lg tracking-wide drop-shadow-[0_0_10px_rgba(0,255,0,0.3)]">
          {release.title}
        </h2>
      </div>
    </div>
  </Link>
  ))}
</div>
{/* Cover Songs Section */}
<section className="mt-24 max-w-3xl mx-auto">
  <h2 className="text-3xl text-purple-400 font-bold text-center mb-8">Cover Songs</h2>
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
    {coverReleases.map((cover) => (
      <div key={cover.id} className="border border-purple-700 rounded-xl px-6 py-4 hover:bg-zinc-900 transition">
        <Link
          to={`/music/covers/${cover.id}`}
          className="flex justify-between items-center text-green-300 font-semibold text-lg"
        >
          <span>{cover.title}</span>
          <span className="text-sm text-purple-300 italic">by {cover.originalArtist}</span>
        </Link>
      </div>
    ))}
  </div>
</section>

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
    </main>
  );
}