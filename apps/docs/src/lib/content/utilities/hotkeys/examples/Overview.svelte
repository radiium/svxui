<script lang="ts">
    import { onDestroy } from 'svelte';
    import { Hotkeys, Text } from 'svxui';

    const hotkeys = new Hotkeys();

    let isCtrla = $derived(hotkeys.has('Control+a'));
    let isMetaE = $derived(hotkeys.has(['Meta', 'e']));

    let count = $state(0);
    const offMetaZ = hotkeys.on(['meta', 'z'], (event) => {
        event.preventDefault();
        count++;
    });

    onDestroy(offMetaZ);
</script>

<ul>
    <li>
        <Text align="end">All pressed keys :</Text>
        <Text muted>{hotkeys.all}</Text>
    </li>
    <li>
        <Text align="end">Ctrl+a :</Text>
        <Text muted>{isCtrla}</Text>
    </li>
    <li>
        <Text align="end">Meta+e :</Text>
        <Text muted>{isMetaE}</Text>
    </li>
    <li>
        <Text align="end">Meta+z pressed :</Text>
        <Text muted>{count} times</Text>
    </li>
</ul>
