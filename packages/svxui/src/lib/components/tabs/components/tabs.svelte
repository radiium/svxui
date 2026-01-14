<script lang="ts" generics="Value">
    import { TabsState } from '$lib/utilities/index.js';
    import { defaultTabsProps } from '../props.js';
    import type { TabsProps } from '../types.js';

    let {
        value = $bindable(),
        onValueChange = defaultTabsProps.onValueChange,
        disabled = defaultTabsProps.disabled,
        orientation = defaultTabsProps.orientation,
        activateOnFocus = defaultTabsProps.activateOnFocus,
        loop = defaultTabsProps.loop,
        children
    }: TabsProps<Value> = $props();

    const tabs = new TabsState<Value>({
        get value() {
            return value as Value;
        },
        set value(newValue: Value) {
            value = newValue;
            onValueChange?.(newValue);
        },
        get disabled() {
            return disabled!;
        },
        get orientation() {
            return orientation!;
        },
        get activateOnFocus() {
            return activateOnFocus!;
        },
        get loop() {
            return loop!;
        }
    });
</script>

{@render children?.(tabs)}
