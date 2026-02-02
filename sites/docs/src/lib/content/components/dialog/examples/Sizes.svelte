<script lang="ts">
    import { Dialog, Button, type DialogSize } from 'svxui';

    const isOpenList = $state([false, false, false, false]);
    const sizes: DialogSize[] = ['1', '2', '3', '4'];
</script>

{#each sizes as size, i (i)}
    <Button onclick={() => (isOpenList[i] = true)}>
        Open size {size}
    </Button>

    <Dialog bind:isOpen={isOpenList[i]} {size} closeOnBackdropClick closeOnEscape>
        Dialog content size {size}
    </Dialog>
{/each}
