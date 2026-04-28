<script lang="ts">
    import Button from '$lib/components/button/components/button.svelte';
    import {
        AllRadixColors,
        Checkbox,
        Flex,
        Panel,
        type PanelProps,
        type PanelVariant
    } from '$lib/index.js';
    import { cartesianProduct, groupBy } from '../../controls/cartesian-product.js';
    import ControlCheckbox from '../../controls/ControlCheckbox.svelte';
    import ControlSelect from '../../controls/ControlSelect.svelte';
    import Playground from '../../controls/Playground.svelte';

    const base: PanelProps<'div'> | PanelProps<'a'> | PanelProps<'button'> | PanelProps<'label'> = $state({
        p: '3',
        color: 'neutral',
        outline: false,
        fullWidth: false,
        as: 'div'
    });

    const sections = groupBy(
        cartesianProduct({
            variant: ['solid', 'soft', 'surface', 'clear'] as PanelVariant[]
        }),
        'variant'
    );
</script>

<h1>Panel</h1>

<Playground>
    {#snippet controls()}
        <ControlCheckbox label="outline" bind:checked={base.outline} />
        <ControlCheckbox label="fullWidth" bind:checked={base.fullWidth} />
        <ControlSelect label="color" bind:value={base.color} options={AllRadixColors} />
        <ControlSelect
            label="p"
            bind:value={base.p}
            options={['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']}
        />
        <ControlSelect
            label={(base as PanelProps<'label'>).as === 'label' ? 'as (with checkbox inside)' : 'as'}
            bind:value={base.as}
            options={['div', 'a', 'button', 'label']}
        />
    {/snippet}

    <Flex justify="start" direction="column" gap="3">
        {#each sections as section, i (i)}
            <Panel variant="clear" outline p="0">
                <div class="background">
                    <Flex justify="start" direction="column" gap="5" class="px-5">
                        {#each section as item, j (j)}
                            {@const props = { ...base, ...item }}
                            <Flex justify="start" direction="column" gap="3" data-color={props.color}>
                                <Panel {...props} title={JSON.stringify(props, null, 2)}>
                                    <Flex
                                        direction="column"
                                        justify="center"
                                        align="center"
                                        gap="5"
                                        class="w-full h-full"
                                    >
                                        {#if (base as PanelProps<'label'>).as === 'label'}
                                            <Checkbox />
                                        {/if}
                                        <h2>{props.color} {props.variant}</h2>

                                        <Panel outline color="neutral">Nested panel</Panel>

                                        <Flex justify="start" gap="3">
                                            <Button variant="solid">button</Button>
                                            <Button variant="soft">button</Button>
                                            <Button variant="outline">button</Button>
                                            <Button variant="clear">button</Button>
                                        </Flex>
                                    </Flex>
                                </Panel>

                                <Flex justify="start" gap="3" class="px-5">
                                    <Button variant="solid">button</Button>
                                    <Button variant="soft">button</Button>
                                    <Button variant="outline">button</Button>
                                    <Button variant="clear">button</Button>
                                </Flex>
                            </Flex>
                        {/each}
                    </Flex>
                </div>
            </Panel>
        {/each}
    </Flex>
</Playground>

<style>
    :global([data-theme='light']) {
        --bg: rgba(0, 0, 0, 0.1);
    }
    :global([data-theme='dark']) {
        --bg: rgba(255, 255, 255, 0.1);
    }

    .background {
        background-image:
            linear-gradient(to right, var(--bg) 1px, transparent 1px),
            linear-gradient(to bottom, var(--bg) 1px, transparent 1px);

        background-size: 20px 20px;
        background-position: center;
    }
</style>
