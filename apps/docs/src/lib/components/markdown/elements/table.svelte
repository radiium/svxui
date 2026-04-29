<script>
    import { Panel } from 'svxui';

    let { children, ...restProps } = $props();
</script>

<Panel variant="surface" outline p="0" class="mt-6">
    <table {...restProps}>
        {@render children?.()}
    </table>
</Panel>

<style>
    table {
        width: 100%;
        max-width: 100%;
        border-spacing: 0;
        border-collapse: collapse;
        background-color: var(--color-background-0);
        overflow: hidden;
        border-radius: var(--radius-4);
        font-size: var(--font-size-2);
        line-height: var(--line-height-2);
    }
</style>
