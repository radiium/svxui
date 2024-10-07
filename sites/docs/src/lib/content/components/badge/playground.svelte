<script lang="ts">
    import Playground from '$lib/components/playground/Playground.svelte';
    import PlaygroundForm from '$lib/components/playground/PlaygroundForm.svelte';
    import { Badge, defaultBadgeProps } from 'sveltr';
    import { template, badgeSchema } from './schema.js';
    import PlaygroundCode from '$lib/components/playground/PlaygroundCode.svelte';

    let props = defaultBadgeProps;
    let propsString = '';
</script>

<Playground>
    <Badge {...props} slot="component">Badge</Badge>
    <PlaygroundForm bind:props bind:propsString schema={badgeSchema} slot="form" />
    <PlaygroundCode slot="code" {template} {propsString} />
</Playground>
