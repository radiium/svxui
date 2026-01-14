import { transformerNotationHighlight } from '@shikijs/transformers';
import { defineMDSveXConfig, escapeSvelte } from 'mdsvex';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import rehypeSlug from 'rehype-slug';
import { createHighlighter } from 'shiki';

const __dirname = fileURLToPath(new URL('.', import.meta.url));

const highlighter = await createHighlighter({
    themes: ['dark-plus', 'light-plus'],
    langs: ['svelte', 'javascript', 'typescript', 'bash']
});

/**
 * @param {string} src
 * @returns
 */
export function escape(src) {
    const res = src.replace(/`/g, '\\`').replace(/\$\{/g, '\\$\\{');
    return res;
}

/**
 * @param {string} meta
 * @returns
 */
function parseMeta(meta = '') {
    /** @type {Record<string, any>} */
    const result = {};
    const metaParts = meta.match(/(\w+=\d+|\w+="[^"]*"|\w+=\[[^\]]*\]|\w+)/g) ?? [];

    for (const part of metaParts) {
        const [key, value = 'true'] = part.split('=');

        try {
            result[key] = JSON.parse(value);
        } catch (/** @type {any} */ e) {
            const error = new Error(`Unable to parse meta \`${key}=${value}\` - ${e.message}`);
            error.stack = e.stack;
            throw error;
        }
    }

    return result;
}

/** @type {import('mdsvex').MdsvexOptions} */
export const mdsvexOptions = defineMDSveXConfig({
    extensions: ['.svx'],
    layout: resolve(__dirname, './src/lib/markdown/MdsvexLayout.svelte'),
    highlight: {
        /**
         *
         * @param {string} code
         * @param {any} lang
         * @param {string | undefined | null} metastring
         * @returns {Promise<string>}
         */
        highlighter: async (code, lang = 'text', metastring) => {
            const meta = escape(JSON.stringify(parseMeta(metastring ?? '')));
            const html = escapeSvelte(
                highlighter.codeToHtml(code, {
                    lang,
                    themes: {
                        dark: 'dark-plus',
                        light: 'light-plus'
                    },
                    transformers: [
                        transformerNotationHighlight({
                            matchAlgorithm: 'v1'
                        })
                    ]
                })
            );

            return `<Components.pre meta={${meta}}>{@html \`${html}\`}</Components.pre>`;
        }
    },
    smartypants: {
        dashes: 'oldschool'
    },
    remarkPlugins: [],
    rehypePlugins: [rehypeSlug]
});
