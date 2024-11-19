import js from '@eslint/js';
import prettierRecommended from 'eslint-plugin-prettier/recommended';
import svelte from 'eslint-plugin-svelte';
import globals from 'globals';
import svelteParser from "svelte-eslint-parser";
import ts from 'typescript-eslint';

export default [
    js.configs.recommended,
    ...ts.configs.recommended,
    ...svelte.configs['flat/recommended'],
    prettierRecommended,
    ...svelte.configs['flat/prettier'],
     // Langage options
    // https://eslint.org/docs/latest/use/configure/language-options
    {
        languageOptions: {
            globals: {
                ...globals.browser,
                ...globals.node
            }
        }
    },
    // Svelte
    {
        files: ['**/*.svelte', '*.svelte'],
        languageOptions: {
            parser: svelteParser,
            parserOptions: {
                parser: ts.parser
            }
        },
        rules: {
            // TODO: In progress for Svelte 5
            // https://github.com/sveltejs/eslint-plugin-svelte/issues/652
            'svelte/valid-compile': 'off'
        }
    },
    // Ignores files
    // https://eslint.org/docs/latest/use/configure/ignore
    {
        ignores: [
            'node_modules',
            '**/node_modules',
            '.DS_Store',
            '**/build',
            '**/dist',
            '**/.svelte-kit',
            '**/.vercel',
            '**/.contentlayer',
            '**/$generated/',
            '**/package',
            '**/.',
            '.env',
            '.env.*',
            '!.env.example',
            'pnpm-lock.yaml'
        ]
    },
    // Custom rules
    {
        rules: {
            '@typescript-eslint/no-inferrable-types': 'off',
            '@typescript-eslint/no-unused-vars': 'off',
            '@typescript-eslint/no-unused-expressions': 'off',
            '@typescript-eslint/no-explicit-any': 'warn',
            'no-case-declarations': 'off'
        }
    }
];
