<script lang="ts">
    import Text from '$lib/components/Text/Text.svelte';
    import { Colors, Flexbox, Sizes1To3, Switch } from '$lib/index.js';
    import Details from './Details.svelte';
    import Section from './Section.svelte';
    import Table from './Table.svelte';

    const sizes = Sizes1To3;
    const colors = Colors;
</script>

<Details>
    <h2 slot="title">Switch</h2>

    <Section>
        <h3 slot="title">With label</h3>

        <Flexbox as="label" align="center" gap="3">
            <Switch />
            <Text>switch label</Text>
        </Flexbox>
    </Section>

    <Section>
        <h3 slot="title">Size</h3>

        <Table>
            <svelte:fragment slot="head">
                <th></th>
                <th>default</th>
                <th>disabled</th>
            </svelte:fragment>

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
        <h3 slot="title">Colors</h3>

        <Table>
            <svelte:fragment slot="head">
                <th></th>
                <th>default</th>
                <th>disabled</th>
            </svelte:fragment>

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
