import fs from 'node:fs';
import { toHtml } from 'hast-util-to-html';
import path from 'node:path';
import { parse, preprocess } from 'svelte/compiler';
import { visit } from 'unist-util-visit';
import { MDSX_COMPONENT_NAME } from '../constants.js';
import { extractNamedExports, logPerf } from '../utils.js';
import { escapeSvelte } from '../escape-svelte.js';

export function rehypeRenderCode() {
    return (tree: any) => {
        visit(tree, 'element', (node) => {
            const tags = ['pre', 'code'];
            if (!tags.includes(node.tagName)) return;
            let codeEl;
            if (node.tagName === 'pre') {
                codeEl = node.children[0];
                if (!codeEl || codeEl.type !== 'element' || codeEl.tagName !== 'code') return;
            } else {
                codeEl = node;
            }
            const codeString = toHtml(codeEl, {
                characterReferences: { useNamedReferences: true }
            });
            codeEl.type = 'raw';
            codeEl.value = `{@html \`${escapeSvelte(codeString)}\`}`;
        });
    };
}

export function rehypeBuildBlueprint() {
    return async (_tree: any, file: any) => {
        const a = performance.now();
        const data = file.data;
        const blueprint = data.blueprint;
        if (blueprint === void 0) {
            return;
        }

        const source = fs.readFileSync(blueprint.path, { encoding: 'utf8' });
        const filename = path.parse(blueprint.path).base;
        const { code, dependencies } = await preprocess(source, data.preprocessors, { filename });
        if (dependencies) {
            data.dependencies.push(...dependencies);
        }

        const ast = parse(code, { filename });
        const module = ast.module;
        if (module === void 0) {
            throw new Error(
                `Blueprint "${blueprint.name}" at path "${blueprint.path}" is missing it's exported components - See TODO: Add a link to docs here`
            );
        }

        const namedExports = extractNamedExports(module);
        if (namedExports.length > 0) {
            data.components = namedExports;
        }
        logPerf('rehypeBuildBlueprint', a);
    };
}

export function rehypeSvelteOverrideComponents() {
    return (tree: any, file: any) => {
        const a = performance.now();
        const data = file.data;
        if (!data.blueprint) {
            return;
        }

        const components = data.components;
        if (!components) {
            return;
        }

        visit(tree, 'element', (node) => {
            if (components.includes(node.tagName)) {
                node.tagName = `${MDSX_COMPONENT_NAME}.${node.tagName}`;
            }
        });
        logPerf('rehypeSvelteOverrideComponents', a);
    };
}
