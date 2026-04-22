<script lang="ts">
    import { Select, SelectOption } from 'svxui';

    const options = ['option1', 'option2', 'option3', 'option4', 'option5'];
</script>

<Select>
    {#each options as opt (opt)}
        <SelectOption value={opt}>{opt}</SelectOption>
    {/each}
</Select>
<Select disabled>
    {#each options as opt (opt)}
        <SelectOption value={opt}>{opt}</SelectOption>
    {/each}
</Select>

<div style="width: 100%"></div>

<Select multiple>
    {#each options as opt (opt)}
        <SelectOption value={opt}>{opt}</SelectOption>
    {/each}
</Select>
<Select disabled multiple>
    {#each options as opt (opt)}
        <SelectOption value={opt}>{opt}</SelectOption>
    {/each}
</Select>
