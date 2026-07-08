export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ["Fraunces", "serif"],
        sans: ["Manrope", "sans-serif"]
      },
      colors: {
        sky: {
          50: "#f0f8ff",
          100: "#e0f0fe",
          200: "#bae0fd",
          300: "#7cc5fb",
          400: "#3aa5f5",
          500: "#1487e0",
          600: "#0b6ab8",
          700: "#0d5590",
          800: "#124674",
          900: "#123a5f"
        },
        slate: {
          50: "#f7fafc",
          100: "#eef2f7",
          300: "#c3cedb",
          500: "#5b7086",
          600: "#425064"
        },
        cream: "#f7fafc",
        paper: "#eef4fa",
        ink: "#14263b",
        mist: "#eaf1f8",
        line: "#d9e4ef"
      },
      boxShadow: {
        soft: "0 12px 32px rgba(18, 70, 116, 0.10)",
        card: "0 4px 18px rgba(18, 70, 116, 0.07)",
        glow: "0 14px 30px rgba(20, 135, 224, 0.24)"
      },
      borderRadius: {
        xl2: "1.25rem"
      }
    }
  },
  plugins: []
};
