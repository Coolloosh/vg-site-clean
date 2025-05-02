import ShowDetailPage from '../components/ShowDetailPage';
import DP from './deerpark.png';
import { videoGalleries } from '../videoData';
import React, { useState, useEffect, useRef } from 'react';


const photos = Array.from({ length: 878 }, (_, i) =>
  `/DP1129PHOTOS/Image${String(i + 1).padStart(2, '0')}.webp`
);

const setlist =[
   
    { title: "Rock And Roll", link: "https://www.youtube.com/watch?v=QVKVcALMHoY" },
    { title: "Teenage Dirtbag" },
    { title: "All The Small Things" },
    { title: "Enter Sandman", link: "https://www.youtube.com/watch?v=QVKVcALMHoY" },
    { title: "Circling Vultures" },
    { title: "Creep", link: "https://www.youtube.com/watch?v=QVKVcALMHoY" },
    { title: "Teenagers" },
    { title: "You Shook Me All Night Long" },
    { title: "Gives You Hell" },
    { title: "(Like It's) Cocaine", link: "https://www.youtube.com/watch?v=QVKVcALMHoY" },
    { title: "Zombie" },
    { title: "Creeping Death (ft. Tom)" },
    { title: "Cigarette Daydreams" },
    { title: "Air Raid" },
    { title: "Times Like These" },
    { title: "Sunday Morning",},
    { title: "American Idiot" },
    { title: "Nothing Left" },
    { title: "War Pigs" },
    { title: "Cult Of Personality" },
    { title: "Flagpole Sitta" },
    { title: "Beautiful Disaster",},
    { title: "Kilby Girl" },
    { title: "Sweet Home Alabama" },
    { title: "Everybody Talks" },
    { title: "FRM" },
    { title: "Sex On Fire" },
    { title: "Chop Suey",},
    { title: "My Own Inferno" },
    { title: "The Middle" },
    { title: "Digital Lemons" },
    { title: "Killing In The Name" },
    { title: "One Last Breath" },
    { title: "Higher" },
    { title: "Everlong",},
    { title: "Two Weeks Past" },
    { title: "Walk" },
    { title: "Basket Case" },
    { title: "Encore: Bulls On Parade" }

  ];
const videos = videoGalleries['deer-park-11-29']?.videos || [];
const hero = videoGalleries['deer-park-11-29']?.heroImage || [];
export default function DeerParkShow() {
  return (
    <ShowDetailPage
      title="Deer Park – November 29, 2024"
      location="Newark, DE"
      heroImages={[hero]}
      flyerImage={DP}
      photos={photos}
      videos={videos}
      setlist={setlist}
    />
  );
}
