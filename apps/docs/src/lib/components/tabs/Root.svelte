<script lang="ts">
    import { Flexbox, TabsBuilder, type TabsProps } from 'svxui';
    import { tabsContext } from './context.svelte';

    let {
        value = $bindable(),
        onValueChange = undefined,
        disabled = false,
        orientation = 'horizontal',
        activateOnFocus = false,
        loop = false,
        children
    }: TabsProps<string> = $props();

    const tabs = new TabsBuilder<string>({
        get value() {
            return value as string;
        },
        set value(newValue: string) {
            value = newValue;
            onValueChange?.(newValue);
        },
        get disabled() {
            return disabled;
        },
        get orientation() {
            return orientation;
        },
        get activateOnFocus() {
            return activateOnFocus;
        },
        get loop() {
            return loop;
        }
    });

    tabsContext.set(tabs);
</script>

<Flexbox direction="column" gap="3" {...tabs.rootAttrs}>
    {@render children?.(tabs)}
</Flexbox>
