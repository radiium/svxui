<script>
    let { children, ...restProps } = $props();
</script>

<em class="em" {...restProps}>
    {@render children?.()}
</em>

<style>
    em.em {
        display: inline-block;
        font-style: italic;
    }
</style>
