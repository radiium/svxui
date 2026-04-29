<script>
    let { children, ...restProps } = $props();
</script>

<tr {...restProps}>
    {@render children?.()}
</tr>
