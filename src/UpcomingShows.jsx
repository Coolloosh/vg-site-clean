// Updated UpcomingShows.jsx with swipe on mobile and desktop chevrons
import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { upcomingShows } from './Showsdata.js';

export default function UpcomingShows() {
  const [lightbox, setLightbox] = useState(null);
  const [startIndex, setStartIndex] = useState(0);
  const touchStartX = useRef(null);
  const containerRef = useRef(null);

  const handleClick = (e, index) => {
    if (!e.target.closest('a')) setLightbox(index);
  };

  const closeLightbox = () => setLightbox(null);
  const prevLightbox = () => setLightbox((prev) => (prev === 0 ? upcomingShows.length - 1 : prev - 1));
  const nextLightbox = () => setLightbox((prev) => (prev === upcomingShows.length - 1 ? 0 : prev + 1));

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    if (!touchStartX.current) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (diff > 50) nextSlide3();
    else if (diff < -50) prevSlide3();
    touchStartX.current = null;
  };

  const nextSlide = () => setStartIndex((prev) => (prev + 1) % upcomingShows.length);
  const prevSlide = () => setStartIndex((prev) => (prev - 1 + upcomingShows.length) % upcomingShows.length);


  const nextSlide3 = () => setStartIndex((prev) => (prev + 3) % upcomingShows.length);
  const prevSlide3 = () => setStartIndex((prev) => (prev - 3 + upcomingShows.length) % upcomingShows.length);

  const visibleShows = [
    upcomingShows[startIndex],
    upcomingShows[(startIndex + 1) % upcomingShows.length],
    upcomingShows[(startIndex + 2) % upcomingShows.length]
  ];

  const dotCount = Math.ceil(upcomingShows.length / 3);
  const currentDot = Math.floor(startIndex / 3);

  return (
    <section id="shows" className="bg-black py-20 px-6 max-w-7xl mx-auto text-white">
      <div className="flex justify-between items-end mb-10">
        <h2 className="text-4xl font-extrabold text-purple-400 tracking-wide uppercase">Upcoming Shows</h2>
        <Link to="/shows" className="text-green-400 text-lg font-semibold hover:underline">
          View All Tour Dates →
        </Link>
      </div>

      <div ref={containerRef} className="relative" onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
        <button onClick={prevSlide} className="hidden sm:block absolute -left-8 top-1/2 transform -translate-y-1/2 z-10 text-white text-4xl hover:text-green-400 transition">
          ‹
        </button>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {visibleShows.map((show, index) => (
            <div
              key={index}
              className="relative bg-gray-900/70 border border-purple-800 rounded-2xl shadow-[0_0_30px_rgba(128,0,128,0.3)] hover:shadow-purple-600 transition duration-300 overflow-hidden h-[30rem] flex flex-col justify-end p-6 cursor-pointer backdrop-blur-md transform hover:scale-[1.03]"
              style={{
                backgroundImage: `url(${show.thumbnail || show.poster})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            >
              <Link to={`/shows/${show.slug}`} onClick={(e) => e.stopPropagation()} className="absolute inset-0 z-20" />
              <div className="bg-gradient-to-t from-black via-black/50 to-transparent p-4 rounded-xl">
                <h3 className="text-green-400 text-sm font-bold uppercase tracking-widest mb-1">{show.date}</h3>
                <p className="text-white text-xl font-extrabold leading-snug tracking-wide">{show.location}, <br />{show.city}</p>
                <p className="mt-2 text-xs text-gray-300 italic">{show.notes}</p>
                {show.ticketLink && !show.soldOut && (
                  <a
                    href={show.ticketLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-block text-sm font-semibold text-green-400 hover:text-green-300 underline"
                    onClick={(e) => e.stopPropagation()}
                  >
                    Get Tickets →
                  </a>
                )}
                {show.soldOut && (
                  <span className="mt-3 inline-block text-sm font-semibold text-red-500">SOLD OUT</span>
                )}
                {!show.ticketLink && !show.soldOut && (
                  <p className="text-yellow-400 text-sm italic mt-2">
                    {show.ticketNote || 'Tickets Unavailable'}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>

        <button onClick={nextSlide} className="hidden sm:block absolute -right-8 top-1/2 transform -translate-y-1/2 z-10 text-white text-4xl hover:text-green-400 transition">
          ›
        </button>

        <div className="flex justify-center gap-2 mt-8">
          {Array.from({ length: dotCount }).map((_, idx) => (
            <button
              key={idx}
              className={`w-3 h-3 ${currentDot === idx ? 'bg-green-400 shadow shadow-green-500/30' : 'bg-purple-800/70'} rounded transition-all`}
              onClick={() => setStartIndex(idx * 3)}
            ></button>
          ))}
        </div>
      </div>

    </section>
  );
}