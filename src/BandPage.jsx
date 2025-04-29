
              
              import React from 'react';
              import Timeline from "./components/Timeline.jsx";
              import PageHero from './PageHero.jsx';
              
              export default function BandPage() {
                const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;

                return (
                   <main className="min-h-screen bg-black text-white font-sans">
                     {/* Hero with centered "About Us" and subtitle */}
                     <section className="relative h-screen w-full">
                     <PageHero
  image={isMobile ? "/mobilebandhero.webp" : "/band.webp"}
  gradientClass="bg-gradient-to-b from-transparent via-black/30 to-black"
  imageClass="object-center brightness-50 scale-105 transition duration-[2000ms]"
  minHeight="min-h-[200vh]"
  titleColor="purple"
  titleFont="font-sans font-extrabold tracking-normal"
/>
                     <div className="absolute inset-0 flex flex-col items-center justify-center text-center z-10 px-4">
          <h1 className="text-5xl md:text-6xl font-extrabold text-purple-200 drop-shadow-[0_0_40px_rgba(192,132,252,0.6)] mb-4 uppercase tracking-wide">
            ABOUT US
          </h1>
          <p className="text-purple-400 text-2xl md:text-2xl italic tracking-wide drop-shadow-[0_0_25px_rgba(0,255,0,0.3)] opacity-90">shh...</p>
        </div>
                    </section>
              
                    {/* Main content pushed slightly lower */}
                    <div className="mt-[200px] relative z-10 px-6 pt-20 pb-24">
                    <section className="max-w-4xl mx-auto mb-20">
                        <h2 className="text-4xl md:text-5xl font-bold text-purple-400 mb-6 text-center drop-shadow">
                          Tales Of the Beast
                        </h2>
                        <p className="text-lg text-purple-200 mb-4 leading-relaxed">
                        Vanylla Godzylla is THE rock band from University of Delaware. Formed in the stomach of Main Street (El Diablo) and refined in the heart (Deer Park Tavern), we've cut our teeth playing sweaty, chaotic basement shows and raucous backyard parties, where the ceiling would sweat almost as much as the crowd. Now, we're working to earn a reputation as one of the hardest-hitting bands to come out of the region.

                        </p>
                        <p className="text-lg text-purple-200 leading-relaxed">
                          Our story is packed with wild gigs, weird stories, and moments that shaped us. Below is a glimpse into our journey.
                        </p>
                      </section>
              
                      <section className="max-w-6xl mx-auto">
                        <h3 className="text-3xl md:text-4xl font-semibold text-green-400 mb-8 text-center drop-shadow">
                          Band Timeline
                        </h3>
                        <Timeline />
                      </section>
                    </div>
              
                    <footer className="bg-black py-6 text-center text-sm text-gray-500">
                      <p>© 2025 Vanylla Godzylla. All rights reserved.</p>
                      <p>
  Follow us: 
  <a
    href="https://instagram.com/vanylla.godzylla"
    className="text-pink-400 ml-1"
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
            
              