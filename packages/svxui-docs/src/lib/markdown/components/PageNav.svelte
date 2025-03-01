<script lang="ts">
    import { docNavigation } from '$lib/content-utils/doc-navigation';
    import ArrowLeft from '$lib/icons/ArrowLeft.svelte';
    import ArrowRight from '$lib/icons/ArrowRight.svelte';
    import { layout } from '$lib/utils/layout-state.svelte';
    import type { NavItem } from '$lib/types';
    import { Flexbox, Link, Panel, Text, type PanelSize, type TextSize } from 'svxui';

    type Props = {
        slugFull?: string;
    };
    let { slugFull }: Props = $props();

    const nav = $derived.by(() => {
        const pages = docNavigation.reduce((pages, section) => [...pages, ...section.pages], [] as NavItem[]);
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

<div class="page-nav mt-9" class:is-mobile={layout.isMobile}>
    {#if nav.prev}
        <Panel variant="outline" size={itemSize} class="nav-prev">
            <Link href={nav.prev.slugFull}>
                <Flexbox gap="3" align="end" justify="start">
                    <ArrowLeft size="30px" />
                    <Flexbox direction="column" align="start">
                        <Text weight="bold" size={subtitleSize} muted>Previous</Text>
                        <Text weight="bold" size={titleSize}>{nav.prev.label}</Text>
                    </Flexbox>
                </Flexbox>
            </Link>
        </Panel>
    {/if}

    {#if nav.next}
        <Panel variant="outline" size={itemSize} class="nav-next">
            <Link href={nav.next.slugFull}>
                <Flexbox gap="3" align="end" justify="end">
                    <Flexbox direction="column" align="end">
                        <Text weight="bold" size={subtitleSize} muted>Next</Text>
                        <Text weight="bold" align="end" size={titleSize}>{nav.next.label}</Text>
                    </Flexbox>
                    <ArrowRight size="30px" />
                </Flexbox>
            </Link>
        </Panel>
    {/if}
</div>

<style>
    .page-nav {
        width: 100%;
        display: grid;
        grid-template-areas: 'prev next';
        grid-template-columns: repeat(2, 50%);
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
