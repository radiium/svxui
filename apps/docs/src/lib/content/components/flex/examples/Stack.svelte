<script lang="ts">
    import { Flex, Panel } from 'svxui';
</script>

<Flex direction="column" gap="3" fullWidth>
    {#each { length: 5 }, i (i)}
        <Panel size="3" outline fullWidth>
            {i + 1}
        </Panel>
    {/each}
</Flex>
