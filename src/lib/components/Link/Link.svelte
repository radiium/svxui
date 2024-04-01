<script lang="ts">
    import { clsx } from '../../utils/clsx.js';
    import { defaultLinkProps } from './Link.props.js';
    import type { LinkProps } from './Link.types.js';

    type $$Props = LinkProps;
    export let elementRef: $$Props['elementRef'] = defaultLinkProps.elementRef;
    export let href: $$Props['href'] = defaultLinkProps.href;
    export let target: $$Props['target'] = defaultLinkProps.target;
    export let rel: $$Props['rel'] = defaultLinkProps.rel;
    export let color: $$Props['color'] = defaultLinkProps.color;
    export let size: $$Props['size'] = defaultLinkProps.size;
    export let weight: $$Props['weight'] = defaultLinkProps.weight;
    export let transform: $$Props['transform'] = defaultLinkProps.transform;
    export let align: $$Props['align'] = defaultLinkProps.align;
    export let underline: $$Props['underline'] = defaultLinkProps.underline;
    export let wrap: $$Props['wrap'] = defaultLinkProps.wrap;
    export let truncate: $$Props['truncate'] = defaultLinkProps.truncate;
    export let disabled: $$Props['disabled'] = defaultLinkProps.disabled;

    $: cssClass = clsx($$restProps.class, 'Link', {
        [`Link-size-${size}`]: size,
        [`Link-color-${color}`]: color,
        [`Link-weight-${weight}`]: weight,
        [`Link-align-${align}`]: align,
        [`Link-transform-${transform}`]: transform,
        [`Link-underline-${underline}`]: underline,
        [`Link-wrap-${wrap}`]: wrap,
        'Link-truncate': truncate,
        'Link-disabled': disabled
    });
</script>

<a
    {...$$restProps}
    {href}
    {target}
    {rel}
    data-color={color}
    data-size={size}
    class={cssClass}
    style={$$restProps.style}
    bind:this={elementRef}
>
    <slot />
</a>

<style lang="scss">
    .Link {
        // Colors
        color: var(--accent-a11, var(--color));
        text-decoration-line: none;

        text-decoration-thickness: min(2px, max(1px, 0.05em));
        text-underline-offset: calc(0.025em + 2px);
        text-decoration-color: var(--accent-a6);

        // Sizes
        &.Link-size-1 {
            font-size: var(--font-size-1);
            line-height: var(--line-height-1);
            letter-spacing: var(--letter-spacing-1);
        }
        &.Link-size-2 {
            font-size: var(--font-size-2);
            line-height: var(--line-height-2);
            letter-spacing: var(--letter-spacing-2);
        }
        &.Link-size-3 {
            font-size: var(--font-size-3);
            line-height: var(--line-height-3);
            letter-spacing: var(--letter-spacing-3);
        }
        &.Link-size-4 {
            font-size: var(--font-size-4);
            line-height: var(--line-height-4);
            letter-spacing: var(--letter-spacing-4);
        }
        &.Link-size-5 {
            font-size: var(--font-size-5);
            line-height: var(--line-height-5);
            letter-spacing: var(--letter-spacing-5);
        }
        &.Link-size-6 {
            font-size: var(--font-size-6);
            line-height: var(--line-height-6);
            letter-spacing: var(--letter-spacing-6);
        }
        &.Link-size-7 {
            font-size: var(--font-size-7);
            line-height: var(--line-height-7);
            letter-spacing: var(--letter-spacing-7);
        }
        &.Link-size-8 {
            font-size: var(--font-size-8);
            line-height: var(--line-height-8);
            letter-spacing: var(--letter-spacing-8);
        }
        &.Link-size-9 {
            font-size: var(--font-size-9);
            line-height: var(--line-height-9);
            letter-spacing: var(--letter-spacing-9);
        }

        // Weight
        &.Link-weight-light {
            font-weight: var(--font-weight-light);
        }
        &.Link-weight-regular {
            font-weight: var(--font-weight-regular);
        }
        &.Link-weight-medium {
            font-weight: var(--font-weight-medium);
        }
        &.Link-weight-bold {
            font-weight: var(--font-weight-bold);
        }

        // Transform
        &.Link-transform-lowercase {
            text-transform: lowercase;
        }
        &.Link-transform-uppercase {
            text-transform: uppercase;
        }
        &.Link-transform-capitalize {
            text-transform: capitalize;
        }

        // Alignement
        &.Link-align-start {
            text-align: start;
        }
        &.Link-align-center {
            text-align: center;
        }
        &.Link-align-end {
            text-align: end;
        }

        // Underline
        &.Link-underline-auto:hover,
        &.Link-underline-hover:hover,
        &.Link-underline-always {
            & {
                text-decoration-line: underline;
            }
        }

        // Wrap
        &.Link-wrap-wrap {
            white-space: normal;
        }
        &.Link-wrap-nowrap {
            white-space: nowrap;
        }
        &.Link-wrap-pretty {
            white-space: normal;
            text-wrap: pretty;
        }
        &.Link-wrap-balance {
            white-space: normal;
            text-wrap: balance;
        }

        &.Link-truncate {
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }

        &.Link-disabled {
            opacity: 0.5 !important;
        }
    }
</style>
