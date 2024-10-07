<script lang="ts">
    import { readonly, writable } from 'svelte/store';
    import { setTabContext } from './Tab.context.js';
    import { defaultTabGroupProps } from './Tab.props.js';
    import type { TabGroupProps } from './Tab.types.js';

    type $$Props = TabGroupProps;
    export let value: $$Props['value'] = defaultTabGroupProps.value;

    const tabs = writable<string[]>([]);
    const panels = writable<string[]>([]);
    const current = writable<string | undefined>(undefined);

    $: selectTab(value);

    function isRegistered(val: string): boolean {
        return $tabs.includes(val) && $panels.includes(val);
    }

    function isValid(val?: string): val is string {
        return typeof val === 'string' && val !== null && val !== undefined;
    }

    function selectDefault(): void {
        if (!isValid($current) && !isValid(value)) {
            const [tab] = $tabs;
            if (isValid(tab) && isRegistered(tab)) {
                selectTab(tab);
            }
        }
    }

    function selectTab(val?: string): void {
        if (isValid(val) && isRegistered(val)) {
            current.set(val);
        }
    }

    function registerTab(val?: string): void {
        if (isValid(val)) {
            $tabs.push(val);
            selectDefault();
        }
    }

    function unregisterTab(val?: string): void {
        tabs.update((values) => values.filter((v) => v !== val));
    }

    function registerPanel(val?: string): void {
        if (isValid(val)) {
            $panels.push(val);
            selectDefault();
        }
    }

    function unregisterPanel(val?: string): void {
        panels.update((values) => values.filter((v) => v !== val));
    }

    setTabContext({
        current: readonly(current),
        selectTab,
        registerTab,
        unregisterTab,
        registerPanel,
        unregisterPanel
    });
</script>

<slot />
