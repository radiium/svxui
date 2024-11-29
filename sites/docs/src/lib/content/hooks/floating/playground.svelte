<script lang="ts">
    import { fade } from 'svelte/transition';
    import { autoUpdate, Button, Card, Flexbox, useFloating, useFloatingMiddleware } from 'svxui';

    let isOpen = $state(false);

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

<Card style="overflow: visible;">
    <Flexbox direction="column" align="start" justify="start">
        <div bind:this={floating.reference}>
            <Button variant="surface" onclick={() => (isOpen = !isOpen)}>Open</Button>
        </div>

        {#if isOpen}
            <div
                class="floating"
                bind:this={floating.floating}
                style={floating.style}
                transition:fade={{ duration: 100 }}
            >
                <Card style="background: var(--gray-2)">Content</Card>

                <div class="floating-arrow" bind:this={arrowEl}></div>
            </div>
        {/if}
    </Flexbox>
</Card>

<style>
    .floating {
        position: fixed;
        width: max-content;
        top: 0;
        left: 0;
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
