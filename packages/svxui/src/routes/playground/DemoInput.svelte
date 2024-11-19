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
    {#snippet title()}
        <h2>Input</h2>
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
                        <Flexbox as="form">
                            <Input {size} placeholder="placeholder..." />
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
            {#each colors as color}
                <tr>
                    <td>{color}</td>
                    <td>
                        <Flexbox as="form">
                            <Input {color} placeholder="placeholder..." />
                        </Flexbox>
                    </td>
                </tr>
            {/each}
        </Table>
    </Section>

    <Section>
        {#snippet title()}
            <h3>Type</h3>
        {/snippet}

        <Table>
            {#snippet head()}
                <th></th>
                <th>default</th>
                <th>disabled</th>
            {/snippet}

            {#each types as type}
                <tr>
                    <td>{type}</td>
                    <td>
                        <Flexbox as="form">
                            <Input {type} placeholder="placeholder..." />
                        </Flexbox>
                    </td>
                    <td>
                        <Flexbox as="form">
                            <Input disabled {type} placeholder="placeholder..." />
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

        <Input fullWidth placeholder="placeholder..." />
    </Section>

    <Section>
        {#snippet title()}
            <h3>Alignement</h3>
        {/snippet}

        <Table>
            {#snippet head()}
                <th>start</th>
                <th>center</th>
                <th>end</th>
            {/snippet}

            <tr>
                <td>
                    <Flexbox as="form">
                        <Input align="start" value="hello world" placeholder="placeholder..." />
                    </Flexbox>
                </td>
                <td>
                    <Flexbox as="form">
                        <Input align="center" value="hello world" placeholder="placeholder..." />
                    </Flexbox>
                </td>
                <td>
                    <Flexbox as="form">
                        <Input align="end" value="hello world" placeholder="placeholder..." />
                    </Flexbox>
                </td>
            </tr>
        </Table>
    </Section>
</Details>
