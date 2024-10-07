<script lang="ts">
    import Playground from '$lib/components/playground/Playground.svelte';
    import PlaygroundCode from '$lib/components/playground/PlaygroundCode.svelte';
    import PlaygroundForm from '$lib/components/playground/PlaygroundForm.svelte';
    import { Callout, defaultCalloutProps } from 'sveltr';
    import { calloutSchema, template } from './schema.js';
    import Info from '$lib/components/icons/Info.svelte';

    let props = defaultCalloutProps;
    let propsString = '';
</script>

<Playground>
    <Callout slot="component" {...props}>
        <Info slot="icon" />
        Callout content
    </Callout>
    <PlaygroundForm slot="form" bind:props bind:propsString schema={calloutSchema} />
    <PlaygroundCode slot="code" {template} {propsString} />
</Playground>
