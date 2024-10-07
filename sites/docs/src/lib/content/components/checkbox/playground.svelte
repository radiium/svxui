<script lang="ts">
    import Playground from '$lib/components/playground/Playground.svelte';
    import PlaygroundForm from '$lib/components/playground/PlaygroundForm.svelte';
    import { Checkbox, defaultCheckboxProps } from 'sveltr';
    import { template, checkboxSchema } from './schema.js';
    import PlaygroundCode from '$lib/components/playground/PlaygroundCode.svelte';

    let props = { ...defaultCheckboxProps, checked: false };
    let propsString = '';
</script>

<Playground>
    <Checkbox slot="component" {...props} bind:checked={props.checked} />
    <PlaygroundForm slot="form" bind:props bind:propsString schema={checkboxSchema} />
    <PlaygroundCode slot="code" {template} {propsString} />
</Playground>
