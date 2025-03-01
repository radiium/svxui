<script>
    import DemoContainer from '../DemoContainer.svelte';

    let { children, meta } = $props();
</script>

<DemoContainer {meta}>
    {#snippet code()}
        {@render children?.()}
    {/snippet}
</DemoContainer>
