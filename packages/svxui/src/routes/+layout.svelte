<script lang="ts">
    import '$lib/styles/tokens.css';
    import '$lib/styles/normalize.css';
    import '$lib/styles/utilities.css';
    import { ThemeRootProvider } from '$lib/index.js';
    import { type Snippet } from 'svelte';

    interface Props {
        children?: Snippet;
    }

    let { children }: Props = $props();
</script>

<ThemeRootProvider>
    {@render children?.()}
</ThemeRootProvider>
