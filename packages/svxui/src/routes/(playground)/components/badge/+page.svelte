<script lang="ts">
    import { AllRadixColors, Badge, Flex, Panel, type BadgeProps } from '$lib/index.js';
    import { cartesianProduct, groupBy } from '../../controls/cartesian-product.js';
    import ControlCheckbox from '../../controls/ControlCheckbox.svelte';
    import ControlSelect from '../../controls/ControlSelect.svelte';
    import Playground from '../../controls/Playground.svelte';

    const base: BadgeProps = $state({
        size: '2',
        disabled: false
    });

    const sections = groupBy(
        cartesianProduct<BadgeProps>({
            color: AllRadixColors,
            variant: ['solid', 'soft', 'outline']
        }),
        'color'
    );
</script>

<h1>Badge</h1>

<Playground>
    {#snippet controls()}
        <ControlCheckbox label="disabled" bind:checked={base.disabled} />
        <ControlSelect label="size" bind:value={base.size} options={['1', '2', '3']} />
    {/snippet}

    <Flex justify="start" direction="column" gap="3">
        {#each sections as section, i (i)}
            <Panel variant="clear" outline>
                <Flex justify="start" wrap="wrap" gap="3">
                    {#each section as item, j (j)}
                        {@const props = { ...base, ...item }}
                        <Badge {...props} title={JSON.stringify(props, null, 2)}>badge</Badge>
                    {/each}
                </Flex>
            </Panel>
        {/each}
    </Flex>
</Playground>
