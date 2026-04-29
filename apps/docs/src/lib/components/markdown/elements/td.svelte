<script>
    let { children, ...restProps } = $props();
</script>

<td {...restProps}>
    {@render children?.()}
</td>

<style>
    td {
        text-align: left;
        height: 44px;
        padding: var(--space-3);
        box-shadow: inset 0 -1px var(--neutral-a5);
    }
</style>
