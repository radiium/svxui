<script lang="ts">
    import { Colors, Flexbox, Sizes1To9, Text, Weights } from '$lib/index.js';
    import Section from './Section.svelte';
    import Details from './Details.svelte';
    import Table from './Table.svelte';

    const sizes = Sizes1To9;
    const colors = Colors;
    const weights = Weights;
</script>

<Details>
    <h2 slot="title">Text</h2>

    <Section>
        <h3 slot="title">Size</h3>

        <Table>
            {#each sizes as size}
                <tr>
                    <td>size {size}</td>
                    <td>
                        <Flexbox>
                            <Text {size}>The quick brown fox jumps over the lazy dog</Text>
                        </Flexbox>
                    </td>
                </tr>
            {/each}
        </Table>
    </Section>

    <Section>
        <h3 slot="title">Weight</h3>

        <Table>
            {#each weights as weight}
                <tr>
                    <td>{weight}</td>
                    <td>
                        <Flexbox>
                            <Text {weight}>The quick brown fox jumps over the lazy dog</Text>
                        </Flexbox>
                    </td>
                </tr>
            {/each}
        </Table>
    </Section>

    <Section>
        <h3 slot="title">Colors</h3>

        <Table>
            {#each colors as color}
                <tr>
                    <td>{color}</td>
                    <td>
                        <Flexbox>
                            <Text {color}>The quick brown fox jumps over the lazy dog</Text>
                        </Flexbox>
                    </td>
                </tr>
            {/each}
        </Table>
    </Section>
</Details>
