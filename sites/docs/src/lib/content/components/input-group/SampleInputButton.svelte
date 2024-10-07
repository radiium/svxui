<script lang="ts">
    import Playground from '$lib/components/playground/Playground.svelte';
    import { Button, Flexbox, Input, InputGroup } from 'svxui';
</script>

<Playground class="mb-5">
    <Flexbox slot="component" direction="column" gap="3">
        <InputGroup>
            <Button variant="soft">button</Button>
            <Input />
        </InputGroup>

        <InputGroup>
            <Input />
            <Button variant="soft">button</Button>
        </InputGroup>

        <InputGroup>
            <Button variant="soft">button</Button>
            <Input />
            <Button variant="soft">button</Button>
        </InputGroup>

        <InputGroup>
            <Input />
            <Button variant="soft">button</Button>
            <Input />
        </InputGroup>

        <InputGroup>
            <Button variant="soft">button</Button>
            <Button variant="soft">button</Button>
            <Input />
        </InputGroup>
    </Flexbox>
</Playground>
