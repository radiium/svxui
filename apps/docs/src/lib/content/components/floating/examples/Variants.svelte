<script lang="ts">
    import { Floating, Button, Select, type FloatingVariant, Flex, Checkbox, SelectOption } from 'svxui';

    let isOpen = $state(false);
    const open = () => (isOpen = true);

    const options: FloatingVariant[] = ['solid', 'soft', 'surface', 'clear'];
    let variant = $state(options[0]);
    let outline = $state(false);
</script>

<Flex justify="start" gap="3">
    <Select bind:value={variant}>
        {#each options as value (value)}
            <SelectOption {value}>{value}</SelectOption>
        {/each}
    </Select>
    <Flex justify="start" as="label" gap="2" align="center">
        <Checkbox bind:checked={outline} />
        outline
    </Flex>
</Flex>

<Floating bind:isOpen closeOnOutsideClick {variant} {outline}>
    {#snippet trigger()}
        <Button onclick={open}>Open</Button>
    {/snippet}
    {#snippet content()}
        <div>Floating content</div>
    {/snippet}
</Floating>
