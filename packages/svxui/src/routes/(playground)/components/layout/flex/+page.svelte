<script lang="ts">
    import { Flex } from '$lib/components/layout/index.js';
    import { Panel, Text } from '$lib/index.js';
    import Playground from '../../../controls/Playground.svelte';
</script>

<h1>layout/flex</h1>
<Text muted size="2">Flex container with direction, gap, justify, align</Text>

<Playground>
    <Flex direction="column" gap="3" fullWidth>
        <code>direction="row" justify="between" gap="2"</code>
        <Flex direction="row" justify="between" gap="2" class="p-2 dashed">
            {#each ['Item 1', 'Item 2', 'Item 3'] as item (item)}
                <Panel variant="soft" size="2">{item}</Panel>
            {/each}
        </Flex>

        <code>direction="column" align="center" gap="5"</code>
        <Flex direction="column" align="center" gap="5" class="p-2 dashed">
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
