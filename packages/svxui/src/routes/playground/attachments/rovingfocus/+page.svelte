<script lang="ts">
    import { Button, Flexbox, rovingfocus, type Orientation } from '$lib/index.js';
    import ControlCheckbox from '../../controls/ControlCheckbox.svelte';
    import ControlSelect from '../../controls/ControlSelect.svelte';
    import Playground from '../../controls/Playground.svelte';

    let loop = $state(false);
    let activateOnFocus = $state(false);
    let initialIndex: number | 'first' | 'last' | undefined = $state('last');
    let orientation: Orientation = $state('vertical');

    const items = ['item 1', 'item 2', 'item 3', 'item 4', 'item 5'];
</script>

<h1>Rovingfocus</h1>

<Playground>
    {#snippet controls()}
        <ControlCheckbox label="loop" bind:checked={loop} />
        <ControlCheckbox label="activateOnFocus" bind:checked={activateOnFocus} />
        <ControlSelect label="orientation" bind:value={orientation} options={['vertical', 'horizontal']} />
        <ControlSelect label="initialIndex" bind:value={initialIndex} options={['first', 'last', 2]} />
    {/snippet}

    <Flexbox
        direction={orientation === 'vertical' ? 'column' : 'row'}
        wrap="wrap"
        gap="1"
        {@attach rovingfocus({
            target: '[data-item]',
            get loop() {
                return loop;
            },
            get activateOnFocus() {
                return activateOnFocus;
            },
            get initialIndex() {
                return initialIndex;
            },
            get orientation() {
                return orientation;
            }
        })}
    >
        {#each items as item, i (item)}
            {@const disabled = i === 1}
            <Button data-item variant="soft" {disabled} onclick={() => console.log('click', item)}>
                {item}
                {#if disabled}
                    (disabled)
                {/if}
            </Button>
        {/each}
    </Flexbox>
</Playground>
