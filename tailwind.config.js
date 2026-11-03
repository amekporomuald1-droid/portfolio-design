/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        aura: {
          bg: "#f6f4f0",
          ink: "#0d1117",
          red: "#e8001d",
          wine: "#6f001a",
          yellow: "#ffd60a",
          blue: "#2b50ff",
          green: "#25d366",
          pink: "#ff7ab8",
        },
      },
      fontFamily: {
        display: ['"Plus Jakarta Sans Variable"', "system-ui", "sans-serif"],
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