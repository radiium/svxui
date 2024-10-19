<script lang="ts">
    import Info from '$lib/components/icons/Info.svelte';
    import PlaygroundCode from '$lib/components/playground/PlaygroundCode.svelte';
    import PlaygroundForm from '$lib/components/playground/PlaygroundForm.svelte';
    import PlaygroundWrapper from '$lib/components/playground/PlaygroundWrapper.svelte';
    import { Callout, defaultCalloutProps } from 'svxui';
    import { calloutSchema, template } from './schema.js';

    let props = defaultCalloutProps;
    let propsString = '';
    $: templateProps = [
        {
            key: ':props',
            value: propsString
        }
    ];
</script>

<PlaygroundWrapper>
    <Callout slot="component" {...props}>
        <Info slot="icon" />
        Callout content
    </Callout>
    <PlaygroundForm slot="form" bind:props bind:propsString schema={calloutSchema} />
    <PlaygroundCode slot="code" {template} {templateProps} />
</PlaygroundWrapper>
