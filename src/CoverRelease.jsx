// CoverRelease.jsx (Updated with styling to match album releases)
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import PageHero from './PageHero';
import { coverReleases } from './musicData';


const coverData = {
  "creep": {
    title: "Creep",
    originalArtist: "Radiohead",
    youtubeId: "abcd1234",
  },
  "dreams": {
    title: "Dreams",
    originalArtist: "Fleetwood Mac",
    youtubeId: "efgh5678",
  },
  "master-of-puppets": {
    title: "Master of Puppets",
    originalArtist: "Metallica",
    youtubeId: "ijkl9012",
  },
};

export default function CoverRelease() {
  const { coverId } = useParams();
  const cover = coverReleases.find((c) => c.id === coverId);

  if (!cover) return <div className="text-white p-6">Cover not found.</div>;

  return (
    <main className="min-h-screen bg-black text-white font-sans overflow-x-hidden">
      <PageHero
        image="/shows4.JPG"
        title={cover.title}
        subtitle={<span className="text-purple-400 italic text-xl">Originally by {cover.originalArtist}</span>}
        gradientClass="bg-gradient-to-b from-transparent via-black/30 to-black"
        titleColor="purple"
        titleFont="font-sans font-extrabold tracking-tight"
      />

      <section className="max-w-4xl mx-auto py-16 px-6">
        <div className="rounded-xl overflow-hidden border border-purple-700 shadow-2xl">
          <iframe
            src={`https://www.youtube.com/embed/${cover.youtubeId}`}
            title={cover.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full aspect-video"
          />
        </div>

        <div className="mt-10 text-center">
          <Link
            to="/music"
            className="inline-block text-green-400 hover:text-purple-300 font-bold text-lg border border-green-400 hover:border-purple-300 px-6 py-3 rounded-full transition"
          >
            ← Back to Music Catalog
          </Link>
        </div>
      </section>

      <footer className="bg-black py-6 text-center text-sm text-gray-500">
        <p>© 2025 Vanylla Godzylla. All rights reserved.</p>
        <p>
          Follow us:
          <a href="https://instagram.com/vanylla.godzylla" className="text-pink-400 ml-1 hover:underline">Instagram</a> •
          <a href="#" className="ml-1 hover:text-blue-400">Facebook</a> •
          <a href="https://www.youtube.com/@vanyllagodzylla1282" className="ml-1 hover:text-red-500">YouTube</a>
        </p>
      </footer>
    </main>
  );
}