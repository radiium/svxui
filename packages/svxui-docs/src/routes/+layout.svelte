<script lang="ts">
    import DocLayout from '$lib/layout/DocLayout.svelte';
    import IconContext from 'phosphor-svelte/lib/IconContext';
    import type { Snippet } from 'svelte';
    import { ThemeRootProvider } from 'svxui';
    // App global styles
    import '$lib/styles.scss';
    // Svxui styles
    import 'svxui/tokens.css';
    import 'svxui/normalize.css';
    import 'svxui/utilities.css';

    interface Props {
        children?: Snippet;
    }

    let { children }: Props = $props();
</script>

<IconContext values={{ color: 'var(--color)', size: 24 }}>
    <ThemeRootProvider>
        <DocLayout>
            {@render children?.()}
        </DocLayout>
    </ThemeRootProvider>
</IconContext>
