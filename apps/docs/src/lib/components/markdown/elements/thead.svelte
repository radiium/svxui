<script>
    let { children, ...restProps } = $props();
</script>

<thead {...restProps}>
    {@render children?.()}
</thead>
