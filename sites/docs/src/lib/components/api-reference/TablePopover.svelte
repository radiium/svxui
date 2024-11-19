<script lang="ts">
    import Info from 'phosphor-svelte/lib/Info';
    import type { Snippet } from 'svelte';
    import { Button, Floating } from 'svxui';

    interface Props {
        children?: Snippet;
    }

    let { children }: Props = $props();

    let isOpen = $state(false);
</script>

<Floating
    bind:isOpen
    size="0"
    offset={7}
    arrow
    shift
    outline
    autoUpdate
    closeOnClickOutside
    portal
    style="max-width: 100%;"
>
    {#snippet trigger()}
        <Button size="1" iconOnly color="gray" variant="clear" onclick={() => (isOpen = !isOpen)}>
            <Info size="32" />
        </Button>
    {/snippet}
    {#snippet content()}
        {@render children?.()}
    {/snippet}
</Floating>
