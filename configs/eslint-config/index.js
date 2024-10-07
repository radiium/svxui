import jsesLint from '@eslint/js';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import eslintPluginSvelte from 'eslint-plugin-svelte';
import globals from 'globals';
import svelteEslintParser from 'svelte-eslint-parser';
import tseslint from 'typescript-eslint';

export default [
    jsesLint.configs.recommended,
    ...tseslint.configs.recommended,
    ...eslintPluginSvelte.configs['flat/recommended'],
    ...eslintPluginSvelte.configs['flat/prettier'],
    eslintPluginPrettierRecommended,
    // Svelte
    {
        files: ['**/*.svelte', '*.svelte'],
        languageOptions: {
            parser: svelteEslintParser,
            parserOptions: {
                parser: tseslint.parser
            }
        },
        rules: {
            // TODO: In progress for Svelte 5
            // https://github.com/sveltejs/eslint-plugin-svelte/issues/652
            'svelte/valid-compile': 'off'
        }
    },
    // Langage options
    // https://eslint.org/docs/latest/use/configure/language-options
    {
        languageOptions: {
            globals: {
                ...globals.node,
                ...globals.browser
            }
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
            '**/$generated/',
            '**/package',
            '**/.',
            '**/.vercel',
            '**/dist',
            '.env',
            '.env.*',
            '!.env.example',
            'pnpm-lock.yaml',
            '.contentlayer'
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
