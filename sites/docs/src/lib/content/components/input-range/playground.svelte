<script lang="ts">
    import PlaygroundCode from '$lib/components/playground/PlaygroundCode.svelte';
    import PlaygroundForm from '$lib/components/playground/PlaygroundForm.svelte';
    import PlaygroundWrapper from '$lib/components/playground/PlaygroundWrapper.svelte';
    import { InputRange, defaultInputRangeProps } from 'svxui';
    import { inputRangeSchema, template } from './schema.js';

    let props = $state({ ...defaultInputRangeProps });
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
        <InputRange {...props} bind:value={props.value} />
    {/snippet}
    {#snippet form()}
        <PlaygroundForm bind:props bind:propsString schema={inputRangeSchema} />
    {/snippet}
    {#snippet code()}
        <PlaygroundCode {template} {templateProps} />
    {/snippet}
</PlaygroundWrapper>
