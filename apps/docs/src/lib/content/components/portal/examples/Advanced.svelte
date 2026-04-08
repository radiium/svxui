<script lang="ts">
    import { Checkbox, Flex, Panel, Portal, Select, SelectOption } from 'svxui';

    let enabled = $state(false);
    let target = $state('#target1');
    const targets = ['#target1', '#target2'];
</script>

<Flex justify="start" direction="column" gap="5">
    <Flex justify="start" gap="3">
        <Flex justify="start" as="label" gap="2" align="center">
            <Checkbox bind:checked={enabled} />
            Enabled
        </Flex>
        <Select size="3" bind:value={target}>
            {#each targets as value (value)}
                <SelectOption {value}>{value}</SelectOption>
            {/each}
        </Select>
    </Flex>

    <Panel variant="clear" outline>
        Source

        <Portal {enabled} {target}>
            <Panel>Portal content</Panel>
        </Portal>
    </Panel>

    <Panel variant="clear" outline id="target1">Target 1</Panel>
    <Panel variant="clear" outline id="target2">Target 2</Panel>
</Flex>
