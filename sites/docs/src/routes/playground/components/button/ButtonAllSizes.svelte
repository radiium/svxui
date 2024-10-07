<script lang="ts">
    import { Button, Sizes1To4, Variants } from 'sveltr';
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
        {#each Sizes1To4 as size}
            <tr>
                <td> {size}</td>
                {#each Variants as variant}
                    <td>
                        <Button color="primary" {size} {variant}>Button</Button>
                    </td>
                {/each}
            </tr>
        {/each}
    </tbody>
</table>
