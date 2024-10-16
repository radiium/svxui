<script lang="ts">
    import { Button, Variants } from 'svxui';
</script>

<table>
    <thead>
        <tr>
            <td></td>
            <td>Default</td>
            <td>Disabled</td>
        </tr>
    </thead>
    <tbody>
        {#each Variants as variant}
            <tr>
                <td> {variant}</td>
                <td>
                    <Button color="primary" {variant}>Button</Button>
                </td>

                <td>
                    <Button color="primary" {variant} disabled>Button</Button>
                </td>
            </tr>
        {/each}
    </tbody>
</table>
