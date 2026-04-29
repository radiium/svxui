<script lang="ts">
    import { Button, Checkbox, Flex, Panel, scrolllock } from 'svxui';

    let enabled = $state(false);
</script>

<Flex justify="start" as="label" gap="2" align="center">
    <Checkbox bind:checked={enabled} />
    Enabled
</Flex>

<Panel p="1" color="neutral">
    <Flex
        justify="start"
        direction="column"
        gap="1"
        width="200px"
        maxHeight="240px"
        overflow="scroll"
        {@attach scrolllock({ enabled })}
    >
        {#each { length: 200 }, i (i)}
            <Button variant="soft" fullWidth>Item {i}</Button>
        {/each}
    </Flex>
</Panel>
