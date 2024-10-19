<script lang="ts">
    import PlaygroundCode from '$lib/components/playground/PlaygroundCode.svelte';
    import PlaygroundForm from '$lib/components/playground/PlaygroundForm.svelte';
    import PlaygroundWrapper from '$lib/components/playground/PlaygroundWrapper.svelte';
    import { Input, defaultInputProps } from 'svxui';
    import { inputSchema, template } from './schema.js';

    let props = { ...defaultInputProps, value: '' };
    let propsString = '';
    $: templateProps = [
        {
            key: ':props',
            value: propsString
        }
    ];
</script>

<PlaygroundWrapper>
    <Input slot="component" {...props} bind:value={props.value} />
    <PlaygroundForm slot="form" bind:props bind:propsString schema={inputSchema} />
    <PlaygroundCode slot="code" {template} {templateProps} />
</PlaygroundWrapper>
