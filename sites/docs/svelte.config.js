import adapter from '@sveltejs/adapter-vercel';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { mdsx } from 'mdsx';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { phosphorSvelteOptimize } from 'phosphor-svelte/preprocessor';
import { mdsxConfig } from './mdsx.config.js';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const libPackageJson = JSON.parse(
    String(readFileSync(resolve(__dirname, '../../packages/svxui/package.json')))
);

process.env.PUBLIC_PKG_VERSION = libPackageJson.version;
process.env.PUBLIC_PKG_NAME = libPackageJson.name;
process.env.PUBLIC_PKG_HOMEPAGE = libPackageJson.homepage;

/** @type {import('@sveltejs/kit').Config} */
const config = {
    extensions: ['.svelte', '.md'],
    preprocess: [
        phosphorSvelteOptimize(), //
        mdsx(mdsxConfig),
        vitePreprocess()
    ],
    kit: {
        adapter: adapter({
            runtime: 'nodejs18.x'
        })
    }
};

export default config;
