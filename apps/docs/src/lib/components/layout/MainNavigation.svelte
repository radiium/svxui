<script lang="ts">
    import { page } from '$app/state';
    import type { NavSection } from '$lib/types.js';
    import { Flex } from 'svxui';

    type Props = {
        navigation: NavSection[];
        onSelect?: () => void;
    };

    let { navigation, onSelect }: Props = $props();
</script>

<Flex as="nav" justify="start" direction="column" class="w-full" aria-label="Primary">
    {#each navigation as section, i (i)}
        <section>
            {#if section.title}
                <h4>{section.title}</h4>
            {/if}
            <ul>
                {#each section.pages as item (item.slug)}
                    <li>
                        <a
                            href={item.slugFull}
                            class:active={page.url.pathname.endsWith(item.slugFull)}
                            data-sveltekit-preload-data="tap"
                            onclick={onSelect}
                            tabindex="0"
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
</Flex>

<style>
    section {
        width: 100%;
        padding: 0;
        margin-bottom: var(--space-5);

        h4 {
            margin: 0;
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
            margin: 0;
            padding: 0;

            li {
                width: 100%;
                margin: 1px 0;
                padding: 0;

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
</style>
