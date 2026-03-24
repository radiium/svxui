<script lang="ts">
    import { ThemeRootProvider } from '$lib/index.js';
    import '$lib/styles/normalize.css';
    import '$lib/styles/tokens.css';
    import '$lib/styles/theme.default.css';
    import '$lib/styles/utilities.css';
    import { type Snippet } from 'svelte';

    interface Props {
        children?: Snippet;
    }

    let { children }: Props = $props();
</script>

<ThemeRootProvider>
    {@render children?.()}
</ThemeRootProvider>
