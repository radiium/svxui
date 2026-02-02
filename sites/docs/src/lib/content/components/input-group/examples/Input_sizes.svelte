<script lang="ts">
    import { InputGroup, InputGroupItem, Input, type InputSize } from 'svxui';
    const sizes: InputSize[] = ['1', '2', '3'];
</script>

{#each sizes as size (size)}
    <InputGroup>
        <InputGroupItem class="px-3">Size {size}</InputGroupItem>
        <Input {size} />
    </InputGroup>
{/each}
