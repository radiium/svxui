<script lang="ts" generics="Value, Multiple extends boolean">
    import { AccordionBuilder } from '$lib/builders/accordion/index.js';
    import type { AccordionProps } from '../types.js';

    let {
        value = $bindable(),
        onValueChange,
        multiple = false as Multiple,
        disabled = false,
        orientation = 'vertical',
        children
    }: AccordionProps<Value, Multiple> = $props();

    const accordion = new AccordionBuilder<Value, Multiple>({
        get value() {
            return value;
        },
        set value(newValue) {
            value = newValue;
            onValueChange?.(newValue as Value);
        },
        get multiple() {
            return multiple;
        },
        get disabled() {
            return disabled;
        },
        get orientation() {
            return orientation;
        }
    });
</script>

{@render children?.(accordion)}
