<script lang="ts">
    import { Colors, Flexbox, Separator, Sizes1To4, Text } from '$lib/index.js';
    import Details from './Details.svelte';
    import Section from './Section.svelte';
    import Table from './Table.svelte';

    const colors = Colors;
    const sizes = Sizes1To4;
</script>

<Details>
    {#snippet title()}
        <h2>Separator</h2>
    {/snippet}

    <Section>
        {#snippet title()}
            <h3>Example</h3>
        {/snippet}

        <Text>
            <Flexbox direction="column" gap="3" class="width-max">
                The quick brown fox jumps
                <Separator size="4" />
                <Flexbox gap="3" align="center">
                    over
                    <Separator size="2" orientation="vertical" />
                    the
                    <Separator size="2" orientation="vertical" />
                    lazy
                    <Separator size="2" orientation="vertical" />
                    dog
                </Flexbox>
            </Flexbox>
        </Text>
    </Section>

    <Section>
        {#snippet title()}
            <h3>Size</h3>
        {/snippet}

        <Table>
            {#snippet head()}
                <th></th>
                <th>horizontal</th>
                <th>vertical</th>
            {/snippet}

            {#each sizes as size}
                <tr>
                    <td>size {size}</td>
                    <td class="width-200px;">
                        <Flexbox>
                            <Separator {size} />
                        </Flexbox>
                    </td>

                    <td class="width-200px;">
                        <Flexbox style={size === '4' ? 'height: 200px;' : ''}>
                            <Separator orientation="vertical" {size} />
                        </Flexbox>
                    </td>
                </tr>
            {/each}
        </Table>
    </Section>

    <Section>
        {#snippet title()}
            <h3>Color</h3>
        {/snippet}

        <Table>
            {#snippet head()}
                <th></th>
                <th>horizontal</th>
                <th>vertical</th>
            {/snippet}

            {#each colors as color}
                <tr>
                    <td>{color}</td>
                    <td class="width-200px;">
                        <Flexbox>
                            <Separator {color} />
                        </Flexbox>
                    </td>

                    <td class="width-200px;">
                        <Flexbox>
                            <Separator orientation="vertical" {color} />
                        </Flexbox>
                    </td>
                </tr>
            {/each}
        </Table>
    </Section>
</Details>
