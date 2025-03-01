import { includeIgnoreFile } from '@eslint/compat';
import js from '@eslint/js';
import prettier from 'eslint-config-prettier';
import svelte from 'eslint-plugin-svelte';
import globals from 'globals';
import { fileURLToPath } from 'node:url';
import ts from 'typescript-eslint';

const prettierignorePath = fileURLToPath(new URL('../../.prettierignore', import.meta.url));

export function buildEsLintConfig(svelteConfig) {
    return [
        includeIgnoreFile(prettierignorePath),
        js.configs.recommended,
        ...ts.configs.recommended,
        ...svelte.configs.recommended,
        prettier,
        ...svelte.configs.prettier,
        {
            languageOptions: {
                globals: {
                    ...globals.browser,
                    ...globals.node
                }
            }
        },
        {
            files: ['**/*.svelte', '**/*.svelte.ts', '**/*.svelte.js'],
            ignores: ['eslint.config.js', 'svelte.config.js'],
            languageOptions: {
                parserOptions: {
                    projectService: true,
                    extraFileExtensions: ['.svelte'],
                    parser: ts.parser,
                    svelteConfig
                }
            }
        },
        // Custom rules
        {
            rules: {
                '@typescript-eslint/no-inferrable-types': 'warn',
                '@typescript-eslint/no-unused-vars': 'warn',
                '@typescript-eslint/no-unused-expressions': 'warn',
                '@typescript-eslint/no-explicit-any': 'warn',
                'no-case-declarations': 'off',
                'svelte/no-unused-svelte-ignore': 'warn'
            }
        }
    ]
};
