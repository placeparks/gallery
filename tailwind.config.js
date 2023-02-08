module.exports = {
  content: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
      colors: {
        darkgrey: "rgb(40, 50, 70, 0.85)",
        brand: "#00a6ff",
        orange: "#fb923c",
        darkorange: "#facc15",
        black: '#1e293b'
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
  important: true,
};