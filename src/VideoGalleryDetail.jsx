import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import PageHero from './PageHero';

const videoGalleryData = {
  "deer-park-3-7": {
    title: "Live at Deer Park",
    heroImage: "/photos/deerpark3.jpg",
    videos: [
      { id: "lU-Ttx8YxcU", caption: "Opening riff, crowd hype" },
      { id: "jt5VT5a-Cqw", caption: "Mid-set solo section" },
      { id: "H0Xzyqsf83I", caption: "Encore performance" },
      { id: "4QrozbzBDZw", caption: "Crowd surfing moment" },
      { id: "n7u4uDErGx4", caption: "Final song breakdown" }
    ]
  },
  "music-video-mutant-parade": {
    title: "Mutant Parade Music Video",
    heroImage: "/videos/mutant-parade-thumb.jpg",
    videos: [
      { id: "YykjpeuMNEk", caption: "Directed by Lex | Shot in Newark" }
    ]
  }
};

export default function VideoGalleryDetail() {
  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;
  const { slug } = useParams();
  const [visibleCount, setVisibleCount] = useState(4);
  const loadRef = useRef(null);

  const gallery = videoGalleryData[slug];
  const { title, heroImage, videos } = gallery;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisibleCount((prev) => Math.min(prev + 4, videos.length));
        }
      },
      { threshold: 1.0 }
    );

    if (loadRef.current && visibleCount < videos.length) {
      observer.observe(loadRef.current);
    }

    return () => {
      if (loadRef.current) observer.unobserve(loadRef.current);
    };
  }, [visibleCount, videos.length]);

  return (
    <main className="min-h-screen bg-black text-white font-sans overflow-x-hidden">
       <PageHero
                    image="/shows4.JPG"
                    title={title}
                   
                  
               
              ></PageHero>

      <section className="max-w-6xl mx-auto py-15 px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
          {videos.slice(0, visibleCount).map((video, i) => (
            <div key={i} className="rounded-xl border border-purple-700 shadow-lg overflow-hidden bg-gray-950">
              <iframe
                src={`https://www.youtube.com/embed/${video.id}`}
                title={`Video ${i + 1}`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full aspect-video"
              ></iframe>
              <p className="text-purple-300 text-sm px-4 py-2 text-center">{video.caption}</p>
            </div>
          ))}
        </div>
        <div ref={loadRef} className="h-12 mt-8 flex justify-center items-center text-purple-400 text-sm">
          {visibleCount < videos.length ? 'Loading more videos...' : 'All videos loaded'}
        </div>
        <div className="text-center pb-10">
        <Link
  to="/past-shows"
  className={`text-purple-400 px-6 font-bold text-lg transition ${
    !isMobile ? 'hover:underline' : ''
  }`}
>
  ← View Previous Shows
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
    </main>
  );
}
