<script>
    import { Flexbox, Hotkeys } from '$lib/index.js';
    import { onDestroy } from 'svelte';
    import ControlLabelValue from '../../controls/ControlLabelValue.svelte';
    import Playground from '../../controls/Playground.svelte';

    let hotkeys = new Hotkeys();

    let isCtrla = $derived(hotkeys.has('Control+a'));
    let isMetaE = $derived(hotkeys.has(['Meta', 'e']));

    let count = $state(0);
    let offMetaZ = hotkeys.on(['meta', 'z'], (event) => {
        event.preventDefault();
        count++;
    });

    onDestroy(offMetaZ);
</script>

<h1>Hotkeys</h1>

<Playground>
    <Flexbox direction="column" align="start">
        <ControlLabelValue label="All keys" value={hotkeys.all} />
        <ControlLabelValue label="Ctrl+a" value={isCtrla} />
        <ControlLabelValue label="Meta+e" value={isMetaE} />
        <ControlLabelValue label="Meta+z pressed" value="{count} times" />
    </Flexbox>
</Playground>
