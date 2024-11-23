<script lang="ts">
    import { navigating } from '$app/stores';
    import { ThemeProvider } from '$lib/index.js';
    import Background from './Background.svelte';
    import ThemePanel from './playground/ThemePanel.svelte';
    import './playground/styles.scss';
    import { onMount, type Snippet } from 'svelte';

    interface Props {
        children?: Snippet;
    }

    let { children }: Props = $props();

    let mainRef: HTMLElement | undefined = $state();

    onMount(() => {
        const navigatingUnsubscribe = navigating.subscribe((navigation) => {
            if (navigation) {
                mainRef?.scrollTo({ top: 0, behavior: 'instant' });
            }
        });

        return () => {
            navigatingUnsubscribe();
        };
    });
</script>

<ThemeProvider hasBackground={false}>
    <div class="background">
        <Background />
    </div>

    <header>
        <div class="flex-fill">Playground</div>
        <ThemePanel />
    </header>

    <main bind:this={mainRef}>
        {@render children?.()}
    </main>
</ThemeProvider>

<style lang="scss">
    :root {
        --header-height: 50px;
    }

    .background {
        position: fixed;
        inset: 0;
        width: 100%;
        height: 100%;
    }

    header {
        position: fixed;
        top: 0;
        z-index: 10;
        width: 100%;
        height: var(--header-height);
        padding: 0 var(--space-5);
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: var(--space-3);
        background-color: var(--color-background-0);
        border-bottom: 1px solid var(--accent-a5);
    }

    main {
        min-height: calc(100vh - var(--header-height));
        width: 100vw;
        max-width: 1600px;
        overflow: auto;
        position: relative;
        display: flex;
        flex-direction: column;
        gap: var(--space-5);
        padding: var(--space-7) 0;
        margin: var(--header-height) auto 0 auto;
        // background-color: var(--color-background-0);
    }
</style>
