module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  // https://github.com/feross/standard/blob/master/RULES.md#javascript-standard-style
  extends: 'standard',
  // required to lint *.vue files
  plugins: [
    'html'
  ],
  // add your custom rules here
  'rules': {
    // allow paren-less arrow functions
    'arrow-parens': 0,
    // allow async-await
    'generator-star-spacing': 0,
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    'semi': 0,
    'indent': 0,
    'key-spacing': 0,
    'space-before-function-paren': 0,
    'space-before-blocks': 0,
    'space-infix-ops': 0,
    'keyword-spacing': 0,
    'comma-dangle': 0,
    'no-unused-vars': 0,
    'space-in-parens': 0,
    'eol-last': 0,
    'camelcase': 0,
    'quotes': 0,
    'no-undef': 0,
    'no-multiple-empty-lines': 0
  }
}
