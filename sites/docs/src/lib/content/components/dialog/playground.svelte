<script lang="ts">
    import PlaygroundCode from '$lib/components/playground/PlaygroundCode.svelte';
    import PlaygroundForm from '$lib/components/playground/PlaygroundForm.svelte';
    import PlaygroundWrapper from '$lib/components/playground/PlaygroundWrapper.svelte';
    import { Button, Dialog, defaultDialogProps } from 'svxui';
    import { dialogSchema, template } from './schema.js';

    let props = { ...defaultDialogProps, isOpen: false };
    let propsString = '';
    $: templateProps = [
        {
            key: ':props',
            value: propsString
        }
    ];
</script>

<PlaygroundWrapper>
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
    <PlaygroundCode slot="code" {template} {templateProps} />
</PlaygroundWrapper>
