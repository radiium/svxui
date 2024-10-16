import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';

export default defineConfig({
    plugins: [sveltekit()],
    server: {
        port: 5174
    },
    css: {
        preprocessorOptions: {
            scss: {
                api: 'modern-compiler'
            }
        }
    },
    optimizeDeps: {
        include: ['@floating-ui/dom', '@radix-ui/colors', 'nanoid']
    },
    test: {
        include: ['src/**/*.{test,spec}.{js,ts}']
    }
});