<script lang="ts">
    import type { ButtonUnstyledProps } from '../types.js';

    let { elementRef = $bindable(), children, ...rest }: ButtonUnstyledProps = $props();

    let cssClass = $derived([rest.class, 'button-unstyled']);
</script>

<button {...rest} class={cssClass} bind:this={elementRef}>
    {@render children?.()}
</button>

<style>
    .button-unstyled {
        cursor: pointer;
        background-color: transparent;
        color: inherit;
        border: none;
        padding: 0;
        font: inherit;
        outline: inherit;
        text-decoration: none;
        touch-action: manipulation;
        appearance: none;
        -webkit-tap-highlight-color: transparent;
    }
</style>
