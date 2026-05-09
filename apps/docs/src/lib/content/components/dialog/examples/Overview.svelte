<script lang="ts">
    import { Button, Dialog, Panel } from 'svxui';

    let open = $state(false);
    const openDialog = () => (open = true);
</script>

<Button onclick={openDialog}>Open dialog</Button>

<Dialog bind:open>
    <Panel>Dialog content</Panel>
</Dialog>
