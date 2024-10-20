import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      animation: {
        "animate-navbar": "animate-navbar 0.3s ease-in-out",
      },
      fontFamily: {
        robotoMono: ["var(--font-roboto-mono)"],
        inriaSans: ["var(--font-inria-sans)"],
      },
      colors: {
        background: "#191B1C",
        light: "#ACACAC",
        navbar: "#252728",
        primary: "#8BC8C7FF",
      },
      backgroundImage: {
        "button-primary": "linear-gradient(90deg, #63B9B8 0%, #4D9392 100%)",
        "button-secondary": "linear-gradient(90deg, #D5D5D5 0%, #BCBCBC 100%)",
        bubble:
          "linear-gradient(132.98deg, rgba(41, 69, 111, 0.6) 28.43%, rgba(95, 80, 143, 0.6) 110.85%)",
      },
      backdropBlur: {
        bubble: "720px",
      },
    },
  },
  plugins: [],
};
export default config;
