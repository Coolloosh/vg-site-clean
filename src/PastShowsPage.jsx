import React from 'react';
import { Link } from 'react-router-dom';
import PageHero from './PageHero';
import { showData } from './videoData';

// Sort pastShows by descending date
const pastShows = Object.entries(showData)
  .filter(([, data]) => data.date)
  .map(([slug, data]) => ({
    slug,
    date: data.date,
    location: data.location,
    venue: data.title,
    notes: 'Click to view photos & videos',
    poster: data.poster,
  }))
  .sort((a, b) => new Date(b.date) - new Date(a.date));

export default function PastShowsPage() {
  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;
  return (
    <main className="min-h-screen bg-black text-white font-sans">
      <PageHero
        image="/pastshows.webp"
        title="Past Shows"
        subtitle={
          <span className="text-purple-400 text-2xl md:text-2xl italic tracking-wide drop-shadow-[0_0_25px_rgba(0,255,0,0.3)] animate-fade-in-slow opacity-90">
            where we've been...
          </span>
        }
        gradientClass="bg-gradient-to-b from-transparent via-black/30 to-black"
        titleColor="purple"
        titleFont="font-sans font-extrabold tracking-normal"
      />

      <div className="min-h-screen bg-black text-white px-6 py-12 max-w-7xl mx-auto font-sans">
        <h1 className="text-5xl font-extrabold text-purple-300 mb-14 text-center drop-shadow-[0_0_15px_rgba(192,132,252,0.3)]">
          Shows Archive
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {pastShows.map((show) => (
            <Link
              key={show.slug}
              to={`/shows/${show.slug}`}
              className={`bg-gray-900 rounded-2xl border border-purple-700 shadow-xl overflow-hidden group transition ${
                !isMobile ? 'hover:shadow-purple-600 hover:-translate-y-1' : ''
              }`}
            >
              <img
                src={show.poster}
                alt={`${show.venue} flyer`}
                className={`w-full h-64 object-cover transition-transform duration-300 ${
                  !isMobile ? 'group-hover:scale-105' : ''
                }`}
              />
              <div className="p-5">
                <h3 className="text-green-400 text-xl font-bold mb-1">{show.date}</h3>
                <p className="text-white text-lg font-semibold">
                  {show.venue + " - " + show.location}
                </p>
                <p className="text-sm text-purple-300 mt-2 italic">{show.notes}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <footer className="bg-black py-6 text-center text-sm text-gray-500">
        <p>© 2025 Vanylla Godzylla. All rights reserved.</p>
        <p>
          Follow us:
          <a href="https://instagram.com/vanylla.godzylla" className="hover:text-pink-400 ml-1">
            Instagram
          </a>{' '}•
          <a href="#" className={`ml-1 transition ${!isMobile ? 'hover:text-blue-400' : ''}`}>
            Facebook
          </a>{' '}•
          <a href="https://www.youtube.com/@vanyllagodzylla1282" className={`ml-1 transition ${!isMobile ? 'hover:text-red-500' : ''}`}>
            YouTube
          </a>
        </p>
      </footer>
    </main>
  );
}
