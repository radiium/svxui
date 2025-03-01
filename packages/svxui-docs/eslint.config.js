import { buildEsLintConfig } from '@configs/eslint-config';
import svelteConfig from './svelte.config.js';

const conf = buildEsLintConfig(svelteConfig);
export default [
    ...conf,
    {
        ignores: ['src/styles/**']
    }
];
