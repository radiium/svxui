<script lang="ts">
    import { Colors, Flexbox, InputRange, Sizes1To3 } from '$lib/index.js';
    import Details from './Details.svelte';
    import Section from './Section.svelte';
    import Table from './Table.svelte';

    const sizes = Sizes1To3;
    const colors = Colors;
</script>

<Details>
    {#snippet title()}
        <h2>InputRange</h2>
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
                            <InputRange {size} />
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
                            <InputRange {color} />
                        </Flexbox>
                    </td>

                    <td>
                        <Flexbox>
                            <InputRange {color} disabled />
                        </Flexbox>
                    </td>
                </tr>
            {/each}
        </Table>
    </Section>

    <Section>
        {#snippet title()}
            <h3>Full Width</h3>
        {/snippet}

        <Table>
            <tr>
                <td class="width-300px;">
                    <Flexbox>
                        <InputRange fullWidth />
                    </Flexbox>
                </td>
            </tr>
        </Table>
    </Section>
</Details>
