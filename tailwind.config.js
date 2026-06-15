/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#18221d",
        herb: "#2f6f4f",
        mint: "#eaf6ef",
        field: "#f7faf6",
        line: "#dfe8de",
      },
      boxShadow: {
        soft: "0 20px 60px rgba(24, 34, 29, 0.08)",
      },
    },
  },
  plugins: [],
};
