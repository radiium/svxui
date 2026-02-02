<script lang="ts">
    import { Floating, Button, Select, type FloatingVariant } from 'svxui';

    let isOpen = $state(false);

    const options: FloatingVariant[] = ['solid', 'soft', 'outline'];
    let variant = $state(options[0]);
</script>

<Select {options} bind:value={variant} />

<Floating bind:isOpen closeOnClickOutside {variant}>
    {#snippet trigger()}
        <Button onclick={() => (isOpen = true)}>Open</Button>
    {/snippet}
    {#snippet content()}
        <div>Floating content</div>
    {/snippet}
</Floating>
