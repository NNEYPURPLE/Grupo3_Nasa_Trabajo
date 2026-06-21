/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        nasa: {
          blue: "#0B3D91",
          red: "#FC3D21",
          dark: "#1A1A2E",
          light: "#E8E8E8",
          gray: "#4A4A6A",
        },
      },
    },
  },
  plugins: [],
};
