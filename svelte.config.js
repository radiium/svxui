// import adapter from '@sveltejs/adapter-auto';
// import adapter from '@sveltejs/adapter-static';
import adapter from '@sveltejs/adapter-vercel';
import {sveltePreprocess} from 'svelte-preprocess';
import { mdsvex } from 'mdsvex';
import mdsvexConfig, { mdsvexExtensions } from './mdsvex.config.js';
import { phosphorSvelteOptimize } from 'phosphor-svelte/preprocessor';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

process.env.PUBLIC_PKG_VERSION = process.env.npm_package_version;
process.env.PUBLIC_PKG_NAME = process.env.npm_package_name;
process.env.PUBLIC_PKG_HOMEPAGE = process.env.npm_package_homepage;

const path = fileURLToPath(new URL('package.json', import.meta.url));
const pkg = JSON.parse(readFileSync(path, 'utf8'));

/** @type {import('@sveltejs/kit').Config} */
const config = {
    extensions: ['.svelte', ...mdsvexExtensions],

    // Consult https://kit.svelte.dev/docs/integrations#preprocessors
    // for more information about preprocessors
    preprocess: [
        phosphorSvelteOptimize(),
        sveltePreprocess({
            scss: {
                prependData: "@use './src/lib/scss/mixins.scss' as *;"
            }
        }),
        mdsvex(mdsvexConfig)
    ],

    kit: {
        // adapter-auto only supports some environments, see https://kit.svelte.dev/docs/adapter-auto for a list.
        // If your environment is not supported or you settled on a specific environment, switch out the adapter.
        // See https://kit.svelte.dev/docs/adapters for more information about adapters.
        adapter: adapter(),
        version: {
            name: pkg.version
        }
    },

    vitePlugin: {
        inspector: {
            toggleKeyCombo: 'meta-shift',
            showToggleButton: 'always',
            toggleButtonPos: 'bottom-right'
        }
    }
};

export default config;
