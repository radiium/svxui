<script lang="ts">
    import PlaygroundCode from '$lib/components/playground/PlaygroundCode.svelte';
    import PlaygroundForm from '$lib/components/playground/PlaygroundForm.svelte';
    import PlaygroundWrapper from '$lib/components/playground/PlaygroundWrapper.svelte';
    import { Radio, defaultRadioProps } from 'svxui';
    import { radioSchema, template } from './schema.js';

    let props = { ...defaultRadioProps };
    let group: string | number | undefined = undefined;
    let propsString = '';
    $: templateProps = [
        {
            key: ':props',
            value: propsString
        }
    ];
</script>

<PlaygroundWrapper>
    <Radio slot="component" {...props} bind:group />
    <PlaygroundForm slot="form" bind:props bind:propsString schema={radioSchema} />
    <PlaygroundCode slot="code" {template} {templateProps} />
</PlaygroundWrapper>
