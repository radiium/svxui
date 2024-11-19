<script lang="ts">
    import {
        Colors,
        Flexbox,
        Sizes1To9,
        Text,
        TextTagH1,
        TextTagH2,
        TextTagH3,
        TextTagH4,
        TextTagH5,
        TextTagH6,
        Weights
    } from '$lib/index.js';
    import Details from './Details.svelte';
    import Section from './Section.svelte';
    import Table from './Table.svelte';

    const sizes = Sizes1To9;
    const colors = Colors;
    const weights = Weights;
    const headings = [TextTagH1, TextTagH2, TextTagH3, TextTagH4, TextTagH5, TextTagH6];
</script>

<Details>
    {#snippet title()}
        <h2>Text</h2>
    {/snippet}

    <Section>
        {#snippet title()}
            <h3>Size</h3>
        {/snippet}

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
        {#snippet title()}
            <h3>Weight</h3>
        {/snippet}

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
        {#snippet title()}
            <h3>Colors</h3>
        {/snippet}

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

    <Section>
        {#snippet title()}
            <h3>Heading</h3>
        {/snippet}

        <Table>
            {#each headings as tag}
                <tr>
                    <td>{tag}</td>
                    <td>
                        <Flexbox>
                            <Text as={tag}>The quick brown fox jumps over the lazy dog</Text>
                        </Flexbox>
                    </td>
                </tr>
            {/each}
        </Table>
    </Section>
</Details>
