/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#fdf6f0", 100: "#fae8d8", 200: "#f4cda9",
          300: "#ecab72", 400: "#e4883f", 500: "#d96a1f",
          600: "#bf5116", 700: "#9c3d14", 800: "#7d3217", 900: "#652a17",
        },
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "-apple-system", "Segoe UI", "Roboto", "sans-serif"],
      },
    },
  },
  plugins: [],
};
