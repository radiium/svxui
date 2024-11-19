<script lang="ts">
    import { Colors, Flexbox, Sizes1To3, Switch, Text } from '$lib/index.js';
    import Details from './Details.svelte';
    import Section from './Section.svelte';
    import Table from './Table.svelte';

    const sizes = Sizes1To3;
    const colors = Colors;
</script>

<Details>
    {#snippet title()}
        <h2>Switch</h2>
    {/snippet}

    <Section>
        {#snippet title()}
            <h3>With label</h3>
        {/snippet}

        <Flexbox as="label" align="center" gap="3">
            <Switch />
            <Text>switch label</Text>
        </Flexbox>
    </Section>

    <Section>
        {#snippet title()}
            <h3>Size</h3>
        {/snippet}

        <Table>
            {#snippet head()}
                <th></th>
                <th>default</th>
                <th>disabled</th>
            {/snippet}

            {#each sizes as size}
                <tr>
                    <td>size {size}</td>
                    <td>
                        <Flexbox gap="2">
                            <Switch {size} />
                            <Switch {size} checked />
                        </Flexbox>
                    </td>
                    <td>
                        <Flexbox gap="2">
                            <Switch {size} disabled />
                            <Switch {size} disabled checked />
                        </Flexbox>
                    </td>
                </tr>
            {/each}
        </Table>
    </Section>

    <Section>
        {#snippet title()}
            <h3>Colors</h3>
        {/snippet}

        <Table>
            {#snippet head()}
                <th></th>
                <th>default</th>
                <th>disabled</th>
            {/snippet}

            {#each colors as color}
                <tr>
                    <td>{color}</td>
                    <td>
                        <Flexbox gap="2">
                            <Switch {color} />
                            <Switch {color} checked />
                        </Flexbox>
                    </td>
                    <td>
                        <Flexbox gap="2">
                            <Switch {color} disabled />
                            <Switch {color} disabled checked />
                        </Flexbox>
                    </td>
                </tr>
            {/each}
        </Table>
    </Section>
</Details>
