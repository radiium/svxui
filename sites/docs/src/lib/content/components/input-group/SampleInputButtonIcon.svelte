<script>
    import PlusIcon from '$lib/components/icons/Plus.svelte';
    import Playground from '$lib/components/playground/Playground.svelte';
    import { ButtonIcon, Flexbox, Input, InputGroup } from 'sveltr';
</script>

<Playground class="mb-5">
    <Flexbox slot="component" direction="column" gap="3">
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
</Playground>
