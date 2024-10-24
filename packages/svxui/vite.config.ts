import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';
import { join } from 'node:path';

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
    resolve: {
        alias: [
            {
                find: /~(.+)/,
                replacement: join(process.cwd(), 'node_modules/$1')
            }
        ]
    },
    optimizeDeps: {
        include: ['@floating-ui/dom', '@radix-ui/colors', 'nanoid']
    },
    test: {
        include: ['src/**/*.{test,spec}.{js,ts}']
    }
});
