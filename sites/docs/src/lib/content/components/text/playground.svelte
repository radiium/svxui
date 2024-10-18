<script lang="ts">
    import Playground from '$lib/components/playground/Playground.svelte';
    import PlaygroundForm from '$lib/components/playground/PlaygroundForm.svelte';
    import { Text, defaultTextProps } from 'svxui';
    import { template, textSchema } from './schema.js';
    import PlaygroundCode from '$lib/components/playground/PlaygroundCode.svelte';

    let props = { ...defaultTextProps };
    let propsString = '';
    $: templateProps = [
        {
            key: ':props',
            value: propsString
        }
    ];
</script>

<Playground mask={false}>
    <Text slot="component" style="width: 100%" {...props}>Super sample text !</Text>
    <PlaygroundForm slot="form" bind:props bind:propsString schema={textSchema} />
    <PlaygroundCode slot="code" {template} {templateProps} />
</Playground>
