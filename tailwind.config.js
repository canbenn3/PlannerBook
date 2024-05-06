/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts,js,jsx,tsx,md,mdx}"],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
}

