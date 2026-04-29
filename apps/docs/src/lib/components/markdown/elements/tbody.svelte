<script>
    let { children, ...restProps } = $props();
</script>

<tbody {...restProps}>
    {@render children?.()}
</tbody>
