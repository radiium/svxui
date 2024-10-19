<script lang="ts">
    import PlaygroundWrapper from '$lib/components/playground/PlaygroundWrapper.svelte';
    import { Button, Flexbox, Input, InputGroup } from 'svxui';
</script>

<PlaygroundWrapper class="mb-5">
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
</PlaygroundWrapper>
