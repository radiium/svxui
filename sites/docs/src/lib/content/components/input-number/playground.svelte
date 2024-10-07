<script lang="ts">
    import Playground from '$lib/components/playground/Playground.svelte';
    import PlaygroundForm from '$lib/components/playground/PlaygroundForm.svelte';
    import { InputNumber, defaultInputNumberProps } from 'sveltr';
    import { template, inputNumberSchema } from './schema.js';
    import PlaygroundCode from '$lib/components/playground/PlaygroundCode.svelte';

    let props = { ...defaultInputNumberProps, value: undefined };
    let propsString = '';
</script>

<Playground>
    <InputNumber slot="component" {...props} bind:value={props.value} />
    <PlaygroundForm slot="form" bind:props bind:propsString schema={inputNumberSchema} />
    <PlaygroundCode slot="code" {template} {propsString} />
</Playground>
