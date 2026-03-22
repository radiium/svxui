<script lang="ts">
    import { Select, SelectOption } from 'svxui';

    type Option = {
        id: number;
        text: string;
        disabled?: boolean;
    };

    const options: Option[] = [
        {
            id: 1,
            text: 'item 1'
        },
        {
            id: 2,
            text: 'item 2'
        },
        {
            id: 3,
            text: 'item 3',
            disabled: true
        }
    ];
</script>

<Select>
    {#each options as opt (opt.id)}
        <SelectOption value={opt.id}>{opt.text}</SelectOption>
    {/each}
</Select>
