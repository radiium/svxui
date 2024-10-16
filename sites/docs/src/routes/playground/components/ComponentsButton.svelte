<script lang="ts">
    import { Button, Colors, Sizes1To4, Variants } from 'svxui';
</script>

<section>
    <h2>Button</h2>

    <h3>All colors</h3>
    <table>
        <thead>
            <tr>
                <td></td>
                {#each Variants as variant}
                    <td>{variant}</td>
                {/each}
            </tr>
        </thead>
        <tbody>
            {#each Colors as color}
                <tr>
                    <td> {color}</td>
                    {#each Variants as variant}
                        <td>
                            <Button {color} {variant}>Button</Button>
                        </td>
                    {/each}
                </tr>
            {/each}
        </tbody>
    </table>
    <h3>All sizes</h3>
    <table>
        <thead>
            <tr>
                <td></td>
                {#each Variants as variant}
                    <td>{variant}</td>
                {/each}
            </tr>
        </thead>
        <tbody>
            {#each Sizes1To4 as size}
                <tr>
                    <td> {size}</td>
                    {#each Variants as variant}
                        <td>
                            <Button {size} {variant}>Button</Button>
                        </td>
                    {/each}
                </tr>
            {/each}
        </tbody>
    </table>
</section>

<!-- <Cartesian
    props={buildCartesianProps(buttonSchema, ['size', 'color'])}
    labels
    asChild
    unstyled
    divAttributes={{ class: 'cartesian-wrapper' }}
    let:innerProps
>
    <Button {...innerProps}>
        {#if innerProps.iconOnly}
            <MagnifyingGlass />
        {:else}
            Button
        {/if}
    </Button>
</Cartesian> -->

<style lang="ts">
    :global(.cartesian-wrapper) {
        display: flex;
        flex-direction: row;
    }
</style>
