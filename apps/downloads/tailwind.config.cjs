/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        'coop-teal-1': '#1DA3A3',
        'coop-teal-2': '#124D4D',
        'coop-black': '#000000',
      },
      backgroundImage: {
        'hero-gradient': `radial-gradient(circle at 50% 15%, rgba(29,163,163,0.75) 0%, rgba(29,163,163,0.15) 43%, rgba(0,0,0,0) 100%), linear-gradient(180deg, #0F5C5A 0%, #0B3F3F 40%, #041B1B 75%, #000000 100%)`,
      },
    },
  },
  plugins: [],
};
