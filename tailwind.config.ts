import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        chocolate: {
          50: "#FAF7F4",
          100: "#F0EAE4",
          200: "#E0D3C6",
          300: "#C8B8A4",
          400: "#A89478",
          500: "#8A7260",
          600: "#6E5A48",
          700: "#5C3D2E",
          800: "#3D2B1F",
          900: "#2A1D15",
          950: "#1A110C",
        },
        caramel: {
          50: "#FDF8F3",
          100: "#FAEFE2",
          200: "#F2DCC6",
          300: "#E8C4A0",
          400: "#D4A574",
          500: "#C8956C",
          600: "#B8824E",
          700: "#9A6B3C",
          800: "#7A5430",
          900: "#5C3F24",
        },
        cream: {
          50: "#FEFDFB",
          100: "#FAF8F5",
          200: "#F5F0EB",
          300: "#EDE6DF",
          400: "#E8E2DC",
          500: "#D4CBC2",
          600: "#B8AFA6",
          700: "#9C9590",
          800: "#7A7470",
          900: "#5C5854",
        },
        blush: {
          50: "#FDF8F6",
          100: "#F8EDE8",
          200: "#F0DDD5",
          300: "#E8C8BC",
          400: "#D4A594",
          500: "#C49A8A",
          600: "#A87A6C",
          700: "#8A6054",
          800: "#6E4A40",
          900: "#523630",
        },
      },
      fontFamily: {
        sans: [
          "Inter",
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "Roboto",
          "sans-serif",
        ],
        display: [
          "Instrument Serif",
          "Playfair Display",
          "Georgia",
          "serif",
        ],
      },
      animation: {
        "fade-in": "fadeIn 0.6s ease-out forwards",
        "fade-in-up": "fadeInUp 0.6s ease-out forwards",
        "slide-up": "slideUp 0.5s ease-out forwards",
        "slide-down": "slideDown 0.3s ease-out forwards",
        "scale-in": "scaleIn 0.4s ease-out forwards",
        shimmer: "shimmer 2s linear infinite",
        "pulse-soft": "pulseSoft 3s ease-in-out infinite",
        float: "float 6s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(100%)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideDown: {
          "0%": { opacity: "0", transform: "translateY(-10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        scaleIn: {
          "0%": { opacity: "0", transform: "scale(0.95)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        pulseSoft: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.7" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
      },
      boxShadow: {
        glass: "0 8px 32px 0 rgba(61, 43, 31, 0.06)",
        "glass-sm": "0 4px 16px 0 rgba(61, 43, 31, 0.04)",
        warm: "0 4px 24px rgba(200, 149, 108, 0.12)",
        "warm-lg": "0 8px 40px rgba(200, 149, 108, 0.16)",
      },
    },
  },
  plugins: [],
};

export default config;
