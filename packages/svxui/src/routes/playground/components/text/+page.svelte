<script lang="ts">
    import { Flexbox, Panel, Text, type Color, type TextProps } from '$lib/index.js';
    import { cartesianProduct, groupBy } from '../../controls/cartesian-product.js';
    import ControlCheckbox from '../../controls/ControlCheckbox.svelte';
    import ControlSelect from '../../controls/ControlSelect.svelte';
    import Playground from '../../controls/Playground.svelte';

    const base: TextProps<'div'> | TextProps<'a'> = $state({
        as: 'div',
        color: undefined,
        size: '3',
        weight: 'regular',
        transform: undefined,
        align: 'start',
        wrap: undefined,
        underline: 'none',
        truncate: false,
        muted: false,
        disabled: false
    });

    const sections = groupBy(
        cartesianProduct({
            color: ['neutral', 'blue', 'green', 'yellow', 'orange', 'red'] as Color[]
        }),
        'color'
    );
</script>

<h1>Panel</h1>

<Playground>
    {#snippet controls()}
        <ControlCheckbox label="disabled" bind:checked={base.disabled} />
        <ControlCheckbox label="muted" bind:checked={base.muted} />
        <ControlCheckbox label="truncate" bind:checked={base.truncate} />
        <ControlSelect
            label="size"
            bind:value={base.size}
            options={['1', '2', '3', '4', '5', '6', '7', '8', '9']}
        />
        <ControlSelect
            label="weight"
            bind:value={base.weight}
            options={['light', 'regular', 'medium', 'bold']}
        />
        <ControlSelect
            label="wrap"
            bind:value={base.wrap}
            options={['wrap', 'nowrap', 'pretty', 'balance']}
        />
        <ControlSelect
            label="underline"
            bind:value={base.underline}
            options={['auto', 'always', 'hover', 'none']}
        />
        <ControlSelect
            label="transform"
            bind:value={base.transform}
            options={['lowercase', 'uppercase', 'capitalize']}
        />
        <ControlSelect label="align" bind:value={base.align} options={['start', 'center', 'end']} />
    {/snippet}

    <Flexbox direction="column" gap="3" fullWidth>
        {#each sections as section, i (i)}
            <Panel variant="clear" outline fullWidth>
                <Flexbox wrap="wrap" gap="3">
                    {#each section as item, j (j)}
                        {@const props = { ...base, ...item }}
                        <Text {...props} title={JSON.stringify(props, null, 2)} class="w-100">
                            The quick brown fox jumps over the lazy dog.
                        </Text>
                    {/each}
                </Flexbox>
            </Panel>
        {/each}
    </Flexbox>
</Playground>
