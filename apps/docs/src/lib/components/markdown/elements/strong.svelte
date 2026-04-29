<script>
    let { children, ...restProps } = $props();
</script>

<strong class="inline-block" {...restProps}>
    {@render children?.()}
</strong>

<style>
    strong {
        font-weight: var(--font-weight-bold);
    }
</style>
