<script lang="ts">
    import PlaygroundCode from '$lib/components/playground/PlaygroundCode.svelte';
    import PlaygroundForm from '$lib/components/playground/PlaygroundForm.svelte';
    import PlaygroundWrapper from '$lib/components/playground/PlaygroundWrapper.svelte';
    import { Input, defaultInputProps } from 'svxui';
    import { inputSchema, template } from './schema.js';

    let props = $state({ ...defaultInputProps, value: '' });
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
        <Input {...props} bind:value={props.value} />
    {/snippet}
    {#snippet form()}
        <PlaygroundForm bind:props bind:propsString schema={inputSchema} />
    {/snippet}
    {#snippet code()}
        <PlaygroundCode {template} {templateProps} />
    {/snippet}
</PlaygroundWrapper>
