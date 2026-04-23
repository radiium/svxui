<script lang="ts">
    import { Flex, Panel } from 'svxui';
</script>

<Flex gap="3" wrap="wrap">
    {#each { length: 10 }, i (i)}
        <Panel outline size="3">
            {i + 1}
        </Panel>
    {/each}
</Flex>
