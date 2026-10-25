import { defineConfig, loadEnv } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';
import { pluginTypeCheck } from '@rsbuild/plugin-type-check';


const { publicVars } = loadEnv({ prefixes: ['REACT_APP_'] });

console.log(publicVars);
export default defineConfig({
  plugins: [pluginReact({
    reactCompiler: true,
  }), pluginTypeCheck()],
  source: {
    define: {
      ...publicVars,
    },
  },
  html: {
    template: './public/index.html',
  },
});