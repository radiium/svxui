<script lang="ts">
    import { Button, Flexbox, SelectionState } from '$lib/index.js';
    import ControlButton from '../../controls/ControlButton.svelte';
    import ControlCheckbox from '../../controls/ControlCheckbox.svelte';
    import Playground from '../../controls/Playground.svelte';

    const options = ['opt1', 'opt2', 'opt3'];
    let multiple = $state(false);

    const selection = new SelectionState({
        get multiple() {
            return multiple;
        }
    });

    let json = $derived(
        JSON.stringify(
            {
                value: selection.value,
                multiple,
                count: selection.count
            },
            null,
            2
        )
    );
</script>

<Playground>
    {#snippet controls()}
        <ControlCheckbox label="multiple" bind:checked={multiple} />
        <ControlButton onclick={() => selection.clear()}>clear</ControlButton>
    {/snippet}

    <Flexbox direction="column" align="start" gap="1">
        {#each options as opt (opt)}
            <Button variant={selection.has(opt) ? 'solid' : 'soft'} onclick={() => selection.toggle(opt)}>
                {opt}
                (selected: {selection.has(opt)})
            </Button>
        {/each}
    </Flexbox>
</Playground>

<div><pre>{json}</pre></div>
