<script lang="ts">
    import PlaygroundCode from '$lib/components/playground/PlaygroundCode.svelte';
    import PlaygroundForm from '$lib/components/playground/PlaygroundForm.svelte';
    import PlaygroundWrapper from '$lib/components/playground/PlaygroundWrapper.svelte';
    import { Textarea, defaultTextareaProps } from 'svxui';
    import { template, textareaSchema } from './schema.js';

    let props = $state({ ...defaultTextareaProps, value: '' });
    let propsString = $state('');
    let templateProps = $derived([
        {
            key: ':props',
            value: propsString
        }
    ]);
</script>

<PlaygroundWrapper>
    {#snippet component()}
        <Textarea {...props} bind:value={props.value} />
    {/snippet}
    {#snippet form()}
        <PlaygroundForm bind:props bind:propsString schema={textareaSchema} />
    {/snippet}
    {#snippet code()}
        <PlaygroundCode {template} {templateProps} />
    {/snippet}
</PlaygroundWrapper>
