<script lang="ts">
    import Info from 'phosphor-svelte/lib/Info';
    import { Button, Floating } from 'sveltr';

    let isOpen = false;
</script>

<Floating bind:isOpen size="0" offset={7} arrow outline autoUpdate closeOnClickOutside portal>
    <Button size="1" iconOnly color="gray" variant="clear" slot="trigger" on:click={() => (isOpen = !isOpen)}>
        <Info size="32" />
    </Button>
    <slot slot="content" />
</Floating>
