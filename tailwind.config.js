/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}", "./src/app/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        comic: ["'Comic Sans MS'", "'Comic Sans'", "cursive"],
      },
    },
  },
  plugins: [],
};
