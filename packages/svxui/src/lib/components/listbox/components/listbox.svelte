<script lang="ts" generics="Value, Multiple extends boolean">
    import { ListboxState } from '$lib/utilities/listbox-state/listbox-state.svelte.js';
    import { defaultListboxRootProps } from '../props.js';
    import type { ListboxProps } from '../types.js';

    let {
        value = $bindable(),
        onValueChange = defaultListboxRootProps.onValueChange,
        multiple = defaultListboxRootProps.multiple! as Multiple,
        disabled = defaultListboxRootProps.disabled!,
        loop = defaultListboxRootProps.loop,
        activateOnFocus = defaultListboxRootProps.activateOnFocus,
        orientation = defaultListboxRootProps.orientation!,
        children
    }: ListboxProps<Value, Multiple> = $props();

    const listbox = new ListboxState<Value, Multiple>({
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
