<script lang="ts">
    import { Badge, Colors, Flexbox, Sizes1To3, VariantsBadge } from '$lib/index.js';
    import Details from './Details.svelte';
    import Section from './Section.svelte';
    import Table from './Table.svelte';

    const sizes = Sizes1To3;
    const variants = VariantsBadge;
    const colors = Colors;
</script>

<Details>
    {#snippet title()}
        <h2>Badge</h2>
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
                                <Badge {color} {variant}>badge</Badge>
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
                                <Badge color="primary" {size} {variant}>badge</Badge>
                            </Flexbox>
                        </td>
                    {/each}
                </tr>
            {/each}
        </Table>
    </Section>

    <Section>
        {#snippet title()}
            <h3>Disabled</h3>
        {/snippet}

        <Table>
            {#snippet head()}
                <th></th>
                {#each variants as variant}
                    <th>{variant}</th>
                {/each}
            {/snippet}
            <tr>
                <td>normal</td>
                {#each variants as variant}
                    <td>
                        <Flexbox>
                            <Badge {variant}>badge</Badge>
                        </Flexbox>
                    </td>
                {/each}
            </tr>

            <tr>
                <td>disabled</td>
                {#each variants as variant}
                    <td>
                        <Flexbox>
                            <Badge disabled {variant}>badge</Badge>
                        </Flexbox>
                    </td>
                {/each}
            </tr>
        </Table>
    </Section>
</Details>
