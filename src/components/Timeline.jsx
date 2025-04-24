// Timeline.jsx
import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const timelineData = [
  {
    year: '2021',
    title: 'El Diablo',
    description: 'After meticulous and an extremely selective audition process, the initial lineup meets at El Diablo for ',
    link: '#',
    events: [
      { date: 'May 22', title: 'Video Release', desc: 'Released "Neon Godzilla" video.', link: '#' },
      { date: 'Jul 1', title: '500K Views', desc: 'Video hits major milestone.', link: '#' }
    ]
  },
  {
    year: '2023',
    title: 'First Tour',
    description: 'Launched our first tour across the East Coast.',
    link: '#',
    events: [
      { date: 'Apr 4', title: 'Tour Kickoff', desc: 'Started tour in Philly.', link: '#' },
      { date: 'May 5', title: 'Tour Wrap', desc: 'Final show in Boston.', link: '#' }
    ]
  },
  {
    year: '2024',
    title: 'Full Album Release',
    description: 'Released our first full-length album, "Cosmic Crunch".',
    link: '#',
    events: [
      { date: 'Jan 1', title: 'Album Announcement', desc: 'Announced "Cosmic Crunch".', link: '#' },
      { date: 'Mar 20', title: 'Album Drop', desc: 'Released the full album.', link: '#' }
    ]
  }
];export default function Timeline() {
  const [activeYear, setActiveYear] = useState(null);
  const [expanded, setExpanded] = useState(false);
  const scrollRef = useRef(null);
  const subTimelineRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: direction === 'left' ? -300 : 300, behavior: 'smooth' });
    }
  };

  const toggleYear = (year) => {
    if (activeYear === year) {
      setExpanded(false);
      setTimeout(() => setActiveYear(null), 300);
    } else {
      setActiveYear(year);
      setExpanded(true);
    }
  };

  useEffect(() => {
    if (expanded && subTimelineRef.current) {
      const timeout = setTimeout(() => {
        subTimelineRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 300);
      return () => clearTimeout(timeout);
    }
  }, [expanded]);

  return (
    <div className="relative">
      <div className="w-full max-w-full px-2 relative z-20 overflow-visible">
        <div className="relative h-0">
          <button onClick={() => scroll('left')} className="absolute -left-12 top-[75px] z-30 text-white hover:text-green-400 p-2">
            <ChevronLeft size={36} />
          </button>
          <button onClick={() => scroll('right')} className="absolute -right-12 top-[75px] z-30 text-white hover:text-green-400 p-2">
            <ChevronRight size={36} />
          </button>
        </div>

        <div
          ref={scrollRef}
          className="flex space-x-8 px-2 overflow-x-auto overflow-y-hidden [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {timelineData.map((event, index) => (
            <div
              key={index}
              className={`min-w-[200px] rounded-xl p-4 transition-all duration-300 border-y-0 border-l-2 border-r-2 z-0
                ${activeYear === event.year
                  ? 'bg-purple-900 border-green-400 ring-2 ring-green-300 shadow-xl scale-[1.02]'
                  : 'bg-gray-800 border-purple-700 hover:bg-purple-800 shadow-md'}
              `}
            >
              <button
                className="text-left w-full"
                onClick={() => toggleYear(event.year)}
              >
                <h4 className="text-xl text-green-400 font-bold">{event.year}</h4>
                <h5 className="text-lg font-semibold mb-2">{event.title}</h5>
                <p className="text-sm mb-3">{event.description}</p>
                <span className="text-sm text-purple-300 underline">See more</span>
              </button>
            </div>
          ))}
        </div>
      </div>

      <div
        ref={subTimelineRef}
        className={`transition-all duration-500 ease-in-out overflow-hidden ${expanded ? 'max-h-[1000px] opacity-100 mt-8' : 'max-h-0 opacity-0 mt-0'}`}
      >
        {activeYear && (
          <div className="border-t border-purple-600 pt-6">
            <h4 className="text-2xl text-purple-300 font-bold mb-4">Milestones in {activeYear}</h4>
            <div className="flex space-x-8 px-2 overflow-x-auto overflow-y-hidden [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {timelineData.find((e) => e.year === activeYear)?.events.map((sub, idx) => (
                <div
                  key={idx}
                  className="min-w-[250px] bg-gray-900 border-y-0 border-l-2 border-r-2 border-purple-700 rounded-lg p-4 shadow-md transition-all duration-200 hover:bg-purple-800 hover:border-green-400"
                >
                  <h5 className="text-green-400 font-semibold">{sub.date}</h5>
                  <p className="text-sm font-bold mb-1">{sub.title}</p>
                  <p className="text-xs mb-2">{sub.desc}</p>
                  <a href={sub.link} className="text-sm text-purple-300 underline hover:text-white">View</a>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}