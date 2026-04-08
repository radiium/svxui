<script lang="ts">
    import { Button, Checkbox, Flex, SelectionState } from 'svxui';

    let value: string | string[] | undefined = $state([]);
    let multiple = $state(false);
    const options = ['option1', 'option2', 'option3'];

    const selection = new SelectionState({
        get value() {
            return value;
        },
        set value(newValue) {
            value = newValue;
        },
        get multiple() {
            return multiple;
        }
    });
</script>

<Flex justify="start" as="label" gap="2" align="center">
    <Checkbox bind:checked={multiple} />
    multiple
</Flex>
<Button variant="soft" onclick={() => selection.clear()}>
    clear selection ({selection.count})
</Button>

<Flex justify="start" align="start" gap="2">
    {#each options as opt (opt)}
        <Button variant={selection.has(opt) ? 'solid' : 'outline'} onclick={() => selection.toggle(opt)}>
            {opt}
        </Button>
    {/each}
</Flex>
