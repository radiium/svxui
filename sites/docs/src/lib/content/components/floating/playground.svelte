<script lang="ts">
    import Playground from '$lib/components/playground/Playground.svelte';
    import PlaygroundForm from '$lib/components/playground/PlaygroundForm.svelte';
    import { Button, Floating, defaultFloatingProps } from 'svxui';
    import { template, floatingSchema } from './schema.js';
    import PlaygroundCode from '$lib/components/playground/PlaygroundCode.svelte';

    let props = { ...defaultFloatingProps, isOpen: false };
    let propsString = '';
    $: templateProps = [
        {
            key: ':props',
            value: propsString
        }
    ];

    function toggle() {
        props.isOpen = !props.isOpen;
    }
</script>

<Playground>
    <Floating slot="component" {...props} bind:isOpen={props.isOpen}>
        <Button slot="trigger" variant="soft" on:click={toggle}>Open</Button>
        <div slot="content">Floating content</div>
    </Floating>
    <PlaygroundForm slot="form" bind:props bind:propsString schema={floatingSchema} />
    <PlaygroundCode slot="code" {template} {templateProps} />
</Playground>
