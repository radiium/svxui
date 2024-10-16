<script lang="ts">
    import { Colors, Flexbox, Select, Sizes1To3 } from '$lib/index.js';
    import Section from './Section.svelte';
    import Details from './Details.svelte';
    import Table from './Table.svelte';

    const sizes = Sizes1To3;
    const colors = Colors;
    const options = ['option 1', 'option 2', 'option 3', 'option 4', 'option 5'];
</script>

<Details>
    <h2 slot="title">Select</h2>

    <Section>
        <h3 slot="title">Size (single)</h3>

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
                        <Flexbox>
                            <Select {size} {options} />
                        </Flexbox>
                    </td>

                    <td>
                        <Flexbox>
                            <Select {size} {options} disabled />
                        </Flexbox>
                    </td>
                </tr>
            {/each}
        </Table>
    </Section>

    <Section>
        <h3 slot="title">Size (multiple)</h3>

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
                        <Flexbox>
                            <Select {size} {options} multiple />
                        </Flexbox>
                    </td>
                    <td>
                        <Flexbox>
                            <Select {size} {options} multiple disabled />
                        </Flexbox>
                    </td>
                </tr>
            {/each}
        </Table>
    </Section>

    <Section>
        <h3 slot="title">Color</h3>

        <Table>
            {#each colors as color}
                <tr>
                    <td>{color}</td>
                    <td>
                        <Flexbox>
                            <Select {color} {options} />
                        </Flexbox>
                    </td>
                </tr>
            {/each}
        </Table>
    </Section>

    <Section>
        <h3 slot="title">Color + multiple</h3>

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
                        <Flexbox>
                            <Select {color} {options} multiple />
                        </Flexbox>
                    </td>

                    <td>
                        <Flexbox>
                            <Select {color} {options} multiple disabled />
                        </Flexbox>
                    </td>
                </tr>
            {/each}
        </Table>
    </Section>

    <Section>
        <h3 slot="title">Full Width</h3>

        <Flexbox class="width-100" direction="column" gap="3">
            <Select {options} fullWidth />
            <Select {options} fullWidth multiple />
        </Flexbox>
    </Section>
</Details>
