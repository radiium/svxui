import { sveltekit } from '@sveltejs/kit/vite';
import { playwright } from '@vitest/browser-playwright';
import devtoolsJson from 'vite-plugin-devtools-json';
import { defineConfig } from 'vitest/config';

export default defineConfig({
    plugins: [sveltekit(), devtoolsJson()],
    server: {
        port: 5174
    },
    optimizeDeps: {
        include: ['@floating-ui/dom']
    },
    test: {
        expect: { requireAssertions: true },
        // pool: 'forks',
        // maxWorkers: 7,
        projects: [
            {
                // Client-side tests (Svelte components)
                extends: true,
                test: {
                    name: 'client',
                    testTimeout: 2000,
                    include: ['src/**/*.svelte.{test,spec}.{js,ts}'],
                    exclude: ['src/lib/server/**', 'src/**/*.ssr.{test,spec}.{js,ts}'],
                    setupFiles: ['./src/vitest-setup-client.ts'],
                    browser: {
                        enabled: true,
                        provider: playwright(),
                        instances: [
                            { browser: 'chromium' }
                            // { browser: 'chromium', headless: true }
                            // { browser: 'firefox' }
                            // { browser: 'firefox', headless: true }
                            // { browser: 'webkit' }
                            // { browser: 'webkit', headless: true }
                        ]
                    }
                }
            },
            {
                // SSR tests (Server-side rendering)
                extends: true,
                test: {
                    name: 'ssr',
                    environment: 'node',
                    include: ['src/**/*.ssr.{test,spec}.{js,ts}']
                }
            },
            {
                // Server-side tests (Node.js utilities)
                extends: true,
                test: {
                    name: 'server',
                    environment: 'node',
                    include: ['src/**/*.{test,spec}.{js,ts}'],
                    exclude: ['src/**/*.svelte.{test,spec}.{js,ts}']
                }
            }
        ]
    }
});
