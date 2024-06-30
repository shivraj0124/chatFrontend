/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      animation: {
        cursor: "cursor 1s step-end infinite",
      },
      keyframes: {
        cursor: {
          "0%, 100%": { borderColor: "transparent" },
          "50%": { borderColor: "blue" },
        },
      },
    },
  },
  plugins: [],
};
