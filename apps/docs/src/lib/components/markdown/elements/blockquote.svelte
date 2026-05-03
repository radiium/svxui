<script>
    import InfoIcon from '$lib/components/icons/InfoIcon.svelte';
    import { Flex, Panel } from 'svxui';

    let { children, ...restProps } = $props();
</script>

<Panel as="blockquote" variant="soft" p="3" class="my-5 mx-0" fullWidth {...restProps}>
    <Flex justify="start" align="center" gap="3" m="0">
        <InfoIcon size="25" />
        {@render children?.()}
    </Flex>
</Panel>

<style>
    :global(blockquote svg) {
        flex-shrink: 0;
    }
</style>
