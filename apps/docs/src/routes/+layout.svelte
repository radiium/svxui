<script lang="ts">
    import favicon from '$lib/assets/favicon.svg';
    import DocLayout from '$lib/components/layout/DocLayout.svelte';
    import IconContext from 'phosphor-svelte/lib/IconContext';
    import { ThemeRootProvider } from 'svxui';
    import type { LayoutProps } from './$types';
    // App global styles
    import '$lib/styles.css';
    // Svxui styles
    import 'svxui/styles/normalize.css';
    import 'svxui/styles/tokens.css';
    import 'svxui/styles/utilities.css';

    let { data, children }: LayoutProps = $props();
</script>

<svelte:head>
    <title>SVXUI – Svelte 5 UI component library</title>
    <link rel="icon" href={favicon} />
</svelte:head>

<IconContext values={{ color: 'var(--color)', size: 24 }}>
    <ThemeRootProvider defaultColor="blue">
        <DocLayout navigation={data.navigation}>
            {@render children?.()}
        </DocLayout>
    </ThemeRootProvider>
</IconContext>
