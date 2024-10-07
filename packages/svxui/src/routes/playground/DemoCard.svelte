<script lang="ts">
    import { Card, Colors, Flexbox, Sizes0To5, VariantsCard } from '$lib/index.js';
    import Details from './Details.svelte';
    import Section from './Section.svelte';
    import Table from './Table.svelte';

    const colors = Colors;
    const sizes = Sizes0To5;
    const variants = VariantsCard;
</script>

<Details>
    <h2 slot="title">Card</h2>

    <Section>
        <h3 slot="title">Color</h3>

        <Table>
            <svelte:fragment slot="head">
                <th></th>
                {#each variants as variant}
                    <th>{variant}</th>
                {/each}
            </svelte:fragment>

            {#each colors as color}
                <tr>
                    <td>{color}</td>
                    {#each variants as variant}
                        <td>
                            <Flexbox>
                                <Card {color} {variant}>Card content</Card>
                            </Flexbox>
                        </td>
                    {/each}
                </tr>
            {/each}
        </Table>
    </Section>

    <Section>
        <h3 slot="title">Color + translucent</h3>

        <Table>
            <svelte:fragment slot="head">
                <th></th>
                {#each variants as variant}
                    <th>{variant}</th>
                {/each}
            </svelte:fragment>

            {#each colors as color}
                <tr>
                    <td>{color}</td>
                    {#each variants as variant}
                        <td>
                            <Flexbox>
                                <Card {color} {variant} translucent>Card content</Card>
                            </Flexbox>
                        </td>
                    {/each}
                </tr>
            {/each}
        </Table>
    </Section>

    <Section>
        <h3 slot="title">Size</h3>

        <Table>
            <svelte:fragment slot="head">
                <th></th>
                {#each variants as variant}
                    <th>{variant}</th>
                {/each}
            </svelte:fragment>
            {#each sizes as size}
                <tr>
                    <td>size {size}</td>
                    {#each variants as variant}
                        <td>
                            <Flexbox>
                                <Card {size} {variant}>Card content</Card>
                            </Flexbox>
                        </td>
                    {/each}
                </tr>
            {/each}
        </Table>
    </Section>
</Details>
