<script lang="ts">
    import Playground from '$lib/components/playground/Playground.svelte';
    import PlaygroundForm from '$lib/components/playground/PlaygroundForm.svelte';
    import { Textarea, defaultTextareaProps } from 'svxui';
    import { template, textareaSchema } from './schema.js';
    import PlaygroundCode from '$lib/components/playground/PlaygroundCode.svelte';

    let props = { ...defaultTextareaProps, value: '' };
    let propsString = '';
</script>

<Playground>
    <Textarea slot="component" {...props} bind:value={props.value} />
    <PlaygroundForm slot="form" bind:props bind:propsString schema={textareaSchema} />
    <PlaygroundCode slot="code" {template} {propsString} />
</Playground>
