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
        brand: "#5B5CE2",
        "brand-hover": "#4B4CC7",
        "brand-light": "#EEEEFF",
        "page-bg": "#F7F8FC",
        "text-primary": "#1F2430",
        "text-secondary": "#626B7A",
        "border-color": "#E5E8EF",
        success: "#16A36A",
        warning: "#E58A16",
        error: "#D94A4A",
      },
      borderRadius: {
        card: "14px",
        button: "10px",
      },
    },
  },
  plugins: [],
};

export default config;
