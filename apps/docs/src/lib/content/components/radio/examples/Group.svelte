<script lang="ts">
    import { Flex, Radio } from 'svxui';

    const items = ['1', '2', '3'];
    let group = $state('1');
</script>

group: {JSON.stringify(group)}

<Flex justify="start" gap="3" direction="column" align="center">
    {#each items as value (value)}
        <Flex justify="start" as="label" align="center" gap="2">
            <Radio name="radioGroup" {value} bind:group />
            label {value}
        </Flex>
    {/each}
</Flex>
