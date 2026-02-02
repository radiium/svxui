<script>
    import CodePreview from '../components/CodePreview.svelte';

    let { children, meta } = $props();
</script>

<CodePreview {meta}>
    {#snippet code()}
        {@render children?.()}
    {/snippet}
</CodePreview>
