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
    extend: {
      boxShadow: {
        "3xl": "0 -50px 25px -5px var(--tw-shadow-color), 0 70px 70px 8px var(--tw-shadow-color)",
      },
    },
  },
  plugins: [],
};
