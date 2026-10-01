import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        terracotta: { DEFAULT: "#C1440E", dark: "#9A3309", light: "#E05A1F" },
        offwhite: "#FAF6F1",
        charcoal: "#1C1C1C",
        sand: { DEFAULT: "#D9C3A5", light: "#EFE5D6", dark: "#B49A74" },
      },
      fontFamily: {
        serif: ["var(--font-serif)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "wa-bounce": {
          "0%, 90%, 100%": { transform: "translateY(0)" },
          "92.5%": { transform: "translateY(-10px)" },
          "95%": { transform: "translateY(0)" },
          "97.5%": { transform: "translateY(-5px)" },
        },
      },
      animation: {
        marquee: "marquee 28s linear infinite",
        "wa-bounce": "wa-bounce 8s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
export default config;
