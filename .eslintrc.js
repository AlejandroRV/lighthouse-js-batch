module.exports = {
  env: {
    commonjs: true,
    es2021: true,
    node: true,
    mocha: true,
  },
  extends: 'airbnb-base',
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  rules: {
    indent: ['error', 2],
    'no-await-in-loop': 0,
    'no-plusplus': 0,
    'import/extensions': 0,
  },
  ignorePatterns: [
    'lib/',
    'reports/',
  ],
};
