<script lang="ts">
    /**
     * Credit: {@link https://github.com/skeletonlabs/floating-ui-svelte/blob/main/packages/floating-ui-svelte/src/components/floating-arrow.svelte}
     */

    import { styleObjectToString } from '$lib/utilities/floating-engine/internals/style-object-to-string.js';
    import { defaultFloatingArrowProps } from '../props.js';
    import type { FloatingArrowProps } from '../types.js';

    let {
        ref = $bindable(),
        floatingState,
        color = defaultFloatingArrowProps.color,
        variant = defaultFloatingArrowProps.variant,
        outline = defaultFloatingArrowProps.outline,
        zIndex,
        width = defaultFloatingArrowProps.width!,
        height = defaultFloatingArrowProps.height!,
        tipRadius = defaultFloatingArrowProps.tipRadius!,
        ...rest
    }: FloatingArrowProps = $props();

    let { side, arrow } = $derived.by(() => {
        const side = floatingState?.side ?? 'bottom';
        const x = floatingState?.middlewareData?.arrow?.x ?? null;
        const y = floatingState?.middlewareData?.arrow?.y ?? null;
        return { side, arrow: { x, y } };
    });

    const clipPathId = $props.id();

    // let isRTL = $derived(ref && platform.isRTL(ref));
    let isVerticalSide = $derived(side === 'top' || side === 'bottom');

    // Strokes must be double the border width, this ensures the stroke's width works as you'd expect.
    const computedStrokeWidth = $derived(outline ? 2 : 0);
    const halfStrokeWidth = $derived(computedStrokeWidth / 2);

    const svgX = $derived((width / 2) * (tipRadius / -8 + 1));
    const svgY = $derived(((height / 2) * tipRadius) / 4);

    const arrowX = $derived(arrow?.x != null ? `${arrow.x}px` : '');
    const arrowY = $derived(arrow?.y != null ? `${arrow.y}px` : '');

    const dValue = $derived(
        'M0,0' +
            ` H${width}` +
            ` L${width - svgX},${height - svgY}` +
            ` Q${width / 2},${height} ${svgX},${height - svgY}` +
            ' Z'
    );

    const rotateTransform = $derived.by(() => {
        switch (side) {
            case 'top':
                return '';
            case 'left':
                return 'rotate(-90deg)';
            case 'bottom':
                return 'rotate(180deg)';
            case 'right':
                return 'rotate(90deg)';
        }
    });

    let cssClass = $derived([
        rest.class,
        'floating-arrow',
        {
            [`floating-arrow-${floatingState?.side}`]: floatingState?.side,
            [`floating-arrow-${variant}`]: variant
        }
    ]);

    let cssStyle = $derived.by(() => {
        return styleObjectToString({
            'z-index': zIndex,
            left: `${arrowX}`,
            top: `${arrowY}`,
            [side]: isVerticalSide ? '100%' : `calc(100% - ${halfStrokeWidth}px)`,
            transform: `${rotateTransform} translateY(${outline ? '-1px' : '0'})`
        });
    });
</script>

<svg
    bind:this={ref}
    width={width + computedStrokeWidth}
    height={width}
    viewBox={`0 0 ${width} ${height > width ? height : width}`}
    aria-hidden="true"
    class={cssClass}
    style={cssStyle}
    data-color={color}
    {...rest}
>
    {#if computedStrokeWidth > 0}
        <path
            class="floating-arrow-border"
            fill="none"
            clip-path={`url(#${clipPathId})`}
            stroke-width={computedStrokeWidth}
            d={dValue}
        />
    {/if}

    <path d={dValue} />
    <clipPath id={clipPathId}>
        <rect x={-halfStrokeWidth} y={halfStrokeWidth} width={width + computedStrokeWidth} height={width} />
    </clipPath>
</svg>

<style>
    .floating-arrow {
        position: absolute;
        pointer-events: none;
        fill: var(--floating-background);

        path {
            &.floating-arrow-border {
                stroke: var(--accent-7);
            }
        }

        /* Variants */
        &.floating-arrow-solid {
            --floating-background: var(--accent-5);
        }
        &.floating-arrow-soft {
            --floating-background: var(--accent-3);
        }
        &.floating-arrow-clear {
            --floating-background: var(--color-background-0);
        }
    }
</style>
