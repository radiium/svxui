import { readonly, writable, type Readable } from 'svelte/store';

function createResizeObserver(
    el: HTMLElement | undefined | null,
    callback: ResizeObserverCallback = () => {}
) {
    let resizeObserver: ResizeObserver | undefined = new ResizeObserver(callback);
    return {
        observe() {
            if (el) {
                resizeObserver?.observe(el);
            }
        },
        destroy(el?: HTMLElement) {
            if (el) {
                resizeObserver?.unobserve(el);
            }
            resizeObserver?.disconnect();
            resizeObserver = undefined;
        }
    };
}

export function createPlaygroundMask(): {
    maskStyles: Readable<{
        top: string;
        left: string;
        height: string;
        width: string;
    }>;
    getComponentSize: (node: HTMLElement) => void;
} {
    const padding = 10;
    const maskStyles = writable({
        top: '0px',
        left: '0px',
        height: '0px',
        width: '0px'
    });

    function getComponentSize(node: HTMLElement) {
        function update(el?: HTMLElement) {
            if (el) {
                maskStyles.set({
                    top: el.offsetTop - padding + 'px',
                    left: el.offsetLeft - padding + 'px',
                    height: el.offsetHeight + padding * 2 + 'px',
                    width: el.offsetWidth + padding * 2 + 'px'
                });
            }
        }

        const child = node.children.item(0) as HTMLElement | null;
        if (child) {
            const observerChild = createResizeObserver(child, (entries) => {
                update(entries[0].target as HTMLElement);
            });
            const observerParent = createResizeObserver(node, () => {
                update(child as HTMLElement);
            });
            observerChild.observe();
            observerParent.observe();

            return {
                destroy() {
                    observerChild.destroy();
                    observerParent.destroy();
                }
            };
        }
    }

    return { maskStyles: readonly(maskStyles), getComponentSize };
}
