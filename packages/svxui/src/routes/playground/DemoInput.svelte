<script lang="ts">
    import { Colors, Flexbox, Input, InputTypes, Sizes1To3 } from '$lib/index.js';
    import Details from './Details.svelte';
    import Section from './Section.svelte';
    import Table from './Table.svelte';

    const sizes = Sizes1To3;
    const colors = Colors;
    const types = InputTypes;
</script>

<Details>
    <h2 slot="title">Input</h2>

    <Section>
        <h3 slot="title">Size</h3>

        <Table>
            {#each sizes as size}
                <tr>
                    <td>size {size}</td>
                    <td>
                        <Flexbox>
                            <Input {size} placeholder="placeholder..." />
                        </Flexbox>
                    </td>
                </tr>
            {/each}
        </Table>
    </Section>

    <Section>
        <h3 slot="title">Color</h3>

        <Table>
            {#each colors as color}
                <tr>
                    <td>{color}</td>
                    <td>
                        <Flexbox>
                            <Input {color} placeholder="placeholder..." />
                        </Flexbox>
                    </td>
                </tr>
            {/each}
        </Table>
    </Section>

    <Section>
        <h3 slot="title">Type</h3>

        <Table>
            <svelte:fragment slot="head">
                <th></th>
                <th>default</th>
                <th>disabled</th>
            </svelte:fragment>

            {#each types as type}
                <tr>
                    <td>{type}</td>
                    <td>
                        <Flexbox>
                            <Input {type} placeholder="placeholder..." />
                        </Flexbox>
                    </td>
                    <td>
                        <Flexbox>
                            <Input disabled {type} placeholder="placeholder..." />
                        </Flexbox>
                    </td>
                </tr>
            {/each}
        </Table>
    </Section>

    <Section>
        <h3 slot="title">Full Width</h3>

        <Input fullWidth placeholder="placeholder..." />
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
                        <Input align="start" value="hello world" placeholder="placeholder..." />
                    </Flexbox>
                </td>
                <td>
                    <Flexbox>
                        <Input align="center" value="hello world" placeholder="placeholder..." />
                    </Flexbox>
                </td>
                <td>
                    <Flexbox>
                        <Input align="end" value="hello world" placeholder="placeholder..." />
                    </Flexbox>
                </td>
            </tr>
        </Table>
    </Section>
</Details>
