<script lang="ts">
    import { Colors, Flexbox, Sizes1To3, Textarea } from '$lib/index.js';
    import Details from './Details.svelte';
    import Section from './Section.svelte';
    import Table from './Table.svelte';

    const sizes = Sizes1To3;
    const colors = Colors;
</script>

<Details>
    <h2 slot="title">Textarea</h2>

    <Section>
        <h3 slot="title">Size</h3>

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
        <h3 slot="title">Color</h3>

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
        <h3 slot="title">Full Width</h3>

        <Textarea rows={6} placeholder="placeholder..." fullWidth />
    </Section>
</Details>
