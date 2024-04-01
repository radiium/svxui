<script lang="ts">
    import Text from '$lib/components/Text/Text.svelte';
    import { page } from '$app/stores';

    let elementRef: HTMLHeadingElement;
    let id: string = '';
    $: {
        if (elementRef?.innerText) {
            id = elementRef.innerText.toLowerCase().replace(/ /g, '-');
        }
    }
</script>

<Text as="h2" {id} bind:elementRef size="6" weight="bold" class="mt-7 mb-3">
    {#if id}
        <a href={`#${id}`} data-color="primary">#</a>
    {/if}
    <slot />
</Text>

<style>
    a {
        color: var(--accent-9);
    }
</style>
