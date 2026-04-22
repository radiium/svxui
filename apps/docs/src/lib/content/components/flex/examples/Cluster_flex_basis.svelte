<script lang="ts">
    import { Flex, Panel } from 'svxui';
</script>

<Flex justify="center" wrap="wrap" gap="3" width="100%">
    {#each { length: 5 }, i (i)}
        <Panel outline size="5" fullWidth style="flex: 1 1 200px">
            {i + 1}
        </Panel>
    {/each}
</Flex>
