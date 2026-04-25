<script lang="ts">
    import { Flex, Panel } from '$lib/index.js';
    import type { Snippet } from 'svelte';

    type Props = {
        children?: Snippet;
        controls?: Snippet;
    };

    let { children, controls }: Props = $props();
</script>

<Flex justify="start" gap="5" maxWidth="100%">
    <Panel variant="clear" outline p="5" class="spacer" style="min-width: 0">
        <Flex gap="2" direction="column" justify="center" align="center">
            {@render children?.()}
        </Flex>
    </Panel>

    {#if controls}
        <Panel variant="clear" outline p="5" style="width: 300px">
            <Flex justify="start" gap="2" direction="column" align="start">
                {@render controls?.()}
            </Flex>
        </Panel>
    {/if}
</Flex>
