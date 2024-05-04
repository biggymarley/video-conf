/** @type {import('tailwindcss').Config} */
import colors from "tailwindcss/colors";
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      bg: "#313338",
      secondaryBg: "#1E1F22",
      primary: "#e5be00",
      ...colors,
    },
    screens: {
      xs: "450px",
      sm: "640px",
      // => @media (min-width: 640px) { ... }

      md: "768px",
      // => @media (min-width: 768px) { ... }

      lg: "1024px",
      // => @media (min-width: 1024px) { ... }

      xl: "1280px",
      // => @media (min-width: 1280px) { ... }

      "2xl": "1536px",
      "3xl": "1940px",
      // => @media (min-width: 1536px) { ... }
    },
    extend: {
      boxShadow: {
        "3xl":
          "0 -50px 25px -5px var(--tw-shadow-color), 0 70px 70px 8px var(--tw-shadow-color)",
      },
    },
  },
  plugins: [],
};
