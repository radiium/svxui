<script lang="ts">
    import { Radio } from 'svxui';

    const items = ['1', '2', '3'];
    let group = $state('1');
</script>

{#each items as item (item)}
    <label>
        <Radio name="label" value={item} bind:group />
        label {item}
    </label>
{/each}

<style>
    label {
        display: flex;
        align-items: center;
        gap: var(--space-3);
    }
</style>
