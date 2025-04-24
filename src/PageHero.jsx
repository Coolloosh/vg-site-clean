import React from 'react';

export default function PageHero({
  image,
  title,
  subtitle,
  children,
  gradientClass,
  titleColor = "purple",
  titleFont = "",
  imageClass,
  minHeight = "h-screen",
  textPositionClass = "items-center" // new default
}) {
  const titleColorClass =
    titleColor === "green"
      ? "text-green-400 drop-shadow-[0_0_40px_rgba(0,255,0,0.5)]"
      : "text-purple-200 drop-shadow-[0_0_40px_rgba(192,132,252,0.6)]";

  return (
    <section className={`relative ${minHeight} w-full overflow-hidden flex ${textPositionClass} justify-center text-white font-sans`}>
      <img
        src={image}
        alt="Hero Background"
        className={`absolute inset-0 w-full h-full object-cover ${imageClass || 'brightness-50 scale-105 transition'}`}
      />
      <div className={`absolute inset-0 ${gradientClass || 'bg-gradient-to-t from-black via-black/30 to-transparent'} z-0`} />
      <div className="relative z-10 px-6 text-center max-w-4xl mx-auto">
        {title && (
          <h1 className={`text-5xl md:text-6xl font-extrabold mb-4 ${titleFont} uppercase tracking-wide ${titleColorClass}`}>
            {title}
          </h1>
        )}
        {subtitle && (
          <p className="text-2xl md:text-3xl text-green-400 italic mb-4 tracking-wider drop-shadow">
            {subtitle}
          </p>
        )}
        {children}
      </div>
    </section>
  );
}
