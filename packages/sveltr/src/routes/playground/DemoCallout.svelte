<script lang="ts">
    import Info from '$lib/icons/Info.svelte';
    import { Callout, Colors, Flexbox, Sizes1To3, VariantsCallout } from '$lib/index.js';
    import Section from './Section.svelte';
    import Details from './Details.svelte';
    import Table from './Table.svelte';

    const sizes = Sizes1To3;
    const variants = VariantsCallout;
    const colors = Colors;
</script>

<Details>
    <h2 slot="title">Callout</h2>

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
                            <Flexbox class="max-width-300px">
                                <Callout {color} {variant}>
                                    The quick brown fox jumps over the lazy dog
                                </Callout>
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
                            <Flexbox class="max-width-300px">
                                <Callout {size} {variant}>
                                    <Info slot="icon" />
                                    The quick brown fox jumps over the lazy dog
                                </Callout>
                            </Flexbox>
                        </td>
                    {/each}
                </tr>
            {/each}
        </Table>
    </Section>
</Details>
