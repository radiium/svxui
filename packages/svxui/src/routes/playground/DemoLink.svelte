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
    <h2 slot="title">Link</h2>

    <Section>
        <h3 slot="title">Size</h3>

        <Table>
            <svelte:fragment slot="head">
                <th></th>
                <th>default</th>
                <th>disabled</th>
            </svelte:fragment>

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
        <h3 slot="title">Weight</h3>

        <Table>
            <svelte:fragment slot="head">
                <th></th>
                <th>default</th>
                <th>disabled</th>
            </svelte:fragment>
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
        <h3 slot="title">Colors</h3>

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
