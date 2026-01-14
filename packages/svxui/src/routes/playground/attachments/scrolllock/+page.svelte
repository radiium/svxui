<script>
    import { Button, Flexbox, Panel, scrolllock } from '$lib/index.js';
    import ControlCheckbox from '../../controls/ControlCheckbox.svelte';
    import Playground from '../../controls/Playground.svelte';

    let enabled = $state(false);
</script>

<h1>Scrolllock</h1>

<Playground>
    {#snippet controls()}
        <ControlCheckbox label="enabled" bind:checked={enabled} />
    {/snippet}

    <Panel
        size="1"
        style="width: 200px; max-height: 240px; overflow: auto;"
        {@attach scrolllock({ enabled })}
    >
        <Flexbox direction="column" gap="1">
            {#each { length: 200 }, item (item)}
                <Button variant="soft" fullWidth>{item}</Button>
            {/each}
        </Flexbox>
    </Panel>
</Playground>
