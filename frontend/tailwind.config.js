/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundColor: {
        B6B024: "#B6B024",
      },
      borderColor: {
        gold: "#B6B024",
      },
      textColor: {
        B6B024: "#B6B024",
      },
    },
    variants: {
      backgroundColor: ["responsive", "hover", "focus", "checked"],
      borderColor: ["responsive", "hover", "focus", "checked"],
    },
    plugins: [],
  },
};
