<script lang="ts">
    import { Dialog, Button } from 'svxui';

    let isOpen = $state(false);
</script>

<Button onclick={() => (isOpen = true)}>Open dialog</Button>

<Dialog bind:isOpen>Dialog content</Dialog>
