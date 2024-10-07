<script lang="ts">
    import { clsx } from '../../utils/clsx.js';
    import { defaultBoxProps } from './Box.props.js';
    import type { BoxProps } from './Box.types.js';

    type $$Props = BoxProps;
    export let elementRef: $$Props['elementRef'] = defaultBoxProps.elementRef;
    export let as: $$Props['as'] = defaultBoxProps.as;
    export let display: $$Props['display'] = defaultBoxProps.display;

    $: cssClass = clsx($$restProps.class, 'Box', {
        [`display-${display}`]: display
    });
</script>

<svelte:element this={as} {...$$restProps} class={cssClass} style={$$restProps.style} bind:this={elementRef}>
    <slot />
</svelte:element>

<style lang="scss">
    .inset-auto {
        inset: auto;
    }

    .top-auto {
        top: auto;
    }

    .right-auto {
        right: auto;
    }

    .bottom-auto {
        bottom: auto;
    }

    .left-auto {
        left: auto;
    }

    .inset-0 {
        inset: 0;
    }

    .top-0 {
        top: 0;
    }

    .right-0 {
        right: 0;
    }

    .bottom-0 {
        bottom: 0;
    }

    .left-0 {
        left: 0;
    }

    .inset-50\% {
        inset: 50%;
    }

    .top-50\% {
        top: 50%;
    }

    .right-50\% {
        right: 50%;
    }

    .bottom-50\% {
        bottom: 50%;
    }

    .left-50\% {
        left: 50%;
    }

    .inset-100\% {
        inset: 100%;
    }

    .top-100\% {
        top: 100%;
    }

    .right-100\% {
        right: 100%;
    }

    .bottom-100\% {
        bottom: 100%;
    }

    .left-100\% {
        left: 100%;
    }
</style>
