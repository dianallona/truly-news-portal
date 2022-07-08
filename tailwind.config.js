/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  variants: {
    display: ["responsive", "dropdown"],
  },
  plugins: [require("tailwindcss-dropdown")],
};
