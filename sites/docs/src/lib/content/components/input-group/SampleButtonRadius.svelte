<script lang="ts">
    import PlaygroundWrapper from '$lib/components/playground/PlaygroundWrapper.svelte';
    import { Button, Flexbox, InputGroup, Radius } from 'svxui';

    const radiusList = Radius;
</script>

<PlaygroundWrapper class="mb-5">
    {#snippet component()}
        <Flexbox direction="column" gap="3">
            {#each radiusList as radius}
                <InputGroup>
                    <Button variant="soft" color="primary" {radius} active>one</Button>
                    <Button variant="soft" color="primary" {radius}>two</Button>
                    <Button variant="soft" color="primary" {radius}>three</Button>
                </InputGroup>
            {/each}
        </Flexbox>
    {/snippet}
</PlaygroundWrapper>
