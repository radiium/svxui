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
    {#snippet title()}
        <h2>Card</h2>
    {/snippet}

    <Section>
        {#snippet title()}
            <h3>Color</h3>
        {/snippet}

        <Table>
            {#snippet head()}
                <th></th>
                {#each variants as variant}
                    <th>{variant}</th>
                {/each}
            {/snippet}

            {#each colors as color}
                <tr>
                    <td>{color}</td>
                    {#each variants as variant}
                        <td>
                            <Flexbox>
                                <Card {color} {variant}>Card la content</Card>
                            </Flexbox>
                        </td>
                    {/each}
                </tr>
            {/each}
        </Table>
    </Section>

    <Section>
        {#snippet title()}
            <h3>Color + translucent</h3>
        {/snippet}

        <Table>
            {#snippet head()}
                <th></th>
                {#each variants as variant}
                    <th>{variant}</th>
                {/each}
            {/snippet}

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
        {#snippet title()}
            <h3>Size</h3>
        {/snippet}

        <Table>
            {#snippet head()}
                <th></th>
                {#each variants as variant}
                    <th>{variant}</th>
                {/each}
            {/snippet}
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

    <Section>
        {#snippet title()}
            <h3>Full width</h3>
        {/snippet}

        <Table>
            {#each sizes as size}
                <tr>
                    <td>size {size}</td>
                    <td class="width-100">
                        <Flexbox class="width-100">
                            <Card {size} fullWidth>Card content</Card>
                        </Flexbox>
                    </td>
                </tr>
            {/each}
        </Table>
    </Section>
</Details>
