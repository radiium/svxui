<script lang="ts">
    import Playground from '$lib/components/playground/Playground.svelte';
    import PlaygroundForm from '$lib/components/playground/PlaygroundForm.svelte';
    import { Radio, defaultRadioProps } from 'svxui';
    import { template, radioSchema } from './schema.js';
    import PlaygroundCode from '$lib/components/playground/PlaygroundCode.svelte';

    let props = { ...defaultRadioProps };
    let group: string | number | undefined = undefined;
    let propsString = '';
</script>

<Playground>
    <Radio slot="component" {...props} bind:group />
    <PlaygroundForm slot="form" bind:props bind:propsString schema={radioSchema} />
    <PlaygroundCode slot="code" {template} {propsString} />
</Playground>
