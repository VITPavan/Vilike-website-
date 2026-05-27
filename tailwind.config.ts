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
        vilike: {
          bg: "#0a0a0a",
          accent: "#0057FF",
          gold: "#DAA520",
          muted: "#94a3b8",
        },
      },
      boxShadow: {
        "blue-glow": "0 0 40px rgba(0, 87, 255, 0.45)",
        "blue-flash": "0 0 20px rgba(0, 87, 255, 0.6)",
      },
      animation: {
        pulseBlue: "pulseBlue 2s ease-in-out infinite",
      },
      keyframes: {
        pulseBlue: {
          "0%, 100%": { boxShadow: "0 0 20px rgba(0, 87, 255, 0.3)" },
          "50%": { boxShadow: "0 0 40px rgba(0, 87, 255, 0.7)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
