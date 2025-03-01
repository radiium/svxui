<script lang="ts">
    import { defaultInputGroupItemProps } from '../props.js';
    import type { InputGroupItemProps } from '../types.js';

    let {
        elementRef = $bindable(),
        color = defaultInputGroupItemProps.color,
        children,
        ...rest
    }: InputGroupItemProps = $props();

    let cssClass = $derived([rest.class, 'input-group-item']);
</script>

<div {...rest} data-color={color} class={cssClass} bind:this={elementRef}>
    {@render children?.()}
</div>

<style>
    .input-group-item {
        position: relative;
        display: flex;
        align-items: center;
        border-radius: max(var(--radius-3), var(--radius-full));
        box-shadow: inset var(--accent-box-shadow) !important;
    }
</style>
