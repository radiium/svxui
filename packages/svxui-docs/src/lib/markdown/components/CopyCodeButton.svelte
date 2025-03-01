<script lang="ts">
    import CheckAltIcon from '$lib/icons/CheckAltIcon.svelte';
    import ClipboardIcon from '$lib/icons/ClipboardIcon.svelte';
    import { Button } from 'svxui';
    import { ClipBoard } from '../../utils/clipboard.svelte';

    type Props = {
        codeString?: string;
    };

    let { codeString = '' }: Props = $props();

    const clipboard = new ClipBoard();
</script>

<Button size="2" variant="soft" iconOnly onclick={() => clipboard.copy(codeString)}>
    {#if clipboard.isCopied}
        <CheckAltIcon size="20" data-color="green" style="color: var(--accent-9)" />
    {:else}
        <ClipboardIcon size="20" />
    {/if}
</Button>
