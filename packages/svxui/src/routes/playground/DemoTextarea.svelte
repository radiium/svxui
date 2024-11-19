<script lang="ts">
    import { Colors, Flexbox, Sizes1To3, Textarea } from '$lib/index.js';
    import Details from './Details.svelte';
    import Section from './Section.svelte';
    import Table from './Table.svelte';

    const sizes = Sizes1To3;
    const colors = Colors;
</script>

<Details>
    {#snippet title()}
        <h2>Textarea</h2>
    {/snippet}

    <Section>
        {#snippet title()}
            <h3>Size</h3>
        {/snippet}

        <Table>
            {#each sizes as size}
                <tr>
                    <td>size {size}</td>
                    <td>
                        <Flexbox>
                            <Textarea {size} placeholder="placeholder..." />
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
                            <Textarea {color} placeholder="placeholder..." />
                        </Flexbox>
                    </td>

                    <td>
                        <Flexbox>
                            <Textarea {color} placeholder="placeholder..." disabled />
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

        <Textarea rows={6} placeholder="placeholder..." fullWidth />
    </Section>
</Details>
