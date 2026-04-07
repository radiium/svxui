<script lang="ts">
    import { Cluster } from '$lib/components/layout/index.js';
    import { Badge, Panel, Text } from '$lib/index.js';
    import Playground from '../../../controls/Playground.svelte';
</script>

<h1>layout/cluster</h1>
<Text muted size="2">flex wrap — tags, badges, buttons that naturally wrap around.</Text>

<Playground>
    <Panel variant="clear" outline size="3" fullWidth>
        <Cluster gap="2">
            {#each ['Svelte', 'TypeScript', 'CSS', 'Intrinsic', 'Layout', 'No media query', 'Responsive', 'Design tokens', 'Box model'] as tag (tag)}
                <Badge variant="soft" size="3">{tag}</Badge>
            {/each}
        </Cluster>
    </Panel>
</Playground>
