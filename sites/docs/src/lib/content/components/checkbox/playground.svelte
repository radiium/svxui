<script lang="ts">
    import PlaygroundCode from '$lib/components/playground/PlaygroundCode.svelte';
    import PlaygroundForm from '$lib/components/playground/PlaygroundForm.svelte';
    import PlaygroundWrapper from '$lib/components/playground/PlaygroundWrapper.svelte';
    import { Checkbox, defaultCheckboxProps } from 'svxui';
    import { checkboxSchema, template } from './schema.js';

    let props = { ...defaultCheckboxProps, checked: false };
    let propsString = '';
    $: templateProps = [
        {
            key: ':props',
            value: propsString
        }
    ];
</script>

<PlaygroundWrapper>
    <Checkbox slot="component" {...props} bind:checked={props.checked} />
    <PlaygroundForm slot="form" bind:props bind:propsString schema={checkboxSchema} />
    <PlaygroundCode slot="code" {template} {templateProps} />
</PlaygroundWrapper>
