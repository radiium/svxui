import { type ThemeRegistrationRaw } from 'shiki';
import { createHighlighterCore } from 'shiki/core';
import { readonly, writable, type Readable } from 'svelte/store';

export type CodeToHtmlOptions = {
    inline: boolean;
    lineNumbers: boolean;
    lineNumbersStart: number;
    lang: 'svelte';
};

export type CodeToHtmlFn = (code: string, options: Partial<CodeToHtmlOptions>) => string;
function createShiki(): Readable<{ codeToHtml?: CodeToHtmlFn }> {
    const store = writable<{ codeToHtml?: CodeToHtmlFn }>({ codeToHtml: undefined });

    createHighlighterCore({
        themes: [
            import(
                '../../styles/themes/tokyo-night-light.json'
            ) as Promise<unknown> as Promise<ThemeRegistrationRaw>,
            import(
                '../../styles/themes/tokyo-night-storm.json'
            ) as Promise<unknown> as Promise<ThemeRegistrationRaw>
        ],
        langs: [import('shiki/langs/svelte.mjs')],
        loadWasm: import('shiki/wasm')
    }).then(({ codeToHtml }) => {
        store.set({
            codeToHtml: (code: string, options: Partial<CodeToHtmlOptions>) => {
                const {
                    lang = 'svelte',
                    inline = false,
                    lineNumbers = false,
                    lineNumbersStart = 1
                } = options;

                return codeToHtml(code, {
                    lang,
                    themes: {
                        light: 'tokyo-night-light',
                        dark: 'tokyo-night-storm'
                    },
                    transformers: [
                        {
                            pre(node) {
                                if (!node.properties) {
                                    node.properties = {};
                                }

                                delete node.properties['style'];

                                if (inline) {
                                    node.tagName = 'span';
                                    node.properties['data-highlight-inline'] = '';
                                } else {
                                    node.properties['data-highlight-pre'] = '';
                                }

                                node.properties['data-highlight'] = '';
                            },
                            code(node) {
                                if (!node.properties) {
                                    node.properties = {};
                                }

                                if (lineNumbers) {
                                    node.properties['data-line-numbers'] = '';
                                }
                            },
                            line(node, line) {
                                if (lineNumbers) {
                                    const currLine = Number.isInteger(lineNumbersStart)
                                        ? Math.max(0, Math.abs(lineNumbersStart) - 1) + line
                                        : line;

                                    if (Number.isInteger(lineNumbersStart)) {
                                        // console.log('===================');
                                        // console.log('lineNumbersStart', lineNumbersStart);
                                        // console.log('abs', Math.abs(lineNumbersStart));
                                        // console.log('resolved', Math.max(0, Math.abs(lineNumbersStart - 1)));
                                    }

                                    node.properties['data-line'] = currLine;
                                } else {
                                    node.properties['data-line'] = '';
                                }
                            }
                            // span(node, line, col) {
                            //     node.properties['data-token'] = `token:${line}:${col}`;
                            // }
                        }
                    ]
                });
            }
        });
    });

    return readonly(store);
}

export const shiki = createShiki();
