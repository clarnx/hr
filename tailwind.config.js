/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      aspectRatio: {
        "24/5": "24 / 5",
      },
    },

  },

  safelist: [
    {
      pattern: /bg-/,
      variants: ['lg', 'hover', 'focus', 'lg:hover'],
    }
],
  plugins: [],
};
