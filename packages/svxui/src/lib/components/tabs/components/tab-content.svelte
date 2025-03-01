<script lang="ts">
    import type { TabContentProps } from '../types.js';
    import { useTabsContent } from '../context.svelte.js';

    let { value, children }: TabContentProps = $props();

    const tabContent = useTabsContent({
        value() {
            return value;
        }
    });

    const snippetProps = $derived({
        get active() {
            return tabContent.active;
        },
        get disabled() {
            return tabContent.disabled;
        },
        get orientation() {
            return tabContent.orientation;
        },
        get attrs() {
            return tabContent.attrs;
        }
    });
</script>

{@render children?.(snippetProps)}
