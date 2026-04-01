<script lang="ts">
    import Panel from '$lib/components/panel/components/panel.svelte';
    import { Flexbox } from '$lib/index.js';
    import type { Snippet } from 'svelte';

    type Props = {
        children?: Snippet;
        controls?: Snippet;
    };

    let { children, controls }: Props = $props();
</script>

<Flexbox gap="5" class="max-w-100">
    <Panel variant="clear" outline size="5" class="flex-auto min-w-0">
        <Flexbox gap="2" direction="column" justify="center" align="center">
            {@render children?.()}
        </Flexbox>
    </Panel>

    {#if controls}
        <Panel variant="clear" outline size="5" style="width: 300px">
            <Flexbox gap="2" direction="column" align="start">
                {@render controls?.()}
            </Flexbox>
        </Panel>
    {/if}
</Flexbox>
