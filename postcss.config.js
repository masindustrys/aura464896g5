module.exports = {
  plugins: {
    '@tailwindcss/nesting': {},
    'postcss-import': {},
    'tailwindcss': {},
    'autoprefixer': {},
    'postcss-preset-env': {
      stage: 3,
      features: {
        'nesting-rules': false
      }
    }
  }
};