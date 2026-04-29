<script>
    let { children, ...restProps } = $props();
</script>

<em {...restProps}>
    {@render children?.()}
</em>

<style>
    em {
        display: inline-block;
        font-style: italic;
    }
</style>
