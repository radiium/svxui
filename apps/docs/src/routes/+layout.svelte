<script lang="ts">
    import favicon from '$lib/assets/favicon.svg';
    import DocLayout from '$lib/components/layout/DocLayout.svelte';
    import IconContext from 'phosphor-svelte/lib/IconContext';
    import { ThemeProvider } from 'svxui';
    import type { LayoutProps } from './$types';
    // App global styles
    import '$lib/all-colors.css';
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
    <meta property="og:site_name" content="SVXUI" />
    <meta property="og:type" content="website" />
    <meta name="twitter:card" content="summary" />
</svelte:head>

<IconContext values={{ color: 'var(--color)', size: 24 }}>
    <ThemeProvider color="blue" radius="medium">
        <DocLayout navigation={data.navigation}>
            {@render children?.()}
        </DocLayout>
    </ThemeProvider>
</IconContext>
