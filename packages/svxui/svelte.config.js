import adapter from '@sveltejs/adapter-vercel';
import { sveltePreprocess } from 'svelte-preprocess';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { resolve } from 'node:path';

process.env.PUBLIC_PKG_VERSION = process.env.npm_package_version;
process.env.PUBLIC_PKG_NAME = process.env.npm_package_name;
process.env.PUBLIC_PKG_HOMEPAGE = process.env.npm_package_homepage;

const path = fileURLToPath(new URL('package.json', import.meta.url));
const pkg = JSON.parse(readFileSync(path, 'utf8'));

/** @type {import('@sveltejs/kit').Config} */
const config = {
    // Consult https://kit.svelte.dev/docs/integrations#preprocessors
    // for more information about preprocessors
    preprocess: [
        sveltePreprocess({
            scss: {
                prependData: `@use "${resolve(import.meta.dirname, './src/lib/scss/mixins.scss')}" as *;`
            }
        })
    ],
    kit: {
        // adapter-auto only supports some environments, see https://kit.svelte.dev/docs/adapter-auto for a list.
        // If your environment is not supported, or you settled on a specific environment, switch out the adapter.
        // See https://kit.svelte.dev/docs/adapters for more information about adapters.
        adapter: adapter(),
        version: {
            name: pkg.version
        }
    }
};

export default config;
