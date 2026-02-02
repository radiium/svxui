<script lang="ts">
    import { InputGroup, Button } from 'svxui';

    const options = ['one', 'two', 'three'];
    let selection = $state(options[0]);
</script>

<InputGroup>
    {#each options as item (item)}
        <Button variant={selection === item ? 'solid' : 'soft'} onclick={() => (selection = item)}>
            {item}
        </Button>
    {/each}
</InputGroup>
