<script lang="ts">
    import Playground from '$lib/components/playground/Playground.svelte';
    import PlaygroundForm from '$lib/components/playground/PlaygroundForm.svelte';
    import { Button, Dialog, defaultDialogProps } from 'sveltr';
    import { template, dialogSchema } from './schema.js';
    import PlaygroundCode from '$lib/components/playground/PlaygroundCode.svelte';

    let props = { ...defaultDialogProps, isOpen: false };
    let propsString = '';
</script>

<Playground>
    <div slot="component">
        <Button variant="soft" on:click={() => (props.isOpen = true)}>open</Button>
        <Dialog {...props} bind:isOpen={props.isOpen}>
            <header>
                <h1>Title</h1>
            </header>
            <p class="my-3">Content</p>
            <footer>
                <Button color="primary" variant="soft" on:click={() => (props.isOpen = false)} fullWidth>
                    close
                </Button>
            </footer>
        </Dialog>
    </div>
    <PlaygroundForm slot="form" bind:props bind:propsString schema={dialogSchema} />
    <PlaygroundCode slot="code" {template} {propsString} />
</Playground>
