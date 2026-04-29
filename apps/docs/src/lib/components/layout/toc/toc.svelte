<script lang="ts">
    import { onMount } from 'svelte';
    import { tocState } from './toc-state.svelte';

    type Props = {
        onSelect?: () => void;
    };

    let { onSelect }: Props = $props();

    onMount(tocState.init);
</script>

<nav aria-label="Table of contents">
    <ul>
        {#each tocState.items as item (item.id)}
            {@const active = tocState.isActive(item)}
            <li class:active aria-current={active ? 'true' : undefined} style:--level={item.level}>
                <a
                    href={'#' + item.id}
                    onclick={() => {
                        tocState.select(item);
                        onSelect?.();
                    }}
                >
                    {item.text}
                </a>
            </li>
        {/each}
    </ul>
</nav>

<style>
    nav {
        font-size: var(--font-size-3);

        ul {
            list-style: none;
            margin: 0;
            padding: 0;

            li {
                opacity: 0.6;
                cursor: pointer;
                padding-left: calc((var(--level) - 2) * var(--space-3));
                transition: opacity 0.2s ease;
                position: relative;

                &.active {
                    a {
                        text-decoration-line: underline;
                    }
                }

                &:hover,
                &:focus-visible,
                &.active {
                    opacity: 1;
                }

                a {
                    display: inline-block;
                    text-decoration: none;
                    color: inherit;
                    font-size: var(--font-size-2);
                    letter-spacing: var(--letter-spacing-2);
                    line-height: 1;
                }
            }
        }
    }
</style>
