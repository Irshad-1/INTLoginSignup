module.exports = {
  root: true,
  extends: '@react-native-community/eslint-config',
  rules: {
    'prettier/prettier': ['error', {endOfLine: 'auto'}],
    'react-native/no-inline-styles': 0,
  },
  parser: 'babel-eslint',
};
