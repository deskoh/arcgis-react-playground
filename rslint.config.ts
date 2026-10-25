import {
  defineConfig,
  importPlugin,
  js,
  reactHooksPlugin,
  reactPlugin,
  ts,
} from '@rslint/core';

export default defineConfig([
  {
    settings: {
      react: {
        version: 'detect',
      },
       'import/resolver': {
          typescript: {
            project: './tsconfig.json',
          },
      },
    },
    languageOptions: {
      parserOptions: { project: ['./tsconfig.json'] },
    },
  },
  js.configs.recommended,
  ts.configs.recommendedTypeChecked,
  importPlugin.configs.recommended,
  reactPlugin.configs.recommended,
  reactHooksPlugin.configs.recommended,
  {
    rules: {
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-unsafe-assignment": "off",
      "import/no-unresolved": ["error", { caseSensitive: false, ignore: ['\\.css$'], }],
    },
  },
]);
