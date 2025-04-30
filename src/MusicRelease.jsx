// MusicRelease.jsx
import React from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { originalReleases } from './musicData';


const releaseData = {
  'nothing-left': {
    title: 'Neon Godzilla',
    artwork: '/graphic1.jpg',
    lyrics: `Fuck!
Sycophants surround the throne
Crying vices of the broken
Saints pray while the knots fray
Ingratiation of the Holy
False lives of the steeple people
Vanity eyes and lies well crafted
A futile fight against omniscience
Don′t deny or hide or fight the evidence
Don't deny or hide or fight the evidence
Walls like water falls might drown us out
Black night, martyrs call bites down and out
Seeking another life and one last breath
Use up my everything ′til there's nothing left
Taciturn to learn the language
Manipulate to create no anguish
Build it up with a weak foundation
Fuck with dead celebrations
You chose this life
Not of wit but cries
So say your prayers but know
God may be your only foe
Walls like water falls might drown us out
Black night, martyrs call bites down and out
Seeking another life and one last breath
Use up my everything 'til there′s nothing left`,
    youtubeId: 'ZX65Zwrz6nE',
    spotifyUrl: 'https://open.spotify.com/track/0fIvbdXBA3g2xlSPWlSJw5?si=3538b6c6f6a647fb',
  },
  'two-weeks': {
    title: 'Two Weeks Past',
    artwork: '/graphic2.jpg',
    lyrics: `The past two weeks or so have been
Bringing on some change
Can't really tell if any of it matters
Light a flame to the sage
Smoking out all the things that shatter
But I got carried away
Now I'm crossed and I hope I cross your mind
The tapestry ends in a fray just like everything in time

I hate all the things that come to me
'Cause they're never real
And I'm sick and tired of always waiting, I'm waiting on something new
Just to say, “It's going good, it's going great!”

And then the collapse
Of everything that we had
Two weeks past
And it never really hurt that bad
Until you told me 
I never thought you'd move on so fast
Awoo oo oo 

The past two weeks or so have been
Pulling at my heart
Still beating but will soon be beaten apart 
Another hazy room
One after another of my sweet think drinking of you
And I know that I fucked up
Oh oh oh oh
But I swear that it's all love 
When I say…

I hate all the things that come to me
'Cause they're never real
And I'm sick and tired of always waiting, I'm waiting on something new
Just to say, “It's going good, it's going great!”

And then the collapse
Of everything that we had
Two weeks past
And it never really hurt that bad
Until you told me 
I never thought you'd move on so fast
Awoo oo oo 

The past two weeks or so have been hard
`,
    youtubeId: 'xcnEVDEvsYM',
    spotifyUrl: 'https://open.spotify.com/track/0I6N2xDrVjGIrKGr9wLST5?si=2f4f33099eb14ba7',
  },
  'flies': {
    title: 'Flies of Desire',
    artwork: '/graphic3.jpg',
    lyrics: `She wears angels on her skin
I've known her since before they've been
The moths of death and flies of desire
Every inch of her inspired
I want to see her there naked
I wanna slide right in and take it
'Cause in the end, you're all that I have
The other half of my body collapsed
Take it all, leave me nothing
I'll always find something to use
To forgive you over again
To forgive you over again
To forgive you over again
Knock me down still I return
Apologize covered in dirt
Loyal like the dog still beaten
If you give me just one good reason to stay
'Cause in the end, you're all that I have
The other half of my body collapsed
Take it all, leave me nothing
I'll always find something to use
To forgive you over again
To forgive you over again
To forgive you over again
'Cause in the end, you're all that I have
The other half of my body collapsed
Take it all and leave me nothing
I'll always find something to use
To forgive you over again
To forgive you over again
To forgive you over again`,
    youtubeId: 'lRrqljLXCpE',
    spotifyUrl: 'https://open.spotify.com/track/0k409Atjrca50Z3Xh1yqjM?si=bfc196a258f2493e',
  },
  'naive': {
    title: 'So Naive',
    artwork: '/graphic4.jpg',
    lyrics: `Obviously I'm falling behind
Ain't nobody's fault but mine
Throw myself out, see if I care
Death of a soul that was never there
Cut yourself and taste the metal
Make it short, make it sweet
In the mirror, you see the devil
Lose yourself and your dignity
I tread where the eagles fly
Tearing up where the angels burn
Used to think that I'd never die
The darkest things I wish I'd never learn
Can I try, can I try again?
I'm so naive, or so I've heard
Red cloud over yonder
Cloud burst of rusted silver
Wicked souls on the horizon
The devil couldn't hold the grime in
You kid yourself-you'll never settle
For a taste of harmony
In the mirror, you see the devil
Lose yourself and your dignity
I tread where the eagles fly
Tearing up where the angels burn
Used to think that I'd never die
The darkest things I wish I'd never learn
Can I try, can I try again?
I'm so naive, or so I've heard
I tread where the eagles fly
Tearing up where the angels burn
Used to think that I'd never die
The darkest things, I wish I'd never learn
Can I try, can I try again?
I'm so naive, or so I've heard`,
    youtubeId: 'U9mwyeyay44',
    spotifyUrl: 'https://open.spotify.com/track/1SM23CcbZiPr9cLLuAIp5G?si=568d0fddab0f41a8',
  },
  'temple': {
    title: 'All of Your Life',
    artwork: '/graphic5.jpeg',
    lyrics: `Flesh and blood hit the floor
Speak like this and you will speak no more
Highway drive under the crimson moon
Through forces of nature that control you
And the crowd gets dull and fade
Can't fix yourself so find another way
Take a deep breath behind your cigarette
The ice we stand on is getting thin
Try to survive through the robbers in the rough
Barrell through the tide, sucking you in and cutting you up
'Cause all of your life you'll drive through changes
Polished through time, bearing through your changes
Flash ahead to your tomorrow
A bride in red and a vacant sorrow
You can never wash away your past endeavors
But if you try sometimes
Then the crowd gets dull and fade
Can't fix yourself so find another way
Take a deep breath behind your cigarette
Ooo, the floor we stand on is caving in
Try to survive through the robbers in the rough
Barrell through the tide sucking you in and cutting you up
'Cause all of your life you'll drive through changes
Polished through time bearing through your changes`,
    youtubeId: '6PxwAi-jbb0',
    spotifyUrl: 'https://open.spotify.com/track/3NIZkTgcbwptZqnA308HYh?si=4e5a1e8c0801471d',
  },
  'vultures': {
    title: 'Circling Vultures',
    artwork: '/graphic6.jpg',
    lyrics: `I hope my eyes don't drown in your sea
I hope your heart still melts for me
Like it did when we were young
For you I'd carry the weight of the sun
And the only thing I ask of you love is to be there when it's all gone

The peace in my mind's fleeting free
Let me hold you in the summer breeze
I want it back like when we were young
The words like broken glass on the tongue ohhhh
And the only thing the only thing I ask of you love is to be there when it's all gone

No eyes look at me from where I stand
I'm a faulty image with shaky hands
I dream so you live, I dream so you live
Bring back a sense of place my dear
Your arms were my home now I live in fear
Drifiting closer and closer to black
I'm so close to black

No eyes look at me from where I stand
I'm a faulty image with shaky hands
I dream so you live, I dream so you live
Bring back a sense of place my dear
Your arms were my home now I live in fear
Drifting closer and closer to black
I'm so close to black

I'm leaving now I'll be with you soon my love
Circling vultures from below and above
I levitate in a state of grace
`,
    youtubeId: 'e0IpgEVjufA',
    spotifyUrl: 'https://open.spotify.com/track/7BuAjUubEWjLHx1BseA6gu?si=012f5cc1ddd74ecf',
  },
  'cocaine': {
    title: "(Like It's) Cocaine",
    artwork: '/graphic7.jpg',
    lyrics: `All the colors turn to one
The light in your eyes is the light in my sun
Voice like music in my head
Filling my vacant ear, painting me rose red
Enchanted by your garden
It's the only place I'd lay my heart in 'cause I wanted you
And I just can't remember
A second of my life the day before I met her soul
Can you see the light draped around you, like I do?
It gets so dark when I'm without you, my dear
The way you speak gets me on my feet like it's cocaine, cocaine
The way you speak gets me on my feet like it's cocaine
And I just can't handle this
'Cause without her I am irrelevant
Well maybe I am to blame
No, no I'm too blame because I get so fucking arrogant
So tell me what you want to hear
Before I let the final tear fall
Can you see the light draped around you, like I do?
It gets so dark when I'm without you, my dear
The way you speak gets me on my feet like it's cocaine, cocaine
The way you speak gets me on my feet like it's cocaine
Can you see the light draped around you, like I do?
It gets so dark when I'm without you, my dear
The way you speak gets me on my feet like it's cocaine, cocaine
The way you speak gets me on my feet like it's cocaine`,
    youtubeId: 'dShoCY-OTYA',
    spotifyUrl: 'https://open.spotify.com/track/2jVaqY1aG3MfcU9rHK96Ti?si=c38b71d594104e91',
  },
  'inferno': {
    title: 'My Own Inferno',
    artwork: '/graphic7.jpg',
    lyrics: `In my own inferno
I see a lack of independence
I see a lack of reverence
For my god forsaken situation
Nobody knows
Where I've been
Or what I've seen
In this march toward death that's eating the life from me
Woah oh oh oh
Woah oh oh oh
Fight the wave the time is fleeting
What I'd give to know the feeling
To be the one I believe in
What's real and what's the reason?
Time is ticking and now mine has come
Lay bare all that I've done
I'm on fire the pain's too real
So welcome to my inferno
Where did all my time go?
I can't see the other side of twenty
Being much better even with company
I'm draining brown bottles until I feel empty enough
I'm letting go of everyone and everything
I've ever wanted seems to be in my prophecy
Woah oh oh oh
Woah oh oh oh
Fight the wave the time is fleeting
What I'd give to know the feeling
To be the one I believe in
What's real and what's the reason?
Time is ticking and now mine has come
Lay bare all that I've done
I'm on fire the pain's too real
So welcome to my inferno
It's hell on earth
You've been doomed since your birth
And I'm creeping around your corner
And I'm starting to get closer
In all ways, I am horror
Woah oh oh oh
Woah oh oh oh
Fight the wave the time is fleeting
What I'd give to know the feeling
To be the one I believe in
What's real and what's the reason?
Time is ticking and now mine has come
Lay bare all that I've done
I'm on fire the pain's too real
So welcome to my inferno`,
    youtubeId: 'yHo4yehwOJc',
    spotifyUrl: 'https://open.spotify.com/track/54efmELdOMhPsiwzobib46?si=d3a70693cbaa4073',
  },
  'beast': {
    title: 'Til I Come Down',
    artwork: '/graphic7.jpg',
    lyrics: `Take a step back, in passing,
I thought it was heaven
But now I can see the beauty was just a reflection
Of the kitchen light out my window
Oh, I thought it was a full moon
The deceptions getting cold

How can I believe you now
You build me up just to tear me down
And I believe your lies might kill me
Oh they might kill me

Until I come down
Back to the ground
Until I come down
You're wearing me out

Showed my hand early
I really thought it was a good one
But now I don't want to fold
But the flop wants me to run
Far away from here
Somewhere I can't hurt
And play a different hand
Because it couldn't get much worse

How can I believe you now
You build me up just to tear me down
And I believe your lies might kill me
They might kill me 

Until I come down
Back to the ground
Until I come down
You're wearing me out
`,
    youtubeId: '_RLqAXxyVQg',
    spotifyUrl: 'https://open.spotify.com/track/5zCpNXjqO0pq06SFwqBwJv?si=a00032626ae24d85',
  },
  'godcomplex': {
    title: 'God Complex',
    artwork: '/graphic7.jpg',
    lyrics: `I stood before thee broken in pieces
Rage and envy wherever it reaches
Archetypes of the newest hostels
Each line carved in values to model
Eroded by all the mental illness
Left with nothing but a tight fist
The ink stains the page like wine
Drunken self singing songs of the wise
Can you see the bodies thrashing?
My body's collapsing from the pressure
Can you see it's finally happening?
I'm gonna burst, burst from the pressure
Burst!
Burst!
Burst!
I stood before thee ghostly and hollow
A crowd of faces but mine is borrowed
Where's your youth and your borrowed time?
You know ecstacy's no friend of mine
Eroded by all the mental illness
Left with nothing but a tight fist
Ink stains the page like wine
Drunken self singing songs of the wise
Can you see the bodies thrashing?
My body's collapsing from the pressure
Can you see it's finally happening?
I'm gonna burst, burst from the pressure
Burst!
Burst!
Burst!
Uhh`,
    youtubeId: 'TjaWQ69iT0U',
    spotifyUrl: 'https://open.spotify.com/track/7KIr2oyJw3TLnvokbcwgdg?si=a3cf25fd2fac46c0',
  },
  'Air-Raid': {
    title: 'Air Raid',
    artwork: '/graphic7.jpg',
    lyrics: `Scream as I dig my flames 
Down upon your land
Bringing with me 
Terror and rage

Feel your pulse stop slowly
Cry for you, were only 
A civilian casualty

You have no worth and you will be gone soon
I'll keep my word and I'll sew your grief
And this I swear I will find you
And this I swear you will be, you will be

Beg for reasons, but I have none other than
To show how much pain
I can inflict on you (HAHAHAHAH)

So heed my warnings
I won't quit until you 
Have no strength to see the morning

You have no worth and you will be gone soon
I'll keep my word and I'll sew your grief
And this I swear I will find you
And this I swear you will be, you will be mine
`,
    youtubeId: 'kPtkZQhwLj0',
    spotifyUrl: 'https://open.spotify.com/track/6zrr0PA7eQfirXAYKQR2qP?si=2c72b76b2435422c',
  },
  'virginia': {
    title: 'Virginia',
    artwork: '/graphic7.jpg',
    lyrics: `In a place we found ourselves before
Take your time 'cause the moment I reach the door
We're through
No romance, just some drinks and no more
Will I linger on? Would you fall in love with me?
Leave your records on, who're you singing of?
I knew it's a tease and a half
Nothing more than a preview
The puff and pass
You cough it up
The night will end
Before you've had enough
Hold me close, just don't hold me down
I watch you sleep
I watch you toss and turn
I get flashbacks make it hurt
But this happens time and time again
We never learn
Keep you to the right of me
What's left has gone and ditched me
Oh, common sense is second guessing all the things you've told me
So stop
Let's not turn this into something it's not
You've gotten away with a lot of loving
You've rotted away, left with a lot of nothing
What do you want from me?
What do you want from me?
The puff and pass
You cough it up
The night will end
Before you've had enough
Hold me close, just don't hold me down
I watch you sleep
I watch you toss and turn
I get flashbacks make it hurt
But this happens time and time again
We never learn`,
    youtubeId: '7WIAIZYaSo0',
    spotifyUrl: 'https://open.spotify.com/track/3w9lUzpN7624leB4x2wC24?si=b4cc4c245cfb414e',
  },
  
  // Add more release data here
};

export default function MusicRelease() {
  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;
  const { releaseId } = useParams();
  const release = originalReleases.find((r) => r.id === releaseId);

  if (!release) return <div className="text-white p-6">Release not found.</div>;

  return (
    <main className="min-h-screen bg-black text-white font-sans pt-0 px-4 pb-5">
      {/* HERO */}
      <section className="relative h-[55vh] w-full overflow-hidden flex items-center justify-center text-center rounded-b-xl shadow-inner mb-16">
        <img
          src={release.artwork}
          alt="Hero"
          className="absolute inset-0 w-full h-full object-cover brightness-50 blur-sm scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
        <div className="relative z-10 px-6 max-w-2xl mx-auto">
        <a
  href={release.spotifyUrl}
  target="_blank"
  rel="noopener noreferrer"
  className={`text-5xl md:text-6xl font-extrabold text-purple-200 drop-shadow-[0_0_30px_rgba(192,132,252,0.6)] transition duration-200 ${
    !isMobile ? 'hover:text-green-400' : ''
  }`}
>
  {release.title}
</a>
          <p className="text-purple-300 text-xl tracking-wide italic mt-2">Single • Released 2025</p>
        </div>
      </section>
  
      {/* MAIN CONTENT */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 px-4">
        {/* LYRICS */}
        <section>
  <h2 className="text-2xl font-bold text-green-400 mb-6 text-center lg:text-left tracking-wide uppercase">
    Lyrics
  </h2>
  <div className="bg-gradient-to-br from-zinc-900 via-black to-zinc-900 border border-purple-800 p-6 rounded-2xl shadow-inner shadow-purple-700/30 text-base leading-loose text-purple-100 font-mono">
    <pre className="whitespace-pre-wrap tracking-wide">
      {release.lyrics}
    </pre>
  </div>
</section>
  
        {/* VIDEO SECTION */}
        <section>
          <div className="space-y-12">
            {/* Official Video */}
            <div>
              <h2 className="text-2xl font-bold text-green-400 mb-4 text-center lg:text-left">Music Video</h2>
              <div className="aspect-video rounded-2xl overflow-hidden border border-purple-800 shadow-xl">
                <iframe
                  src={`https://www.youtube.com/embed/${release.youtubeId}`}
                  title="YouTube video"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                ></iframe>
              </div>
            </div>
  
            {/* Live Video Embed */}
            <div>
              <h2 className="text-2xl font-bold text-green-400 mb-4 text-center lg:text-left">Live Video</h2>
              <div className="aspect-video rounded-2xl overflow-hidden border border-purple-800 shadow-xl">
                <iframe
                  src="https://www.youtube.com/embed/dQw4w9WgXcQ" // replace with real live performance
                  title="Live Performance"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                ></iframe>
              </div>
              
            </div>
            <div className="text-center mt-12">
            <Link
  to="/music"
  className={`inline-block text-purple-400 text-lg font-semibold tracking-wide transition duration-200 ${
    !isMobile ? 'hover:text-green-400 hover:underline' : ''
  }`}
>
  Back to Music Catalog
</Link>
</div>
          </div>
        </section>
        
      </div>
      <footer className="bg-black pt-12 text-center text-sm text-gray-500">
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
    </main>
  );
  
}
