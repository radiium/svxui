<script lang="ts">
    import Check from 'phosphor-svelte/lib/Check';
    import Clipboard from 'phosphor-svelte/lib/Clipboard';
    import { Button } from 'svxui';

    interface Props {
        copied?: boolean;
        onclick?: () => void;
    }

    let { copied = false, onclick = () => {} }: Props = $props();
</script>

<div class="copy-btn">
    <Button size="1" variant="soft" iconOnly {onclick}>
        {#if copied}
            <Check size="20" weight="bold" data-color="green" style="fill: var(--accent-9)" />
        {:else}
            <Clipboard size="20" />
        {/if}
    </Button>
</div>
