<script lang="ts">
    import Info from 'phosphor-svelte/lib/Info';
    import Popover from '$lib/components/Popover/Popover.svelte';
    import Button from '$lib/components/Button/Button.svelte';
</script>

<Popover arrow={false}>
    <Button size="1" iconOnly color="gray" variant="clear" slot="trigger" let:open let:isOpen on:click={open}>
        <Info size="32" />
    </Button>
    <slot />
</Popover>
