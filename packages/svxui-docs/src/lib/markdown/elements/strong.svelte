<script>
    let { children, ...restProps } = $props();
</script>

<strong class="strong" {...restProps}>
    {@render children?.()}
</strong>

<style>
    strong.strong {
        display: inline-block;
        font-weight: var(--font-weight-bold);
    }
</style>
