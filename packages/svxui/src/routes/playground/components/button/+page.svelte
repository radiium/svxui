<script lang="ts">
    import { Button, Flexbox, Panel, type ButtonProps } from '$lib/index.js';
    import { cartesianProduct, groupBy } from '../../controls/cartesian-product.js';
    import ControlCheckbox from '../../controls/ControlCheckbox.svelte';
    import ControlSelect from '../../controls/ControlSelect.svelte';
    import Playground from '../../controls/Playground.svelte';

    let base: ButtonProps = $state({
        size: '2',
        align: 'center',
        transform: undefined,
        active: false,
        disabled: false,
        fullWidth: false,
        iconOnly: false
    });

    const sections = groupBy(
        cartesianProduct<ButtonProps>({
            color: ['neutral', 'blue', 'green', 'yellow', 'orange', 'red'],
            variant: ['solid', 'soft', 'outline', 'clear']
        }),
        'color'
    );
</script>

<h1>Button</h1>

<Playground>
    {#snippet controls()}
        <ControlCheckbox label="disabled" bind:checked={base.disabled} />
        <ControlCheckbox label="active" bind:checked={base.active} />
        <ControlCheckbox label="fullWidth" bind:checked={base.fullWidth} />
        <ControlCheckbox label="iconOnly" bind:checked={base.iconOnly} />
        <ControlSelect label="size" bind:value={base.size} options={['1', '2', '3']} />
        <ControlSelect label="align" bind:value={base.align} options={['start', 'center', 'end']} />
        <ControlSelect
            label="transform"
            bind:value={base.transform}
            options={['lowercase', 'uppercase', 'capitalize']}
        />
    {/snippet}

    <Flexbox direction="column" gap="3">
        {#each sections as section, i (i)}
            <Panel variant="clear" outline>
                <Flexbox wrap="wrap" gap="3">
                    {#each section as item, j (j)}
                        {@const props = { ...base, ...item }}
                        <Button {...props} title={JSON.stringify(props, null, 2)}>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 256 256"
                                style="width: 1rem;"
                            >
                                <rect width="256" height="256" fill="none" /><line
                                    x1="40"
                                    y1="128"
                                    x2="216"
                                    y2="128"
                                    fill="none"
                                    stroke="currentColor"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="16"
                                />
                                <line
                                    x1="128"
                                    y1="40"
                                    x2="128"
                                    y2="216"
                                    fill="none"
                                    stroke="currentColor"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="16"
                                />
                            </svg>
                            {#if !props.iconOnly}
                                button
                            {/if}
                        </Button>
                    {/each}
                </Flexbox>
            </Panel>
        {/each}
    </Flexbox>
</Playground>
