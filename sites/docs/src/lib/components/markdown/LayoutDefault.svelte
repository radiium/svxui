<script module>
    import blockquote from './blockquote.svelte';
    import code from './code.svelte';
    import h1 from './h1.svelte';
    import h2 from './h2.svelte';
    import h3 from './h3.svelte';
    import h4 from './h4.svelte';
    import p from './p.svelte';
    import pre from './pre.svelte';

    // eslint-disable-next-line no-import-assign
    export { blockquote, code, h1, h2, h3, h4, p, pre };
</script>

<script lang="ts">
    import { isMobile, isTablet } from '$lib/utils/reponsive';
    import { Flexbox } from 'svxui';
    import type { Snippet } from 'svelte';

    type Props = {
        metadata: {
            title: string;
            description: string;
            category: string;
        };
        children?: Snippet;
    };

    let { metadata, children }: Props = $props();

    let id = $derived(metadata.title.replace(/ /g, '-').toLowerCase() ?? '');
    let padding = $derived($isMobile ? 'p-3' : $isTablet ? 'p-5' : 'p-9');
</script>

<Flexbox direction="column" {id} class="{metadata.category} {padding}">
    <!-- Headers -->
    <Flexbox as="header" direction="column">
        {#if metadata.title}
            {@const H1Component = h1}
            <H1Component>{metadata.title}</H1Component>
        {/if}
        {#if metadata.description}
            {@const PComponent = p}
            <PComponent>{metadata.description}</PComponent>
        {/if}
    </Flexbox>

    <!-- Content Markdown -->
    {@render children?.()}
</Flexbox>
