<script lang="ts">
    import Playground from '$lib/components/playground/Playground.svelte';
    import { Button, Flexbox, InputGroup, Sizes1To3 } from 'svxui';

    const sizes = Sizes1To3;
</script>

<Playground class="mb-5">
    <Flexbox slot="component" direction="column" gap="3">
        {#each sizes as size}
            <InputGroup>
                <Button variant="soft" color="primary" {size} active>one</Button>
                <Button variant="soft" color="primary" {size}>two</Button>
                <Button variant="soft" color="primary" {size}>three</Button>
            </InputGroup>
        {/each}
    </Flexbox>
</Playground>
