---
title: useFloating
description: 
category: hook
---

<script lang="ts">
    import Playground from '$lib/content/hooks/floating/playground.svelte';
</script>

## Exemple

<Playground />

## Usage

```svelte
<script lang="ts">
    import { useFloating, useFloatingMiddleware, autoUpdate } from 'svxui';
    import { fade } from 'svelte/transition';

    let isOpen = $state(false);
    const toggle = () => (isOpen = !isOpen);

    let arrowEl = $state<HTMLElement | undefined>();
    let floating = useFloating({
        strategy: 'fixed',
        transform: true,
        placement: 'top',
        whileElementsMounted: autoUpdate,
        get middleware() {
            return useFloatingMiddleware({
                offset: 10,
                arrow: true,
                arrowEl
            });
        }
    });

    $effect.pre(() => {
        const side = floating.state?.side;
        const arrow = floating.state?.middlewareData?.arrow;
        if (side && arrow && arrowEl) {
            const staticSide: string = {
                top: 'bottom',
                right: 'left',
                bottom: 'top',
                left: 'right'
            }[side]!;

            Object.assign(arrowEl.style, {
                left: arrow.x != null ? `${arrow.x}px` : '',
                top: arrow.y != null ? `${arrow.y}px` : '',
                [staticSide]: '-10px'
            });
        }
    });
</script>

<button bind:this={floating.reference} onclick={toggle}>Open</button>

{#if isOpen}
    <div
        class="floating"
        bind:this={floating.floating}
        style={floating.style}
        transition:fade={{ duration: 100 }}
    >
        <div>Content</div>
        <div class="floating-arrow" bind:this={arrowEl}></div>
    </div>
{/if}

<style>
    .floating {
        position: fixed;
        width: max-content;
        top: 0;
        left: 0;
        padding: 20px;
        color: black;
        background-color: gray;
    }

    .floating-arrow {
        position: absolute;
        width: 0px;
        height: 0px;
        border-style: solid;
        border-width: 10px 5px 0 5px;
        border-color: red transparent transparent transparent;
    }
</style>

```

## Type

### useFloating State

```ts
export type FloatingSide = 'top' | 'right' | 'bottom' | 'left';
export type FloatingAlignment = 'start' | 'center' | 'end';

/**
 * Extend ComputePositionReturn from floating-ui lib
 */
export type UseFloatingState = ComputePositionReturn & {
    side: FloatingSide;
    alignment: FloatingAlignment;
};
```

### useFloating Props

```ts
export type UseFloatingProps = {
    /**
     * Use css transform instead top/left positionning
     */
    transform?: boolean;
    /**
     * floating-ui strategy
     */
    strategy?: Strategy;
    /**
     * floating-ui placement
     */
    placement?: Placement;
    /**
     * Array of floating-ui middlewares (offset, arrow, etc..)
     */
    middleware?: Array<Middleware | undefined | null | false>;
    /**
     * Callback called for trigger update
     * if function is provided useFloating does not trigger the update.
     * You will have to perform the update manually.
     * usefull with floating-ui autoUpdate feature
     * 
     * @example 
     *  whileElementsMounted: autoUpdate
     */
    whileElementsMounted?: (
        reference: ReferenceElement,
        floating: FloatingElement,
        update: () => void
    ) => () => void;
};
```


### useFloatingMiddleware Props

```ts
export type UseFloatingMiddlewareProps = {
    /**
     * Enable/disable/configure built in floating-ui middleware
     */
    offset?: boolean | OffsetOptions;
    flip?: boolean | FlipOptions;
    shift?: boolean | ShiftOptions;
    size?: boolean | SizeOptions;
    hide?: boolean | HideOptions;
    arrow?: boolean | ArrowOptions;
    arrowEl?: HTMLElement | SVGSVGElement | undefined;
    /**
     * Extra middleware(s) added at end
     */
    middleware?: Array<Middleware | undefined | null | false>;
};
```