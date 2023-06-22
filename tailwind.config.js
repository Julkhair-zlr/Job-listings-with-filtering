/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "hero-pattern": "url('images/bg-header-desktop.svg')",
      },
      boxShadow: {
        "my-own-shadow-hover": "0 9px 18px 0 rgba(0, 0, 0, 0.2)",
      },
    },
  },
  plugins: [],
};
