module.exports = {
  '*.{js,jsx,ts,tsx,md,html,css,graphql,json}': 'prettier --write',
  'packages/**/*.ts?(x)': 'eslint',
};
