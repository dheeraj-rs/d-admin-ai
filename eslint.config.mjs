import eslintPluginImport from 'eslint-plugin-import';
import nextPlugin from '@next/eslint-plugin-next';

const eslintConfig = [
  {
    plugins: {
      import: eslintPluginImport,
      '@next/next': nextPlugin,
    },
    rules: {
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs['core-web-vitals'].rules,
      'max-lines': ['error', { max: 250 }],
      'max-lines-per-function': ['error', { max: 150 }],
      'import/order': [
        'error',
        {
          groups: ['builtin', 'external', 'internal', ['parent', 'sibling', 'index']],
          pathGroups: [
            { pattern: 'react', group: 'external', position: 'before' },
            { pattern: 'next/**', group: 'external', position: 'before' },
            { pattern: '@/shared/**', group: 'internal', position: 'after' },
            { pattern: '@/features/**', group: 'internal', position: 'after' },
          ],
          pathGroupsExcludedImportTypes: ['react'],
          'newlines-between': 'always',
          alphabetize: { order: 'asc', caseInsensitive: true },
        },
      ],
    },
  },
];

export default eslintConfig;