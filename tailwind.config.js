module.exports = {
  content: ['./src/**/*.{html,js,jsx,ts,tsx}'],
  theme: {
    extend: {
      backgroundImage: {
        'custom-gradient': 'linear-gradient(135deg, rgb(6, 147, 227) 0%, rgb(65, 0, 0) 39%, rgb(155, 81, 224) 100%)',
      },
      colors: {
        'custompurple': 'rgb(217 119 255 / 57%)',
      },
      boxShadow: {
        'even': '0 0 10px rgba(0, 0, 0, 0.47)',
        'odd': '0 0 10px rgba(0, 0, 0, 0.22)',
      },
    },
  },
  plugins: [],
};
