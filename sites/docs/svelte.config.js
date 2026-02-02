import adapter from '@sveltejs/adapter-vercel';
import { mdsvex } from 'mdsvex';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { sveltePhosphorOptimize } from 'phosphor-svelte/vite';
import { sveltePreprocess } from 'svelte-preprocess';
import { mdsvexOptions } from './mdsvex.config.js';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const libPackageJson = JSON.parse(
    String(readFileSync(resolve(__dirname, '../../packages/svxui/package.json')))
);

process.env.PUBLIC_PKG_VERSION = libPackageJson.version;
process.env.PUBLIC_PKG_NAME = libPackageJson.name;
process.env.PUBLIC_PKG_HOMEPAGE = libPackageJson.homepage;
process.env.PUBLIC_LIB_FOLDER = libPackageJson.homepage + '/tree/main/packages/svxui/src/lib';

/** @type {import('@sveltejs/kit').Config} */
const config = {
    // Consult https://svelte.dev/docs/kit/integrations
    // for more information about preprocessors
    preprocess: [
        sveltePreprocess(), //
        sveltePhosphorOptimize(),
        mdsvex(mdsvexOptions)
    ],
    kit: {
        // adapter-auto only supports some environments, see https://svelte.dev/docs/kit/adapter-auto for a list.
        // If your environment is not supported, or you settled on a specific environment, switch out the adapter.
        // See https://svelte.dev/docs/kit/adapters for more information about adapters.
        adapter: adapter()
    },
    extensions: ['.svelte', '.svx']
};

export default config;
