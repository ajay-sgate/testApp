module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
    'react-native/react-native': true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
      ts: true,
      tsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  plugins: ['react', 'react-native', '@typescript-eslint'],
  rules: {
    '@typescript-eslint/no-unused-vars': 2,

    // ts lint off
    '@typescript-eslint/no-var-requires': 0,
    '@typescript-eslint/no-explicit-any': 0,
    'unused-imports/no-unused-imports': 0,
    '@typescript-eslint/no-non-null-assertion':0,
    'no-empty': 0,
    'react/jsx-key': 0,
    '@typescript-eslint/ban-ts-comment': 0,

    'react-native/no-unused-styles': 2,
    'react-native/split-platform-components': 2,

    'react-native/no-inline-styles': 2,
    "react-native/no-color-literals": 2,

    'react-native/no-raw-text': 2,
    'import/extensions': 0,
    'import/no-unresolved': 0,
    'import/prefer-default-export': 0,
    'react-native/no-single-element-style-arrays': 2,
    'react/prop-types': 0,

    'react-native/sort-styles': [
      'error',
      'asc',
      {
        ignoreClassNames: false,
        ignoreStyleProperties: false,
      },
    ],
  },
};

// 0 = off, 1 = warn, 2 = error (you passed '"on"').