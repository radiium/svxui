<script>
    import InfoIcon from '$lib/components/icons/InfoIcon.svelte';
    import { Flexbox, Panel } from 'svxui';

    let { children, ...restProps } = $props();
</script>

<Panel
    as="blockquote"
    class="mt-5 mb-0 mx-0 inline-block "
    color="neutral"
    variant="soft"
    size="3"
    fullWidth
    outline
    {...restProps}
>
    <Flexbox align="center" gap="3" class="blockquote-content">
        <InfoIcon size="25" class="shrink-0" />

        {@render children?.()}
    </Flexbox>
</Panel>

<style>
    :global(.blockquote-content > p) {
        margin-top: 0 !important;
    }
</style>
