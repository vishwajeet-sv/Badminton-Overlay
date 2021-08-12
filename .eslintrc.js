module.exports = {
  env: {
    es6: true,
  },
  extends: ['airbnb', 'prettier', 'prettier/react'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
    fetch: false,
    __DEV__: false,
    window: false,
    localStorage: false,
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  parser: 'babel-eslint',
  plugins: ['react', 'prettier'],
  rules: {
    'react/jsx-filename-extension': [
      1,
      {
        extensions: ['.js', 'jsx'],
      },
    ],
    'prettier/prettier': 'error',
    'max-len': ['error', 100],

    // for _id field in API responses
    'no-underscore-dangle': ['error', { allow: ['_id'] }],
    'no-console': ['warn', { allow: ['error'] }],

    //  prop validation
    'react/prop-types': 0,
  },
};
