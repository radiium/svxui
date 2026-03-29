<script lang="ts">
    import { ThemeProvider } from '$lib/index.js';
    import { type Snippet } from 'svelte';

    import '$lib/styles/normalize.css';
    import '$lib/styles/theme.default.css';
    import '$lib/styles/tokens.css';
    import '$lib/styles/utilities.css';

    type Props = {
        children?: Snippet;
    };

    let { children }: Props = $props();
</script>

<ThemeProvider>
    {@render children?.()}
</ThemeProvider>
