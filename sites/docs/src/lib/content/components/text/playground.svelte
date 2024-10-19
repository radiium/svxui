<script lang="ts">
    import PlaygroundCode from '$lib/components/playground/PlaygroundCode.svelte';
    import PlaygroundForm from '$lib/components/playground/PlaygroundForm.svelte';
    import PlaygroundWrapper from '$lib/components/playground/PlaygroundWrapper.svelte';
    import { Text, defaultTextProps } from 'svxui';
    import { template, textSchema } from './schema.js';

    let props = { ...defaultTextProps };
    let propsString = '';
    $: templateProps = [
        {
            key: ':props',
            value: propsString
        }
    ];
</script>

<PlaygroundWrapper mask={false}>
    <Text slot="component" style="width: 100%" {...props}>Super sample text !</Text>
    <PlaygroundForm slot="form" bind:props bind:propsString schema={textSchema} />
    <PlaygroundCode slot="code" {template} {templateProps} />
</PlaygroundWrapper>
