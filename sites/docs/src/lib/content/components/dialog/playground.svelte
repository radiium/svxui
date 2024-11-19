<script lang="ts">
    import PlaygroundCode from '$lib/components/playground/PlaygroundCode.svelte';
    import PlaygroundForm from '$lib/components/playground/PlaygroundForm.svelte';
    import PlaygroundWrapper from '$lib/components/playground/PlaygroundWrapper.svelte';
    import { Button, Dialog, defaultDialogProps } from 'svxui';
    import { dialogSchema, template } from './schema.js';

    let props = $state({ ...defaultDialogProps, isOpen: false });
    let propsString = $state('');
    let templateProps = $derived([
        {
            key: ':props',
            value: propsString
        }
    ]);
</script>

<PlaygroundWrapper>
    {#snippet component()}
        <div>
            <Button variant="soft" onclick={() => (props.isOpen = true)}>open</Button>
            <Dialog {...props} bind:isOpen={props.isOpen}>
                <header>
                    <h1>Title</h1>
                </header>
                <p class="my-3">Content</p>
                <footer>
                    <Button color="primary" variant="soft" onclick={() => (props.isOpen = false)} fullWidth>
                        close
                    </Button>
                </footer>
            </Dialog>
        </div>
    {/snippet}
    {#snippet form()}
        <PlaygroundForm bind:props bind:propsString schema={dialogSchema} />
    {/snippet}
    {#snippet code()}
        <PlaygroundCode {template} {templateProps} />
    {/snippet}
</PlaygroundWrapper>
