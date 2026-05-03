import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import devtoolsJson from 'vite-plugin-devtools-json';
import { svelteWithSourcePlugin } from './vite.plugin';

export default defineConfig({
    plugins: [svelteWithSourcePlugin(), sveltekit(), devtoolsJson()],
    server: {
        port: 5175
    },
    build: {
        chunkSizeWarningLimit: 800
    }
});
