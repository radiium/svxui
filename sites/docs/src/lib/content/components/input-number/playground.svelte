<script lang="ts">
    import PlaygroundCode from '$lib/components/playground/PlaygroundCode.svelte';
    import PlaygroundForm from '$lib/components/playground/PlaygroundForm.svelte';
    import PlaygroundWrapper from '$lib/components/playground/PlaygroundWrapper.svelte';
    import { InputNumber, defaultInputNumberProps } from 'svxui';
    import { inputNumberSchema, template } from './schema.js';

    let props = $state({ ...defaultInputNumberProps, value: undefined });
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
        <InputNumber  {...props} bind:value={props.value} />
    {/snippet}
    {#snippet form()}
        <PlaygroundForm  bind:props bind:propsString schema={inputNumberSchema} />
    {/snippet}
    {#snippet code()}
        <PlaygroundCode  {template} {templateProps} />
    {/snippet}
</PlaygroundWrapper>
