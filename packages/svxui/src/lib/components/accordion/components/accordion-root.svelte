<script lang="ts">
    import { useAccordionRoot } from '../context.svelte.js';
    import { defaultAccordionRootProps } from '../props.js';
    import type { AccordionRootProps, AccordionSelectionValue } from '../types.js';

    let {
        value = $bindable(),
        onValueChange = defaultAccordionRootProps.onValueChange,
        multiple = defaultAccordionRootProps.multiple!,
        disabled = defaultAccordionRootProps.disabled!,
        loop = defaultAccordionRootProps.loop!,
        orientation = defaultAccordionRootProps.orientation!,
        children
    }: AccordionRootProps = $props();

    const root = useAccordionRoot({
        value() {
            return value;
        },
        onValueChange(newValue: AccordionSelectionValue) {
            value = newValue;
            onValueChange?.(newValue);
        },
        multiple() {
            return multiple;
        },
        disabled() {
            return disabled;
        },
        loop() {
            return loop;
        },
        orientation() {
            return orientation;
        }
    });

    const snippetProps = $derived({
        get rootAttrs() {
            return root.rootAttrs;
        }
    });
</script>

{@render children?.(snippetProps)}
