<script context="module">
    import blockquote from './blockquote.svelte';
    import code from './code.svelte';
    import h1 from './h1.svelte';
    import h2 from './h2.svelte';
    import h3 from './h3.svelte';
    import h4 from './h4.svelte';
    import p from './p.svelte';
    import pre from './pre.svelte';

    export { blockquote, code, h1, h2, h3, h4, p, pre };
</script>

<script lang="ts">
    import { Flexbox, useMediaQuery } from 'sveltr';

    export let metadata: {
        title: string;
        description: string;
        category: string;
    };

    const isSmallScreen = useMediaQuery('(max-width: 825px)');
</script>

<Flexbox direction="column" class="{metadata.category} {$isSmallScreen ? 'p-5' : 'p-9'}">
    <!-- Headers -->
    <Flexbox as="header" direction="column">
        {#if metadata.title}
            <svelte:component this={h1}>{metadata.title}</svelte:component>
        {/if}
        {#if metadata.description}
            <svelte:component this={p}>{metadata.description}</svelte:component>
        {/if}
    </Flexbox>

    <!-- Content Markdown -->
    <slot />
</Flexbox>
