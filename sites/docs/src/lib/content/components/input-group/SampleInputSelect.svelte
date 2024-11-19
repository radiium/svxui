<script lang="ts">
    import PlaygroundWrapper from '$lib/components/playground/PlaygroundWrapper.svelte';
    import { Button, ButtonIcon, Flexbox, Input, InputGroup, Select } from 'svxui';

    const selectOptions = ['opt1', 'opt2', 'opt3'];
</script>

<PlaygroundWrapper class="mb-5">
    {#snippet component()}
        <Flexbox  direction="column" gap="3">
            <InputGroup>
                <Input />
                <Select options={selectOptions} />
            </InputGroup>

            <InputGroup>
                <Button variant="soft">button</Button>
                <Select options={selectOptions} />
            </InputGroup>

            <InputGroup style="width: 100%;">
                <ButtonIcon variant="soft">+</ButtonIcon>
                <Select options={selectOptions} class="flex-grow-1" />
                <Button variant="soft">button</Button>
            </InputGroup>
        </Flexbox>
    {/snippet}
</PlaygroundWrapper>
