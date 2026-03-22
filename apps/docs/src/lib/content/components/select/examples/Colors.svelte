<script lang="ts">
    import { Select, SelectOption } from 'svxui';

    const options = ['option1', 'option2', 'option3', 'option4', 'option5'];
</script>

<Select color="neutral">
    {#each options as opt (opt)}
        <SelectOption value={opt}>{opt}</SelectOption>
    {/each}
</Select>
<Select color="blue">
    {#each options as opt (opt)}
        <SelectOption value={opt}>{opt}</SelectOption>
    {/each}
</Select>
<Select color="green">
    {#each options as opt (opt)}
        <SelectOption value={opt}>{opt}</SelectOption>
    {/each}
</Select>
<Select color="yellow">
    {#each options as opt (opt)}
        <SelectOption value={opt}>{opt}</SelectOption>
    {/each}
</Select>
<Select color="orange">
    {#each options as opt (opt)}
        <SelectOption value={opt}>{opt}</SelectOption>
    {/each}
</Select>
<Select color="red">
    {#each options as opt (opt)}
        <SelectOption value={opt}>{opt}</SelectOption>
    {/each}
</Select>
