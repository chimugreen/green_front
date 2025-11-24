import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import { defineConfig, globalIgnores } from 'eslint/config';

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs['recommended-latest'],
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    rules: {
      // 🔥 JS 기본 unused 경고 끄기
      'no-unused-vars': 'off',

      // 🔥 TS unused 경고 완전히 끄기
      '@typescript-eslint/no-unused-vars': 'off',

      // (선택) react props도 무시
      // 'react/jsx-uses-vars': 'off'
    },
  },
]);
