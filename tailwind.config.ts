import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        maroon: {
          50: "#FDF2F4",
          100: "#FBE4E8",
          200: "#F6C8D0",
          300: "#EE9FB0",
          400: "#E26D86",
          500: "#C93B5B",
          600: "#A72442",
          700: "#82152F",
          800: "#6B1124", // Primary Executive Maroon
          900: "#4A0012", // Deep Dark Maroon
          950: "#2D000A",
        },
        brass: {
          50: "#FAF6EE",
          100: "#F3EBDA",
          200: "#E6D5B6",
          300: "#D7BC8E",
          400: "#C5A880", // Restrained Brass/Gold
          500: "#B48C50",
          600: "#986F36",
          700: "#7A5429",
          800: "#5E3F20",
          900: "#462F19",
        },
        walnut: {
          50: "#F7F5F4",
          100: "#ECE7E4",
          200: "#D9D0CB",
          300: "#BFB2AA",
          400: "#9F8E83",
          500: "#7B6A60",
          600: "#5F5047",
          700: "#4A3728", // Warm Walnut
          800: "#3E2723", // Deep Walnut
          900: "#2A1A17",
        },
        cream: {
          50: "#FDFCFB",
          100: "#FAF8F5", // Canvas Background
          200: "#F3EFE9",
          300: "#E8E2D8",
          400: "#D6CCC0",
          500: "#BDB0A0",
        },
        charcoal: {
          50: "#F6F6F6",
          100: "#E7E7E7",
          200: "#D1D1D1",
          300: "#B0B0B0",
          400: "#888888",
          500: "#6D6D6D",
          600: "#5D5D5D",
          700: "#4F4F4F",
          800: "#333333", // Primary Charcoal
          900: "#1C1917", // Dark Charcoal
          950: "#11100F",
        },
      },
      fontFamily: {
        serif: ["var(--font-playfair)", "Libre Caslon Text", "Georgia", "serif"],
        sans: ["var(--font-plus-jakarta)", "Inter", "system-ui", "sans-serif"],
      },
      boxShadow: {
        luxury: "0 10px 30px -10px rgba(107, 17, 36, 0.08)",
        "luxury-hover": "0 20px 40px -15px rgba(107, 17, 36, 0.16)",
        card: "0 4px 24px -2px rgba(28, 25, 23, 0.05)",
      },
      borderRadius: {
        DEFAULT: "4px",
        sm: "2px",
        md: "4px",
        lg: "6px",
        xl: "8px",
        "2xl": "12px",
      },
    },
  },
  plugins: [],
};

export default config;
