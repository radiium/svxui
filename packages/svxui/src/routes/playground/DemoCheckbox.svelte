<script lang="ts">
    import { Checkbox, Colors, Flexbox, Sizes1To3, Text } from '$lib/index.js';
    import Details from './Details.svelte';
    import Section from './Section.svelte';
    import Table from './Table.svelte';

    const sizes = Sizes1To3;
    const colors = Colors;
</script>

<Details>
    <h2 slot="title">Checkbox</h2>

    <Section>
        <h3 slot="title">With label</h3>

        <Flexbox as="label" align="center" gap="3">
            <Checkbox />
            <Text>checkbox label</Text>
        </Flexbox>

        <Flexbox as="label" align="center" gap="3">
            <Checkbox checked />
            <Text>checkbox label</Text>
        </Flexbox>

        <Flexbox as="label" align="center" gap="3">
            <Checkbox checked indeterminate />
            <Text>checkbox label</Text>
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
                            <Checkbox {size} />
                            <Checkbox {size} checked />
                        </Flexbox>
                    </td>
                    <td>
                        <Flexbox gap="2">
                            <Checkbox {size} disabled />
                            <Checkbox {size} disabled checked />
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
                            <Checkbox {color} />
                            <Checkbox {color} checked />
                        </Flexbox>
                    </td>

                    <td>
                        <Flexbox gap="2">
                            <Checkbox {color} disabled />
                            <Checkbox {color} disabled checked />
                        </Flexbox>
                    </td>
                </tr>
            {/each}
        </Table>
    </Section>
</Details>
