import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import examples from 'mdsvexamples/vite';

export default defineConfig({
    plugins: [sveltekit(), examples],
    server: {
        port: 5175
    },
    build: {
        chunkSizeWarningLimit: 800
    }
});
