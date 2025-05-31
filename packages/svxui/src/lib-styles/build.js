import { cpSync, existsSync, mkdirSync, rmSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { compile } from 'sass';

const baseInputDir = resolve(import.meta.dirname, './');
const baseOutputDir = resolve(import.meta.dirname, '../lib/styles/');

// Clean output folder
if (existsSync(baseOutputDir)) {
    rmSync(baseOutputDir, { recursive: true });
}
mkdirSync(baseOutputDir);

console.log('[STYLES] copy folders');
[
    {
        src: 'colors',
        dest: 'colors',
    },
].forEach(({ src, dest }) => {
    const input = resolve(baseInputDir, src);
    const output = resolve(baseOutputDir, dest);
    cpSync(input, output, { recursive: true });
});


console.log('[STYLES] build scss files');
[
    /**
     * Theme
     */
    {
        src: 'theme/index.scss',
        dest: 'theme.default.css',
    },
    /**
     * Tokens
     */
    {
        src: 'tokens/index.scss',
        dest: 'tokens.css',
    },
    /**
     * Normalize
     */
    {
        src: 'normalize.scss',
        dest: 'normalize.css',
    },

    /**
     * Utilities
     */
    {
        src: 'utilities/index.scss',
        dest: 'utilities.css',
    },
    {
        src: 'utilities/display.scss',
        dest: 'utilities.display.css',
    },
    {
        src: 'utilities/flex.scss',
        dest: 'utilities.flex.css',
    },
    {
        src: 'utilities/gap.scss',
        dest: 'utilities.gap.css',
    },
    {
        src: 'utilities/overflow.scss',
        dest: 'utilities.overflow.css',
    },
    {
        src: 'utilities/position.scss',
        dest: 'utilities.position.css',
    },
    {
        src: 'utilities/size.scss',
        dest: 'utilities.size.css',
    },
    {
        src: 'utilities/space.scss',
        dest: 'utilities.space.css',
    },
    {
        src: 'utilities/visibility.scss',
        dest: 'utilities.visibility.css',
    },

].forEach(({ src, dest }) => {
    const input = resolve(baseInputDir, src)
    const output = resolve(baseOutputDir, dest)

    const result = compile(input, { sourceMap: true, verbose: true });
    writeFileSync(output, result.css);
});