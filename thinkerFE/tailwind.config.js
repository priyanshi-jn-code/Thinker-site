/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors : {
        purple : {
          300 : "#e0e7fe",
          400 : "#3e38a7",
          500 : "#5046e4"
        },
        brown : {
          100 : "#F4E1D2",
          200 : "#E1D4C1",
          300 : "#C4A484",
          400 : "#6E493A",
          700 : "#987284",
          800 : "#332820",
          900 : "#2B1C10"
        },
        green : {
          50 : "#eaf5fa",
          100 : "#c1e2f0",
          200 : "#98cfe6",
          300 : "#6fbcdc",
          400 : "#46a8d2",
          500 : "#59B4B3",
          600 : "#236f90",
          700: "#194f67",
          800 : "#0f303e",
          900 : "#07171E",
        }
      },
      backgroundImage: {
        "neonbg" : "url(./src/icons/neon.png)",
        "first" : "url(./src/icons/first.png)",
        "second" : "url(./src/icons/second.png)",
        "third" : "url(./src/icons/third.png)",
        "neonforshare" : "url(./icons/neon.png)"

      },
    },
  },
  plugins: [],
}

