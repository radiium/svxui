<script lang="ts">
    import { styleObjectToString } from '$lib/utils/floating/index.js';
    import { useId } from '$lib/utils/use-id.js';
    import { defaultFloatingArrowProps } from '../props.js';
    import type { FloatingArrowProps } from '../types.js';

    let {
        elementRef = $bindable(),
        floatingState,
        color = defaultFloatingArrowProps.color,
        variant = defaultFloatingArrowProps.variant,
        width = 14,
        height = 8,
        tipRadius = 3,
        ...rest
    }: FloatingArrowProps = $props();

    let { side, arrow } = $derived.by(() => {
        const side = floatingState?.side ?? 'bottom';
        const x = floatingState?.middlewareData?.arrow?.x ?? null;
        const y = floatingState?.middlewareData?.arrow?.y ?? null;
        return { side, arrow: { x, y } };
    });

    const clipPathId = useId();

    // let isRTL = $derived(elementRef && platform.isRTL(elementRef));
    let isVerticalSide = $derived(side === 'top' || side === 'bottom');
    let isOutline = $derived(variant === 'outline');

    // Strokes must be double the border width, this ensures the stroke's width
    // works as you'd expect.
    const computedStrokeWidth = $derived(isOutline ? 2 : 0);
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

    let cssClass = $derived([
        rest.class,
        'floating-arrow',
        floatingState?.side,
        {
            [`floating-arrow-${variant}`]: variant
        }
    ]);

    let style = $derived.by(() => {
        return styleObjectToString({
            left: `${arrowX}`,
            top: `${arrowY}`,
            [side]: isVerticalSide ? '100%' : `calc(100% - ${computedStrokeWidth / 2}px)`,
            transform: `${rotateTransform} translateY(${isOutline ? '-1px' : '0'})`
        });
    });

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
</script>

<svg
    bind:this={elementRef}
    width={width + computedStrokeWidth}
    height={width}
    viewBox={`0 0 ${width} ${height > width ? height : width}`}
    aria-hidden="true"
    {style}
    class={cssClass}
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
        z-index: 10;
        position: absolute;
        pointer-events: none;
        fill: var(--floating-background);

        path {
            &.floating-arrow-border {
                stroke: var(--floating-border-color);
            }
        }

        /* Variants */
        &.floating-arrow-solid {
            --floating-border-color: transparent;
            --floating-background: var(--accent-5);
        }
        &.floating-arrow-soft {
            --floating-border-color: transparent;
            --floating-background: var(--accent-3);
        }
        &.floating-arrow-outline {
            --floating-border-color: var(--accent-7);
            --floating-background: var(--accent-7);
        }
    }
</style>
