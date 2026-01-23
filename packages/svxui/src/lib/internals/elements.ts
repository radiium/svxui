import { isHtmlElement } from './is.js';

/**
 * Get HTMLElement from query selector string or element
 * @param el string or HTMLElement
 * @returns HTMLElement or undefined if not found
 */
export function getHtmlElement(el: string | HTMLElement): HTMLElement | undefined {
    const elm = typeof el === 'string' ? document.querySelector(el) : el;
    if (!isHtmlElement(elm)) return undefined;
    return elm;
}

/**
 *
 * @param node
 * @returns
 */
export function toHTMLElement(node: HTMLElement | Document): HTMLElement {
    if (node.isSameNode(document)) {
        return document.documentElement as HTMLElement;
    }
    return node as HTMLElement;
}
