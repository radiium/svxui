<script lang="ts">
    import type { TabListProps } from '../types.js';
    import { useTabsList } from '../context.svelte.js';

    let { children }: TabListProps = $props();

    const tabsList = useTabsList();

    const snippetProps = $derived({
        get orientation() {
            return tabsList.orientation;
        },
        get attrs() {
            return tabsList.attrs;
        }
    });
</script>

{@render children?.(snippetProps)}
