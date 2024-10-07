<script lang="ts">
    import Playground from '$lib/components/playground/Playground.svelte';
    import { Button, ButtonIcon, Flexbox, Input, InputGroup, Select } from 'sveltr';

    const selectOptions = ['opt1', 'opt2', 'opt3'];
</script>

<Playground class="mb-5">
    <Flexbox slot="component" direction="column" gap="3">
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
</Playground>
