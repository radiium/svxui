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
     * Utilities
     */
    {
        src: 'utilities/index.scss',
        dest: 'utilities.css'
    },
    {
        src: 'utilities/display.scss',
        dest: 'utilities.display.css'
    },
    {
        src: 'utilities/flex.scss',
        dest: 'utilities.flex.css'
    },
    {
        src: 'utilities/gap.scss',
        dest: 'utilities.gap.css'
    },
    {
        src: 'utilities/overflow.scss',
        dest: 'utilities.overflow.css'
    },
    {
        src: 'utilities/inset.scss',
        dest: 'utilities.inset.css'
    },
    {
        src: 'utilities/position.scss',
        dest: 'utilities.position.css'
    },
    {
        src: 'utilities/radius.scss',
        dest: 'utilities.radius.css'
    },
    {
        src: 'utilities/size.scss',
        dest: 'utilities.size.css'
    },
    {
        src: 'utilities/space.scss',
        dest: 'utilities.space.css'
    },
    {
        src: 'utilities/visibility.scss',
        dest: 'utilities.visibility.css'
    },
    {
        src: 'utilities/cursor.scss',
        dest: 'utilities.cursor.css'
    },
    {
        src: 'utilities/pointer-events.scss',
        dest: 'utilities.pointer-events.css'
    },
    {
        src: 'utilities/z-index.scss',
        dest: 'utilities.z-index.css'
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
