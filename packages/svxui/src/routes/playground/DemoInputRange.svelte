<script lang="ts">
    import { Colors, Flexbox, InputRange, Sizes1To3 } from '$lib/index.js';
    import Section from './Section.svelte';
    import Details from './Details.svelte';
    import Table from './Table.svelte';

    const sizes = Sizes1To3;
    const colors = Colors;
</script>

<Details>
    <h2 slot="title">InputRange</h2>

    <Section>
        <h3 slot="title">Size</h3>

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
        <h3 slot="title">Full Width</h3>

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
