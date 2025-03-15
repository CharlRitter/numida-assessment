import typescriptPlugin from '@typescript-eslint/eslint-plugin';
import reactPlugin from 'eslint-plugin-react';
import hooksPlugin from 'eslint-plugin-react-hooks';
import prettierPlugin from 'eslint-plugin-prettier';
import * as parser from '@typescript-eslint/parser';
import importPlugin from 'eslint-plugin-import';
import eslint from '@eslint/js';
import typescriptLint from 'typescript-eslint';
import prettierLint from 'eslint-config-prettier';

export default [
  {
    ignores: ['src/assets/**', 'src/__generated__/**']
  },
  {
    files: ['src/**/*.ts', 'src/**/*.js', 'src/**/*.tsx'],
    languageOptions: {
      parser,
      parserOptions: {
        ecmaVersion: 2022, // ES2022 is equivalent to ecmaVersion 13
        sourceType: 'module',
        project: './tsconfig.app.json'
      }
    },
    settings: {
      'import/resolver': {
        typescript: {
          project: './tsconfig.app.json'
        }
      }
    },
    plugins: {
      typescript: typescriptPlugin,
      prettier: prettierPlugin,
      react: reactPlugin,
      'react-hooks': hooksPlugin
    },
    rules: {
      'comma-dangle': 'off',
      'no-unused-expressions': 'off',
      '@typescript-eslint/no-unused-expressions': [
        'error',
        {
          allowShortCircuit: true,
          allowTernary: true,
          allowTaggedTemplates: true
        }
      ],
      '@typescript-eslint/comma-dangle': 'off',
      '@typescript-eslint/indent': 'off',
      '@typescript-eslint/no-explicit-any': 'warn',
      'react/jsx-props-no-spreading': 'warn',
      'import/prefer-default-export': 'off',
      'import/order': [
        'error',
        {
          groups: [
            'builtin', // Built-in imports (come from NodeJS native) go first
            'external', // <- External imports
            'internal', // <- Absolute imports
            ['sibling', 'parent'], // <- Relative imports, the sibling and parent types they can be mingled together
            'index', // <- index imports
            'unknown' // <- unknown
          ],
          'newlines-between': 'always',
          alphabetize: {
            order: 'asc',
            caseInsensitive: true
          }
        }
      ],
      'import/no-unresolved': 'error',
      'sort-imports': [
        'error',
        {
          ignoreCase: false,
          ignoreDeclarationSort: true,
          ignoreMemberSort: false,
          memberSyntaxSortOrder: ['none', 'all', 'multiple', 'single'],
          allowSeparatedGroups: true
        }
      ]
    }
  },
  eslint.configs.recommended,
  ...typescriptLint.configs.recommended,
  prettierLint,
  importPlugin.flatConfigs.recommended,
  importPlugin.flatConfigs.typescript
];
