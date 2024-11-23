<script>
    import PlusIcon from '$lib/components/icons/Plus.svelte';
    import PlaygroundWrapper from '$lib/components/playground/PlaygroundWrapper.svelte';
    import { ButtonIcon, Flexbox, Input, InputGroup } from 'svxui';
</script>

<PlaygroundWrapper class="mb-5">
    {#snippet component()}
        <Flexbox direction="column" gap="3">
            <InputGroup>
                <ButtonIcon variant="soft">
                    <PlusIcon />
                </ButtonIcon>
                <Input />
            </InputGroup>

            <InputGroup>
                <Input />
                <ButtonIcon variant="soft">
                    <PlusIcon />
                </ButtonIcon>
            </InputGroup>

            <InputGroup>
                <Input />
                <ButtonIcon variant="soft">@</ButtonIcon>
                <Input />
            </InputGroup>

            <InputGroup>
                <ButtonIcon variant="soft">$</ButtonIcon>
                <Input />
                <ButtonIcon variant="soft">
                    <PlusIcon />
                </ButtonIcon>
            </InputGroup>

            <InputGroup>
                <ButtonIcon variant="soft">$</ButtonIcon>
                <ButtonIcon variant="clear">%</ButtonIcon>
                <ButtonIcon variant="clear">
                    <PlusIcon />
                </ButtonIcon>
                <Input />
            </InputGroup>
        </Flexbox>
    {/snippet}
</PlaygroundWrapper>
