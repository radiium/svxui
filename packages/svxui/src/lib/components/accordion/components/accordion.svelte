<script lang="ts" generics="Value, Multiple extends boolean">
    import { AccordionState } from '$lib/utilities/index.js';
    import { defaultAccordionProps } from '../props.js';
    import type { AccordionProps } from '../types.js';

    let {
        value = $bindable(),
        onValueChange,
        multiple = defaultAccordionProps.multiple! as Multiple,
        disabled = defaultAccordionProps.disabled!,
        orientation = defaultAccordionProps.orientation!,
        children
    }: AccordionProps<Value, Multiple> = $props();

    const accordion = new AccordionState<Value, Multiple>({
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
