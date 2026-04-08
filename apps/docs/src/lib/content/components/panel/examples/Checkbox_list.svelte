<script lang="ts">
    import { Panel, Flex, Text, Checkbox, Separator } from 'svxui';

    const items = ['item 1', 'item 2', 'item 3', 'item 4', 'item 5'];
</script>

<Panel size="0" variant="clear" outline>
    <Flex justify="start" direction="column" style="width: 300px;">
        {#each items as item, i (item)}
            <Flex justify="start" as="label" align="center" gap="3" class="w-100 py-2 px-3">
                <Checkbox />
                <Text>{item}</Text>
            </Flex>

            {#if i < items.length - 1}
                <Separator size="4" />
            {/if}
        {/each}
    </Flex>
</Panel>
