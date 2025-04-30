import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import PageHero from './PageHero';
import { videoGalleries } from './videoData';


const videoGalleryData = {
  "deer-park-3-7": {
    title: "Live at Deer Park",
    heroImage: "/band2.webp",
    videos: [
      { id: "n7u4uDErGx4"},
      { id: "6ibyAyEUBaI" },
      { id: "XRWI3JZr-oY" },
      { id: "4QrozbzBDZw"},
      { id: "Pk15vTlhkPs" },
      { id: "Mdfz0747jPQ"},
      { id: "47At1VIU0aQ" },
      { id: "HNluM8BVYMY"},
      { id: "Ap0LqNnPl2M" },
      { id: "zFt7T11sSb0" },
      { id: "3jb0-me2Ukc"},
      { id: "XqYa3la-Mv4" },
      { id: "erNMYMCVqwo" },
      { id: "jt5VT5a-Cqw"},
      { id: "H0Xzyqsf83I" },
      { id: "f8tvhMr0QcA" },
      { id: "QZIxEy1jUHY" },
      { id: "ry6CEWvaOR0"},
      { id: "vXufkCqhFbM" },
      { id: "tzu_C7VeHHA" },
      { id: "jeeloZJ6bCs"},
      { id: "1ZKG-lNnwF0" },
      { id: "DWYGrfQdEyY"},
      { id: "evwPV-l6SaQ" },
      { id: "OFNiFW6X5bs" },
      { id: "cAoCIGsDLOY"},
      { id: "lU-Ttx8YxcU" },
      { id: "KTRabY1d8Rc"},
      { id: "cmPlzl-RmFw" },
      { id: "TeH0aucLAJc" },
      { id: "31vzVVi7YRY"},
      { id: "rR2_uP29220" },
      { id: "_6cj5js-5xA" },
      { id: "TsNN5lmJF20"},
      { id: "kDnWD7Y2fwE" },
      { id: "_7epDe7eZqg"},
    ]
  },
 
};

export default function VideoGalleryDetail() {
  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;
  const { slug } = useParams();
  const [visibleCount, setVisibleCount] = useState(4);
  const loadRef = useRef(null);

  const gallery = videoGalleries[slug];
  const { title, heroImage, videos } = gallery || {};

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisibleCount((prev) => Math.min(prev + 4, videos.length));
        }
      },
      { threshold: 0.5 }
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
                    image={heroImage}
                    title={title}
                   
                  
               
              ></PageHero>

      <section className="max-w-6xl mx-auto py-15 px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
          {videos.slice(0, visibleCount).map((id, i) => (
  <div key={i} className="rounded-xl border border-purple-700 shadow-lg overflow-hidden bg-gray-950">
    <iframe
      src={`https://www.youtube.com/embed/${id}`}
      title={`Video ${i + 1}`}
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      className="w-full aspect-video"
    ></iframe>
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
