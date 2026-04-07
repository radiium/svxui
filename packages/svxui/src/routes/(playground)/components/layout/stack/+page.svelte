<script lang="ts">
    import { Stack } from '$lib/components/layout/index.js';
    import { Panel, Text } from '$lib/index.js';
    import Playground from '../../../controls/Playground.svelte';
</script>

<h1>layout/stack</h1>
<Text muted size="2">flex column + gap. Idéal pour les listes verticales.</Text>

<Playground>
    <Panel variant="clear" outline size="3" fullWidth>
        <Stack gap="3">
            {#each { length: 6 }, i (i)}
                <Panel variant="soft" size="4">Element {i}</Panel>
            {/each}
        </Stack>
    </Panel>
</Playground>
