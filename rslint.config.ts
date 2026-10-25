import { defineConfig, js, ts } from '@rslint/core';

export default defineConfig([
  {
    settings: {
      react: {
        version: 'detect',
      },
    },
    languageOptions: {
      parserOptions: { project: ['./tsconfig.json'] },
    },
  },
  js.configs.recommended,
  ts.configs.recommendedTypeChecked,
  {
    rules: {
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-unsafe-assignment": "off",
    },
  },
]);
