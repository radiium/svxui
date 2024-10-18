<script lang="ts">
    import Playground from '$lib/components/playground/Playground.svelte';
    import PlaygroundForm from '$lib/components/playground/PlaygroundForm.svelte';
    import { Input, defaultInputProps } from 'svxui';
    import { template, inputSchema } from './schema.js';
    import PlaygroundCode from '$lib/components/playground/PlaygroundCode.svelte';

    let props = { ...defaultInputProps, value: '' };
    let propsString = '';
    $: templateProps = [
        {
            key: ':props',
            value: propsString
        }
    ];
</script>

<Playground>
    <Input slot="component" {...props} bind:value={props.value} />
    <PlaygroundForm slot="form" bind:props bind:propsString schema={inputSchema} />
    <PlaygroundCode slot="code" {template} {templateProps} />
</Playground>
