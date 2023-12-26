/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        royalBlue: {
          DEFAULT: "#234E70",
        },
        paleYellow: {
          DEFAULT: "#FBF8BE",
        },
      },
    },
  },
  plugins: [],
};
