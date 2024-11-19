<script lang="ts">
    import { Colors, Flexbox, Link, Sizes1To9, Weights } from '$lib/index.js';
    import Details from './Details.svelte';
    import Section from './Section.svelte';
    import Table from './Table.svelte';

    const sizes = Sizes1To9;
    const colors = Colors;
    const weights = Weights;
</script>

<Details>
    {#snippet title()}
        <h2>Link</h2>
    {/snippet}

    <Section>
        {#snippet title()}
            <h3>Size</h3>
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
                            <Link {size} href="/#" target="_self">This is a link</Link>
                        </Flexbox>
                    </td>
                    <td>
                        <Flexbox>
                            <Link {size} disabled href="/#" target="_self">This is a link</Link>
                        </Flexbox>
                    </td>
                </tr>
            {/each}
        </Table>
    </Section>

    <Section>
        {#snippet title()}
            <h3>Weight</h3>
        {/snippet}

        <Table>
            {#snippet head()}
                <th></th>
                <th>default</th>
                <th>disabled</th>
            {/snippet}
            {#each weights as weight}
                <tr>
                    <td>{weight}</td>
                    <td>
                        <Flexbox>
                            <Link {weight} href="/#" target="_self">This is a link</Link>
                        </Flexbox>
                    </td>

                    <td>
                        <Flexbox>
                            <Link {weight} disabled href="/#" target="_self">This is a link</Link>
                        </Flexbox>
                    </td>
                </tr>
            {/each}
        </Table>
    </Section>

    <Section>
        {#snippet title()}
            <h3>Colors</h3>
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
                            <Link {color} href="/#" target="_self">This is a link</Link>
                        </Flexbox>
                    </td>

                    <td>
                        <Flexbox>
                            <Link {color} disabled href="/#" target="_self">This is a link</Link>
                        </Flexbox>
                    </td>
                </tr>
            {/each}
        </Table>
    </Section>
</Details>
