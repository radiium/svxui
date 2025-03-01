<script lang="ts">
    import type { Snippet } from 'svelte';
    import type { HTMLAttributes } from 'svelte/elements';
    import { useThemeRootContext } from 'svxui';

    type Props = HTMLAttributes<HTMLElement> & {
        color?: string;
        children?: Snippet<[void]>;
    };
    let { color = 'neutral', children, ...restProps }: Props = $props();
    let themeRoot = useThemeRootContext();
    let dataColor = $derived(color === 'current' ? themeRoot.color : color);
</script>

<code data-color={dataColor} {...restProps}>
    {@render children?.()}
</code>

<style>
    code {
        background-color: var(--accent-3);
        color: var(--accent-10);
        font-style: normal;
        padding: 0 0.25em 0.075em 0.25em;
        border-radius: calc(0.5px + 0.2em);
        white-space: nowrap;
    }
</style>
