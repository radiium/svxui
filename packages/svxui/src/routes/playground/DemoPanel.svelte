<script lang="ts">
    import { Panel, Colors, Flexbox, Sizes0To5, VariantsCard, Sizes0To9, Text } from '$lib/index.js';
    import Details from './Details.svelte';
    import Section from './Section.svelte';
    import Table from './Table.svelte';

    const colors = Colors;
    const sizes = Sizes0To9;
    const variants = VariantsCard;
</script>

<Details>
    {#snippet title()}
        <h2>Panel</h2>
    {/snippet}

    <Section>
        {#snippet title()}
            <h3>Full example</h3>
        {/snippet}

        <Table>
            {#snippet head()}
                <th></th>
                {#each variants as variant}
                    <th>{variant}</th>
                {/each}
            {/snippet}

            {#each colors as color}
                <tr>
                    <td>{color}</td>
                    {#each variants as variant}
                        <td style="min-width: 240px;">
                            <Flexbox>
                                <Panel size="0" {color} {variant}>
                                    <Flexbox direction="column">
                                        <img src="https://placehold.co/240x140" alt="placeholder" />
                                        <Flexbox direction="column" gap="2" class="p-5">
                                            <Text size="7" as="h3" class="m-0">Panel Title</Text>

                                            <Text as="p">Panel content</Text>
                                        </Flexbox>
                                    </Flexbox>
                                </Panel>
                            </Flexbox>
                        </td>
                    {/each}
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
                {#each variants as variant}
                    <th>{variant}</th>
                {/each}
            {/snippet}

            {#each colors as color}
                <tr>
                    <td>{color}</td>
                    {#each variants as variant}
                        <td>
                            <Flexbox>
                                <Panel {color} {variant}>Panel la content</Panel>
                            </Flexbox>
                        </td>
                    {/each}
                </tr>
            {/each}
        </Table>
    </Section>

    <Section>
        {#snippet title()}
            <h3>Color + translucent</h3>
        {/snippet}

        <Table>
            {#snippet head()}
                <th></th>
                {#each variants as variant}
                    <th>{variant}</th>
                {/each}
            {/snippet}

            {#each colors as color}
                <tr>
                    <td>{color}</td>
                    {#each variants as variant}
                        <td>
                            <Flexbox>
                                <Panel {color} {variant} translucent>Panel content</Panel>
                            </Flexbox>
                        </td>
                    {/each}
                </tr>
            {/each}
        </Table>
    </Section>

    <Section>
        {#snippet title()}
            <h3>Size</h3>
        {/snippet}

        <Table>
            {#snippet head()}
                <th></th>
                {#each variants as variant}
                    <th>{variant}</th>
                {/each}
            {/snippet}
            {#each sizes as size}
                <tr>
                    <td>size {size}</td>
                    {#each variants as variant}
                        <td>
                            <Flexbox>
                                <Panel {size} {variant}>Panel content</Panel>
                            </Flexbox>
                        </td>
                    {/each}
                </tr>
            {/each}
        </Table>
    </Section>

    <Section>
        {#snippet title()}
            <h3>Full width</h3>
        {/snippet}

        <Table>
            {#each sizes as size}
                <tr>
                    <td>size {size}</td>
                    <td class="width-100">
                        <Flexbox class="width-100">
                            <Panel {size} fullWidth>Panel content</Panel>
                        </Flexbox>
                    </td>
                </tr>
            {/each}
        </Table>
    </Section>
</Details>
