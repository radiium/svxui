<script lang="ts">
    import { replaceState } from '$app/navigation';
    import { page } from '$app/state';
    import { onMount } from 'svelte';
    import { on } from 'svelte/events';
    import { isBrowser, Text } from 'svxui';

    let items: HTMLHeadingElement[] = $state([]);
    let activeHeading = $state<HTMLHeadingElement | undefined>();
    let activeHeadingScrollOffset = 500;

    function initListeners(): () => void {
        const listeners: (() => void)[] = [];
        const main = document.querySelector('main');
        if (main) {
            listeners.push(on(main, 'scroll', () => setActiveHeading()));
            listeners.push(on(main, 'resize', () => setActiveHeading()));
        }

        return () => {
            listeners.forEach((off) => off());
        };
    }

    function buildTOC() {
        if (isBrowser()) {
            const root = document.querySelector('main');
            if (root) {
                items = Array.from<HTMLHeadingElement>(root.querySelectorAll('h2, h3, h4, h5, h6')).filter(
                    (h) => !h.closest('.example')
                );
            }
        }
    }

    function setActiveHeading(): void {
        let idx = items.length;
        while (idx--) {
            if (items[idx]) {
                const { top } = items[idx].getBoundingClientRect();
                if (top < activeHeadingScrollOffset || idx === 0) {
                    activeHeading = items[idx];
                    return;
                }
            }
        }
    }

    onMount(() => {
        return initListeners();
    });

    $effect(buildTOC);
    $effect(() => {
        const observer = new MutationObserver(buildTOC);
        observer.observe(document.body, {
            childList: true,
            subtree: true,
            characterData: true
        });
        return () => observer.disconnect();
    });

    function onSelectItem(node: HTMLHeadingElement) {
        return () => {
            node.scrollIntoView?.({ behavior: 'smooth', block: `start` });

            if (node.id) {
                replaceState(`${page.url.pathname}${page.url.search}#${node.id}`, page.state);
            }
        };
    }
</script>

{#if items.length}
    <nav>
        <Text weight="bold" size="3">On this page</Text>
        <ul role="menu">
            {#each items as item (item)}
                {@const title = item.textContent ?? ``}
                {@const level = Number(item.nodeName[1])}
                <li
                    role="menuitem"
                    class:active={item === activeHeading}
                    data-level={level}
                    data-color="neutral"
                    onclick={onSelectItem(item)}
                    onkeydown={onSelectItem(item)}
                >
                    <Text weight="medium" size="3">{title}</Text>
                </li>
            {/each}
        </ul>
    </nav>
{/if}

<style>
    nav {
        ul {
            list-style: none;
            padding-left: 0;

            li {
                margin: var(--space-2) 0;
                color: var(--accent-9);
                opacity: 0.6;
                cursor: pointer;

                &:hover,
                &:focus-visible,
                &.active {
                    opacity: 1;
                }

                &[data-level='3'] {
                    margin-left: var(--space-4);
                }

                &[data-level='4'] {
                    margin-left: calc(var(--space-4) + var(--space-4));
                }
            }
        }
    }
</style>
