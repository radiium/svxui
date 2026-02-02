<script lang="ts">
    import { Flexbox, Button, Dialog } from 'svxui';

    let isOpen = $state(false);
</script>

<Button onclick={() => (isOpen = true)}>Open dialog full screen</Button>

<Dialog bind:isOpen fullScreen>
    <Flexbox justify="between" align="center" class="w-100">
        Dialog content full screen
        <Button onclick={() => (isOpen = false)}>Close</Button>
    </Flexbox>
</Dialog>
