<script lang="ts">
    import { navigating } from '$app/stores';
    import DocHeader from '$lib/components/layout/DocHeader.svelte';
    import DocLayout from '$lib/components/layout/DocLayout.svelte';
    import DocSidebar from '$lib/components/layout/DocSidebar.svelte';
    import '$lib/styles/styles.scss';
    import { nav } from '$lib/utils/nav';
    import IconContext from 'phosphor-svelte/lib/IconContext';
    import { onMount } from 'svelte';
    import { ThemeProvider } from 'svxui';

    let mainRef: HTMLDivElement | null;

    onMount(() => {
        const unsubscribe = navigating.subscribe((v) => {
            mainRef?.scrollTo({ top: 0, behavior: 'instant' });
        });

        return () => unsubscribe();
    });
</script>

<IconContext values={{ color: 'var(--color)', size: 24 }}>
    <ThemeProvider>
        <DocLayout>
            <DocHeader slot="header" />
            <DocSidebar slot="aside" {nav} />
            <div bind:this={mainRef} slot="main" class="content">
                <slot />
            </div>
        </DocLayout>
    </ThemeProvider>
</IconContext>

<style lang="scss">
    .content {
        height: 100%;
        overflow: auto;
    }
</style>
