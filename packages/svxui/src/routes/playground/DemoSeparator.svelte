<script lang="ts">
    import Text from '$lib/components/Text/Text.svelte';
    import { Colors, Flexbox, Separator, Sizes1To4 } from '$lib/index.js';
    import Details from './Details.svelte';
    import Section from './Section.svelte';
    import Table from './Table.svelte';

    const colors = Colors;
    const sizes = Sizes1To4;
</script>

<Details>
    <h2 slot="title">Separator</h2>

    <Section>
        <h3 slot="title">Example</h3>

        <Text>
            <Flexbox direction="column" gap="3" class="width-max">
                The quick brown fox jumps
                <Separator size="4" />
                <Flexbox gap="3">
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
        <h3 slot="title">Size</h3>

        <Table>
            <svelte:fragment slot="head">
                <th></th>
                <th>horizontal</th>
                <th>vertical</th>
            </svelte:fragment>

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
        <h3 slot="title">Color</h3>

        <Table>
            <svelte:fragment slot="head">
                <th></th>
                <th>horizontal</th>
                <th>vertical</th>
            </svelte:fragment>

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
