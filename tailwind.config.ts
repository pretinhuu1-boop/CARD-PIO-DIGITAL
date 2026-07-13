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
        brand: {
          50: "#FFF5F5",
          100: "#FFE0E0",
          200: "#FFC2C2",
          300: "#FF9494",
          400: "#FF6B6B",
          500: "#E84363",
          600: "#C7254E",
          700: "#9B1B3D",
          800: "#6E1330",
          900: "#4A0D22",
          950: "#2D0614",
        },
        cream: {
          50: "#FFFDF7",
          100: "#FFF9E8",
          200: "#FFF3D1",
          300: "#FFEAB3",
          400: "#FFE09A",
          500: "#F5D07A",
          600: "#D4A84E",
          700: "#A67C30",
          800: "#7A5A1F",
          900: "#4D3812",
        },
        gold: {
          50: "#FFFDF0",
          100: "#FFF8D6",
          200: "#FFEFAD",
          300: "#FFE480",
          400: "#FFD54F",
          500: "#FFC107",
          600: "#DBA006",
          700: "#B58105",
          800: "#8C6404",
          900: "#664803",
        },
        ivory: {
          50: "#FEFDFB",
          100: "#FDF9F3",
          200: "#FAF3E6",
          300: "#F5E9D3",
          400: "#EDDCBE",
          500: "#E0CCA5",
          600: "#C4A876",
          700: "#A08453",
          800: "#7A6238",
          900: "#544323",
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
          "Georgia",
          "Cambria",
          "Times New Roman",
          "Times",
          "serif",
        ],
        mono: ["JetBrains Mono", "Fira Code", "monospace"],
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-out forwards",
        "fade-in-up": "fadeInUp 0.5s ease-out forwards",
        "slide-up": "slideUp 0.4s ease-out forwards",
        "slide-down": "slideDown 0.3s ease-out forwards",
        "scale-in": "scaleIn 0.3s ease-out forwards",
        shimmer: "shimmer 2s linear infinite",
        "pulse-soft": "pulseSoft 2s ease-in-out infinite",
        float: "float 3s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
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
          "0%": { opacity: "0", transform: "scale(0.9)" },
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
          "50%": { transform: "translateY(-10px)" },
        },
      },
      backdropBlur: {
        xs: "2px",
      },
      boxShadow: {
        glass: "0 8px 32px 0 rgba(31, 38, 135, 0.12)",
        "glass-sm": "0 4px 16px 0 rgba(31, 38, 135, 0.08)",
        warm: "0 4px 20px rgba(200, 100, 80, 0.15)",
        "warm-lg": "0 8px 40px rgba(200, 100, 80, 0.2)",
      },
    },
  },
  plugins: [],
};

export default config;
