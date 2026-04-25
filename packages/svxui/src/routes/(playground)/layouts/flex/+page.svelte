<script lang="ts">
    import { Panel, Text } from '$lib/index.js';
    import { Flex } from '$lib/components/flex/index.js';
    import Playground from '../../controls/Playground.svelte';
</script>

<h1>layout/flex</h1>
<Text muted size="2">Flex container with direction, gap, justify, align</Text>

<Playground>
    <Flex justify="start" direction="column" gap="3" width="100%">
        <code>direction="row" justify="between" gap="2"</code>
        <Flex direction="row" justify="between" gap="2" p="2" class="dashed">
            {#each ['Item 1', 'Item 2', 'Item 3'] as item (item)}
                <Panel variant="soft" size="2">{item}</Panel>
            {/each}
        </Flex>

        <code>direction="column" align="center" gap="5"</code>
        <Flex justify="start" direction="column" align="center" gap="5" p="2" class="dashed">
            {#each ['Alpha', 'Beta'] as item (item)}
                <Panel variant="soft" size="2">{item}</Panel>
            {/each}
        </Flex>
    </Flex>
</Playground>

<style>
    code {
        font-size: 0.8em;
        color: var(--gray-11);
    }
    :global(.dashed) {
        outline: 1px dashed var(--gray-6);
        border-radius: 4px;
    }
</style>
