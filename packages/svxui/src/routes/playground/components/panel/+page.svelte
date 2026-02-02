<script lang="ts">
    import { Checkbox, Flexbox, Panel, type Color, type PanelProps, type PanelVariant } from '$lib/index.js';
    import { cartesianProduct, groupBy } from '../../controls/cartesian-product.js';
    import ControlCheckbox from '../../controls/ControlCheckbox.svelte';
    import ControlSelect from '../../controls/ControlSelect.svelte';
    import Playground from '../../controls/Playground.svelte';

    let base: PanelProps<'div'> | PanelProps<'a'> | PanelProps<'button'> | PanelProps<'label'> = $state({
        size: '3',
        outline: false,
        fullWidth: false,
        as: 'div'
    });

    const sections = groupBy(
        cartesianProduct({
            color: ['neutral', 'blue', 'green', 'yellow', 'orange', 'red'] as Color[],
            variant: ['solid', 'soft', 'clear'] as PanelVariant[]
        }),
        'color'
    );
</script>

<h1>Panel</h1>

<Playground>
    {#snippet controls()}
        <ControlCheckbox label="outline" bind:checked={base.outline} />
        <ControlCheckbox label="fullWidth" bind:checked={base.fullWidth} />
        <ControlSelect
            label="size"
            bind:value={base.size}
            options={['1', '2', '3', '4', '5', '6', '7', '8', '9']}
        />
        <ControlSelect
            label={(base as PanelProps<'label'>).as === 'label' ? 'as (with checkbox inside)' : 'as'}
            bind:value={base.as}
            options={['div', 'a', 'button', 'label']}
        />
    {/snippet}

    <Flexbox direction="column" gap="3">
        {#each sections as section, i (i)}
            <Panel variant="clear" outline>
                <Flexbox wrap="wrap" gap="3">
                    {#each section as item, j (j)}
                        {@const props = { ...base, ...item }}
                        <Panel {...props} title={JSON.stringify(props, null, 2)}>
                            <Flexbox justify="center" align="center" gap="3" class="w-100 h-100">
                                {#if (base as PanelProps<'label'>).as === 'label'}
                                    <Checkbox />
                                {/if}
                                panel

                                <Panel outline color="neutral">nested</Panel>
                            </Flexbox>
                        </Panel>
                    {/each}
                </Flexbox>
            </Panel>
        {/each}
    </Flexbox>
</Playground>
