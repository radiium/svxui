<script lang="ts">
    import { page } from '$app/state';
    import { docNavigation } from '$lib/content-utils/doc-navigation.js';
    import { layout } from '../../utils/layout-state.svelte.js';
</script>

<nav class="py-4 px-3">
    {#each docNavigation as section, i (i)}
        <section class="p-0 mb-5">
            {#if section.title}
                <h4 class="my-0">{section.title}</h4>
            {/if}
            <ul class="m-0 p-0">
                {#each section.pages as item (item.slug)}
                    <li class="m-0 p-0">
                        <a
                            href={item.slugFull}
                            class:active={page.url.pathname.endsWith(item.slugFull)}
                            data-sveltekit-preload-data="tap"
                            onclick={layout.close}
                        >
                            {#if item.IconComponent}
                                <item.IconComponent size="1rem" />
                            {/if}
                            {item.label}
                        </a>
                    </li>
                {/each}
            </ul>
        </section>
    {/each}
</nav>

<style>
    nav {
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 100%;
        overflow: auto;
        flex-shrink: 0;

        section {
            width: 100%;

            h4 {
                font-size: var(--font-size-2);
                line-height: var(--line-height-1);
                font-weight: var(--font-weight-medium);
                letter-spacing: var(--letter-spacing-2);
                padding: var(--space-2) var(--space-3);
                color: var(--accent-8);
                text-transform: uppercase;
            }
            ul {
                width: 100%;
                list-style: none;

                li {
                    width: 100%;
                    margin: 1px 0;

                    a {
                        display: flex;
                        align-items: center;
                        gap: var(--space-3);
                        position: relative;
                        cursor: default;
                        width: 100%;
                        text-decoration: none;
                        padding: var(--space-2) var(--space-3);
                        border-radius: max(var(--radius-3), var(--radius-full));
                        font-size: var(--font-size-3);
                        line-height: var(--line-height-2);
                        letter-spacing: var(--letter-spacing-2);
                        color: var(--accent-a12);

                        &:hover,
                        &.active {
                            background-color: var(--accent-a3);
                        }

                        &.active {
                            color: var(--accent-a11);
                            background-color: var(--accent-a3);

                            &::after {
                                content: '➜';
                                position: absolute;
                                right: var(--space-3);
                            }
                        }

                        &:focus-visible {
                            outline: 2px solid var(--accent-8);
                            outline-offset: 0px;
                        }
                    }
                }
            }
        }
    }
</style>
