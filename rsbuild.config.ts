import { defineConfig, loadEnv } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';

const { publicVars } = loadEnv({ prefixes: ['REACT_APP_'] });

console.log(publicVars);
export default defineConfig({
  plugins: [pluginReact()],
  source: {
    define: {
      ...publicVars,
    },
  },
  html: {
    template: './public/index.html',
  },
});