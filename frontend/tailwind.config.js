/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/app/**/*.{js,jsx}", "./src/components/**/*.{js,jsx}"],

  theme: {
    extend: {
      colors: {
        brand: {
          primary: "#2E78B7",
          secondary: "#2FA4C4",
          dark: "#0F172A",
          accent: "#7FB446",
        },
      },
    },
  },

  plugins: [],
};