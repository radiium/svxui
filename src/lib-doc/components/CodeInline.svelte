<script lang="ts">
    import Clipboard from 'phosphor-svelte/lib/Clipboard';
    import Check from 'phosphor-svelte/lib/Check';
    import Card from '$lib/components/Card/Card.svelte';
    import Flexbox from '$lib/components/Flexbox/Flexbox.svelte';
    import Button from '$lib/components/Button/Button.svelte';

    export let src: string | undefined = undefined;
    export let meta: Record<string, unknown> = {};
</script>

<span class="Code" data-color="primary">
    <slot />
</span>

<style lang="scss">
    .Code {
        display: inline-block;
        font-family: monospace;
        font-size: calc(1em * 0.95);
        font-style: normal;
        font-weight: inherit;
        line-height: 1.25;
        box-sizing: border-box;
        padding: 0.1em 0.25em;
        height: fit-content;
        color: var(--accent-a11);
        background-color: var(--accent-a3);
        border-radius: var(--radius-2);
    }
</style>
