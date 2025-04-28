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
  const [barMode, setBarMode] = useState("photos");
  const [fadeClass, setFadeClass] = useState("opacity-100");
  const [touchStartX, setTouchStartX] = useState(null);
  const [visibleColumns, setVisibleColumns] = useState(3);
  const scrollRefPhoto = useRef(null);
  const scrollRefVideo = useRef(null);
  const isPhotos = mode === 'photos';
  const scrollRef = isPhotos ? scrollRefPhoto : scrollRefVideo;
  const items = isPhotos ? galleryImages : allVideoIds;
  const itemsPerColumn = 2;
  const totalColumns = Math.ceil(items.length / itemsPerColumn);
  const scrollSteps = Math.max(1, totalColumns - visibleColumns + 1);

  useEffect(() => {
    const updateColumns = () => {
      const container = scrollRef.current;
      if (!container) return;
      const containerWidth = container.offsetWidth;
      const cardWidth = container.scrollWidth / totalColumns;
      const visibleCols = Math.floor(containerWidth / cardWidth);
      setVisibleColumns(Math.max(1, visibleCols));

      const handleScroll = () => {
        const columnWidth = container.scrollWidth / totalColumns;
        const index = Math.round(container.scrollLeft / columnWidth);
        if (isPhotos) setColumnIndexPhoto(index);
        else setColumnIndexVideo(index);
      };

      container.addEventListener('scroll', handleScroll);
      return () => container.removeEventListener('scroll', handleScroll);
    };

    const handleResize = () => {
      updateColumns();
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
    const newIndex = Math.max(0, Math.min(currentIndex + (direction === 'left' ? -1 : 1), scrollSteps - 1));
    if (isPhotos) setColumnIndexPhoto(newIndex);
    else setColumnIndexVideo(newIndex);
    scrollToColumn(newIndex);
  };

  const handleModeChange = (newMode) => {
    setFadeClass("opacity-0");
    setBarMode("neutral");
    setMode(newMode);
    setTimeout(() => {
      setBarMode(newMode);
      setTimeout(() => {
        setFadeClass("opacity-100");
      }, 100);
    }, 10);
  };

  const handleTouchStartMain = (e) => {
    setTouchStartX(e.changedTouches[0].clientX);
  };

  const handleTouchEndMain = (e) => {
    const endX = e.changedTouches[0].clientX;
    const deltaX = endX - touchStartX;

    if (Math.abs(deltaX) > 50) {
      if (deltaX < 0) scroll('right');
      else scroll('left');
    }
  };

  return (
    <section id="gallery" className="bg-black py-20 px-4 sm:px-6 max-w-7xl mx-auto border-t border-purple-800/40">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <h2 className="hidden sm:block text-4xl font-extrabold text-purple-400 tracking-wide uppercase text-left">Gallery</h2>

        <div className="w-full flex sm:hidden justify-between items-center">
          <div className="flex items-center border border-purple-800 rounded-md bg-gradient-to-br from-gray-950 via-black to-gray-900 shadow-inner shadow-purple-900 backdrop-blur-sm overflow-hidden">
            <button
              onClick={() => handleModeChange("photos")}
              className={`px-4 py-2 text-sm font-bold uppercase tracking-wider transition-all duration-200 ${isPhotos ? "bg-purple-700 text-green-300 shadow-inner" : "text-purple-400 hover:text-white"}`}
            >
              Photos
            </button>
            <div className="w-px bg-purple-600 opacity-50 h-5" />
            <button
              onClick={() => handleModeChange("videos")}
              className={`px-4 py-2 text-sm font-bold uppercase tracking-wider transition-all duration-200 ${!isPhotos ? "bg-purple-700 text-green-300 shadow-inner" : "text-purple-400 hover:text-white"}`}
            >
              Videos
            </button>
          </div>

          <Link
            to={isPhotos ? "/gallery/photos" : "/gallery/videos"}
            className="text-green-400 hover:text-green-300 text-sm font-semibold tracking-wide transition ml-4"
          >
            {isPhotos ? "More Photos →" : "More Videos →"}
          </Link>
        </div>

        <div className="hidden sm:flex justify-between items-center w-full">
          <div className="w-1/3" />
          <div className="flex justify-center w-1/3 pr-6">
            <div className="flex items-center border border-purple-800 rounded-md bg-gradient-to-br from-gray-950 via-black to-gray-900 shadow-inner shadow-purple-900 backdrop-blur-sm overflow-hidden -ml-40">
              <button
                onClick={() => handleModeChange("photos")}
                className={`px-4 py-2 text-sm font-bold uppercase tracking-wider transition-all duration-200 ${isPhotos ? "bg-purple-700 text-green-300 shadow-inner" : "text-purple-400 hover:text-white"}`}
              >
                Photos
              </button>
              <div className="w-px bg-purple-600 opacity-50 h-5" />
              <button
                onClick={() => handleModeChange("videos")}
                className={`px-4 py-2 text-sm font-bold uppercase tracking-wider transition-all duration-200 ${!isPhotos ? "bg-purple-700 text-green-300 shadow-inner" : "text-purple-400 hover:text-white"}`}
              >
                Videos
              </button>
            </div>
          </div>
          <div className="flex justify-end w-1/3">
            <Link
              to={isPhotos ? "/gallery/photos" : "/gallery/videos"}
              className="text-green-400 hover:text-green-300 text-sm sm:text-base font-semibold tracking-wide transition"
            >
              {isPhotos ? "More Photos →" : "More Videos →"}
            </Link>
          </div>
        </div>
      </div>

      <div onTouchStart={handleTouchStartMain} onTouchEnd={handleTouchEndMain} className="relative bg-gradient-to-b from-black via-gray-950 to-black p-4 rounded-2xl shadow-2xl border border-purple-900/50">
        <div ref={scrollRefPhoto} className={`overflow-x-hidden overflow-y-hidden [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden transition-opacity duration-500 ${isPhotos ? fadeClass + ' block' : 'hidden'}`}>
          <div className="flex w-max gap-6">
            {galleryImages.map((img, idx) => (
              <div key={idx} className="flex flex-col gap-2 w-[380px] flex-shrink-0">
                <div className="h-48 cursor-pointer">
                  <img
                    src={img.src}
                    alt={img.caption}
                    className="rounded-xl object-cover h-full w-full border border-purple-800 shadow-md hover:shadow-purple-600 hover:scale-[1.03] transition-transform duration-300 ease-out"
                  />
                  <p className="text-purple-300 text-center mt-2 text-sm">{img.caption}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div ref={scrollRefVideo} className={`overflow-x-hidden overflow-y-hidden [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden transition-opacity duration-500 ${!isPhotos ? fadeClass + ' block' : 'hidden'}`}>
          <div className="flex w-max gap-6">
            {allVideoIds.map((vid, idx) => (
              <div key={idx} className="flex flex-col gap-2 w-[380px] flex-shrink-0">
                <div className="h-48 cursor-pointer">
                  <iframe
                    src={`https://www.youtube.com/embed/${vid}`}
                    title={`Video ${idx}`}
                    className="w-full h-full rounded-xl border border-purple-800 shadow-md"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-between items-center mt-6">
          <div className="relative flex-1 h-2 bg-purple-800 rounded-full overflow-hidden flex cursor-pointer">
            {(barMode === "photos" ? galleryImages : allVideoIds).slice(0, scrollSteps).map((_, i) => (
              <div
                key={i}
                className={`transition-all duration-300 h-full ${i === (isPhotos ? columnIndexPhoto : columnIndexVideo) ? 'bg-green-400 shadow shadow-green-500/30' : 'bg-purple-800'} flex-1`}
                onClick={() => {
                  if (isPhotos) setColumnIndexPhoto(i);
                  else setColumnIndexVideo(i);
                  scrollToColumn(i);
                }}
              />
            ))}
          </div>
          <div className="hidden sm:flex gap-4 ml-4">
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
        </div>
      </div>
    </section>
  );
}
