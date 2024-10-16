import { defineConfig } from 'mdsx';
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
 * @typedef {import('mdast').Root} MdastRoot
 * @typedef {import('hast').Root} HastRoot
 * @typedef {import('unified').Transformer<HastRoot, HastRoot>} HastTransformer
 * @typedef {import('unified').Transformer<MdastRoot, MdastRoot>} MdastTransformer
 */

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

/**
 *
 *
 *
 *
 *
 */
/*
const component_api_by_name = component_api.components.reduce((a, c) => {
    return {
        ...a,
        [c.moduleName]: true
    };
}, {});
*/

// function createImports(source) {
//     const inlineComponents = new Set();
//     const icons = new Set();
//     const actions = new Set();

//     // heuristic to guess if the inline component or expression name is a Carbon icon
//     const isIcon = () => false; // (text) => /[A-Z][a-z]*/.test(text) && !(text in component_api_by_name);

//     walk(parse(source), {
//         enter(node) {
//             if (node.type === 'InlineComponent') {
//                 if (isIcon(node.name)) {
//                     icons.add(node.name);
//                 } else {
//                     inlineComponents.add(node.name);
//                 }
//             } else if (node.type === 'MustacheTag') {
//                 if (node.expression.type === 'Identifier' && isIcon(node.expression.name)) {
//                     icons.add(node.expression.name);
//                 }
//             } else if (node.type === 'Action') {
//                 actions.add(node.name);
//             }
//         }
//     });

//     const action_imports = Array.from(actions.keys());
//     const ccs_imports = [...Array.from(inlineComponents.keys()), ...action_imports];
//     const icon_imports = Array.from(icons.keys());

//     if (ccs_imports.length === 0) return '';

//     return `
// <script>
//     import {${ccs_imports.join(',')}} from "svxui";
// </script>

// `;
// }

// async function remarkPlugin(params) {
//     const { codeToHtml } = await getSingletonHighlighter({
//         langs: [
//             'plaintext',
//             // import('shiki/langs/javascript.mjs'),
//             // import('shiki/langs/typescript.mjs'),
//             // import('shiki/langs/css.mjs'),
//             import('shiki/langs/svelte.mjs'),
//             import('shiki/langs/shellscript.mjs')
//             // import('shiki/langs/markdown.mjs')
//         ]
//     });
//     return () => {
//         return (tree) => {
//             writeFileSync('tree.json', JSON.stringify(tree));
//             visit(tree, 'html', (node) => {
//                 if (node.lang === 'svelte') {
//                     console.log('========plugin svelte', JSON.stringify(node, null, 2));
//                 }
//                 if (
//                     node.lang !== 'svelte' &&
//                     node.value.match(/ data-livepreview/g) &&
//                     Array.isArray(node.children) &&
//                     !node.value.startsWith('<FileSource') &&
//                     !node.value.startsWith('<script>') &&
//                     !node.value.match(/svx-ignore/g)
//                 ) {
//                     const value = node.value.replace(/ data-livepreview/g, '');
//                     const scriptBlock = createImports(value);
//                     // const formattedCode = format(scriptBlock + node.value, {
//                     //     ...prettierConfig
//                     // });
//                     // console.log(formattedCode);
//                     const highlightedCode = codeToHtml(scriptBlock + value, {
//                         transformers: [],
//                         lang: 'svelte',
//                         themes: {
//                             dark: JSON.parse(
//                                 String(
//                                     readFileSync(
//                                         resolve(__dirname, './src/lib/styles/themes/tokyo-night-storm.json')
//                                     )
//                                 )
//                             ),
//                             light: JSON.parse(
//                                 String(
//                                     readFileSync(
//                                         resolve(__dirname, './src/lib/styles/themes/tokyo-night-light.json')
//                                     )
//                                 )
//                             )
//                         }
//                     });

//                     node.value = `<Preview codeRaw="{\`${highlightedCode}\`}" code="{\`${highlightedCode}\`}">${value}</Preview>`;
//                 }

//                 /*
//                 if (node.value.startsWith('<FileSource')) {
//                     let src = '';

//                     walk(parse(node.value), {
//                         enter(node) {
//                             if (node.name === 'FileSource') {
//                                 node.attributes.forEach((attribute) => {
//                                     if (attribute.name === 'src') {
//                                         src += attribute.value[0].raw;
//                                     }
//                                 });
//                             }
//                         }
//                     });

//                     const sourceCode = fs.readFileSync(join('src/pages', `${src}.svelte`), 'utf-8');
//                     const formattedCode = format(sourceCode, {
//                         parser: 'svelte'
//                     });
//                     const highlightedCode = Prism.highlight(formattedCode, Prism.languages.svelte, 'svelte');

//                     node.value = `<Preview framed src="${src}" codeRaw="{\`${formattedCode}\`}" code="{\`${highlightedCode}\`}" />`;
//                 }
//                 */
//             });
//         };
//     };
// }

export const mdsxConfig = defineConfig({
    extensions: ['.md'],
    remarkPlugins: [
        // await remarkPlugin(), //
        remarkGfm,
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
