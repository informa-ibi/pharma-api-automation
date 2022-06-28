module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es6: true,
  },
  plugins: [
    'wdio'
  ],
  extends: [
    'plugin:wdio/recommended',
  ],
  parser: '@babel/eslint-parser',
  parserOptions: {
    requireConfigFile: false,
  },
  rules: {
    'indent': ['error', 2],
    'semi': ['error', 'always'],
    'no-extra-semi': ['error'],
    'no-multi-spaces': ['error'],
    'no-multiple-empty-lines': [1, {'max': 1}],
    'arrow-spacing': ['error', {
      before: true,
      after: true
    }],
    'curly': ['error', 'all']
  }
};