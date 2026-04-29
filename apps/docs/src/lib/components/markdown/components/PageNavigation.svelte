<script lang="ts">
    import ArrowLeft from '$lib/components/icons/ArrowLeft.svelte';
    import ArrowRight from '$lib/components/icons/ArrowRight.svelte';
    import type { NavItem, NavSection } from '$lib/types';
    import { MediaQuery } from 'svelte/reactivity';
    import { Flex, Panel, Text, type LayoutSpacing, type PanelPadding, type TextSize } from 'svxui';

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
    const isMobile = new MediaQuery('(max-width: 768px)');
    const isTablet = new MediaQuery('(max-width: 1024px)');
    let itemSize = $derived<LayoutSpacing & PanelPadding>(isTablet.current ? '3' : '5');
    let titleSize = $derived<TextSize>(isTablet.current ? '5' : '7');
    let subtitleSize = $derived<TextSize>(isTablet.current ? '3' : '5');
    let iconSize = $derived<string>(isTablet.current ? '25px' : '30px');
</script>

<nav aria-label="Page navigation" class:is-mobile={isMobile}>
    {#if nav.prev}
        <Panel as="a" href={nav.prev.slugFull} rel="prev" variant="surface" outline p={itemSize}>
            <Text>
                <Flex gap="3" align="end" justify="start">
                    <ArrowLeft size={iconSize} />
                    <Flex justify="start" direction="column" align="start">
                        <Text weight="bold" size={subtitleSize} muted>Previous</Text>
                        <Text weight="bold" size={titleSize}>{nav.prev.label}</Text>
                    </Flex>
                </Flex>
            </Text>
        </Panel>
    {/if}

    {#if nav.next}
        <Panel
            as="a"
            href={nav.next.slugFull}
            rel="next"
            variant="surface"
            outline
            p={itemSize}
            class="nav-next"
        >
            <Text>
                <Flex gap="3" align="end" justify="end">
                    <Flex justify="start" direction="column" align="end">
                        <Text weight="bold" size={subtitleSize} muted>Next</Text>
                        <Text weight="bold" align="end" size={titleSize}>{nav.next.label}</Text>
                    </Flex>
                    <ArrowRight size={iconSize} />
                </Flex>
            </Text>
        </Panel>
    {/if}
</nav>

<style>
    nav {
        width: 100%;
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: var(--space-3);

        :global(.nav-prev) {
            grid-column-start: 1;
        }

        :global(.nav-next) {
            grid-column-start: 2;
        }
    }
</style>
