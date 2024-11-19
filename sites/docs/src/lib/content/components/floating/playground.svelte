<script lang="ts">
    import PlaygroundCode from '$lib/components/playground/PlaygroundCode.svelte';
    import PlaygroundForm from '$lib/components/playground/PlaygroundForm.svelte';
    import PlaygroundWrapper from '$lib/components/playground/PlaygroundWrapper.svelte';
    import { Button, Floating, defaultFloatingProps } from 'svxui';
    import { floatingSchema, template } from './schema.js';

    let props = $state({ ...defaultFloatingProps, isOpen: false });
    let propsString = $state('');
    let templateProps = $derived([
        {
            key: ':props',
            value: propsString
        }
    ]);

    function toggle() {
        props.isOpen = !props.isOpen;
    }
</script>

<PlaygroundWrapper>
    {#snippet component()}
        <Floating {...props} bind:isOpen={props.isOpen}>
            {#snippet trigger()}
                <Button variant="soft" onclick={toggle}>Open</Button>
            {/snippet}
            {#snippet content()}
                <div>Floating content</div>
            {/snippet}
        </Floating>
    {/snippet}
    {#snippet form()}
        <PlaygroundForm bind:props bind:propsString schema={floatingSchema} />
    {/snippet}
    {#snippet code()}
        <PlaygroundCode {template} {templateProps} />
    {/snippet}
</PlaygroundWrapper>
