<script lang="ts">
    import { onDestroy } from 'svelte';
    import { Flexbox, Hotkeys, Text } from 'svxui';

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

{#snippet labelValue(label: string, value: unknown)}
    <Flexbox align="center" gap="5" as="label">
        <Text style="min-width: 125px" align="end">{label}:</Text>
        <Text muted>{value}</Text>
    </Flexbox>
{/snippet}

<Flexbox direction="column" align="start">
    {@render labelValue('All pressed keys', hotkeys.all)}
    {@render labelValue('Ctrl+a', isCtrla)}
    {@render labelValue('Meta+e', isMetaE)}
    {@render labelValue('Meta+z pressed', count + ' times')}
</Flexbox>
