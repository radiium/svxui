<script lang="ts">
    import MagnifyingGlass from '$lib/icons/MagnifyingGlass.svelte';
    import { Aligns, Button, Colors, Flexbox, Sizes1To4, Transforms, Variants } from '$lib/index.js';
    import Details from './Details.svelte';
    import Section from './Section.svelte';
    import Table from './Table.svelte';

    const sizes = Sizes1To4;
    const variants = Variants;
    const colors = Colors;
    const aligns = Aligns;
    const transforms = Transforms;
</script>

<Details>
    {#snippet title()}
        <h2>Button</h2>
    {/snippet}

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
                                <Button {color} {variant}>button</Button>
                            </Flexbox>
                        </td>
                    {/each}
                </tr>
            {/each}
        </Table>
    </Section>

    <Section>
        {#snippet title()}
            <h3>Color + Icon</h3>
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
                                <Button {size} {variant}>button</Button>
                            </Flexbox>
                        </td>
                    {/each}
                </tr>
            {/each}
        </Table>
    </Section>

    <Section>
        {#snippet title()}
            <h3>Size + icon</h3>
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
        {#snippet title()}
            <h3>State</h3>
        {/snippet}

        <Table>
            {#snippet head()}
                <th></th>
                {#each variants as variant}
                    <th>{variant}</th>
                {/each}
            {/snippet}

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
        {#snippet title()}
            <h3>Full width</h3>
        {/snippet}

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
        {#snippet title()}
            <h3>Alignment</h3>
        {/snippet}

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
        {#snippet title()}
            <h3>Transform</h3>
        {/snippet}

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
