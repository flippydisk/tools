import js from '@eslint/js';
import globals from 'globals';

export default [
  {
    ignores: ['coverage/**', 'dist/**', 'docs/dist/**', 'node_modules/**']
  },
  js.configs.recommended,
  {
    files: ['**/*.js'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.jest
      }
    },
    rules: {
      'indent': ['error', 4, { SwitchCase: 1 }],
      'comma-dangle': ['error', 'only-multiline'],
      'comma-style': ['error', 'last'],
      'constructor-super': 'off',
      'class-methods-use-this': 'off',
      'implicit-arrow-linebreak': 'error',
      'lines-between-class-members': ['error', 'always', { exceptAfterSingleLine: true }],
      'max-classes-per-file': 'off',
      'max-len': ['error', { code: 200, tabWidth: 4 }],
      'no-console': 'off',
      'no-multiple-empty-lines': 'error',
      'no-param-reassign': 'off',
      'no-plusplus': ['error', { allowForLoopAfterthoughts: true }],
      'no-restricted-globals': 'off',
      'no-undef': 'off',
      'object-curly-newline': ['error', { consistent: true }],
      'operator-linebreak': 'error',
      'prefer-destructuring': 'off'
    }
  }
];
