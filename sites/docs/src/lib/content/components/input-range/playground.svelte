<script lang="ts">
    import Playground from '$lib/components/playground/Playground.svelte';
    import PlaygroundForm from '$lib/components/playground/PlaygroundForm.svelte';
    import { InputRange, defaultInputRangeProps } from 'svxui';
    import { template, inputRangeSchema } from './schema.js';
    import PlaygroundCode from '$lib/components/playground/PlaygroundCode.svelte';

    let props = { ...defaultInputRangeProps };
    let propsString = '';
</script>

<Playground>
    <InputRange slot="component" {...props} bind:value={props.value} />
    <PlaygroundForm slot="form" bind:props bind:propsString schema={inputRangeSchema} />
    <PlaygroundCode slot="code" {template} {propsString} />
</Playground>
