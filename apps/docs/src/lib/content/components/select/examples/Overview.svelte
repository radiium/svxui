<script lang="ts">
    import { Select, SelectOption } from 'svxui';

    const options = ['option1', 'option2', 'option3'];
</script>

<Select>
    {#each options as opt (opt)}
        <SelectOption value={opt}>{opt}</SelectOption>
    {/each}
</Select>
