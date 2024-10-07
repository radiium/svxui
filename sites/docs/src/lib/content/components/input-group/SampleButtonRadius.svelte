<script lang="ts">
    import Playground from '$lib/components/playground/Playground.svelte';
    import { Button, Flexbox, InputGroup, Radius, Sizes1To3 } from 'sveltr';

    const radiusList = Radius;
</script>

<Playground class="mb-5">
    <Flexbox slot="component" direction="column" gap="3">
        {#each radiusList as radius}
            <InputGroup>
                <Button variant="soft" color="primary" {radius} active>one</Button>
                <Button variant="soft" color="primary" {radius}>two</Button>
                <Button variant="soft" color="primary" {radius}>three</Button>
            </InputGroup>
        {/each}
    </Flexbox>
</Playground>
