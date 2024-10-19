<script lang="ts">
    import PlaygroundCode from '$lib/components/playground/PlaygroundCode.svelte';
    import PlaygroundForm from '$lib/components/playground/PlaygroundForm.svelte';
    import PlaygroundWrapper from '$lib/components/playground/PlaygroundWrapper.svelte';
    import { Textarea, defaultTextareaProps } from 'svxui';
    import { template, textareaSchema } from './schema.js';

    let props = { ...defaultTextareaProps, value: '' };
    let propsString = '';
    $: templateProps = [
        {
            key: ':props',
            value: propsString
        }
    ];
</script>

<PlaygroundWrapper>
    <Textarea slot="component" {...props} bind:value={props.value} />
    <PlaygroundForm slot="form" bind:props bind:propsString schema={textareaSchema} />
    <PlaygroundCode slot="code" {template} {templateProps} />
</PlaygroundWrapper>
