import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        terracotta: { DEFAULT: "#7B2347", dark: "#55152F", light: "#B84B72" },
        offwhite: "#F7F4F0",
        charcoal: "#171719",
        sand: { DEFAULT: "#CFC8C2", light: "#E9E5E1", dark: "#9F9790" },
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
