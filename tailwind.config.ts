import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        surface: "#F4F4F5",
        white: "#FFFFFF",
        concrete: "#E7E7EA",
        ink: "#0E1113",
        graphite: "#171A1D",
        "hydro-cyan": "#00A8E8",
        "industrial-gold": "#C9A92C",
      },
      fontFamily: {
        sans: ["IBM Plex Sans", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["Archivo", "IBM Plex Sans", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["IBM Plex Mono", "ui-monospace", "monospace"],
      },
      boxShadow: {
        plate: "4px 4px 0 0 rgba(14, 17, 19, 1)",
        "plate-sm": "3px 3px 0 0 rgba(14, 17, 19, 0.9)",
      },
      backgroundImage: {
        "blueprint-grid":
          "linear-gradient(rgba(14,17,19,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(14,17,19,0.07) 1px, transparent 1px)",
        "terminal-grid":
          "linear-gradient(rgba(0,168,232,0.14) 1px, transparent 1px), linear-gradient(90deg, rgba(0,168,232,0.14) 1px, transparent 1px)",
      },
    },
  },
  plugins: [],
};

export default config;
