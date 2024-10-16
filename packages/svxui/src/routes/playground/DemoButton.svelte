<script lang="ts">
    import MagnifyingGlass from '$lib/icons/MagnifyingGlass.svelte';
    import { Aligns, Button, Colors, Flexbox, Sizes1To4, Transforms, Variants } from '$lib/index.js';
    import Section from './Section.svelte';
    import Details from './Details.svelte';
    import Table from './Table.svelte';

    const sizes = Sizes1To4;
    const variants = Variants;
    const colors = Colors;
    const aligns = Aligns;
    const transforms = Transforms;
</script>

<Details>
    <h2 slot="title">Button</h2>

    <Section>
        <h3 slot="title">Color</h3>

        <Table>
            <svelte:fragment slot="head">
                <th></th>
                {#each variants as variant}
                    <th>{variant}</th>
                {/each}
            </svelte:fragment>

            {#each colors as color}
                <tr>
                    <td>{color}</td>
                    {#each variants as variant}
                        <td>
                            <Flexbox>
                                <Button {color} {variant}>button</Button>
                            </Flexbox>
                        </td>
                    {/each}
                </tr>
            {/each}
        </Table>
    </Section>

    <Section>
        <h3 slot="title">Color + Icon</h3>

        <Table>
            <svelte:fragment slot="head">
                <th></th>
                {#each variants as variant}
                    <th>{variant}</th>
                {/each}
            </svelte:fragment>

            {#each colors as color}
                <tr>
                    <td>{color}</td>
                    {#each variants as variant}
                        <td>
                            <Flexbox gap="2">
                                <Button {color} {variant} iconOnly>
                                    <MagnifyingGlass />
                                </Button>
                            </Flexbox>
                        </td>
                    {/each}
                </tr>
            {/each}
        </Table>
    </Section>

    <Section>
        <h3 slot="title">Size</h3>

        <Table>
            <svelte:fragment slot="head">
                <th></th>
                {#each variants as variant}
                    <th>{variant}</th>
                {/each}
            </svelte:fragment>

            {#each sizes as size}
                <tr>
                    <td>size {size}</td>
                    {#each variants as variant}
                        <td>
                            <Flexbox>
                                <Button {size} {variant}>button</Button>
                            </Flexbox>
                        </td>
                    {/each}
                </tr>
            {/each}
        </Table>
    </Section>

    <Section>
        <h3 slot="title">Size + icon</h3>

        <Table>
            <svelte:fragment slot="head">
                <th></th>
                {#each variants as variant}
                    <th>{variant}</th>
                {/each}
            </svelte:fragment>

            {#each sizes as size}
                <tr>
                    <td>size {size}</td>
                    {#each variants as variant}
                        <td>
                            <Flexbox gap="2">
                                <Button {size} {variant} iconOnly>
                                    <MagnifyingGlass />
                                </Button>
                            </Flexbox>
                        </td>
                    {/each}
                </tr>
            {/each}
        </Table>
    </Section>

    <Section>
        <h3 slot="title">State</h3>

        <Table>
            <svelte:fragment slot="head">
                <th></th>
                {#each variants as variant}
                    <th>{variant}</th>
                {/each}
            </svelte:fragment>

            <tr>
                <td>normal</td>
                {#each variants as variant}
                    <td>
                        <Flexbox gap="2">
                            <Button {variant}>button</Button>
                        </Flexbox>
                    </td>
                {/each}
            </tr>
            <tr>
                <td>disabled</td>
                {#each variants as variant}
                    <td>
                        <Flexbox gap="2">
                            <Button disabled {variant}>button</Button>
                        </Flexbox>
                    </td>
                {/each}
            </tr>

            <tr>
                <td>icon normal</td>
                {#each variants as variant}
                    <td>
                        <Flexbox gap="2">
                            <Button {variant} iconOnly>
                                <MagnifyingGlass />
                            </Button>
                        </Flexbox>
                    </td>
                {/each}
            </tr>

            <tr>
                <td>icon disabled</td>
                {#each variants as variant}
                    <td>
                        <Flexbox gap="2">
                            <Button disabled {variant} iconOnly>
                                <MagnifyingGlass />
                            </Button>
                        </Flexbox>
                    </td>
                {/each}
            </tr>
        </Table>
    </Section>

    <Section>
        <h3 slot="title">Full width</h3>

        <Table>
            {#each variants as variant}
                <tr>
                    <td>{variant}</td>
                    <td class="width-200px">
                        <Flexbox gap="2">
                            <Button {variant} fullWidth>button</Button>
                        </Flexbox>
                    </td>
                </tr>
            {/each}
        </Table>
    </Section>

    <Section>
        <h3 slot="title">Alignment</h3>

        <Table>
            {#each aligns as align}
                <tr>
                    <td>{align}</td>
                    <td class="width-200px">
                        <Flexbox gap="2">
                            <Button variant="soft" {align} fullWidth>
                                <MagnifyingGlass />
                                button
                            </Button>
                        </Flexbox>
                    </td>
                </tr>
            {/each}
        </Table>
    </Section>

    <Section>
        <h3 slot="title">Transform</h3>

        <Table>
            <tr>
                <td>default</td>
                <td class="width-200px">
                    <Flexbox gap="2">
                        <Button variant="soft" fullWidth>Sign in</Button>
                    </Flexbox>
                </td>
            </tr>
            {#each transforms as transform}
                <tr>
                    <td>{transform}</td>
                    <td class="width-200px">
                        <Flexbox gap="2">
                            <Button variant="soft" {transform} fullWidth>Sign in</Button>
                        </Flexbox>
                    </td>
                </tr>
            {/each}
        </Table>
    </Section>
</Details>
