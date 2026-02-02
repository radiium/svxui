<script lang="ts">
    import favicon from '$lib/assets/favicon.svg';
    import MainLayout from '$lib/components/layout/MainLayout.svelte';
    import IconContext from 'phosphor-svelte/lib/IconContext';
    import { ThemeRootProvider } from 'svxui';
    // App global styles
    import '$lib/styles.scss';
    // Svxui styles
    import 'svxui/styles/normalize.css';
    import 'svxui/styles/tokens.css';
    import 'svxui/styles/utilities.css';
    import type { LayoutProps } from './$types';

    let { data, children }: LayoutProps = $props();
</script>

<svelte:head>
    <link rel="icon" href={favicon} />
</svelte:head>

<IconContext values={{ color: 'var(--color)', size: 24 }}>
    <ThemeRootProvider defaultColor="blue">
        <MainLayout navigation={data.navigation}>
            {@render children?.()}
        </MainLayout>
    </ThemeRootProvider>
</IconContext>
