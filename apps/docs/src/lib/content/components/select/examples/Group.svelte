<script lang="ts">
    import { Select, SelectOptgroup, SelectOption } from 'svxui';

    const groups = [
        { label: 'group 1', options: ['option 1', 'option 2', 'option 3'] },
        { label: 'group 2', options: ['option 4', 'option 5', 'option 6'] }
    ];
</script>

<Select fullWidth>
    {#each groups as group, i (i)}
        <SelectOptgroup label={group.label}>
            {#each group.options as opt (opt)}
                <SelectOption value={opt}>{opt}</SelectOption>
            {/each}
        </SelectOptgroup>
    {/each}
</Select>

<Select fullWidth multiple>
    {#each groups as group, i (i)}
        <SelectOptgroup label={group.label}>
            {#each group.options as opt (opt)}
                <SelectOption value={opt}>{opt}</SelectOption>
            {/each}
        </SelectOptgroup>
    {/each}
</Select>
