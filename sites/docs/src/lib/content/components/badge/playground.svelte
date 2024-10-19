<script lang="ts">
    import PlaygroundCode from '$lib/components/playground/PlaygroundCode.svelte';
    import PlaygroundForm from '$lib/components/playground/PlaygroundForm.svelte';
    import PlaygroundWrapper from '$lib/components/playground/PlaygroundWrapper.svelte';
    import { Badge, defaultBadgeProps } from 'svxui';
    import { badgeSchema, template } from './schema.js';

    let props = defaultBadgeProps;
    let propsString = '';
    $: templateProps = [
        {
            key: ':props',
            value: propsString
        }
    ];
</script>

<PlaygroundWrapper>
    <Badge {...props} slot="component">Badge</Badge>
    <PlaygroundForm bind:props bind:propsString schema={badgeSchema} slot="form" />
    <PlaygroundCode slot="code" {template} {templateProps} />
</PlaygroundWrapper>
