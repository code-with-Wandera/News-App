/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require("daisyui"),
  ],
  daisyui: {
    themes:[
      {
        newsTheme:{
        "primary": "#1E40AF",
        "secondary": "#F59E0B",
        "accent": "#10B981",
        "neutral": "#F3F4F6",
        "base-100": "#F3F4F6",
        },
      },
     "dark","light",
    ],
  },
};
