// AlbumPromo — Vanylla Godzylla styled audio player
import React, { useState, useRef, useEffect } from 'react';

const tracks = [
  { title: 'Cocaine', file: 'song1.mp3' },
  { title: 'Two Weeks Past', file: 'song2.mp3' },
  { title: 'Flies of Desire', file: 'song3.mp3' }
];

function AlbumPromo() {
  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playerVisible, setPlayerVisible] = useState(false);
  const [playerCollapsed, setPlayerCollapsed] = useState(false);
  const audioRef = useRef(null);

  const playTrack = (index) => {
    if (audioRef.current) audioRef.current.pause();
    audioRef.current = new Audio(tracks[index].file);
    audioRef.current.play();
    setCurrentTrackIndex(index);
    setIsPlaying(true);
    setPlayerVisible(true);
    setPlayerCollapsed(false);
    audioRef.current.onended = () => setIsPlaying(false);
  };

  const togglePlayPause = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const playNext = () => {
    const next = (currentTrackIndex + 1) % tracks.length;
    playTrack(next);
  };

  const playPrev = () => {
    const prev = (currentTrackIndex - 1 + tracks.length) % tracks.length;
    playTrack(prev);
  };

  const closePlayer = () => {
    if (audioRef.current) audioRef.current.pause();
    setIsPlaying(false);
    setPlayerVisible(false);
  };

  useEffect(() => {
    return () => {
      if (audioRef.current) audioRef.current.pause();
    };
  }, []);

  return (
    <>
      <section id="album" className="relative w-full bg-gradient-to-b from-black via-gray-950 to-black py-24 px-6 border-t border-purple-800 shadow-inner">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="text-center md:text-left">
            <h2 className="text-5xl md:text-6xl font-extrabold text-green-400 drop-shadow mb-4">
              New Album Out Now
            </h2>
            <p className="text-xl text-purple-300 mb-6 max-w-md">
              <em>Where The Angels Burn</em> is here. Stream it now and feel the fire.
            </p>
            <a
              href="https://open.spotify.com/album/2138PDwIbHrWitAecJMAz3"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-green-500 hover:bg-green-400 text-black px-6 py-3 rounded-full font-bold shadow-md transition"
            >
              Listen on Spotify
            </a>
          </div>

          <div className="flex justify-center">
          <div
  onClick={() => {
    const random = Math.floor(Math.random() * tracks.length);
    playTrack(random);
  }}
  className={`w-full max-w-md rounded-2xl overflow-hidden border border-purple-800 shadow-2xl cursor-pointer transform transition-transform duration-300 ${
    !isMobile ? 'hover:scale-105 hover:shadow-purple-500' : ''
  }`}
>
  <img
    src="/album.jpeg"
    alt="Where The Angels Burn Album Art"
    className="w-full object-cover h-auto"
  />
</div>
          </div>
        </div>
      </section>

      {playerVisible && (
        <div
          className={`fixed bottom-6 right-6 bg-gradient-to-br from-gray-950 via-black to-black border border-green-700 text-white rounded-2xl shadow-[0_0_20px_rgba(0,255,0,0.3)] z-50 transition-all duration-500 w-[300px] overflow-hidden`}
        >
          {playerCollapsed ? (
            <button
              onClick={() => setPlayerCollapsed(false)}
              className="w-full h-10 flex items-center justify-center text-purple-400 hover:text-green-400 text-sm font-semibold tracking-widest"
            >
               V.G. RADIO
            </button>
          ) : (
            <>
              <div className="flex justify-between items-center px-5 pt-4">
                <span className="text-green-400 text-sm font-bold tracking-wide uppercase">
                {tracks[currentTrackIndex].title}
                </span>
                <button
                  onClick={closePlayer}
                  className="text-purple-400 text-lg font-bold hover:text-red-500 transition"
                >
                  ×
                </button>
              </div>
              <div className="flex items-center justify-center gap-6 py-4">
                <button
                  onClick={playPrev}
                  className="bg-gradient-to-r from-purple-800 to-purple-600 hover:from-purple-600 hover:to-purple-800 text-white text-base px-3 py-2 rounded-full shadow-md hover:shadow-purple-500 transition font-bold"
                >
                  ‹‹
                </button>
                <button
                  onClick={togglePlayPause}
                  className="bg-gradient-to-r from-green-600 to-green-400 hover:from-green-500 hover:to-green-300 text-black text-xl px-5 py-3 rounded-full shadow-lg hover:shadow-green-500 transition font-black tracking-wider"
                >
                  <span className="relative z-10">{isPlaying ? '❚❚' : <span className=" leading-none">&#9655;</span>}</span>
                </button>
                <button
                  onClick={playNext}
                  className="bg-gradient-to-r from-purple-800 to-purple-600 hover:from-purple-600 hover:to-purple-800 text-white text-base px-3 py-2 rounded-full shadow-md hover:shadow-purple-500 transition font-bold"
                >
                  ››
                </button>
              </div>
              <button
                onClick={() => setPlayerCollapsed(true)}
                className="w-full text-purple-400 hover:text-green-400 text-xs py-2 border-t border-green-700 bg-black/80 tracking-widest"
              >
                ▼ Collapse
              </button>
            </>
          )}
        </div>
      )}
    </>
  );
}


export default AlbumPromo;







