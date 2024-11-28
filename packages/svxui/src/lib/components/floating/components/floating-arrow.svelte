<script lang="ts">
    import { styleObjectToString } from '$lib/hooks/floating/index.js';
    import { VariantOutline, VariantSurface } from '$lib/shared.types.js';
    import { clsx } from '$lib/utils/clsx.js';
    import { generateId } from '$lib/utils/id.js';
    import { platform } from '@floating-ui/dom';
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

    let { alignment, side, staticSide, arrow } = $derived.by(() => {
        const alignment = floatingState?.alignment ?? 'center';
        const side = floatingState?.side ?? 'bottom';
        const staticSide = side
            ? {
                  top: 'bottom',
                  right: 'left',
                  bottom: 'top',
                  left: 'right'
              }[side]
            : '';
        const x = floatingState?.middlewareData?.arrow?.x ?? null;
        const y = floatingState?.middlewareData?.arrow?.y ?? null;

        return { alignment, side, staticSide, arrow: { x, y } };
    });

    const clipPathId = generateId();

    let isRTL = $derived(elementRef && platform.isRTL(elementRef));
    let isVerticalSide = $derived(side === 'top' || side === 'bottom');
    let isSurface = $derived(variant === VariantSurface);
    let isOutline = $derived(variant === VariantOutline);

    // Strokes must be double the border width, this ensures the stroke's width
    // works as you'd expect.
    const computedStrokeWidth = $derived(isOutline || isSurface ? 2 : 0);
    const halfStrokeWidth = $derived(computedStrokeWidth / 2);

    const svgX = $derived((width / 2) * (tipRadius / -8 + 1));
    const svgY = $derived(((height / 2) * tipRadius) / 4);

    const yOffsetProp = $derived(alignment === 'end' ? 'bottom' : 'top');
    const xOffsetProp = $derived.by(() => {
        if (isRTL) {
            return alignment === 'end' ? 'right' : 'left';
        }
        return alignment === 'end' ? 'right' : 'left';
    });

    const arrowX = $derived(arrow?.x != null ? `${arrow.x}px` : '');
    const arrowY = $derived(arrow?.y != null ? `${arrow.y}px` : '');

    const dValue = $derived(
        'M0,0' +
            ` H${width}` +
            ` L${width - svgX},${height - svgY}` +
            ` Q${width / 2},${height} ${svgX},${height - svgY}` +
            ' Z'
    );

    let cssClass = $derived(
        clsx(rest.class, 'Floating-arrow', floatingState?.side, {
            [`Floating-arrow-${variant}`]: variant
        })
    );

    let style = $derived.by(() => {
        return styleObjectToString({
            [xOffsetProp]: `${arrowX}`,
            [yOffsetProp]: `${arrowY}`,
            [side]: isVerticalSide ? '100%' : `calc(100% - ${computedStrokeWidth / 2}px)`,
            transform: `${rotateTransform} translateY(-1px)`
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
        <!-- Account for the stroke on the fill path rendered below. -->
        <path
            class="Floating-arrow-border"
            fill="none"
            clip-path={`url(#${clipPathId})`}
            stroke-width={computedStrokeWidth}
            d={dValue}
        />
    {/if}
    <!--
        In Firefox, for left/right placements there's a ~0.5px gap where the
        border can show through. Adding a stroke on the fill removes it.
    -->
    <path d={dValue} />
    <!-- Assumes the border-width of the floating element matches the stroke. -->
    <clipPath id={clipPathId}>
        <rect x={-halfStrokeWidth} y={halfStrokeWidth} width={width + computedStrokeWidth} height={width} />
    </clipPath>
</svg>

<style lang="scss">
    .Floating-arrow {
        z-index: 10;
        position: absolute;
        pointer-events: none;
        fill: var(--floating-background);

        path {
            &.Floating-arrow-border {
                stroke: var(--floating-border-color);
            }
        }

        // Variants
        &.Floating-arrow-solid {
            --floating-border-color: transparent;
            --floating-background: var(--accent-5);
        }
        &.Floating-arrow-soft {
            --floating-border-color: transparent;
            --floating-background: var(--accent-3);
        }
        &.Floating-arrow-surface {
            --floating-border-color: var(--accent-6);
            --floating-background: var(--accent-2);
        }
        &.Floating-arrow-outline {
            --floating-border-color: var(--accent-7);
            --floating-background: var(--accent-7);
        }
    }
</style>
