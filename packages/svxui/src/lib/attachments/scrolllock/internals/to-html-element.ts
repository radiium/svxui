export function toHTMLElement(node: HTMLElement | Document): HTMLElement {
    if (node.isSameNode(document)) {
        return document.documentElement as HTMLElement;
    }
    return node as HTMLElement;
}
