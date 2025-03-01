<script lang="ts">
    import type { TabTriggerProps } from '../types.js';
    import { useTabsTrigger } from '../context.svelte.js';

    let { value, disabled = false, children }: TabTriggerProps = $props();

    const tabTrigger = useTabsTrigger({
        value() {
            return value;
        },
        disabled() {
            return disabled;
        }
    });

    const snippetProps = $derived({
        get active() {
            return tabTrigger.active;
        },
        get disabled() {
            return tabTrigger.disabled;
        },
        get orientation() {
            return tabTrigger.orientation;
        },
        get attrs() {
            return tabTrigger.attrs;
        }
    });
</script>

{@render children?.(snippetProps)}
