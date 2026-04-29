<script lang="ts">
    import InfoIcon from '$lib/components/icons/InfoIcon.svelte';
    import type { Snippet } from 'svelte';
    import { Button, Floating } from 'svxui';

    type Props = {
        target?: Snippet;
        children: Snippet;
    };

    let { target, children }: Props = $props();

    let isOpen = $state(true);
</script>

<span role="tooltip" onmouseenter={() => (isOpen = true)} onmouseleave={() => (isOpen = false)}>
    <Floating
        bind:isOpen
        variant="surface"
        outline
        arrow
        offset={10}
        closeOnScroll
        closeOnOutsideClick
        closeOnEscape
        shift
    >
        {#snippet trigger()}
            {#if target}
                {@render target?.()}
            {:else}
                <Button size="1" variant="clear" iconOnly>
                    <InfoIcon size="18px" data-color="neutral" color="var(--accent-8)" />
                </Button>
            {/if}
        {/snippet}
        {#snippet content()}
            <div class="tooltip-content">
                {@render children?.()}
            </div>
        {/snippet}
    </Floating>
</span>

<style>
    .tooltip-content {
        max-width: 350px;
        height: auto;
        text-wrap: auto;
        text-align: center;
    }
</style>
