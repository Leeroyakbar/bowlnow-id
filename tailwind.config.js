// tailwind.config.js
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#A65F2D",
        secondary: "#F4A825",
        accent: "#6B3F1D",
        base: "#FFF9F0",
        text: "#2E2E2E",
      },
      fontFamily: {
        heading: ["Nunito", "sans-serif"],
        body: ["Inter", "sans-serif"],
        poppins: ["Poppins", "sans-serif"],
        modak: ["Modak", "cursive"],
      },
      keyframes: {
        slideInRight: {
          "0%": { transform: "translateX(100px)", opacity: "0" },
          "100%": { transform: "translateX(0)", opacity: "1" },
        },
        slideInLeft: {
          "0%": { transform: "translateX(-100px)", opacity: "0" },
          "100%": { transform: "translateX(0)", opacity: "1" },
        },
        slideInTop: {
          "0%": { transform: "translateY(-100px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        slideInZoom: {
          "0%": { transform: "scale(0)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
      },
      animation: {
        slideInRight: "slideInRight 0.7s ease-out forwards",
        slideInLeft: "slideInLeft 0.7s ease-out forwards",
        slideInTop: "slideInTop 0.7s ease-out forwards",
        slideInZoom: "slideInZoom 0.7s ease-out forwards",
      },
    },
  },
  plugins: [],
}
