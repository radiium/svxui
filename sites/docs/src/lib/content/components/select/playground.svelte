<script lang="ts">
    import PlaygroundCode from '$lib/components/playground/PlaygroundCode.svelte';
    import PlaygroundForm from '$lib/components/playground/PlaygroundForm.svelte';
    import PlaygroundWrapper from '$lib/components/playground/PlaygroundWrapper.svelte';
    import { Select, defaultSelectProps } from 'svxui';
    import { selectSchema, template } from './schema.js';

    let props = $state({ ...defaultSelectProps });
    let propsString = $state('');
    let templateProps = $derived([
        {
            key: ':props',
            value: propsString
        }
    ]);

    let options = ['Option 1', 'Option 2', 'Option 3', 'Option 4', 'Option 5'];
</script>

<PlaygroundWrapper>
    {#snippet component()}
        <Select  {...props} bind:value={props.value} {options} placeholder="Select an option" />
    {/snippet}
    {#snippet form()}
        <PlaygroundForm  bind:props bind:propsString schema={selectSchema} />
    {/snippet}
    {#snippet code()}
        <PlaygroundCode  {template} {templateProps} />
    {/snippet}
</PlaygroundWrapper>
