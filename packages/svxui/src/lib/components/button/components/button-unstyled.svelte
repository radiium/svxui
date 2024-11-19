<script lang="ts">
    import { clsx } from '../../../utils/clsx.js';
    import type { ButtonUnstyledProps } from '../types.js';

    let { elementRef = $bindable(), children, ...rest }: ButtonUnstyledProps = $props();

    let cssClass = $derived(clsx(rest.class, 'ButtonUnstyled'));
</script>

<button {...rest} class={cssClass} bind:this={elementRef}>
    {@render children?.()}
</button>

<style lang="scss">
    .ButtonUnstyled {
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
