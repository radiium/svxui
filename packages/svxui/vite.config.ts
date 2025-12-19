import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';

export default defineConfig({
    plugins: [sveltekit()],
    server: {
        port: 5174
    },
    optimizeDeps: {
        include: ['@floating-ui/dom']
    },
    test: {
        include: ['src/**/*.{test,spec}.{js,ts}']
    }
});
