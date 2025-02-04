/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./dist/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        layoutbgcolor: "#00081b",
        layouttextcolor: "#e9f2ff",
      },
    },
    screens: {
      medefault: "0px",
      mexs: "480px",
      mesm: "640px",
      memd: "960px",
      melg: "1200px",
    },
  },
  plugins: [],
};
