<script lang="ts">
    import type { Snippet } from 'svelte';
    import type { HTMLAttributes } from 'svelte/elements';
    import { useThemeRootContext } from 'svxui';

    type Props = HTMLAttributes<HTMLElement> & {
        color?: string;
        children?: Snippet<[void]>;
    };
    let { color = 'neutral', children, ...restProps }: Props = $props();
    const themeRoot = useThemeRootContext();
    let dataColor = $derived(color === 'current' ? themeRoot.color : color);
</script>

<code data-color={dataColor} {...restProps}>
    {@render children?.()}
</code>

<style>
    code {
        border-radius: calc(0.5px + 0.2em);
        padding: 0.15em 0.25em 0.15em 0.25em;
        font-size: var(--font-size-3);
        font-style: normal;
        white-space: nowrap;
        color: var(--accent-10);
        background-color: var(--accent-3);
    }
</style>
