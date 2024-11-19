<script lang="ts">
    import {
        Colors,
        Flexbox,
        InputNumber,
        Sizes1To3,
        VariantOutline,
        VariantSoft,
        VariantSolid
    } from '$lib/index.js';
    import Details from './Details.svelte';
    import Section from './Section.svelte';
    import Table from './Table.svelte';

    const sizes = Sizes1To3;
    const variants = [VariantSolid, VariantSoft, VariantOutline];
    const colors = Colors;
</script>

<Details>
    {#snippet title()}
        <h2>InputNumber</h2>
    {/snippet}

    <Section>
        {#snippet title()}
            <h3>Colors</h3>
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
                                <InputNumber value={0} {color} {variant} />
                            </Flexbox>
                        </td>
                    {/each}
                </tr>
            {/each}
        </Table>
    </Section>

    <Section>
        {#snippet title()}
            <h3>sizes</h3>
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
                                <InputNumber value={0} {variant} {size} />
                            </Flexbox>
                        </td>
                    {/each}
                </tr>
            {/each}
        </Table>
    </Section>

    <Section>
        {#snippet title()}
            <h3>Alignement</h3>
        {/snippet}

        <Table>
            {#snippet head()}
                <th>start</th>
                <th>center</th>
                <th>end</th>
            {/snippet}

            <tr>
                <td>
                    <Flexbox>
                        <InputNumber align="start" value={0} step={0.1} />
                    </Flexbox>
                </td>
                <td>
                    <Flexbox>
                        <InputNumber align="center" value={0} step={0.1} />
                    </Flexbox>
                </td>
                <td>
                    <Flexbox>
                        <InputNumber align="end" value={0} step={0.1} />
                    </Flexbox>
                </td>
            </tr>
        </Table>
    </Section>

    <Section>
        {#snippet title()}
            <h3>Full Width</h3>
        {/snippet}

        <InputNumber value={0} fullWidth />
    </Section>
</Details>
