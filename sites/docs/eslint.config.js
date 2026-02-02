import { buildEsLintConfig } from '@configs/eslint-config';
import { defineConfig } from 'eslint/config';
import svelteConfig from './svelte.config.js';

export default defineConfig([
    {
        languageOptions: {
            parserOptions: {
                tsconfigRootDir: process.cwd()
            }
        }
    },
    ...buildEsLintConfig({ svelteConfig })
]);
