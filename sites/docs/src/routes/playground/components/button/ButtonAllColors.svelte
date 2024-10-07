<script lang="ts">
    import { Button, Colors, Sizes1To4, Variants } from 'sveltr';
</script>

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
                <td>{color} </td>
                <td></td>
                <td></td>
                <td></td>
            </tr>

            {#each Sizes1To4 as size}
                <tr>
                    <td>Size {size}</td>
                    {#each Variants as variant}
                        <td>
                            <Button {color} {size} {variant}>Button</Button>
                        </td>
                    {/each}
                </tr>
            {/each}
        {/each}
    </tbody>
</table>
