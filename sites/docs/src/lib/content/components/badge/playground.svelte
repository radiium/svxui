<script lang="ts">
    import PlaygroundCode from '$lib/components/playground/PlaygroundCode.svelte';
    import PlaygroundForm from '$lib/components/playground/PlaygroundForm.svelte';
    import PlaygroundWrapper from '$lib/components/playground/PlaygroundWrapper.svelte';
    import { Badge, defaultBadgeProps } from 'svxui';
    import { badgeSchema, template } from './schema.js';

    let props = $state(defaultBadgeProps);
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
        <Badge {...props}>Badge</Badge>
    {/snippet}
    {#snippet form()}
        <PlaygroundForm bind:props bind:propsString schema={badgeSchema} />
    {/snippet}
    {#snippet code()}
        <PlaygroundCode {template} {templateProps} />
    {/snippet}
</PlaygroundWrapper>
