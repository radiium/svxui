<script lang="ts">
    import { page } from '$app/stores';
    import type { NavSection } from '$lib/utils/nav';
    import { CaretRight } from 'phosphor-svelte';
    import { slide } from 'svelte/transition';
    import { AccordionGroup, Accordion, ButtonUnstyled, Flexbox, Text } from 'svxui';
    import { closeMenu } from './menu';

    type Props = {
        nav?: NavSection[];
    };

    let { nav = [] }: Props = $props();

    let currentSlug = $derived('/' + ($page.params.slug ?? ''));
</script>

<nav class="p-4">
    {#each nav as section, i}
        <AccordionGroup multi>
            <section class="p-0 mb-5">
                <Accordion value={`menu-section-${i}`} expanded>
                    {#snippet trigger({ toggle, expanded, attrs })}
                        {#if section.title}
                            <ButtonUnstyled onclick={toggle} class="width-100" {...attrs}>
                                <Flexbox justify="between">
                                    <Text as="div" disabled weight="bold" size="2" class="pb-2">
                                        {section.title}
                                    </Text>
                                    <CaretRight
                                        size="18"
                                        transform="rotate({expanded ? '90' : '0'})"
                                        style="transition: all 0.2s ease-in-out"
                                    />
                                </Flexbox>
                            </ButtonUnstyled>
                        {/if}
                    {/snippet}
                    {#snippet children({ toggle, expanded, attrs })}
                        <ul transition:slide class="m-0 p-0" {...attrs}>
                            {#each section.pages as { slugFull, href, title }}
                                <li class="m-0 p-0">
                                    <a
                                        class:active={slugFull === currentSlug}
                                        {href}
                                        onclick={closeMenu}
                                        data-sveltekit-preload-data="tap"
                                        data-color="gray"
                                    >
                                        {title}
                                    </a>
                                </li>
                            {/each}
                        </ul>
                    {/snippet}
                </Accordion>
            </section>
        </AccordionGroup>
    {/each}
</nav>

<style lang="scss">
    nav {
        display: flex;
        flex-direction: column;
        height: 100%;
        overflow: auto;
        flex-shrink: 0;

        section {
            width: 100%;

            ul {
                width: 100%;
                list-style: none;

                li {
                    width: 100%;
                    margin: 4px 0;

                    a {
                        display: block;
                        position: relative;
                        cursor: default;
                        padding: var(--space-2) var(--space-3);
                        border-radius: var(--radius-3);
                        font-size: var(--font-size-2);
                        line-height: var(--line-height-2);
                        letter-spacing: var(--letter-spacing-2);

                        color: var(--slate-a12);

                        &:hover,
                        &.active {
                            background-color: var(--slate-a3);
                        }

                        &.active {
                            color: var(--teal-a11);
                            background-color: var(--slate-a3);

                            &::after {
                                content: '➜';
                                position: absolute;
                                right: var(--space-3);
                            }
                        }
                    }
                }
            }
        }
    }
</style>
