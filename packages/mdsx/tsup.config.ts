import { defineConfig, type Options } from 'tsup';

export default defineConfig({
    splitting: false,
    clean: true,
    dts: true,
    sourcemap: true,
    format: ['esm'],
    minify: false,
    bundle: true,
    skipNodeModulesBundle: true,
    entry: ['src/index.ts'],
    target: 'esnext',
    outDir: 'dist'
});
