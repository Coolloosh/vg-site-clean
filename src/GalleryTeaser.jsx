import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const galleryImages = [
  { src: "/gal1.jpeg", caption: "Live at The Void" },
  { src: "/gal2.JPG", caption: "Backstage Mayhem" },
  { src: "/gal3.JPG", caption: "Monster Riff Night" },
  { src: "/gal4.jpg", caption: "Green Room Glow" },
  { src: "/gal5.JPG", caption: "Festival Chaos" },
  { src: "/gal6.jpg", caption: "Purple Reign" },
  { src: "/gallery7.jpg", caption: "Encore Madness" },
  { src: "/gallery8.jpg", caption: "Wall of Sound" },
  { src: "/gallery9.jpg", caption: "Stomp Night" },
  { src: "/gallery10.jpg", caption: "Neon Rage" }
];

const allVideoIds = [
  "9zDsu2xnZ4o", "y24aql36I58", "E9J-QLXUmXU", "I1LZYzhfbrY",
  "gONeV8E1lJ8", "YykjpeuMNEk", "kXYiU_JCYtU", "E9J-QLXUmXU",
  "I1LZYzhfbrY", "gONeV8E1lJ8", "YykjpeuMNEk", "kXYiU_JCYtU", "ktvTqknDobU"
];
export default function GalleryTeaser() {
  const [mode, setMode] = useState("photos");
  const [columnIndexPhoto, setColumnIndexPhoto] = useState(0);
  const [columnIndexVideo, setColumnIndexVideo] = useState(0);
  const [fadeClass, setFadeClass] = useState("opacity-100");
  const scrollRefPhoto = useRef(null);
  const scrollRefVideo = useRef(null);
  const [touchStartX, setTouchStartX] = useState(null);

  const isPhotos = mode === 'photos';
  const scrollRef = isPhotos ? scrollRefPhoto : scrollRefVideo;
  const items = isPhotos ? galleryImages : allVideoIds;
  const itemsPerColumn = 2;
  const totalColumns = Math.ceil(items.length / itemsPerColumn);

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [visibleColumns, setVisibleColumns] = useState(3);

  useEffect(() => {
    const updateColumns = () => {
      const container = scrollRef.current;
      if (container) {
        const containerWidth = container.offsetWidth;
        const cardWidth = container.scrollWidth / totalColumns;
        const visibleCols = Math.floor(containerWidth / cardWidth);
        setVisibleColumns(Math.max(1, visibleCols));
      }
    };

    const handleResize = () => {
      updateColumns();
      setWindowWidth(window.innerWidth);
    };

    updateColumns();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [mode]);

  const scrollToColumn = (index) => {
    const container = scrollRef.current;
    if (container) {
      const columnWidth = container.scrollWidth / totalColumns;
      container.scrollTo({ left: columnWidth * index, behavior: 'smooth' });
    }
  };

  const scroll = (direction) => {
    const currentIndex = isPhotos ? columnIndexPhoto : columnIndexVideo;
    const maxIndex = Math.max(0, totalColumns - visibleColumns);
    const newIndex = Math.max(0, Math.min(currentIndex + (direction === 'left' ? -1 : 1), maxIndex));
    if (isPhotos) {
      setColumnIndexPhoto(newIndex);
    } else {
      setColumnIndexVideo(newIndex);
    }
    scrollToColumn(newIndex);
  };

  const handleTouchStart = (e) => setTouchStartX(e.touches[0].clientX);

  const handleTouchEnd = (e) => {
    if (touchStartX !== null) {
      const touchEndX = e.changedTouches[0].clientX;
      const deltaX = touchStartX - touchEndX;
      if (Math.abs(deltaX) > 50) {
        scroll(deltaX > 0 ? 'right' : 'left');
      }
      setTouchStartX(null);
    }
  };

  return (
    <section id="gallery" className="bg-black py-20 px-6 max-w-7xl mx-auto border-t border-purple-800/40">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-4xl font-extrabold text-purple-400 tracking-wide uppercase">Gallery</h2>
        <Link
          to={isPhotos ? "/gallery/photos" : "/gallery/videos"}
          className="text-green-400 hover:text-green-300 text-lg font-semibold tracking-wide transition"
        >
          {isPhotos ? "More Photos →" : "More Videos →"}
        </Link>
      </div>

      <div
        className="relative bg-gradient-to-b from-black via-gray-950 to-black p-4 rounded-2xl shadow-2xl border border-purple-900/50"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div
          ref={scrollRefPhoto}
          className={`overflow-x-auto overflow-y-hidden hide-scrollbar transition-opacity duration-500 ${isPhotos ? fadeClass : 'hidden'}`}
        >
          <div className="flex w-max gap-6">
            {Array.from({ length: totalColumns }, (_, colIndex) => (
              <div key={colIndex} className="flex flex-col gap-6 w-[380px] flex-shrink-0">
                {[0, 1].map((rowIndex) => {
                  const item = galleryImages[colIndex * 2 + rowIndex];
                  return item ? (
                    <div key={rowIndex} className="h-48 cursor-pointer">
                      <img
                        src={item.src}
                        alt={item.caption}
                        className="rounded-xl object-cover h-full w-full border border-purple-800 shadow-md hover:shadow-purple-600 hover:scale-[1.03] transition-transform duration-300 ease-out"
                      />
                      <p className="text-purple-300 text-center mt-2 text-sm">{item.caption}</p>
                    </div>
                  ) : null;
                })}
              </div>
            ))}
          </div>
        </div>

        <div
          ref={scrollRefVideo}
          className={`overflow-x-auto overflow-y-hidden hide-scrollbar transition-opacity duration-500 ${!isPhotos ? fadeClass : 'hidden'}`}
        >
          <div className="flex w-max gap-6">
            {Array.from({ length: totalColumns }, (_, colIndex) => (
              <div key={colIndex} className="flex flex-col gap-6 w-[380px] flex-shrink-0">
                {[0, 1].map((rowIndex) => {
                  const video = allVideoIds[colIndex * 2 + rowIndex];
                  return video ? (
                    <div key={rowIndex} className="h-48">
                      <iframe
                        src={`https://www.youtube.com/embed/${video}`}
                        title={`Video ${colIndex * 2 + rowIndex + 1}`}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="w-full h-full rounded-xl border border-purple-800 shadow-md"
                      ></iframe>
                    </div>
                  ) : null;
                })}
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-center items-center mt-6">
          <div className="relative flex-1 h-2 bg-purple-800 rounded-full overflow-hidden flex">
            {(isPhotos ? galleryImages : allVideoIds).slice(0, totalColumns).map((_, i) => (
              <div
                key={i}
                className={`transition-all duration-300 h-full ${i === (isPhotos ? columnIndexPhoto : columnIndexVideo)
                  ? 'bg-green-400 shadow shadow-green-500/30'
                  : 'bg-purple-800'} flex-1`}
                onClick={() => {
                  if (isPhotos) {
                    setColumnIndexPhoto(i);
                  } else {
                    setColumnIndexVideo(i);
                  }
                  scrollToColumn(i);
                }}
              />
            ))}
          </div>
          {windowWidth > 768 && (
            <div className="flex gap-4 ml-4">
              <button
                onClick={() => scroll('left')}
                className="bg-gray-800 hover:bg-purple-700 text-purple-300 hover:text-white p-2 rounded-lg shadow-md transition-all"
              >
                <ChevronLeft size={22} />
              </button>
              <button
                onClick={() => scroll('right')}
                className="bg-gray-800 hover:bg-purple-700 text-purple-300 hover:text-white p-2 rounded-lg shadow-md transition-all"
              >
                <ChevronRight size={22} />
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
