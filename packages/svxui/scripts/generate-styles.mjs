/* eslint-disable no-console */
import { cpSync, existsSync, mkdirSync, rmSync, writeFileSync } from 'fs';
import { resolve } from 'path';
import { compile } from 'sass';

const BASE_INPUT_DIR = resolve('styles');
const BASE_OUTPUT_DIR = resolve('src/lib/styles');

// ---- clean output folder
if (existsSync(BASE_OUTPUT_DIR)) {
    rmSync(BASE_OUTPUT_DIR, { recursive: true });
}
mkdirSync(BASE_OUTPUT_DIR);

// ---- copy radix colors
[
    {
        src: 'colors',
        dest: 'colors'
    }
].forEach(({ src, dest }) => {
    const input = resolve(BASE_INPUT_DIR, src);
    const output = resolve(BASE_OUTPUT_DIR, dest);

    cpSync(input, output, { recursive: true });
    console.log('copy directory :', input.replace(resolve('./'), '.'));
});

// ---- Build CSS files
[
    /**
     * Theme
     */
    {
        src: 'theme/index.scss',
        dest: 'theme.default.css'
    },
    /**
     * Tokens
     */
    {
        src: 'tokens/index.scss',
        dest: 'tokens.css'
    },
    /**
     * Normalize
     */
    {
        src: 'normalize.scss',
        dest: 'normalize.css'
    },

    /**
     * Utilities — combined bundle
     */
    {
        src: 'utilities/index.scss',
        dest: 'utilities.css'
    },

    /**
     * Utilities — individual files (opt-in imports)
     */
    {
        src: 'utilities/space.scss',
        dest: 'utilities.space.css'
    },
    {
        src: 'utilities/size.scss',
        dest: 'utilities.size.css'
    },
    {
        src: 'utilities/display.scss',
        dest: 'utilities.display.css'
    },
    {
        src: 'utilities/overflow.scss',
        dest: 'utilities.overflow.css'
    },
    {
        src: 'utilities/flex-child.scss',
        dest: 'utilities.flex-child.css'
    },
    {
        src: 'utilities/grid-child.scss',
        dest: 'utilities.grid-child.css'
    }
].forEach(({ src, dest }) => {
    const input = resolve(BASE_INPUT_DIR, src);
    const output = resolve(BASE_OUTPUT_DIR, dest);

    try {
        const result = compile(input, { sourceMap: true, verbose: true });
        writeFileSync(output, result.css);
    } catch (error) {
        console.log('compile sass file error:', {
            src: input,
            dest: output,
            error
        });
    }
    console.log('compile sass file:', input.replace(resolve('./'), '.'));
});

console.log('✅ styles generated');
