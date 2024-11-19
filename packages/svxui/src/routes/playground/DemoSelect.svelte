<script lang="ts">
    import { Colors, Flexbox, Select, Sizes1To3 } from '$lib/index.js';
    import Details from './Details.svelte';
    import Section from './Section.svelte';
    import Table from './Table.svelte';

    const sizes = Sizes1To3;
    const colors = Colors;
    const options = ['option 1', 'option 2', 'option 3', 'option 4', 'option 5'];
</script>

<Details>
    {#snippet title()}
        <h2>Select</h2>
    {/snippet}

    <Section>
        {#snippet title()}
            <h3>Size (single)</h3>
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
        {#snippet title()}
            <h3>Size (multiple)</h3>
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
        {#snippet title()}
            <h3>Color</h3>
        {/snippet}

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
        {#snippet title()}
            <h3>Color + multiple</h3>
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
        {#snippet title()}
            <h3>Full Width</h3>
        {/snippet}

        <Flexbox class="width-100" direction="column" gap="3">
            <Select {options} fullWidth />
            <Select {options} fullWidth multiple />
        </Flexbox>
    </Section>
</Details>
