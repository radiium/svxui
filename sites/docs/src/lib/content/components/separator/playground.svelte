<script lang="ts">
    import Playground from '$lib/components/playground/Playground.svelte';
    import PlaygroundForm from '$lib/components/playground/PlaygroundForm.svelte';
    import { Separator, defaultSeparatorProps } from 'svxui';
    import { template, separatorSchema } from './schema.js';
    import PlaygroundCode from '$lib/components/playground/PlaygroundCode.svelte';

    let props = { ...defaultSeparatorProps };
    let propsString = '';
</script>

<Playground>
    <Separator slot="component" {...props} />
    <PlaygroundForm slot="form" bind:props bind:propsString schema={separatorSchema} />
    <PlaygroundCode slot="code" {template} {propsString} />
</Playground>
