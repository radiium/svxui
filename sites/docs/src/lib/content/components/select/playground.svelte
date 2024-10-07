<script lang="ts">
    import Playground from '$lib/components/playground/Playground.svelte';
    import PlaygroundForm from '$lib/components/playground/PlaygroundForm.svelte';
    import { Select, defaultSelectProps } from 'svxui';
    import { template, selectSchema } from './schema.js';
    import PlaygroundCode from '$lib/components/playground/PlaygroundCode.svelte';

    let props = { ...defaultSelectProps };
    let propsString = '';

    let options = ['Option 1', 'Option 2', 'Option 3', 'Option 4', 'Option 5'];
</script>

<Playground>
    <Select slot="component" {...props} bind:value={props.value} {options} placeholder="Select an option" />
    <PlaygroundForm slot="form" bind:props bind:propsString schema={selectSchema} />
    <PlaygroundCode slot="code" {template} {propsString} />
</Playground>
