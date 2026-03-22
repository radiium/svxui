import adapter from '@sveltejs/adapter-auto';
import autoprefixer from 'autoprefixer';
import { sveltePreprocess } from 'svelte-preprocess';

process.env.PUBLIC_PKG_VERSION = process.env.npm_package_version;
process.env.PUBLIC_PKG_NAME = process.env.npm_package_name;
process.env.PUBLIC_PKG_HOMEPAGE = process.env.npm_package_homepage;

/** @type {import('@sveltejs/kit').Config} */
const config = {
    kit: {
        // adapter-auto only supports some environments, see https://svelte.dev/docs/kit/adapter-auto for a list.
        // If your environment is not supported, or you settled on a specific environment, switch out the adapter.
        // See https://svelte.dev/docs/kit/adapters for more information about adapters.
        adapter: adapter(),
        version: {
            name: process.env.npm_package_version
        }
    },
    preprocess: [
        sveltePreprocess({
            postcss: {
                plugins: [autoprefixer]
            }
        })
    ]
};

export default config;
