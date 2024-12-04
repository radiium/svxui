import { toMarkdown } from 'mdast-util-to-markdown';
import { Plugin } from 'unified';
import { CONTINUE, SKIP, visit } from 'unist-util-visit';

const SVELTE_LOGIC_BLOCK = /{[#:/@]\w+.*}/;
const ELEMENT_OR_COMPONENT = /<[A-Za-z]+[\s\S]*>/;

export function isSvelteBlock(value: string) {
    return SVELTE_LOGIC_BLOCK.test(value);
}

export function isElementOrComponent(value: string) {
    return ELEMENT_OR_COMPONENT.test(value);
}

export function remarkCleanSvelte() {
    return async (tree: any) => {
        visit(tree, 'paragraph', (node) => {
            const firstChild = node.children[0];
            if (!firstChild) return CONTINUE;
            if (firstChild.type !== 'text' && firstChild.type !== 'html') return CONTINUE;
            if (isSvelteBlock(firstChild.value) || isElementOrComponent(firstChild.value)) {
                convertParagraphToHtml(node);
                return SKIP;
            }
        });
    };
}

export function convertParagraphToHtml(node: any) {
    let value = '';
    for (const child of node.children) {
        if (child.type === 'text' || child.type === 'html') {
            value += child.value;
        } else {
            value += toMarkdown(child);
        }
    }
    node.type = 'html';
    node.value = value;
}
