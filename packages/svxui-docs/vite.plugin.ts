/**
 * Vite Plugin: Svelte with Source
 *
 * This plugin allows you to import Svelte components along with their source code.
 * Perfect for documentation sites where you want to display both the component and its code.
 *
 * Usage:
 * ```typescript
 * import MyComponent, { srcRaw, srcFiltered, srcHighlighted, srcConfig } from './MyComponent.svelte?withSource';
 * ```
 *
 * Available parameters:
 * - ?withSource - Enable source code extraction
 * - &hideScript - Remove <script> tags from the code
 * - &hideStyle - Remove <style> tags from the code
 * - &hideComments - Remove all comments (HTML, JS)
 *
 * Example:
 * ```typescript
 * import Button, { srcHighlighted } from './Button.svelte?withSource&hideScript&hideComments';
 * ```
 *
 * Exports:
 * - srcRaw: Original unmodified source code
 * - srcFiltered: Source code after applying filters
 * - srcHighlighted: Syntax highlighted HTML
 * - srcConfig: Configuration object with applied options
 */

import { transformerNotationHighlight } from '@shikijs/transformers';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { createHighlighter, type Highlighter } from 'shiki';
import type { Plugin } from 'vite';

let highlighter: Highlighter;
const sourceCache = new Map<string, Promise<string>>();
const configCache = new Map<string, string>();

export interface SourceConfig {
    hideScript?: boolean;
    hideStyle?: boolean;
    hideComments?: boolean;
}

function parseSourceConfig(id: string): SourceConfig {
    const url = new URL(id, 'file://');
    return {
        hideScript: url.searchParams.has('hideScript'),
        hideStyle: url.searchParams.has('hideStyle'),
        hideComments: url.searchParams.has('hideComments')
    };
}

function filterSvelteCode(code: string, config: SourceConfig): string {
    let filtered = code;
    if (config.hideScript) filtered = filtered.replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '');
    if (config.hideStyle) filtered = filtered.replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '');
    if (config.hideComments) {
        filtered = filtered.replace(/<!--[\s\S]*?-->/g, '');
        filtered = filtered.replace(/\/\*[\s\S]*?\*\//g, '');
        filtered = filtered.replace(/\/\/.*/g, '');
    }
    return filtered.trim();
}

export function svelteWithSourcePlugin(): Plugin {
    return {
        name: 'vite-plugin-svelte-with-source',
        enforce: 'pre',

        async buildStart() {
            if (!highlighter) {
                highlighter = await createHighlighter({
                    themes: ['dark-plus', 'light-plus'],
                    langs: ['svelte', 'javascript', 'typescript', 'bash']
                });
            }
        },

        resolveId(source, importer) {
            if (!source.includes('?withSource')) return null;

            const [filepath, params] = source.split('?');
            const resolvedPath = importer
                ? path.resolve(path.dirname(importer), filepath)
                : path.resolve(process.cwd(), filepath);

            configCache.set(`\0sws:${resolvedPath}__withSource`, params);

            // Virtual ID WITHOUT .svelte in the name
            return `\0sws:${resolvedPath}__withSource`;
        },

        async load(id) {
            if (!id.startsWith('\0sws:')) return null;

            const filepath = id.replace('\0sws:', '').replace('__withSource', '');
            const rawSource = await readFile(filepath, 'utf8');
            const resolved = await this.resolve(filepath, undefined, { skipSelf: true });
            const importId = resolved?.id ?? filepath;

            const config = parseSourceConfig(id + '?' + (configCache.get(id) ?? ''));
            const filtered = filterSvelteCode(rawSource, config);
            const highlighted = highlighter.codeToHtml(filtered, {
                lang: 'svelte',
                themes: {
                    dark: 'dark-plus',
                    light: 'light-plus'
                },
                transformers: [
                    transformerNotationHighlight({
                        matchAlgorithm: 'v1'
                    })
                ]
            });

            return `
import Component from ${JSON.stringify(importId)};
export default Component;
export * from ${JSON.stringify(importId)};

export const source = {
    // Raw unmodified source code
    raw: ${JSON.stringify(rawSource)},
    // Filtered source code
    filtered: ${JSON.stringify(filtered)},
    // Syntax highlighted code
    highlighted: ${JSON.stringify(highlighted)},
    // Configuration used
    config: ${JSON.stringify(config)},
};
  `;
        },

        // Optional : invalidate cache when file change (HMR)
        handleHotUpdate({ file }) {
            // If the monitored .svelte file changes, invalidate sourceCache
            if (file.endsWith('.svelte') && sourceCache.has(file)) {
                sourceCache.delete(file);
            }
        }
    };
}
