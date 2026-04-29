<script>
    let { children, ...restProps } = $props();
</script>

<th {...restProps}>
    {@render children?.()}
</th>

<style>
    th {
        text-align: left;
        height: 44px;
        padding: var(--space-3);
        background-color: var(--color-background-1);
        font-weight: 700;

        &:first-child {
            border-top-left-radius: var(--radius-4);
        }
        &:last-child {
            border-top-right-radius: var(--radius-4);
        }
    }
</style>
