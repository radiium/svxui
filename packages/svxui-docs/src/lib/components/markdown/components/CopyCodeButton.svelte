<script lang="ts">
    import CheckAltIcon from '$lib/icons/CheckAltIcon.svelte';
    import ClipboardIcon from '$lib/icons/ClipboardIcon.svelte';
    import { Button, Clipboard } from 'svxui';

    type Props = {
        codeString?: string;
    };

    let { codeString = '' }: Props = $props();

    const clipboard = new Clipboard();
</script>

<Button
    size="2"
    variant="soft"
    disabled={!clipboard.isAvailable}
    title={clipboard.isAvailable ? 'Copy code' : 'Clipboard not available'}
    iconOnly
    onclick={() => clipboard.copy(codeString)}
>
    {#if clipboard.isCopying}
        <CheckAltIcon size="20" data-color="green" style="color: var(--accent-9)" />
    {:else}
        <ClipboardIcon size="20" />
    {/if}
</Button>
