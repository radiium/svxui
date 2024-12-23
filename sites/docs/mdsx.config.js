import { defineConfig } from '@packages/mdsx';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import rehypePrettyCode from 'rehype-pretty-code';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';
import { getSingletonHighlighter } from 'shiki';
import { visit } from 'unist-util-visit';

const __dirname = fileURLToPath(new URL('.', import.meta.url));

/**
 * @type {import('rehype-pretty-code').Options}
 */
const prettyCodeOptions = {
    keepBackground: false,
    defaultLang: {
        block: 'svelte',
        inline: 'svelte'
    },
    theme: {
        dark: JSON.parse(
            String(readFileSync(resolve(__dirname, './src/lib/styles/themes/tokyo-night-storm.json')))
        ),
        light: JSON.parse(
            String(readFileSync(resolve(__dirname, './src/lib/styles/themes/tokyo-night-light.json')))
        )
    },
    getHighlighter: (options) => {
        return getSingletonHighlighter({
            ...options,
            langs: [
                'plaintext',
                import('shiki/langs/javascript.mjs'),
                import('shiki/langs/typescript.mjs'),
                import('shiki/langs/css.mjs'),
                import('shiki/langs/svelte.mjs'),
                import('shiki/langs/shellscript.mjs'),
                import('shiki/langs/markdown.mjs')
            ]
        });
    },
    onVisitLine(node) {
        if (node.children.length === 0) {
            // @ts-expect-error - we're changing the node type
            node.children = { type: 'text', value: ' ' };
        }
    },
    onVisitHighlightedLine(node) {
        node.properties.className = ['line--highlighted'];
    },
    onVisitHighlightedChars(node) {
        node.properties.className = ['chars--highlighted'];
    }
};

/**
 * Removes `<!-- prettier-ignore -->` and `// prettier-ignore` from code blocks
 * before they are converted to HTML for syntax highlighting.
 *
 * We do this because sometimes we want to force a line break in code blocks, but
 * prettier removes them, however, we don't want to include the ignore statement
 * in the final code block.
 *
 * One caveat is that if you did want to include the ignore statement in the final
 * code block, you'd have to do some hacky stuff like including it in the comment
 * itself and checking for it in the code block, but that's not something we need
 * at the moment.
 *
 */
function remarkRemovePrettierIgnore() {
    return async (tree) => {
        visit(tree, 'code', (node) => {
            node.value = node.value
                .replaceAll('<!-- prettier-ignore -->\n', '')
                .replaceAll('// prettier-ignore\n', '');
        });
    };
}

/**
 * Adds `data-metadata` to `<figure>` elements that contain a `<figcaption>`.
 * We use this to style elements within the `<figure>` differently if a `<figcaption>`
 * is present.
 *
 * @returns {HastTransformer} a hast transformer
 */
function rehypeHandleMetadata() {
    return async (tree) => {
        visit(tree, (node) => {
            if (node?.type === 'element' && (node?.tagName === 'figure' || node?.tagName === 'span')) {
                if (!('data-rehype-pretty-code-figure' in node.properties)) {
                    return;
                }

                if (node.tagName === 'span') {
                    node.properties['data-code-inline'] = '';
                } else {
                    node.properties['data-code-pre'] = '';
                }

                const preElement = node.children.at(-1);
                if (preElement && 'tagName' in preElement && preElement.tagName !== 'pre') {
                    return;
                }

                const firstChild = node.children.at(0);

                if (firstChild && 'tagName' in firstChild && firstChild.tagName === 'figcaption') {
                    node.properties['data-metadata'] = '';
                    const lastChild = node.children.at(-1);
                    if (lastChild && 'properties' in lastChild) {
                        lastChild.properties['data-metadata'] = '';
                    }
                }
            }
        });
    };
}

/**
 * Converts tabs to spaces in code blocks to fit more into the viewport.
 *
 * @returns {MdastTransformer} - A unified transformer
 *
 */
function remarkTabsToSpaces() {
    return async (tree) => {
        visit(tree, 'code', (node) => {
            node.value = node.value
                // @ts-expect-error - not dealing with this rn
                .replaceAll('\t', '  ');
        });
    };
}

export const mdsxConfig = defineConfig({
    extensions: ['.md'],
    remarkPlugins: [
        remarkGfm, //
        remarkRemovePrettierIgnore,
        remarkTabsToSpaces
    ],
    rehypePlugins: [
        [rehypePrettyCode, prettyCodeOptions], //
        rehypeHandleMetadata,
        rehypeSlug
    ],
    blueprints: {
        default: {
            path: resolve(__dirname, './src/lib/components/markdown/LayoutDefault.svelte')
        }
    }
});
