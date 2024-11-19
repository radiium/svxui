<script lang="ts">
    import { Colors, Flexbox, Radio, Sizes1To3, Text } from '$lib/index.js';
    import Details from './Details.svelte';
    import Section from './Section.svelte';
    import Table from './Table.svelte';

    const sizes = Sizes1To3;
    const colors = Colors;

    let group = $state('val1');
    const groupSize = $state(['val2', 'val2', 'val2']);
    const groupSizeDisabled = $state(['val2', 'val2', 'val2']);
    const groupColor = $state(['val2', 'val2', 'val2', 'val2', 'val2', 'val2', 'val2']);
    const groupColorDisabled = $state(['val2', 'val2', 'val2', 'val2', 'val2', 'val2', 'val2']);
</script>

<Details>
    {#snippet title()}
        <h2>Radio</h2>
    {/snippet}

    <Section>
        {#snippet title()}
            <h3>With label</h3>
        {/snippet}

        <Flexbox direction="column" gap="2">
            <Flexbox as="label" align="center" gap="3">
                <Radio bind:group name="group" value="val1" />
                <Text>radio label 1</Text>
            </Flexbox>

            <Flexbox as="label" align="center" gap="3">
                <Radio bind:group name="group" value="val2" />
                <Text>radio label 2</Text>
            </Flexbox>
        </Flexbox>
    </Section>

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

            {#each sizes as size, i}
                <tr>
                    <td>size {size}</td>
                    <td>
                        <Flexbox gap="2">
                            {@const name = 'size-enabled-' + i}
                            <Radio {size} {name} value="val1" bind:group={groupSize[i]} />
                            <Radio {size} {name} value="val2" bind:group={groupSize[i]} />
                        </Flexbox>
                    </td>

                    <td>
                        <Flexbox gap="2">
                            {@const name = 'size-disabled-' + i}
                            <Radio disabled {size} {name} value="val1" bind:group={groupSizeDisabled[i]} />
                            <Radio disabled {size} {name} value="val2" bind:group={groupSizeDisabled[i]} />
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
            {#each colors as color, i}
                <tr>
                    <td>{color}</td>
                    <td>
                        <Flexbox gap="2">
                            {@const name = 'color-enabled-' + i}
                            <Radio {color} {name} value="val1" bind:group={groupColor[i]} />
                            <Radio {color} {name} value="val2" bind:group={groupColor[i]} />
                        </Flexbox>
                    </td>
                    <td>
                        <Flexbox gap="2">
                            {@const name = 'color-disabled-' + i}
                            <Radio disabled {color} {name} value="val1" bind:group={groupColorDisabled[i]} />
                            <Radio disabled {color} {name} value="val2" bind:group={groupColorDisabled[i]} />
                        </Flexbox>
                    </td>
                </tr>
            {/each}
        </Table>
    </Section>
</Details>
