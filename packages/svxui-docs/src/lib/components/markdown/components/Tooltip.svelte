<script lang="ts">
    import InfoIcon from '$lib/icons/InfoIcon.svelte';
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
        variant="soft"
        outline
        arrow
        offset={10}
        closeOnScroll
        closeOnClickOutside
        closeOnEscape
        shift
    >
        {#snippet trigger()}
            {#if target}
                {@render target?.()}
            {:else}
                <Button size="1" variant="clear" iconOnly>
                    <InfoIcon size="18px" color="var(--neutral-8)" />
                </Button>
            {/if}
        {/snippet}
        {#snippet content()}
            <div style="max-width: 350px; height: auto; text-wrap: auto; text-align: center;">
                {@render children?.()}
            </div>
        {/snippet}
    </Floating>
</span>
