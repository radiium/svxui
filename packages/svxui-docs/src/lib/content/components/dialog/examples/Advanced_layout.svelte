<script lang="ts">
    import { Flexbox, Button, Dialog } from 'svxui';

    let isOpen = $state(false);
</script>

<Button onclick={() => (isOpen = true)}>Open dialog</Button>

<Dialog bind:isOpen width="500px" maxWidth="90vw">
    <Flexbox direction="column" gap="3">
        <h2 class="my-0">Dialog title</h2>
        <div>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam tincidunt elit mattis sem mollis,
            sit amet dapibus arcu commodo. Morbi non aliquam sapien. Quisque pretium.
        </div>
        <Flexbox gap="3" justify="end">
            <Button variant="outline" onclick={() => (isOpen = false)}>Cancel</Button>
            <Button onclick={() => (isOpen = false)}>Confirm</Button>
        </Flexbox>
    </Flexbox>
</Dialog>
