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
    <h2 slot="title">InputNumber</h2>

    <Section>
        <h3 slot="title">Colors</h3>

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
                                <InputNumber value={0} {color} {variant} />
                            </Flexbox>
                        </td>
                    {/each}
                </tr>
            {/each}
        </Table>
    </Section>

    <Section>
        <h3 slot="title">sizes</h3>

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
                                <InputNumber value={0} {variant} {size} />
                            </Flexbox>
                        </td>
                    {/each}
                </tr>
            {/each}
        </Table>
    </Section>

    <Section>
        <h3 slot="title">Alignement</h3>

        <Table>
            <svelte:fragment slot="head">
                <th>start</th>
                <th>center</th>
                <th>end</th>
            </svelte:fragment>

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
        <h3 slot="title">Full Width</h3>

        <InputNumber value={0} fullWidth />
    </Section>
</Details>
