import { includeIgnoreFile } from '@eslint/compat';
import js from '@eslint/js';
import prettier from 'eslint-config-prettier';
import svelte from 'eslint-plugin-svelte';
import { defineConfig } from 'eslint/config';
import globals from 'globals';
import path from 'node:path';
import ts from 'typescript-eslint';

const gitignorePath = path.resolve(import.meta.dirname, '.gitignore');

export default defineConfig(
    includeIgnoreFile(gitignorePath),
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
        languageOptions: {
            parserOptions: {
                extraFileExtensions: ['.svelte'], // Add support for additional file extensions, such as .svelte
                parser: ts.parser
            }
        },
        rules: {
            'svelte/prefer-const': 'error',
            'svelte/no-unused-svelte-ignore': 'warn',
            'svelte/no-unused-props': 'warn',
            'svelte/no-navigation-without-resolve': [
                'warn',
                {
                    ignoreGoto: false,
                    ignoreLinks: true,
                    ignorePushState: false,
                    ignoreReplaceState: false
                }
            ]
        }
    },
    {
        rules: {
            'no-undef': 'off',
            '@typescript-eslint/no-inferrable-types': 'warn',
            '@typescript-eslint/no-unused-vars': 'warn',
            '@typescript-eslint/no-unused-expressions': 'warn',
            '@typescript-eslint/no-explicit-any': 'warn',
            '@typescript-eslint/no-non-null-assertion': 'warn',
            'no-case-declarations': 'off',
            'no-console': ['warn', { allow: ['warn', 'error'] }],
            'prefer-const': 'off',
            'no-var': 'error'
        }
    },
    {
        ignores: ['**/dist/', '**/.svelte-kit/', '**/.vercel/', 'packages/svxui/src/tests/**.d.ts']
    }
);
