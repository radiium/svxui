<script lang="ts">
    import ArrowLeft from '$lib/icons/ArrowLeft.svelte';
    import ArrowRight from '$lib/icons/ArrowRight.svelte';
    import type { NavItem, NavSection } from '$lib/types';
    import { layout } from '$lib/utils/layout-state.svelte';
    import { Flexbox, Panel, Text, type PanelSize, type TextSize } from 'svxui';

    type Props = {
        slugFull?: string;
        navigation: NavSection[];
    };
    let { slugFull, navigation }: Props = $props();

    const nav = $derived.by(() => {
        const pages = navigation.reduce((pages, section) => [...pages, ...section.pages], [] as NavItem[]);
        const index = pages.findIndex((item) => item.slugFull === slugFull);
        return {
            prev: index > 0 ? pages[index - 1] : undefined,
            next: index < pages.length ? pages[index + 1] : undefined
        };
    });

    // Responsive
    let itemSize = $derived<PanelSize>(layout.isTablet ? '3' : '5');
    let titleSize = $derived<TextSize>(layout.isTablet ? '5' : '7');
    let subtitleSize = $derived<TextSize>(layout.isTablet ? '3' : '5');
</script>

<nav aria-label="Page navigation" class:is-mobile={layout.isMobile}>
    {#if nav.prev}
        <Panel
            variant="clear"
            outline
            size={itemSize}
            class="nav-prev"
            as="a"
            href={nav.prev.slugFull}
            rel="prev"
        >
            <Text>
                <Flexbox gap="3" align="end" justify="start">
                    <ArrowLeft size="30px" />
                    <Flexbox direction="column" align="start">
                        <Text weight="bold" size={subtitleSize} muted>Previous</Text>
                        <Text weight="bold" size={titleSize}>{nav.prev.label}</Text>
                    </Flexbox>
                </Flexbox>
            </Text>
        </Panel>
    {/if}

    {#if nav.next}
        <Panel
            variant="clear"
            outline
            size={itemSize}
            class="nav-next"
            as="a"
            href={nav.next.slugFull}
            rel="next"
        >
            <Text>
                <Flexbox gap="3" align="end" justify="end">
                    <Flexbox direction="column" align="end">
                        <Text weight="bold" size={subtitleSize} muted>Next</Text>
                        <Text weight="bold" align="end" size={titleSize}>{nav.next.label}</Text>
                    </Flexbox>
                    <ArrowRight size="30px" />
                </Flexbox>
            </Text>
        </Panel>
    {/if}
</nav>

<style>
    nav {
        width: 100%;
        display: grid;
        grid-template-areas: 'prev next';
        grid-template-columns: repeat(2, 1f);
        gap: var(--space-3);

        &.is-mobile {
            display: flex;
            flex-direction: column;
        }

        :global(.nav-prev) {
            grid-area: prev;
        }

        :global(.nav-next) {
            grid-area: next;
        }
    }
</style>
