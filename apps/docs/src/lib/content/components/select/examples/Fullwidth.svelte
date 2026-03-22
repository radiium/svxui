<script lang="ts">
    import { Select, SelectOption } from 'svxui';

    const options = ['option1', 'option2', 'option3', 'option4', 'option5'];
</script>

<Select fullWidth>
    {#each options as opt (opt)}
        <SelectOption value={opt}>{opt}</SelectOption>
    {/each}
</Select>

<Select fullWidth multiple>
    {#each options as opt (opt)}
        <SelectOption value={opt}>{opt}</SelectOption>
    {/each}
</Select>
