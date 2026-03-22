<script lang="ts">
    import { Button, Checkbox, Flexbox, SelectionState } from 'svxui';

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

<Flexbox as="label" gap="2" align="center">
    <Checkbox bind:checked={multiple} />
    multiple
</Flexbox>
<Button variant="soft" onclick={() => selection.clear()}>
    clear selection ({selection.count})
</Button>

<Flexbox align="start" gap="2">
    {#each options as opt (opt)}
        <Button variant={selection.has(opt) ? 'solid' : 'outline'} onclick={() => selection.toggle(opt)}>
            {opt}
        </Button>
    {/each}
</Flexbox>
