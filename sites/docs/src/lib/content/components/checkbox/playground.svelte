<script lang="ts">
    import PlaygroundCode from '$lib/components/playground/PlaygroundCode.svelte';
    import PlaygroundForm from '$lib/components/playground/PlaygroundForm.svelte';
    import PlaygroundWrapper from '$lib/components/playground/PlaygroundWrapper.svelte';
    import { Checkbox, defaultCheckboxProps } from 'svxui';
    import { checkboxSchema, template } from './schema.js';

    let props = $state({ ...defaultCheckboxProps, checked: false });
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
        <Checkbox {...props} bind:checked={props.checked} />
    {/snippet}
    {#snippet form()}
        <PlaygroundForm bind:props bind:propsString schema={checkboxSchema} />
    {/snippet}
    {#snippet code()}
        <PlaygroundCode {template} {templateProps} />
    {/snippet}
</PlaygroundWrapper>
