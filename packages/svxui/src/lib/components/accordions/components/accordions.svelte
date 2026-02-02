<script lang="ts" generics="Value, Multiple extends boolean">
    import { AccordionsBuilder } from '$lib/builders/accordions/index.js';
    import type { AccordionsProps } from '../types.js';

    let {
        value = $bindable(),
        onValueChange,
        multiple = false as Multiple,
        disabled = false,
        orientation = 'vertical',
        children
    }: AccordionsProps<Value, Multiple> = $props();

    const accordions = new AccordionsBuilder<Value, Multiple>({
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

{@render children?.(accordions)}
