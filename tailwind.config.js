/** @type {import('tailwindcss').Config} */
import colors from "tailwindcss/colors"
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors:{
      bg:'#313338',
      secondaryBg: "#1E1F22",
      primary: "#5865F2",
      ...colors
    },
    extend: {},
  },
  plugins: [],
}