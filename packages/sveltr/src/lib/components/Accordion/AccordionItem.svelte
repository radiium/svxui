<script lang="ts">
    import { generateId } from '$lib/utils/id.js';
    import { onDestroy, onMount } from 'svelte';
    import { getAccordionContext } from './Accordion.context.js';
    import type { AccordionItemProps } from './Accordion.types.js';

    type $$Props = AccordionItemProps;
    export let expanded: $$Props['expanded'] = false;
    export let disabled: $$Props['disabled'] = false;

    const id: string = generateId();
    const ctx = getAccordionContext();

    onMount(() => {
        ctx.register({ id, expanded });
        const unsubscribe = ctx?.items.subscribe((value) => {
            expanded = value[id];
        });
        return () => {
            if (unsubscribe) unsubscribe();
        };
    });

    onDestroy(() => {
        ctx?.unregister({ id, expanded });
    });

    const toggle = () => {
        if (!disabled) {
            ctx?.set({ id, expanded: !expanded });
        }
    };
</script>

{#if ctx}
    <slot name="header" {expanded} {disabled} {toggle} />

    {#if expanded}
        <slot {expanded} {disabled} {toggle} />
    {/if}
{/if}
