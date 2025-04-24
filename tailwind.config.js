module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        'flash-glow': {
          '0%, 100%': {
            filter: 'drop-shadow(0 0 10px rgba(255,255,255,0.4)) drop-shadow(0 0 30px rgba(144,238,144,0.4))',
          },
          '50%': {
            filter: 'drop-shadow(0 0 40px rgba(255,255,255,0.8)) drop-shadow(0 0 60px rgba(186,85,211,1))',
          },
        },
      },
      fontFamily: {
        bebas: ['"Bebas Neue"', 'sans-serif'],
      },
      animation: {
        'flash-glow': 'flash-glow 6s ease-in-out infinite',
      },
    },
  },
};