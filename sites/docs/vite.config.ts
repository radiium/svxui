import { sveltekit } from '@sveltejs/kit/vite';
import { URL, fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';

export default defineConfig({
    plugins: [sveltekit()],
    // test: {
    //     include: ['src/**/*.{test,spec}.{js,ts}']
    // },
    server: {
        fs: {
            strict: false
        }
    },
    css: {
        preprocessorOptions: {
            scss: {
                api: 'modern-compiler'
            }
        }
    },
    assetsInclude: ['**/*.md', '**/*.mdx'],
    resolve: {
        alias: [
            {
                find: 'contentlayer/generated',
                replacement: fileURLToPath(new URL('./.contentlayer/generated', import.meta.url))
            }
        ]
    }
});
