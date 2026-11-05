/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        aura: {
          ink: "#0a0a0a",
          paper: "#f6f4f0",
          wine: "#6f001a",
          gold: "#c4a24b",
          goldDeep: "#aa8326",
          goldLight: "#f5eca9",
          // Conservés pour compatibilité (seront remplacés par accent)
          bg: "#f6f4f0",
          red: "#e8001d",
          yellow: "#ffd60a",
          blue: "#2b50ff",
          green: "#25d366",
          pink: "#ff7ab8",
        },
      },
      fontFamily: {
        display: ['"Inter Variable"', "system-ui", "sans-serif"],
        serif: ['"Instrument Serif"', "Georgia", "serif"],
        sans: ['"Inter Variable"', "system-ui", "sans-serif"],
      },
      transitionTimingFunction: {
        expo: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
    },
  },
  plugins: [],
};