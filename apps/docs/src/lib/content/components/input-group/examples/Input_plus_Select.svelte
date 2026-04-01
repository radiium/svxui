<script lang="ts">
    import { InputGroup, Input, Select, SelectOption } from 'svxui';

    const options = ['option 1', 'option 2'];
</script>

<InputGroup>
    <Input />
    <Select>
        {#each options as value (value)}
            <SelectOption {value}>{value}</SelectOption>
        {/each}
    </Select>
</InputGroup>
