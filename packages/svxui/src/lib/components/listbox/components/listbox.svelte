<script lang="ts" generics="Value, Multiple extends boolean">
    import { ListboxBuilder } from '$lib/builders/listbox/index.js';
    import type { ListboxProps } from '../types.js';

    let {
        value = $bindable(),
        onValueChange = undefined,
        multiple = false as Multiple,
        disabled = false,
        loop = false,
        activateOnFocus = false,
        orientation = 'vertical',
        children
    }: ListboxProps<Value, Multiple> = $props();

    const listbox = new ListboxBuilder<Value, Multiple>({
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
        get loop() {
            return loop;
        },
        get activateOnFocus() {
            return activateOnFocus;
        },
        get orientation() {
            return orientation;
        }
    });
</script>

{@render children?.(listbox)}
