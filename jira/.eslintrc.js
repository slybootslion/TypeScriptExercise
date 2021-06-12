module.exports = {
  env: {
    'node': true,
    'mocha': true,
    'jest': true,
    'es6': true,
    'browser': true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
  ],
  parser: 'babel-eslint',
  parserOptions: {
    'ecmaFeatures': {
      'jsx': true,
    },
    'ecmaVersion': 6,
    'sourceType': 'module',
  },
  plugins: [
    'react',
    'jsx-a11y',
    'react-hooks',
  ],
  settings: {
    'react': {
      'version': 'detect',
    },
  },
  globals: {
    'JSX': true,
    'TSX': true,
    'React': true,
    'NodeJS': true,
    'Promise': true,
  },
  rules: {
    'no-proto': 0,
    'comma-dangle': [2, 'always-multiline'],
    'quotes': [1, 'single'],
    'arrow-parens': ['error', 'as-needed'],
    'semi': [1, 'never'],
    'react/prop-types': 0, //防止在react组件定义中缺少props验证，tsx里用不着，但是jsx里不定义会报错
  },
}
