<script lang="ts">
    import PlaygroundWrapper from '$lib/components/playground/PlaygroundWrapper.svelte';
    import { Button, Flexbox, InputGroup, Sizes1To3 } from 'svxui';

    const sizes = Sizes1To3;
</script>

<PlaygroundWrapper class="mb-5">
    <Flexbox slot="component" direction="column" gap="3">
        {#each sizes as size}
            <InputGroup>
                <Button variant="soft" color="primary" {size} active>one</Button>
                <Button variant="soft" color="primary" {size}>two</Button>
                <Button variant="soft" color="primary" {size}>three</Button>
            </InputGroup>
        {/each}
    </Flexbox>
</PlaygroundWrapper>
