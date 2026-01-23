<script lang="ts" generics="Value">
    import { TabsBuilder } from '$lib/builders/tabs/index.js';
    import type { TabsProps } from '../types.js';

    let {
        value = $bindable(),
        onValueChange = undefined,
        disabled = false,
        orientation = 'horizontal',
        activateOnFocus = false,
        loop = false,
        children
    }: TabsProps<Value> = $props();

    const tabs = new TabsBuilder<Value>({
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
