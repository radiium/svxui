<script lang="ts">
    import { clsx } from '../../utils/clsx.js';
    import { defaultButtonUnstyledProps } from './Button.props.js';
    import type { ButtonUnstyledProps } from './Button.types.js';

    type $$Props = ButtonUnstyledProps;
    export let elementRef: $$Props['elementRef'] = defaultButtonUnstyledProps.elementRef;

    $: cssClass = clsx($$restProps.class, 'ButtonUnstyled');
</script>

<button
    {...$$restProps}
    class={cssClass}
    style={$$restProps.style}
    bind:this={elementRef}
    on:click
    on:submit
    on:focus
    on:blur
    on:keydown
    on:keypress
    on:keyup
>
    <slot />
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
