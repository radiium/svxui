<script lang="ts">
    import { Select, SelectOption } from 'svxui';

    const options = ['option1', 'option2', 'option3', 'option4', 'option5'];
</script>

<Select size="1">
    {#each options as opt (opt)}
        <SelectOption value={opt}>{opt}</SelectOption>
    {/each}
</Select>
<Select size="2">
    {#each options as opt (opt)}
        <SelectOption value={opt}>{opt}</SelectOption>
    {/each}
</Select>
<Select size="3">
    {#each options as opt (opt)}
        <SelectOption value={opt}>{opt}</SelectOption>
    {/each}
</Select>

<div class="w-100"></div>

<Select size="1" multiple>
    {#each options as opt (opt)}
        <SelectOption value={opt}>{opt}</SelectOption>
    {/each}
</Select>
<Select size="2" multiple>
    {#each options as opt (opt)}
        <SelectOption value={opt}>{opt}</SelectOption>
    {/each}
</Select>
<Select size="3" multiple>
    {#each options as opt (opt)}
        <SelectOption value={opt}>{opt}</SelectOption>
    {/each}
</Select>
