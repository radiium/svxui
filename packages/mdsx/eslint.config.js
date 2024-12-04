import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';

/** @type {import('eslint').Linter.Config[]} */
export default [
    { files: ['**/*.{js,mjs,cjs,ts}'] },
    { languageOptions: { globals: globals.browser } },
    pluginJs.configs.recommended,
    ...tseslint.configs.recommended,
    {
        // Note: there should be no other properties in this object
        ignores: ['coverage', 'public', 'dist', 'pnpm-lock.yaml']
    },
    {
        rules: {
            'no-unused-vars': 'off',
            '@typescript-eslint/no-unused-vars': 'off'
        }
    },

    eslintPluginPrettierRecommended
];
