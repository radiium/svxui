<script lang="ts">
    import PlaygroundCode from '$lib/components/playground/PlaygroundCode.svelte';
    import PlaygroundForm from '$lib/components/playground/PlaygroundForm.svelte';
    import PlaygroundWrapper from '$lib/components/playground/PlaygroundWrapper.svelte';
    import { Radio, defaultRadioProps } from 'svxui';
    import { radioSchema, template } from './schema.js';

    let props = $state({ ...defaultRadioProps });
    let group: string | number | undefined = $state(undefined);
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
        <Radio  {...props} bind:group />
    {/snippet}
    {#snippet form()}
        <PlaygroundForm  bind:props bind:propsString schema={radioSchema} />
    {/snippet}
    {#snippet code()}
        <PlaygroundCode  {template} {templateProps} />
    {/snippet}
</PlaygroundWrapper>
