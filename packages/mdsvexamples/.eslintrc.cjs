import { buildEsLintConfig } from '@configs/eslint-config';
import svelteConfig from './svelte.config.js';

const conf = buildEsLintConfig(svelteConfig);
export default [
    ...conf,
    {
        ignores: ['src/styles/**'],
        rules: {
            'no-restricted-imports': ['error', { name: 'path', message: 'use upath instead' }]
        }
    }
];
