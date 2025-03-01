<script lang="ts">
    import { defaultTabRootProps } from '../props.js';
    import type { TabRootProps, TabsSelectionValue } from '../types.js';
    import { useTabsRoot } from '../context.svelte.js';

    let {
        value = $bindable(),
        onValueChange = defaultTabRootProps.onValueChange,
        disabled = defaultTabRootProps.disabled,
        orientation = defaultTabRootProps.orientation,
        selectWhenFocused = defaultTabRootProps.selectWhenFocused,
        loop = defaultTabRootProps.loop,
        children
    }: TabRootProps = $props();

    const tabs = useTabsRoot({
        value: () => {
            return value;
        },
        onValueChange: (newValue: TabsSelectionValue) => {
            value = newValue;
            onValueChange?.(newValue);
        },
        disabled: () => {
            return disabled!;
        },
        orientation: () => {
            return orientation!;
        },
        selectWhenFocused: () => {
            return selectWhenFocused!;
        },
        loop: () => {
            return loop!;
        }
    });

    const snippetProps = $derived({
        get orientation() {
            return tabs.orientation;
        },
        get attrs() {
            return tabs.attrs;
        }
    });
</script>

{@render children?.(snippetProps)}
