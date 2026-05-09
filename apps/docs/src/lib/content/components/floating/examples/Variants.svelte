<script lang="ts">
    import { Floating, Button, Select, type FloatingVariant, Flex, Checkbox, SelectOption } from 'svxui';

    let open = $state(false);
    const openFloating = () => (open = true);

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

<Floating bind:open closeOnOutsideClick {variant} {outline}>
    {#snippet trigger()}
        <Button onclick={openFloating}>Open</Button>
    {/snippet}
    {#snippet content()}
        Floating content
    {/snippet}
</Floating>
