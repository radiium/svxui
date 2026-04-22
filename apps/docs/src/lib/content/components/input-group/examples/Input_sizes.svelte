<script lang="ts">
    import { Input, InputGroup, InputGroupItem, type InputSize } from 'svxui';
    const sizes: InputSize[] = ['1', '2', '3'];
</script>

{#each sizes as size (size)}
    <InputGroup>
        <InputGroupItem style="padding-inline: var(--space-3)">
            Size {size}
        </InputGroupItem>
        <Input {size} />
    </InputGroup>
{/each}
