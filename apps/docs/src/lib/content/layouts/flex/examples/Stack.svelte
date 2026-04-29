<script lang="ts">
    import { Flex, Panel } from 'svxui';
</script>

<Flex direction="column" gap="3" width="100%">
    {#each { length: 5 }, i (i)}
        <Panel p="3" outline fullWidth>{i + 1}</Panel>
    {/each}
</Flex>
