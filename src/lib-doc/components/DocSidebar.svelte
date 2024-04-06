<script lang="ts">
    import Text from '$lib/components/Text/Text.svelte';
    import { page } from '$app/stores';
    import { closeMenu } from './DocLayout.svelte';

    $: slug = $page.params.slug;
    const { nav } = $page.data;

    console.log(nav);
</script>

<nav class="p-4">
    {#each nav as section, i}
        <section class="p-0 mb-5">
            {#if section.title}
                <Text as="div" disabled weight="bold" size="2" class="pb-2">{section.title}</Text>
            {/if}
            <ul class="m-0 p-0">
                {#each section.pages as page}
                    <li class="m-0 p-0">
                        <a
                            class:active={page.slug === slug}
                            href={page.href}
                            on:click={closeMenu}
                            data-sveltekit-preload-data="tap"
                            data-color="gray"
                        >
                            {page.metadata.title}
                        </a>
                    </li>
                {/each}
            </ul>
        </section>
    {/each}
</nav>

<style lang="scss">
    nav {
        display: flex;
        flex-direction: column;
        height: 100%;
        overflow: auto;

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
