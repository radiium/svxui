<script lang="ts">
    import { Flex, Panel, Radio, Separator, Text } from 'svxui';

    const items = ['Design', 'Development', 'Marketing', 'Research', 'QA', 'DevOps'];
    let group = $state();
</script>

<Panel p="0" variant="clear" outline>
    <Flex justify="start" direction="column" width="300px">
        {#each items as value, i (value)}
            <Flex justify="start" as="label" align="center" gap="3" width="100%" py="2" px="3">
                <Radio name="option" bind:group {value} />
                <Text>{value}</Text>
            </Flex>

            {#if i < items.length - 1}
                <Separator size="4" />
            {/if}
        {/each}
    </Flex>
</Panel>
