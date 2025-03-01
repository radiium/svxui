<script lang="ts">
    import { useAccordionItem } from '../context.svelte.js';
    import { defaultAccordionItemProps } from '../props.js';
    import type { AccordionItemProps } from '../types.js';

    let {
        value,
        disabled = defaultAccordionItemProps.disabled!,
        headingLevel = defaultAccordionItemProps.headingLevel!,
        children
    }: AccordionItemProps = $props();

    const item = useAccordionItem({
        value() {
            return value;
        },
        disabled() {
            return disabled;
        },
        headingLevel() {
            return headingLevel;
        }
    });

    const snippetProps = $derived({
        get expanded() {
            return item.expanded;
        },
        get disabled() {
            return item.disabled;
        },
        get itemAttrs() {
            return item.itemAttrs;
        },
        get headingAttrs() {
            return item.headingAttrs;
        },
        get triggerAttrs() {
            return item.triggerAttrs;
        },
        get contentAttrs() {
            return item.contentAttrs;
        }
    });
</script>

{@render children?.(snippetProps)}
