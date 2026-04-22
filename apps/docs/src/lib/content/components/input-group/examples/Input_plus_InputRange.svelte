<script lang="ts">
    import { Input, InputGroup, InputRange } from 'svxui';

    let value = $state();
</script>

<InputGroup>
    <InputRange bind:value step={1} min={0} max={100} />
    <Input bind:value step={1} min={0} max={100} type="number" />
</InputGroup>
